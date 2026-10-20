import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { site } from './site'

interface DrawnBranch {
  id: string
  lat: number
  lon: number
}
const drawn = (JSON.parse(readFileSync(new URL('../scripts/maps/branches.json', import.meta.url), 'utf8')) as { branches: DrawnBranch[] })
  .branches

describe('branch coordinates', () => {
  it('are the same in the site facts and in the settings the map pictures are drawn from', () => {
    for (const branch of site.branches) {
      const picture = drawn.find((entry) => entry.id === branch.id)
      expect(picture, `no map picture settings for ${branch.id}`).toBeDefined()
      expect(picture!.lat).toBe(branch.geo.lat)
      expect(picture!.lon).toBe(branch.geo.lng)
    }
  })

  it('send the "Get directions" button to the same spot', () => {
    for (const branch of site.branches) {
      expect(branch.directionsUrl).toContain(`destination=${branch.geo.lat},${branch.geo.lng}`)
    }
  })
})
