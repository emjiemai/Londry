import { useI18n } from '../i18n/context'
import { SPOTX_TAGLINE } from '../site'
import { Rich } from './Rich'
import { Slot } from './Slot'

export function Services() {
  const { t } = useI18n()
  const { londry, spotx } = t.services

  return (
    <section id="services" className="section section--surface" aria-labelledby="services-title">
      <div className="container">
        <header className="section__head section__head--services">
          <p className="eyebrow">{t.services.eyebrow}</p>
          <h2 id="services-title" className="h2 h2--lg">
            {t.services.title}
          </h2>
        </header>

        <div className="services">
          <article className="service">
            <div className="service__media">
              <Slot
                id="service-londry"
                label="[PHOTO — laundry interior]"
                alt={londry.photoAlt}
                sizes="(min-width: 900px) 590px, 100vw"
              />
            </div>
            <div className="service__body">
              <p className="eyebrow eyebrow--sm">{londry.eyebrow}</p>
              <h3 className="service__title service__title--londry">{londry.title}</h3>
              <div className="service__text">
                {londry.paragraphs.map((paragraph) => (
                  <p key={paragraph}>
                    <Rich text={paragraph} />
                  </p>
                ))}
              </div>
              <ul className="chips">
                {londry.chips.map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
            </div>
          </article>

          <article className="service service--dark">
            <div className="service__media">
              <Slot
                id="service-spotx"
                label="[PHOTO — SPOTX garment care]"
                alt={spotx.photoAlt}
                sizes="(min-width: 900px) 590px, 100vw"
              />
            </div>
            <div className="service__body">
              <p className="eyebrow eyebrow--sm">
                {spotx.eyebrow} · {SPOTX_TAGLINE}
              </p>
              <h3 className="service__title">{spotx.title}</h3>
              <p className="service__text">{spotx.text}</p>
              <p className="service__lead-in">{spotx.pointsLead}</p>
              <ol className="points">
                {spotx.points.map((point, index) => (
                  <li key={index}>
                    <span className="points__number" aria-hidden="true">
                      {index + 1}
                    </span>
                    <span>
                      <Rich text={point} />
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
