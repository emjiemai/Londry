// Redraws the two branch map pictures (src/assets/images/map-*.png) from OpenStreetMap data, in the Londry style.
// The pictures are committed, so you only run this to move a pin, change the zoom or restyle the maps.
//
//   npm install --no-save maplibre-gl@5.24.0      (once; a build tool, not part of the website)
//   npm run maps                                  (needs internet and the installed Google Chrome)
//   npm run maps -- --only talabalar --suggest    (also prints where a street name fits next to the pin)
//
// Settings live in scripts/maps/branches.json. Map data: OpenStreetMap contributors (ODbL), tiles by OpenFreeMap.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderMap } from './maps/render.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null
const suggest = args.includes('--suggest')

const config = JSON.parse(fs.readFileSync(path.join(root, 'scripts/maps/branches.json'), 'utf8'))

for (const branch of config.branches) {
  if (only && branch.id !== only) continue
  const out = path.join(root, `src/assets/images/map-${branch.id}.png`)
  const result = await renderMap({ lat: branch.lat, lon: branch.lon, zoom: config.zoom, street: branch.street, out, suggest })
  console.log(`${branch.id}: wrote ${path.relative(root, out)} (${(fs.statSync(out).size / 1024).toFixed(0)} KB)`)
  for (const problem of result.problems) console.log('  problem:', problem)
  for (const s of result.suggestions ?? []) {
    console.log(`  nearest road (${s.road}, ${s.distanceToPin}px from the pin tip):`)
    for (const p of s.points) console.log('    ' + p)
  }
}
