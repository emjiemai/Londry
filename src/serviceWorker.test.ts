import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../scripts/sw.template.js', import.meta.url), 'utf8')

describe('service worker', () => {
  it('leaves videos to the browser: they stream in pieces (Range requests) and can be large', () => {
    expect(source).toContain("request.headers.has('range')")
    expect(source).toContain("url.pathname.startsWith('/videos/')")
  })

  it('does that before it decides how to answer any request', () => {
    expect(source.indexOf("startsWith('/videos/')")).toBeLessThan(source.indexOf('respondWith('))
  })
})
