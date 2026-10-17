/*
 * Londry service worker. Dependency-free; scripts/prerender.mjs stamps it into dist/sw.js.
 *
 * What it is for: repeat visits open instantly, a flaky connection still shows the page, and a page you have
 * visited once also opens with no connection at all.
 *
 *   pages (HTML)            network first, but after 3.5 s use the saved copy; nothing saved -> keep waiting,
 *                           and if the network is really gone -> /offline.html
 *   /assets/** (hashed)     cache first. File names change whenever content changes, so a saved copy is always right
 *   icons, manifest, ...    stale-while-revalidate
 *   other websites          never touched
 *
 * Nothing here tracks anyone, and nothing is saved that the page did not already download.
 */
const BUILD = '__BUILD_ID__'
const PAGES = `londry-pages-${BUILD}` // replaced on every deploy
const ASSETS = 'londry-assets-v1' // content-hashed files: safe to keep across deploys, trimmed by count
const MISC = 'londry-misc-v1'
const PRECACHE = __PRECACHE__
const PAGE_TIMEOUT = 3500
const MAX_ASSETS = 80
const MAX_MISC = 40

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PAGES)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) {
        if (key.startsWith('londry-pages-') && key !== PAGES) await caches.delete(key)
      }
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin || url.pathname === '/sw.js') return

  if (request.mode === 'navigate') {
    event.respondWith(pageStrategy(event))
  } else if (url.pathname.startsWith('/assets/')) {
    event.respondWith(cacheFirst(event, ASSETS, MAX_ASSETS))
  } else {
    event.respondWith(staleWhileRevalidate(event, MISC, MAX_MISC))
  }
})

// The page tells us what it loaded on the first visit (when we could not yet intercept it), so it works offline right away.
self.addEventListener('message', (event) => {
  const data = event.data
  if (!data || data.type !== 'cache-urls' || !Array.isArray(data.urls)) return
  event.waitUntil(cacheUrls(data.urls))
})

/** A page's cache key ignores ?utm_source=... and #hash, so campaign links do not fill the cache. */
function pageKey(href) {
  const url = new URL(href)
  url.search = ''
  url.hash = ''
  return new Request(url.href)
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function pageStrategy(event) {
  const request = event.request
  const key = pageKey(request.url)
  const cache = await caches.open(PAGES)

  const network = fetch(request).then((response) => {
    // Redirected responses cannot be replayed for a navigation, so they are never stored.
    if (response.ok && !response.redirected) cache.put(key, response.clone())
    return response
  })
  // Keep the worker alive so a slow response still gets saved for next time.
  event.waitUntil(network.catch(() => {}))

  let response = null
  let networkFailed = false
  try {
    response = await Promise.race([network, delay(PAGE_TIMEOUT).then(() => null)])
  } catch {
    networkFailed = true
  }
  if (response) return response

  const saved = await cache.match(key)
  if (saved) return saved

  // Slow, but nothing saved yet: keep waiting for the network rather than showing "offline" too early.
  if (!networkFailed) {
    try {
      return await network
    } catch {
      /* fall through to the offline page */
    }
  }
  return (await cache.match('/offline.html')) || Response.error()
}

async function cacheFirst(event, name, max) {
  const cache = await caches.open(name)
  const hit = await cache.match(event.request)
  if (hit) return hit
  const response = await fetch(event.request)
  if (response.ok) {
    cache.put(event.request, response.clone())
    event.waitUntil(trim(name, max))
  }
  return response
}

async function staleWhileRevalidate(event, name, max) {
  const cache = await caches.open(name)
  const saved = await cache.match(event.request)
  const refresh = fetch(event.request)
    .then((response) => {
      if (response.ok) {
        cache.put(event.request, response.clone())
        return trim(name, max).then(() => response)
      }
      return response
    })
    .catch(() => saved)
  event.waitUntil(refresh)
  return saved || refresh
}

/** Keep a cache from growing forever: drop the oldest entries beyond `max`. */
async function trim(name, max) {
  const cache = await caches.open(name)
  const keys = await cache.keys()
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i])
}

async function cacheUrls(urls) {
  const [pages, assets, misc] = await Promise.all([caches.open(PAGES), caches.open(ASSETS), caches.open(MISC)])
  await Promise.all(
    urls.map(async (raw) => {
      try {
        const url = new URL(raw, self.location.origin)
        if (url.origin !== self.location.origin || url.pathname === '/sw.js') return
        const isAsset = url.pathname.startsWith('/assets/')
        const isPage = url.pathname.endsWith('/') || url.pathname.endsWith('.html')
        const target = isAsset ? assets : isPage ? pages : misc
        const key = isPage ? pageKey(url.href) : url.href
        if (await target.match(key)) return
        const response = await fetch(url.href) // normally answered from the browser's own cache
        if (response.ok && !response.redirected) await target.put(key, response)
      } catch {
        /* one file failing must not stop the others */
      }
    }),
  )
}
