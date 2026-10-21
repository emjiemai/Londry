import { useI18n } from '../i18n/context'
import { IconChevronDown } from './Icons'

/**
 * The questions people type into search engines (open 24 hours, how the app works, where the branches are, what SPOTX is),
 * answered with facts only. Native <details>: works with no JavaScript, for the keyboard and for screen readers.
 */
export function Faq() {
  const { t } = useI18n()

  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <header className="section__head section__head--faq">
          <p className="eyebrow">{t.faq.eyebrow}</p>
          <h2 id="faq-title" className="h2">
            {t.faq.title}
          </h2>
        </header>

        <div className="faq">
          {t.faq.items.map((item) => (
            <details key={item.question} className="faq__item">
              <summary className="faq__question">
                <h3 className="faq__q">{item.question}</h3>
                <IconChevronDown />
              </summary>
              <p className="faq__answer">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
