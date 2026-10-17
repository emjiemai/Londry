import { createContext, useContext, type ReactNode } from 'react'
import type { Locale } from '../routes'
import { dictionaries, type Dict } from './index'

interface I18n {
  locale: Locale
  t: Dict
}

const I18nContext = createContext<I18n | null>(null)

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <I18nContext.Provider value={{ locale, t: dictionaries[locale] }}>{children}</I18nContext.Provider>
}

export function useI18n(): I18n {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n must be used inside <I18nProvider>')
  return value
}
