/**
 * Demo-only icons. Each takes a `filled` flag so the active cross-fade has
 * something to do: the icon's primary closed path fills, secondary strokes stay.
 */

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

const solid = { fill: 'currentColor', stroke: 'none' }

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {children}
    </svg>
  )
}

/** Single-path icon: the path itself is the primary shape. */
function shape(path: string, filled?: boolean) {
  return (
    <Svg>
      <path d={path} {...(filled ? solid : line)} />
    </Svg>
  )
}

export const Home = ({ filled }: IconProps) =>
  shape('M4 10.4 12 4l8 6.4V19a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 19v-8.6Z', filled)

export const Compass = ({ filled }: IconProps) => (
  <Svg>
    <circle cx="12" cy="12" r="8.5" {...line} />
    <path d="M15.4 8.6l-2.2 6-6 2.2 2.2-6 6-2.2Z" {...(filled ? solid : line)} />
  </Svg>
)

export const Broadcast = ({ filled }: IconProps) => (
  <Svg>
    <path d="M8.2 8.6a5.6 5.6 0 0 0 0 6.8" {...line} />
    <path d="M15.8 8.6a5.6 5.6 0 0 1 0 6.8" {...line} />
    <path d="M5.4 5.6a9.6 9.6 0 0 0 0 12.8" {...line} />
    <path d="M18.6 5.6a9.6 9.6 0 0 1 0 12.8" {...line} />
    <circle cx="12" cy="12" r="2.4" {...(filled ? solid : line)} />
  </Svg>
)

export const Grid = ({ filled }: IconProps) => (
  <Svg>
    {[
      [4.4, 4.4],
      [13.2, 4.4],
      [4.4, 13.2],
      [13.2, 13.2],
    ].map(([x, y]) => (
      <rect
        key={`${x}-${y}`}
        x={x}
        y={y}
        width="6.4"
        height="6.4"
        rx="1.8"
        {...(filled ? solid : line)}
      />
    ))}
  </Svg>
)

export const Person = ({ filled }: IconProps) => (
  <Svg>
    <circle cx="12" cy="8.4" r="3.6" {...(filled ? solid : line)} />
    <path d="M5.4 20.2c0-3.5 2.9-6.4 6.6-6.4s6.6 2.9 6.6 6.4" {...line} />
  </Svg>
)

export const Chart = ({ filled }: IconProps) =>
  shape('M4 17.6 8.6 11l3.4 3L20 6.4v11.2H4Z', filled)

export const Tag = ({ filled }: IconProps) =>
  shape('M12.2 3.8 20.2 11.8 12 20 4 12l.4-7.8 7.8-.4Z', filled)

export const Sparkle = ({ filled }: IconProps) =>
  shape('M12 3.2l2.1 6.7 6.7 2.1-6.7 2.1L12 20.8l-2.1-6.7L3.2 12l6.7-2.1L12 3.2Z', filled)

export const Playlist = ({ filled }: IconProps) => (
  <Svg>
    <g {...line}>
      <path d="M9.4 7.5H20" />
      <path d="M9.4 12H20" />
      <path d="M9.4 16.5h6.4" />
    </g>
    <g {...(filled ? solid : line)}>
      <circle cx="5.1" cy="7.5" r="1.4" />
      <circle cx="5.1" cy="12" r="1.4" />
      <circle cx="5.1" cy="16.5" r="1.4" />
    </g>
  </Svg>
)

export const Mic = ({ filled }: IconProps) => (
  <Svg>
    <path
      d="M12 3.6a3.2 3.2 0 0 1 3.2 3.2v4.6a3.2 3.2 0 0 1-6.4 0V6.8A3.2 3.2 0 0 1 12 3.6Z"
      {...(filled ? solid : line)}
    />
    <path d="M6.6 11.4a5.4 5.4 0 0 0 10.8 0" {...line} />
    <path d="M12 16.8v3.6" {...line} />
  </Svg>
)

export const Download = ({ filled }: IconProps) => (
  <Svg>
    <g {...line} strokeWidth={filled ? 2.6 : 1.9}>
      <path d="M12 4v10.6" />
      <path d="M7.8 10.4 12 14.6l4.2-4.2" />
      <path d="M5 17.4v1.4a1.6 1.6 0 0 0 1.6 1.6h10.8a1.6 1.6 0 0 0 1.6-1.6v-1.4" />
    </g>
  </Svg>
)
