/**
 * Turns the Vite build into a finished static site. Run by `npm run build`, after the browser build (dist/) and the
 * server build (dist-ssr/).
 *
 * For every page in every language it:
 *   - renders the React page to HTML, so the text is on screen before any JavaScript has run (fast on slow networks,
 *     readable by search engines and link previews, usable with JavaScript off),
 *   - writes that page's own <head>: title, description, canonical, hreflang, share preview, structured data,
 *   - inlines the CSS (no render-blocking request) and preloads only the fonts that page needs,
 *   - saves it as dist/<path>/index.html.
 * Then it writes 404.html, offline.html, sitemap.xml, robots.txt, the service worker (sw.js) and pre-compressed
 * .br / .gz copies, and prints a size report.
 *
 * The page template is index.html (see the tokens __LANG__, __ROUTE__ and the app-head / app-contract / app-html markers).
 */
import { createHash } from 'node:crypto'
import { readdir, readFile, rm, stat, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { brotliCompressSync, constants as zlib, gzipSync } from 'node:zlib'

const root = process.cwd()
const dist = path.join(root, 'dist')

// ---------------------------------------------------------------------------------------------------------------------
// Load the build outputs
// ---------------------------------------------------------------------------------------------------------------------
const template = await readFile(path.join(dist, 'index.html'), 'utf8')
const server = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href)
const { ALL_ROUTES, renderRoute, buildHead, routeKey, pathFor, HTML_LANG, site } = server

const cssLinkRe = /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/
const scriptRe = /<script type="module"[^>]*><\/script>/
const preloadRe = /<link rel="modulepreload"[^>]*>/g

const cssHref = template.match(cssLinkRe)?.[1]
if (!cssHref) throw new Error('prerender: no stylesheet link found in dist/index.html')
const entryHref = template.match(/<script type="module"[^>]*src="([^"]+)"/)?.[1]
if (!entryHref) throw new Error('prerender: no module script found in dist/index.html')
const cssFile = path.join(dist, cssHref)
const css = (await readFile(cssFile, 'utf8')).trim()

// Fonts referenced by the CSS: preload only the ones a page actually needs.
const fontUrls = [...css.matchAll(/url\(["']?([^)"']+\.woff2)["']?\)/g)].map((match) => match[1])
const fonts = {
  latin: fontUrls.find((url) => url.includes('latin')),
  cyrillic: fontUrls.find((url) => url.includes('cyrillic')),
}
const preloadFont = (href) => `<link rel="preload" href="${href}" as="font" type="font/woff2" crossorigin>`

// ---------------------------------------------------------------------------------------------------------------------
// The one small inline script (about 1 KB). It runs while the page is still being parsed and does what must not wait
// for the React bundle:
//  - marks <html> with "js", and with "lite" on a data-saving or 2G connection,
//  - remembers the language a visitor picked (links with hreflang) and sends returning visitors from "/" to it.
//    Search engines have no saved choice, so they always see the Uzbek page at "/",
//  - closes the mobile menu on Escape, on an outside click and after choosing a link (the menu itself is a native
//    <details>, which works with no script at all),
//  - loads the React bundle ONLY after the page has finished loading and the browser is idle, at low priority, and not at
//    all on "lite" connections. The page is complete and fully usable without it.
// ---------------------------------------------------------------------------------------------------------------------
const inlineScript = (entry) =>
  `(function(d,w){var e=d.documentElement,lite=false;e.className+=' js';try{var c=navigator.connection;if(c&&(c.saveData||/(^|-)2g$/.test(c.effectiveType))){lite=true;e.className+=' lite'}}catch(x){}try{var s=localStorage.getItem('londry:lang');if(w.location.pathname==='/'&&(s==='ru'||s==='en'))w.location.replace('/'+s+'/'+w.location.search+w.location.hash)}catch(x){}` +
  `d.addEventListener('click',function(v){var t=v.target,a=t&&t.closest&&t.closest('a[hreflang]');if(a)try{localStorage.setItem('londry:lang',a.getAttribute('hreflang'))}catch(x){}var m=d.querySelector('.menu[open]');if(m&&(!m.contains(t)||(t.closest&&t.closest('.menu__panel a'))))m.removeAttribute('open')},true);` +
  `d.addEventListener('keydown',function(v){if(v.key==='Escape'){var m=d.querySelector('.menu[open]');if(m){m.removeAttribute('open');var b=m.querySelector('summary');if(b)b.focus()}}});` +
  `if(lite)return;function boot(){var t=d.createElement('script');t.type='module';t.src='${entry}';t.fetchPriority='low';d.head.appendChild(t)}var idle=w.requestIdleCallback||function(f){setTimeout(f,200)};if(d.readyState==='complete')idle(boot);else w.addEventListener('load',function(){idle(boot)})})(document,window)`

