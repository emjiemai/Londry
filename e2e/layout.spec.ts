import { expect, test } from '@playwright/test'

const URLS = ['/', '/ru/', '/en/']

test('the header always fits: one row when full, compact below 1024 px, never sideways scroll', async ({ page }) => {
  test.slow() // about 30 page loads
  for (const url of URLS) {
    for (const width of [320, 360, 390, 768, 900, 960, 1023, 1024, 1100, 1280, 1440]) {
      await page.setViewportSize({ width, height: 800 })
      await page.goto(url)
      const { overflow, height } = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        height: document.querySelector('.site-header__inner')!.getBoundingClientRect().height,
      }))
      expect(overflow, `${url} @${width}px sideways overflow`).toBeLessThanOrEqual(0)
      expect(height, `${url} @${width}px header wrapped onto a second row`).toBeLessThanOrEqual(width >= 1024 ? 73 : 61)
    }
  }
})

test('the headline keeps its two lines at tablet-landscape widths', async ({ page }) => {
  test.slow() // 15 page loads
  for (const url of URLS) {
    for (const width of [900, 1024, 1100, 1280, 1440]) {
      await page.setViewportSize({ width, height: 800 })
      await page.goto(url)
      const lines = await page.evaluate(() => {
        const h1 = document.querySelector('h1')!
        return h1.getBoundingClientRect().height / parseFloat(getComputedStyle(h1).lineHeight)
      })
      expect(lines, `${url} @${width}px headline lines`).toBeLessThan(2.1)
    }
  }
})

test('the review cards around the phone never cover the text or buttons and never leave the screen', async ({ page }) => {
  test.slow() // 48 window sizes
  await page.emulateMedia({ reducedMotion: 'reduce' }) // measure the resting positions, not mid-animation
  const CLEARANCE = 8 // the gentle drift moves a card up to 7 px
  for (const url of URLS) {
    await page.goto(url) // the layout is pure CSS: one page load, then only the window size changes
    await page.evaluate(() => document.fonts.ready) // text size (and so card height) is final only once the font is in
    for (const width of [320, 360, 390, 480, 600, 768, 899, 900, 960, 1024, 1100, 1180, 1280, 1366, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 })
      await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
      const result = await page.evaluate((clearance) => {
        const box = (r: DOMRect, what: string) => ({ what, l: r.left, t: r.top, r: r.right, b: r.bottom })
        const boxes: Array<ReturnType<typeof box>> = []
        for (const selector of ['.hero__title', '.hero__lead', '.checks li', '.hero .eyebrow']) {
          for (const el of document.querySelectorAll(selector)) {
            const range = document.createRange()
            range.selectNodeContents(el)
            for (const rect of range.getClientRects()) boxes.push(box(rect, selector))
          }
        }
        for (const el of document.querySelectorAll('.hero .store')) boxes.push(box(el.getBoundingClientRect(), '.store'))
        const cards = [...document.querySelectorAll<HTMLElement>('.review')]
        const hits: string[] = []
        for (const card of cards) {
          const c = card.getBoundingClientRect()
          for (const b of boxes) {
            if (c.left < b.r + clearance && c.right > b.l - clearance && c.top < b.b + clearance && c.bottom > b.t - clearance) {
              hits.push(`${card.className.split(' ').pop()} touches ${b.what}`)
            }
          }
        }
        const overlaps: string[] = []
        for (let i = 0; i < cards.length; i++) {
          for (let j = i + 1; j < cards.length; j++) {
            const a = cards[i].getBoundingClientRect()
            const b = cards[j].getBoundingClientRect()
            const w = Math.min(a.right, b.right) - Math.max(a.left, b.left)
            const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
            if (w > 0 && h > 0 && (w * h) / Math.min(a.width * a.height, b.width * b.height) > 0.12) overlaps.push(`card ${i} hides card ${j}`)
          }
        }
        const viewport = document.documentElement.clientWidth
        return {
          overlaps,
          hits,
          cards: cards.length,
          cut: cards.filter((card) => card.getBoundingClientRect().left < 0 || card.getBoundingClientRect().right > viewport).length,
          overflow: document.documentElement.scrollWidth - viewport,
        }
      }, CLEARANCE)
      expect.soft(result.cards, `${url} @${width}px`).toBe(4)
      expect.soft(result.hits, `${url} @${width}px`).toEqual([])
      expect.soft(result.overlaps, `${url} @${width}px review cards hide each other`).toEqual([])
      expect.soft(result.cut, `${url} @${width}px review cards cut off by the screen edge`).toBe(0)
      expect(result.overflow, `${url} @${width}px sideways scroll`).toBeLessThanOrEqual(0)
    }
  }
})

