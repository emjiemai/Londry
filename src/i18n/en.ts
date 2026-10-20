import type { Dict } from './types'

/** English is the source of truth: it is the copy of the approved design (Londry Landing.pdf). */
export const en: Dict = {
  languageName: 'English',
  meta: {
    title: 'Londry — Self-service laundry in Tashkent | SPOTX aqua cleaning',
    description:
      'Wash and dry big loads fast in energy-efficient machines, or leave delicate items to SPOTX aqua cleaning. Two branches in Tashkent. Everything starts in the Londry app.',
  },
  a11y: {
    skip: 'Skip to content',
    menu: 'Menu',
    language: 'Language',
    home: 'Londry — home',
    mainNav: 'Main',
  },
  nav: { services: 'Services', partners: 'Partners', locations: 'Locations', contact: 'Contact' },
  header: { cta: 'Get the app', ctaShort: 'Get the app' },
  stores: { appStoreLead: 'Download on the', googlePlayLead: 'Get it on', soon: 'Coming soon' },
  hero: {
    eyebrow: 'Self-service laundry · Tashkent',
    titleA: 'Clean clothes,',
    titleB: 'without the wait.',
    lead: 'Wash and dry big loads fast in our energy-efficient machines — or leave your delicate items to SPOTX aqua cleaning. Everything starts in the Londry app.',
    checks: ['2 branches in Tashkent', 'Large loads, fast drying', 'Uzbek · Russian · English'],
    screenshotAlt: 'The Londry app home screen',
  },
  strip: {
    callLabel: 'Call us',
    branchLabel: 'Find a branch',
    branchValue: 'Talabalar · Yunusabad',
    followLabel: 'Follow us',
  },
  services: {
    eyebrow: 'Our services',
    title: 'Pick what your clothes need',
    londry: {
      eyebrow: 'Self-service laundry',
      title: 'Londry',
      text: 'A modern self-service laundry that makes washing easier and more convenient. Energy-efficient washers and dryers take large loads, treat your items gently and dry them fast.',
      chips: ['Energy-efficient', 'Large loads', 'Fast drying'],
      photoAlt: 'Inside the Londry laundry',
    },
    spotx: {
      eyebrow: 'Aqua cleaning',
      title: 'SPOTX',
      text: 'For delicate fabrics and high-end textiles when dry cleaning isn’t an option.',
      points: [
        '**Expert analysis** of every garment before choosing the mode and detergents',
        '**Professional chemicals** safe for the most delicate fabrics',
        '**Individual approach** with special conditions on request',
      ],
      photoAlt: 'Garment care at SPOTX',
    },
  },
  partners: { eyebrow: 'Partners', title: 'Working together with' },
  locations: {
    eyebrow: 'Locations',
    title: 'Two branches in Tashkent',
    directions: 'Get directions',
    open24h: 'Open 24 hours',
    branches: [
      { name: 'Talabalar', address: '81/1 Talabalar Street, Tashkent', mapAlt: 'Map: Talabalar 81/1' },
      { name: 'Yunusabad', address: '1a Iftixor Street, Yunusabad, Tashkent', mapAlt: 'Map: Iftixor 1a' },
    ],
  },
  cta: {
    title: 'Come by any time.',
    text: 'Both branches are open 24 hours. Pick the closest one and get directions.',
  },
  footer: {
    about: 'Self-service laundry and SPOTX aqua cleaning in Tashkent.',
    contact: 'Contact',
    addresses: 'Addresses',
    instagram: 'Instagram',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    rights: 'Londry.uz',
  },
  legal: {
    back: 'Back to home',
    updated: 'Last updated',
    contactLine: 'Questions? Call us at',
    draftNotice: 'The full text of this document will be published here soon.',
  },
  notFound: { title: 'Page not found', text: 'This page doesn’t exist or has moved.', home: 'Go to the home page' },
  offline: {
    title: 'You’re offline',
    text: 'No connection right now. Here is what you need most.',
    retry: 'Try again',
  },
}
