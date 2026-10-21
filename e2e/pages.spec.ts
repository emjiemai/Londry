import { expect, test } from '@playwright/test'

const PAGES = [
  { path: '/', lang: 'uz', h1: /Toza kiyim/ },
  { path: '/ru/', lang: 'ru', h1: /Чистая одежда/ },
  { path: '/en/', lang: 'en', h1: /Clean clothes/ },
]

for (const { path, lang, h1 } of PAGES) {
  test(`${path} renders in ${lang}, hydrates, has no errors and no sideways scroll`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', (message) => message.type() === 'error' && errors.push(message.text()))
    page.on('pageerror', (error) => errors.push(String(error)))

    // The React bundle is requested after the page has loaded; wait for it so hydration errors would show up.
    // (Start listening before navigating, or a fast response is missed.)
    const bundle = page.waitForResponse((response) => /\/assets\/index-.*\.js$/.test(response.url()), { timeout: 15_000 })
    await page.goto(path)
    await expect(page.locator('html')).toHaveAttribute('lang', lang)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(h1)
    await bundle
    await page.waitForTimeout(600)

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow, 'horizontal overflow in px').toBeLessThanOrEqual(0)
    expect(errors).toEqual([])
  })
}

for (const width of [320, 390, 768, 1024, 1280, 1920]) {
  test(`no sideways scroll at ${width}px on every page`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 })
    for (const url of ['/', '/ru/', '/en/', '/en/terms/', '/ru/privacy/']) {
      await page.goto(url)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      expect(overflow, `${url} at ${width}px`).toBeLessThanOrEqual(0)
    }
  })
}

test('only Russian pages download the Cyrillic font; Uzbek and English never do', async ({ page }) => {
  const fonts: Record<string, string[]> = {}
  page.on('request', (request) => {
    if (request.url().endsWith('.woff2')) (fonts[new URL(page.url()).pathname] ??= []).push(request.url())
  })
  for (const url of ['/', '/en/', '/ru/']) {
    await page.goto(url)
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(300)
  }
  const used = (path: string) => (fonts[path] ?? []).join(' ')
  expect(used('/')).toContain('montserrat-latin')
  expect(used('/')).not.toContain('cyrillic')
  expect(used('/en/')).not.toContain('cyrillic')
  expect(used('/ru/')).toContain('montserrat-cyrillic')
})

test('every page has a title, a description and links to its other languages', async ({ page }) => {
  await page.goto('/en/')
  await expect(page).toHaveTitle(/Londry/)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{40,}/)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://londry.uz/en/')
  for (const lang of ['uz', 'ru', 'en', 'x-default']) {
    await expect(page.locator(`link[rel="alternate"][hreflang="${lang}"]`)).toHaveCount(1)
  }
})

