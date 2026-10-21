---
name: Londry
description: Self-service laundry and SPOTX aqua cleaning in Tashkent. One door-red, ink and white, flat rounded cards, Montserrat.
colors:
  door-red: "#e32a30"
  press-red: "#d4242c"
  ink-red: "#b9202a"
  blush-red: "#f97f88"
  ink: "#111111"
  graphite: "#333333"
  charcoal: "#444444"
  slate: "#666666"
  slate-soft: "#555555"
  paper: "#ffffff"
  haze: "#f5f5f5"
  hairline: "#ebebeb"
  proof-grey: "#e6e6e6"
  proof-ink: "#2a2a2a"
typography:
  display:
    fontFamily: "Montserrat, 'Montserrat Fallback', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 1.25rem + 3.6vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.077
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Montserrat, 'Montserrat Fallback', system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.1rem + 2vw, 2.375rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Montserrat, 'Montserrat Fallback', system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.02em"
  lead:
    fontFamily: "Montserrat, 'Montserrat Fallback', system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Montserrat, 'Montserrat Fallback', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Montserrat, 'Montserrat Fallback', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  sm: "8px"
  md: "10px"
  lg: "16px"
  xl: "24px"
  band: "32px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  section: "88px"
components:
  button-primary:
    backgroundColor: "{colors.press-red}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "47px"
  button-primary-hover:
    backgroundColor: "#bd1f27"
  store-button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "0 24px 0 21px"
    height: "75px"
  chip:
    backgroundColor: "{colors.haze}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "38px"
  contact-card:
    backgroundColor: "{colors.haze}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px 22px"
  service-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.xl}"
    padding: "30px 32px 33px"
  service-card-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.xl}"
    padding: "30px 32px 33px"
  partner-tile:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.slate}"
    rounded: "{rounded.lg}"
    height: "101px"
  closing-band:
    backgroundColor: "{colors.door-red}"
    textColor: "{colors.paper}"
    rounded: "{rounded.band}"
    padding: "64px"
  language-switch:
    backgroundColor: "{colors.haze}"
    textColor: "{colors.slate-soft}"
    rounded: "12px"
    padding: "4px"
---

# Design System: Londry

## Overview

**Creative North Star: "The Washing-Machine Door"**

The logo's O is a washing-machine door: a red ring with a half-tinted window. The page is built around that one shape. It returns as the hero ring behind the phone, the colour of the logo, the red band that closes the page. Everything around it is quiet and flat: white and light-grey surfaces, ink-black "hardware" (store buttons, the phone, the SPOTX card, the footer), and plain, confident Montserrat. The mood is bright, direct and fast, like the promise on the page: clean clothes, without the wait.

Red is spent in two ways only. Either big and brand-level (the ring, the accent half of the headline, the closing band), or small and functional (buttons, number badges, a few tiny labels). Ink black is the second material. Nothing is decorated for its own sake; depth is almost entirely tonal, with one soft floating object, the phone.

Because the audience is reached mostly on phones and often on weak networks, the system is also built to be light: one font family, no images of text, vector logo and icons, CSS only for every surface and shape.

**Key Characteristics:**
- One saturated red (`#e32a30`) at large scale; a deeper red for buttons and small red text.
- Ink black (`#111`) as the second surface material; white and haze (`#f5f5f5`) alternate as bands.
- Flat at rest. Only the hero phone floats (soft double shadow).
- Montserrat 800 with tight tracking for headlines, 400 for reading, 600 and 700 for labels and buttons.
- Large radii on large containers (10 / 16 / 24 / 32 px), pill chips, circular badges.
- 88 px section rhythm inside a 1200 px container, fluid down to a 320 px phone.

## Colors

A red-and-ink palette on white. Strategy: committed, one saturated red carries the brand moments, neutrals do everything else.

