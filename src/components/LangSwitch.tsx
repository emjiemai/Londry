import { dictionaries, LOCALE_SHORT } from '../i18n'
import { useI18n } from '../i18n/context'
import { LOCALES, pathFor, type PublicPage } from '../routes'

/**
 * UZ / RU / EN. Plain links to the same page in the other language, so it works without JavaScript.
 * (A tiny inline script in <head> remembers the choice; see scripts/prerender.mjs.)
 *
 * The full language names live in aria-label, not in hidden text: hidden text is still "rendered" as far as font
 * loading goes, and "Русский" on every page would make Uzbek and English visitors download the Cyrillic font.
 * Names start with the visible code ("RU Русский") so voice-control users can say what they see.
 */
export function LangSwitch({ page }: { page: PublicPage }) {
  const { t, locale } = useI18n()

  return (
    <nav className="lang" aria-label={t.a11y.language}>
      <ul>
        {LOCALES.map((code) => {
          const current = code === locale
          return (
            <li key={code}>
              <a
                className="lang__item"
                href={pathFor(code, page)}
                lang={code}
                hrefLang={code}
                aria-label={`${LOCALE_SHORT[code]} ${dictionaries[code].languageName}`}
                aria-current={current ? 'true' : undefined}
              >
                {LOCALE_SHORT[code]}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
