import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/index.css'
import { App } from './App'
import { loadLegalDoc } from './content/legal'
import { dictionaries } from './i18n'
import { parseRouteKey, resolveRoute } from './routes'
import { registerServiceWorker } from './service-worker'

async function start() {
  const container = document.getElementById('root')
  if (!container) return

  // The pre-rendered HTML says which page it is; fall back to the URL (dev server, where nothing is pre-rendered).
  const route = parseRouteKey(container.dataset.route) ?? resolveRoute(location.pathname)
  const legal = route.page === 'terms' || route.page === 'privacy' ? await loadLegalDoc(route.locale, route.page) : null

  const app = (
    <StrictMode>
      <App route={route} legal={legal} />
    </StrictMode>
  )

  if (container.firstElementChild) {
    hydrateRoot(container, app)
  } else {
    createRoot(container).render(app)
    document.documentElement.lang = route.locale
    document.title = dictionaries[route.locale].meta.title
  }

  registerServiceWorker()
}

void start()
