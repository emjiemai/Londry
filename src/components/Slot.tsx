import { getPicture, type SlotId } from '../media'
import { IconImage } from './Icons'

interface SlotProps {
  id: SlotId
  /** Note shown on the placeholder while no file exists (for the owner, so it is not translated). */
  label: string
  /** Alt text of the real picture (translated). */
  alt: string
  /** Rendered width hint for the browser, so it downloads the smallest sufficient file. */
  sizes: string
  /** Above-the-fold image: load immediately and at high priority. Everything else is lazy. */
  priority?: boolean
  showIcon?: boolean
}

/**
 * A place for a picture supplied later. Without a file in src/assets/images it renders the design's grey placeholder;
 * with one it renders a responsive <picture> (AVIF/WebP/JPEG, several widths) that never causes layout shift.
 */
export function Slot({ id, label, alt, sizes, priority = false, showIcon = false }: SlotProps) {
  const picture = getPicture(id)

  if (!picture) {
    return (
      <div className="slot" aria-hidden="true">
        {showIcon && <IconImage className="slot__icon" />}
        <span className="slot__label">{label}</span>
      </div>
    )
  }

  return (
    <picture className="slot-picture">
      {Object.entries(picture.sources).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        src={picture.img.src}
        width={picture.img.w}
        height={picture.img.h}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
      />
    </picture>
  )
}
