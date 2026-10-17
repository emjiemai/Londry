import { useI18n } from '../i18n/context'
import { pathFor } from '../routes'
import { site, YEAR } from '../site'
import { LondryLogo } from './Logo'

export function Footer() {
  const { t, locale } = useI18n()

  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__about">
            <LondryLogo className="site-footer__logo" label={site.name} />
            <p>{t.footer.about}</p>
          </div>

          <div>
            <h2 className="site-footer__label">{t.footer.contact}</h2>
            <a className="site-footer__phone" href={`tel:${site.phone.tel}`}>
              {site.phone.display}
            </a>
            <a className="site-footer__link" href={site.instagram.url} target="_blank" rel="noopener">
              {t.footer.instagram} · {site.instagram.handle}
            </a>
          </div>

          <div>
            <h2 className="site-footer__label">{t.footer.addresses}</h2>
            <address className="site-footer__addresses">
              {t.locations.branches.map((branch) => (
                <p key={branch.name}>{branch.address}</p>
              ))}
            </address>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {YEAR} {t.footer.rights}
          </p>
          <nav aria-label={t.footer.terms + ' / ' + t.footer.privacy}>
            <a href={pathFor(locale, 'terms')}>{t.footer.terms}</a>
            <a href={pathFor(locale, 'privacy')}>{t.footer.privacy}</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
