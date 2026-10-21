import { useI18n } from '../i18n/context'
import { withCount } from '../i18n/plural'
import { site } from '../site'
import { IconStar } from './Icons'

/** Five stars with the first `rating` of them filled red (the last one clipped for 4.3 or 4.5). Decorative: the number says it. */
function Stars({ rating }: { rating: number }) {
  const row = [0, 1, 2, 3, 4].map((index) => <IconStar key={index} />)
  return (
    <span className="stars" aria-hidden="true">
      <span className="stars__row">{row}</span>
      <span className="stars__fill" style={{ width: `${(rating / 5) * 100}%` }}>
        <span className="stars__row">{row}</span>
      </span>
    </span>
  )
}

/**
 * Real Google ratings and quotes (src/site.ts) floating around the phone. For screen readers they are a plain list;
 * positions, tilt and the entrance are pure CSS (hero.css).
 */
export function HeroReviews() {
  const { t, locale } = useI18n()
  const branchName = (id: string) => t.locations.branches[site.branches.findIndex((branch) => branch.id === id)].name
  const decimalMark = locale === 'en' ? '.' : ','
  const { ratings, quotes } = site.reviews

  return (
    <ul className="reviews" aria-label={t.reviews.label}>
      {ratings.map((item, index) => (
        <li key={`rating-${item.branch}`} className={`review review--rating review--slot-${index}`}>
          <p className="review__branch">{branchName(item.branch)}</p>
          <p className="review__score">
            <Stars rating={item.rating} />
            <strong>{item.rating.toFixed(1).replace('.', decimalMark)}</strong>
          </p>
          <p className="review__count">{withCount(locale, item.count, t.reviews.count)}</p>
        </li>
      ))}
      {quotes.map((item, index) => (
        <li key={`quote-${item.branch}`} className={`review review--quote review--slot-${index + 2}`}>
          <figure>
            {/* The review is shown word for word, in the language it was written in. */}
            <blockquote lang="en">{item.text}</blockquote>
            <figcaption className="review__source">
              {t.reviews.quoteSource} · {branchName(item.branch)}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
}
