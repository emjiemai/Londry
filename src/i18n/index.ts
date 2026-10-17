import type { Locale } from '../routes'
import { en } from './en'
import { ru } from './ru'
import type { Dictionaries } from './types'
import { uz } from './uz'

export const dictionaries: Dictionaries = { uz, ru, en }

export type { Branch, Dict } from './types'

/** BCP-47 tag for `<html lang>`. */
export const HTML_LANG: Record<Locale, string> = { uz: 'uz', ru: 'ru', en: 'en' }

/** Open Graph locale codes for link previews. */
export const OG_LOCALE: Record<Locale, string> = { uz: 'uz_UZ', ru: 'ru_RU', en: 'en_US' }

/** Two-letter label shown in the language switch. */
export const LOCALE_SHORT: Record<Locale, string> = { uz: 'UZ', ru: 'RU', en: 'EN' }
