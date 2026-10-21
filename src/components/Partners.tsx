import { useI18n } from '../i18n/context'
import { getPartnerMedia } from '../media'
import { site } from '../site'

/** Rendered width of a tile: a quarter of the container on wide screens, about half the screen on phones. */
const PARTNER_SIZES = '(min-width: 900px) 280px, 46vw'

/**
 * The pictures of the owner's projects (and, later, real partners): a plain row of tiles with no heading, because the owner does
 * not want words added above them. A tile whose picture file does not exist yet is left out, and with no pictures at all the
 * whole section is: no grey stand-in boxes.
 */
export function Partners() {
  const { t } = useI18n()
  const tiles = site.partners.flatMap((partner, index) => {
    const media = getPartnerMedia(partner.id)
    return media ? [{ partner, media, caption: t.partners.captions[index] }] : []
  })
  if (tiles.length === 0) return null

  return (
    <section id="partners" className="section">
      <div className="container">
        <ul className="partners">
          {tiles.map(({ partner, media, caption }) => {
            const image =
              media.kind === 'picture' ? (
                <picture>
                  {Object.entries(media.picture.sources).map(([format, srcSet]) => (
                    <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={PARTNER_SIZES} />
                  ))}
                  <img
                    src={media.picture.img.src}
                    width={media.picture.img.w}
                    height={media.picture.img.h}
                    alt={partner.name}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              ) : (
                <img src={media.url} alt={partner.name} loading="lazy" decoding="async" />
              )
            return (
              <li key={partner.id} className="partner">
                {partner.url ? (
                  <a href={partner.url} target="_blank" rel="noopener">
                    {image}
                  </a>
                ) : (
                  image
                )}
                {caption && <p className="partner__caption">{caption}</p>}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
