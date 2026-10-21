import type { Locale } from '../routes'

/** One text per plural form; `{n}` stands for the number. English and Uzbek need two forms, Russian needs all four. */
export interface PluralForms {
  one: string
  few: string
  many: string
  other: string
}

/** "32 Google reviews" / "32 отзыва": picks the form the language uses for this number and fills in `{n}`. */
export function withCount(locale: Locale, count: number, forms: PluralForms): string {
  let rule: Intl.LDMLPluralRule = 'other'
  try {
    rule = new Intl.PluralRules(locale).select(count)
  } catch {
    // a browser without plural data for this language: "other" is always a safe form
  }
  const template = rule === 'zero' || rule === 'two' ? forms.other : forms[rule]
  return template.replace('{n}', String(count))
}
