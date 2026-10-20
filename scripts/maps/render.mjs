// Draws one branch map as a PNG: MapLibre + OpenFreeMap vector tiles in headless Chrome, the Londry map style
// (./style.mjs), a branded pin, and the street name in the site's own font. Used by scripts/make-maps.mjs.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'
import { buildStyle, TOKENS } from './style.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

// Design size in CSS pixels; drawn at 4x, so the picture is 1600 x 652 (the card's map slot is 590 : 240, see .branch__map).
const WIDTH = 400
const HEIGHT = 163
const SCALE = 4

const PIN_SVG = `<svg class="pin" viewBox="-2 -2 44 53" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M20 51C20 51 4 35 4 20a16 16 0 0 1 32 0c0 15-16 31-16 31z" fill="${TOKENS.red}" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/>
  <circle cx="20" cy="20" r="8.1" fill="none" stroke="#fff" stroke-width="2.7"/>
  <path d="M20 14.7a5.3 5.3 0 0 1 0 10.6z" fill="#fff"/>
</svg>`

function maplibrePaths() {
  const dist = path.join(root, 'node_modules/maplibre-gl/dist')
  const js = path.join(dist, 'maplibre-gl.js')
  const css = path.join(dist, 'maplibre-gl.css')
  if (!fs.existsSync(js)) {
    throw new Error('maplibre-gl is not installed. Run once:  npm install --no-save maplibre-gl@5.24.0')
  }
  return { js, css: fs.readFileSync(css, 'utf8') }
}

/**
 * @param {{ lat: number, lon: number, zoom: number, out: string,
 *           street?: { text: string, at: [number, number], angle: number },
 *           padTop?: number, suggest?: boolean }} options
 */
