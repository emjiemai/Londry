import { describe, expect, it } from 'vitest'
import { dictionaries } from './i18n'
import { LOCALES, type Locale } from './routes'

/**
 * What the owner chose to be found for (2026-10-20), per language. Each phrase must appear, word for word (ignoring word
 * endings such as Tashkent / Tashkentda), inside ONE piece of text of the page: the title, the description, the headline,
 * a question or an answer. See docs/SEO.md for where each phrase is used.
 */
const KEYWORDS: Record<Locale, string[]> = {
  uz: ['toshkentda kir yuvish', 'self-service kir yuvish xonasi toshkent', '24 soat ochiq kir yuvish xonasi', 'akva tozalash toshkent'],
  ru: ['прачечная самообслуживания ташкент', 'круглосуточная прачечная ташкент', 'аквачистка ташкент', 'постирать вещи ташкент'],
  en: ['self-service laundry tashkent', 'laundromat tashkent', '24 hour laundry tashkent', 'aqua cleaning tashkent'],
}

const words = (text: string) =>
  text
    .toLowerCase()
    .replace(/[ ʻ’']/g, (mark) => (mark === ' ' ? ' ' : ''))
    .replace(/[.,:;·|—–!?()«»"]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)

/** Every piece of text a search engine reads as one unit. */
function fields(locale: Locale): string[] {
  const t = dictionaries[locale]
  return [
    t.meta.title,
    t.meta.description,
    `${t.hero.eyebrow} ${t.hero.titleA} ${t.hero.titleB}`,
    t.hero.lead,
    t.footer.about,
    t.faq.title,
    ...t.faq.items.flatMap((item) => [item.question, item.answer]),
  ]
}

/** All words of the phrase occur in the text, each as a word that starts with it ("tashkent" matches "tashkentda"). */
function contains(text: string, phrase: string): boolean {
  const haystack = words(text)
  return words(phrase).every((token) => haystack.some((word) => word === token || (token.length >= 5 && word.startsWith(token))))
}

describe('search keywords', () => {
  for (const locale of LOCALES) {
    it(`${locale}: every chosen phrase is on the page, all its words together in one text`, () => {
      for (const phrase of KEYWORDS[locale]) {
        expect(
          fields(locale).some((text) => contains(text, phrase)),
          `${locale}: "${phrase}" is not on the page`,
        ).toBe(true)
      }
    })

    it(`${locale}: the title leads with what Londry is and fits a search result`, () => {
      const { title, description } = dictionaries[locale].meta
      expect(title.length, `${locale} title`).toBeLessThanOrEqual(64)
      expect(description.length, `${locale} description`).toBeLessThanOrEqual(162)
      expect(description.length, `${locale} description is too short to sell the page`).toBeGreaterThanOrEqual(110)
      expect(title.toLowerCase()).toContain('londry')
    })
  }

  it('the headline (label + title) names the kind of business and the city in every language', () => {
    const wanted: Record<Locale, string[]> = { uz: ['kir yuvish xonasi', 'toshkent'], ru: ['прачечная', 'ташкент'], en: ['laundry', 'tashkent'] }
    for (const locale of LOCALES) {
      const t = dictionaries[locale]
      // a phrase may be several words ("kir yuvish xonasi"); it must start at a word, but may be inflected at its end
      const heading = ` ${words(`${t.hero.eyebrow} ${t.hero.titleA} ${t.hero.titleB}`).join(' ')}`
      for (const token of wanted[locale]) {
        expect(heading.includes(` ${token}`), `${locale}: headline lacks "${token}"`).toBe(true)
      }
    }
  })
})
