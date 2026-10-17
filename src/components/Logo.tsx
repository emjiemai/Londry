import { LONDRY_LETTERS, LONDRY_MARK, LONDRY_VIEWBOX, SPOTX_LETTERS, SPOTX_VIEWBOX } from './logo-paths'

/** Brand red of the washing-machine-door mark. It stays red on light and dark backgrounds. */
const MARK_RED = '#e32a30'

/**
 * The Londry wordmark, drawn as vector outlines (no font needed, so it never flashes or shifts while fonts load).
 * Letters use the current text colour; the O is the door mark: a ring with a half disc inside.
 * Swap this component's body for the official SVG when the owner supplies it.
 */
export function LondryLogo({ className, label }: { className?: string; label?: string }) {
  const { cx, cy, r, stroke, disc } = LONDRY_MARK
  return (
    <svg
      className={className}
      viewBox={LONDRY_VIEWBOX}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <g fill="currentColor">
        {Object.entries(LONDRY_LETTERS).map(([letter, d]) => (
          <path key={letter} d={d} />
        ))}
      </g>
      <circle cx={cx} cy={cy} r={r - stroke / 2} fill="none" stroke={MARK_RED} strokeWidth={stroke} />
      <path d={`M${cx} ${cy - disc}A${disc} ${disc} 0 0 0 ${cx} ${cy + disc}z`} fill={MARK_RED} />
    </svg>
  )
}

/** The SPOTX wordmark (decorative: the surrounding link carries the label). */
export function SpotxLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={SPOTX_VIEWBOX} aria-hidden="true" focusable="false">
      <g fill="currentColor">
        {Object.entries(SPOTX_LETTERS).map(([letter, d]) => (
          <path key={letter} d={d} />
        ))}
      </g>
    </svg>
  )
}
