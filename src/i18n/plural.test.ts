import { describe, expect, it } from 'vitest'
import { dictionaries } from './index'
import { withCount } from './plural'
import { LOCALES } from '../routes'

describe('withCount', () => {
  const ru = { one: '{n} отзыв', few: '{n} отзыва', many: '{n} отзывов', other: '{n} отзыва' }

  it('uses the Russian plural forms', () => {
    expect(withCount('ru', 1, ru)).toBe('1 отзыв')
    expect(withCount('ru', 2, ru)).toBe('2 отзыва')
    expect(withCount('ru', 5, ru)).toBe('5 отзывов')
    expect(withCount('ru', 21, ru)).toBe('21 отзыв')
    expect(withCount('ru', 32, ru)).toBe('32 отзыва')
    expect(withCount('ru', 40, ru)).toBe('40 отзывов')
  })

  it('uses the English singular and plural', () => {
    const en = { one: '{n} review', few: '{n} reviews', many: '{n} reviews', other: '{n} reviews' }
    expect(withCount('en', 1, en)).toBe('1 review')
    expect(withCount('en', 32, en)).toBe('32 reviews')
  })

  it('has a {n} place in every language, so the number can never go missing', () => {
    for (const locale of LOCALES) {
      for (const [form, text] of Object.entries(dictionaries[locale].reviews.count)) {
        expect(text, `${locale}.reviews.count.${form}`).toContain('{n}')
      }
    }
  })
})
