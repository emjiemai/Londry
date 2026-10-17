/**
 * Every public URL of the site, in one place. Shared by the browser, the pre-renderer and the tests.
 *
 *   /            Uzbek (default language, lives at the root)
 *   /ru/  /en/   other languages
 *   /terms/ /privacy/ and their /ru/ /en/ twins
 *
 * Every page is a real, separate HTML file (see scripts/prerender.mjs), so each language can be linked,
 * shared and indexed on its own.
 */
export const LOCALES = ['uz', 'ru', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'uz'

/** Pages that get their own URL. */
export const PAGES = ['home', 'terms', 'privacy'] as const
export type PublicPage = (typeof PAGES)[number]

/** Extra pages that are rendered but are not part of the sitemap. */
export type PageId = PublicPage | 'notFound' | 'offline'

export interface Route {
  locale: Locale
  page: PageId
}

const SLUGS: Record<PublicPage, string> = { home: '', terms: 'terms', privacy: 'privacy' }

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

/** URL path of a public route, always with a trailing slash: `/`, `/ru/`, `/ru/terms/`. */
export function pathFor(locale: Locale, page: PublicPage = 'home'): string {
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
  const slug = SLUGS[page]
  return `${prefix}${slug ? `/${slug}` : ''}/`
}

/**
 * Inverse of pathFor. Tolerates a missing trailing slash and `index.html`.
 * Unknown paths resolve to the 404 page (in the default language).
 */
export function resolveRoute(pathname: string): Route {
  const segments = pathname
    .replace(/\/index\.html$/i, '/')
    .split('/')
    .filter(Boolean)
    .map((segment) => segment.toLowerCase())

  let locale: Locale = DEFAULT_LOCALE
  const first = segments[0]
  if (first && isLocale(first)) {
    // The default language lives at the root, never under /uz/.
    if (first === DEFAULT_LOCALE) return { locale: DEFAULT_LOCALE, page: 'notFound' }
    locale = first
    segments.shift()
  }

  const slug = segments.join('/')
  const page = PAGES.find((candidate) => SLUGS[candidate] === slug)
  return page ? { locale, page } : { locale: DEFAULT_LOCALE, page: 'notFound' }
}

/** Compact id written into the pre-rendered HTML (`data-route`) so the browser hydrates exactly what the server drew. */
export function routeKey({ locale, page }: Route): string {
  return `${locale}/${page}`
}

export function parseRouteKey(key: string | undefined): Route | null {
  if (!key) return null
  const [locale, page] = key.split('/')
  const knownPage = page === 'notFound' || page === 'offline' || (PAGES as readonly string[]).includes(page)
  return isLocale(locale) && knownPage ? { locale, page: page as PageId } : null
}

/** Every URL we pre-render and list in the sitemap. */
export const ALL_ROUTES: Array<Route & { page: PublicPage }> = LOCALES.flatMap((locale) =>
  PAGES.map((page) => ({ locale, page })),
)

/** The same page in every language (used for the language switch and `hreflang`). */
export function alternates(page: PublicPage): Array<{ locale: Locale; path: string }> {
  return LOCALES.map((locale) => ({ locale, path: pathFor(locale, page) }))
}
