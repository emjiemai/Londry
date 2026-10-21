import type { Locale } from '../routes'

/** One frequently asked question and its answer (plain text). */
export interface FaqItem {
  question: string
  answer: string
}

export interface Branch {
  name: string
  address: string
  /** Accessible label for the map image / link. */
  mapAlt: string
}

/**
 * Every piece of text on the site. All three languages must satisfy this type, so a missing or extra
 * string is a compile error, never a half-translated page.
 *
 * `**double asterisks**` mark bold text (see components/Rich.tsx).
 */
export interface Dict {
  /** Name of the language in that language (used by the language switch). */
  languageName: string
  meta: { title: string; description: string }
  a11y: { skip: string; menu: string; language: string; home: string; mainNav: string }
  nav: { services: string; partners: string; locations: string; contact: string }
  /** `ctaShort` is the label in the header bar (little room); `cta` is used where there is room (mobile menu). */
  header: { cta: string; ctaShort: string }
  stores: { appStoreLead: string; googlePlayLead: string; soon: string }
  hero: {
    eyebrow: string
    titleA: string
    titleB: string
    lead: string
    checks: readonly [string, string, string]
    screenshotAlt: string
  }
  /** The review cards around the phone: `rating` labels the stars on a rating card, `quoteSource` sits under a quote. No review counts. */
  reviews: {
    label: string
    rating: string
    quoteSource: string
  }
  strip: { callLabel: string; branchLabel: string; branchValue: string; followLabel: string }
  services: {
    eyebrow: string
    title: string
    londry: {
      eyebrow: string
      title: string
      paragraphs: readonly [string, string, string]
      chips: readonly [string, string, string]
      photoAlt: string
    }
    spotx: {
      eyebrow: string
      title: string
      text: string
      /** The line that introduces the numbered points (in English: With SPOTX aqua cleaning, you get). */
      pointsLead: string
      points: readonly [string, string, string]
      photoAlt: string
    }
  }
  /** `captions` are shown under the tiles, in the same order as `site.partners`. The row has no heading (the owner asked for none). */
  partners: { captions: readonly string[] }
  /** `label` names the section for screen readers (nothing is shown above the videos); `reviewsTitle` heads the row of customer videos. */
  videos: { label: string; reviewsTitle: string; play: string }
  locations: { eyebrow: string; title: string; directions: string; open24h: string; branches: readonly [Branch, Branch] }
  /** The questions people type into search engines, answered with facts only: open 24 hours, the app, the branches, SPOTX. */
  faq: { eyebrow: string; title: string; items: readonly [FaqItem, FaqItem, FaqItem, FaqItem] }
  cta: { title: string; text: string }
  footer: {
    about: string
    contact: string
    addresses: string
    instagram: string
    terms: string
    privacy: string
    rights: string
  }
  legal: { back: string; updated: string; contactLine: string; draftNotice: string }
  notFound: { title: string; text: string; home: string }
  offline: { title: string; text: string; retry: string }
}

export type Dictionaries = Record<Locale, Dict>
