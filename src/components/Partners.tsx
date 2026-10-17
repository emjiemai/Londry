import { useI18n } from '../i18n/context'
import { getLogo } from '../media'
import { site } from '../site'

export function Partners() {
  const { t } = useI18n()
  const anyLogo = site.partners.some((partner) => getLogo(partner.id))

  return (
    <section id="partners" className="section" aria-labelledby="partners-title">
      <div className="container">
        <header className="section__head section__head--center section__head--partners">
          <p className="eyebrow">{t.partners.eyebrow}</p>
          <h2 id="partners-title" className="h2">
            {t.partners.title}
          </h2>
        </header>

        {/* While no logo has been supplied the row is only a layout placeholder, so it is hidden from assistive tech. */}
        <ul className="partners" aria-hidden={anyLogo ? undefined : true}>
          {site.partners.map((partner, index) => {
            const logo = getLogo(partner.id)
            if (!logo) {
              return (
                <li key={partner.id} className="partner partner--empty">
                  [PARTNER LOGO {index + 1}]
                </li>
              )
            }
            const image = <img src={logo} alt={partner.name} loading="lazy" decoding="async" />
            return (
              <li key={partner.id} className="partner">
                {partner.url ? (
                  <a href={partner.url} target="_blank" rel="noopener">
                    {image}
                  </a>
                ) : (
                  image
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
