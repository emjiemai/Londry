import { useI18n } from '../i18n/context'
import type { SlotId } from '../media'
import { site } from '../site'
import { IconClock } from './Icons'
import { Slot } from './Slot'

const MAP_SLOT: Record<(typeof site.branches)[number]['id'], { id: SlotId; label: string }> = {
  talabalar: { id: 'map-talabalar', label: '[MAP — Talabalar 81/1]' },
  yunusabad: { id: 'map-yunusabad', label: '[MAP — Iftixor 1a]' },
}

export function Locations() {
  const { t } = useI18n()

  return (
    <section id="locations" className="section section--surface" aria-labelledby="locations-title">
      <div className="container">
        <header className="section__head section__head--locations">
          <p className="eyebrow">{t.locations.eyebrow}</p>
          <h2 id="locations-title" className="h2">
            {t.locations.title}
          </h2>
        </header>

        <div className="branches">
          {site.branches.map((branch, index) => {
            const text = t.locations.branches[index]
            const slot = MAP_SLOT[branch.id]
            return (
              <article key={branch.id} className="branch">
                <div className="branch__map">
                  {/* Tapping the picture opens the route as well. The button below is the accessible control, so this link stays out of the tab order. */}
                  <a className="branch__map-link" href={branch.directionsUrl} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true">
                    <Slot id={slot.id} label={slot.label} alt={text.mapAlt} sizes="(min-width: 900px) 590px, 100vw" />
                  </a>
                </div>
                <div className="branch__info">
                  <div className="branch__text">
                    <h3 className="branch__name">{text.name}</h3>
                    <address className="branch__address">{text.address}</address>
                    {branch.open24h && (
                      <p className="branch__hours">
                        <IconClock />
                        {t.locations.open24h}
                      </p>
                    )}
                  </div>
                  <a className="btn btn--primary" href={branch.directionsUrl} target="_blank" rel="noopener">
                    {t.locations.directions}
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        {/* Required credit for the map data and tiles (OpenStreetMap licence). Kept in English on every page, like a brand line. */}
        <p className="map-credit" lang="en">
          Map data ©{' '}
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">
            OpenStreetMap
          </a>{' '}
          contributors · tiles by{' '}
          <a href="https://openfreemap.org" target="_blank" rel="noopener">
            OpenFreeMap
          </a>{' '}
          ©{' '}
          <a href="https://www.openmaptiles.org/" target="_blank" rel="noopener">
            OpenMapTiles
          </a>
        </p>
      </div>
    </section>
  )
}
