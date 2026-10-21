/**
 * Facts about the business, links and switches: the one file to edit when real details arrive.
 * Anything that is not known yet is left empty on purpose and shows up on the "to provide" list
 * (docs/TO-PROVIDE.md). Nothing here is invented.
 */

import type { Locale } from './routes'

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

/** What Google shows for one branch's public listing: the star rating. (How many people reviewed is left out on purpose.) */
export interface SiteRating {
  branch: SiteBranch['id']
  rating: number
}

/** One real customer review, word for word as written on Google (the reviewer's name is not shown). */
export interface SiteQuote {
  branch: SiteBranch['id']
  text: string
}

/** A video of the "Videos" section. */
export interface SiteVideo {
  id: string
  /**
   * A YouTube link (youtube.com/watch?v=..., youtu.be/..., youtube.com/shorts/...), which plays in place after a tap, or a
   * video file you host (put it in public/videos/ and write '/videos/name.mp4'; keep files small, a few MB).
   */
  url: string
  /** Optional cover picture, for example '/videos/name.jpg' (a file in public/videos/). A YouTube video uses its own YouTube cover without one. */
  poster?: string
  /** The title under the video, in each language. */
  title: Record<Locale, string>
  /** `'review'` puts the video in the "Reviews" row under the others (customers talking about Londry). */
  group?: 'review'
  /** Optional captions for a video file you host: a WebVTT file per language, e.g. { uz: '/videos/name.uz.vtt' }. */
  captions?: Partial<Record<Locale, string>>
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
  reviews: { ratings: readonly [SiteRating, SiteRating]; quotes: readonly [SiteQuote, SiteQuote] }
  videos: SiteVideo[]
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
   * Customer reviews floating around the phone in the first screen. Real ratings and real words, copied from the owner's
   * public Google listings on 2026-10-17: Talabalar 4.5 stars, Yunusabad 4.3 stars. How many people reviewed is not shown
   * (the owner's wish, 2026-10-21). Nothing here is invented. When Google's ratings change, change them here; to show other
   * quotes, swap the text.
   */
  reviews: {
    ratings: [
      { branch: 'talabalar', rating: 4.5 },
      { branch: 'yunusabad', rating: 4.3 },
    ],
    quotes: [
      { branch: 'talabalar', text: 'Clean self-service facility with easy instructions in English and Uzbek.' },
      { branch: 'yunusabad', text: 'Good laundry with very kind technician manager who helped us a lot.' },
    ],
  },

  /**
   * The tiles of the "Partners" section, in order. The first four are the owner's own projects as shown on the current
   * website: the LONDRY and SPOTX logos, the detergents photo and the training icon (pictures prepared from londry.uz).
   * `name` is the picture's alt text (leave it empty when the caption already says it). Captions are in the dictionaries
   * (`partners.captions`, same order).
   * To add a real partner: drop partner-5.jpg (png, webp, avif or svg also work) into src/assets/partners/, add a line
   * here and, if you like, a caption in the three dictionaries.
   */
  partners: [
    { id: 'partner-1', name: 'Londry', url: '' },
    { id: 'partner-2', name: 'SPOTX', url: '' },
    { id: 'partner-3', name: '', url: '' },
    { id: 'partner-4', name: '', url: '' },
  ],

  /**
   * The "Videos" section: the seven YouTube videos that are on the current londry.uz (channel "londry"), in the same order.
   * A YouTube video shows its cover and plays in place after a tap. `group: 'review'` puts a video in the "Reviews" row.
   * To add one, copy a line below and change the address and the titles; a small file you host in public/videos/ works too.
   * The titles are translations of the YouTube titles ("Instruction for the self-service in LONDRY", "Instruction SPOTX",
   * "Detergent", "training", "отзыв клиента").
   */
  videos: [
    {
      id: 'londry-instruction',
      url: 'https://www.youtube.com/watch?v=T6aH7jnUZFg',
      title: {
        uz: 'LONDRY self-service kirxonasi uchun yoʻriqnoma',
        ru: 'Инструкция по прачечной самообслуживания LONDRY',
        en: 'Instructions for the LONDRY self-service laundry',
      },
    },
    {
      id: 'spotx-instruction',
      url: 'https://www.youtube.com/watch?v=UMhzhUCTRLQ',
      title: { uz: 'SPOTX uchun yoʻriqnoma', ru: 'Инструкция по SPOTX', en: 'Instructions for SPOTX' },
    },
    {
      id: 'detergents',
      url: 'https://www.youtube.com/watch?v=JxV14a1zCvA',
      title: { uz: 'Yuvish vositalari', ru: 'Моющие средства', en: 'Detergents' },
    },
    {
      id: 'training',
      url: 'https://www.youtube.com/watch?v=UNAKXZWf_aQ',
      title: { uz: 'Trening', ru: 'Обучение', en: 'Training' },
    },
    {
      id: 'review-1',
      url: 'https://www.youtube.com/watch?v=TnLl69yJUHM',
      group: 'review',
      title: { uz: 'Mijoz sharhi', ru: 'Отзыв клиента', en: 'Customer review' },
    },
    {
      id: 'review-2',
      url: 'https://www.youtube.com/watch?v=1nFgTBHb83U',
      group: 'review',
      title: { uz: 'Mijoz sharhi', ru: 'Отзыв клиента', en: 'Customer review' },
    },
    {
      id: 'review-3',
      url: 'https://www.youtube.com/watch?v=SlDE81g_2T8',
      group: 'review',
      title: { uz: 'Mijoz sharhi', ru: 'Отзыв клиента', en: 'Customer review' },
    },
  ],
}

/** Same in every language: it is a brand line ("no stains"), not a translation. */
export const SPOTX_TAGLINE = 'Dogʻlar yoʻq'

export const YEAR = new Date().getFullYear()
