# Londry — londry.uz (beta)

Website for **Londry** (self-service laundry) and **SPOTX** (aqua cleaning) in Tashkent. Built with React 19, Vite and
TypeScript from the approved design (`Londry Landing.pdf`). Three languages: Uzbek, Russian, English.

The site is **static**: `npm run build` produces plain files in `dist/` that any web host can serve. There is no server
and no database to maintain.

## Quick start

```bash
npm install          # once
npm run dev          # live preview while you edit: http://localhost:5173
npm run build        # builds the finished website into dist/
npm run preview      # tests the real build locally: http://localhost:4173
npm run check        # everything: types, lint, unit tests, build, browser tests
```

Needs Node 20.19 or newer. Browser tests use the Google Chrome that is already installed.

## Where do I change things?

| I want to…                                      | Edit                                                                                   |
| ----------------------------------------------- | -------------------------------------------------------------------------------------- |
| Change any text, or fix a translation           | `src/i18n/en.ts`, `ru.ts`, `uz.ts` (TypeScript refuses to build if the three differ)   |
| Phone, Instagram, **store links**, branch positions and route links, review numbers and quotes | `src/site.ts` (the one file with business facts) |
| Add the laundry/SPOTX photos, or swap the app screenshot | Drop a file named after the slot into `src/assets/images/`, rebuild. Names in `src/media.ts` |
| Move a map pin, change a map's zoom, or fix a street name on it | `scripts/maps/branches.json` and `src/site.ts`, then `npm run maps` (see below) |
| Add partner logos                               | `src/assets/partners/partner-1.svg` … `partner-6.svg`, names in `src/site.ts`          |
| Add Terms of Service / Privacy Policy text      | `src/content/legal/` (instructions at the top of `index.ts`)                           |
| Colours, spacing, corner radii                  | `src/styles/tokens.css`                                                                |
| Replace the logo with the official file         | `src/components/Logo.tsx`                                                              |
| Share-preview picture (Telegram, Instagram…)    | `public/og-image.png` (1200 × 630)                                                     |
| Icons and favicon                               | `scripts/art/mark.svg`, then `npm run icons`                                           |
| **Go live** (let Google/Yandex index the site)  | `.env.production` → `VITE_INDEXABLE=true`, then rebuild. See `docs/DEPLOY.md`          |

## The map pictures

The two branch maps are **pictures drawn from OpenStreetMap data** in the Londry style (quiet grey map, one red pin), not live Google or Yandex maps. That keeps the page fast on weak internet, sets no cookies and loads no third-party script. Tapping a map, or the red button, opens the route to the branch in Google Maps. The pin positions were read from your Google listing and matched to OpenStreetMap (Talabalar about 25 m, Yunusabad about 10 m); if one looks wrong, send the Google Maps *Share* link and I will move it.

To redraw them (move a pin, change the zoom): edit `scripts/maps/branches.json` and the position in `src/site.ts`, then run `npm install --no-save maplibre-gl@5.24.0` once and `npm run maps` (needs internet and Google Chrome). The credit "© OpenStreetMap contributors" must stay on the page; it is shown under the maps and inside the pictures.

Everything the site still needs from you is listed in **`docs/TO-PROVIDE.md`**. How to put it online: **`docs/DEPLOY.md`**.

## How it behaves in bad conditions

| Condition | What the site does |
| --- | --- |
| **Slow or unstable mobile internet** | Every page is finished HTML: one 11 KB request shows the whole readable page. CSS is inlined (no blocking request). Fonts are subset (20 KB). The JavaScript (67 KB) loads only after the page is done, at low priority. Measured on simulated Slow 3G (400 kbps, 400 ms): headline visible in **1.1 s**, no layout shift. |
| **Data saver on / 2G** | Skips JavaScript and the service worker completely. The page is fully usable without them. |
| **No connection** | A service worker keeps pages you have visited. Opening an unvisited page shows an offline page with the phone number and both addresses. |
| **JavaScript off, blocked, or failing** | All content, links, the language switch and the mobile menu work with no script. |
| **Cheap phones** | Almost no JavaScript work (about 0.28 s of long tasks on a 4× slowed CPU), no heavy effects, one small animation that uses only the GPU, and `prefers-reduced-motion` is respected. |
| **Any screen** | Tested from 320 px to 1920 px wide, phone and desktop, in all three languages (the Russian header is the tightest). No sideways scrolling anywhere. Notch/landscape safe areas handled. Older iPhones without CSS `aspect-ratio` get a fallback. |
| **Accessibility** | Keyboard operable, skip link, screen-reader labels, AA contrast. Works with browser text enlarged to 200% (no sideways scrolling, nothing clipped) and in Windows High Contrast mode. Automated check (axe) finds nothing on any page. |
| **Three languages** | Each language is its own address (`/`, `/ru/`, `/en/`), with `hreflang` for search engines. A visitor's choice is remembered. Russian pages alone download the Cyrillic font. |
| **Search and sharing** | Per-language titles, descriptions, structured data (business + both branches) and share previews. Hidden from search engines until you launch. |
| **Photos (when you add them)** | Converted to AVIF/WebP/JPEG in five sizes, lazy-loaded, with reserved space so nothing jumps. |
| **Privacy and safety** | No cookies, no trackers, no third-party scripts, no external fonts. |
| **Older browsers** | Built for browsers from about 2021 onward. Older ones still get readable pages. |

Lighthouse (mobile profile) on the beta build: **Performance 100, Accessibility 100, Best Practices 100**. SEO shows 69
only because the beta is deliberately hidden from search engines; it becomes 100 when you launch.

## Project layout

```
src/
  site.ts            business facts and links
  routes.ts          every address of the site
  i18n/              uz.ts ru.ts en.ts (+ types that keep them identical)
  components/        Header, Hero, Services, Partners, Locations, Footer, ...
  pages/             Home, Legal (Terms/Privacy), 404 + offline
  content/legal/     long legal texts (loaded only on their own pages)
  styles/            tokens.css (design values) and one file per area
  media.ts           photo/screenshot/logo slots
  assets/            fonts (subset Montserrat), images/, partners/
scripts/
  prerender.mjs      turns the build into finished pages, sitemap, service worker
  sw.template.js     the service worker
  make-fonts.py, make-icons.mjs, make-maps.mjs   one-off tools (their output is committed)
  maps/              style, drawing code and branch settings for the two map pictures
public/              favicon, icons, manifest, share image, host config (_headers, .htaccess)
e2e/                 browser tests (npm run e2e)
docs/                TO-PROVIDE.md, DEPLOY.md
```

## Decisions made for you (all easy to change)

- **Uzbek is the default** language at `londry.uz/`; Russian is `/ru/`, English `/en/`. Change `DEFAULT_LOCALE` in `src/routes.ts`.
- **The beta is hidden from search engines.** Flip `VITE_INDEXABLE` at launch.
- **Store buttons use your real App Store and Google Play links** (`src/site.ts`). If a link is ever left empty, its button shows "Coming soon" instead of a dead link.
- **Uzbek and Russian texts are my drafts.** Have a native speaker read them before launch.
- The logo is **redrawn from the design** as vector. Replace it with the official file when you have it.
- **The closing red band is now "Come by any time" with a route button for each branch** (the app buttons stay in the first screen), and each branch card says "Open 24 hours" (from your Google listing).
- React renders every page at build time and again in the browser; the browser part loads last and only on normal connections.
