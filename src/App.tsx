import { Footer } from './components/Footer'
import { Header } from './components/Header'
import type { LegalDoc } from './content/legal/types'
import { I18nProvider, useI18n } from './i18n/context'
import { HomePage } from './pages/Home'
import { LegalPage } from './pages/Legal'
import { NotFoundPage, OfflinePage } from './pages/Notices'
import type { Route } from './routes'

function SkipLink() {
  const { t } = useI18n()
  return (
    <a className="skip-link" href="#main">
      {t.a11y.skip}
    </a>
  )
}

/** One component renders every page of the site; `route` says which. Same tree on the server and in the browser. */
export function App({ route, legal = null }: { route: Route; legal?: LegalDoc | null }) {
  const { locale, page } = route

  if (page === 'notFound') return <NotFoundPage />
  if (page === 'offline') return <OfflinePage />

  return (
    <I18nProvider locale={locale}>
      <SkipLink />
      <Header page={page} />
      <main id="main">{page === 'home' ? <HomePage /> : <LegalPage page={page} doc={legal} />}</main>
      <Footer />
    </I18nProvider>
  )
}
