import { describe, expect, it } from 'vitest'
import { buildHead } from './head'
import { ALL_ROUTES } from './routes'

describe('buildHead', () => {
  const home = buildHead('ru', 'home')

  it('has a title, description and canonical link for the page itself', () => {
    expect(home).toMatch(/<title>.+<\/title>/)
    expect(home).toContain('<meta name="description" content="')
    expect(home).toContain('<link rel="canonical" href="https://londry.uz/ru/">')
  })

  it('links every language version, with the Uzbek root as x-default', () => {
    expect(home).toContain('hreflang="uz" href="https://londry.uz/"')
    expect(home).toContain('hreflang="ru" href="https://londry.uz/ru/"')
    expect(home).toContain('hreflang="en" href="https://londry.uz/en/"')
    expect(home).toContain('hreflang="x-default" href="https://londry.uz/"')
  })

  it('stays hidden from search engines in the beta (VITE_INDEXABLE is not "true")', () => {
    expect(home).toContain('<meta name="robots" content="noindex,nofollow">')
  })

  it('prepares share previews in the page language', () => {
    expect(home).toContain('<meta property="og:locale" content="ru_RU">')
    expect(home).toContain('og:locale:alternate" content="uz_UZ"')
    expect(home).toContain('og:image" content="https://londry.uz/og-image.png"')
  })

  it('describes the business and both branches in structured data (home page only)', () => {
    const json = home.match(/<script type="application\/ld\+json">(.+)<\/script>/)?.[1]
    expect(json).toBeDefined()
    const graph = JSON.parse(json!)['@graph'] as Array<{ '@type': string }>
    expect(graph.filter((node) => node['@type'] === 'DryCleaningOrLaundry')).toHaveLength(2)
    expect(buildHead('en', 'terms')).not.toContain('application/ld+json')
  })

  it('escapes quotes so a title can never break out of its attribute', () => {
    for (const route of ALL_ROUTES) {
      const head = buildHead(route.locale, route.page)
      for (const content of head.matchAll(/content="([^"]*)"/g)) {
        expect(content[1]).not.toContain('"')
      }
    }
  })
})
