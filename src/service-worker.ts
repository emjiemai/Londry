/**
 * Registers /sw.js (see scripts/sw.template.js for what it does) once the page has finished loading and the
 * browser is idle, so it never competes with the first paint. Production builds only.
 */
export function registerServiceWorker() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return

  const register = () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => navigator.serviceWorker.ready)
      .then((registration) => {
        // First visit: the worker could not intercept this page's own downloads, so tell it what they were.
        // From now on this page (and its files) also open with no connection at all.
        const urls = [
          location.href,
          ...performance
            .getEntriesByType('resource')
            .map((entry) => entry.name)
            .filter((url) => url.startsWith(location.origin)),
        ]
        registration.active?.postMessage({ type: 'cache-urls', urls })
      })
      .catch(() => {
        /* No service worker is fine: the site simply works online-only. */
      })
  }

  const whenIdle = () =>
    'requestIdleCallback' in window ? window.requestIdleCallback(register, { timeout: 5000 }) : setTimeout(register, 2000)

  if (document.readyState === 'complete') whenIdle()
  else window.addEventListener('load', whenIdle, { once: true })
}
