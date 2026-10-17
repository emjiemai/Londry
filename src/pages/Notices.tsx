import { LondryLogo } from '../components/Logo'
import { dictionaries } from '../i18n'
import { LOCALES, pathFor } from '../routes'
import { site } from '../site'

/**
 * 404 and offline pages. They are rendered once at build time as plain HTML (no JavaScript needed), and they
 * show all three languages because the visitor's language is unknown here.
 */
export function NotFoundPage() {
  return (
    <main className="notice">
      <div className="container notice__inner">
        <LondryLogo className="notice__logo" label={site.name} />
        <p className="notice__code">404</p>
        {LOCALES.map((code, index) => {
          const text = dictionaries[code].notFound
          const Heading = index === 0 ? 'h1' : 'h2'
          return (
            <section key={code} className="notice__block" lang={code}>
              <Heading>{text.title}</Heading>
              <p>{text.text}</p>
              <a className="btn btn--primary" href={pathFor(code)}>
                {text.home}
              </a>
            </section>
          )
        })}
      </div>
    </main>
  )
}

export function OfflinePage() {
  return (
    <main className="notice">
      <div className="container notice__inner">
        <LondryLogo className="notice__logo" label={site.name} />
        {LOCALES.map((code, index) => {
          const text = dictionaries[code].offline
          const Heading = index === 0 ? 'h1' : 'h2'
          return (
            <section key={code} className="notice__block" lang={code}>
              <Heading>{text.title}</Heading>
              <p>{text.text}</p>
            </section>
          )
        })}

        <section className="notice__block notice__block--facts">
          <a className="notice__phone" href={`tel:${site.phone.tel}`}>
            {site.phone.display}
          </a>
          {dictionaries.en.locations.branches.map((branch) => (
            <p key={branch.name}>{branch.address}</p>
          ))}
          <button type="button" className="btn btn--primary" data-reload>
            {LOCALES.map((code) => dictionaries[code].offline.retry.replace(/ /g, '\u00a0')).join(' · ')}
          </button>
        </section>
      </div>
    </main>
  )
}
