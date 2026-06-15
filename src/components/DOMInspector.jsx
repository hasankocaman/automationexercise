import { useState, useEffect, useCallback, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

const STYLES = `
@keyframes di-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(124,58,237,0.6); }
  60%  { box-shadow: 0 0 0 12px rgba(124,58,237,0); }
  100% { box-shadow: 0 0 0 0 rgba(124,58,237,0); }
}
@keyframes di-panel-in {
  from { opacity:0; transform: scale(0.93) translateY(6px); }
  to   { opacity:1; transform: scale(1)    translateY(0); }
}
@keyframes di-row-in {
  from { opacity:0; transform: translateX(-10px); }
  to   { opacity:1; transform: translateX(0); }
}
@keyframes di-badge-flash {
  0%,100% { opacity:1; }
  50%      { opacity:0.3; }
}
.di-highlight {
  outline: 2.5px solid #7c3aed !important;
  outline-offset: 3px !important;
  animation: di-pulse 0.7s ease-out !important;
  border-radius: 3px !important;
}
.di-panel { animation: di-panel-in 0.18s cubic-bezier(.2,.8,.4,1) both; }
.di-row   { animation: di-row-in 0.22s ease both; }
.di-flash { animation: di-badge-flash 0.8s ease infinite; }
`

const LOCATOR_TIPS = {
  testId: {
    tr: 'En stabil seçenek — CSS veya DOM yapısından etkilenmez',
    en: 'Most stable — unaffected by CSS or DOM structure changes',
  },
  id: {
    tr: 'Hızlı ve benzersiz — dinamik ID\'lere dikkat',
    en: 'Fast and unique — watch out for dynamic IDs',
  },
  name: {
    tr: 'Form elementleri için ideal',
    en: 'Ideal for form elements',
  },
  text: {
    tr: 'Görünür metin — UI değişirse kırılabilir',
    en: 'Visible text — may break if UI wording changes',
  },
  role: {
    tr: 'Erişilebilirlik tabanlı — semantik ve sağlam',
    en: 'Accessibility-based — semantic and robust',
  },
  css: {
    tr: 'CSS class\'ı — stil değişikliklerinde kırılabilir',
    en: 'CSS class — may break on style changes',
  },
  tag: {
    tr: 'Son çare — çok genel, belirsiz',
    en: 'Last resort — too generic, ambiguous',
  },
}

function buildLocators(el) {
  const id       = el.id
  const testId   = el.getAttribute('data-testid')
  const name     = el.getAttribute('name')
  const tag      = el.tagName.toLowerCase()
  const type     = el.getAttribute('type')
  const text     = el.textContent?.trim().replace(/\s+/g,' ').slice(0, 35)
  const classes  = [...el.classList].filter(c =>
    !/^(w-|h-|p-|m-|text-|bg-|border-|flex|grid|block|inline|focus|hover|rounded|cursor|disabled|dark|md:|sm:|lg:|xl:|transition|duration|ease|opacity|z-|top-|left-|right-|bottom-|gap-|space-|min-|max-|overflow|absolute|relative|fixed|sticky|hidden|visible|scale-|transform|pointer|select-|shrink|grow|basis|items-|justify-|content-|self-|font-|leading-|tracking-|whitespace|break-|truncate|underline|italic|not-italic|antialiased|sr-only|motion-)/.test(c)
  )

  const selenium = []
  const playwright = []

  if (testId) {
    selenium.push({ code: `By.cssSelector("[data-testid='${testId}']")`, tip: 'testId' })
    playwright.push({ code: `page.getByTestId("${testId}")`, tip: 'testId' })
  }
  if (id) {
    selenium.push({ code: `By.id("${id}")`, tip: 'id' })
    playwright.push({ code: `page.locator("#${id}")`, tip: 'id' })
  }
  if (name) {
    selenium.push({ code: `By.name("${name}")`, tip: 'name' })
    playwright.push({ code: `page.locator("[name='${name}']")`, tip: 'name' })
  }
  const interactiveTags = ['button','a','label','h1','h2','h3','h4','span','p','li','td','th']
  if (text && interactiveTags.includes(tag)) {
    selenium.push({ code: `By.xpath("//${tag}[normalize-space()='${text}']")`, tip: 'text' })
    playwright.push({ code: `page.getByText("${text}", { exact: true })`, tip: 'text' })
  }
  if (tag === 'button' || type === 'button' || type === 'submit') {
    const label = text || type
    playwright.push({ code: `page.getByRole("button", { name: "${label}" })`, tip: 'role' })
  }
  if (tag === 'input') {
    const roleMap = { checkbox:'checkbox', radio:'radio', text:'textbox', email:'textbox', search:'searchbox' }
    if (roleMap[type]) playwright.push({ code: `page.getByRole("${roleMap[type]}")`, tip: 'role' })
  }
  if (tag === 'select') {
    playwright.push({ code: `page.locator("select")`, tip: 'tag' })
    selenium.push({ code: `By.tagName("select")`, tip: 'tag' })
  }
  if (classes.length > 0) {
    const cls = classes[0]
    selenium.push({ code: `By.className("${cls}")`, tip: 'css' })
    playwright.push({ code: `page.locator(".${cls}")`, tip: 'css' })
  }
  if (selenium.length === 0) {
    selenium.push({ code: `By.tagName("${tag}")`, tip: 'tag' })
    playwright.push({ code: `page.locator("${tag}")`, tip: 'tag' })
  }

  return { selenium: selenium.slice(0,4), playwright: playwright.slice(0,4) }
}

function buildHtmlLine(el) {
  const tag = el.tagName.toLowerCase()
  const attrs = []
  const priority = ['id','data-testid','name','type','class','placeholder','href','value']
  for (const a of priority) {
    const v = el.getAttribute(a)
    if (v) attrs.push(`${a}="${v.length > 28 ? v.slice(0,28)+'…' : v}"`)
    if (attrs.length >= 4) break
  }
  const text = el.textContent?.trim().replace(/\s+/g,' ').slice(0,20)
  const attStr = attrs.length ? ' ' + attrs.join(' ') : ''
  const selfClose = ['input','br','img','hr','meta','link'].includes(tag)
  if (selfClose) return `<${tag}${attStr} />`
  return `<${tag}${attStr}>${text || '…'}</${tag}>`
}

function CopyBtn({ text, dark }) {
  const [ok, setOk] = useState(false)
  return (
    <button
      onMouseDown={e => { e.stopPropagation(); e.preventDefault() }}
      onClick={e => {
        e.stopPropagation()
        navigator.clipboard.writeText(text).then(() => { setOk(true); setTimeout(() => setOk(false), 1400) })
      }}
      className={`ml-1 shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
        ok ? 'bg-green-500 text-white' : dark ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
      }`}
    >
      {ok ? '✓' : '⎘'}
    </button>
  )
}

const TIP_COLORS = {
  testId:  { dot: '#10b981', label: '⭐' },
  id:      { dot: '#6366f1', label: '#' },
  name:    { dot: '#f59e0b', label: 'N' },
  text:    { dot: '#3b82f6', label: 'T' },
  role:    { dot: '#8b5cf6', label: 'R' },
  css:     { dot: '#f97316', label: '.' },
  tag:     { dot: '#6b7280', label: '<>' },
}

export default function DOMInspector({ containerRef, darkMode }) {
  const { language } = useLanguage()
  const [state, setState] = useState(null) // { locators, htmlLine, pos, tab }
  const prevEl = useRef(null)
  const panelRef = useRef(null)
  const styleRef = useRef(null)

  useEffect(() => {
    if (styleRef.current) return
    const s = document.createElement('style')
    s.textContent = STYLES
    document.head.appendChild(s)
    styleRef.current = s
    return () => { s.remove(); styleRef.current = null }
  }, [])

  const clearHighlight = () => {
    if (prevEl.current) {
      prevEl.current.classList.remove('di-highlight')
      prevEl.current = null
    }
  }

  const placePanel = useCallback((rect) => {
    const PW = 330, PH = 320
    const vw = window.innerWidth, vh = window.innerHeight

    // Prefer right of element
    let x = rect.right + 12
    let y = rect.top + window.scrollY - 4

    if (x + PW > vw - 8) {
      // Try left
      x = rect.left - PW - 12
      if (x < 8) {
        // Fall back: below element, centered
        x = Math.max(8, Math.min(rect.left, vw - PW - 8))
        y = rect.bottom + window.scrollY + 8
      }
    }

    // Clamp vertically (use fixed, so subtract scrollY)
    const fixedY = y - window.scrollY
    const clampedY = Math.max(8, Math.min(fixedY, vh - PH - 8))

    return { x: Math.round(x), y: Math.round(clampedY) }
  }, [])

  const handleClick = useCallback((e) => {
    let el = e.target
    while (el && el !== containerRef.current) {
      if (el.id === 'di-panel') return
      const tag = el.tagName?.toLowerCase()
      if (!['svg','path','g','circle','rect','html','body'].includes(tag)) break
      el = el.parentElement
    }
    if (!el || el === containerRef.current) return
    if (el.closest('#di-panel')) return

    clearHighlight()
    el.classList.remove('di-highlight')
    void el.offsetWidth
    el.classList.add('di-highlight')
    prevEl.current = el

    const rect = el.getBoundingClientRect()
    const pos = placePanel(rect)
    const locators = buildLocators(el)
    const htmlLine = buildHtmlLine(el)

    setState({ locators, htmlLine, pos, tab: 'playwright' })
  }, [containerRef, placePanel])

  useEffect(() => {
    const c = containerRef?.current
    if (!c) return
    c.addEventListener('click', handleClick, true)
    return () => c.removeEventListener('click', handleClick, true)
  }, [containerRef, handleClick])

  // Close on Escape or click outside
  useEffect(() => {
    if (!state) return
    const onKey = (e) => { if (e.key === 'Escape') { clearHighlight(); setState(null) } }
    const onOut = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        if (!containerRef.current?.contains(e.target)) {
          clearHighlight(); setState(null)
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onOut)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onOut)
    }
  }, [state, containerRef])

  // Hint strip when idle
  if (!state) {
    return (
      <div className={`mt-3 flex items-center gap-2 px-3 py-2 rounded-lg text-xs border border-dashed ${
        darkMode ? 'border-purple-800 text-purple-400 bg-purple-950/20' : 'border-purple-200 text-purple-500 bg-purple-50'
      }`}>
        <span className="text-base">🔍</span>
        <span>
          {language === 'tr'
            ? 'Herhangi bir elemente tıkla → Selenium & Playwright locator önerileri hemen yanında açılır'
            : 'Click any element → Selenium & Playwright locator suggestions pop up right next to it'}
        </span>
      </div>
    )
  }

  const { locators, htmlLine, pos, tab } = state
  const rows = tab === 'selenium' ? locators.selenium : locators.playwright
  const bg   = darkMode ? '#111827' : '#ffffff'
  const bdr  = darkMode ? '#4c1d95' : '#ddd6fe'
  const txt  = darkMode ? '#e5e7eb' : '#111827'

  return (
    <div
      id="di-panel"
      ref={panelRef}
      className="di-panel"
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: 328,
        zIndex: 9999,
        background: bg,
        border: `1.5px solid ${bdr}`,
        borderRadius: 14,
        boxShadow: darkMode
          ? '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.3)'
          : '0 16px 48px rgba(124,58,237,0.18), 0 2px 8px rgba(0,0,0,0.08)',
        color: txt,
        fontFamily: 'sans-serif',
        fontSize: 13,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        background: darkMode ? 'linear-gradient(135deg,#3b0764,#1e1b4b)' : 'linear-gradient(135deg,#7c3aed,#4f46e5)',
        padding: '9px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 12, display:'flex', alignItems:'center', gap:6 }}>
          <span style={{ fontSize: 15 }}>🔍</span> DOM Inspector
        </span>
        <button
          onClick={() => { clearHighlight(); setState(null) }}
          style={{ color:'rgba(255,255,255,0.7)', background:'none', border:'none', cursor:'pointer', fontSize:18, lineHeight:1, padding:'0 2px' }}
        >×</button>
      </div>

      {/* HTML preview */}
      <div style={{ padding: '8px 12px 6px', borderBottom: `1px solid ${darkMode ? '#1f2937' : '#f3f4f6'}` }}>
        <div style={{ fontSize:10, color: darkMode ? '#6b7280' : '#9ca3af', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:4 }}>
          {language === 'tr' ? 'Tıklanan Element' : 'Clicked Element'}
        </div>
        <code style={{
          display: 'block',
          background: darkMode ? '#0f172a' : '#f8fafc',
          color: darkMode ? '#86efac' : '#065f46',
          borderRadius: 6,
          padding: '5px 8px',
          fontSize: 11,
          fontFamily: 'JetBrains Mono, monospace',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {htmlLine}
        </code>
      </div>

      {/* Tab bar */}
      <div style={{ display:'flex', borderBottom:`1px solid ${darkMode ? '#1f2937' : '#f3f4f6'}` }}>
        {[
          { key: 'playwright', icon: '🎭', label: 'Playwright' },
          { key: 'selenium',   icon: '🧪', label: 'Selenium (Java)' },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setState(s => ({ ...s, tab: t.key }))}
            style={{
              flex: 1,
              padding: '7px 4px',
              border: 'none',
              background: tab === t.key ? (darkMode ? '#1e1b4b' : '#f5f3ff') : 'transparent',
              color: tab === t.key ? '#7c3aed' : (darkMode ? '#6b7280' : '#9ca3af'),
              fontWeight: tab === t.key ? 700 : 400,
              fontSize: 11,
              cursor: 'pointer',
              borderBottom: tab === t.key ? '2px solid #7c3aed' : '2px solid transparent',
              transition: 'all 0.15s',
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Locator list */}
      <div style={{ padding: '8px 10px 10px' }}>
        <div style={{ fontSize:10, color: darkMode ? '#6b7280' : '#9ca3af', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:6 }}>
          {language === 'tr' ? 'Önerilen Locator\'lar' : 'Suggested Locators'}
          <span style={{ fontWeight:400, marginLeft:4, textTransform:'none', letterSpacing:0 }}>
            {language === 'tr' ? '(iyiden kötüye)' : '(best → fallback)'}
          </span>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
          {rows.map((loc, i) => {
            const tipKey = loc.tip
            const tipColor = TIP_COLORS[tipKey] || TIP_COLORS.tag
            const tipText = LOCATOR_TIPS[tipKey]?.[language === 'tr' ? 'tr' : 'en'] || ''
            const isBest = i === 0
            return (
              <div
                key={i}
                className="di-row"
                style={{
                  animationDelay: `${i * 70}ms`,
                  background: isBest
                    ? (darkMode ? 'rgba(124,58,237,0.15)' : '#faf5ff')
                    : (darkMode ? 'rgba(255,255,255,0.03)' : '#f9fafb'),
                  border: isBest
                    ? `1px solid ${darkMode ? 'rgba(124,58,237,0.4)' : '#ddd6fe'}`
                    : `1px solid ${darkMode ? '#1f2937' : '#f3f4f6'}`,
                  borderRadius: 8,
                  padding: '6px 8px',
                }}
              >
                {/* Top row: badge + code + copy */}
                <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <span
                    className={isBest ? 'di-flash' : ''}
                    style={{
                      display:'inline-flex',
                      alignItems:'center',
                      justifyContent:'center',
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      background: isBest ? '#7c3aed' : tipColor.dot,
                      color: '#fff',
                      fontSize: 8,
                      fontWeight: 900,
                      flexShrink: 0,
                    }}
                  >
                    {isBest ? '★' : tipColor.label}
                  </span>
                  <code style={{
                    flex: 1,
                    fontSize: 10.5,
                    fontFamily: 'JetBrains Mono, monospace',
                    color: darkMode ? (isBest ? '#c4b5fd' : '#d1d5db') : (isBest ? '#5b21b6' : '#374151'),
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    minWidth: 0,
                  }}>
                    {loc.code}
                  </code>
                  <CopyBtn text={loc.code} dark={darkMode} />
                </div>

                {/* Tip */}
                {tipText && (
                  <div style={{
                    marginTop: 3,
                    marginLeft: 23,
                    fontSize: 10,
                    color: darkMode
                      ? (isBest ? '#a78bfa' : '#6b7280')
                      : (isBest ? '#7c3aed' : '#9ca3af'),
                    fontStyle: 'italic',
                  }}>
                    {tipText}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer tip */}
        <div style={{
          marginTop: 8,
          padding: '5px 8px',
          background: darkMode ? 'rgba(59,130,246,0.1)' : '#eff6ff',
          border: `1px solid ${darkMode ? 'rgba(59,130,246,0.2)' : '#dbeafe'}`,
          borderRadius: 6,
          fontSize: 10,
          color: darkMode ? '#93c5fd' : '#1d4ed8',
        }}>
          💡 {tab === 'playwright'
            ? (language === 'tr'
              ? 'Playwright locator\'ları lazy\'dir — action\'da DOM\'a erişir'
              : 'Playwright locators are lazy — DOM accessed only on action')
            : (language === 'tr'
              ? 'Java: driver.findElement(By.…) → WebElement nesnesi döner'
              : 'Java: driver.findElement(By.…) returns a WebElement instance')}
        </div>
      </div>
    </div>
  )
}
