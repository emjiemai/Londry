/**
 * Photos, screenshots and logos supplied by the owner.
 *
 * HOW TO ADD ONE: drop a file named after the slot into src/assets/images/ (jpg, png, webp or avif) and rebuild.
 * It is resized to several widths and converted to AVIF + WebP + JPEG automatically, and the page switches from the
 * grey placeholder to the real picture. Nothing else to change.
 *
 *   hero-app         app home-screen screenshot, portrait, e.g. 1170 x 2532 px (shown inside the phone)
 *   service-londry   photo of the laundry interior, landscape, at least 1600 x 650 px
 *   service-spotx    photo of garment care, landscape, at least 1600 x 650 px
 *   map-talabalar    map picture for the Talabalar branch, landscape, at least 1600 x 650 px
 *   map-yunusabad    map picture for the Yunusabad branch, landscape, at least 1600 x 650 px
 *
 * Partner logos go into src/assets/partners/ as partner-1.svg ... partner-6.svg (see site.ts).
 */
export type SlotId = 'hero-app' | 'service-londry' | 'service-spotx' | 'map-talabalar' | 'map-yunusabad'

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

const logoModules = import.meta.glob<string>('./assets/partners/*.{svg,png,webp,avif,jpg,jpeg}', {
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
const logos = byBasename(logoModules)

export function getPicture(id: SlotId): Picture | undefined {
  return pictures[id]
}

/** Rendered width of the app screenshot: 270px beside the headline on wide screens, 62vw when it sits below it. */
export const HERO_APP_SIZES = '(min-width: 900px) 270px, 62vw'

export function getLogo(id: string): string | undefined {
  return logos[id]
}
