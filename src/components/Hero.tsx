import { useI18n } from '../i18n/context'
import { HERO_APP_SIZES } from '../media'
import { IconCheck } from './Icons'
import { Slot } from './Slot'
import { StoreButtons } from './StoreButtons'

export function Hero() {
  const { t } = useI18n()
  // "Self-service laundry · Tashkent": on phones the city moves to its own line (see hero.css) instead of wrapping mid-label.
  const [eyebrowKind, eyebrowCity] = t.hero.eyebrow.split(' · ')

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">
            {eyebrowKind}
            {eyebrowCity && (
              <>
                <span className="eyebrow__sep"> · </span>
                <span className="eyebrow__city">{eyebrowCity}</span>
              </>
            )}
          </p>
          <h1 id="hero-title" className="hero__title">
            <span>{t.hero.titleA}</span> <span className="hero__accent">{t.hero.titleB}</span>
          </h1>
          <p className="hero__lead">{t.hero.lead}</p>
          <StoreButtons id="download" />
          <ul className="checks">
            {t.hero.checks.map((text) => (
              <li key={text}>
                <IconCheck />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual">
          {/* The washing-machine door from the logo, enlarged: a ring with the right half tinted. */}
          <svg className="hero__ring" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
            <path className="hero__ring-tint" d="M50 5.7A44.3 44.3 0 0 1 50 94.3z" />
            <circle cx="50" cy="50" r="47.15" fill="none" stroke="currentColor" strokeWidth="5.7" />
          </svg>
          <div className="phone">
            <div className="phone__screen">
              <Slot
                id="hero-app"
                label="[APP SCREENSHOT — home screen]"
                alt={t.hero.screenshotAlt}
                sizes={HERO_APP_SIZES}
                showIcon
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
