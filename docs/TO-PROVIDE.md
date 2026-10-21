# What I still need from you

Tick things off as you send them. Anything marked **Blocks launch** shows as a placeholder or "Coming soon" on the site
until it arrives. Send files in any common format; I will resize and convert them.

> **Never paste passwords or keys into chat.** For hosting or domain access, add me as a user, or tell me and we will
> find a safe way.

## 1. Blocks launch

- [x] ~~**App Store link** and **Google Play link**~~: received and added (`src/site.ts`). The app is already published.
- [x] ~~**App screenshot** for the phone in the first screen~~: received and added (slot `hero-app`). I hid the phone's clock,
  notification icon and battery on the picture, nothing else was changed. A sharper original (at least 1170 × 2532 px) would be a bonus.
- [ ] **Photo: laundry interior** (landscape, at least 1600 px wide, subject in the middle, no text on it). → slot `service-londry`
- [ ] **Photo: SPOTX garment care** (same rules). → slot `service-spotx`
- [x] ~~**Maps for the two branches.**~~ Done from your Google screenshot: I found both positions and drew the two map pictures (see README, "The map pictures"). **Please check the two pins** (Talabalar is accurate to about 25 m): if one is off, send the Google Maps *Share* link of the exact place and I will move it. Details of the old request, kept for reference: Pick one:
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
- [ ] **Native-speaker review of the Uzbek and Russian text**, including the new page titles, descriptions and the four questions and answers (FAQ). I drafted both from your English design, and they must be
  read by someone fluent before launch. I can send you the full text as one document.
- [ ] **Where the site will live:** who hosts `londry.uz` today (or which host you choose) and who can change its DNS
  settings. I recommend Cloudflare Pages or Netlify (free, fast, automatic HTTPS), but any host works. See `docs/DEPLOY.md`.

## 2. Strongly recommended (visitors will look for these)

- [ ] **Reviews around the phone.** The four cards use your real Google numbers (Talabalar 4.5 from 32 reviews, Yunusabad 4.3 from
  40) and two real quotes, as of 2026-10-17. Tell me when the numbers change, or send other real reviews you want shown (and say
  whether the reviewer agrees to be named; no names are shown now). I never invent reviews. → `src/site.ts`

- [x] ~~**Opening hours**~~: your Google listing says "Open 24 hours" for both, so the cards say so. Tell me if that is wrong.
- [ ] **Prices**: what a wash and a dry cost, and how SPOTX is priced. Even "from X so'm" helps.
- [ ] **How people pay** (in the app only? Payme, Click, Uzcard, cash?).
- [x] ~~**Branch coordinates**~~: found (see map item above) and used for search-engine data too.
- [ ] **Telegram / WhatsApp** links, if customers write to you there, and an e-mail address.
- [x] ~~Is **+998 97 444 81 93** the number for both branches?~~ Yes, your Google listing shows it for both.
- [ ] **Official logo files**: Londry and SPOTX as vector (SVG, or AI / PDF). I redrew them from the PDF so they look
  right, but the originals are better. Also any brand guide (colours, fonts) if one exists.
- [ ] **Share-preview image** (1200 × 630 px) for when the link is posted in Telegram / Instagram / WhatsApp. I made a simple
  one with the logo; yours should show the brand properly. Optionally one per language.

## 3. Decisions for you (tell me, or I keep the default)

- [ ] **Check the FAQ facts.** Please confirm: both branches are open 24 hours; the app steps (choose a machine and program, pay in the app, drying the same way, a washing-machine reservation holds for 10 minutes, taken from your app screenshot); and that the Talabalar branch is "in the student area, close to the dormitories". Anything wrong or missing (prices, payment methods, detergent), tell me and I fix the answers. The search words and launch steps are in `docs/SEO.md`.

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

- [ ] **Make your Google listings match the site.** They exist already (4.3 and 4.5 stars), but the Talabalar one is named "Laundry" and the Yunusabad one "LONDRY", and the Yunusabad address reads "Guards Colonel Khodjaev Street 1" while the app and this site say "Iftixor, 1a". Use one name (Londry), the same address text and the website londry.uz on both.
- [ ] **Yandex Business** (Yandex Maps) and **2GIS** listings for both branches, and the Google ones, with the same
  name, address and phone number as the site. For a local laundry these usually bring more visitors than the site itself.
- [ ] After launch: **Google Search Console** and **Yandex Webmaster** (I will give you the verification steps).
- [ ] Set the **Instagram bio link** to `londry.uz` (or `londry.uz/ru/` for Russian posts).

## Already in the site (checked, nothing needed)

Phone number, the two street addresses, the Instagram account, the "Get directions" map searches, all English text from the design.
