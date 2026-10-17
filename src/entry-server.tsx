import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { App } from './App'
import { loadLegalDoc } from './content/legal'
import type { Route } from './routes'

/**
 * Build-time entry (see scripts/prerender.mjs). Turns a route into the HTML that goes inside <div id="root">.
 * The 404 and offline pages are plain static HTML; every other page is rendered so React can hydrate it.
 */
export async function renderRoute(route: Route): Promise<string> {
  const legal =
    route.page === 'terms' || route.page === 'privacy' ? await loadLegalDoc(route.locale, route.page) : null
  const tree = <App route={route} legal={legal} />
  return route.page === 'notFound' || route.page === 'offline' ? renderToStaticMarkup(tree) : renderToString(tree)
}

export { buildHead } from './head'
export { ALL_ROUTES, pathFor, routeKey } from './routes'
export { dictionaries, HTML_LANG, OG_LOCALE } from './i18n'
export { site } from './site'
