import { useMemo, useState } from 'react'
import { ContextualTabBar, type ChangeMeta, type TabItem } from '../src'
import {
  Broadcast,
  Chart,
  Compass,
  Download,
  Grid,
  Home,
  Mic,
  Person,
  Playlist,
  Sparkle,
  Tag,
} from './icons'

type Lang = 'ko' | 'en'

const L: Record<string, Record<Lang, string>> = {
  home: { ko: '홈', en: 'Home' },
  browse: { ko: '탐색', en: 'Browse' },
  radio: { ko: '라디오', en: 'Radio' },
  library: { ko: '보관함', en: 'Library' },
  profile: { ko: '프로필', en: 'Profile' },
  'browse.home': { ko: '탐색', en: 'Browse' },
  'browse.charts': { ko: '차트', en: 'Charts' },
  'browse.genres': { ko: '장르', en: 'Genres' },
  'browse.new': { ko: '최신', en: 'New' },
  'library.home': { ko: '보관함', en: 'Library' },
  'library.songs': { ko: '곡', en: 'Songs' },
  'library.artists': { ko: '아티스트', en: 'Artists' },
  'library.offline': { ko: '오프라인', en: 'Offline' },
}

function buildItems(lang: Lang): TabItem[] {
  const t = (key: string) => L[key][lang]
  return [
    { id: 'home', label: t('home'), icon: <Home />, activeIcon: <Home filled /> },
    {
      id: 'browse',
      label: t('browse'),
      icon: <Compass />,
      activeIcon: <Compass filled />,
      items: [
        {
          id: 'browse.home',
          label: t('browse.home'),
          icon: <Compass />,
          activeIcon: <Compass filled />,
        },
        {
          id: 'browse.charts',
          label: t('browse.charts'),
          icon: <Chart />,
          activeIcon: <Chart filled />,
        },
        { id: 'browse.genres', label: t('browse.genres'), icon: <Tag />, activeIcon: <Tag filled /> },
        {
          id: 'browse.new',
          label: t('browse.new'),
          icon: <Sparkle />,
          activeIcon: <Sparkle filled />,
          badge: true,
        },
      ],
    },
    { id: 'radio', label: t('radio'), icon: <Broadcast />, activeIcon: <Broadcast filled /> },
    {
      id: 'library',
      label: t('library'),
      icon: <Grid />,
      activeIcon: <Grid filled />,
      items: [
        { id: 'library.home', label: t('library.home'), icon: <Grid />, activeIcon: <Grid filled /> },
        {
          id: 'library.songs',
          label: t('library.songs'),
          icon: <Playlist />,
          activeIcon: <Playlist filled />,
        },
        {
          id: 'library.artists',
          label: t('library.artists'),
          icon: <Mic />,
          activeIcon: <Mic filled />,
        },
        {
          id: 'library.offline',
          label: t('library.offline'),
          icon: <Download />,
          activeIcon: <Download filled />,
          badge: 3,
        },
      ],
    },
    { id: 'profile', label: t('profile'), icon: <Person />, activeIcon: <Person filled /> },
  ]
}

type Row = [string, string]

interface Screen {
  title: Record<Lang, string>
  rows: Record<Lang, Row[]>
}

