/**
 * Photos, screenshots and logos supplied by the owner.
 *
 * HOW TO ADD ONE: drop a file named after the slot into src/assets/images/ (jpg, png, webp or avif) and rebuild.
 * It is resized to several widths and converted to AVIF + WebP + JPEG automatically, and the page shows it. Until the file
 * exists nothing is shown in its place (no grey box). Nothing else to change.
 *
 *   service-londry   photo of the laundry interior, landscape, at least 1600 x 650 px
 *   service-spotx    photo of garment care, landscape, at least 1600 x 650 px
 *   map-talabalar    map picture for the Talabalar branch, landscape, at least 1600 x 650 px
 *   map-yunusabad    map picture for the Yunusabad branch, landscape, at least 1600 x 650 px
 *
 * Partner pictures go into src/assets/partners/ as partner-1.jpg ... (jpg, png, webp, avif or svg), see site.ts.
 */
export type SlotId = 'service-londry' | 'service-spotx' | 'map-talabalar' | 'map-yunusabad'

/** Shape produced by vite-imagetools with `as=picture`. */
export interface Picture {
  /** One srcset per format, keyed by image subtype ("avif", "webp", "jpeg"). */
  sources: Record<string, string>
  img: { src: string; w: number; h: number }
}

const pictureModules = import.meta.glob<Picture>('./assets/images/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
  // Widths are never enlarged beyond the original. Last format is the <img> fallback.
  query: { w: '360;640;960;1280;1600', format: 'avif;webp;jpg', as: 'picture' },
})

// Partner pictures: photos and raster logos get the same treatment as the photos (AVIF / WebP / JPEG, several sizes);
// an SVG logo is used as it is.
const partnerPictureModules = import.meta.glob<Picture>('./assets/partners/*.{png,webp,avif,jpg,jpeg}', {
  eager: true,
  import: 'default',
  query: { w: '320;480;640;960', format: 'avif;webp;jpg', as: 'picture' },
})
const partnerVectorModules = import.meta.glob<string>('./assets/partners/*.svg', {
  eager: true,
  import: 'default',
  query: '?url',
})

function byBasename<T>(modules: Record<string, T>): Record<string, T> {
  return Object.fromEntries(
    Object.entries(modules).map(([path, value]) => [path.split('/').pop()!.replace(/\.[^.]+$/, ''), value]),
  )
}

const pictures = byBasename(pictureModules)
const partnerPictures = byBasename(partnerPictureModules)
const partnerVectors = byBasename(partnerVectorModules)

export function getPicture(id: SlotId): Picture | undefined {
  return pictures[id]
}

export type PartnerMedia = { kind: 'picture'; picture: Picture } | { kind: 'vector'; url: string }

export function getPartnerMedia(id: string): PartnerMedia | undefined {
  if (partnerPictures[id]) return { kind: 'picture', picture: partnerPictures[id] }
  if (partnerVectors[id]) return { kind: 'vector', url: partnerVectors[id] }
  return undefined
}
