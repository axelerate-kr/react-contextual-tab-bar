import { useMemo, useState } from 'react'
import { ContextualTabBar, type ChangeMeta, type TabItem } from '../src'
import {
  All,
  Benefit,
  Discover,
  Feed,
  Heart,
  Home,
  Shop,
  Stock,
  Tag,
  Truck,
} from './icons'

type Lang = 'ko' | 'en'

const L: Record<string, Record<Lang, string>> = {
  home: { ko: '홈', en: 'Home' },
  benefit: { ko: '혜택', en: 'Benefits' },
  shop: { ko: '쇼핑', en: 'Shop' },
  stock: { ko: '증권', en: 'Stocks' },
  all: { ko: '전체', en: 'More' },
  'stock.home': { ko: '증권', en: 'Stocks' },
  'stock.watch': { ko: '관심', en: 'Watchlist' },
  'stock.discover': { ko: '발견', en: 'Discover' },
  'stock.feed': { ko: '피드', en: 'Feed' },
  'shop.home': { ko: '쇼핑', en: 'Shop' },
  'shop.deal': { ko: '특가', en: 'Deals' },
  'shop.order': { ko: '주문', en: 'Orders' },
}

function buildItems(lang: Lang): TabItem[] {
  const t = (key: string) => L[key][lang]
  return [
    { id: 'home', label: t('home'), icon: <Home />, activeIcon: <Home filled /> },
    {
      id: 'benefit',
      label: t('benefit'),
      icon: <Benefit />,
      activeIcon: <Benefit filled />,
      badge: true,
    },
    {
      id: 'shop',
      label: t('shop'),
      icon: <Shop />,
      activeIcon: <Shop filled />,
      items: [
        { id: 'shop.home', label: t('shop.home'), icon: <Shop />, activeIcon: <Shop filled /> },
        { id: 'shop.deal', label: t('shop.deal'), icon: <Tag />, activeIcon: <Tag filled /> },
        {
          id: 'shop.order',
          label: t('shop.order'),
          icon: <Truck />,
          activeIcon: <Truck filled />,
          badge: 2,
        },
      ],
    },
    {
      id: 'stock',
      label: t('stock'),
      icon: <Stock />,
      activeIcon: <Stock filled />,
      items: [
        { id: 'stock.home', label: t('stock.home'), icon: <Stock />, activeIcon: <Stock filled /> },
        {
          id: 'stock.watch',
          label: t('stock.watch'),
          icon: <Heart />,
          activeIcon: <Heart filled />,
        },
        {
          id: 'stock.discover',
          label: t('stock.discover'),
          icon: <Discover />,
          activeIcon: <Discover filled />,
        },
        { id: 'stock.feed', label: t('stock.feed'), icon: <Feed />, activeIcon: <Feed filled /> },
      ],
    },
    { id: 'all', label: t('all'), icon: <All />, activeIcon: <All filled /> },
  ]
}

const SCREENS: Record<string, { title: Record<Lang, string>; rows: [string, string][] }> = {
  home: {
    title: { ko: '내 자산', en: 'My assets' },
    rows: [
      ['토스뱅크 통장', '2,481,300원'],
      ['적립 포인트', '12,905원'],
      ['내 신용점수', '891점'],
      ['대출 한도', '조회하기'],
    ],
  },
  benefit: {
    title: { ko: '오늘의 혜택', en: "Today's benefits" },
    rows: [
      ['만보기', '+40원'],
      ['행운 퀴즈', '참여하기'],
      ['친구 초대', '최대 30,000원'],
    ],
  },
  'shop.home': {
    title: { ko: '쇼핑 홈', en: 'Shop home' },
    rows: [
      ['오늘의 특가', '최대 62%'],
      ['무료배송관', '3,912개'],
      ['최근 본 상품', '12개'],
    ],
  },
  'shop.deal': {
    title: { ko: '특가', en: 'Deals' },
    rows: [
      ['타임딜', '02:41:08 남음'],
      ['1+1 기획전', '보러가기'],
    ],
  },
  'shop.order': {
    title: { ko: '주문 내역', en: 'Orders' },
    rows: [
      ['배송중', '2건'],
      ['배송완료', '17건'],
    ],
  },
  'stock.home': {
    title: { ko: '내 투자', en: 'My investments' },
    rows: [
      ['스페이스X', '-3.4%'],
      ['NVD', '-5.8%'],
      ['알파벳 A', '+6.7%'],
      ['마이크로소프트', '+3.0%'],
    ],
  },
  'stock.watch': {
    title: { ko: '관심 종목', en: 'Watchlist' },
    rows: [
      ['테슬라', '+1.2%'],
      ['애플', '-0.4%'],
    ],
  },
  'stock.discover': {
    title: { ko: '발견', en: 'Discover' },
    rows: [
      ['거래량 급등', '실시간'],
      ['많이 본 종목', 'TOP 100'],
    ],
  },
  'stock.feed': {
    title: { ko: '피드', en: 'Feed' },
    rows: [
      ['오늘의 시장', '3분 전'],
      ['실적 발표 캘린더', '이번 주'],
    ],
  },
  all: {
    title: { ko: '전체', en: 'More' },
    rows: [
      ['내 자산', '계좌 · 대출 · 증권'],
      ['대출 받기', '신용 · 주택'],
      ['모바일 요금제', 'KT · SKT · U+'],
    ],
  },
}

interface LogEntry {
  id: number
  text: string
}

export default function App() {
  const [lang, setLang] = useState<Lang>('ko')
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
          layouts while the incoming icons stagger in from the leading edge — the pattern{' '}
          <a href="https://toss.im" target="_blank" rel="noreferrer">
            Toss
          </a>{' '}
          uses, which no existing tab-bar library ships.
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
          Tap <strong>{L.stock[lang]}</strong> or <strong>{L.shop[lang]}</strong> in the phone —
          those two have sub-levels.
        </p>
      </header>

      <main className="stage">
        <div className="phone" data-dark={dark || undefined}>
          <div className="notch" />
          <div className="screen">
            <div className="content">
              <h2>{screen.title[lang]}</h2>
              {screen.rows.map(([label, meta]) => (
                <div className="row" key={label}>
                  <span>{label}</span>
                  <span className="meta">{meta}</span>
                </div>
              ))}
              {screen.rows.map(([label], index) => (
                <div className="row skeleton" key={`${label}-skeleton-${index}`}>
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
              options={['ko', 'en']}
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
        MIT · pattern observed in the Toss app, implementation independent ·{' '}
        <a
          href="https://github.com/axelerate-kr/react-contextual-tab-bar"
          target="_blank"
          rel="noreferrer"
        >
          source
        </a>
      </footer>
    </div>
  )
}

const USAGE = `import { ContextualTabBar } from 'react-contextual-tab-bar'
import 'react-contextual-tab-bar/styles.css'

const items = [
  { id: 'home',    label: 'Home',     icon: <Home />,    activeIcon: <Home filled /> },
  { id: 'benefit', label: 'Benefits', icon: <Gift />,    badge: true },
  { id: 'stock',   label: 'Stocks',   icon: <Chart />,
    // giving a tab \`items\` is what makes the bar swap
    items: [
      { id: 'stock.home',     label: 'Stocks',    icon: <Chart /> },
      { id: 'stock.watch',    label: 'Watchlist', icon: <Heart /> },
      { id: 'stock.discover', label: 'Discover',  icon: <Planet /> },
      { id: 'stock.feed',     label: 'Feed',      icon: <Chat /> },
    ] },
  { id: 'more',    label: 'More',     icon: <Menu /> },
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
