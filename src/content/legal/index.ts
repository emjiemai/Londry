import type { Locale } from '../../routes'
import type { LegalDoc } from './types'

/**
 * Legal texts are separate files so the long text is only downloaded on the page that shows it.
 *
 * HOW TO ADD ONE: create `terms.uz.ts`, `terms.ru.ts`, `terms.en.ts`, `privacy.uz.ts` ... next to this file, each
 * `export default { title, updated, sections: [...] } satisfies LegalDoc` (see types.ts). Until a file exists the
 * page shows a short "coming soon" notice with the phone number.
 */
const loaders = import.meta.glob<{ default: LegalDoc }>('./*.*.ts')

export async function loadLegalDoc(locale: Locale, page: 'terms' | 'privacy'): Promise<LegalDoc | null> {
  const load = loaders[`./${page}.${locale}.ts`]
  return load ? (await load()).default : null
}

export type { LegalDoc } from './types'
