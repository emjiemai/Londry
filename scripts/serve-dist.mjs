/**
 * Tiny static server for `dist/` that behaves like a good production host, so you can test the real build locally:
 *   npm run preview            -> http://localhost:4173
 *   npm run preview -- --port 5000
 *
 * Clean URLs (/ru/ -> ru/index.html), pre-compressed .br/.gz when the browser accepts them, long immutable caching for
 * /assets/*, no caching for HTML, and 404.html with a real 404 status.
 */
import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import path from 'node:path'

const dist = path.resolve('dist')
const portArg = process.argv.indexOf('--port')
const port = portArg > -1 ? Number(process.argv[portArg + 1]) : 4173

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

async function exists(file) {
  try {
    return (await stat(file)).isFile()
  } catch {
    return false
  }
}

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0])
  const target = path.normalize(path.join(dist, clean))
  if (!target.startsWith(dist)) return null
  if (await exists(target)) return target
  const index = path.join(target, 'index.html')
  if (await exists(index)) return index
  return null
}

createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', 'http://localhost')

  // A folder without a trailing slash redirects, like nginx/Netlify do.
  if (!url.pathname.endsWith('/') && !path.extname(url.pathname) && (await exists(path.join(dist, url.pathname, 'index.html')))) {
    response.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end()
    return
  }

  let file = await resolveFile(url.pathname)
  let status = 200
  if (!file) {
    file = path.join(dist, '404.html')
    status = 404
  }

  const ext = path.extname(file)
  const headers = {
    'Content-Type': TYPES[ext] ?? 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': url.pathname.startsWith('/assets/')
      ? 'public, max-age=31536000, immutable'
      : ext === '.html' || file.endsWith('sw.js')
        ? 'no-cache'
        : 'public, max-age=86400',
    Vary: 'Accept-Encoding',
  }

  const accepts = String(request.headers['accept-encoding'] ?? '')
  let send = file
  if (/\bbr\b/.test(accepts) && (await exists(`${file}.br`))) {
    send = `${file}.br`
    headers['Content-Encoding'] = 'br'
  } else if (/\bgzip\b/.test(accepts) && (await exists(`${file}.gz`))) {
    send = `${file}.gz`
    headers['Content-Encoding'] = 'gzip'
  }

  response.writeHead(status, headers)
  if (request.method === 'HEAD') return response.end()
  createReadStream(send).pipe(response)
}).listen(port, () => console.log(`Serving dist/ at http://localhost:${port}`))
