import type { LegalDoc } from '../content/legal/types'
import { useI18n } from '../i18n/context'
import { pathFor } from '../routes'
import { site } from '../site'

/** Terms of Service / Privacy Policy. Shows the real text when it exists, otherwise a short notice. */
export function LegalPage({ page, doc }: { page: 'terms' | 'privacy'; doc: LegalDoc | null }) {
  const { t, locale } = useI18n()
  const fallbackTitle = page === 'terms' ? t.footer.terms : t.footer.privacy

  return (
    <div className="legal">
      <div className="container legal__inner">
        <a className="legal__back" href={pathFor(locale)}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M15 6l-6 6 6 6" />
          </svg>
          {t.legal.back}
        </a>

        <h1 className="legal__title">{doc?.title ?? fallbackTitle}</h1>

        {doc ? (
          <>
            <p className="legal__updated">
              {t.legal.updated}: {doc.updated}
            </p>
            {doc.sections.map((section) => (
              <section key={section.heading} className="legal__section">
                <h2>{section.heading}</h2>
                {section.blocks.map((block, index) =>
                  typeof block === 'string' ? (
                    <p key={index}>{block}</p>
                  ) : (
                    <ul key={index}>
                      {block.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            ))}
          </>
        ) : (
          <p className="legal__notice">{t.legal.draftNotice}</p>
        )}

        <p className="legal__contact">
          {t.legal.contactLine} <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>
        </p>
      </div>
    </div>
  )
}
