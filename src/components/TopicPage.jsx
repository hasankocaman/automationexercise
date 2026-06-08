import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import TopicHeader from './TopicHeader'

// ─── Primitive UI ─────────────────────────────────────────────────────────────

function CodeBlock({ code, darkMode }) {
    const [copied, setCopied] = useState(false)
    return (
        <div className="relative mt-3 group">
            <pre className="p-4 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed bg-gray-950 text-green-400 border border-gray-700">
                <code>{code.trim()}</code>
            </pre>
            <button
                onClick={() => { navigator.clipboard.writeText(code.trim()); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                className="absolute top-2 right-2 px-2 py-1 rounded text-xs bg-gray-700 text-gray-300 hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                {copied ? '✅ Copied' : '📋 Copy'}
            </button>
        </div>
    )
}

function ExerciseBlock({ block, darkMode }) {
    const [showSolution, setShowSolution] = useState(false)
    const [showHint, setShowHint] = useState(false)
    const diffBg = block.difficulty?.startsWith('🟢')
        ? (darkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-300')
        : block.difficulty?.startsWith('🟡')
            ? (darkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-300')
            : (darkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-300')
    return (
        <div className={`mt-6 rounded-xl border-2 p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'} ${diffBg}`}>
            <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${diffBg}`}>{block.difficulty}</span>
                <span className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{block.title}</span>
            </div>
            <p className={`text-sm mb-3 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{block.description}</p>
            {block.hint && (
                <div className="mb-3">
                    <button onClick={() => setShowHint(!showHint)} className="text-xs text-blue-400 hover:underline">
                        {showHint ? '🙈 Hide hint' : '💡 Show hint'}
                    </button>
                    {showHint && <p className={`mt-2 text-xs p-3 rounded-lg ${darkMode ? 'bg-blue-900/20 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>{block.hint}</p>}
                </div>
            )}
            <button
                onClick={() => setShowSolution(!showSolution)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${showSolution
                    ? (darkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-700')
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-md'
                    }`}
            >
                {showSolution ? '🙈 Hide Solution' : '👁 Show Solution'}
            </button>
            {showSolution && (
                <div className="mt-3">
                    <CodeBlock code={block.solution} darkMode={darkMode} />
                    {block.explanation && (
                        <p className={`mt-3 text-xs leading-relaxed italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            💡 {block.explanation}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}

// ─── Block Renderer ───────────────────────────────────────────────────────────

function renderBlock(block, i, darkMode) {
    const textCls = `text-sm leading-relaxed mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`
    const h3Cls = `text-xl font-bold mt-8 mb-3 pb-2 border-b ${darkMode ? 'text-white border-gray-700' : 'text-gray-800 border-gray-200'}`
    const h4Cls = `text-base font-semibold mt-5 mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`
    const bulletColor = block.accentColor || (darkMode ? 'text-indigo-400' : 'text-indigo-600')

    switch (block.type) {
        case 'text':
            return <p key={i} className={textCls}>{block.content}</p>
        case 'heading':
            return (
                <h3 key={i} className={h3Cls}>
                    {block.text}
                    {block.difficulty && <span className={`ml-3 text-xs font-normal px-2 py-0.5 rounded-full align-middle ${block.difficulty.startsWith('🟢') ? (darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700') : block.difficulty.startsWith('🟡') ? (darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-700') : (darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700')}`}>{block.difficulty}</span>}
                </h3>
            )
        case 'subheading':
            return <h4 key={i} className={h4Cls}>{block.text}</h4>
        case 'code':
            return (
                <div key={i}>
                    {block.label && <div className={`mt-4 mb-1 text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{block.label}</div>}
                    <CodeBlock code={block.code} darkMode={darkMode} />
                    {block.expected && (
                        <div className={`mt-1 p-3 rounded-b-lg font-mono text-xs border-l-4 border-emerald-500 ${darkMode ? 'bg-gray-900 text-emerald-400' : 'bg-emerald-50 text-emerald-800'}`}>
                            <div className={`text-xs font-sans mb-1 ${darkMode ? 'opacity-50' : 'opacity-60'}`}>▶ Expected Output:</div>
                            <pre className="whitespace-pre-wrap">{block.expected}</pre>
                        </div>
                    )}
                </div>
            )
        case 'tip':
            return (
                <div key={i} className={`mt-4 p-4 rounded-lg border-l-4 border-green-500 text-sm ${darkMode ? 'bg-green-900/20 text-green-300' : 'bg-green-50 text-green-800'}`}>
                    💡 <strong>Tip: </strong>{block.content}
                </div>
            )
        case 'info':
            return (
                <div key={i} className={`mt-4 p-4 rounded-lg border-l-4 border-blue-500 text-sm ${darkMode ? 'bg-blue-900/20 text-blue-300' : 'bg-blue-50 text-blue-800'}`}>
                    ℹ️ {block.content}
                </div>
            )
        case 'warning':
            return (
                <div key={i} className={`mt-4 p-4 rounded-lg border-l-4 border-yellow-500 text-sm ${darkMode ? 'bg-yellow-900/20 text-yellow-300' : 'bg-yellow-50 text-yellow-800'}`}>
                    ⚠️ <strong>Warning: </strong>{block.content}
                </div>
            )
        case 'divider':
            return <hr key={i} className={`my-8 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
        case 'list':
            return (
                <div key={i} className="mt-4">
                    {block.title && <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{block.title}</p>}
                    <ul className="space-y-2">
                        {block.items.map((item, j) => (
                            <li key={j} className={`flex items-start gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                <span className={`mt-0.5 flex-shrink-0 ${bulletColor}`}>{block.icon || '▸'}</span>
                                {typeof item === 'string' ? item : (
                                    <span><strong className={darkMode ? 'text-white' : 'text-gray-800'}>{item.label}</strong>
                                        {item.desc && <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}> — {item.desc}</span>}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        case 'steps':
            return (
                <div key={i} className="mt-4 space-y-2">
                    {block.items.map((item, j) => (
                        <div key={j} className={`flex items-start gap-3 p-3 rounded-lg text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
                            <span className={`w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${darkMode ? 'bg-indigo-800 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>{j + 1}</span>
                            <span className="leading-relaxed">{typeof item === 'string' ? item : <span><strong>{item.label}</strong>{item.desc && `: ${item.desc}`}</span>}</span>
                        </div>
                    ))}
                </div>
            )
        case 'grid':
            return (
                <div key={i} className={`mt-4 grid grid-cols-1 md:grid-cols-${block.cols || 2} gap-3`}>
                    {block.items.map((item, j) => (
                        <div key={j} className={`p-4 rounded-xl border text-sm ${darkMode ? 'bg-gray-750 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                            {item.icon && <div className="text-2xl mb-2">{item.icon}</div>}
                            <div className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.label}</div>
                            {item.desc && <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{item.desc}</div>}
                        </div>
                    ))}
                </div>
            )
        case 'table':
            return (
                <div key={i} className="mt-4 overflow-x-auto">
                    <table className={`w-full text-sm border-collapse rounded-xl overflow-hidden`}>
                        <thead>
                            <tr className={darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}>
                                {block.headers.map((h, j) => <th key={j} className={`p-3 text-left font-semibold border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {block.rows.map((row, j) => (
                                <tr key={j} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                                    {row.map((cell, k) => <td key={k} className={`p-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{cell}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        case 'qa':
            return (
                <QAItem key={i} question={block.question} answer={block.answer} code={block.code} darkMode={darkMode} />
            )
        case 'exercise':
            return <ExerciseBlock key={i} block={block} darkMode={darkMode} />
        default:
            return null
    }
}

function QAItem({ question, answer, code, darkMode }) {
    const [open, setOpen] = useState(false)
    return (
        <div className={`rounded-xl border overflow-hidden mb-3 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
            <button
                onClick={() => setOpen(!open)}
                className={`w-full flex justify-between items-start text-left p-4 font-semibold text-sm transition-colors ${darkMode ? 'bg-gray-750 text-white hover:bg-gray-700' : 'bg-gray-50 text-gray-800 hover:bg-gray-100'}`}
            >
                <span className="flex-1 pr-4">{question}</span>
                <span className={`text-2xl font-light transition-transform duration-300 flex-shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
            </button>
            {open && (
                <div className={`p-4 border-t text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-100 text-gray-600'}`}>
                    <p className="leading-relaxed whitespace-pre-line">{answer}</p>
                    {code && <CodeBlock code={code} darkMode={darkMode} />}
                </div>
            )}
        </div>
    )
}

// ─── TopicPage ────────────────────────────────────────────────────────────────

function TopicPage({ data, gradient, bgLight }) {
    const { language } = useLanguage()
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        return saved !== null ? JSON.parse(saved) : true
    })
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        window.scrollTo(0, 0)
    }, [darkMode])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [activeTab])

    const content = data[language] || data['en']
    const { hero, tabs, sections } = content

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-gray-900' : bgLight}`}>
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="container mx-auto px-4 md:px-6 py-8 max-w-5xl">
                {/* Hero */}
                <div className={`rounded-2xl p-8 mb-6 bg-gradient-to-r ${gradient} text-white shadow-xl`}>
                    <h1 className="text-4xl font-bold mb-2">{hero.title}</h1>
                    <p className="text-xl opacity-90">{hero.subtitle}</p>
                    <p className="mt-3 opacity-80 max-w-3xl text-sm leading-relaxed">{hero.intro}</p>
                </div>

                {/* Tabs */}
                <div className={`sticky top-0 z-30 rounded-xl mb-6 p-1.5 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                    <div className="flex overflow-x-auto gap-1 pb-0.5">
                        {tabs.map((tab, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTab(i)}
                                className={`flex-shrink-0 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 whitespace-nowrap ${activeTab === i
                                    ? `bg-gradient-to-r ${gradient} text-white shadow-md scale-105`
                                    : darkMode
                                        ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className={`rounded-2xl p-6 md:p-8 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {sections[activeTab]?.title}
                    </h2>
                    {sections[activeTab]?.blocks?.map((block, i) => renderBlock(block, i, darkMode))}
                </div>

                {/* Pagination */}
                <div className="flex justify-between mt-6 gap-4">
                    {activeTab > 0 && (
                        <button
                            onClick={() => setActiveTab(activeTab - 1)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                        >
                            ← {tabs[activeTab - 1]}
                        </button>
                    )}
                    {activeTab < tabs.length - 1 && (
                        <button
                            onClick={() => setActiveTab(activeTab + 1)}
                            className={`ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all bg-gradient-to-r ${gradient} text-white hover:shadow-lg`}
                        >
                            {tabs[activeTab + 1]} →
                        </button>
                    )}
                </div>
            </main>
        </div>
    )
}

export default TopicPage
