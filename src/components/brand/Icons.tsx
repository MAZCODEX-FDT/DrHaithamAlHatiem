import type { SVGProps } from 'react'
import type { IconKey } from '@/data/types'

/**
 * Brand line icons — 24×24 grid, 1.8px stroke, round caps & joins, no fills.
 * The pulse accent (where present) uses Vessel Blue via `.accent`.
 */
type P = SVGProps<SVGSVGElement> & { size?: number; accent?: string }

function Base({ size = 24, children, accent = '#8DAFBC', ...rest }: P & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ ['--accent' as string]: accent }}
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  )
}

const A = { stroke: 'var(--accent)' }

const paths: Record<IconKey, React.ReactNode> = {
  varicose: (
    <>
      <path d="M12 3c-1.6 2.4-3.4 3.4-3.4 5.6 0 2.2 2.6 2.6 2.6 4.8S8.5 16.6 8.5 18.6 10 21 10 21" />
      <path d="M12 3c1.4 2 2.6 3.4 2.6 5.2" />
      <path style={A} d="M13 14.5c1.2.6 2.4 1.8 2.4 3.6" />
    </>
  ),
  arterial: (
    <>
      <path d="M12 21v-8.5" />
      <path d="M12 12.5C12 9.5 6.5 8.6 6 4" />
      <path d="M12 12.5c0-3 5.5-3.9 6-8.5" />
      <path style={A} d="M6 4 5 2.8M18 4l1-1.2" />
    </>
  ),
  diabetic: (
    <>
      <path d="M9 3v9.4c0 1.4-.7 2.4-1.7 3.4C6 17 6 19.2 7.6 20.3c1.5 1 3.6.7 5.6.2 2.2-.6 4.3-.5 4.3-2.4 0-1.6-1.6-2-3.5-2.2-1.4-.1-2-.8-2-2.2V3" />
      <path style={A} d="M15 18.2h.01" />
    </>
  ),
  doppler: (
    <>
      <rect x="3" y="4" width="18" height="12.5" rx="2.2" />
      <path d="M9 20h6M12 16.5V20" />
      <path style={A} d="M6.5 10.5h2.8l1.2-2.5 2 5 1.4-2.5h3.6" />
    </>
  ),
  flow: (
    <>
      <path d="M2.5 12h5l2-4.5 3.5 9 2.2-4.5h6.3" />
    </>
  ),
  endovascular: (
    <>
      <path d="M4 20 15.5 8.5" />
      <path d="m15.5 8.5 2.2-2.2a1.9 1.9 0 0 1 2.7 2.7l-2.2 2.2" />
      <path style={A} d="m16.6 4.8 2.6 2.6" />
      <path d="M4 20l-.8.8" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" />
  ),
  shield: (
    <>
      <path d="M12 3 5 5.8v5.4c0 4.4 3 8 7 9.8 4-1.8 7-5.4 7-9.8V5.8L12 3Z" />
      <path style={A} d="m9 12 2.2 2.2L15.2 10" />
    </>
  ),
  dialysis: (
    <>
      <path d="M4 7.5c3 0 3.5 4.5 8 4.5s5-4.5 8-4.5" />
      <path d="M4 16.5c3 0 3.5-4.5 8-4.5s5 4.5 8 4.5" />
      <circle style={A} cx="12" cy="12" r="1.6" />
    </>
  ),
  aneurysm: (
    <>
      <path d="M10 2.5v5.2c-2.6 1.3-3.6 3.4-3.6 5.3 0 2.1 1.4 3.8 3.6 4.6v3.9" />
      <path d="M14 2.5v5.2c2.6 1.3 3.6 3.4 3.6 5.3 0 2.1-1.4 3.8-3.6 4.6v3.9" />
      <path style={A} d="M10 21.5 7.5 20M14 21.5l2.5-1.5" />
    </>
  ),
  dvt: (
    <>
      <path d="M9.5 2.5v19M14.5 2.5v19" />
      <ellipse style={A} cx="12" cy="12" rx="1.6" ry="2.8" />
    </>
  ),
  spider: (
    <>
      <path d="M12 12 6 6M12 12l6-6M12 12l-6 6M12 12l6 6M12 12V3M12 12h9" />
    </>
  ),
}

export function ServiceIcon({ name, ...rest }: P & { name: IconKey }) {
  return <Base {...rest}>{paths[name]}</Base>
}

export function PulseIcon(props: P) {
  return <Base {...props}>{paths.flow}</Base>
}
