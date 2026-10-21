import { defineConfig, devices } from '@playwright/test'

/**
 * End-to-end checks run against the real build in dist/ (run `npm run build` first, then `npm run e2e`).
 * They use the Google Chrome already installed on the machine, so there is nothing extra to download.
 */
const PORT = 4173

export default defineConfig({
  testDir: './e2e',
  timeout: 45_000,
  fullyParallel: true,
  workers: 4, // a few Chrome windows at a time keep the scans steady on a busy machine
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    channel: 'chrome',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `node scripts/serve-dist.mjs --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'phone', use: { ...devices['Pixel 5'], channel: 'chrome' } },
  ],
})