export async function renderMap({ lat, lon, zoom, out, street, padTop = 44, suggest = false }) {
  const { js, css } = maplibrePaths()
  const fontB64 = fs.readFileSync(path.join(root, 'src/assets/fonts/montserrat-latin.woff2')).toString('base64')

  const html = `<!doctype html><meta charset="utf-8"><style>${css}
@font-face{font-family:Montserrat;font-weight:400 800;font-style:normal;src:url(data:font/woff2;base64,${fontB64}) format('woff2')}
html,body{margin:0;padding:0;background:${TOKENS.land}}
#map{position:relative;width:${WIDTH}px;height:${HEIGHT}px;overflow:hidden}
.pin{display:block;width:44px;height:53px;filter:drop-shadow(0 2px 1.5px rgba(40,0,0,.30))}
.halo{width:70px;height:70px;border-radius:50%;box-sizing:border-box;background:rgba(227,42,48,.10);border:1.5px solid rgba(227,42,48,.34)}
.street{position:absolute;left:0;top:0;z-index:4;white-space:nowrap;font:700 8.4px/1 Montserrat,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#7C7C86;transform-origin:50% 50%;text-shadow:0 0 2px #fff,0 0 2px #fff,0 0 3px #fff,0 0 3px #fff,0 0 4px #fff}
.attrib{position:absolute;right:0;bottom:0;z-index:5;font:500 7.5px/1 Arial,Helvetica,sans-serif;color:#6F6F79;background:rgba(255,255,255,.86);padding:3px 5px 3px 7px;border-top-left-radius:5px}
</style><div id="map"></div>`

  const browser = await chromium.launch({
    channel: 'chrome',
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl'],
  })
  try {
    const context = await browser.newContext({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: SCALE })
    const page = await context.newPage()
    const problems = []
    page.on('console', (m) => /error|failed/i.test(m.text()) && problems.push(m.text()))
    page.on('pageerror', (e) => problems.push(String(e)))

    await page.setContent(html)
    await page.addScriptTag({ path: js })

    const info = await page.evaluate(
      ({ style, lng, lat, zoom, padTop, pinSvg, street, suggest }) =>
        new Promise((resolve, reject) => {
          const timer = setTimeout(() => reject(new Error('the map did not finish loading in 90 s (offline?)')), 90000)
          const map = new maplibregl.Map({
            container: 'map',
            style,
            center: [lng, lat],
            zoom,
            interactive: false,
            attributionControl: false,
            fadeDuration: 0,
            canvasContextAttributes: { preserveDrawingBuffer: true, antialias: true },
          })
          map.setPadding({ top: padTop, bottom: 0, left: 0, right: 0 })
          map.on('error', (e) => console.log('map error: ' + (e && e.error && e.error.message)))

          // Suggests where a street name can sit on the road nearest to the pin (screen px inside the 400 x 163 frame).
          const suggestFor = () => {
            const tip = map.project([lng, lat])
            const ids = ['road-fill-primary', 'road-fill-secondary', 'road-fill-tertiary', 'road-fill-minor']
            const lines = []
            for (const f of map.queryRenderedFeatures({ layers: ids })) {
              const g = f.geometry
              const parts = g.type === 'LineString' ? [g.coordinates] : g.type === 'MultiLineString' ? g.coordinates : []
              for (const part of parts) lines.push({ layer: f.layer.id, pts: part.map((c) => { const q = map.project(c); return [q.x, q.y] }) })
            }
            const nearest = (pts) => {
              let best = { d: 1e9 }
              for (let i = 0; i < pts.length - 1; i++) {
                const [ax, ay] = pts[i]
                const [bx, by] = pts[i + 1]
                const dx = bx - ax
                const dy = by - ay
                const t = Math.max(0, Math.min(1, ((tip.x - ax) * dx + (tip.y - ay) * dy) / (dx * dx + dy * dy || 1)))
                const x = ax + t * dx
                const y = ay + t * dy
                const d = Math.hypot(tip.x - x, tip.y - y)
                if (d < best.d) best = { d, i, x, y }
              }
              return best
            }
            const norm = (a) => { while (a > 90) a -= 180; while (a <= -90) a += 180; return a }
            return lines
              .map((l) => ({ l, n: nearest(l.pts) }))
              .sort((a, b) => a.n.d - b.n.d)
              .slice(0, 3)
              .map(({ l, n }) => {
                const walk = (dir, dist) => {
                  let cx = n.x
                  let cy = n.y
                  let idx = dir > 0 ? n.i + 1 : n.i
                  let remaining = dist
                  while (idx >= 0 && idx < l.pts.length) {
                    const [vx, vy] = l.pts[idx]
                    const seg = Math.hypot(vx - cx, vy - cy)
                    if (seg >= remaining) {
                      const t = remaining / (seg || 1)
                      return { x: cx + (vx - cx) * t, y: cy + (vy - cy) * t, ax: vx - cx, ay: vy - cy }
                    }
                    remaining -= seg
                    cx = vx
                    cy = vy
                    idx += dir
                  }
                  return null
                }
                const points = []
                for (const dir of [-1, 1]) for (const d of [60, 90, 120]) {
                  const w = walk(dir, d)
                  if (w) points.push(`at ${w.x.toFixed(0)},${w.y.toFixed(0)} angle ${norm((Math.atan2(w.ay, w.ax) * 180) / Math.PI).toFixed(0)} (${d}px ${dir < 0 ? 'one way' : 'other way'})`)
                }
                return { road: l.layer, distanceToPin: Number(n.d.toFixed(0)), points }
              })
          }

          map.on('load', () => {
            const halo = document.createElement('div')
            halo.className = 'halo'
            new maplibregl.Marker({ element: halo, anchor: 'center' }).setLngLat([lng, lat]).addTo(map)
            const pin = document.createElement('div')
            pin.innerHTML = pinSvg
            new maplibregl.Marker({ element: pin, anchor: 'bottom' }).setLngLat([lng, lat]).addTo(map)

            if (street) {
              const el = document.createElement('div')
              el.className = 'street'
              el.textContent = street.text
              el.style.transform = `translate(-50%, -50%) translate(${street.at[0]}px, ${street.at[1]}px) rotate(${street.angle}deg)`
              document.getElementById('map').appendChild(el)
            }
            const credit = document.createElement('div')
            credit.className = 'attrib'
            credit.textContent = '© OpenStreetMap · OpenFreeMap'
            document.getElementById('map').appendChild(credit)

            let stable = 0
            const poll = () => {
              if (map.loaded() && map.areTilesLoaded() && !map.isMoving()) stable += 1
              else stable = 0
              if (stable >= 4) {
                clearTimeout(timer)
                resolve({ suggestions: suggest ? suggestFor() : undefined })
              } else setTimeout(poll, 250)
            }
            poll()
          })
        }),
      { style: buildStyle(), lng: lon, lat, zoom, padTop, pinSvg: PIN_SVG, street: street ?? null, suggest },
    )

    await page.evaluate(async () => {
      await document.fonts.load('700 8.4px Montserrat', 'TALABALAR IFTIXOR')
      await document.fonts.ready
    })
    await page.waitForTimeout(500)
    fs.mkdirSync(path.dirname(out), { recursive: true })
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } })
    return { out, problems, ...info }
  } finally {
    await browser.close()
  }
}
