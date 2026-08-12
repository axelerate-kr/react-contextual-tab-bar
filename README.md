<div align="center">

# react-contextual-tab-bar

**A Toss-style bottom navigation bar for React.**<br />
Tap a tab and the whole bar swaps into that section's own tabs, with a back arrow
where the first tab used to be.

**English** · [한국어](README_ko.md)

[![npm](https://img.shields.io/npm/v/react-contextual-tab-bar?style=flat-square&color=3182f6&label=npm)](https://www.npmjs.com/package/react-contextual-tab-bar)
[![bundle](https://img.shields.io/badge/gzipped-4.5%20kB-3182f6?style=flat-square)](https://bundlejs.com/?q=react-contextual-tab-bar)
[![dependencies](https://img.shields.io/badge/dependencies-0-3182f6?style=flat-square)](package.json)
[![license](https://img.shields.io/badge/license-Apache--2.0-3182f6?style=flat-square)](LICENSE)

<img src="docs/demo.gif" width="380" alt="Tapping Library replaces the five root tabs with that section's own four and puts a back arrow in the first slot; tapping back restores the root row with Library still selected" />

Recorded at real speed — the swap takes about 240 ms end to end.

### [**Open the live demo →**](https://axelerate-kr.github.io/react-contextual-tab-bar/)

</div>

## Why this exists

Every animated tab-bar library moves the *indicator* inside a fixed set of tabs. None of them
change which tabs exist.

| | what animates | swaps which tabs exist |
| --- | --- | :---: |
| [`react-native-animated-nav-tab-bar`](https://github.com/torgeadelin/react-native-animated-nav-tab-bar) | the selected pill | — |
| [`rn-wave-bottom-bar`](https://github.com/darkhorse-coder/rn-wave-bottom-bar) | a wave behind the selection | — |
| [`morph-bottom-navigation`](https://github.com/tommybuonomo/morph-bottom-navigation) | a morph over the selected item | — |
| [React Navigation `bottom-tabs`](https://reactnavigation.org/docs/bottom-tab-navigator/) | the screen (`fade` / `shift`) | — |
| Material 3 `BottomNavigation` | the indicator | — |
| **`react-contextual-tab-bar`** | **the whole row** | **yes** |

The pattern where entering a section replaces the whole row with that section's own tabs — and puts
a back arrow where the first tab used to be — isn't in Material 3, isn't in the iOS HIG, and isn't
in any tab-bar package I could find. It comes from the [Toss](https://toss.im) app, whose design
system isn't open source. This is an independent implementation of that pattern for the web.

## Quick start

```sh
npm i react-contextual-tab-bar
```

Giving a tab an `items` array is the whole opt-in: tapping it pushes a level instead of selecting it.

```tsx
import { ContextualTabBar } from 'react-contextual-tab-bar'
import 'react-contextual-tab-bar/styles.css'

const items = [
  { id: 'home',  label: 'Home',  icon: <Home />, activeIcon: <Home filled /> },
  { id: 'radio', label: 'Radio', icon: <Broadcast /> },
  {
    id: 'library',
    label: 'Library',
    icon: <Grid />,
    activeIcon: <Grid filled />,
    items: [
      { id: 'library.home',    label: 'Library', icon: <Grid /> },
      { id: 'library.songs',   label: 'Songs',   icon: <Playlist /> },
      { id: 'library.artists', label: 'Artists', icon: <Mic /> },
      { id: 'library.offline', label: 'Offline', icon: <Download />, badge: 3 },
    ],
  },
  { id: 'profile', label: 'Profile', icon: <Person /> },
]

export function App() {
  const [value, setValue] = useState('home')

  return (
    <ContextualTabBar
      items={items}
      value={value}
      onChange={(id) => setValue(id)}
      onEnterSub={(id) => router.push(`/${id}`)}
      onBack={() => router.back()}
    />
  )
}
```

`value` / `onChange` and `path` / `onPathChange` are both optional — omit them and the component
keeps the state itself (`defaultValue`, `defaultPath`). Control `path` when the level should come
from your router.

`onChange` fires for every active-tab change and tells you why:

| `meta.reason` | when |
| --- | --- |
| `'select'` | an ordinary tab was tapped |
| `'enter'` | a tab with `items` was tapped; the first child became active |
| `'back'` | the level was left; the parent tab became active again |

## How the swap works

<img src="docs/transition.png" width="360" alt="Six frames of the swap: the back chip and first item fade in over the dimming previous row" />

The two rows are laid out **independently and cross-faded**, rather than moved as shared elements.
The outgoing row keeps its own positions while it fades and scales to `0.94`; the incoming row fades
in at its new positions, each item delayed by `stagger` from the leading edge — so for a moment two
different rows are visible at two different layouts. That overlap is the effect.

| prop | default | what it controls |
| --- | --- | --- |
| `duration` | `190` | how long one icon takes to appear (ms) |
| `stagger` | `24` | the gap between icons appearing, one after another (ms) |
| `exitDuration` | `140` | how long the previous icons take to disappear (ms) |

Total ≈ `stagger × (items − 1) + duration`. Direction matters: going deeper staggers left → right,
going back staggers right → left, so the motion follows the gesture.

`prefers-reduced-motion: reduce` collapses the whole thing to a plain fade with no stagger.

## API

| prop | type | default | |
| --- | --- | --- | --- |
| `items` | `TabItem[]` | — | root level tabs |
| `value` | `string` | — | active tab id (controlled) |
| `defaultValue` | `string` | first root tab | active tab id (uncontrolled) |
| `onChange` | `(id, meta) => void` | — | fires on every active-tab change |
| `path` | `string[]` | — | entered ancestor ids (controlled); `[]` is the root |
| `defaultPath` | `string[]` | `[]` | entered ancestor ids (uncontrolled) |
| `onPathChange` | `(path) => void` | — | level changed |
| `onEnterSub` | `(id, item) => void` | — | a tab with `items` was tapped |
| `onBack` | `(id, path) => void` | — | a level was left |
| `variant` | `'floating' \| 'docked'` | `'floating'` | inset and rounded, or full width |
| `theme` | `'dark' \| 'light' \| 'auto'` | `'auto'` | `auto` follows `prefers-color-scheme` |
| `fixed` | `boolean` | `true` | `position: fixed` at the bottom of the viewport |
| `backIcon` | `ReactNode` | arrow-left | |
| `backLabel` | `string` | `'Back'` | `aria-label` for the back button |
| `duration` `stagger` `exitDuration` | `number` | `190` `24` `140` | see above |
| `className` `style` | | | applied to the outer wrapper |
| `ariaLabel` | `string` | `'Main'` | `aria-label` for the tablist |

### `TabItem`

| field | type | |
| --- | --- | --- |
| `id` | `string` | unique within its own level |
| `label` | `string?` | omit for an icon-only tab |
| `icon` | `ReactNode?` | inactive icon (usually the outline variant) |
| `activeIcon` | `ReactNode?` | active icon; swaps with `icon` over 170 ms |
| `items` | `TabItem[]?` | **the opt-in** — tapping this tab enters a sub level |
| `badge` | `number \| string \| true` | `true` renders a bare dot |
| `disabled` | `boolean?` | |
| `ariaLabel` | `string?` | defaults to `label ?? id` |

Nesting is not limited to one level — a sub-tab can have `items` of its own, and `path` grows
accordingly.

Keep labels short. A tab slot is narrow, so English labels much past 8 characters ellipsize (CJK is
comfortable to about 4).

## Theming

![The root level, a sub level, and the same sub level with theme="light"](docs/states.png)

Every visual is a CSS custom property on `.ctb-root`. Override them anywhere in your cascade:

```css
.ctb-root {
  --ctb-surface: rgba(24, 26, 29, 0.78);   /* bar background (blurred) */
  --ctb-surface-opaque: #191b1e;           /* fallback without backdrop-filter */
  --ctb-border: rgba(255, 255, 255, 0.07);
  --ctb-shadow: 0 6px 24px rgba(0, 0, 0, 0.32);
  --ctb-fg: #f2f4f6;                       /* active icon + label */
  --ctb-fg-muted: #8b95a1;                 /* inactive */
  --ctb-chip: rgba(255, 255, 255, 0.09);   /* back button background */
  --ctb-press: rgba(255, 255, 255, 0.13);  /* press highlight */
  --ctb-accent: #3182f6;                   /* badge + focus ring */
  --ctb-radius: 26px;
  --ctb-height: 60px;
  --ctb-inset: 12px;                       /* floating side margin */
  --ctb-icon-size: 24px;
  --ctb-ease-enter: cubic-bezier(0.22, 1, 0.36, 1);
  --ctb-ease-exit: cubic-bezier(0.4, 0, 1, 1);
}
```

The bar uses `backdrop-filter` with an opaque `@supports` fallback, and adds
`env(safe-area-inset-bottom)` so it clears the iOS home indicator.

## Accessibility

- The visible row is a `role="tablist"`; the buttons inside are `role="tab"` with `aria-selected`.
  The leaving row is `aria-hidden` and untabbable while it fades.
- Roving tabindex: <kbd>←</kbd> <kbd>→</kbd> <kbd>Home</kbd> <kbd>End</kbd> move focus,
  <kbd>Enter</kbd> / <kbd>Space</kbd> activate, <kbd>Esc</kbd> leaves a level.
- The back affordance is a plain button, not a tab, and carries `aria-label`.
- Entering a level announces the section name through a polite live region.
- `prefers-reduced-motion` is honoured.

## Also known as

If you arrived here searching for any of these, this is the component you wanted:

**English** — Toss-style bottom navigation bar · Toss tab bar · contextual bottom navigation ·
nested bottom tabs · sub-tabs inside a tab bar · morphing tab bar · animated bottom navigation ·
bottom bar that swaps its tabs · drill-down tab bar · React bottom nav with back button

**한국어** — 토스 스타일 하단 네비게이션 바 · 토스 네비게이션바 · 토스 하단바 · 토스처럼 탭 누르면
바뀌는 네비게이션 바 · 하단 네비게이션 전환 애니메이션 · 바텀 네비게이션 · 서브 탭바 ·
리액트 하단바 · 뒤로가기 버튼 있는 하단 네비게이션

## Development

```sh
npm install
npm run dev        # demo at localhost:5173
npm run typecheck
npm run build      # demo → dist-demo
npm run build:lib  # package → dist
```

## License

Apache License 2.0 — see [LICENSE](LICENSE) and [NOTICE](NOTICE).

The interaction pattern was popularised by the Toss app. This implementation is independent, written
from observed behaviour, and contains no code or design assets from that application; it is not
affiliated with or endorsed by its publisher. "Toss" appears in this project's documentation and
package metadata only to describe the pattern, so that people looking for it can find this
component.
