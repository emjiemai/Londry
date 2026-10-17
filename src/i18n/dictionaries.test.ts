import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { LOCALES, type Locale } from '../routes'
import { dictionaries } from './index'

/** Every string in a dictionary with its path, e.g. "services.spotx.points.1". */
function leaves(value: unknown, path = ''): Array<[string, string]> {
  if (typeof value === 'string') return [[path, value]]
  if (Array.isArray(value)) return value.flatMap((item, index) => leaves(item, `${path}.${index}`))
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => leaves(item, path ? `${path}.${key}` : key))
  }
  return []
}

const paths = (locale: Locale) => leaves(dictionaries[locale]).map(([path]) => path)

describe('dictionaries', () => {
  it('have exactly the same keys in every language', () => {
    for (const locale of LOCALES) {
      expect(paths(locale)).toEqual(paths('en'))
    }
  })

  it('contain no empty strings', () => {
    for (const locale of LOCALES) {
      for (const [path, text] of leaves(dictionaries[locale])) {
        expect(text.trim(), `${locale}: ${path}`).not.toBe('')
      }
    }
  })

  it('keep **bold** markers balanced', () => {
    for (const locale of LOCALES) {
      for (const [path, text] of leaves(dictionaries[locale])) {
        expect((text.match(/\*\*/g) ?? []).length % 2, `${locale}: ${path}`).toBe(0)
      }
    }
  })

  it('keep titles and descriptions within search-result limits', () => {
    for (const locale of LOCALES) {
      const { title, description } = dictionaries[locale].meta
      expect(title.length, `${locale} title`).toBeLessThanOrEqual(75)
      expect(description.length, `${locale} description`).toBeLessThanOrEqual(200)
    }
  })
})

describe('font coverage', () => {
  const charset = JSON.parse(readFileSync(new URL('../assets/fonts/charset.json', import.meta.url), 'utf8')) as Record<
    'latin' | 'cyrillic',
    number[]
  >
  const covered = new Set([...charset.latin, ...charset.cyrillic])
  const isWhitespace = (code: number) => code === 0x20 || code === 0xa0 || code === 0x0a

  it('has a glyph for every character used in the text', () => {
    for (const locale of LOCALES) {
      for (const [path, text] of leaves(dictionaries[locale])) {
        for (const char of text) {
          const code = char.codePointAt(0)!
          expect(
            isWhitespace(code) || covered.has(code),
            `${locale} ${path}: "${char}" (U+${code.toString(16).toUpperCase().padStart(4, '0')}) is missing from the font. Add it in scripts/make-fonts.py and re-run.`,
          ).toBe(true)
        }
      }
    }
  })

  it('keeps Uzbek and English free of Cyrillic, so those pages never download the Cyrillic font', () => {
    const cyrillic = /[Ѐ-ӿ]/
    for (const locale of ['uz', 'en'] as const) {
      for (const [path, text] of leaves(dictionaries[locale])) {
        expect(cyrillic.test(text), `${locale} ${path}`).toBe(false)
      }
    }
  })
})