test('the language switch opens the same page in another language and remembers the choice', async ({ page, viewport }) => {
  test.skip((viewport?.width ?? 0) < 600, 'covered on desktop; the switch is the same element')
  await page.goto('/en/terms/')
  await page.getByRole('link', { name: /Русский/ }).click()
  await expect(page).toHaveURL(/\/ru\/terms\/$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru')

  // A returning visitor who picked Russian lands on the Russian home page when opening the root address.
  await page.goto('/')
  await expect(page).toHaveURL(/\/ru\/$/)

  // Choosing Uzbek again is remembered too (no redirect back to Russian).
  await page.getByRole('link', { name: /Oʻzbekcha/ }).click()
  await expect(page).toHaveURL(/localhost:\d+\/$/)
  await page.goto('/')
  await expect(page).toHaveURL(/localhost:\d+\/$/)
})

test('the menu has Services, Locations and Contact only, and the phone screen is drawn, not downloaded', async ({ page }) => {
  const downloaded: string[] = []
  page.on('request', (request) => /hero-app/.test(request.url()) && downloaded.push(request.url()))
  for (const url of ['/', '/ru/', '/en/']) {
    await page.goto(url)
    await expect(page.locator('.nav a'), url).toHaveCount(3)
    await expect(page.locator('a[href$="#partners"]'), `${url}: no link to the pictures row`).toHaveCount(0)
    const screen = page.locator('.phone__screen svg.appscreen')
    await expect(screen, url).toHaveAttribute('role', 'img')
    await expect(screen.locator('text', { hasText: 'KIR YUVISH MASHINASINI' }), url).toHaveCount(1)
    await expect(page.locator('.phone img'), `${url}: no picture inside the phone`).toHaveCount(0)
  }
  expect(downloaded, 'the app screen must not be a downloaded picture').toEqual([])
})

test("the Terms and Privacy pages show the owner's own texts from londry.uz in each language", async ({ page }) => {
  const cases = [
    { url: '/terms/', h1: 'Londry oʻz-oʻziga xizmat koʻrsatish kir yuvish xonasidan foydalanish shartlari', text: /8 kg dan kam kirni/ },
    { url: '/ru/terms/', h1: 'Условия использования прачечной самообслуживания Londry', text: /менее 8 кг белья/ },
    { url: '/en/terms/', h1: 'Terms of Service for Londry Self-Service Laundry', text: /less than 8 kg of laundry/ },
    { url: '/privacy/', h1: 'Maxfiylik siyosati', text: /ZRU-547-son/ },
    { url: '/ru/privacy/', h1: 'Политика конфиденциальности', text: /Octo Payment Service/ },
    { url: '/en/privacy/', h1: 'Privacy Policy', text: /No\. ZRU-547/ },
  ]
  for (const { url, h1, text } of cases) {
    await page.goto(url)
    await expect(page.getByRole('heading', { level: 1 }), url).toHaveText(h1)
    await expect(page.locator('.legal'), url).toContainText(text)
    await expect(page.locator('.legal__notice'), `${url}: no "coming soon" notice`).toHaveCount(0)
  }
})

test('the mobile menu opens, lists the sections, and closes after choosing one', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/en/')
  const summary = page.locator('summary.menu__button')
  await expect(summary).toBeVisible()
  await expect(page.locator('.nav')).toBeHidden()

  await summary.click()
  await expect(page.locator('details.menu')).toHaveAttribute('open', '')
  const services = page.locator('.menu__panel').getByRole('link', { name: 'Services' })
  await expect(services).toBeVisible()

  await services.click()
  await expect(page.locator('details.menu')).not.toHaveAttribute('open', '')
  await expect(page).toHaveURL(/#services$/)

  // Escape closes it as well.
  await summary.click()
  await expect(page.locator('details.menu')).toHaveAttribute('open', '')
  await page.keyboard.press('Escape')
  await expect(page.locator('details.menu')).not.toHaveAttribute('open', '')
})

test('unknown addresses answer 404 with the helpful page', async ({ request }) => {
  const response = await request.get('/definitely-not-here/')
  expect(response.status()).toBe(404)
  const html = await response.text()
  expect(html).toContain('404')
  expect(html).toContain('href="/ru/"')
})

test('store buttons open the real stores, the closing band opens the routes, the phone number dials', async ({ page }) => {
  await page.goto('/en/')
  await expect(page.locator('.store--soon')).toHaveCount(0)
  const appStore = page.locator('a.store[data-store="app-store"]')
  const googlePlay = page.locator('a.store[data-store="google-play"]')
  await expect(appStore).toHaveCount(1) // first screen only: the closing band is about the branches
  await expect(googlePlay).toHaveCount(1)
  await expect(appStore).toHaveAttribute('href', /^https:\/\/apps\.apple\.com\/.+\/id6741739773$/)
  await expect(googlePlay).toHaveAttribute('href', /^https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.innovationscript\.android\.londry/)

  const routes = page.locator('#visit a.store[data-branch]')
  await expect(routes).toHaveCount(2)
  await expect(routes.nth(0)).toHaveAttribute('href', 'https://www.google.com/maps/dir/?api=1&destination=41.35161,69.21237')
  await expect(routes.nth(1)).toHaveAttribute('href', 'https://www.google.com/maps/dir/?api=1&destination=41.34811,69.28522')

  await expect(page.getByRole('link', { name: /\+998 97 444 81 93/ }).first()).toHaveAttribute('href', 'tel:+998974448193')
})

test('customer review cards show the real Google ratings and quotes, but not how many people reviewed', async ({ page }) => {
  await page.goto('/en/')
  await expect(page.locator('.reviews .review')).toHaveCount(4)
  const ratings = page.locator('.review--rating')
  await expect(ratings.nth(0)).toContainText('4.5')
  await expect(ratings.nth(0)).toContainText('Google rating')
  await expect(ratings.nth(1)).toContainText('4.3')
  await expect(page.locator('.review--quote').nth(0)).toContainText('easy instructions in English and Uzbek')
  await expect(page.locator('.review--quote').nth(1)).toContainText('very kind technician manager')

  // The owner does not want the number of reviewers shown (2026-10-21): no rating card may carry a number besides the score.
  for (const url of ['/', '/ru/', '/en/']) {
    await page.goto(url)
    for (const card of await ratings.all()) await expect(card, url).not.toContainText(/\d{2}/)
  }

  // Russian uses the decimal comma
  await page.goto('/ru/')
  await expect(ratings.nth(0)).toContainText('4,5')
  await expect(ratings.nth(1)).toContainText('4,3')
})

test('the main heading names what the page is and where, and the FAQ answers what people search for', async ({ page }) => {
  const cases = [
    { url: '/', kind: 'self-service kirxona', city: 'toshkent', first: 'Londry 24 soat ochiqmi?' },
    { url: '/ru/', kind: 'прачечная самообслуживания', city: 'ташкент', first: 'Londry работает круглосуточно?' },
    { url: '/en/', kind: 'self-service laundry', city: 'tashkent', first: 'Is Londry open 24 hours?' },
  ]
  for (const { url, kind, city, first } of cases) {
    await page.goto(url)
    const heading = (await page.locator('h1').innerText()).toLowerCase()
    expect(heading, url).toContain(kind)
    expect(heading, url).toContain(city)

    const items = page.locator('#faq details')
    await expect(items, url).toHaveCount(4)
    const firstItem = items.first()
    await expect(firstItem.locator('summary')).toContainText(first)
    await expect(firstItem).not.toHaveAttribute('open', '')
    await firstItem.locator('summary').click()
    await expect(firstItem).toHaveAttribute('open', '')
    await expect(firstItem.locator('.faq__answer')).toBeVisible()
  }
})

test('Our services says what the current londry.uz says, in all three languages', async ({ page }) => {
  const cases = [
    { url: '/en/', londry: 'Would you like to make laundry even easier?', lead: 'With SPOTX aqua cleaning, you get:', bullet: 'Thorough expert analysis of garments' },
    { url: '/ru/', londry: 'Хотите узнать, как сделать стирку еще проще?', lead: 'При аквачистке SPOTX вы получаете:', bullet: 'Тщательный экспертный анализ' },
    { url: '/', londry: 'Qanday qilib kir yuvishni yanada osonlashtirishni bilmoqchimisiz?', lead: 'SPOTX akvachistkasida siz:', bullet: 'Yuvish rejimi va yuvish vositalarini' },
  ]
  for (const { url, londry, lead, bullet } of cases) {
    await page.goto(url)
    const services = page.locator('#services')
    await expect(services.locator('.service').first(), url).toContainText(londry)
    await expect(services.locator('.service__text'), url).toHaveCount(2) // the LONDRY paragraphs and the SPOTX introduction
    await expect(services.locator('.service__lead-in'), url).toHaveText(lead)
    await expect(services.locator('.points li'), url).toHaveCount(3)
    await expect(services.locator('.points li').first(), url).toContainText(bullet)
  }
})

test('Partners shows the four project pictures, with a caption in the visitor\'s language', async ({ page }) => {
  const captions: Record<string, string[]> = {
    '/en/': ['Self-service laundry', 'Aqua cleaning', 'Detergents', 'Training'],
    '/ru/': ['Прачечная самообслуживания', 'Аквачистка', 'Моющие средства', 'Обучение'],
    '/': ['Self-service kirxona', 'Akva tozalash', 'Yuvish vositalari', 'Trening'],
  }
  for (const [url, expected] of Object.entries(captions)) {
    await page.goto(url)
    const tiles = page.locator('#partners .partner')
    await expect(tiles, url).toHaveCount(4)
    await expect(page.locator('#partners h2, #partners .eyebrow'), `${url}: nothing is written above the pictures`).toHaveCount(0)
    await expect(page.locator('#partners .partner__caption'), url).toHaveText(expected)
    for (let i = 0; i < 4; i++) {
      const picture = tiles.nth(i).locator('img')
      await picture.scrollIntoViewIfNeeded()
      await expect.poll(() => picture.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0), { message: `${url} picture ${i}` }).toBe(true)
    }
  }
})

