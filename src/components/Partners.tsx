import { useI18n } from '../i18n/context'
import { getPartnerMedia } from '../media'
import { site } from '../site'

/** Rendered width of a tile: a quarter of the container on wide screens, about half the screen on phones. */
const PARTNER_SIZES = '(min-width: 900px) 280px, 46vw'

export function Partners() {
  const { t } = useI18n()
  const anyLogo = site.partners.some((partner) => getPartnerMedia(partner.id))

  return (
    <section id="partners" className="section" aria-labelledby="partners-title">
      <div className="container">
        <header className="section__head section__head--center section__head--partners">
          <p className="eyebrow">{t.partners.eyebrow}</p>
          <h2 id="partners-title" className="h2">
            {t.partners.title}
          </h2>
        </header>

        {/* While no picture has been supplied the row is only a layout placeholder, so it is hidden from assistive tech. */}
        <ul className="partners" aria-hidden={anyLogo ? undefined : true}>
          {site.partners.map((partner, index) => {
            const media = getPartnerMedia(partner.id)
            if (!media) {
              return (
                <li key={partner.id} className="partner partner--empty">
                  [PARTNER LOGO {index + 1}]
                </li>
              )
            }
            const caption = t.partners.captions[index]
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
