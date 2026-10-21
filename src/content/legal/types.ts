import type { Locale } from '../../routes'

/** A paragraph, or a list (bullets, or numbers when `numbered` is set). */
export type LegalBlock = string | { list: string[]; numbered?: boolean }

export interface LegalDoc {
  title: string
  /** Shown as "Last updated: …" when given. */
  updated?: string
  /** Set when the text is in another language than the page's, so it is marked as such for browsers and screen readers. */
  lang?: Locale
  sections: Array<{ heading?: string; blocks: LegalBlock[] }>
}
