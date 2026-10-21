# Search engines (SEO): how people will find Londry

The site is **hidden from search engines until you launch** (see "Launch" below). Everything on this page is already prepared,
so launch day is one switch.

## The words you chose (2026-10-20)

People type these into Google and Yandex, so the pages use exactly these words, naturally, and never stuffed.

| Language | Phrases |
| --- | --- |
| Uzbek (`/`) | Toshkentda kir yuvish · self-service kirxona Toshkent · 24 soat ochiq kirxona · akva tozalash Toshkent |
| Russian (`/ru/`) | прачечная самообслуживания Ташкент · круглосуточная прачечная Ташкент · аквачистка Ташкент · постирать вещи в Ташкенте |
| English (`/en/`) | self-service laundry Tashkent · laundromat Tashkent · 24 hour laundry Tashkent · aqua cleaning Tashkent |

What the pages stress: **open 24 hours**, **students and the dormitories** (the Talabalar branch), **the Londry app**.

## Where the words are used

| Place | What it does | File |
| --- | --- | --- |
| Page title (the blue link in search results) | Leads with "self-service laundry in Tashkent, open 24 hours" in each language | `src/i18n/*.ts` → `meta.title` |
| Description (the grey text under it) | The business, 24 hours, the app, SPOTX aqua cleaning | `meta.description` |
| Main heading | The small label above the headline is now part of the heading, so it reads "Self-service laundry · Tashkent" plus the design's headline. It looks exactly as before | `hero.eyebrow`, `hero.titleA/B` |
| Questions and answers | Four questions people ask: open 24 hours, how it works with the app, where the branches are (students, dormitories), what SPOTX aqua cleaning is | `faq` |
| Picture descriptions | Screenshot, maps and photos are described with the words people use | `screenshotAlt`, `mapAlt`, `photoAlt` |
| Service cards | The LONDRY and SPOTX texts are the ones your current website already has, so the words people find you by stay | `services` |
| Footer line | "Self-service laundry and SPOTX aqua cleaning in Tashkent" | `footer.about` |
| Structured data (invisible, for Google) | Both branches with exact position, address, phone and "open 24 hours, every day" | `src/head.ts` |

A test (`src/seo.test.ts`) fails if one of the chosen phrases disappears from a language, or a title or description gets too long.
Change the words in `src/seo.test.ts` first if you choose different keywords.

## Already in place

- Each language has its own address (`/`, `/ru/`, `/en/`) and tells search engines about the others (hreflang), so the right
  language is shown to the right person.
- Title, description, canonical address and share preview (Telegram, Instagram, WhatsApp) on every page.
- A sitemap and robots file that switch on at launch.
- Fast on weak phones and slow internet (Lighthouse 100 for speed, accessibility and best practice), which Google rewards.
- No cookies, no trackers, nothing that slows or blocks the page.
- True content only: the 24 hours come from your own Google listings and the service texts from your current website; nothing is invented.

## Launch (when you decide)

1. Put the site online (see `docs/DEPLOY.md`) on londry.uz.
2. In `.env.production` set `VITE_INDEXABLE=true`, build again, upload again. Now `robots.txt` says "come in" and the sitemap lists
   all pages.
3. Add londry.uz to **Google Search Console** and **Yandex Webmaster** and submit `https://londry.uz/sitemap.xml`.
4. Check after a few days with a search for `site:londry.uz`.

## What matters most for "laundry near me" (not on the website)

Search results for a local business come mostly from the map listings, so these help more than anything on the page:

1. **Google Business Profile**: use the same name (Londry), the same address text and the website londry.uz for both branches.
   Today the Talabalar listing is named "Laundry", and the Yunusabad address reads "Guards Colonel Khodjaev Street 1".
2. **Yandex Business** (Yandex Maps) and **2GIS**: the same name, address, phone and opening hours.
3. **Reviews**: ask happy customers to review on Google and Yandex. Good ratings help you in map searches.
4. Real **photos** of both branches on those listings and on the site (send them, see `docs/TO-PROVIDE.md`).

## Left out on purpose

- **No review-star markup**: Google does not allow a business to mark up reviews of itself, and it can punish the site.
- **No hidden or repeated keywords**: that is penalised. The wording is written for people first.
- **No FAQ markup for search**: Google stopped showing it for ordinary businesses in 2023, so it would add nothing.
- **No invented facts**: if something is not known (prices, payment methods), the FAQ does not mention it. Tell me and I add it.

## Keeping it true

When opening hours, addresses or the way the app works change, change them everywhere they appear: the texts in `src/i18n/*.ts`
(including the questions), `src/site.ts`, and your Google and Yandex listings.
