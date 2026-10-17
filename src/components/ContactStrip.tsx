import { useI18n } from '../i18n/context'
import { pathFor } from '../routes'
import { site } from '../site'
import { IconInstagram, IconPhone, IconPin } from './Icons'

/** Three quick ways in: call, find a branch, follow on Instagram. */
export function ContactStrip() {
  const { t, locale } = useI18n()

  const items = [
    { href: `tel:${site.phone.tel}`, icon: <IconPhone />, label: t.strip.callLabel, value: site.phone.display, external: false },
    { href: `${pathFor(locale)}#locations`, icon: <IconPin />, label: t.strip.branchLabel, value: t.strip.branchValue, external: false },
    { href: site.instagram.url, icon: <IconInstagram />, label: t.strip.followLabel, value: site.instagram.handle, external: true },
  ]

  return (
    <div className="strip">
      <ul className="container strip__grid">
        {items.map(({ href, icon, label, value, external }) => (
          <li key={href}>
            <a className="contact-card" href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
              <span className="contact-card__icon">{icon}</span>
              <span className="contact-card__text">
                <span className="contact-card__label">{label}</span>
                <span className="contact-card__value">{value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