const INLINE_SCRIPT = inlineScript(entryHref)

const RELOAD_SCRIPT = `document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-reload]'))location.reload()})`

// The design contract for this build (what the page is for and the world it lives in). It is also recorded in DESIGN.md and
// PRODUCT.md. Set EMIT_CONTRACT=1 when building to put it at the top of every page's <body> for an audit; by default it is
// NOT shipped, because it is process text that visitors have no use for.
const CONTRACT_TEXT = `<!--
THESIS: Londry sells time, "clean clothes, without the wait". This page is the owner's approved comp (Londry Landing.pdf), reproduced and extended to every screen, not reinterpreted.
OWN-WORLD: Montserrat 400-800; a saturated red family against ink #111 and white with #F5F5F5 bands (#E32A30 fills, ring and accent; #D4242C buttons; #B9202A small text and icons; #F97F88 on ink); the washing-machine-door mark (ring + half disc) as the logo O and the hero ring; 10-32px rounded corners; flat cards.
STORY: A Tashkent resident learns they can wash and dry big loads fast (SPOTX for delicate items), then downloads the app, calls, or finds a branch.
FIRST VIEWPORT: sticky header (LONDRY | SPOTX, nav, UZ/RU/EN, Get the app); headline and store buttons left, phone inside the red ring right, three contact cards below.
FORM: reproduction of the approved comp (seed key: none, the owner supplied the design).
-->`
const CONTRACT = process.env.EMIT_CONTRACT === '1' ? CONTRACT_TEXT : ''

// ---------------------------------------------------------------------------------------------------------------------
// Assemble one page
// ---------------------------------------------------------------------------------------------------------------------
function assemble({ lang, key, head, body, cyrillic, hydrate, extraHeadScript }) {
  const headParts = [
    head,
    fonts.latin && preloadFont(fonts.latin),
    cyrillic && fonts.cyrillic && preloadFont(fonts.cyrillic),
    hydrate ? `<script>${INLINE_SCRIPT}</script>` : extraHeadScript && `<script>${extraHeadScript}</script>`,
  ].filter(Boolean)

  let html = template
    .replace('__LANG__', () => lang)
    .replace('__ROUTE__', () => key)
    .replace('<!--app-head-->', () => headParts.join('\n    '))
    .replace(cssLinkRe, () => `<style>${css}</style>`)
    .replace('<!--app-contract-->', () => CONTRACT)
    .replace('<!--app-html-->', () => body)

  // The React bundle is not a <script> tag in the page: the inline script above loads it once the page is done.
  // Static pages (404, offline) never load it.
  html = html.replace(scriptRe, '').replace(preloadRe, '')
  return html
}

const written = [] // { file, html }
async function writePage(urlPath, html) {
  const file = path.join(dist, urlPath === '/' ? '' : urlPath, 'index.html')
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, html)
  written.push({ urlPath, file })
}

// ---------------------------------------------------------------------------------------------------------------------
// Public pages: every language x every page
// ---------------------------------------------------------------------------------------------------------------------
for (const route of ALL_ROUTES) {
  const body = await renderRoute(route)
  const html = assemble({
    lang: HTML_LANG[route.locale],
    key: routeKey(route),
    head: buildHead(route.locale, route.page),
    body,
    cyrillic: route.locale === 'ru',
    hydrate: true,
  })
  await writePage(pathFor(route.locale, route.page), html)
}

// ---------------------------------------------------------------------------------------------------------------------
// 404 and offline: plain static HTML in all three languages (no JavaScript, no hydration)
// ---------------------------------------------------------------------------------------------------------------------
async function writeSpecial(file, page, title, extraHeadScript) {
  const route = { locale: 'uz', page }
  const html = assemble({
    lang: 'uz',
    key: routeKey(route),
    head: `<title>${title}</title>\n    <meta name="robots" content="noindex,nofollow">`,
    body: await renderRoute(route),
    cyrillic: true,
    hydrate: false,
    extraHeadScript,
  })
  await writeFile(path.join(dist, file), html)
  written.push({ urlPath: `/${file}`, file: path.join(dist, file) })
}
await writeSpecial('404.html', 'notFound', '404 · Londry')
await writeSpecial('offline.html', 'offline', 'Offline · Londry', RELOAD_SCRIPT)

