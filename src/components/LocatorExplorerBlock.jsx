import { useState } from 'react'

// Strategy meta: color + display label + priority (lower = better)
const S = {
  id:          { color: '#10b981', label: 'id',            priority: 1 },
  testid:      { color: '#06b6d4', label: 'data-testid',   priority: 1 },
  name:        { color: '#3b82f6', label: 'name',          priority: 2 },
  text:        { color: '#f97316', label: 'text content',  priority: 2 },
  role:        { color: '#a855f7', label: 'role (ARIA)',   priority: 2 },
  class:       { color: '#f59e0b', label: 'class',         priority: 3 },
  placeholder: { color: '#ec4899', label: 'placeholder',  priority: 3 },
  type:        { color: '#8b5cf6', label: 'type',          priority: 3 },
  href:        { color: '#14b8a6', label: 'href',          priority: 3 },
  xpath:       { color: '#6366f1', label: 'XPath',         priority: 4 },
}

// Parse "[[strategy|display text]]" markers embedded in an HTML string
function parseHtml(html) {
  const parts = []
  const re = /\[\[(\w+)\|([^\]]+)\]\]/g
  let last = 0, m
  while ((m = re.exec(html)) !== null) {
    if (m.index > last) parts.push({ plain: true, text: html.slice(last, m.index) })
    parts.push({ plain: false, strategy: m[1], text: m[2] })
    last = m.index + m[0].length
  }
  if (last < html.length) parts.push({ plain: true, text: html.slice(last) })
  return parts
}

