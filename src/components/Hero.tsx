import { useI18n } from '../i18n/context'
import { HERO_APP_SIZES } from '../media'
import { HeroReviews } from './HeroReviews'
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
          {/* The small label belongs to the heading: the page's main title then names what it is and where ("Self-service laundry · Tashkent"). */}
          <h1 id="hero-title" className="hero__title">
            <span className="eyebrow hero__kicker">
              {eyebrowKind}
              {eyebrowCity && (
                <>
                  <span className="eyebrow__sep"> · </span>
                  <span className="eyebrow__city">{eyebrowCity}</span>
                </>
              )}
            </span>
            <span className="visually-hidden">. </span>
            <span className="hero__line">{t.hero.titleA}</span> <span className="hero__line hero__accent">{t.hero.titleB}</span>
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
            {/* The glass of the door: red that fades in from the middle towards the right rim. */}
            <defs>
              <linearGradient id="hero-door-glass" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#e32a30" stopOpacity="0.02" />
                <stop offset="1" stopColor="#e32a30" stopOpacity="0.42" />
              </linearGradient>
            </defs>
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
          <HeroReviews />
        </div>
      </div>
    </section>
  )
}
