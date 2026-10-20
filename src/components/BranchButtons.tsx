import { useI18n } from '../i18n/context'
import { site } from '../site'
import { IconPin } from './Icons'

/** One button per branch that opens the route in Google Maps. Same look as the store buttons. */
export function BranchButtons() {
  const { t } = useI18n()

  return (
    <div className="stores">
      {site.branches.map((branch, index) => (
        <a key={branch.id} className="store" href={branch.directionsUrl} target="_blank" rel="noopener" data-branch={branch.id}>
          <IconPin />
          <span className="store__text">
            <span className="store__lead">{t.locations.directions}</span>
            <span className="store__name">{t.locations.branches[index].name}</span>
          </span>
        </a>
      ))}
    </div>
  )
}
