# What I still need from you

Tick things off as you send them. Anything marked **Blocks launch** shows as a placeholder or "Coming soon" on the site
until it arrives. Send files in any common format; I will resize and convert them.

> **Never paste passwords or keys into chat.** For hosting or domain access, add me as a user, or tell me and we will
> find a safe way.

## 1. Blocks launch

- [ ] **App Store link** and **Google Play link**. The exact addresses (`https://apps.apple.com/...`, `https://play.google.com/...`).
  Until then both buttons say "Coming soon". → `src/site.ts`
  **Is the app already published?** If it is, "Coming soon" is wrong and must not go live. Send the links before launch.
- [ ] **App screenshot** for the phone in the first screen. A real screenshot of the app's home screen, portrait,
  at least 1170 × 2532 px (any phone screenshot is fine). No phone frame needed, I draw it. → slot `hero-app`
- [ ] **Photo: laundry interior** (landscape, at least 1600 px wide, subject in the middle, no text on it). → slot `service-londry`
- [ ] **Photo: SPOTX garment care** (same rules). → slot `service-spotx`
- [ ] **Maps for the two branches.** Pick one:
  1. send the **coordinates** of both branches (right-click the pin in Google/Yandex Maps, copy the numbers), and I build
     the map picture and links; or
  2. send your own map pictures (landscape, at least 1600 px wide, pin in the middle).
  Also tell me which map app "Get directions" should open: Google Maps (current), Yandex Maps or 2GIS.
  *Note: map images from Google/Yandex have attribution rules, so coordinates are the safer route.* → slots `map-talabalar`, `map-yunusabad`
- [ ] **Partner logos** (up to 6): SVG if possible, otherwise PNG with a transparent background, at least 160 px tall.
  For each: company name, website link (optional), and confirmation that they agree to be shown.
  **If you have none yet, tell me and I will hide the Partners section instead of showing empty boxes.** → `src/assets/partners/`, `src/site.ts`
- [ ] **Terms of Service and Privacy Policy** texts in Uzbek, Russian and English, or the addresses of the ones you
  already have. The App Store and Google Play require a privacy-policy address anyway. → `src/content/legal/`
- [ ] **Native-speaker review of the Uzbek and Russian text.** I drafted both from your English design, and they must be
  read by someone fluent before launch. I can send you the full text as one document.
- [ ] **Where the site will live:** who hosts `londry.uz` today (or which host you choose) and who can change its DNS
  settings. I recommend Cloudflare Pages or Netlify (free, fast, automatic HTTPS), but any host works. See `docs/DEPLOY.md`.

## 2. Strongly recommended (visitors will look for these)

- [ ] **Opening hours** of each branch (24/7?). Not in the design, so I added nothing.
- [ ] **Prices**: what a wash and a dry cost, and how SPOTX is priced. Even "from X so'm" helps.
- [ ] **How people pay** (in the app only? Payme, Click, Uzcard, cash?).
- [ ] **Branch coordinates** (also used for search-engine and map listings; see map item above).
- [ ] **Telegram / WhatsApp** links, if customers write to you there, and an e-mail address.
- [ ] Is **+998 97 444 81 93** the number for both branches? If each has its own, send both.
- [ ] **Official logo files**: Londry and SPOTX as vector (SVG, or AI / PDF). I redrew them from the PDF so they look
  right, but the originals are better. Also any brand guide (colours, fonts) if one exists.
- [ ] **Share-preview image** (1200 × 630 px) for when the link is posted in Telegram / Instagram / WhatsApp. I made a simple
  one with the logo; yours should show the brand properly. Optionally one per language.

## 3. Decisions for you (tell me, or I keep the default)

- [ ] **Default language** at `londry.uz/`. Now **Uzbek**; Russian is `/ru/`, English `/en/`.
- [ ] **Small red labels above headings.** Your design has small uppercase red labels above each heading (OUR SERVICES, PARTNERS, LOCATIONS...) and numbered circles in the SPOTX card. I kept them exactly as designed; some design guidelines advise dropping such labels. Keep (default) or drop?
- [ ] **Launch date.** On that day I switch the site from hidden to visible to Google/Yandex (one setting, `VITE_INDEXABLE`).
- [ ] **Analytics**: none (now, fastest, no cookie banner), Yandex Metrica, Google Analytics, or Meta Pixel? If yes, send the ID.
  Each one adds weight and, in some cases, a cookie notice.
- [ ] **Store buttons**: keep the custom dark buttons from your design, or use the official Apple / Google badge artwork
  (their guidelines prefer the official badges).
- [ ] **QR code** for desktop visitors to scan and open the app? (Needs the store links first.)
- [ ] **More pages or features?** Prices page, FAQ, contact form, franchise, blog. None are in the design, so none are built.
- [ ] **Company details** in the footer (legal name, tax ID). Ask your lawyer or accountant whether Uzbek rules require them on the site.
- [ ] Is the Uzbek line **"Dogʻlar yoʻq"** on the SPOTX card a real slogan you want on all three language versions?

## 4. Outside the website, but they decide whether people find you

- [ ] **Google Business Profile**, **Yandex Business** (Yandex Maps) and **2GIS** listings for both branches, with the same
  name, address and phone number as the site. For a local laundry these usually bring more visitors than the site itself.
- [ ] After launch: **Google Search Console** and **Yandex Webmaster** (I will give you the verification steps).
- [ ] Set the **Instagram bio link** to `londry.uz` (or `londry.uz/ru/` for Russian posts).

## Already in the site (checked, nothing needed)

Phone number, the two street addresses, the Instagram account, the "Get directions" map searches, all English text from the design.
