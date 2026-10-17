import { useI18n } from '../i18n/context'
import { pathFor, type PublicPage } from '../routes'
import { AppButton } from './AppButton'
import { IconClose, IconMenu } from './Icons'
import { LangSwitch } from './LangSwitch'
import { LondryLogo, SpotxLogo } from './Logo'

/**
 * The mobile menu is a native <details>: it opens and closes with no script. A tiny inline script (see
 * scripts/prerender.mjs) adds closing on Escape, on an outside click and after choosing a link, so that also works
 * before React has loaded, or when it never loads (data-saver mode).
 */
export function Header({ page }: { page: PublicPage }) {
  const { t, locale } = useI18n()
  const home = pathFor(locale)

  const links = [
    { href: `${home}#services`, label: t.nav.services },
    { href: `${home}#partners`, label: t.nav.partners },
    { href: `${home}#locations`, label: t.nav.locations },
    { href: `${home}#contact`, label: t.nav.contact },
  ]

  const navList = (
    <ul>
      {links.map(({ href, label }) => (
        <li key={href}>
          <a href={href}>{label}</a>
        </li>
      ))}
    </ul>
  )

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="brand" href={home} aria-label={t.a11y.home}>
          <LondryLogo className="brand__londry" />
          <span className="brand__divider" aria-hidden="true" />
          <SpotxLogo className="brand__spotx" />
        </a>

        <nav className="nav" aria-label={t.a11y.mainNav}>
          {navList}
        </nav>

        <div className="site-header__actions">
          <LangSwitch page={page} />
          <AppButton short className="btn btn--primary site-header__cta" />

          <details className="menu">
            <summary className="menu__button" aria-label={t.a11y.menu}>
              <IconMenu className="menu__icon menu__icon--open" />
              <IconClose className="menu__icon menu__icon--close" />
            </summary>
            <div className="menu__panel">
              <nav aria-label={t.a11y.mainNav}>{navList}</nav>
              <AppButton className="btn btn--primary btn--block" />
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
