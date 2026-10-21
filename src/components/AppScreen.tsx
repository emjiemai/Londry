/**
 * The home screen of the Londry app on the phone in the first screen, drawn in SVG instead of being a screenshot: nothing to
 * download (it used to show late on a reload or when arriving from another site), sharp at any size, about 3 KB. The words are
 * the app's own (it is shown in Uzbek, as in the screenshot the owner supplied). Text widths are fixed so the lines break
 * exactly as in the app whatever font the browser falls back to.
 */
function Line({ x, y, width, size = 30, weight = 400, fill = '#555', children }: { x: number; y: number; width: number; size?: number; weight?: number; fill?: string; children: string }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textLength={width} lengthAdjust="spacingAndGlyphs">
      {children}
    </text>
  )
}

const TITLE = { size: 30, weight: 700, fill: '#444' } as const

export function AppScreen({ label }: { label: string }) {
  return (
    // An SVG drawing is not an <img>, so the role is what gives it a name for screen readers.
    // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
    <svg className="appscreen" viewBox="0 0 923 2000" preserveAspectRatio="xMidYMin slice" role="img" aria-label={label} focusable="false">
      <defs>
        <linearGradient id="appscreen-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.1" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="923" height="2000" fill="#fff" />

      <rect className="appscreen__red" width="923" height="212" />
      <rect y="212" width="923" height="16" fill="url(#appscreen-shade)" />
      <circle cx="97" cy="141" r="27" fill="none" stroke="#fff" strokeWidth="3" />
      <path d="M82 130h30M82 141h30M82 152h30" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <Line x={405} y={156} width={137} size={34} weight={500} fill="#fff">LONDRY</Line>

      <Line x={68} y={313} width={105} size={31} fill="#444">Manzil</Line>
      <rect x="67" y="349" width="789" height="113" rx="4" fill="#fff" stroke="#d6d6d6" strokeWidth="2" />
      <Line x={97} y={419} width={423} size={31} fill="#333">Iftikhor str., 1A, TASHKENT</Line>

      <path d="M0 530H923M0 740H923M0 950H923M0 1160H923" stroke="#c4c4c4" strokeWidth="2" fill="none" />

      {/* YUVISH: washing machine */}
      <circle className="appscreen__ring" cx="144" cy="635" r="58" />
      <rect className="appscreen__red" x="116" y="603" width="56" height="64" rx="9" />
      <circle cx="144" cy="641" r="19" fill="#fff" />
      <circle className="appscreen__red" cx="144" cy="641" r="12" />
      <circle cx="144" cy="641" r="5" fill="#fff" />
      <circle cx="127" cy="613" r="2.5" fill="#fff" />
      <circle cx="136" cy="613" r="2.5" fill="#fff" />
      <Line x={268} y={588} width={133} {...TITLE}>YUVISH</Line>
      <Line x={268} y={635} width={395}>Yuvish vositasini tanlang,</Line>
      <Line x={268} y={675} width={417}>dasturni tanlang va xizmat</Line>
      <Line x={268} y={713} width={216}>uchun to'lang</Line>
      <path className="appscreen__chevron" d="M811 622l15 13-15 13" />

      {/* QURITISH: t-shirt on a line */}
      <circle className="appscreen__ring" cx="144" cy="845" r="58" />
      <path d="M92 824q52 14 104 0" fill="none" stroke="#c9262f" strokeWidth="2" />
      <path className="appscreen__red" d="M119 837l16-10q9 9 18 0l16 10-8 16-8-4v33h-26v-33l-8 4z" />
      <Line x={268} y={818} width={171} {...TITLE}>QURITISH</Line>
      <Line x={268} y={865} width={455}>Quritgichni tanlang, dasturni</Line>
      <Line x={268} y={905} width={502}>tanlang va xizmat uchun to'lang</Line>
      <path className="appscreen__chevron" d="M811 832l15 13-15 13" />

      {/* KIR YUVISH MASHINASINI RESERVLANG: calendar with a star */}
      <circle className="appscreen__ring" cx="144" cy="1055" r="58" />
      <rect className="appscreen__red" x="116" y="1027" width="58" height="56" rx="5" />
      <rect className="appscreen__red" x="126" y="1019" width="6" height="14" rx="2" />
      <rect className="appscreen__red" x="158" y="1019" width="6" height="14" rx="2" />
      <path d="M116 1040h58" stroke="#fff" strokeWidth="2" />
      <path d="M145 1050l3.6 7.4 8.1 1.1-5.9 5.7 1.4 8.1-7.2-3.9-7.2 3.9 1.4-8.1-5.9-5.7 8.1-1.1z" fill="#fff" />
      <Line x={268} y={1006} width={461} {...TITLE}>KIR YUVISH MASHINASINI</Line>
      <Line x={268} y={1051} width={239} {...TITLE}>RESERVLANG</Line>
      <Line x={268} y={1098} width={439}>Sizning rezervasyoningiz 10</Line>
      <Line x={268} y={1137} width={447}>daqiqa davomida amal qiladi</Line>
      <path className="appscreen__chevron" d="M811 1042l15 13-15 13" />
    </svg>
  )
}