const SCREENS: Record<string, Screen> = {
  home: {
    title: { ko: '최근 재생', en: 'Recently played' },
    rows: {
      ko: [
        ['Midnight Drive', '앨범'],
        ['Slow Static', '재생목록'],
        ['Paper Lanterns', '싱글'],
        ['Nightjar', '앨범'],
      ],
      en: [
        ['Midnight Drive', 'Album'],
        ['Slow Static', 'Playlist'],
        ['Paper Lanterns', 'Single'],
        ['Nightjar', 'Album'],
      ],
    },
  },
  'browse.home': {
    title: { ko: '탐색', en: 'Browse' },
    rows: {
      ko: [
        ['새 앨범', '24개'],
        ['맞춤 추천', '6개'],
        ['라이브 세션', '12개'],
      ],
      en: [
        ['New releases', '24'],
        ['Made for you', '6'],
        ['Live sessions', '12'],
      ],
    },
  },
  'browse.charts': {
    title: { ko: '인기 차트', en: 'Top charts' },
    rows: {
      ko: [
        ['1   Undertow', '+4'],
        ['2   Paper Lanterns', '−1'],
        ['3   Nightjar', '+12'],
      ],
      en: [
        ['1   Undertow', '+4'],
        ['2   Paper Lanterns', '−1'],
        ['3   Nightjar', '+12'],
      ],
    },
  },
  'browse.genres': {
    title: { ko: '장르', en: 'Genres' },
    rows: {
      ko: [
        ['앰비언트', '312개'],
        ['포스트록', '188개'],
        ['재즈', '940개'],
      ],
      en: [
        ['Ambient', '312'],
        ['Post-rock', '188'],
        ['Jazz', '940'],
      ],
    },
  },
  'browse.new': {
    title: { ko: '이번 주 신곡', en: 'New this week' },
    rows: {
      ko: [
        ['Glasshouse', '금요일'],
        ['Tidal Bloom', '수요일'],
      ],
      en: [
        ['Glasshouse', 'Friday'],
        ['Tidal Bloom', 'Wednesday'],
      ],
    },
  },
  radio: {
    title: { ko: '라디오', en: 'Radio' },
    rows: {
      ko: [
        ['앰비언트 스테이션', '재생 중'],
        ['드라이브 믹스', '추천'],
        ['집중 모드', '새로움'],
      ],
      en: [
        ['Ambient station', 'Playing'],
        ['Drive mix', 'Suggested'],
        ['Focus mode', 'New'],
      ],
    },
  },
  'library.home': {
    title: { ko: '보관함', en: 'Your library' },
    rows: {
      ko: [
        ['재생목록', '24개'],
        ['앨범', '61개'],
        ['아티스트', '138명'],
      ],
      en: [
        ['Playlists', '24'],
        ['Albums', '61'],
        ['Artists', '138'],
      ],
    },
  },
  'library.songs': {
    title: { ko: '내 재생목록', en: 'Your playlists' },
    rows: {
      ko: [
        ['늦은 밤 운전', '42곡'],
        ['비 오는 창가', '18곡'],
        ['집중', '67곡'],
      ],
      en: [
        ['Late night drive', '42 tracks'],
        ['Rain on glass', '18 tracks'],
        ['Deep focus', '67 tracks'],
      ],
    },
  },
  'library.artists': {
    title: { ko: '아티스트', en: 'Artists' },
    rows: {
      ko: [
        ['Halcyon Field', '팔로잉'],
        ['Coastal Signals', '팔로잉'],
        ['Wren & Ash', '팔로잉'],
      ],
      en: [
        ['Halcyon Field', 'Following'],
        ['Coastal Signals', 'Following'],
        ['Wren & Ash', 'Following'],
      ],
    },
  },
  'library.offline': {
    title: { ko: '오프라인 저장', en: 'Saved offline' },
    rows: {
      ko: [
        ['Midnight Drive', '완료'],
        ['Nightjar', '완료'],
        ['Tidal Bloom', '받는 중'],
      ],
      en: [
        ['Midnight Drive', 'Done'],
        ['Nightjar', 'Done'],
        ['Tidal Bloom', 'Downloading'],
      ],
    },
  },
  profile: {
    title: { ko: '프로필', en: 'Profile' },
    rows: {
      ko: [
        ['음질', '매우 높음'],
        ['Wi-Fi에서만 다운로드', '켜짐'],
        ['재생 기록', '보기'],
      ],
      en: [
        ['Audio quality', 'Very high'],
        ['Download over Wi-Fi only', 'On'],
        ['Listening history', 'View'],
      ],
    },
  },
}

