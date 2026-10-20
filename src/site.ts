/**
 * Facts about the business, links and switches: the one file to edit when real details arrive.
 * Anything that is not known yet is left empty on purpose and shows up on the "to provide" list
 * (docs/TO-PROVIDE.md). Nothing here is invented.
 */

export interface SiteBranch {
  id: 'talabalar' | 'yunusabad'
  /** Opens the route in Google Maps, straight to the branch. Replace with Yandex/2GIS links if you prefer. */
  directionsUrl: string
  /** English street line, used for search-engine structured data. */
  street: string
  /**
   * The exact spot, read from the owner's Google listing and matched to OpenStreetMap (about 20 m accuracy for
   * Talabalar, 10 m for Yunusabad). Used for directions, search snippets and the map pictures. Keep in step with
   * scripts/maps/branches.json (a unit test checks it), then run `npm run maps` to redraw the pictures.
   */
  geo: { lat: number; lng: number }
  /** Open around the clock (both branches, according to the owner's Google listing). Shows a line on the branch card. */
  open24h: boolean
}

export interface SitePartner {
  id: string
  /** Company name: used as the logo's alt text. */
  name: string
  /** Optional link opened when the logo is clicked. */
  url: string
}

export interface Site {
  name: string
  url: string
  indexable: boolean
  phone: { display: string; tel: string }
  instagram: { handle: string; url: string }
  stores: { appStore: string; googlePlay: string }
  branches: [SiteBranch, SiteBranch]
  partners: SitePartner[]
}

const rawUrl = import.meta.env.VITE_SITE_URL?.trim()

export const site: Site = {
  name: 'Londry',

  /** Public address, no trailing slash. Set VITE_SITE_URL in .env.production. */
  url: (rawUrl || 'https://londry.uz').replace(/\/+$/, ''),

  /** Beta keeps the site out of search engines. Set VITE_INDEXABLE=true in .env.production to launch. */
  indexable: import.meta.env.VITE_INDEXABLE === 'true',

  // Non-breaking spaces keep the number on one line; at huge text sizes it can still wrap instead of overflowing.
  phone: { display: '+998\u00a097\u00a0444\u00a081\u00a093', tel: '+998974448193' },

  instagram: { handle: '@londry.uz', url: 'https://instagram.com/londry.uz' },

  /**
   * App store links. While a link is empty its button says "Coming soon" and does not navigate.
   *   appStore:   https://apps.apple.com/uz/app/...
   *   googlePlay: https://play.google.com/store/apps/details?id=...
   */
  stores: {
    appStore: 'https://apps.apple.com/us/app/londry-uzbekistan/id6741739773',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.innovationscript.android.londry&pcampaignid=web_share',
  },

  /** Same order as `locations.branches` in the dictionaries. */
  branches: [
    {
      id: 'talabalar',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=41.35161,69.21237',
      street: '81/1 Talabalar Street',
      geo: { lat: 41.35161, lng: 69.21237 },
      open24h: true,
    },
    {
      id: 'yunusabad',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=41.34811,69.28522',
      street: '1a Iftixor Street, Yunusabad',
      geo: { lat: 41.34811, lng: 69.28522 },
      open24h: true,
    },
  ],

  /**
   * Partner logos. Drop the logo files into src/assets/partners/ named partner-1.svg ... partner-6.svg
   * (png / webp also work), then fill in the name (alt text) and an optional link here.
   */
  partners: [
    { id: 'partner-1', name: '', url: '' },
    { id: 'partner-2', name: '', url: '' },
    { id: 'partner-3', name: '', url: '' },
    { id: 'partner-4', name: '', url: '' },
    { id: 'partner-5', name: '', url: '' },
    { id: 'partner-6', name: '', url: '' },
  ],
}

/** Same in every language: it is a brand line ("no stains"), not a translation. */
export const SPOTX_TAGLINE = 'Dogʻlar yoʻq'

export const YEAR = new Date().getFullYear()
