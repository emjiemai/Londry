/**
 * Builds the app icons, favicon.ico and the social share image from the vector art in scripts/art/.
 * One-off tool, its output is committed to public/. Re-run with `npm run icons` after changing the art:
 *   scripts/art/mark.svg       the washing-machine-door mark (becomes every icon)
 *   scripts/art/og-image.svg   1200x630 share preview (Telegram, Instagram, WhatsApp ...). Replace with real artwork.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 }
const mark = await readFile('scripts/art/mark.svg')

/** Square icon: the mark centred on a solid background, `ratio` is the mark's share of the canvas. */
async function icon(size, ratio, background = WHITE) {
  const inner = Math.round(size * ratio)
  const markPng = await sharp(mark, { density: 512 }).resize(inner, inner).png().toBuffer()
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: markPng, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

/** favicon.ico containing PNG images (supported by every browser since 2008). */
function ico(images) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)
  let offset = 6 + 16 * images.length
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size, 0)
    entry.writeUInt8(size, 1)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(data.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += data.length
    return entry
  })
  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)])
}

await mkdir('public/icons', { recursive: true })

await writeFile('public/icons/icon-192.png', await icon(192, 0.7))
await writeFile('public/icons/icon-512.png', await icon(512, 0.7))
// "maskable": Android crops it to a circle or squircle, so the mark stays inside the central 80%.
await writeFile('public/icons/icon-maskable-512.png', await icon(512, 0.5))
await writeFile('public/apple-touch-icon.png', await icon(180, 0.66))

const transparent = { r: 0, g: 0, b: 0, alpha: 0 }
await writeFile(
  'public/favicon.ico',
  ico([
    { size: 32, data: await icon(32, 0.94, transparent) },
    { size: 48, data: await icon(48, 0.94, transparent) },
  ]),
)

await sharp(await readFile('scripts/art/og-image.svg'), { density: 96 })
  .resize(1200, 630)
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile('public/og-image.png')

console.log('icons written to public/')