test('the Videos section shows the seven YouTube videos of londry.uz, and a YouTube player loads only after a tap', async ({ page }) => {
  await page.route(/(youtube|ytimg|googlevideo)/, (route) => route.abort()) // nothing real is fetched while testing
  const players: string[] = []
  page.on('request', (request) => /youtube-nocookie\.com|googlevideo\.com/.test(request.url()) && players.push(request.url()))
  const bundle = page.waitForResponse((response) => /\/assets\/index-.*\.js$/.test(response.url()), { timeout: 15_000 })
  await page.goto('/en/')
  await bundle
  await page.waitForTimeout(500) // hydrated

  await expect(page.locator('#videos .video')).toHaveCount(7)
  await expect(page.locator('#videos .videos').nth(0).locator('.video')).toHaveCount(4)
  await expect(page.locator('#videos .videos').nth(1).locator('.video')).toHaveCount(3)
  await expect(page.locator('#videos h2')).toHaveText('Reviews') // the only words in the section besides the titles
  await expect(page.locator('#videos .eyebrow')).toHaveCount(0)
  await expect(page.locator('#videos .video__title').first()).toHaveText('Instructions for the LONDRY self-service laundry')

  // a cover is a link to the video on YouTube; with JavaScript a tap turns it into the player
  const cover = page.locator('#videos .video__cover').first()
  await expect(cover).toHaveAttribute('href', 'https://www.youtube.com/watch?v=T6aH7jnUZFg')
  await expect(page.locator('#videos iframe')).toHaveCount(0)
  expect(players, 'no YouTube player may load before a tap').toEqual([])
  await cover.click()
  await expect(page.locator('#videos iframe')).toHaveCount(1)
  await expect(page.locator('#videos iframe')).toHaveAttribute('src', /^https:\/\/www\.youtube-nocookie\.com\/embed\/T6aH7jnUZFg\?autoplay=1/)

  // the titles follow the language
  await page.goto('/ru/')
  await expect(page.locator('#videos h2')).toHaveText('Отзывы')
  await expect(page.locator('#videos .video__title').first()).toHaveText('Инструкция по прачечной самообслуживания LONDRY')
  await page.goto('/')
  await expect(page.locator('#videos h2')).toHaveText('Mijozlar sharhlari')
})