interface LogEntry {
  id: number
  text: string
}

export default function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [theme, setTheme] = useState<'auto' | 'dark' | 'light'>('dark')
  const [variant, setVariant] = useState<'floating' | 'docked'>('floating')
  const [duration, setDuration] = useState(190)
  const [stagger, setStagger] = useState(24)
  const [exitDuration, setExitDuration] = useState(140)

  const [value, setValue] = useState('home')
  const [path, setPath] = useState<string[]>([])
  const [log, setLog] = useState<LogEntry[]>([])

  const items = useMemo(() => buildItems(lang), [lang])
  const screen = SCREENS[value] ?? SCREENS.home
  const dark = theme === 'dark' || (theme === 'auto' && prefersDark())

  const push = (text: string) =>
    setLog((entries) => [{ id: entries.length, text }, ...entries].slice(0, 7))

  const handleChange = (id: string, meta: ChangeMeta) => {
    setValue(id)
    push(`${meta.reason} → ${id}${meta.path.length ? `  (path: ${meta.path.join('/')})` : ''}`)
  }

  return (
    <div className="page" data-dark={dark || undefined}>
      <header className="hero">
        <p className="eyebrow">React · zero runtime deps · 4.5 kB gzipped (js + css)</p>
        <h1>
          contextual
          <br />
          tab bar
        </h1>
        <p className="lede">
          A bottom tab bar whose items <strong>swap into a sub-set</strong> when you enter a
          section, with a back affordance in the first slot. The two rows cross-fade at their own
          layouts while the incoming icons stagger in from the leading edge. Every animated tab-bar
          library moves the <em>indicator</em> inside a fixed set of tabs — none of them change
          which tabs exist.
        </p>
        <div className="cta">
          <code>npm i react-contextual-tab-bar</code>
          <a
            className="ghost"
            href="https://github.com/axelerate-kr/react-contextual-tab-bar"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
        <p className="hint">
          Tap <strong>{L.browse[lang]}</strong> or <strong>{L.library[lang]}</strong> in the phone —
          those two have sub-levels.
        </p>
      </header>

      <main className="stage">
        <div className="phone" data-dark={dark || undefined}>
          <div className="notch" />
          <div className="screen">
            <div className="content">
              <h2>{screen.title[lang]}</h2>
              {screen.rows[lang].map(([label, meta]) => (
                <div className="row" key={label}>
                  <span>{label}</span>
                  <span className="meta">{meta}</span>
                </div>
              ))}
              {/* Filler rows so the list runs under the bar — that is what makes the
                  bar's backdrop blur visible. */}
              {Array.from({ length: screen.rows[lang].length + 4 }, (_, index) => (
                <div className="row skeleton" key={`skeleton-${index}`}>
                  <span className="bar w-60" />
                  <span className="bar w-20" />
                </div>
              ))}
            </div>
            <div className="bar-slot">
              <ContextualTabBar
                items={items}
                value={value}
                onChange={handleChange}
                path={path}
                onPathChange={setPath}
                onEnterSub={(id) => push(`onEnterSub → ${id}`)}
                onBack={(id) => push(`onBack ← ${id}`)}
                theme={theme}
                variant={variant}
                fixed={false}
                duration={duration}
                stagger={stagger}
                exitDuration={exitDuration}
                backLabel={lang === 'ko' ? '뒤로' : 'Back'}
              />
            </div>
          </div>
        </div>

        <aside className="panel">
          <section>
            <h3>Motion</h3>
            <Slider
              label="duration"
              hint="per-item enter"
              value={duration}
              min={0}
              max={600}
              step={10}
              onChange={setDuration}
            />
            <Slider
              label="stagger"
              hint="delay per item, leading edge first"
              value={stagger}
              min={0}
              max={120}
              step={2}
              onChange={setStagger}
            />
            <Slider
              label="exitDuration"
              hint="outgoing row fade"
              value={exitDuration}
              min={0}
              max={600}
              step={10}
              onChange={setExitDuration}
            />
            <button
              className="reset"
              type="button"
              onClick={() => {
                setDuration(190)
                setStagger(24)
                setExitDuration(140)
              }}
            >
              Reset to defaults (190 / 24 / 140)
            </button>
          </section>

          <section>
            <h3>Appearance</h3>
            <Choice
              label="theme"
              options={['dark', 'light', 'auto']}
              value={theme}
              onChange={(next) => setTheme(next as typeof theme)}
            />
            <Choice
              label="variant"
              options={['floating', 'docked']}
              value={variant}
              onChange={(next) => setVariant(next as typeof variant)}
            />
            <Choice
              label="labels"
              options={['en', 'ko']}
              value={lang}
              onChange={(next) => setLang(next as Lang)}
            />
          </section>

          <section>
            <h3>State</h3>
            <pre className="state">
              {`value: ${JSON.stringify(value)}\npath:  ${JSON.stringify(path)}`}
            </pre>
          </section>

          <section>
            <h3>
              Events
              {log.length ? (
                <button className="clear" type="button" onClick={() => setLog([])}>
                  clear
                </button>
              ) : null}
            </h3>
            <ul className="log">
              {log.length ? (
                log.map((entry) => <li key={entry.id}>{entry.text}</li>)
              ) : (
                <li className="empty">Tap a tab to see onChange fire.</li>
              )}
            </ul>
          </section>
        </aside>
      </main>

      <section className="usage">
        <h3>Usage</h3>
        <pre>{USAGE}</pre>
        <p className="hint">
          Keyboard: <kbd>←</kbd> <kbd>→</kbd> move focus, <kbd>Enter</kbd> selects,{' '}
          <kbd>Esc</kbd> leaves a level. <code>prefers-reduced-motion</code> collapses the
          transition to a plain fade.
        </p>
      </section>

      <footer>
        MIT ·{' '}
        <a
          href="https://github.com/axelerate-kr/react-contextual-tab-bar"
          target="_blank"
          rel="noreferrer"
        >
          source
        </a>{' '}
        · the interaction pattern is one the{' '}
        <a href="https://toss.im" target="_blank" rel="noreferrer">
          Toss
        </a>{' '}
        app popularised; this implementation is independent and unaffiliated
      </footer>
    </div>
  )
}

