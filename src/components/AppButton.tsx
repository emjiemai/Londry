import type { MouseEvent } from 'react'
import { useI18n } from '../i18n/context'
import { pathFor } from '../routes'
import { site } from '../site'

/** The store link that fits this device, or null (desktop, or link not set yet). */
function storeForThisDevice(): string | null {
  const ua = navigator.userAgent
  const isIos = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  const isAndroid = /Android/i.test(ua)
  if (isIos && site.stores.appStore) return site.stores.appStore
  if (isAndroid && site.stores.googlePlay) return site.stores.googlePlay
  return null
}

/**
 * "Get the app". Without JavaScript it scrolls to the download section. With JavaScript, on a phone whose
 * store link is known, it goes straight to the right store.
 */
export function AppButton({ className, short = false }: { className?: string; short?: boolean }) {
  const { t, locale } = useI18n()

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const url = storeForThisDevice()
    if (!url) return
    event.preventDefault()
    window.location.assign(url)
  }

  return (
    <a className={className} href={`${pathFor(locale)}#download`} onClick={onClick}>
      {short ? t.header.ctaShort : t.header.cta}
    </a>
  )
}
