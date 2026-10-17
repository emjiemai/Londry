import { describe, expect, it } from 'vitest'
import { ALL_ROUTES, DEFAULT_LOCALE, alternates, parseRouteKey, pathFor, resolveRoute, routeKey } from './routes'

describe('pathFor', () => {
  it('puts the default language at the root and the others under their code', () => {
    expect(pathFor('uz')).toBe('/')
    expect(pathFor('ru')).toBe('/ru/')
    expect(pathFor('en')).toBe('/en/')
  })

  it('adds the page slug and always ends with a slash', () => {
    expect(pathFor('uz', 'terms')).toBe('/terms/')
    expect(pathFor('ru', 'privacy')).toBe('/ru/privacy/')
    expect(pathFor('en', 'terms')).toBe('/en/terms/')
  })
})

describe('resolveRoute', () => {
  it('is the inverse of pathFor for every public page', () => {
    for (const route of ALL_ROUTES) {
      expect(resolveRoute(pathFor(route.locale, route.page))).toEqual(route)
    }
  })

  it('tolerates a missing trailing slash, index.html and capitals', () => {
    expect(resolveRoute('/ru')).toEqual({ locale: 'ru', page: 'home' })
    expect(resolveRoute('/en/terms')).toEqual({ locale: 'en', page: 'terms' })
    expect(resolveRoute('/ru/index.html')).toEqual({ locale: 'ru', page: 'home' })
    expect(resolveRoute('/EN/Privacy/')).toEqual({ locale: 'en', page: 'privacy' })
    expect(resolveRoute('')).toEqual({ locale: 'uz', page: 'home' })
  })

  it('sends unknown paths to the 404 page', () => {
    expect(resolveRoute('/nope').page).toBe('notFound')
    expect(resolveRoute('/ru/nope').page).toBe('notFound')
    expect(resolveRoute('/terms/extra').page).toBe('notFound')
  })

  it('never serves the default language under /uz/ (it lives at the root)', () => {
    expect(resolveRoute('/uz/')).toEqual({ locale: DEFAULT_LOCALE, page: 'notFound' })
    expect(resolveRoute('/uz/terms/').page).toBe('notFound')
  })
})

describe('route keys', () => {
  it('round-trip, so the browser hydrates exactly the page the server drew', () => {
    for (const route of ALL_ROUTES) {
      expect(parseRouteKey(routeKey(route))).toEqual(route)
    }
    expect(parseRouteKey('uz/notFound')).toEqual({ locale: 'uz', page: 'notFound' })
  })

  it('rejects anything else', () => {
    expect(parseRouteKey(undefined)).toBeNull()
    expect(parseRouteKey('__ROUTE__')).toBeNull()
    expect(parseRouteKey('de/home')).toBeNull()
    expect(parseRouteKey('ru/pricing')).toBeNull()
  })
})

describe('alternates', () => {
  it('lists the same page in every language', () => {
    expect(alternates('terms')).toEqual([
      { locale: 'uz', path: '/terms/' },
      { locale: 'ru', path: '/ru/terms/' },
      { locale: 'en', path: '/en/terms/' },
    ])
  })
})
