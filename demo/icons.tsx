/** Demo-only icons. Outline + filled variants so the cross-fade has something to do. */

interface IconProps {
  filled?: boolean
}

const line = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {children}
    </svg>
  )
}

function shape(path: string, filled?: boolean) {
  return (
    <Svg>
      <path d={path} {...(filled ? { fill: 'currentColor', stroke: 'none' } : line)} />
    </Svg>
  )
}

export const Home = ({ filled }: IconProps) =>
  shape('M4 10.4 12 4l8 6.4V19a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 19v-8.6Z', filled)

export const Benefit = ({ filled }: IconProps) =>
  shape('M12 3.4 20.6 9 12 20.6 3.4 9 12 3.4Z', filled)

export const Shop = ({ filled }: IconProps) => (
  <Svg>
    <path
      d="M5.6 8h12.8l-.9 11.1a1.6 1.6 0 0 1-1.6 1.5H8.1a1.6 1.6 0 0 1-1.6-1.5L5.6 8Z"
      {...(filled ? { fill: 'currentColor', stroke: 'none' } : line)}
    />
    <path d="M9 8.4V6.6a3 3 0 0 1 6 0v1.8" {...line} />
  </Svg>
)

export const Stock = ({ filled }: IconProps) =>
  shape('M4 17.6 8.6 11l3.4 3L20 6.4v11.2H4Z', filled)

export const All = ({ filled }: IconProps) => (
  <Svg>
    <g {...line} strokeWidth={filled ? 2.8 : 1.9}>
      <path d="M4.5 7.5h15" />
      <path d="M4.5 12h15" />
      <path d="M4.5 16.5h15" />
    </g>
  </Svg>
)

export const Heart = ({ filled }: IconProps) =>
  shape(
    'M12 20.2c-1.2-.8-7-4.6-7-9.3A4.2 4.2 0 0 1 12 8.1a4.2 4.2 0 0 1 7 2.8c0 4.7-5.8 8.5-7 9.3Z',
    filled,
  )

export const Discover = ({ filled }: IconProps) => (
  <Svg>
    <circle
      cx="12"
      cy="12"
      r="4.9"
      {...(filled ? { fill: 'currentColor', stroke: 'none' } : line)}
    />
    <ellipse
      cx="12"
      cy="12"
      rx="9.2"
      ry="3.1"
      transform="rotate(-26 12 12)"
      {...line}
      strokeWidth={1.7}
    />
  </Svg>
)

export const Feed = ({ filled }: IconProps) =>
  shape('M4 6.6A1.6 1.6 0 0 1 5.6 5h12.8A1.6 1.6 0 0 1 20 6.6v7.8a1.6 1.6 0 0 1-1.6 1.6H9l-5 4V6.6Z', filled)

export const Tag = ({ filled }: IconProps) =>
  shape('M12.2 3.8 20.2 11.8 12 20 4 12l.4-7.8 7.8-.4Z', filled)

export const Truck = ({ filled }: IconProps) =>
  shape('M3.5 7.4h9.6v9.2H3.5V7.4Zm9.6 3.4h4l3.4 3v3.2h-7.4v-6.2Z', filled)
