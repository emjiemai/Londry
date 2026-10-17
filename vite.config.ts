import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'
import { defineConfig } from 'vitest/config'

/** Oldest browsers the JavaScript and CSS are built for (roughly 2021 onward). Older ones still get the HTML and CSS. */
const browsers = ['chrome87', 'edge88', 'firefox85', 'safari14']

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), imagetools()],
  build: {
    target: isSsrBuild ? 'node20' : browsers,
    cssMinify: 'lightningcss',
    // One stylesheet: scripts/prerender.mjs inlines it into every page, so there is no render-blocking CSS request.
    cssCodeSplit: false,
    // The pre-renderer reads the manifest to find the hashed file names.
    manifest: !isSsrBuild,
    modulePreload: { polyfill: false },
    // Never inline assets as data: URIs; it would bloat the HTML. Everything is a cacheable file.
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 150,
    sourcemap: false,
  },
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
}))
