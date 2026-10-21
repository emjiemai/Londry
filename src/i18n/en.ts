import type { Dict } from './types'

/** English is the source of truth: it is the copy of the approved design (Londry Landing.pdf). */
export const en: Dict = {
  languageName: 'English',
  meta: {
    title: 'Self-service laundry in Tashkent, open 24 hours | Londry',
    description:
      'Londry is a 24 hour self-service laundromat in Tashkent: wash and dry big loads fast with the app. SPOTX aqua cleaning for delicate clothes. Two branches.',
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
    screenshotAlt: 'The Londry app home screen: wash, dry, or reserve a washing machine',
  },
  reviews: {
    label: 'Customer reviews on Google',
    rating: 'Google rating',
    quoteSource: 'Google review',
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
      paragraphs: [
        'Would you like to make laundry even easier? We are pleased to introduce our modern self-service laundry, LONDRY. We aim to make your life more comfortable and convenient by offering high-quality laundry services based on the most advanced technologies.',
        '**What makes our self-service laundry convenient?** Here, you will find a wide selection of modern and energy-efficient washing and drying machines that will help you handle large volumes of laundry. Our equipment ensures gentle treatment of your items, as well as fast and efficient drying.',
        'Don’t postpone your laundry in a long box, visit the LONDRY self-service laundry today!',
      ],
      chips: ['Energy-efficient', 'Large loads', 'Fast drying'],
      photoAlt: 'Inside the Londry self-service laundry',
    },
    spotx: {
      eyebrow: 'Aqua cleaning',
      title: 'SPOTX',
      text: 'We will remove contaminants from clothing, delicate fabrics, and high-end textiles with the utmost care. This is the perfect solution when dry cleaning is not suitable for delicate fabrics.',
      pointsLead: 'With SPOTX aqua cleaning, you get:',
      points: [
        'Thorough **expert analysis** of garments before selecting the cleaning mode and detergents.',
        'Use of only **professional chemicals** that pose no threat even to the most delicate fabrics.',
        '**Full-service, individual approach** to each customer – we will consider all preferences and provide special conditions.',
      ],
      photoAlt: 'Aqua cleaning of delicate clothes at SPOTX',
    },
  },
  partners: {
    eyebrow: 'Partners',
    title: 'Working together with',
    captions: ['Self-service laundry', 'Aqua cleaning', 'Detergents', 'Training'],
  },
  videos: {
    eyebrow: 'Videos',
    title: 'See how it works',
    play: 'Play video',
  },
  locations: {
    eyebrow: 'Locations',
    title: 'Two branches in Tashkent',
    directions: 'Get directions',
    open24h: 'Open 24 hours',
    branches: [
      { name: 'Talabalar', address: '81/1 Talabalar Street, Tashkent', mapAlt: 'Map of the Londry self-service laundry on Talabalar Street, Tashkent' },
      { name: 'Yunusabad', address: '1a Iftixor Street, Yunusabad, Tashkent', mapAlt: 'Map of the Londry self-service laundry on Iftixor Street, Yunusabad, Tashkent' },
    ],
  },
  faq: {
    eyebrow: 'Good to know',
    title: 'Self-service laundry in Tashkent: your questions',
    items: [
      {
        question: 'Is Londry open 24 hours?',
        answer: 'Yes. Londry is a 24 hour laundry in Tashkent: both branches, Talabalar and Yunusabad, are open day and night, so you can wash and dry whenever it suits you.',
      },
      {
        question: 'How does a self-service laundry work?',
        answer: 'Everything starts in the Londry app. Choose a washing machine and a program, then pay for the service in the app. Drying works the same way: choose a dryer and a program. You can also reserve a washing machine; the reservation is valid for 10 minutes.',
      },
      {
        question: 'Where are the Londry laundromats in Tashkent?',
        answer: 'The Talabalar branch is at 81/1 Talabalar Street, in the student area close to the dormitories. The Yunusabad branch is at 1a Iftixor Street. Both are open 24 hours.',
      },
      {
        question: 'What is SPOTX aqua cleaning?',
        answer: 'SPOTX is Londry’s aqua cleaning in Tashkent for delicate fabrics and premium textiles, when dry cleaning is not suitable. A specialist first checks each item, then chooses the program and products that are safe for it.',
      },
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