### Primary
- **Door Red** (#e32a30): the ring, the headline accent, the closing band, number badges, the logo mark. Nudged from the measured #e42a30 so white text on it reaches 4.5:1.
- **Press Red** (#d4242c): every button that asks for a click (header "Get the app", "Get directions"). A shade deeper than Door Red for 5.1:1 under white text. Hover: #bd1f27.
- **Ink Red** (#b9202a): small red text and thin icon strokes on light grounds (6.4:1 on white).
- **Blush Red** (#f97f88): the only red used for text on the dark SPOTX card (7.6:1 on ink).
- **Ring Tint** (Door Red at 12%): the half-window of the hero ring.

### Neutral
- **Ink** (#111111): headlines, store buttons, the phone body, the SPOTX card and the footer.
- **Graphite** (#333333): navigation and short list text.
- **Charcoal** (#444444): paragraphs on light grounds.
- **Slate** (#666666) and **Slate Soft** (#555555): secondary labels, addresses, the inactive language items.
- **Paper** (#ffffff) and **Haze** (#f5f5f5): page ground and the alternating bands, contact cards, chips, language switch.
- **Hairline** (#ebebeb): the 1 px border on partner tiles; the header rule is #eaeaea.
- **Proof Grey** (#e6e6e6, label #595959) and **Proof Ink** (#2a2a2a, label #a8a8a8): the placeholder surfaces for photos, maps and the dark-card photo until real files arrive.

### Named Rules
**The Door Rule.** Red appears big (ring, band, headline accent) or small and functional (buttons, badges). It is never used for paragraphs or for large flat panels other than the closing band.
**The Contrast Floor Rule.** Red text on light uses Ink Red; white text on red uses Door Red or Press Red; red text on the dark card uses Blush Red. Never put Door Red text on white below 24 px.

## Typography

**Display, headline and body font:** Montserrat (variable, weights 400-800, self-hosted and subset per script), fallback Arial resized to Montserrat's footprint (`size-adjust 114.15%`) so text does not move when the font arrives.

**Character:** a geometric, wide, friendly sans that reads as modern and municipal at once. Weight does all the work: 800 shouts, 400 explains, 600-700 label.

### Hierarchy
- **Display** (800, `clamp(2.25rem, 1.25rem + 3.6vw, 4rem)`, 1.077, -0.02em): the page headline only; second line in Door Red.
- **Headline** (800, `clamp(1.75rem, 1.1rem + 2vw, 2.375rem)`, 1.15, -0.02em): section titles. Balanced wrapping.
- **Title** (800, 1.75rem, 1.2, +0.02em, uppercase): service names (LONDRY, SPOTX). The closing band title is the same voice at 46 px.
- **Lead** (400, 1.0625-1.1875rem, 1.6): the sentence under the headline, max 31rem.
- **Body** (400, 1.0625rem, 1.6): card text, addresses; keep measure under 65-75 characters.
- **Label** (600-700, 0.8125-1.0625rem, 1.2): navigation, buttons, chips, list items, contact values.

The small uppercase, letter-spaced section labels in the approved comp are carried as delivered. They are not recorded as a reusable style for new surfaces.

**Owner waiver (open).** The comp has these small red labels above every heading, and numbered red discs in the SPOTX card. Craft guidance advises against both. They are kept because they are in the owner's approved design; the owner has been asked in `docs/TO-PROVIDE.md` whether to keep or drop them. To drop them: remove the six `<p class="eyebrow">` elements (Hero, Services, Partners, Locations) and the `.points__number` discs, then retune `--h2-gap` and `--head-after`.

### Named Rules
**The One Family Rule.** Montserrat only. Hierarchy comes from weight and size, never from a second typeface.
**The No-Shift Rule.** Any text style change must keep the fallback metrics matched, so the font swap never moves a line.

## Layout

A 1200 px container centred, with a fluid 20-24 px gutter that also respects phone safe areas. Sections are full-bleed bands alternating white and Haze, separated by 88 px of vertical padding (fluid down to 56 px). The sticky header is 72 px (60 px on phones).

Desktop (900 px and up): the hero is two columns (1.16 : 1), the phone centred in its column with the ring behind it; services and locations are two equal cards with a 20 px gap; partners are six equal tiles with 12 px gaps; contact cards are three equal columns; the footer uses 404 : 324 : 376 columns.

The header collapses to the logo, the language switch and a menu button (a native `details`) below 64em (1024 px), because the longest Russian labels need about 1000 px; its button also uses a short label ("Скачать", "Yuklab olish") so one row fits. Below 900 px two-column groups stack, partners become 3 then 2 columns and the footer becomes 2 then 1 columns; below 1000 px the contact strip stacks. At 420 px and under the header shows the LONDRY mark only and store buttons are full width. Breakpoints are written in `em`, so they also move when a visitor raises the browser's text size; the header wraps onto a second row rather than overflow, and long words may break (`overflow-wrap: anywhere`) rather than get clipped.

Vertical rhythm inside a section follows the comp's measured values: header to content gaps differ per section on wide screens (services 41 px, partners 39 px, locations 43 px below the title) and fluid defaults apply on small screens.

## Elevation & Depth

Flat by default. Cards separate from their ground by tone alone (white card on Haze band, Haze chip on white card, ink card on Haze band). The floating objects are the hero phone and the four review cards around it.

### Shadow Vocabulary
- **Phone** (`box-shadow: 0 34px 60px -14px rgb(0 0 0 / 0.26), 0 16px 28px -16px rgb(0 0 0 / 0.22)`): a wide soft pool below the device. Removed in data-saver mode.
- **Active language item** (`box-shadow: 0 1px 3px rgb(0 0 0 / 0.14)`): lifts the selected pill off the switch.
- **Mobile menu panel** (`box-shadow: 0 18px 32px -18px rgb(0 0 0 / 0.25)`): separates the open panel from the page.

### Named Rules
**The Flat-At-Rest Rule.** Surfaces carry no shadow. Shadows mark something that floats or is open.

## Shapes

Corners scale with the container: 8 px small controls, 10 px buttons and icon tiles, 16 px contact cards and partner tiles, 24 px service and branch cards, 32 px the closing band, pills for chips, circles for number badges (28 px) and the ring. The phone is 48 px outside and 38 px inside, expressed in percentages so it scales. The ring is 5.7% of its diameter thick; its right half is tinted red like glass (see Hero glow). Photos and maps fill their card edge to edge under the card's rounded top corners, in a 590 : 240 frame on wide screens and 2 : 1 on phones.

## Components

### Buttons
- **Shape:** gently rounded (10 px), 47 px tall in the header and 51 px for "Get directions", centred bold text (15-17 px / 700).
- **Primary:** Press Red on white text. Hover darkens to #bd1f27; pressed scales to 98%.
- **Store buttons:** Ink background, 75 px tall, icon plus two lines (12 px lead, 19 px store name). Used in the first screen for App Store and Google Play. The same black button is the branch button in the closing band (pin icon, "Get directions" lead, branch name). A store link left empty shows "Coming soon" and does not navigate.

### Chips
- **Style:** Haze pill, 38 px tall, 14 px / 600 Ink text, 8 px gap between chips. On white cards.

### Cards / Containers
- **Contact card:** Haze, 16 px radius, 48 px white icon tile (12 px radius) with an Ink Red outline icon, label 13 px Slate over a 17 px / 700 value.
- **Service card:** 24 px radius, picture frame on top, 30-33 px padding; the LONDRY card is white, the SPOTX card is Ink with a Proof Ink picture frame and red numbered points.
- **Branch card:** 24 px radius, map picture on top (590 : 240, tappable), info row with name, address, a small "Open 24 hours" line with a clock icon and a Press Red "Get directions" button. The map credit sits under the two cards.
- **Partner tile:** white, 1 px Hairline border, 16 px radius; the picture sits on a 3:2 white canvas with a 15 px / 700 caption under it; four tiles in a row on wide screens, two per row on phones. The first four tiles are the owner's own projects (LONDRY, SPOTX, detergents, training), taken from the current website.
- **Closing band:** Door Red, 32 px radius, 64 px padding, a short title and sentence on the left, the two branch buttons on the right.

### Map pictures
Drawn from OpenStreetMap data with `npm run maps`, never a live embedded map (no third-party script, no cookies, identical on every device). The map is deliberately quiet: Haze ground, white roads with a pale casing, pale grey buildings, almost no colour, so the single Door Red pin (white outline, the door mark inside) with its soft red halo is the only loud thing. The street name is set by hand in Montserrat 700, uppercase, wide tracking, along the road. The OpenStreetMap credit is baked into a small chip in the corner and repeated as text under the cards.

### Hero glow
Two soft reds, both from the owner's wish for "some reddish gradient" (2026-10-21). The glass of the washing-machine door (the right half of the ring) fades from almost clear in the middle to Door Red at the rim, and a halo bigger than the ring fades from 30 % Door Red in the middle to nothing behind the phone, so it can be seen without taking over (the owner asked for it twice). The ring edge, the headline and the phone stay flat. The review cards float over the glow. It never reaches the text, is cut at the screen edge so it cannot cause a sideways scroll, and is plain CSS (no picture).

### Review cards
Four white cards float around the hero phone: two rating cards (branch name, five stars cut to the rating, the score, "Google rating") and two quote cards (a red opening quote mark, the review word for word in the language it was written in, "Google review · branch"). 16 px radius, 1 px hairline, a soft two-layer shadow with offset, a slight tilt (1.4-2.2 degrees). Talabalar sits on the left of the phone, Yunusabad on the right; the ratings touch the phone's top corners and the quotes lie over its empty lower screen, never over the app list. In one column the quotes hang over the phone's lower edge. Red stars on a pale grey set, text at least 4.5:1. Everything shown is real: the ratings and words come from the owner's public Google listings (`site.ts`), nothing is invented, no reviewer names are shown, and how many people reviewed is left out on purpose (the owner's wish, 2026-10-21).

### Videos
A calm section after Partners: a centred label and title, then 16:9 frames with 24 px corners (one video: one wide frame; two or three: side by side; four: two by two; phones: stacked). Until videos are supplied the frames are dark placeholders with a play button and a "[VIDEO n]" note. A YouTube video shows its cover and a round white play button; only after a tap does the player load (nothing from YouTube is requested before). A video file uses the browser's own player and downloads nothing until play is pressed. The title sits under each video; captions per language are optional.

### Questions (FAQ)
A calm section after the branches: on wide screens the label and title sit on the left, four Haze rows (16 px radius, 20 px by 24 px padding) on the right; in one column they stack under the title. Each row is a native `details`: the question in 17 px / 700, a red chevron that turns over when it opens, the answer in Graphite below. No JavaScript, no motion with reduced-motion. The questions are the ones people type into search engines (open 24 hours, how the app works, where the branches are, what SPOTX is) and the answers hold only facts the owner has confirmed.

### Navigation
- **Header:** logo lockup (LONDRY, hairline divider, SPOTX), inline links in Graphite 15 px / 600, the UZ / RU / EN switch (Haze track, white active pill, 700), then the Press Red call to action. Links turn Ink Red on hover.
- **Mobile:** a 44 px Haze menu button opens a full-width panel with 48 px rows, a divider per row and a full-width button. Closes on Escape, outside tap and link choice.

### Language switch
A segmented control: Haze track with 4 px padding, 43 px-wide items, the current language as a white pill with a soft shadow.

### Logo and the Door mark
Wordmark drawn as vector (Montserrat ExtraBold outlines), the O replaced by the door: a 2.4-unit ring with a left half-disc inside, always Door Red, letters in the surrounding text colour (red on white, white on ink).

## Do's and Don'ts

### Do:
- **Do** use Door Red (#e32a30) big or as a small functional accent, and Press Red (#d4242c) for buttons.
- **Do** keep surfaces flat; separate cards from their ground with tone (white on Haze, ink on Haze).
- **Do** set headlines in Montserrat 800 with -0.02em tracking and balanced wrapping.
- **Do** keep interactive targets at least 44 px where space allows (never below 24 px) and keep a visible focus ring (3 px, Ink; white on red and ink grounds).
- **Do** keep high-contrast (forced colours) working: shapes made only of a filled background get a 1 px border in `a11y.css`, and the SPOTX name follows the system text colour.
- **Do** show an honest placeholder (grey frame with a note) where a photo or logo has not been supplied, and let the real file replace it with no layout change.
- **Do** keep the page usable without JavaScript, and animate only transform and opacity: the door swing in the hero, then the four review cards settling in as the door closes and drifting gently for four slow cycles before they rest. None of it runs with reduced motion or in data-saving (lite) mode.

### Don't:
- **Don't** add gradient text, glass, blur or gradient buttons. The only gradients are the owner's idea (2026-10-21): the red glass of the door inside the ring, and one soft red glow behind the hero phone.
- **Don't** put a coloured stripe on one side of a card, or shadows on resting cards.
- **Don't** use a second typeface, or Door Red for paragraphs.
- **Don't** invent facts to fill space (prices, hours, partner names, testimonials); leave them off the page and on the to-provide list.
- **Don't** change a text style without re-checking the fallback-font metrics (layout must not shift when the font loads).
