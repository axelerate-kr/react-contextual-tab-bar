import type { ReactNode } from 'react'

/** A single tab. Give it `items` to make tapping it swap the bar into that sub-set. */
export interface TabItem {
  /** Unique within its own level. */
  id: string
  /** Text under the icon. Omit for an icon-only tab. */
  label?: string
  /** Icon shown when the tab is not active (usually the outline variant). */
  icon?: ReactNode
  /** Icon shown when the tab is active (usually the filled variant). Cross-fades with `icon`. */
  activeIcon?: ReactNode
  /**
   * Sub-level tabs. When present, tapping this tab does not select it —
   * it pushes a new level and the bar's items animate into `items`,
   * with a back affordance prepended. The first child becomes active.
   */
  items?: TabItem[]
  /** Small count/dot rendered on the icon. `true` renders a bare dot. */
  badge?: number | string | boolean
  disabled?: boolean
  /** Overrides `aria-label`. Defaults to `label ?? id`. */
  ariaLabel?: string
}

export interface ChangeMeta {
  item: TabItem
  /** Ids of the ancestors currently entered. `[]` at the root level. */
  path: string[]
  /** What caused the change. */
  reason: 'select' | 'enter' | 'back'
}

export interface ContextualTabBarProps {
  /** Root level tabs. */
  items: TabItem[]

  /** Active tab id (controlled). */
  value?: string
  /** Active tab id on first render (uncontrolled). Defaults to the first root tab. */
  defaultValue?: string
  /** Fires for every active-tab change, including the implicit ones from entering/leaving a level. */
  onChange?: (id: string, meta: ChangeMeta) => void

  /** Entered ancestor ids (controlled). `[]` is the root level. */
  path?: string[]
  /** Entered ancestor ids on first render (uncontrolled). */
  defaultPath?: string[]
  onPathChange?: (path: string[]) => void

  /** Fires when a tab with `items` is tapped, just before the bar swaps. */
  onEnterSub?: (id: string, item: TabItem) => void
  /** Fires when the back affordance (or Escape) leaves a level. */
  onBack?: (id: string, path: string[]) => void

  /** `floating` (default) sits above the content with side margins. `docked` spans the full width. */
  variant?: 'floating' | 'docked'
  /** `auto` (default) follows `prefers-color-scheme`. */
  theme?: 'dark' | 'light' | 'auto'
  /** Renders `position: fixed` at the bottom of the viewport. Default `true`. */
  fixed?: boolean

  /** Icon for the back affordance. Defaults to a chevron-left. */
  backIcon?: ReactNode
  /** `aria-label` for the back affordance. Default `'Back'`. */
  backLabel?: string

  /** Enter animation per item, in ms. Default `190`. */
  duration?: number
  /** Delay added per item, left to right, in ms. Default `24`. */
  stagger?: number
  /** Exit animation of the outgoing row, in ms. Default `140`. */
  exitDuration?: number

  className?: string
  style?: React.CSSProperties
  /** `aria-label` for the tablist. Default `'Main'`. */
  ariaLabel?: string
}
