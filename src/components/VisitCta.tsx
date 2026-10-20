import { useI18n } from '../i18n/context'
import { BranchButtons } from './BranchButtons'

/** The closing call to action: a full red band that sends people to a branch. (The app buttons are in the first screen.) */
export function VisitCta() {
  const { t } = useI18n()

  return (
    <section id="visit" className="section section--cta" aria-labelledby="visit-title">
      <div className="container">
        <div className="cta">
          <div className="cta__copy">
            <h2 id="visit-title" className="cta__title">
              {t.cta.title}
            </h2>
            <p className="cta__text">{t.cta.text}</p>
          </div>
          <BranchButtons />
        </div>
      </div>
    </section>
  )
}
