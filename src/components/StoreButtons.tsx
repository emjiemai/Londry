import { useI18n } from '../i18n/context'
import { site } from '../site'
import { IconAppStore, IconPlay } from './Icons'

/**
 * App Store + Google Play buttons. A store whose link is still empty in src/site.ts shows "Coming soon"
 * and does not navigate, so nobody lands on a dead link during the beta.
 */
export function StoreButtons() {
  const { t } = useI18n()

  const stores = [
    { key: 'app-store', name: 'App Store', lead: t.stores.appStoreLead, href: site.stores.appStore, icon: <IconAppStore /> },
    { key: 'google-play', name: 'Google Play', lead: t.stores.googlePlayLead, href: site.stores.googlePlay, icon: <IconPlay /> },
  ]

  return (
    <div className="stores">
      {stores.map(({ key, name, lead, href, icon }) =>
        href ? (
          <a key={key} className="store" href={href} data-store={key}>
            {icon}
            <span className="store__text">
              <span className="store__lead">{lead}</span>
              <span className="store__name">{name}</span>
            </span>
          </a>
        ) : (
          <span key={key} className="store store--soon" aria-disabled="true" data-store={key}>
            {icon}
            <span className="store__text">
              <span className="store__lead">{t.stores.soon}</span>
              <span className="store__name">{name}</span>
            </span>
          </span>
        ),
      )}
    </div>
  )
}
