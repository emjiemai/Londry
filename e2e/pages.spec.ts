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

test('placeholders say what is missing, store buttons do not pretend to work yet', async ({ page }) => {
  await page.goto('/en/')
  await expect(page.locator('.store--soon')).toHaveCount(4) // two in the hero, two in the download band
  await expect(page.locator('.store--soon').first()).toHaveAttribute('aria-disabled', 'true')
  await expect(page.getByRole('link', { name: /\+998 97 444 81 93/ }).first()).toHaveAttribute('href', 'tel:+998974448193')
})
