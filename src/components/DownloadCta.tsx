import { useI18n } from '../i18n/context'
import { StoreButtons } from './StoreButtons'

/** The closing call to action: a full red band with the store buttons. */
export function DownloadCta() {
  const { t } = useI18n()

  return (
    <section id="download" className="section section--cta" aria-labelledby="download-title">
      <div className="container">
        <div className="cta">
          <div className="cta__copy">
            <h2 id="download-title" className="cta__title">
              {t.cta.title}
            </h2>
            <p className="cta__text">{t.cta.text}</p>
          </div>
          <StoreButtons />
        </div>
      </div>
    </section>
  )
}