test('no grey stand-in boxes are shown: a picture or video that is not there yet is simply left out', async ({ page }) => {
  for (const url of ['/', '/ru/', '/en/']) {
    await page.goto(url)
    await expect(page.locator('.slot, .partner--empty, .video__frame--empty'), url).toHaveCount(0)
    await expect(page.locator('.service__media:not(:has(picture))'), `${url}: a picture frame without a picture`).toHaveCount(0)
    await expect(page.locator('body'), url).not.toContainText(/\[(PHOTO|VIDEO|PARTNER|APP SCREENSHOT|MAP)/)
  }
})

test('each branch card shows a real map picture, that it is open 24 hours, and a route link', async ({ page }) => {
  await page.goto('/en/')
  await expect(page.locator('.branch')).toHaveCount(2)
  await expect(page.locator('.branch__hours')).toHaveText(['Open 24 hours', 'Open 24 hours'])
  await expect(page.locator('.branch__map .slot')).toHaveCount(0) // pictures, not the grey placeholders
  const maps = page.locator('.branch__map img')
  await expect(maps).toHaveCount(2)
  for (let i = 0; i < 2; i++) {
    await maps.nth(i).scrollIntoViewIfNeeded()
    await expect.poll(() => maps.nth(i).evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true)
  }
  await expect(page.locator('.branch .btn')).toHaveCount(2)
  await expect(page.locator('.map-credit a[href="https://www.openstreetmap.org/copyright"]')).toBeVisible()
})
