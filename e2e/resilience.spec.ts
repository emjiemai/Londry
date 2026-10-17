import { expect, test } from '@playwright/test'

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('the whole page is there and the links work', async ({ page }) => {
    await page.goto('/ru/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Чистая одежда')
    await expect(page.getByText('+998 97 444 81 93').first()).toBeVisible()
    await expect(page.locator('#locations')).toContainText('Талабалар')

    await page.getByRole('link', { name: /English/ }).click()
    await expect(page).toHaveURL(/\/en\/$/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Clean clothes')
  })

  test('the mobile menu still opens (native <details>)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/en/')
    await page.locator('summary.menu__button').click()
    await expect(page.locator('.menu__panel').getByRole('link', { name: 'Locations' })).toBeVisible()
  })
})

test.describe('data saver / slow connection', () => {
  test('does not download the React bundle at all, and the page still works', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'connection', { value: { saveData: true, effectiveType: '2g' } })
    })
    const requested: string[] = []
    page.on('request', (request) => requested.push(request.url()))

    await page.goto('/en/')
    await page.waitForTimeout(2500)

    await expect(page.locator('html')).toHaveClass(/\blite\b/)
    expect(requested.filter((url) => /\/assets\/index-.*\.js/.test(url))).toEqual([])
    expect(requested.filter((url) => url.endsWith('/sw.js'))).toEqual([])
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Clean clothes')
  })

  test('on a normal connection the bundle loads only after the page itself has loaded', async ({ page }) => {
    const order: string[] = []
    page.on('request', (request) => {
      if (/\/assets\/index-.*\.js/.test(request.url())) order.push('bundle')
    })
    page.on('load', () => order.push('load'))
    const bundle = page.waitForResponse((response) => /\/assets\/index-.*\.js$/.test(response.url()), { timeout: 15_000 })
    await page.goto('/en/')
    await bundle
    expect(order.indexOf('load')).toBeGreaterThanOrEqual(0)
    expect(order.indexOf('load')).toBeLessThan(order.indexOf('bundle'))
  })
})

test.describe('offline', () => {
  test('a visited page opens with no connection; an unvisited one shows the offline page', async ({ page, context }) => {
    await page.goto('/en/')
    await page.evaluate(() => navigator.serviceWorker.ready)

    // The page tells the worker what it loaded on this first visit; wait until it has been saved.
    await page.waitForFunction(
      async () => {
        const names = await caches.keys()
        const pages = names.find((name) => name.startsWith('londry-pages-'))
        if (!pages) return false
        const saved = await (await caches.open(pages)).keys()
        return saved.some((request) => request.url.endsWith('/en/')) && saved.some((request) => request.url.endsWith('/offline.html'))
      },
      null,
      { timeout: 15_000 },
    )
    await page.waitForTimeout(500)

    await context.setOffline(true)

    await page.reload()
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Clean clothes')
    await expect(page.getByText('+998 97 444 81 93').first()).toBeVisible()

    await page.goto('/en/privacy/').catch(() => undefined)
    await expect(page.getByRole('heading', { name: /offline/i }).first()).toBeVisible()
    await expect(page.getByText('+998 97 444 81 93').first()).toBeVisible()

    await context.setOffline(false)
  })
})