// ---------------------------------------------------------------------------------------------------------------------
// robots.txt and sitemap.xml: hidden from search engines until VITE_INDEXABLE=true
// ---------------------------------------------------------------------------------------------------------------------
if (site.indexable) {
  const urls = ALL_ROUTES.map((route) => {
    const alternates = ALL_ROUTES.filter((other) => other.page === route.page)
      .map(
        (other) =>
          `    <xhtml:link rel="alternate" hreflang="${other.locale}" href="${site.url}${pathFor(other.locale, other.page)}"/>`,
      )
      .join('\n')
    return `  <url>\n    <loc>${site.url}${pathFor(route.locale, route.page)}</loc>\n${alternates}\n  </url>`
  })
  await writeFile(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
  )
  await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`)
} else {
  await writeFile(path.join(dist, 'robots.txt'), 'User-agent: *\nDisallow: /\n')
}

// ---------------------------------------------------------------------------------------------------------------------
// Service worker: stamp it with a build id and the few files it keeps from the very first visit
// ---------------------------------------------------------------------------------------------------------------------
async function listFiles(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await listFiles(full)))
    else out.push(full)
  }
  return out
}

// The CSS file is now inlined everywhere, and the manifest was only needed by this script.
await rm(cssFile, { force: true })
await rm(path.join(dist, '.vite'), { recursive: true, force: true })

const hash = createHash('sha1')
for (const file of (await listFiles(dist)).sort()) {
  hash.update(path.relative(dist, file))
  if (file.endsWith('.html')) hash.update(await readFile(file))
}
const buildId = hash.digest('hex').slice(0, 10)

const precache = ['/offline.html', '/manifest.webmanifest', '/favicon.svg']
const swSource = (await readFile(path.join(root, 'scripts', 'sw.template.js'), 'utf8'))
  .replace('__BUILD_ID__', () => buildId)
  .replace('__PRECACHE__', () => JSON.stringify(precache))
await writeFile(path.join(dist, 'sw.js'), swSource)

// ---------------------------------------------------------------------------------------------------------------------
// Pre-compressed copies for hosts that can serve them (nginx gzip_static / brotli_static, Apache rewrite rules)
// ---------------------------------------------------------------------------------------------------------------------
const compressible = /\.(html|css|js|mjs|svg|json|xml|txt|webmanifest)$/
const sizes = new Map()
for (const file of await listFiles(dist)) {
  if (!compressible.test(file) || /\.(br|gz)$/.test(file)) continue
  const raw = await readFile(file)
  const gz = gzipSync(raw, { level: 9 })
  const br = brotliCompressSync(raw, {
    params: { [zlib.BROTLI_PARAM_QUALITY]: 11, [zlib.BROTLI_PARAM_SIZE_HINT]: raw.length },
  })
  if (br.length < raw.length) await writeFile(`${file}.br`, br)
  if (gz.length < raw.length) await writeFile(`${file}.gz`, gz)
  sizes.set(path.relative(dist, file).replaceAll('\\', '/'), { raw: raw.length, gzip: gz.length, brotli: br.length })
}

// ---------------------------------------------------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------------------------------------------------
const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`
const rows = []
for (const [file, s] of sizes) {
  if (/^(index|ru\/index|en\/index)\.html$/.test(file) || /^assets\/.*\.js$/.test(file) || file === 'sw.js') {
    rows.push({ file, raw: kb(s.raw), gzip: kb(s.gzip), brotli: kb(s.brotli) })
  }
}
const fontFiles = (await listFiles(path.join(dist, 'assets'))).filter((file) => file.endsWith('.woff2'))
for (const file of fontFiles) {
  const size = (await stat(file)).size
  rows.push({ file: `assets/${path.basename(file)}`, raw: kb(size), gzip: '-', brotli: '-' })
}
console.log(`\nprerender: ${written.length} pages written, build id ${buildId}, indexable: ${site.indexable}`)
console.table(rows)

const homeJs = [...sizes.entries()].filter(([file]) => /^assets\/index-.*\.js$/.test(file))
const uzHtml = sizes.get('index.html')
const latinFont = fontFiles.find((file) => file.includes('latin'))
if (uzHtml && homeJs.length && latinFont) {
  const firstView = uzHtml.brotli + homeJs.reduce((sum, [, s]) => sum + s.brotli, 0) + (await stat(latinFont)).size
  console.log(
    `First view of the Uzbek page over the wire (brotli): HTML ${kb(uzHtml.brotli)} + JS ${kb(homeJs.reduce((sum, [, s]) => sum + s.brotli, 0))} + font ${kb((await stat(latinFont)).size)} = ${kb(firstView)}`,
  )
  console.log(`Readable page after the HTML alone: ${kb(uzHtml.brotli)} (brotli) / ${kb(uzHtml.gzip)} (gzip)`)
}
