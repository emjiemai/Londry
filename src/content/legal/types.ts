/** A paragraph, or a bullet list. */
export type LegalBlock = string | { list: string[] }

export interface LegalDoc {
  title: string
  /** Shown as "Last updated: …". */
  updated: string
  sections: Array<{ heading: string; blocks: LegalBlock[] }>
}
