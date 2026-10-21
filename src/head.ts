import { dictionaries, OG_LOCALE } from './i18n'
import { alternates, DEFAULT_LOCALE, LOCALES, pathFor, type Locale, type PublicPage } from './routes'
import { site } from './site'

/** The OG preview image (1200 x 630). Replace public/og-image.png with the real artwork. */
const OG_IMAGE = { path: '/og-image.png', width: 1200, height: 630 }

const attr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const absolute = (path: string) => `${site.url}${path}`

const OPEN_24_HOURS = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  opens: '00:00',
  closes: '23:59',
}

/** schema.org data: the business, its two branches and how to reach them. Only facts that are known. */
function structuredData(locale: Locale) {
  const t = dictionaries[locale]
  const organization = {
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: `${site.url}/`,
    logo: absolute('/icons/icon-512.png'),
    description: t.meta.description,
    areaServed: { '@type': 'City', name: 'Tashkent' },
    telephone: `+${site.phone.tel.replace(/^\+/, '')}`,
    sameAs: [site.instagram.url],
  }
  const branches = site.branches.map((branch, index) => ({
    '@type': 'DryCleaningOrLaundry',
    '@id': `${site.url}/#${branch.id}`,
    name: `${site.name} — ${t.locations.branches[index].name}`,
    url: absolute(pathFor(locale)),
    telephone: organization.telephone,
    parentOrganization: { '@id': organization['@id'] },
    address: {
      '@type': 'PostalAddress',
      streetAddress: branch.street,
      addressLocality: 'Tashkent',
      addressCountry: 'UZ',
    },
    hasMap: branch.directionsUrl,
    geo: { '@type': 'GeoCoordinates', latitude: branch.geo.lat, longitude: branch.geo.lng },
    ...(branch.open24h ? { openingHoursSpecification: OPEN_24_HOURS } : {}),
  }))
  return { '@context': 'https://schema.org', '@graph': [organization, ...branches] }
}

/**
 * Everything that goes in <head> for a public page: title, description, canonical, hreflang, share previews, structured
 * data. Built once per page at build time (scripts/prerender.mjs), so crawlers and link previews never need JavaScript.
 */
export function buildHead(locale: Locale, page: PublicPage): string {
  const t = dictionaries[locale]
  const title =
    page === 'home' ? t.meta.title : `${page === 'terms' ? t.footer.terms : t.footer.privacy} — ${site.name}`
  const description = t.meta.description
  const url = absolute(pathFor(locale, page))
  const image = absolute(OG_IMAGE.path)

  const tags: string[] = [
    `<title>${attr(title)}</title>`,
    `<meta name="description" content="${attr(description)}">`,
    site.indexable
      ? '<meta name="robots" content="index,follow,max-image-preview:large">'
      : '<meta name="robots" content="noindex,nofollow">',
    `<link rel="canonical" href="${url}">`,
    ...alternates(page).map(
      ({ locale: code, path }) => `<link rel="alternate" hreflang="${code}" href="${absolute(path)}">`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${absolute(pathFor(DEFAULT_LOCALE, page))}">`,

    // Link previews (Telegram, Instagram, WhatsApp, Facebook, X ...)
    '<meta property="og:type" content="website">',
    `<meta property="og:site_name" content="${attr(site.name)}">`,
    `<meta property="og:title" content="${attr(title)}">`,
    `<meta property="og:description" content="${attr(description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:locale" content="${OG_LOCALE[locale]}">`,
    ...LOCALES.filter((code) => code !== locale).map(
      (code) => `<meta property="og:locale:alternate" content="${OG_LOCALE[code]}">`,
    ),
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}">`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}">`,
    `<meta property="og:image:alt" content="${attr(t.meta.title)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
  ]

  if (page === 'home') {
    // "<" is escaped so the JSON can never close the script tag early.
    const json = JSON.stringify(structuredData(locale)).replace(/</g, '\\u003c')
    tags.push(`<script type="application/ld+json">${json}</script>`)
  }

  return tags.join('\n    ')
}
