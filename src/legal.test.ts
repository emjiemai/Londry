import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const folder = new URL('./content/legal/', import.meta.url)
const files = readdirSync(folder).filter((name) => /^(terms|privacy)\.(uz|ru|en)\.ts$/.test(name))

describe('the legal texts', () => {
  it('exist for both pages in all three languages', () => {
    for (const page of ['terms', 'privacy']) {
      for (const locale of ['uz', 'ru', 'en']) expect(files, `${page}.${locale}.ts`).toContain(`${page}.${locale}.ts`)
    }
  })

  it('carry no leftovers of how they were copied (a byte-order mark, a "[h1]" tag)', () => {
    for (const name of files) {
      const text = readFileSync(new URL(name, folder), 'utf8')
      expect(text.includes('﻿'), `${name} has a byte-order mark`).toBe(false)
      expect(/\[(h[1-6]|p|li)\]/.test(text), `${name} has a "[tag]" left over`).toBe(false)
    }
  })
})
