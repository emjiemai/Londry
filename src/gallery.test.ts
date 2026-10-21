import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { dictionaries } from './i18n'
import { site } from './site'

const cards = ['londry', 'spotx'] as const

describe('the photos at the top of the service cards', () => {
  it('each has its picture file and a description in every language', () => {
    for (const card of cards) {
      for (const [index, photo] of site.servicePhotos[card].entries()) {
        expect(existsSync(new URL(`./assets/gallery/${photo.id}.jpg`, import.meta.url)), `${photo.id}.jpg is missing`).toBe(true)
        for (const locale of ['uz', 'ru', 'en'] as const) {
          expect(dictionaries[locale].services[card].photoAlts[index]?.trim(), `${photo.id} has no description in ${locale}`).toBeTruthy()
        }
      }
    }
  })

  it('no photo is used twice, and no description is left over without a photo', () => {
    const ids = cards.flatMap((card) => site.servicePhotos[card].map((photo) => photo.id))
    expect(new Set(ids).size).toBe(ids.length)
    for (const card of cards) {
      for (const locale of ['uz', 'ru', 'en'] as const) {
        expect(dictionaries[locale].services[card].photoAlts.length, `${card} in ${locale}`).toBe(site.servicePhotos[card].length)
      }
    }
  })
})