const USAGE = `import { ContextualTabBar } from 'react-contextual-tab-bar'
import 'react-contextual-tab-bar/styles.css'

const items = [
  { id: 'home',  label: 'Home',  icon: <Home />,    activeIcon: <Home filled /> },
  { id: 'radio', label: 'Radio', icon: <Broadcast /> },
  { id: 'library', label: 'Library', icon: <Grid />,
    // giving a tab \`items\` is what makes the bar swap
    items: [
      { id: 'library.home',    label: 'Library', icon: <Grid /> },
      { id: 'library.songs',   label: 'Songs',   icon: <Playlist /> },
      { id: 'library.artists', label: 'Artists', icon: <Mic /> },
      { id: 'library.offline', label: 'Offline', icon: <Download />, badge: 3 },
    ] },
  { id: 'profile', label: 'Profile', icon: <Person /> },
]

<ContextualTabBar
  items={items}
  value={value}
  onChange={(id, { reason, path }) => setValue(id)}
  onEnterSub={(id) => router.push(\`/\${id}\`)}
  onBack={() => router.back()}
/>`

function Slider({
  label,
  hint,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  hint: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}) {
  return (
    <label className="slider">
      <span className="slider-head">
        <code>{label}</code>
        <output>{value}ms</output>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <span className="slider-hint">{hint}</span>
    </label>
  )
}

function Choice({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="choice">
      <code>{label}</code>
      <div className="segmented" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            data-on={option === value || undefined}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function prefersDark() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}
