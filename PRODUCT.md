# Product

<!-- impeccable:product-schema 1 -->

> Written from the owner's brief and the approved comp (`Londry Landing.pdf`) without an interview, because the owner asked for the beta to be built now.
> Facts marked **(assumed)** are inferences to confirm; everything else comes straight from the brief or the comp.

## Platform

web

## Stack

React.js was the owner's explicit choice. The rest was delegated: Vite + React 19 + TypeScript, pages pre-rendered to static HTML (so content shows instantly and without JavaScript), plain modern CSS, self-hosted Montserrat, a small service worker for offline/slow-network resilience. Chosen because the owner asked for speed on every device and in poor network conditions.

## Users

People in Tashkent who need laundry done: (1) self-service customers who want to wash and dry big loads fast, and (2) owners of delicate or high-end garments who need gentle aqua cleaning. **(assumed)** Mostly on phones, arriving from Instagram, Telegram, Google or Yandex search, often on mobile data of variable quality and on mid-range or low-end Android devices. Three languages in daily use: Uzbek, Russian, English.

## Product Purpose

Londry is a self-service laundry with energy-efficient washers and dryers that take large loads and dry fast; "everything starts in the Londry app". SPOTX is the sister aqua-cleaning service for delicate fabrics and high-end textiles when dry cleaning isn't an option.
The landing page exists to get visitors to download the app (primary action), find one of the two branches (secondary), or call / follow on Instagram. **(assumed)** Success = app-store clicks, direction requests, phone calls.

## Positioning

"Clean clothes, without the wait." Large loads and fast drying in one self-service place, plus an expert aqua-cleaning service (SPOTX) under the same roof of brands. Everything is driven from the app.

## Operating Context

- Domain: londry.uz
- Branches: Talabalar (81/1 Talabalar Street, Tashkent) and Yunusabad (1a Iftixor Street, Yunusabad, Tashkent)
- Phone: +998 97 444 81 93 · Instagram: @londry.uz
- Languages: Uzbek (Latin script), Russian, English. The comp's copy is English and is the source of truth; Uzbek and Russian are drafts that need native review.
- Footer links to Terms of Service and Privacy Policy.

## Capabilities and Constraints

- Static marketing site, no backend, no forms, no accounts. **(assumed)**
- Must be fast and robust: low bandwidth, high latency, offline, low-end CPUs, small and large screens, old browsers, no-JS, data-saver.
- Beta now; photos, partner logos, legal texts and the official logo files come later. The app screenshot, the store links and the exact branch positions have arrived.
- Undecided, do not invent: prices, partner names, analytics provider. (Opening hours, store URLs and branch positions have arrived from the owner.)
- Hosting target is unknown **(assumed)**: output must be plain static files that work on any host.

## Brand Commitments

The approved comp is binding: Montserrat; red (measured `#E42A30`, shipped as `#E32A30`, one step darker so white text on it reaches 4.5:1) with ink `#111111` on white and `#F5F5F5` bands; the "washing-machine door" mark (red ring with a half disc) used in the wordmark and the hero ring; `LONDRY | SPOTX` header lockup; rounded cards; the exact English copy and section order.

## Evidence on Hand

- `Londry Landing.pdf`: three-page desktop comp (1440 px frame at 2x).
- Real facts: phone, two addresses, Instagram handle, map links embedded in the PDF. From the owner's Google listings (2026-10-17): ratings (Talabalar 4.5 from 32 reviews, Yunusabad 4.3 from 40), two public review quotes, "open 24 hours", the store links and the exact branch positions.
- Absent, never fabricate: photos, partner names/logos, other testimonials or reviews, prices, legal text.

## Product Principles

1. Speed is a feature: the page must be usable within a couple of round trips on a weak network, and must not depend on JavaScript to be useful.
2. One clear next step (get the app), with two quiet alternatives (find a branch, call).
3. Three languages are equal citizens, each a real, shareable, indexable URL.
4. Honest placeholders: unknown facts stay visibly unknown and land on the owner's to-provide list.
5. The comp is the design; responsive layouts extend it in its own grammar and never restyle it.

## Accessibility & Inclusion

**(assumed)** WCAG 2.2 AA as the bar: keyboard and screen-reader operable, sufficient contrast, scalable text and reflow (checked at 200% text size), reduced-motion respected, correct `lang` per page, touch targets of at least 44 px where space allows and never below the WCAG 2.2 AA minimum of 24 px.
