/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public address of the site, no trailing slash. Used for canonical links, sitemap and share previews. */
  readonly VITE_SITE_URL?: string
  /** "true" lets search engines index the site. Anything else keeps it hidden (the beta default). */
  readonly VITE_INDEXABLE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
