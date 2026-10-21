import { getGalleryPicture } from '../media'
import type { SiteServicePhoto } from '../site'

/** Width of a service card's picture frame on wide screens, in px: the container is 1200 px and the two cards share it. */
const FRAME_WIDTH = 590

/**
 * The photos at the top of a service card: one frame with one to three pictures side by side (no carousel, nothing moves).
 * Only photos whose file exists are shown, and a card with none has no frame at all (no grey stand-in box).
 */
export function ServicePhotos({ photos, alts }: { photos: readonly SiteServicePhoto[]; alts: readonly string[] }) {
  const items = photos.flatMap((photo, index) => {
    const picture = getGalleryPicture(photo.id)
    return picture ? [{ photo, picture, alt: alts[index] ?? '' }] : []
  })
  if (items.length === 0) return null

  const weightOf = (photo: SiteServicePhoto) => photo.weight ?? 1
  const total = items.reduce((sum, { photo }) => sum + weightOf(photo), 0)

  return (
    <div className="service__media">
      <div className="service__photos" style={{ gridTemplateColumns: items.map(({ photo }) => `minmax(0, ${weightOf(photo)}fr)`).join(' ') }}>
        {items.map(({ photo, picture, alt }) => {
          const share = weightOf(photo) / total
          // what the browser needs to know to download the smallest sufficient file
          const sizes = `(min-width: 900px) ${Math.ceil(FRAME_WIDTH * share)}px, ${Math.ceil(100 * share)}vw`
          return (
            <picture key={photo.id} className={photo.fit === 'contain' ? 'service__photo service__photo--whole' : 'service__photo'}>
              {Object.entries(picture.sources).map(([format, srcSet]) => (
                <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
              ))}
              <img
                src={picture.img.src}
                width={picture.img.w}
                height={picture.img.h}
                alt={alt}
                loading="lazy"
                decoding="async"
                style={photo.position ? { objectPosition: photo.position } : undefined}
              />
            </picture>
          )
        })}
      </div>
    </div>
  )
}
