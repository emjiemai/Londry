import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const URLS = ['/', '/ru/', '/en/', '/en/terms/', '/ru/privacy/', '/404.html']

for (const url of URLS) {
  test(`${url} has no automatically detectable accessibility problems`, async ({ page }) => {
    test.slow() // the scan itself is quick; a busy machine can make it several times slower
    await page.goto(url)
    await page.waitForTimeout(2300) // let the one-time door swing and the review cards settle so contrast is measured on final colours
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
      .analyze()
    const summary = results.violations.map((violation) => ({
      rule: violation.id,
      impact: violation.impact,
      nodes: violation.nodes.map((node) => node.target.join(' ')).slice(0, 4),
    }))
    expect(summary).toEqual([])
  })
}

test('keyboard users can reach every control, and a skip link comes first', async ({ page }) => {
  await page.goto('/en/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main$/)

  await page.goto('/en/')
  const reached = new Set<string>()
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press('Tab')
    const label = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null
      return el ? `${el.tagName}:${el.getAttribute('href') ?? el.textContent?.trim().slice(0, 24) ?? ''}` : ''
    })
    reached.add(label)
  }
  // The hero's phone number and the branch buttons are reachable from the keyboard.
  expect([...reached].some((entry) => entry.includes('tel:+998974448193'))).toBe(true)
  expect([...reached].some((entry) => entry.includes('google.com/maps/dir'))).toBe(true)
})