export default function LocatorExplorerBlock({ block, darkMode, language }) {
  const isTr = language === 'tr'
  const [active, setActive] = useState(null)
  const [tool, setTool] = useState('selenium')

  const htmlStr = typeof block.html === 'object'
    ? (block.html[language] || block.html.tr || block.html.en || '')
    : (block.html || '')
  const parts = parseHtml(htmlStr)

  // Count how many times each strategy appears
  const counts = {}
  parts.forEach(p => { if (!p.plain) counts[p.strategy] = (counts[p.strategy] || 0) + 1 })

  const presentStrategies = [...new Set(parts.filter(p => !p.plain).map(p => p.strategy))]
    .sort((a, b) => (S[a]?.priority || 9) - (S[b]?.priority || 9))

  const locMap = block.locatorMap || {}
  const loc = active ? locMap[active] : null

  const title = isTr
    ? (block.titleTr || 'HTML\'i Oku → Locator\'ı Türet')
    : (block.titleEn || 'Read HTML → Derive the Locator')
  const subtitle = isTr
    ? 'Renkli attribute\'lere tıkla — hangi attribute hangi locator\'ı verir öğren'
    : 'Click the colored attributes — learn which attribute maps to which locator'

  function toggle(strategy) {
    setActive(prev => (prev === strategy ? null : strategy))
  }

  const tools = [
    { id: 'selenium',   label: '🟤 Selenium' },
    { id: 'playwright', label: '🎭 Playwright' },
    { id: 'cypress',    label: '🌲 Cypress' },
  ]

  const activeColor = active ? (S[active]?.color || '#6366f1') : null

  return (
    <div className={`mt-6 rounded-2xl border overflow-hidden shadow-sm ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>

      {/* ── Header ── */}
      <div className={`flex items-center gap-3 px-4 py-3 border-b ${darkMode ? 'border-gray-700 bg-gray-800/60' : 'border-gray-100 bg-slate-50'}`}>
        <span className="text-2xl select-none">🔍</span>
        <div>
          <div className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</div>
          <div className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</div>
        </div>
      </div>

      <div className="p-4 grid md:grid-cols-2 gap-4">

        {/* ── Left: HTML panel ── */}
        <div>
          <div className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            📄 HTML
          </div>

          <div
            className={`rounded-xl overflow-x-auto text-[12px] leading-[1.85] p-3 ${darkMode ? 'bg-gray-800' : 'bg-gray-950'}`}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              border: activeColor ? `2px solid ${activeColor}55` : '2px solid transparent',
              transition: 'border-color 0.25s',
              minHeight: 200,
            }}
          >
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {parts.map((p, i) => {
                if (p.plain) {
                  // Style tag names and attribute names in neutral color
                  return <span key={i} className="text-gray-400">{p.text}</span>
                }
                const style = S[p.strategy] || { color: '#888' }
                const isActive = active === p.strategy
                return (
                  <button
                    key={i}
                    onClick={() => toggle(p.strategy)}
                    title={`${style.label} → tıkla / click`}
                    style={{
                      display: 'inline',
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      lineHeight: 'inherit',
                      padding: '1px 4px',
                      borderRadius: 4,
                      fontWeight: 700,
                      cursor: 'pointer',
                      background: isActive ? style.color : style.color + '30',
                      color: isActive ? '#fff' : style.color,
                      outline: isActive ? `2px solid ${style.color}` : 'none',
                      outlineOffset: 1,
                      boxShadow: isActive ? `0 0 10px ${style.color}66` : 'none',
                      transition: 'all 0.15s',
                    }}
                  >
                    {p.text}
                  </button>
                )
              })}
            </pre>
          </div>

          {/* Strategy legend pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {presentStrategies.map(key => {
              const style = S[key] || { color: '#888', label: key }
              const count = counts[key]
              const isActive = active === key
              return (
                <button
                  key={key}
                  onClick={() => toggle(key)}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border transition-all duration-150"
                  style={{
                    background: isActive ? style.color : style.color + '18',
                    color: isActive ? '#fff' : style.color,
                    borderColor: style.color + '55',
                  }}
                >
                  {style.label}
                  {count > 1 && (
                    <span
                      className="px-1 rounded-full text-[9px] ml-0.5"
                      style={{ background: isActive ? '#ffffff33' : style.color + '30' }}
                    >
                      ×{count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Multiple-match warning */}
          {active && counts[active] > 1 && (
            <div className={`mt-2 px-3 py-2 rounded-lg text-xs leading-relaxed ${darkMode ? 'bg-amber-900/30 text-amber-300 border border-amber-800' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
              ⚠️ {isTr
                ? `Bu HTML'de "${S[active]?.label || active}" ${counts[active]} farklı element'te geçiyor — bu locator birden fazla element eşleştirebilir!`
                : `"${S[active]?.label || active}" appears on ${counts[active]} elements in this HTML — this locator may match multiple elements!`}
            </div>
          )}
        </div>

        {/* ── Right: Locator code panel ── */}
        <div>
          {loc ? (
            <>
              {/* Tool tabs */}
              <div className="flex gap-1.5 mb-3">
                {tools.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTool(t.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${tool === t.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : darkMode ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Code */}
              {(() => {
                const codeObj = loc[tool]
                const codeStr = codeObj
                  ? (typeof codeObj === 'string' ? codeObj : (isTr ? codeObj.tr : codeObj.en) || '')
                  : null
                return codeStr ? (
                  <pre
                    className="text-[12px] leading-[1.6] p-3 rounded-xl overflow-x-auto mb-3"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      background: darkMode ? '#0d1117' : '#1e1e2e',
                      color: '#a6e3a1',
                      border: `2px solid ${activeColor || '#6366f1'}44`,
                    }}
                  >
                    {codeStr}
                  </pre>
                ) : (
                  <div className={`text-xs p-3 rounded-xl mb-3 italic ${darkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-50 text-gray-400'}`}>
                    {isTr ? 'Bu araçta bu strateji doğrudan desteklenmez' : 'This strategy is not directly supported in this tool'}
                  </div>
                )
              })()}

              {/* Note */}
              {(loc.noteTr || loc.noteEn) && (
                <div className={`px-3 py-2 rounded-lg text-xs leading-relaxed mb-2 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
                  {isTr ? loc.noteTr : loc.noteEn}
                </div>
              )}

              {/* Warning */}
              {(loc.warningTr || loc.warningEn) && (
                <div className={`px-3 py-2 rounded-lg text-xs leading-relaxed mb-2 ${darkMode ? 'bg-red-900/30 text-red-300 border border-red-800' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  ⚠️ {isTr ? loc.warningTr : loc.warningEn}
                </div>
              )}

              {/* Tip */}
              {(loc.tipTr || loc.tipEn) && (
                <div className={`px-3 py-2 rounded-lg text-xs leading-relaxed ${darkMode ? 'bg-yellow-900/30 text-yellow-200 border border-yellow-800' : 'bg-yellow-50 text-yellow-800 border border-yellow-200'}`}>
                  💡 {isTr ? loc.tipTr : loc.tipEn}
                </div>
              )}
            </>
          ) : (
            <div className={`h-full min-h-[220px] flex flex-col items-center justify-center rounded-xl text-center p-6 select-none ${darkMode ? 'bg-gray-800/40 text-gray-500' : 'bg-slate-50 text-gray-400'}`}>
              <div className="text-5xl mb-4 opacity-50 animate-bounce">👆</div>
              <div className={`font-semibold text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {isTr ? 'Bir attribute seç' : 'Select an attribute'}
              </div>
              <div className="text-xs mt-2 max-w-[200px] leading-relaxed">
                {isTr
                  ? 'Soldaki HTML\'de renkli kısımlara tıkla — locator kodunu burda görürsün'
                  : 'Click a colored part in the HTML — you\'ll see the locator code here'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