test('both "Get directions" buttons line up, even when one address is longer', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  for (const url of URLS) {
    await page.goto(url)
    const tops = await page.locator('.branch .btn').evaluateAll((buttons) => buttons.map((b) => Math.round(b.getBoundingClientRect().top)))
    expect(tops, url).toHaveLength(2)
    expect(Math.abs(tops[0] - tops[1]), `${url} button tops ${tops}`).toBeLessThanOrEqual(1)
  }
})

test('enlarged text (the browser font-size setting at 150% and 200%) never scrolls sideways', async ({ page, context }) => {
  test.slow() // 24 page loads
  const cdp = await context.newCDPSession(page)
  await cdp.send('Page.enable')
  for (const scale of [1.5, 2]) {
    await cdp.send('Page.setFontSizes', { fontSizes: { standard: Math.round(16 * scale), fixed: Math.round(13 * scale) } })
    for (const width of [390, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 })
      for (const url of [...URLS, '/ru/terms/']) {
        await page.goto(url)
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
        expect(overflow, `${url} text x${scale} @${width}px`).toBeLessThanOrEqual(0)
      }
    }
  }
})

test.describe('Windows High Contrast (forced colours)', () => {
  test.use({ forcedColors: 'active', colorScheme: 'dark' })

  test('the SPOTX name follows the system text colour and buttons keep a visible outline', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/en/')
    const spotx = await page.locator('.brand__spotx').evaluate((el) => getComputedStyle(el).color)
    expect(spotx, 'SPOTX must not stay dark on a dark canvas').not.toBe('rgb(17, 17, 17)')
    for (const selector of ['.store', '.site-header__cta', '.contact-card', '.phone']) {
      const border = await page.locator(selector).first().evaluate((el) => getComputedStyle(el).borderTopWidth)
      expect(border, `${selector} needs a border in forced-colours mode`).not.toBe('0px')
    }
  })
})

test('the navigation stays centred between the logo and the buttons, as in the design', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  for (const url of URLS) {
    await page.goto(url)
    const { brand, nav, actions } = await page.evaluate(() => {
      const rect = (selector: string) => {
        const b = document.querySelector(selector)!.getBoundingClientRect()
        return { left: b.left, right: b.right }
      }
      return { brand: rect('.brand'), nav: rect('.nav'), actions: rect('.site-header__actions') }
    })
    const free = (brand.right + actions.left) / 2
    const navCentre = (nav.left + nav.right) / 2
    expect(Math.abs(navCentre - free), `${url}: nav centre ${navCentre} vs free space centre ${free}`).toBeLessThan(3)
  }
})

test.describe('touch screens', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })

  test('text links get tall tap areas, and the legal "back" link keeps its chevron beside its text', async ({ page }) => {
    await page.goto('/ru/privacy/')
    expect(await page.evaluate(() => matchMedia('(pointer: coarse)').matches)).toBe(true)

    const back = await page.evaluate(() => {
      const link = document.querySelector('.legal__back')!.getBoundingClientRect()
      const icon = document.querySelector('.legal__back svg')!.getBoundingClientRect()
      return { height: link.height, sameRow: Math.abs(icon.top + icon.height / 2 - (link.top + link.height / 2)) < 4 }
    })
    expect(back.sameRow, 'chevron and text must share one row').toBe(true)
    expect(back.height).toBeGreaterThanOrEqual(44)

    const rows = await page.evaluate(() =>
      [...document.querySelectorAll('.site-footer__bottom nav a, .site-footer__link, .site-footer__phone')].map((a) =>
        Math.round(a.getBoundingClientRect().height),
      ),
    )
    expect(rows.length).toBeGreaterThanOrEqual(4)
    for (const height of rows) expect(height).toBeGreaterThanOrEqual(44)

    // the phone number never splits across two lines
    const phoneLines = await page.evaluate(() => {
      const a = document.querySelector('.legal__contact a')!
      return a.getClientRects().length
    })
    expect(phoneLines).toBe(1)
  })
})
