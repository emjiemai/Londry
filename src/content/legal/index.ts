import type { Locale } from '../../routes'
import type { LegalDoc } from './types'

/**
 * Legal texts are separate files so the long text is only downloaded on the page that shows it.
 *
 * HOW TO ADD ONE: create `terms.uz.ts`, `terms.ru.ts`, `terms.en.ts`, `privacy.uz.ts` ... next to this file, each
 * `export default { title, sections: [...] } satisfies LegalDoc` (see types.ts; `updated` is optional). The owner's texts
 * (copied from londry.uz) exist in Uzbek only: a language without its own file shows the Uzbek text, marked as Uzbek.
 * Without any file the page shows a short "coming soon" notice with the phone number.
 */
const loaders = import.meta.glob<{ default: LegalDoc }>('./*.*.ts')

export async function loadLegalDoc(locale: Locale, page: 'terms' | 'privacy'): Promise<LegalDoc | null> {
  const own = loaders[`./${page}.${locale}.ts`]
  if (own) return (await own()).default
  const uzbek = loaders[`./${page}.uz.ts`]
  return uzbek ? { ...(await uzbek()).default, lang: 'uz' as const } : null
}

export type { LegalDoc } from './types'
