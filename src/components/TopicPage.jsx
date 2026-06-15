import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useLocation } from 'react-router-dom'
import TopicHeader from './TopicHeader'

// ─── CodeBlock ────────────────────────────────────────────────────────────────

function CodeBlock({ code, language, darkMode }) {
    const [copied, setCopied] = useState(false)
    const codeRef = useRef(null)
    const prismLang = language ? language.toLowerCase().replace(/[\s/().]/g, '') : ''

    useEffect(() => {
        if (codeRef.current && window.Prism) {
            window.Prism.highlightElement(codeRef.current)
        }
    })

    return (
        <div className="relative mt-3 group">
            {language && (
                <div className="absolute top-2 left-3 z-10 text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700 font-mono select-none">
                    {language}
                </div>
            )}
            <pre className={`p-4 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed bg-slate-800 text-slate-100 border border-slate-600 ${language ? 'pt-8' : ''} ${prismLang ? `language-${prismLang}` : ''}`} style={{ background: '#1e2030' }}>
                <code ref={codeRef} className={prismLang ? `language-${prismLang}` : ''}>{(code || '').trim()}</code>
            </pre>
            <button
                onClick={() => { navigator.clipboard.writeText((code || '').trim()); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                className="absolute top-2 right-2 px-2 py-1 rounded text-xs bg-gray-700 text-gray-300 hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                {copied ? '✅ Copied' : '📋 Copy'}
            </button>
        </div>
    )
}

// ─── ExerciseBlock ────────────────────────────────────────────────────────────

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
                        {showHint ? '🙈 İpucunu Gizle' : '💡 İpucu Göster'}
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
                {showSolution ? '🙈 Çözümü Gizle' : '👁 Çözümü Göster'}
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

// ─── PostmanCompareBlock ──────────────────────────────────────────────────────

function PostmanCompareBlock({ block, darkMode, language }) {
    const [show, setShow] = useState(false)
    const isTr = language === 'tr'
    return (
        <div className="mt-6">
            <button
                onClick={() => setShow(!show)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-xl font-bold text-sm transition-all duration-300 ${show
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : darkMode
                        ? 'bg-orange-900/20 text-orange-300 border-2 border-orange-700 hover:bg-orange-900/40'
                        : 'bg-orange-50 text-orange-700 border-2 border-orange-300 hover:bg-orange-100'
                }`}
            >
                <span className="flex items-center gap-3">
                    <span className="text-xl">📮</span>
                    <span>{isTr ? 'Postman\'da böyle yapılır → REST Assured karşılığı göster' : 'How it\'s done in Postman → Show REST Assured equivalent'}</span>
                </span>
                <span className={`flex-shrink-0 text-xs px-2 py-1 rounded-full ${show ? 'bg-white/20 text-white' : darkMode ? 'bg-orange-900/40 text-orange-300' : 'bg-orange-200 text-orange-700'}`}>
                    {show ? (isTr ? '▲ Gizle' : '▲ Hide') : (isTr ? '▼ Göster' : '▼ Show')}
                </span>
            </button>
            {show && (
                <div className="mt-4 space-y-4">
                    {block.comparisons?.map((comp, idx) => (
                        <div key={idx} className={`rounded-xl overflow-hidden border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <div className={`px-4 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
                                <span>🔀</span> {comp.scenario}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className={`p-4 border-r-0 md:border-r border-b md:border-b-0 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-base">📮</span>
                                        <span className="text-xs font-bold text-orange-400">Postman</span>
                                    </div>
                                    <div className={`text-sm leading-relaxed space-y-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {(comp.postman || '').split('\n').map((line, l) => (
                                            <div key={l} className={`flex items-start gap-2 ${line.startsWith('→') ? 'ml-3 opacity-70' : ''}`}>
                                                {!line.startsWith('→') && !line.startsWith(' ') && line.trim() && (
                                                    <span className="text-orange-400 flex-shrink-0 mt-0.5">•</span>
                                                )}
                                                <span className={line.startsWith('→') ? 'text-xs' : ''}>{line.replace(/^→\s*/, '')}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="px-4 py-2 text-xs font-bold flex items-center gap-2" style={{ background: '#1a1b26', color: '#7aa2f7' }}>
                                        <span>☕</span> REST Assured (Java)
                                    </div>
                                    <div className="p-4 overflow-x-auto" style={{ background: '#1a1b26' }}>
                                        <pre className="font-mono text-xs leading-relaxed whitespace-pre" style={{ color: '#c0caf5' }}>{comp.restAssured}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

// ─── QuizBlock ────────────────────────────────────────────────────────────────

function QuizBlock({ block, darkMode, language = 'en' }) {
    const [selected, setSelected] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const isCorrect = selected === block.correct
    // Support both plain string options and {id, text} object options
    const normalizeOption = (opt, i) => {
        if (typeof opt === 'string') return { id: String.fromCharCode(97 + i), text: opt }
        return opt
    }
    const options = (block.options || []).map(normalizeOption)
    return (
        <div className={`mt-6 p-5 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-indigo-700' : 'bg-indigo-50 border-indigo-200'}`}>
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🧠</span>
                <span className={`font-bold text-sm ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>Hızlı Quiz</span>
            </div>
            <p className={`text-sm font-semibold mb-4 leading-relaxed ${darkMode ? 'text-white' : 'text-gray-800'}`}>{tx(block.question, language)}</p>
            <div className="space-y-2">
                {options.map((opt, i) => {
                    const isCorrectOpt = opt.id === block.correct
                    const isSelected = selected === opt.id
                    return (
                        <button
                            key={opt.id || i}
                            onClick={() => !submitted && setSelected(opt.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 border-2 ${submitted
                                ? isCorrectOpt
                                    ? 'bg-green-500/20 border-green-500 text-green-300 font-semibold'
                                    : isSelected && !isCorrectOpt
                                        ? 'bg-red-500/20 border-red-500 text-red-300'
                                        : darkMode ? 'bg-gray-700 border-gray-600 text-gray-500' : 'bg-white border-gray-200 text-gray-400'
                                : isSelected
                                    ? darkMode ? 'bg-indigo-800 border-indigo-500 text-indigo-200' : 'bg-indigo-100 border-indigo-400 text-indigo-800'
                                    : darkMode ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                                }`}
                        >
                            <span className="font-mono font-bold mr-2">{opt.id?.toUpperCase() || String.fromCharCode(65 + i)}.</span>
                            {tx(opt.text, language)}
                            {submitted && isCorrectOpt && <span className="ml-2">✓</span>}
                            {submitted && isSelected && !isCorrectOpt && <span className="ml-2">✗</span>}
                        </button>
                    )
                })}
            </div>
            {!submitted && selected !== null && (
                <button
                    onClick={() => setSubmitted(true)}
                    className="mt-4 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm font-semibold hover:shadow-md transition-all active:scale-95"
                >
                    Cevabı Kontrol Et →
                </button>
            )}
            {submitted && (
                <div className={`mt-4 p-4 rounded-lg text-sm leading-relaxed ${isCorrect ? (darkMode ? 'bg-green-900/30 text-green-300 border border-green-700' : 'bg-green-50 text-green-800 border border-green-200') : (darkMode ? 'bg-amber-900/30 text-amber-300 border border-amber-700' : 'bg-amber-50 text-amber-800 border border-amber-200')}`}>
                    <span className="font-bold">{isCorrect ? '🎉 Doğru! ' : '💡 Yanlış — '}</span>
                    {tx(block.explanation, language)}
                </div>
            )}
        </div>
    )
}

// ─── ComparisonBlock ──────────────────────────────────────────────────────────

function ComparisonBlock({ block, darkMode, language = 'en' }) {
    // Table-style comparison: { title, columns, rows: [{concept, java, python, typescript}] }
    if (block.columns && block.rows) {
        const cols = block.columns
        return (
            <div className={`mt-5 rounded-xl overflow-hidden border ${darkMode ? 'border-indigo-800' : 'border-indigo-200'}`}>
                {block.title && (
                    <div className={`px-4 py-2.5 text-sm font-bold flex items-center gap-2 ${darkMode ? 'bg-indigo-900/40 text-indigo-300' : 'bg-indigo-50 text-indigo-700'}`}>
                        ⚖️ {tx(block.title, language)}
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className={darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}>
                                <th className={`p-3 text-left font-semibold border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                                    {language === 'tr' ? 'Kavram' : 'Concept'}
                                </th>
                                {cols.map((col, j) => (
                                    <th key={j} className={`p-3 text-left font-semibold border-b font-mono ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {block.rows.map((row, j) => (
                                <tr key={j} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                    <td className={`p-3 font-semibold text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {tx(row.concept, language)}
                                    </td>
                                    {cols.map((col, k) => {
                                        // 'Java (HashMap)' → 'java', 'Python (list)' → 'python'
                                        const key = col.split(/[\s(]/)[0].toLowerCase()
                                        const val = row[key] ?? row[col.toLowerCase()] ?? row[col] ?? ''
                                        return (
                                            <td key={k} className={`p-3 font-mono text-xs ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                                                {val}
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    // Code side-by-side comparison: { left: {label, code, note}, right: {label, code, note} }
    return (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[block.left, block.right].map((side, idx) => {
                if (!side) return null
                const isLeft = idx === 0
                return (
                    <div key={idx} className={`rounded-xl overflow-hidden border-2 ${isLeft ? 'border-red-500/60' : 'border-green-500/60'}`}>
                        <div className={`px-4 py-2 text-sm font-bold ${isLeft ? (darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600') : (darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600')}`}>
                            {tx(side.label, language)}
                        </div>
                        <div className="bg-slate-800 p-4">
                            <pre className="font-mono text-xs text-slate-100 overflow-x-auto leading-relaxed whitespace-pre-wrap">{side.code}</pre>
                        </div>
                        {side.note && (
                            <div className={`px-4 py-2 text-xs ${isLeft ? (darkMode ? 'text-red-400 bg-red-900/10' : 'text-red-600 bg-red-50') : (darkMode ? 'text-green-400 bg-green-900/10' : 'text-green-600 bg-green-50')}`}>
                                {isLeft ? '❌ ' : '✅ '}{tx(side.note, language)}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

// ─── Visual Sub-components ────────────────────────────────────────────────────

function JoinDiagram({ block, darkMode }) {
    const [step, setStep] = useState(0)
    const bg = darkMode ? 'bg-gray-750 border-gray-600' : 'bg-gray-50 border-gray-200'
    const matchRow = darkMode ? 'bg-green-900/50 text-green-300 border-green-700' : 'bg-green-100 text-green-800 border-green-300'
    const nullRow = darkMode ? 'bg-blue-900/30 text-blue-300 border-blue-700 italic' : 'bg-blue-50 text-blue-600 border-blue-200 italic'
    const noRow = darkMode ? 'bg-gray-800 text-gray-500 border-gray-700 opacity-40' : 'bg-gray-100 text-gray-400 border-gray-200 opacity-50'
    const normalRow = darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-700 border-gray-200'

    const getRowStyle = (row) => {
        if (step === 0) return normalRow
        if (row.matched) return matchRow
        if (row.nullFill) return nullRow
        return noRow
    }

    return (
        <div className={`mt-5 p-5 rounded-xl border ${bg}`}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className={`font-mono font-bold text-sm px-3 py-1.5 rounded-lg ${darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
                    {block.joinType}
                </div>
                <div className="flex gap-2">
                    {step < 2 ? (
                        <button onClick={() => setStep(s => s + 1)} className="text-xs px-3 py-1.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-400 transition-all font-semibold">
                            {step === 0 ? 'Eşleşmeleri Göster →' : 'Sonucu Göster →'}
                        </button>
                    ) : (
                        <button onClick={() => setStep(0)} className="text-xs px-3 py-1.5 bg-gray-500 text-white rounded-lg hover:bg-gray-400 transition-all font-semibold">
                            ↺ Sıfırla
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-3 items-start overflow-x-auto">
                <div>
                    <div className={`text-xs font-bold mb-2 text-center px-2 py-1.5 rounded-lg ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                        📋 {block.leftTable.name}
                    </div>
                    {block.leftTable.rows.map((row, i) => (
                        <div key={i} className={`text-xs px-2 py-1.5 rounded-lg mb-1.5 font-mono border transition-all duration-300 ${getRowStyle(row)}`}>
                            {row.label}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center pt-8 gap-3">
                    <div className="relative w-16 h-10">
                        <div className={`absolute left-0 top-0 w-8 h-8 rounded-full border-2 ${darkMode ? 'border-blue-400' : 'border-blue-500'} opacity-70`} />
                        <div className={`absolute right-0 top-0 w-8 h-8 rounded-full border-2 ${darkMode ? 'border-orange-400' : 'border-orange-500'} opacity-70`} />
                        <div className={`absolute left-1/2 -translate-x-1/2 top-1 w-4 h-6 rounded-sm ${
                            block.joinType?.includes('INNER') ? 'bg-green-500/60' :
                            block.joinType?.includes('LEFT') ? 'bg-blue-500/60' :
                            block.joinType?.includes('RIGHT') ? 'bg-orange-500/60' :
                            'bg-purple-500/60'
                        }`} />
                    </div>
                    <div className={`text-xs text-center font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>ON</div>
                </div>

                <div>
                    <div className={`text-xs font-bold mb-2 text-center px-2 py-1.5 rounded-lg ${darkMode ? 'bg-orange-900/50 text-orange-300' : 'bg-orange-100 text-orange-700'}`}>
                        📋 {block.rightTable.name}
                    </div>
                    {block.rightTable.rows.map((row, i) => (
                        <div key={i} className={`text-xs px-2 py-1.5 rounded-lg mb-1.5 font-mono border transition-all duration-300 ${getRowStyle(row)}`}>
                            {row.label}
                        </div>
                    ))}
                </div>
            </div>

            {step === 2 && block.resultRows && (
                <div className="mt-4 transition-all duration-300">
                    <div className={`text-xs font-bold mb-2 px-2 py-1 rounded-lg inline-block ${darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700'}`}>
                        ✅ Sorgu Sonucu — {block.resultRows.length} satır
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-gray-700">
                        <table className="w-full text-xs">
                            <thead>
                                <tr>
                                    {block.resultHeaders?.map((h, j) => (
                                        <th key={j} className={`px-3 py-2 text-left font-semibold ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {block.resultRows.map((row, j) => (
                                    <tr key={j} className={`border-t ${darkMode ? 'border-gray-700 bg-indigo-900/20 text-indigo-300' : 'border-gray-200 bg-indigo-50 text-indigo-700'}`}>
                                        {row.map((cell, k) => (
                                            <td key={k} className="px-3 py-2 font-mono">{cell === null ? <span className="opacity-50 not-italic">NULL</span> : String(cell)}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {block.explanation && (
                <p className={`mt-4 text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    💡 {block.explanation}
                </p>
            )}
        </div>
    )
}

function TableDiagram({ block, darkMode }) {
    const bg = darkMode ? 'bg-gray-750 border-gray-600' : 'bg-gray-50 border-gray-200'
    return (
        <div className={`mt-5 p-4 rounded-xl border ${bg} overflow-x-auto`}>
            {block.title && <div className={`text-sm font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{block.title}</div>}
            <div className="flex flex-wrap gap-6 items-start">
                {block.tables?.map((table, t) => (
                    <div key={t} className="flex-shrink-0">
                        <div className={`text-xs font-bold px-3 py-1.5 rounded-t-lg text-center ${darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-600 text-white'}`}>
                            📋 {table.name}
                        </div>
                        <table className="text-xs border-collapse">
                            <thead>
                                <tr>
                                    {table.columns?.map((col, c) => (
                                        <th key={c} className={`px-3 py-1.5 border text-left whitespace-nowrap ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-100 border-gray-300 text-gray-700'}`}>
                                            {col.pk && <span className="mr-1">🔑</span>}
                                            {col.fk && <span className="mr-1">🔗</span>}
                                            {typeof col === 'string' ? col : col.name}
                                            {col.type && <span className={`ml-1 font-normal text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>({col.type})</span>}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {table.rows?.map((row, r) => (
                                    <tr key={r} className={row.highlighted ? (darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50') : ''}>
                                        {row.cells?.map((cell, c) => (
                                            <td key={c} className={`px-3 py-1.5 border font-mono ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-200 text-gray-600'}`}>
                                                {cell === null ? <span className="opacity-40 italic">NULL</span> : String(cell)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
            {block.note && <p className={`mt-3 text-xs italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{block.note}</p>}
        </div>
    )
}

function FlowDiagram({ block, darkMode }) {
    const { language } = useLanguage()
    const bg = darkMode ? 'bg-gray-750 border-gray-600' : 'bg-gray-50 border-gray-200'
    return (
        <div className={`mt-5 p-4 rounded-xl border ${bg}`}>
            {block.title && <div className={`text-sm font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{tx(block.title, language)}</div>}
            <div className="flex flex-wrap items-center gap-1 justify-center">
                {block.steps?.map((step, i) => (
                    <div key={i} className="flex items-center gap-1">
                        <div className={`px-3 py-2.5 rounded-xl border-2 text-center text-xs min-w-[70px] transition-all ${step.highlight
                            ? (darkMode ? 'bg-indigo-900 border-indigo-500 text-indigo-300' : 'bg-indigo-100 border-indigo-400 text-indigo-800')
                            : (darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-700')
                        }`}>
                            {step.num && (
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center mx-auto mb-1 text-xs font-bold ${darkMode ? 'bg-indigo-700 text-white' : 'bg-indigo-600 text-white'}`}>
                                    {step.num}
                                </div>
                            )}
                            <div className="font-bold leading-tight">{tx(step.label, language)}</div>
                            {step.desc && <div className={`mt-0.5 font-normal text-xs leading-tight ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tx(step.desc, language)}</div>}
                        </div>
                        {i < block.steps.length - 1 && (
                            <span className={`text-lg font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>→</span>
                        )}
                    </div>
                ))}
            </div>
            {block.note && <p className={`mt-3 text-xs text-center italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{block.note}</p>}
        </div>
    )
}

function BoxesDiagram({ block, darkMode }) {
    const bg = darkMode ? 'bg-gray-750 border-gray-600' : 'bg-gray-50 border-gray-200'
    return (
        <div className={`mt-5 p-4 rounded-xl border ${bg}`}>
            {block.title && <div className={`text-sm font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{block.title}</div>}
            <div className="flex flex-wrap items-center gap-2 justify-center">
                {block.items?.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        {item.arrow ? (
                            <span className={`text-2xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>→</span>
                        ) : (
                            <div className={`px-4 py-3 rounded-xl border-2 text-center min-w-[90px] max-w-[160px] ${item.highlight
                                ? (darkMode ? 'bg-indigo-900 border-indigo-500' : 'bg-indigo-100 border-indigo-400')
                                : (darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300')
                            }`}>
                                {item.icon && <div className="text-xl mb-1">{item.icon}</div>}
                                <div className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.label}</div>
                                {item.desc && <div className={`text-xs mt-1 leading-tight ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</div>}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {block.note && <p className={`mt-3 text-xs text-center italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{block.note}</p>}
        </div>
    )
}

function PyramidDiagram({ block, darkMode }) {
    const colorMap = {
        green: darkMode ? 'bg-green-900/60 border-green-600 text-green-300' : 'bg-green-100 border-green-400 text-green-800',
        yellow: darkMode ? 'bg-yellow-900/60 border-yellow-600 text-yellow-300' : 'bg-yellow-100 border-yellow-400 text-yellow-800',
        red: darkMode ? 'bg-red-900/60 border-red-600 text-red-300' : 'bg-red-100 border-red-400 text-red-800',
        blue: darkMode ? 'bg-blue-900/60 border-blue-600 text-blue-300' : 'bg-blue-100 border-blue-400 text-blue-800',
        indigo: darkMode ? 'bg-indigo-900/60 border-indigo-600 text-indigo-300' : 'bg-indigo-100 border-indigo-400 text-indigo-800',
        orange: darkMode ? 'bg-orange-900/60 border-orange-600 text-orange-300' : 'bg-orange-100 border-orange-400 text-orange-800',
    }
    const bg = darkMode ? 'bg-gray-750 border-gray-600' : 'bg-gray-50 border-gray-200'
    return (
        <div className={`mt-5 p-5 rounded-xl border ${bg}`}>
            {block.title && <div className={`text-sm font-bold mb-4 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>{block.title}</div>}
            <div className="flex flex-col items-center gap-2">
                {block.levels?.map((level, i) => {
                    const pct = 28 + (block.levels.length - 1 - i) * 18
                    return (
                        <div key={i} className={`px-4 py-2.5 rounded-xl border-2 text-center text-sm transition-all ${colorMap[level.color] || colorMap.blue}`}
                            style={{ width: `${Math.min(100, pct)}%` }}>
                            <div className="font-bold">{level.label}</div>
                            {level.desc && <div className="text-xs opacity-80 mt-0.5">{level.desc}</div>}
                        </div>
                    )
                })}
            </div>
            {block.note && <p className={`mt-3 text-xs text-center italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{block.note}</p>}
        </div>
    )
}

function DataStructureDiagram({ block, darkMode }) {
    const bg = darkMode ? 'bg-gray-750 border-gray-600' : 'bg-gray-50 border-gray-200'

    if (block.dataType === 'list') {
        return (
            <div className={`mt-5 p-4 rounded-xl border ${bg}`}>
                {block.title && <div className={`text-sm font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{block.title}</div>}
                <div className="flex items-stretch overflow-x-auto">
                    {block.items?.map((item, i) => (
                        <div key={i} className="flex items-stretch">
                            <div className={`flex flex-col items-center border-2 ${item.highlighted ? (darkMode ? 'border-yellow-400 bg-yellow-900/30' : 'border-yellow-400 bg-yellow-50') : (darkMode ? 'border-gray-500 bg-gray-700' : 'border-gray-300 bg-white')}`}>
                                <div className={`px-4 py-2.5 text-sm font-mono font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{String(item.value)}</div>
                                <div className={`px-2 py-0.5 text-xs border-t w-full text-center ${darkMode ? 'border-gray-600 text-indigo-400 bg-gray-800' : 'border-gray-300 text-indigo-600 bg-gray-50'}`}>[{i}]</div>
                            </div>
                        </div>
                    ))}
                </div>
                {block.note && <p className={`mt-2 text-xs italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{block.note}</p>}
            </div>
        )
    }

    if (block.dataType === 'dict') {
        return (
            <div className={`mt-5 p-4 rounded-xl border ${bg}`}>
                {block.title && <div className={`text-sm font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{block.title}</div>}
                <div className="inline-flex flex-col gap-0 rounded-lg overflow-hidden border border-gray-600">
                    {block.items?.map((item, i) => (
                        <div key={i} className={`flex border-b last:border-b-0 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                            <div className={`px-4 py-2 font-mono text-xs font-bold border-r min-w-[120px] ${darkMode ? 'bg-indigo-900/40 border-gray-600 text-indigo-300' : 'bg-indigo-50 border-gray-200 text-indigo-700'}`}>
                                "{item.key}"
                            </div>
                            <div className={`px-4 py-2 font-mono text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'}`}>
                                {typeof item.value === 'string' ? `"${item.value}"` : String(item.value)}
                            </div>
                        </div>
                    ))}
                </div>
                {block.note && <p className={`mt-2 text-xs italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{block.note}</p>}
            </div>
        )
    }

    if (block.dataType === 'set') {
        return (
            <div className={`mt-5 p-4 rounded-xl border ${bg}`}>
                {block.title && <div className={`text-sm font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{block.title}</div>}
                <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-2xl font-mono ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{'{'}</span>
                    {block.items?.map((item, i) => (
                        <div key={i} className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold border-2 ${darkMode ? 'border-orange-500 bg-orange-900/30 text-orange-300' : 'border-orange-400 bg-orange-50 text-orange-700'}`}>
                            {String(item.value)}
                        </div>
                    ))}
                    <span className={`text-2xl font-mono ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{'}'}</span>
                </div>
                <p className={`mt-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>⚡ Sıra yoktur · Her eleman benzersizdir · Hızlı üyelik kontrolü</p>
                {block.note && <p className={`mt-1 text-xs italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{block.note}</p>}
            </div>
        )
    }

    if (block.dataType === 'tuple') {
        return (
            <div className={`mt-5 p-4 rounded-xl border ${bg}`}>
                {block.title && <div className={`text-sm font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{block.title}</div>}
                <div className="flex items-center gap-1 flex-wrap">
                    <span className={`text-xl font-mono font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>(</span>
                    {block.items?.map((item, i) => (
                        <div key={i} className="flex items-center gap-1">
                            <div className={`px-3 py-2 text-xs font-mono border-2 rounded ${darkMode ? 'border-purple-500 bg-purple-900/30 text-purple-300' : 'border-purple-400 bg-purple-50 text-purple-700'}`}>
                                {String(item.value)}
                            </div>
                            {i < block.items.length - 1 && <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>,</span>}
                        </div>
                    ))}
                    <span className={`text-xl font-mono font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>)</span>
                </div>
                <p className={`mt-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>🔒 Değiştirilemez (immutable) · Sıralı · Hızlı okuma</p>
                {block.note && <p className={`mt-1 text-xs italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{block.note}</p>}
            </div>
        )
    }

    return null
}

function VisualBlock({ block, darkMode }) {
    switch (block.variant) {
        case 'join': return <JoinDiagram block={block} darkMode={darkMode} />
        case 'table': return <TableDiagram block={block} darkMode={darkMode} />
        case 'flow': return <FlowDiagram block={block} darkMode={darkMode} />
        case 'boxes': return <BoxesDiagram block={block} darkMode={darkMode} />
        case 'pyramid': return <PyramidDiagram block={block} darkMode={darkMode} />
        case 'data-structure': return <DataStructureDiagram block={block} darkMode={darkMode} />
        default: return null
    }
}

function CalloutBlock({ block, darkMode }) {
    const { language } = useLanguage()
    const colorMap = {
        blue: { border: 'border-blue-400', bg: darkMode ? 'bg-blue-900/20' : 'bg-blue-50', text: darkMode ? 'text-blue-300' : 'text-blue-800', titleText: darkMode ? 'text-blue-200' : 'text-blue-900' },
        green: { border: 'border-green-400', bg: darkMode ? 'bg-green-900/20' : 'bg-green-50', text: darkMode ? 'text-green-300' : 'text-green-800', titleText: darkMode ? 'text-green-200' : 'text-green-900' },
        yellow: { border: 'border-yellow-400', bg: darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50', text: darkMode ? 'text-yellow-300' : 'text-yellow-800', titleText: darkMode ? 'text-yellow-200' : 'text-yellow-900' },
        purple: { border: 'border-purple-400', bg: darkMode ? 'bg-purple-900/20' : 'bg-purple-50', text: darkMode ? 'text-purple-300' : 'text-purple-800', titleText: darkMode ? 'text-purple-200' : 'text-purple-900' },
        red: { border: 'border-red-400', bg: darkMode ? 'bg-red-900/20' : 'bg-red-50', text: darkMode ? 'text-red-300' : 'text-red-800', titleText: darkMode ? 'text-red-200' : 'text-red-900' },
        orange: { border: 'border-orange-400', bg: darkMode ? 'bg-orange-900/20' : 'bg-orange-50', text: darkMode ? 'text-orange-300' : 'text-orange-800', titleText: darkMode ? 'text-orange-200' : 'text-orange-900' },
    }
    const c = colorMap[block.color] || colorMap.blue
    return (
        <div className={`mt-4 p-4 rounded-xl border-2 ${c.border} ${c.bg}`}>
            {block.title && <div className={`font-bold text-sm mb-2 ${c.titleText}`}>{block.emoji || ''} {tx(block.title, language)}</div>}
            <p className={`text-sm leading-relaxed ${c.text}`}>{tx(block.content, language)}</p>
        </div>
    )
}

// ─── JavaCompareBlock ─────────────────────────────────────────────────────────

function JavaCompareBlock({ block, darkMode }) {
    const { language } = useLanguage()
    const isTr = language === 'tr'
    const isTS = !!block.typescript
    const isSQL = !!block.sql
    const newCode = block.typescript || block.python || block.sql
    const langIcon = isTS ? '🔷' : isSQL ? '🗄️' : '🐍'
    const langLabel = isTS ? "TypeScript'te" : isSQL ? 'Python\'da (DB)' : "Python'da"
    const whyText = typeof block.why === 'object' ? tx(block.why, language) : (isTr ? block.why : (block.why_en ?? block.why))
    const noteText = typeof block.note === 'object' ? tx(block.note, language) : (isTr ? block.note : (block.note_en ?? block.note))
    const whyLabel = isTr ? '🤔 Neden?' : '🤔 Why?'
    return (
        <div className={`mt-6 rounded-xl border-2 overflow-hidden ${darkMode ? 'border-orange-700/60' : 'border-orange-300'}`}>
            <div className={`px-4 py-3 flex items-center gap-2 ${darkMode ? 'bg-orange-900/25' : 'bg-amber-50'}`}>
                <span className="text-xl">☕</span>
                <span className={`font-bold text-sm ${darkMode ? 'text-orange-300' : 'text-orange-800'}`}>{isTr ? 'Java Biliyorsan:' : 'If You Know Java:'}</span>
                <span className={`text-sm font-mono font-semibold ${darkMode ? 'text-orange-200' : 'text-orange-900'}`}>{block.topic}</span>
            </div>
            {whyText && (
                <div className={`px-4 py-3 text-sm border-b ${darkMode ? 'bg-gray-800/80 border-orange-900/30 text-gray-300' : 'bg-white border-orange-100 text-gray-700'}`}>
                    <span className={`font-semibold mr-1 ${darkMode ? 'text-orange-300' : 'text-orange-700'}`}>{whyLabel}</span>
                    {whyText}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className={`border-r ${darkMode ? 'border-gray-700' : 'border-orange-200'}`}>
                    <div className={`px-3 py-1.5 text-xs font-bold ${darkMode ? 'bg-yellow-900/25 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}`}>☕ Java'da</div>
                    <div className="bg-slate-800 p-3 min-h-[80px]">
                        <pre className="font-mono text-xs text-amber-200 overflow-x-auto leading-relaxed">{(block.java || '').trim()}</pre>
                    </div>
                </div>
                <div>
                    <div className={`px-3 py-1.5 text-xs font-bold ${darkMode ? 'bg-blue-900/25 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>{langIcon} {langLabel}</div>
                    <div className="bg-slate-800 p-3 min-h-[80px]">
                        <pre className={`font-mono text-xs overflow-x-auto leading-relaxed ${isTS ? 'text-sky-200' : 'text-emerald-200'}`}>{(newCode || '').trim()}</pre>
                    </div>
                </div>
            </div>
            {noteText && (
                <div className={`px-4 py-2.5 text-xs border-t ${darkMode ? 'bg-gray-800/80 border-orange-900/30 text-gray-400' : 'bg-amber-50 border-orange-100 text-orange-700'}`}>
                    💡 {noteText}
                </div>
            )}
        </div>
    )
}

// ─── PyodideEditor ────────────────────────────────────────────────────────────

function PyodideEditor({ defaultCode, height = '180px' }) {
    const [code, setCode] = useState(defaultCode || '')
    const [output, setOutput] = useState('')
    const [loading, setLoading] = useState(false)
    const [pyReady, setPyReady] = useState(!!window._pyodideInstance)
    const pyRef = useRef(null)

    useEffect(() => {
        if (window._pyodideInstance) { pyRef.current = window._pyodideInstance; setPyReady(true); return }
        if (window._pyodideLoading) { const iv = setInterval(() => { if (window._pyodideInstance) { pyRef.current = window._pyodideInstance; setPyReady(true); clearInterval(iv) } }, 300); return }
        window._pyodideLoading = true
        const s = document.createElement('script')
        s.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js'
        s.onload = () => window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/' }).then(py => { window._pyodideInstance = py; pyRef.current = py; setPyReady(true) })
        document.head.appendChild(s)
    }, [])

    const run = async () => {
        if (!pyRef.current) return
        setLoading(true); setOutput('')
        try {
            pyRef.current.runPython('import sys, io\nsys.stdout = io.StringIO()')
            pyRef.current.runPython(code)
            setOutput(pyRef.current.runPython('sys.stdout.getvalue()') || '(no output)')
        } catch (e) { setOutput('❌ ' + e.message) }
        setLoading(false)
    }

    return (
        <div className="mt-4 rounded-xl overflow-hidden border border-purple-800/40">
            <div style={{ background: '#12121f' }} className="flex items-center justify-between px-3 py-2">
                <span className="text-xs font-mono" style={{ color: '#6c7086' }}>{pyReady ? '🐍 Python — Try it yourself' : '⏳ Loading Python...'}</span>
                <button onClick={run} disabled={!pyReady || loading} style={{ background: pyReady ? '#7c3aed' : '#313148', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 16px', fontSize: '12px', fontWeight: 600, cursor: pyReady ? 'pointer' : 'not-allowed' }}>
                    {loading ? '⏳' : '▶ Run'}
                </button>
            </div>
            <textarea value={code} onChange={e => setCode(e.target.value)} style={{ display: 'block', width: '100%', minHeight: height, background: '#12121f', color: '#cdd6f4', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', border: 'none', padding: '14px 16px', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} spellCheck={false} />
            {output && <pre style={{ margin: 0, padding: '10px 16px', background: '#0d0d1a', color: output.startsWith('❌') ? '#ef4444' : '#10b981', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', borderTop: '1px solid #1e1e3a', whiteSpace: 'pre-wrap' }}>{output}</pre>}
        </div>
    )
}

// ─── TSEditor ─────────────────────────────────────────────────────────────────

function TSEditor({ defaultCode, height = '180px' }) {
    const [code, setCode] = useState(defaultCode || '')
    const [output, setOutput] = useState('')
    const [babelReady, setBabelReady] = useState(!!window.Babel)

    useEffect(() => {
        if (window.Babel) { setBabelReady(true); return }
        const s = document.createElement('script')
        s.src = 'https://unpkg.com/@babel/standalone/babel.min.js'
        s.onload = () => setBabelReady(true)
        document.head.appendChild(s)
    }, [])

    const run = () => {
        setOutput('')
        try {
            const js = window.Babel.transform(code, { filename: 'x.ts', presets: ['typescript'] }).code
            const logs = []
            const fn = new Function('console', js)
            fn({ log: (...a) => logs.push(a.map(x => typeof x === 'object' ? JSON.stringify(x, null, 2) : String(x)).join(' ')), error: (...a) => logs.push('❌ ' + a.join(' ')) })
            setOutput(logs.join('\n') || '(no output)')
        } catch (e) { setOutput('❌ ' + e.message) }
    }

    return (
        <div className="mt-4 rounded-xl overflow-hidden border border-blue-800/40">
            <div style={{ background: '#12121f' }} className="flex items-center justify-between px-3 py-2">
                <span className="text-xs font-mono" style={{ color: '#6c7086' }}>{babelReady ? '🔷 TypeScript — Try it yourself' : '⏳ Loading TypeScript...'}</span>
                <button onClick={run} disabled={!babelReady} style={{ background: babelReady ? '#2563eb' : '#313148', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 16px', fontSize: '12px', fontWeight: 600, cursor: babelReady ? 'pointer' : 'not-allowed' }}>▶ Run</button>
            </div>
            <textarea value={code} onChange={e => setCode(e.target.value)} style={{ display: 'block', width: '100%', minHeight: height, background: '#12121f', color: '#cdd6f4', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', border: 'none', padding: '14px 16px', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} spellCheck={false} />
            {output && <pre style={{ margin: 0, padding: '10px 16px', background: '#0d0d1a', color: output.startsWith('❌') ? '#ef4444' : '#10b981', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', borderTop: '1px solid #1e1e3a', whiteSpace: 'pre-wrap' }}>{output}</pre>}
        </div>
    )
}

// ─── SQLEditor ────────────────────────────────────────────────────────────────

function SQLEditor({ defaultCode, schema, height = '120px' }) {
    const [code, setCode] = useState(defaultCode || '')
    const [output, setOutput] = useState('')
    const [ready, setReady] = useState(!!window._sqlJsInstance)

    useEffect(() => {
        if (window._sqlJsInstance) { setReady(true); return }
        if (window._sqlJsLoading) {
            const iv = setInterval(() => {
                if (window._sqlJsInstance) { setReady(true); clearInterval(iv) }
            }, 300)
            return () => clearInterval(iv)
        }
        window._sqlJsLoading = true
        const s = document.createElement('script')
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.js'
        s.onload = () => {
            window.initSqlJs({ locateFile: f => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${f}` })
                .then(SQL => { window._sqlJsInstance = SQL; setReady(true) })
                .catch(e => { window._sqlJsLoading = false; console.error('sql.js load failed', e) })
        }
        document.head.appendChild(s)
    }, [])

    const run = () => {
        if (!window._sqlJsInstance) return
        try {
            const db = new window._sqlJsInstance.Database()
            if (schema) db.run(schema)
            const results = db.exec(code.trim())
            db.close()
            if (!results.length) {
                setOutput('✅ Query executed. No rows returned.')
                return
            }
            const { columns, values } = results[0]
            const colWidths = columns.map((c, i) => Math.max(c.length, ...values.map(r => String(r[i] ?? '').length)))
            const pad = (s, w) => String(s ?? '').padEnd(w)
            const sep = colWidths.map(w => '-'.repeat(w)).join('-+-')
            const header = columns.map((c, i) => pad(c, colWidths[i])).join(' | ')
            const rows = values.map(r => r.map((v, i) => pad(v, colWidths[i])).join(' | ')).join('\n')
            setOutput(`${header}\n${sep}\n${rows}\n\n(${values.length} row${values.length !== 1 ? 's' : ''})`)
        } catch (e) {
            setOutput('❌ ' + e.message)
        }
    }

    return (
        <div className="mt-4 rounded-xl overflow-hidden border border-cyan-800/40">
            <div style={{ background: '#0c1a2e' }} className="flex items-center justify-between px-3 py-2">
                <span className="text-xs font-mono" style={{ color: '#6c7086' }}>
                    {ready ? '🗄️ SQL — Try it yourself' : '⏳ Loading SQL engine...'}
                </span>
                <button onClick={run} disabled={!ready}
                    style={{ background: ready ? '#0369a1' : '#313148', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 16px', fontSize: '12px', fontWeight: 600, cursor: ready ? 'pointer' : 'not-allowed' }}>
                    ▶ Run
                </button>
            </div>
            <textarea value={code} onChange={e => setCode(e.target.value)} spellCheck={false}
                style={{ display: 'block', width: '100%', minHeight: height, background: '#0c1a2e', color: '#7dd3fc', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', border: 'none', padding: '14px 16px', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} />
            {output && (
                <pre style={{ margin: 0, padding: '10px 16px', background: '#060f1e', color: output.startsWith('❌') ? '#ef4444' : '#10b981', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', borderTop: '1px solid #1e3a5f', whiteSpace: 'pre-wrap', overflowX: 'auto' }}>
                    {output}
                </pre>
            )}
        </div>
    )
}

// ─── Bilingual content helper ─────────────────────────────────────────────────

const tx = (val, lang) => {
    if (!val) return ''
    if (typeof val === 'string') return val
    return val[lang] || val.en || val.tr || ''
}

// ─── ScrollProgressBar ────────────────────────────────────────────────────────

function ScrollProgressBar() {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const update = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement
            const pct = (scrollTop / (scrollHeight - clientHeight)) * 100
            setProgress(Math.min(100, Math.max(0, pct)))
        }
        window.addEventListener('scroll', update, { passive: true })
        return () => window.removeEventListener('scroll', update)
    }, [])
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'transparent', zIndex: 9999 }}>
            <div style={{
                height: '100%', width: `${progress}%`,
                background: 'linear-gradient(90deg, #7c3aed, #10b981)',
                transition: 'width 0.1s linear',
            }} />
        </div>
    )
}

// ─── HomeButton ───────────────────────────────────────────────────────────────

function HomeButton() {
    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Başa dön / Back to top"
            style={{
                position: 'fixed', bottom: '16px', right: '16px',
                width: '44px', height: '44px', borderRadius: '50%',
                background: '#7c3aed', color: '#fff', border: 'none',
                cursor: 'pointer', fontSize: '22px', zIndex: 999,
                boxShadow: '0 4px 16px rgba(124,58,237,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(124,58,237,0.7)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,58,237,0.5)' }}
        >
            🏠
        </button>
    )
}

// ─── QuizFillBlock ────────────────────────────────────────────────────────────

function QuizFillBlock({ block, darkMode }) {
    const { language } = useLanguage()
    const [userAnswer, setUserAnswer] = useState('')
    const [checked, setChecked] = useState(false)
    const isCorrect = userAnswer.trim().toLowerCase() === (block.answer || '').toLowerCase()
    return (
        <div className={`mt-6 p-5 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-teal-700' : 'bg-teal-50 border-teal-200'}`}>
            <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">✏️</span>
                <span className={`font-bold text-sm ${darkMode ? 'text-teal-300' : 'text-teal-700'}`}>Boşluk Doldur</span>
            </div>
            <p className={`text-sm font-semibold mb-4 leading-relaxed ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {tx(block.instruction, language)}
            </p>
            <div className="flex gap-3 items-center flex-wrap">
                <input
                    type="text"
                    value={userAnswer}
                    onChange={e => { setUserAnswer(e.target.value); setChecked(false) }}
                    placeholder={tx(block.hint, language) || 'Cevabınızı yazın...'}
                    className={`px-3 py-2 rounded-lg border text-sm font-mono min-w-[160px] outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'}`}
                    onKeyDown={e => e.key === 'Enter' && setChecked(true)}
                />
                <button
                    onClick={() => setChecked(true)}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-500 transition-colors"
                >
                    Kontrol Et →
                </button>
            </div>
            {checked && (
                <div className={`mt-3 p-3 rounded-lg text-sm font-medium ${isCorrect
                    ? (darkMode ? 'bg-green-900/30 text-green-300 border border-green-700' : 'bg-green-50 text-green-700 border border-green-200')
                    : (darkMode ? 'bg-red-900/30 text-red-300 border border-red-700' : 'bg-red-50 text-red-700 border border-red-200')
                }`}>
                    {isCorrect ? `✅ Doğru! Cevap: "${block.answer}"` : `❌ Yanlış. Doğru cevap: "${block.answer}"`}
                </div>
            )}
        </div>
    )
}

// ─── InterviewQuestionsBlock ──────────────────────────────────────────────────

function InterviewQuestionsBlock({ block, darkMode }) {
    const { language } = useLanguage()
    const isTr = language === 'tr'
    const levelConfig = {
        basic:        { label: isTr ? '🟢 Temel'       : '🟢 Basic',        color: darkMode ? 'text-green-400'  : 'text-green-700' },
        intermediate: { label: isTr ? '🟡 Orta Seviye' : '🟡 Intermediate', color: darkMode ? 'text-yellow-400' : 'text-yellow-700' },
        advanced:     { label: isTr ? '🔴 İleri Seviye': '🔴 Advanced',     color: darkMode ? 'text-red-400'    : 'text-red-700' },
    }
    return (
        <div className="mt-6">
            <div className={`flex items-center gap-2 mb-4 pb-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <span className="text-xl">💼</span>
                <h4 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {block.topic} — {isTr ? 'Mülakat Soruları' : 'Interview Questions'}
                </h4>
            </div>
            {['basic', 'intermediate', 'advanced'].map(level => {
                const qs = block.questions?.filter(q => q.level === level)
                if (!qs?.length) return null
                const cfg = levelConfig[level]
                return (
                    <div key={level} className="mb-5">
                        <div className={`text-xs font-bold uppercase tracking-wide mb-3 ${cfg.color}`}>{cfg.label}</div>
                        {qs.map((q, j) => (
                            <QAItem
                                key={j}
                                question={tx(q.q, language)}
                                answer={tx(q.a, language)}
                                code={q.code}
                                darkMode={darkMode}
                            />
                        ))}
                    </div>
                )
            })}
        </div>
    )
}

// ─── ErrorDictionaryBlock ─────────────────────────────────────────────────────

function ErrorDictionaryBlock({ block, darkMode }) {
    const { language } = useLanguage()
    const isTr = language === 'tr'
    return (
        <div className="mt-6">
            <div className={`flex items-center gap-2 mb-4 pb-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <span className="text-xl">🚨</span>
                <h4 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {block.framework} — {isTr ? 'Hata Sözlüğü' : 'Error Dictionary'}
                </h4>
            </div>
            <div className="space-y-4">
                {block.errors?.map((err, j) => (
                    <div key={j} className={`rounded-xl border overflow-hidden ${darkMode ? 'border-red-900/50' : 'border-red-200'}`}>
                        <div className={`px-4 py-2.5 font-mono text-sm font-bold ${darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-700'}`}>
                            ❌ {err.error}
                        </div>
                        {err.fullMessage && (
                            <div className={`px-4 py-2 text-xs font-mono border-b ${darkMode ? 'bg-gray-900 text-gray-500 border-gray-800' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>
                                {err.fullMessage}
                            </div>
                        )}
                        <div className={`px-4 py-3 grid grid-cols-1 md:grid-cols-2 gap-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <div>
                                <div className={`text-xs font-bold mb-1 uppercase tracking-wide ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>⚡ {isTr ? 'Sebep' : 'Cause'}</div>
                                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{tx(err.cause, language)}</p>
                            </div>
                            <div>
                                <div className={`text-xs font-bold mb-1 uppercase tracking-wide ${darkMode ? 'text-green-400' : 'text-green-700'}`}>✅ {isTr ? 'Çözüm' : 'Solution'}</div>
                                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{tx(err.solution, language)}</p>
                            </div>
                        </div>
                        {(err.codeWrong || err.codeFixed) && (
                            <div className={`px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-3 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                                {err.codeWrong && (
                                    <div>
                                        <div className="text-xs font-bold text-red-400 mb-1">❌ {isTr ? 'Yanlış:' : 'Wrong:'}</div>
                                        <CodeBlock code={err.codeWrong} darkMode={darkMode} />
                                    </div>
                                )}
                                {err.codeFixed && (
                                    <div>
                                        <div className="text-xs font-bold text-green-400 mb-1">✅ {isTr ? 'Doğru:' : 'Fixed:'}</div>
                                        <CodeBlock code={err.codeFixed} darkMode={darkMode} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── QAItem ───────────────────────────────────────────────────────────────────

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

// ─── LocatorVisualBlock ───────────────────────────────────────────────────────

function LocatorVisualBlock({ block, darkMode, language }) {
    const [activeIdx, setActiveIdx] = useState(0)
    const isTr = language === 'tr'
    const loc = block.locators[activeIdx]

    const highlightHtml = (html, highlights) => {
        if (!highlights || highlights.length === 0) return html
        let result = html
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
        highlights.forEach(h => {
            const escaped = h.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            result = result.replace(
                new RegExp(escaped.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
                `<mark style="background:${loc.color}33;color:${loc.color};border-radius:3px;padding:0 2px;font-weight:700">${escaped}</mark>`
            )
        })
        return result
    }

    return (
        <div className={`mt-6 rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
            {/* Tab bar */}
            <div className={`flex overflow-x-auto gap-1 px-3 py-2 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`} style={{ scrollbarWidth: 'none' }}>
                {block.locators.map((l, idx) => (
                    <button
                        key={l.id}
                        onClick={() => setActiveIdx(idx)}
                        className={`flex-shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 whitespace-nowrap border ${
                            activeIdx === idx
                                ? 'text-white shadow-md scale-105 border-transparent'
                                : darkMode ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                        style={activeIdx === idx ? { background: l.color } : {}}
                    >
                        {l.label}
                        <span className="ml-1 text-[10px]">{l.starRating}</span>
                    </button>
                ))}
            </div>

            <div className="p-4 md:p-5 grid md:grid-cols-2 gap-4 md:gap-6">
                {/* HTML Preview */}
                <div>
                    <div className={`text-xs font-semibold mb-2 uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>HTML</div>
                    <pre
                        className={`text-xs leading-relaxed p-3 rounded-xl overflow-x-auto ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-700'}`}
                        style={{ border: `2px solid ${loc.color}44`, fontFamily: 'JetBrains Mono, monospace' }}
                        dangerouslySetInnerHTML={{ __html: highlightHtml(block.htmlExample, loc.highlights) }}
                    />
                    <div className={`mt-3 flex flex-wrap gap-2`}>
                        <span className={`px-2 py-1 rounded text-xs font-bold`} style={{ background: loc.color + '22', color: loc.color }}>
                            Priority #{loc.priority}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                            {isTr ? (loc.title || '') : (loc.titleEn || loc.title || '')}
                        </span>
                    </div>
                    <div className={`mt-3 px-3 py-2 rounded-lg text-xs leading-relaxed ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
                        {isTr ? (loc.explanation || '') : (loc.explanationEn || loc.explanation || '')}
                    </div>
                </div>

                {/* Code + tip + when */}
                <div>
                    <div className={`text-xs font-semibold mb-2 uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{block.codeLabel || 'Java'}</div>
                    <CodeBlock code={loc.code} language="java" darkMode={darkMode} />
                    {(loc.when || loc.whenEn) && (
                        <div className={`mt-3 px-3 py-2 rounded-lg text-xs ${darkMode ? 'bg-indigo-900/40 text-indigo-300 border border-indigo-800' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'}`}>
                            <span className="font-bold">📌 {isTr ? 'Ne zaman?' : 'When?'}</span> {isTr ? (loc.when || '') : (loc.whenEn || loc.when || '')}
                        </div>
                    )}
                    {(loc.tip || loc.tipEn) && (
                        <div className={`mt-2 px-3 py-2 rounded-lg text-xs leading-relaxed ${darkMode ? 'bg-gray-800 text-yellow-300 border border-yellow-900' : 'bg-yellow-50 text-yellow-800 border border-yellow-200'}`}>
                            {isTr ? (loc.tip || '') : (loc.tipEn || loc.tip || '')}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// ─── SeleniumVisualBlock ──────────────────────────────────────────────────────

function SeleniumVisualBlock({ block, darkMode, language }) {
    const [activeStep, setActiveStep] = useState(0)
    const isTr = language === 'tr'
    const step = block.steps[activeStep]
    const accent = block.color || '#7c3aed'

    const DropdownVisual = ({ state }) => {
        const opts = [
            { value: 'tr', text: 'Türkiye' },
            { value: 'us', text: 'USA' },
            { value: 'de', text: 'Germany' },
            { value: 'jp', text: 'Japan' },
        ]
        const selectedVal = step.selectedValue || 'tr'
        return (
            <div style={{ fontFamily: 'monospace', fontSize: 13 }}>
                <div style={{ marginBottom: 8, color: accent, fontWeight: 700 }}>{'<select id="country">'}</div>
                <div style={{
                    border: `2px solid ${accent}`,
                    borderRadius: 8,
                    overflow: 'hidden',
                    maxWidth: 220,
                    boxShadow: `0 0 12px ${accent}44`,
                    transition: 'all 0.3s',
                }}>
                    {(state === 'wrap' ? [opts[0]] : opts).map((opt, idx) => (
                        <div key={opt.value} style={{
                            padding: '7px 14px',
                            background: (state !== 'wrap' && (
                                (state === 'byText' || state === 'byValue' || state === 'byIndex' || state === 'firstSelected' || state === 'getOptions')
                                && opt.value === selectedVal && state !== 'getOptions'
                            )) ? accent : (darkMode ? '#1f2937' : '#fff'),
                            color: (state !== 'wrap' && opt.value === selectedVal && state !== 'getOptions')
                                ? '#fff'
                                : (darkMode ? '#d1d5db' : '#374151'),
                            borderBottom: idx < (state === 'wrap' ? 0 : 3) ? `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` : 'none',
                            transition: 'background 0.3s',
                            fontWeight: opt.value === selectedVal ? 700 : 400,
                        }}>
                            {state === 'getOptions' ? `[${idx}] ${opt.text} (value="${opt.value}")` : opt.text}
                        </div>
                    ))}
                </div>
                {state === 'wrap' && (
                    <div style={{ marginTop: 8, color: darkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }}>
                        → Select sınıfına sarılıyor...
                    </div>
                )}
            </div>
        )
    }

    const AlertVisual = ({ state }) => {
        const types = {
            page: { bg: darkMode ? '#1f2937' : '#f3f4f6', border: '#6b7280', msg: isTr ? 'Sayfa yüklendi' : 'Page loaded', icon: '🌐' },
            alert: { bg: '#fef3c7', border: '#f59e0b', msg: isTr ? 'Giriş başarılı!' : 'Login successful!', icon: '⚠️' },
            confirm: { bg: '#fee2e2', border: '#ef4444', msg: isTr ? 'Sepeti temizlemek istediğinize emin misiniz?' : 'Are you sure you want to clear the cart?', icon: '❓', twoBtn: true },
            prompt: { bg: '#ede9fe', border: '#8b5cf6', msg: isTr ? 'Kupon kodunu girin:' : 'Enter coupon code:', icon: '✏️', input: true },
            accept: { bg: '#d1fae5', border: '#10b981', msg: 'OK ✓', icon: '✅' },
            dismiss: { bg: '#fee2e2', border: '#ef4444', msg: isTr ? 'Cancel / İptal ✓' : 'Cancel ✓', icon: '❌' },
        }
        const t = types[state] || types['page']
        const isOverlay = ['alert', 'confirm', 'prompt', 'accept', 'dismiss'].includes(state)
        return (
            <div style={{ position: 'relative', maxWidth: 280 }}>
                <div style={{
                    padding: '10px 16px',
                    borderRadius: 8,
                    background: darkMode ? '#1f2937' : '#f9fafb',
                    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    fontSize: 12,
                    marginBottom: isOverlay ? 8 : 0,
                    opacity: isOverlay ? 0.4 : 1,
                }}>
                    🌐 {isTr ? 'Ana Sayfa İçeriği' : 'Main Page Content'}
                </div>
                {isOverlay && (
                    <div style={{
                        padding: '12px 16px',
                        borderRadius: 8,
                        background: t.bg,
                        border: `2px solid ${t.border}`,
                        boxShadow: `0 4px 20px ${t.border}44`,
                        animation: 'fadeIn 0.3s ease',
                        fontSize: 12,
                    }}>
                        <div style={{ fontWeight: 700, marginBottom: 6, color: '#1f2937' }}>{t.icon} {t.msg}</div>
                        {t.input && (
                            <input readOnly value="SAVE20" style={{
                                border: `1px solid ${t.border}`,
                                borderRadius: 4,
                                padding: '4px 8px',
                                width: '100%',
                                marginBottom: 8,
                                fontSize: 12,
                                background: '#fff',
                            }} />
                        )}
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button style={{ padding: '4px 14px', borderRadius: 4, background: t.border, color: '#fff', border: 'none', fontSize: 11, cursor: 'default' }}>OK</button>
                            {t.twoBtn && <button style={{ padding: '4px 14px', borderRadius: 4, background: '#6b7280', color: '#fff', border: 'none', fontSize: 11, cursor: 'default' }}>{isTr ? 'İptal' : 'Cancel'}</button>}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    const IframeVisual = ({ state }) => {
        const states = {
            outer: { innerOpacity: 0.3, innerBorder: '#6b7280', innerLabel: '🚫 Erişim Yok', outerActive: true },
            'switch-by-id': { innerOpacity: 0.6, innerBorder: accent, innerLabel: '⏳ Geçiş...', outerActive: false },
            inner: { innerOpacity: 1, innerBorder: accent, innerLabel: '✅ Frame İçi', outerActive: false },
            nested: { innerOpacity: 1, innerBorder: '#8b5cf6', innerLabel: '🔀 Nested', outerActive: false, nested: true },
            back: { innerOpacity: 0.3, innerBorder: '#6b7280', innerLabel: '← Dış Sayfa', outerActive: true },
            parent: { innerOpacity: 0.6, innerBorder: accent, innerLabel: '↑ Parent Frame', outerActive: false },
        }
        const s = states[state] || states['outer']
        return (
            <div style={{ maxWidth: 260, fontFamily: 'monospace', fontSize: 11 }}>
                <div style={{
                    padding: 10, borderRadius: 8,
                    border: `2px solid ${s.outerActive ? accent : (darkMode ? '#374151' : '#d1d5db')}`,
                    background: darkMode ? '#111827' : '#f9fafb',
                    boxShadow: s.outerActive ? `0 0 12px ${accent}44` : 'none',
                    transition: 'all 0.3s',
                }}>
                    <div style={{ color: s.outerActive ? accent : (darkMode ? '#6b7280' : '#9ca3af'), fontWeight: s.outerActive ? 700 : 400, marginBottom: 6 }}>
                        {s.outerActive ? '✅ ' : ''}🌐 {isTr ? 'Ana Sayfa' : 'Main Page'}
                    </div>
                    <div style={{
                        padding: 8, borderRadius: 6,
                        border: `2px solid ${s.innerBorder}`,
                        background: darkMode ? '#1f2937' : '#fff',
                        opacity: s.innerOpacity,
                        boxShadow: s.innerOpacity === 1 ? `0 0 10px ${s.innerBorder}44` : 'none',
                        transition: 'all 0.4s',
                    }}>
                        <div style={{ color: s.innerBorder, fontWeight: 700, marginBottom: s.nested ? 4 : 0 }}>
                            🖼️ iframe.payment-frame — {s.innerLabel}
                        </div>
                        {s.nested && (
                            <div style={{ padding: 6, border: `1px dashed #8b5cf6`, borderRadius: 4, marginTop: 4, color: '#8b5cf6', fontSize: 10 }}>
                                🔲 iframe#captchaFrame (nested)
                            </div>
                        )}
                        {s.innerOpacity === 1 && !s.nested && (
                            <div style={{ fontSize: 10, color: darkMode ? '#9ca3af' : '#6b7280', marginTop: 4 }}>
                                💳 cardNumber · cvv · expiry
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    const WindowVisual = ({ state }) => {
        const wins = [
            { id: 'main', label: isTr ? '🏠 Ana Pencere' : '🏠 Main Window', color: accent },
            { id: 'popup', label: isTr ? '🆕 Popup / Sekme' : '🆕 Popup / Tab', color: '#10b981' },
            { id: 'third', label: isTr ? '3️⃣ Üçüncü' : '3️⃣ Third', color: '#f59e0b' },
        ]
        const activeWins = {
            single: ['main'],
            'multiple': ['main', 'popup'],
            'switch': ['popup'],
            'new-tab': ['main', 'popup'],
            'close': ['main'],
            'handle-set': ['main', 'popup', 'third'],
        }
        const active = activeWins[state] || ['main']
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 240, fontFamily: 'monospace', fontSize: 11 }}>
                {wins.slice(0, state === 'handle-set' ? 3 : state === 'single' || state === 'close' ? 1 : 2).map(w => (
                    <div key={w.id} style={{
                        padding: '7px 12px',
                        borderRadius: 8,
                        border: `2px solid ${active.includes(w.id) ? w.color : (darkMode ? '#374151' : '#d1d5db')}`,
                        background: active.includes(w.id) ? (darkMode ? '#111827' : '#f9fafb') : (darkMode ? '#1f2937' : '#fff'),
                        boxShadow: active.includes(w.id) ? `0 0 10px ${w.color}44` : 'none',
                        color: active.includes(w.id) ? w.color : (darkMode ? '#6b7280' : '#9ca3af'),
                        fontWeight: active.includes(w.id) ? 700 : 400,
                        transition: 'all 0.3s',
                    }}>
                        {active.includes(w.id) ? '▶ ' : '  '}{w.label}
                        {active.includes(w.id) && <span style={{ fontSize: 9, marginLeft: 6, opacity: 0.7 }}>← active</span>}
                    </div>
                ))}
            </div>
        )
    }

    const ActionsVisual = ({ state }) => {
        const cursor = { position: 'absolute', fontSize: 18, transition: 'all 0.5s cubic-bezier(.4,0,.2,1)', pointerEvents: 'none' }
        const positions = {
            idle:       { top: '50%', left: '50%' },
            hover:      { top: '28%', left: '50%' },
            submenu:    { top: '50%', left: '65%' },
            dblclick:   { top: '50%', left: '50%' },
            rightclick: { top: '50%', left: '50%' },
            drag:       { top: '50%', left: '60%' },
            keyboard:   { top: '50%', left: '50%' },
        }
        const pos = positions[state] || positions['idle']
        return (
            <div style={{ position: 'relative', width: 220, height: 160, margin: '0 auto' }}>
                {/* Nav bar simulation */}
                <div style={{
                    position: 'absolute', top: 16, left: 0, right: 0,
                    background: accent, borderRadius: 8, padding: '8px 14px',
                    display: 'flex', gap: 16, alignItems: 'center',
                }}>
                    {['Home', 'Products', 'About'].map(m => (
                        <span key={m} style={{
                            color: '#fff', fontSize: 11, fontWeight: m === 'Products' ? 700 : 400,
                            padding: '2px 6px', borderRadius: 4,
                            background: (state === 'hover' || state === 'submenu') && m === 'Products' ? 'rgba(255,255,255,0.2)' : 'transparent',
                            transition: 'background 0.3s',
                        }}>{m}</span>
                    ))}
                </div>
                {/* Submenu */}
                {(state === 'submenu') && (
                    <div style={{
                        position: 'absolute', top: 50, left: 80,
                        background: darkMode ? '#1f2937' : '#fff',
                        border: `2px solid ${accent}`,
                        borderRadius: 6, padding: '4px 0',
                        boxShadow: `0 4px 16px ${accent}44`,
                        animation: 'fadeIn 0.2s ease',
                        zIndex: 10,
                    }}>
                        {['Laptops', 'Phones', 'Tablets'].map(s => (
                            <div key={s} style={{ padding: '4px 14px', fontSize: 11, color: darkMode ? '#e5e7eb' : '#374151' }}>{s}</div>
                        ))}
                    </div>
                )}
                {/* Draggable / droppable */}
                {(state === 'drag') && (
                    <div style={{ position: 'absolute', top: 80, left: 0, right: 0, display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: 48, height: 36, borderRadius: 6, background: `${accent}bb`, border: `2px dashed ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', fontWeight: 700, transform: 'translateX(20px)', transition: 'transform 0.5s' }}>DRAG</div>
                        <span style={{ color: accent, fontWeight: 700 }}>→</span>
                        <div style={{ width: 56, height: 40, borderRadius: 6, border: `2px solid ${accent}`, background: `${accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: accent, fontWeight: 700 }}>DROP</div>
                    </div>
                )}
                {/* Keyboard */}
                {state === 'keyboard' && (
                    <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
                        {['Ctrl', 'A', '→', 'Del'].map(k => (
                            <div key={k} style={{
                                padding: '4px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700,
                                background: accent, color: '#fff',
                                boxShadow: `0 2px 0 ${accent}88`,
                                animation: 'pulse 1s infinite',
                            }}>{k}</div>
                        ))}
                    </div>
                )}
                {/* Double click ripple */}
                {state === 'dblclick' && (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                        <div style={{ width: 50, height: 50, borderRadius: '50%', border: `2px solid ${accent}`, animation: 'ping 0.6s ease-out', opacity: 0.6 }} />
                        <div style={{ width: 30, height: 30, borderRadius: '50%', border: `2px solid ${accent}`, animation: 'ping 0.6s ease-out 0.15s', opacity: 0.4, position: 'absolute', top: 10, left: 10 }} />
                    </div>
                )}
                {/* Right-click context menu */}
                {state === 'rightclick' && (
                    <div style={{
                        position: 'absolute', top: 60, left: 80,
                        background: darkMode ? '#1f2937' : '#fff',
                        border: `1px solid ${darkMode ? '#374151' : '#d1d5db'}`,
                        borderRadius: 6, padding: '4px 0',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                        animation: 'fadeIn 0.2s ease',
                        minWidth: 90,
                    }}>
                        {['✂️ Cut', '📋 Copy', '🗑️ Delete'].map(m => (
                            <div key={m} style={{ padding: '4px 14px', fontSize: 11, color: m.includes('Delete') ? '#ef4444' : (darkMode ? '#e5e7eb' : '#374151') }}>{m}</div>
                        ))}
                    </div>
                )}
                {/* Cursor */}
                {state !== 'drag' && state !== 'keyboard' && (
                    <div style={{ ...cursor, ...pos, transform: 'translate(-50%,-50%)' }}>🖱️</div>
                )}
            </div>
        )
    }

    const JSExecutorVisual = ({ state }) => {
        const pageH = 180
        const visibleH = 70
        const scrollPct = { idle: 0, scrollTo: 85, scrollBy: 40, scrollIntoView: 70, jsClick: 0, setValue: 0 }
        const pct = scrollPct[state] ?? 0
        return (
            <div style={{ position: 'relative', width: 200, margin: '0 auto' }}>
                {/* Browser frame */}
                <div style={{ borderRadius: 8, border: `2px solid ${accent}`, overflow: 'hidden', background: darkMode ? '#111827' : '#f9fafb' }}>
                    {/* URL bar */}
                    <div style={{ background: accent, padding: '4px 10px', fontSize: 10, color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>⚡ JS Executor</span>
                    </div>
                    {/* Scrollable page */}
                    <div style={{ height: visibleH, overflow: 'hidden', position: 'relative' }}>
                        <div style={{
                            transform: `translateY(-${pct}%)`,
                            transition: 'transform 0.5s ease',
                            padding: 8,
                        }}>
                            {/* Page sections */}
                            {['🏠 Header', '📦 Section 1', '🛒 Section 2', '📧 Footer'].map((s, idx) => (
                                <div key={idx} style={{
                                    padding: '6px 8px', borderRadius: 4, marginBottom: 4, fontSize: 10,
                                    background: (state === 'scrollIntoView' && idx === 3) ? `${accent}33` : (darkMode ? '#1f2937' : '#fff'),
                                    border: `1px solid ${(state === 'scrollIntoView' && idx === 3) ? accent : (darkMode ? '#374151' : '#e5e7eb')}`,
                                    color: darkMode ? '#d1d5db' : '#374151',
                                    fontWeight: (state === 'scrollIntoView' && idx === 3) ? 700 : 400,
                                    boxShadow: (state === 'jsClick' && idx === 0) ? `0 0 8px ${accent}88` : 'none',
                                    transition: 'all 0.4s',
                                }}>
                                    {state === 'jsClick' && idx === 0 ? `${s} ← JS click!` : s}
                                    {state === 'setValue' && idx === 1 ? ' → test@test.com' : ''}
                                </div>
                            ))}
                        </div>
                        {/* Scroll indicator */}
                        {pct > 0 && (
                            <div style={{
                                position: 'absolute', right: 2, top: `${(pct / 100) * 60}%`,
                                width: 3, height: 20, background: accent, borderRadius: 2,
                                transition: 'top 0.5s ease',
                            }} />
                        )}
                    </div>
                </div>
                {/* Label */}
                <div style={{ marginTop: 8, textAlign: 'center', fontSize: 11, color: accent, fontWeight: 700 }}>
                    {state === 'idle' ? (isTr ? '⚡ Hazır' : '⚡ Ready') :
                     state === 'scrollTo' ? 'scrollTo(0, body.scrollHeight)' :
                     state === 'scrollBy' ? 'scrollBy(0, 500)' :
                     state === 'scrollIntoView' ? 'scrollIntoView(true)' :
                     state === 'jsClick' ? 'arguments[0].click()' :
                     state === 'setValue' ? 'arguments[0].value=...' : ''}
                </div>
            </div>
        )
    }

    const renderVisual = () => {
        const vs = step.visualState
        switch (block.concept) {
            case 'dropdown':    return <DropdownVisual state={vs} />
            case 'alert':       return <AlertVisual state={vs} />
            case 'iframe':      return <IframeVisual state={vs} />
            case 'window':      return <WindowVisual state={vs} />
            case 'actions':     return <ActionsVisual state={vs} />
            case 'js-executor': return <JSExecutorVisual state={vs} />
            default: return null
        }
    }

    return (
        <div key={`sv-${block.concept}`} className={`mt-6 rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`} style={{ boxShadow: `0 0 24px ${accent}22` }}>
            {/* Header */}
            <div style={{ background: accent }} className="px-4 py-3 flex items-center gap-3">
                <span className="text-2xl">{block.icon}</span>
                <span className="text-white font-bold text-sm md:text-base">{isTr ? block.title.tr : block.title.en}</span>
            </div>

            {/* Step tabs */}
            <div className={`flex overflow-x-auto gap-1 px-3 py-2 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`} style={{ scrollbarWidth: 'none' }}>
                {block.steps.map((s, idx) => (
                    <button
                        key={s.id}
                        onClick={() => setActiveStep(idx)}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                            activeStep === idx
                                ? 'text-white shadow-md scale-105'
                                : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                        style={activeStep === idx ? { background: accent } : {}}
                    >
                        {isTr ? s.label : (s.labelEn || s.label)}
                    </button>
                ))}
            </div>

            {/* Body */}
            <div className="p-4 md:p-5 grid md:grid-cols-2 gap-4 md:gap-6 items-start">
                {/* Visual */}
                <div className={`rounded-xl p-4 flex items-center justify-center min-h-[160px] ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`} style={{ border: `1px solid ${accent}44` }}>
                    {renderVisual()}
                </div>

                {/* Text + Code */}
                <div>
                    <p className={`text-sm leading-relaxed mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? step.description.tr : step.description.en}
                    </p>
                    <CodeBlock code={step.code} language="java" darkMode={darkMode} />
                    {step.tip && (
                        <div className={`mt-3 px-3 py-2 rounded-lg text-xs leading-relaxed ${darkMode ? 'bg-gray-800 text-yellow-300 border border-yellow-900' : 'bg-yellow-50 text-yellow-800 border border-yellow-200'}`}>
                            {isTr ? step.tip.tr : step.tip.en}
                        </div>
                    )}
                </div>
            </div>

            {/* Step counter */}
            <div className={`px-4 py-2 flex items-center justify-between border-t text-xs ${darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
                <button onClick={() => setActiveStep(Math.max(0, activeStep - 1))} disabled={activeStep === 0} className="px-3 py-1 rounded disabled:opacity-30 hover:opacity-80 transition" style={{ background: accent, color: '#fff' }}>← {isTr ? 'Önceki' : 'Prev'}</button>
                <span>{activeStep + 1} / {block.steps.length}</span>
                <button onClick={() => setActiveStep(Math.min(block.steps.length - 1, activeStep + 1))} disabled={activeStep === block.steps.length - 1} className="px-3 py-1 rounded disabled:opacity-30 hover:opacity-80 transition" style={{ background: accent, color: '#fff' }}>{isTr ? 'Sonraki' : 'Next'} →</button>
            </div>
        </div>
    )
}

// ─── PlaywrightVisualBlock ────────────────────────────────────────────────────

function PlaywrightVisualBlock({ block, darkMode, language }) {
    const [activeStep, setActiveStep] = useState(0)
    const isTr = language === 'tr'
    const step = block.steps[activeStep]
    const accent = block.color || '#0ea5e9'

    const AutoWaitVisual = ({ state }) => {
        const phases = [
            { id: 'check', label: isTr ? 'Element Kontrol' : 'Check Element' },
            { id: 'retry', label: isTr ? 'Tekrar Dene' : 'Retry' },
            { id: 'found', label: isTr ? 'Bulundu!' : 'Found!' },
        ]
        const showPhases = { 'selenium-way': [], 'pw-way': ['check'], retry: ['check', 'retry'], found: ['check', 'retry', 'found'], timeout: ['check', 'retry'] }
        const active = showPhases[state] || []
        if (state === 'selenium-way') {
            return (
                <div style={{ fontFamily: 'monospace', fontSize: 11, maxWidth: 280 }}>
                    <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: 8 }}>⚠️ Selenium: Manuel Bekleme</div>
                    {[
                        'WebDriverWait(driver, 30)',
                        'ExpectedConditions.visibilityOf(...)',
                        '.until(...) → element bul',
                        'Her action için tekrar yaz!',
                    ].map((txt, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, padding: '5px 10px', borderRadius: 6, background: darkMode ? '#1f2937' : '#f9fafb', border: `1px solid ${idx === 3 ? '#ef444444' : (darkMode ? '#374151' : '#e5e7eb')}`, color: idx === 3 ? '#ef4444' : (darkMode ? '#9ca3af' : '#6b7280'), fontSize: 11 }}>
                            <span>{['1️⃣','2️⃣','3️⃣','⛔'][idx]}</span><span>{txt}</span>
                        </div>
                    ))}
                </div>
            )
        }
        return (
            <div style={{ maxWidth: 260, fontFamily: 'monospace', fontSize: 11 }}>
                <div style={{ color: accent, fontWeight: 700, marginBottom: 8 }}>✅ Playwright: Auto-Wait</div>
                {phases.map((phase, idx) => {
                    const isActive = active.includes(phase.id)
                    const isTimeout = state === 'timeout' && phase.id === 'retry'
                    const phaseColor = phase.id === 'found' ? '#10b981' : isTimeout ? '#ef4444' : accent
                    return (
                        <div key={phase.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                            <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isActive ? phaseColor : (darkMode ? '#374151' : '#e5e7eb'), color: isActive ? '#fff' : (darkMode ? '#6b7280' : '#9ca3af'), fontWeight: 700, fontSize: 12, flexShrink: 0, boxShadow: isActive ? `0 0 8px ${phaseColor}66` : 'none', transition: 'all 0.4s' }}>
                                {phase.id === 'found' ? '✓' : isTimeout ? '✗' : idx + 1}
                            </div>
                            <div style={{ flex: 1, padding: '4px 8px', borderRadius: 5, background: isActive ? (darkMode ? '#111827' : '#f0f9ff') : (darkMode ? '#1f2937' : '#f9fafb'), border: `1px solid ${isActive ? phaseColor : (darkMode ? '#374151' : '#e5e7eb')}`, color: isActive ? (darkMode ? '#e5e7eb' : '#111827') : (darkMode ? '#6b7280' : '#9ca3af'), transition: 'all 0.4s' }}>
                                {phase.label}
                                {isActive && <span style={{ marginLeft: 6, fontSize: 9, color: phaseColor }}>{phase.id === 'check' ? '→ bekle' : phase.id === 'retry' ? (isTimeout ? '30s → TimeoutError!' : '← tekrar') : '← hazır!'}</span>}
                            </div>
                        </div>
                    )
                })}
                {state === 'found' && <div style={{ marginTop: 6, color: '#10b981', fontWeight: 700, fontSize: 11 }}>✅ {isTr ? 'Extra kod yazmana gerek yok!' : 'No extra code needed!'}</div>}
                {state === 'timeout' && <div style={{ marginTop: 6, color: '#ef4444', fontSize: 11 }}>⏱️ TimeoutError: 30s içinde bulunamadı</div>}
            </div>
        )
    }

    const SelectOptionVisual = ({ state }) => {
        const opts = [{ value: 'tr', text: 'Türkiye' }, { value: 'us', text: 'USA' }, { value: 'de', text: 'Germany' }, { value: 'jp', text: 'Japan' }]
        const selectedVal = step.selectedValue || 'tr'
        return (
            <div style={{ fontFamily: 'monospace', fontSize: 12 }}>
                <div style={{ marginBottom: 8, color: accent, fontWeight: 700, fontSize: 11 }}>{'page.locator("#country")'}</div>
                <div style={{ border: `2px solid ${accent}`, borderRadius: 8, overflow: 'hidden', maxWidth: 220, boxShadow: `0 0 12px ${accent}44`, transition: 'all 0.3s' }}>
                    {(state === 'wrap' ? [opts[0]] : opts).map((opt, idx) => (
                        <div key={opt.value} style={{ padding: '7px 14px', background: (state !== 'wrap' && opt.value === selectedVal && state !== 'getOptions') ? accent : (darkMode ? '#1f2937' : '#fff'), color: (state !== 'wrap' && opt.value === selectedVal && state !== 'getOptions') ? '#fff' : (darkMode ? '#d1d5db' : '#374151'), borderBottom: idx < (state === 'wrap' ? 0 : 3) ? `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` : 'none', transition: 'background 0.3s', fontWeight: opt.value === selectedVal ? 700 : 400 }}>
                            {state === 'getOptions' ? `[${idx}] ${opt.text}` : opt.text}
                        </div>
                    ))}
                </div>
                {state === 'wrap' && <div style={{ marginTop: 8, color: darkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }}>→ .selectOption() çağrılıyor...</div>}
            </div>
        )
    }

    const DialogVisual = ({ state }) => {
        const dialogTypes = {
            register: { bg: darkMode ? '#1f2937' : '#f9fafb', label: isTr ? 'onDialog event handler bekleniyor' : 'Waiting for onDialog event', icon: '📋', border: darkMode ? '#374151' : '#e5e7eb' },
            'dialog-fires': { bg: '#fef3c7', label: isTr ? 'Dialog tetiklendi!' : 'Dialog fired!', icon: '⚠️', border: '#f59e0b' },
            handle: { bg: '#d1fae5', label: 'accept() veya dismiss()', icon: '✅', border: '#10b981' },
            dismiss: { bg: '#fee2e2', label: 'dismiss() → iptal', icon: '❌', border: '#ef4444' },
        }
        const d = dialogTypes[state] || dialogTypes['register']
        return (
            <div style={{ position: 'relative', maxWidth: 280 }}>
                <div style={{ padding: '10px 16px', borderRadius: 8, background: darkMode ? '#1f2937' : '#f9fafb', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, color: darkMode ? '#9ca3af' : '#6b7280', fontSize: 12, marginBottom: 8, opacity: state !== 'register' ? 0.4 : 1 }}>
                    🌐 {isTr ? 'Ana Sayfa İçeriği' : 'Main Page Content'}
                </div>
                {state === 'register' ? (
                    <div style={{ padding: '8px 12px', borderRadius: 8, background: `${accent}11`, border: `1px dashed ${accent}`, fontSize: 11, color: accent }}>
                        <span style={{ fontWeight: 700 }}>page.onDialog(dialog -&gt; {'{'}</span><br />
                        <span style={{ marginLeft: 16, color: darkMode ? '#9ca3af' : '#6b7280' }}>dialog.accept();</span><br />
                        <span style={{ fontWeight: 700 }}>{'}'})</span>
                    </div>
                ) : (
                    <div style={{ padding: '12px 16px', borderRadius: 8, background: d.bg, border: `2px solid ${d.border}`, boxShadow: `0 4px 20px ${d.border}44`, animation: 'fadeIn 0.3s ease', fontSize: 12 }}>
                        <div style={{ fontWeight: 700, marginBottom: 6, color: '#1f2937' }}>{d.icon} {d.label}</div>
                        <div style={{ color: '#6b7280', fontSize: 11 }}>{state === 'handle' ? '→ dialog.accept()' : state === 'dismiss' ? '→ dialog.dismiss()' : 'type: alert | confirm | prompt'}</div>
                    </div>
                )}
            </div>
        )
    }

    const FrameLocatorVisual = ({ state }) => {
        const states = { outer: { innerOpacity: 0.3, innerBorder: '#6b7280', innerLabel: '🚫 erişim yok', outerActive: true }, 'frame-locator': { innerOpacity: 0.6, innerBorder: accent, innerLabel: '⏳ frameLocator("#f")', outerActive: false }, inner: { innerOpacity: 1, innerBorder: accent, innerLabel: '✅ .locator() çalışır', outerActive: false }, back: { innerOpacity: 0.3, innerBorder: '#6b7280', innerLabel: '← dış sayfa', outerActive: true } }
        const s = states[state] || states['outer']
        return (
            <div style={{ maxWidth: 260, fontFamily: 'monospace', fontSize: 11 }}>
                <div style={{ padding: 10, borderRadius: 8, border: `2px solid ${s.outerActive ? accent : (darkMode ? '#374151' : '#d1d5db')}`, background: darkMode ? '#111827' : '#f9fafb', boxShadow: s.outerActive ? `0 0 12px ${accent}44` : 'none', transition: 'all 0.3s' }}>
                    <div style={{ color: s.outerActive ? accent : (darkMode ? '#6b7280' : '#9ca3af'), fontWeight: s.outerActive ? 700 : 400, marginBottom: 6 }}>{s.outerActive ? '✅ ' : ''}🌐 {isTr ? 'Ana Sayfa' : 'Main Page'}</div>
                    <div style={{ padding: 8, borderRadius: 6, border: `2px solid ${s.innerBorder}`, background: darkMode ? '#1f2937' : '#fff', opacity: s.innerOpacity, boxShadow: s.innerOpacity === 1 ? `0 0 10px ${s.innerBorder}44` : 'none', transition: 'all 0.4s' }}>
                        <div style={{ color: s.innerBorder, fontWeight: 700 }}>🖼️ iframe#payment — {s.innerLabel}</div>
                        {s.innerOpacity === 1 && <div style={{ fontSize: 10, color: darkMode ? '#9ca3af' : '#6b7280', marginTop: 4 }}>💳 frameLocator → locator chain</div>}
                    </div>
                </div>
                {state === 'inner' && <div style={{ marginTop: 6, fontSize: 10, color: '#10b981' }}>✅ switchTo() gerekmez — chain yeterli!</div>}
            </div>
        )
    }

    const MultiPageVisual = ({ state }) => {
        const pages = [{ id: 'main', label: '🏠 Main Page', color: accent }, { id: 'popup', label: '🆕 Popup / New Tab', color: '#10b981' }, { id: 'third', label: '3️⃣ Third Page', color: '#f59e0b' }]
        const activePagesMap = { single: ['main'], 'wait-popup': ['main', 'popup'], 'new-page': ['main', 'popup'], close: ['main'], 'context-pages': ['main', 'popup', 'third'] }
        const active = activePagesMap[state] || ['main']
        const showCount = state === 'context-pages' ? 3 : (state === 'single' || state === 'close') ? 1 : 2
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 240, fontFamily: 'monospace', fontSize: 11 }}>
                {pages.slice(0, showCount).map(p => (
                    <div key={p.id} style={{ padding: '7px 12px', borderRadius: 8, border: `2px solid ${active.includes(p.id) ? p.color : (darkMode ? '#374151' : '#d1d5db')}`, background: active.includes(p.id) ? (darkMode ? '#111827' : '#f0f9ff') : (darkMode ? '#1f2937' : '#fff'), boxShadow: active.includes(p.id) ? `0 0 10px ${p.color}44` : 'none', color: active.includes(p.id) ? p.color : (darkMode ? '#6b7280' : '#9ca3af'), fontWeight: active.includes(p.id) ? 700 : 400, transition: 'all 0.3s' }}>
                        {active.includes(p.id) ? '▶ ' : '  '}{p.label}{active.includes(p.id) && <span style={{ fontSize: 9, marginLeft: 6, opacity: 0.7 }}>← active</span>}
                    </div>
                ))}
            </div>
        )
    }

    const PwActionsVisual = ({ state }) => {
        const cursor = { position: 'absolute', fontSize: 18, transition: 'all 0.5s cubic-bezier(.4,0,.2,1)', pointerEvents: 'none' }
        const positions = { idle: { top: '50%', left: '50%' }, hover: { top: '28%', left: '50%' }, submenu: { top: '50%', left: '65%' }, dblclick: { top: '50%', left: '50%' }, rightclick: { top: '50%', left: '50%' }, drag: { top: '50%', left: '60%' }, keyboard: { top: '50%', left: '50%' } }
        const pos = positions[state] || positions['idle']
        return (
            <div style={{ position: 'relative', width: 220, height: 160, margin: '0 auto' }}>
                <div style={{ position: 'absolute', top: 16, left: 0, right: 0, background: accent, borderRadius: 8, padding: '8px 14px', display: 'flex', gap: 16, alignItems: 'center' }}>
                    {['Home', 'Products', 'About'].map(m => (
                        <span key={m} style={{ color: '#fff', fontSize: 11, fontWeight: m === 'Products' ? 700 : 400, padding: '2px 6px', borderRadius: 4, background: (state === 'hover' || state === 'submenu') && m === 'Products' ? 'rgba(255,255,255,0.2)' : 'transparent', transition: 'background 0.3s' }}>{m}</span>
                    ))}
                </div>
                {state === 'submenu' && <div style={{ position: 'absolute', top: 50, left: 80, background: darkMode ? '#1f2937' : '#fff', border: `2px solid ${accent}`, borderRadius: 6, padding: '4px 0', boxShadow: `0 4px 16px ${accent}44`, animation: 'fadeIn 0.2s ease', zIndex: 10 }}>{['Laptops', 'Phones', 'Tablets'].map(s => <div key={s} style={{ padding: '4px 14px', fontSize: 11, color: darkMode ? '#e5e7eb' : '#374151' }}>{s}</div>)}</div>}
                {state === 'drag' && <div style={{ position: 'absolute', top: 80, left: 0, right: 0, display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center' }}><div style={{ width: 48, height: 36, borderRadius: 6, background: `${accent}bb`, border: `2px dashed ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', fontWeight: 700, transform: 'translateX(20px)', transition: 'transform 0.5s' }}>DRAG</div><span style={{ color: accent, fontWeight: 700 }}>→</span><div style={{ width: 56, height: 40, borderRadius: 6, border: `2px solid ${accent}`, background: `${accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: accent, fontWeight: 700 }}>DROP</div></div>}
                {state === 'keyboard' && <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>{['Control', 'A', '→', 'Del'].map(k => <div key={k} style={{ padding: '4px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: accent, color: '#fff', boxShadow: `0 2px 0 ${accent}88`, animation: 'pulse 1s infinite' }}>{k}</div>)}</div>}
                {state === 'dblclick' && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}><div style={{ width: 50, height: 50, borderRadius: '50%', border: `2px solid ${accent}`, animation: 'ping 0.6s ease-out', opacity: 0.6 }} /><div style={{ width: 30, height: 30, borderRadius: '50%', border: `2px solid ${accent}`, animation: 'ping 0.6s ease-out 0.15s', opacity: 0.4, position: 'absolute', top: 10, left: 10 }} /></div>}
                {state === 'rightclick' && <div style={{ position: 'absolute', top: 60, left: 80, background: darkMode ? '#1f2937' : '#fff', border: `1px solid ${darkMode ? '#374151' : '#d1d5db'}`, borderRadius: 6, padding: '4px 0', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', animation: 'fadeIn 0.2s ease', minWidth: 90 }}>{['✂️ Cut', '📋 Copy', '🗑️ Delete'].map(m => <div key={m} style={{ padding: '4px 14px', fontSize: 11, color: m.includes('Delete') ? '#ef4444' : (darkMode ? '#e5e7eb' : '#374151') }}>{m}</div>)}</div>}
                {state !== 'drag' && state !== 'keyboard' && <div style={{ ...cursor, ...pos, transform: 'translate(-50%,-50%)' }}>🖱️</div>}
            </div>
        )
    }

    const EvaluateVisual = ({ state }) => {
        const scrollPct = { idle: 0, scrollTo: 85, scrollBy: 40, scrollIntoView: 70, evaluate: 0, fill: 0 }
        const pct = scrollPct[state] ?? 0
        return (
            <div style={{ position: 'relative', width: 200, margin: '0 auto' }}>
                <div style={{ borderRadius: 8, border: `2px solid ${accent}`, overflow: 'hidden', background: darkMode ? '#111827' : '#f9fafb' }}>
                    <div style={{ background: accent, padding: '4px 10px', fontSize: 10, color: '#fff' }}>⚡ page.evaluate()</div>
                    <div style={{ height: 70, overflow: 'hidden', position: 'relative' }}>
                        <div style={{ transform: `translateY(-${pct}%)`, transition: 'transform 0.5s ease', padding: 8 }}>
                            {['🏠 Header', '📦 Section 1', '🛒 Section 2', '📧 Footer'].map((s, idx) => (
                                <div key={idx} style={{ padding: '6px 8px', borderRadius: 4, marginBottom: 4, fontSize: 10, background: (state === 'scrollIntoView' && idx === 3) ? `${accent}33` : (darkMode ? '#1f2937' : '#fff'), border: `1px solid ${(state === 'scrollIntoView' && idx === 3) ? accent : (darkMode ? '#374151' : '#e5e7eb')}`, color: darkMode ? '#d1d5db' : '#374151', fontWeight: (state === 'scrollIntoView' && idx === 3) ? 700 : 400, boxShadow: (state === 'evaluate' && idx === 0) ? `0 0 8px ${accent}88` : 'none', transition: 'all 0.4s' }}>
                                    {state === 'evaluate' && idx === 0 ? `${s} ← evaluate!` : s}{state === 'fill' && idx === 1 ? ' → test@test.com' : ''}
                                </div>
                            ))}
                        </div>
                        {pct > 0 && <div style={{ position: 'absolute', right: 2, top: `${(pct / 100) * 60}%`, width: 3, height: 20, background: accent, borderRadius: 2, transition: 'top 0.5s ease' }} />}
                    </div>
                </div>
                <div style={{ marginTop: 8, textAlign: 'center', fontSize: 11, color: accent, fontWeight: 700 }}>
                    {state === 'idle' ? '⚡ Ready' : state === 'scrollTo' ? 'window.scrollTo(0, body.scrollHeight)' : state === 'scrollBy' ? 'window.scrollBy(0, 500)' : state === 'scrollIntoView' ? 'scrollIntoView(true)' : state === 'evaluate' ? 'page.evaluate(fn)' : 'page.evaluate(el => el.value=...)'}
                </div>
            </div>
        )
    }

    const BrowserContextVisual = ({ state }) => {
        const contexts = [{ id: 'ctx1', label: '👤 Admin Session', color: accent }, { id: 'ctx2', label: '🛒 Customer', color: '#10b981' }, { id: 'ctx3', label: '🔍 Guest', color: '#f59e0b' }]
        const activeCtx = { single: ['ctx1'], 'new-context': ['ctx1', 'ctx2'], parallel: ['ctx1', 'ctx2', 'ctx3'], isolation: ['ctx1', 'ctx2', 'ctx3'], close: ['ctx1'] }
        const active = activeCtx[state] || ['ctx1']
        const showCount = (state === 'parallel' || state === 'isolation') ? 3 : (state === 'single' || state === 'close') ? 1 : 2
        return (
            <div style={{ fontFamily: 'monospace', fontSize: 11, maxWidth: 260 }}>
                <div style={{ textAlign: 'center', marginBottom: 8, color: darkMode ? '#9ca3af' : '#6b7280', fontSize: 10 }}>🌐 browser (tek proses)</div>
                <div style={{ border: `2px solid ${darkMode ? '#374151' : '#d1d5db'}`, borderRadius: 10, padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {contexts.slice(0, showCount).map(ctx => (
                        <div key={ctx.id} style={{ padding: '6px 10px', borderRadius: 6, border: `2px solid ${active.includes(ctx.id) ? ctx.color : (darkMode ? '#374151' : '#e5e7eb')}`, background: active.includes(ctx.id) ? (darkMode ? '#111827' : '#f0f9ff') : (darkMode ? '#1f2937' : '#f9fafb'), color: active.includes(ctx.id) ? ctx.color : (darkMode ? '#6b7280' : '#9ca3af'), fontWeight: active.includes(ctx.id) ? 700 : 400, boxShadow: active.includes(ctx.id) ? `0 0 8px ${ctx.color}44` : 'none', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: 6 }}>
                            {ctx.label}{active.includes(ctx.id) && state === 'isolation' && <span style={{ marginLeft: 'auto', fontSize: 9, background: `${ctx.color}22`, padding: '2px 5px', borderRadius: 3 }}>🍪 isolated</span>}
                        </div>
                    ))}
                </div>
                {state === 'parallel' && <div style={{ marginTop: 8, color: '#10b981', fontSize: 10, textAlign: 'center' }}>⚡ {isTr ? '3 context paralel çalışıyor' : '3 contexts running in parallel'}</div>}
            </div>
        )
    }

    const TraceVisual = ({ state }) => {
        const events = [{ icon: '🌐', label: 'navigate', color: '#3b82f6' }, { icon: '🖱️', label: 'click', color: accent }, { icon: '⌨️', label: 'fill', color: '#10b981' }, { icon: '✅', label: 'assert', color: '#8b5cf6' }]
        const activeCount = { idle: 0, record: 2, screenshot: 3, video: 4, viewer: 4 }
        const count = activeCount[state] || 0
        return (
            <div style={{ maxWidth: 260, fontFamily: 'monospace', fontSize: 11 }}>
                {(state === 'screenshot') && <div style={{ marginBottom: 8, padding: '6px 10px', borderRadius: 6, background: '#fee2e2', border: '1px solid #ef4444', fontSize: 10, color: '#ef4444' }}>📸 screenshot-on-failure.png</div>}
                {(state === 'video') && <div style={{ marginBottom: 8, padding: '6px 10px', borderRadius: 6, background: '#fef3c7', border: '1px solid #f59e0b', fontSize: 10, color: '#92400e' }}>🎥 video.webm kaydediliyor...</div>}
                {(state === 'viewer') && <div style={{ marginBottom: 8, padding: '6px 10px', borderRadius: 6, background: `${accent}11`, border: `1px solid ${accent}`, fontSize: 10, color: accent }}>🎭 trace.zip → Trace Viewer</div>}
                <div style={{ background: darkMode ? '#111827' : '#f8fafc', border: `2px solid ${accent}`, borderRadius: 8, padding: 10 }}>
                    <div style={{ color: accent, fontWeight: 700, marginBottom: 8, fontSize: 10 }}>📊 {isTr ? 'Test İzleme' : 'Trace Timeline'}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {events.map((e, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: idx < count ? e.color : (darkMode ? '#374151' : '#d1d5db'), transition: 'background 0.3s', flexShrink: 0 }} />
                                <div style={{ flex: 1, height: 18, borderRadius: 3, overflow: 'hidden', background: darkMode ? '#1f2937' : '#e5e7eb' }}>
                                    <div style={{ height: '100%', borderRadius: 3, transition: 'width 0.5s ease', width: idx < count ? `${(idx + 1) * 22}%` : '0%', background: idx < count ? e.color : 'transparent', display: 'flex', alignItems: 'center', paddingLeft: 6, fontSize: 9, color: '#fff', fontWeight: 700 }}>
                                        {idx < count ? `${e.icon} ${e.label}` : ''}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {state === 'viewer' && <div style={{ marginTop: 8, fontSize: 10, color: '#10b981', textAlign: 'center' }}>✅ npx playwright show-trace trace.zip</div>}
            </div>
        )
    }

    const renderVisual = () => {
        const vs = step.visualState
        switch (block.concept) {
            case 'auto-wait':       return <AutoWaitVisual state={vs} />
            case 'select-option':   return <SelectOptionVisual state={vs} />
            case 'dialog':          return <DialogVisual state={vs} />
            case 'frame-locator':   return <FrameLocatorVisual state={vs} />
            case 'multi-page':      return <MultiPageVisual state={vs} />
            case 'pw-actions':      return <PwActionsVisual state={vs} />
            case 'evaluate':        return <EvaluateVisual state={vs} />
            case 'browser-context': return <BrowserContextVisual state={vs} />
            case 'trace':           return <TraceVisual state={vs} />
            default: return null
        }
    }

    return (
        <div className={`mt-6 rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`} style={{ boxShadow: `0 0 24px ${accent}22` }}>
            <div style={{ background: `linear-gradient(135deg, ${accent}, #818cf8)` }} className="px-4 py-3 flex items-center gap-3">
                <span className="text-2xl">{block.icon}</span>
                <span className="text-white font-bold text-sm md:text-base">{isTr ? block.title.tr : block.title.en}</span>
                <span className="ml-auto text-xs font-mono text-white/60">Playwright Java</span>
            </div>
            <div className={`flex overflow-x-auto gap-1 px-3 py-2 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`} style={{ scrollbarWidth: 'none' }}>
                {block.steps.map((s, idx) => (
                    <button key={s.id} onClick={() => setActiveStep(idx)} className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap ${activeStep === idx ? 'text-white shadow-md scale-105' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`} style={activeStep === idx ? { background: accent } : {}}>
                        {isTr ? s.label : (s.labelEn || s.label)}
                    </button>
                ))}
            </div>
            <div className="p-4 md:p-5 grid md:grid-cols-2 gap-4 md:gap-6 items-start">
                <div className={`rounded-xl p-4 flex items-center justify-center min-h-[160px] ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`} style={{ border: `1px solid ${accent}44` }}>
                    {renderVisual()}
                </div>
                <div>
                    <p className={`text-sm leading-relaxed mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{isTr ? step.description.tr : step.description.en}</p>
                    <CodeBlock code={step.code} language="java" darkMode={darkMode} />
                    {step.tip && <div className={`mt-3 px-3 py-2 rounded-lg text-xs leading-relaxed ${darkMode ? 'bg-gray-800 text-yellow-300 border border-yellow-900' : 'bg-yellow-50 text-yellow-800 border border-yellow-200'}`}>{isTr ? step.tip.tr : step.tip.en}</div>}
                </div>
            </div>
            <div className={`px-4 py-2 flex items-center justify-between border-t text-xs ${darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
                <button onClick={() => setActiveStep(Math.max(0, activeStep - 1))} disabled={activeStep === 0} className="px-3 py-1 rounded disabled:opacity-30 hover:opacity-80 transition" style={{ background: accent, color: '#fff' }}>← {isTr ? 'Önceki' : 'Prev'}</button>
                <span>{activeStep + 1} / {block.steps.length}</span>
                <button onClick={() => setActiveStep(Math.min(block.steps.length - 1, activeStep + 1))} disabled={activeStep === block.steps.length - 1} className="px-3 py-1 rounded disabled:opacity-30 hover:opacity-80 transition" style={{ background: accent, color: '#fff' }}>{isTr ? 'Sonraki' : 'Next'} →</button>
            </div>
        </div>
    )
}

// ─── SimulationBlock ──────────────────────────────────────────────────────────

function SimulationBlock({ block, darkMode, language }) {
    const [simState, setSimState] = useState('idle')
    const [isRunning, setIsRunning] = useState(false)
    const isTr = language === 'tr'
    const accent = block.color || '#7c3aed'
    const timersRef = useRef([])

    const resetSim = () => {
        timersRef.current.forEach(t => clearTimeout(t))
        timersRef.current = []
        setIsRunning(false)
        setSimState('idle')
    }

    const runSteps = (steps) => {
        if (isRunning) return
        timersRef.current.forEach(t => clearTimeout(t))
        timersRef.current = []
        setIsRunning(true)
        setSimState('idle')
        let cumDelay = 0
        steps.forEach(([state, delay], idx) => {
            cumDelay += delay
            const t = setTimeout(() => {
                setSimState(state)
                if (idx === steps.length - 1) setIsRunning(false)
            }, cumDelay)
            timersRef.current.push(t)
        })
    }

    // === EXPLICIT WAIT PLAYGROUND ===
    const renderExplicitWaitPlayground = () => {
        const showSpinner = ['clicking', 'loading'].includes(simState)
        const showResult = ['found', 'done'].includes(simState)
        const btnLabel =
            simState === 'idle'     ? (isTr ? '▶ Veriyi Yükle' : '▶ Load Data') :
            simState === 'clicking' ? (isTr ? '⏳ İstek Gönderildi...' : '⏳ Request Sent...') :
            simState === 'loading'  ? (isTr ? '⏳ Yükleniyor...' : '⏳ Loading...') :
            simState === 'found'    ? '✅ Tamamlandı!' :
                                      (isTr ? '🔄 Tekrar Dene' : '🔄 Try Again')
        const btnDisabled = ['clicking', 'loading', 'found'].includes(simState)
        return (
            <div>
                <div style={{ border: `2px solid ${accent}33`, borderRadius: 10, overflow: 'hidden', maxWidth: 300 }}>
                    <div style={{ background: accent, padding: '5px 10px', fontSize: 10, color: '#fff', display: 'flex', gap: 6 }}>
                        <span>🌐</span><span>shop.example.com/api/products</span>
                    </div>
                    <div style={{ padding: 14, minHeight: 130, background: darkMode ? '#111827' : '#ffffff' }}>
                        <button
                            onClick={() => {
                                if (simState === 'idle' || simState === 'done') {
                                    runSteps([['clicking', 50], ['loading', 1500], ['found', 600], ['done', 1200]])
                                }
                            }}
                            disabled={btnDisabled}
                            style={{
                                display: 'block', width: '100%', padding: '8px 14px',
                                borderRadius: 6, border: 'none',
                                cursor: btnDisabled ? 'not-allowed' : 'pointer',
                                background: showResult ? '#10b981' : btnDisabled ? '#6b7280' : accent,
                                color: '#fff', fontWeight: 700, fontSize: 12, transition: 'background 0.4s',
                            }}
                        >
                            {btnLabel}
                        </button>
                        {showSpinner && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, justifyContent: 'center' }}>
                                <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${accent}33`, borderTopColor: accent, animation: 'simSpin 0.7s linear infinite' }} />
                                <span style={{ fontSize: 10, color: darkMode ? '#9ca3af' : '#6b7280' }}>
                                    {isTr ? 'Sunucudan yanıt bekleniyor...' : 'Waiting for server response...'}
                                </span>
                            </div>
                        )}
                        {showSpinner && (
                            <div style={{ marginTop: 8, fontSize: 10, textAlign: 'center', color: accent, fontWeight: 600, animation: 'simPulse 1.2s ease infinite' }}>
                                {isTr ? '⏱️ WebDriverWait bekliyor... (max 10s)' : '⏱️ WebDriverWait polling... (max 10s)'}
                            </div>
                        )}
                        {showResult && (
                            <div style={{ marginTop: 12, padding: '8px 10px', borderRadius: 6, background: darkMode ? '#064e3b' : '#ecfdf5', border: '1.5px solid #10b981', animation: 'simFadeUp 0.4s ease', fontSize: 10, color: darkMode ? '#6ee7b7' : '#065f46', fontFamily: 'monospace' }}>
                                <div style={{ fontWeight: 700, marginBottom: 2 }}>{'<div id="result">'}</div>
                                <div style={{ paddingLeft: 12 }}>{'{ name: "MacBook", price: 2499 }'}</div>
                                <div>{'</div>'}</div>
                            </div>
                        )}
                    </div>
                </div>
                <div style={{ marginTop: 6, textAlign: 'right' }}>
                    <button onClick={resetSim} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, background: 'transparent', color: darkMode ? '#6b7280' : '#9ca3af', cursor: 'pointer' }}>↺ Reset</button>
                </div>
            </div>
        )
    }

    // === IMPLICIT WAIT PLAYGROUND ===
    const renderImplicitWaitPlayground = () => {
        const isNoFail = simState === 'no-fail'
        const isWithRetry = simState === 'with-retry'
        const isWithFound = simState === 'with-found'
        return (
            <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, maxWidth: 320 }}>
                    <div style={{ border: '1.5px solid #ef444444', borderRadius: 8, overflow: 'hidden' }}>
                        <div style={{ background: '#ef4444', padding: '4px 8px', fontSize: 9, color: '#fff', fontWeight: 700 }}>❌ Without Wait</div>
                        <div style={{ padding: 8, background: darkMode ? '#1f2937' : '#fff', minHeight: 90 }}>
                            <div style={{ fontSize: 9, color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: 6 }}>
                                {isTr ? 'Element henüz DOM\'da yok...' : 'Element not in DOM yet...'}
                            </div>
                            <button
                                onClick={() => { if (!isRunning) runSteps([['no-fail', 200]]) }}
                                disabled={isRunning}
                                style={{ width: '100%', padding: '5px', borderRadius: 4, border: 'none', background: '#ef4444', color: '#fff', fontSize: 10, cursor: isRunning ? 'not-allowed' : 'pointer', fontWeight: 600 }}
                            >
                                {isTr ? 'Element Bul' : 'Find Element'}
                            </button>
                            {isNoFail && (
                                <div style={{ marginTop: 6, fontSize: 9, color: '#ef4444', fontFamily: 'monospace', animation: 'simFadeUp 0.3s', lineHeight: 1.5 }}>
                                    NoSuchElementException!<br/>Element not found
                                </div>
                            )}
                        </div>
                    </div>
                    <div style={{ border: '1.5px solid #10b98144', borderRadius: 8, overflow: 'hidden' }}>
                        <div style={{ background: '#10b981', padding: '4px 8px', fontSize: 9, color: '#fff', fontWeight: 700 }}>✅ Implicit Wait</div>
                        <div style={{ padding: 8, background: darkMode ? '#1f2937' : '#fff', minHeight: 90 }}>
                            <div style={{ fontSize: 9, color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: 6, fontFamily: 'monospace' }}>
                                implicitly_wait(10)
                            </div>
                            <button
                                onClick={() => { if (!isRunning) runSteps([['with-retry', 400], ['with-found', 1400]]) }}
                                disabled={isRunning}
                                style={{ width: '100%', padding: '5px', borderRadius: 4, border: 'none', background: '#10b981', color: '#fff', fontSize: 10, cursor: isRunning ? 'not-allowed' : 'pointer', fontWeight: 600 }}
                            >
                                {isTr ? 'Element Bul' : 'Find Element'}
                            </button>
                            {isWithRetry && (
                                <div style={{ marginTop: 6, fontSize: 9, color: accent, fontFamily: 'monospace', animation: 'simFadeUp 0.3s simPulse 1s' }}>
                                    🔄 {isTr ? 'DOM\'u tekrar tarıyor...' : 'Retrying DOM search...'}
                                </div>
                            )}
                            {isWithFound && (
                                <div style={{ marginTop: 6, fontSize: 9, color: '#10b981', fontFamily: 'monospace', animation: 'simFadeUp 0.3s', lineHeight: 1.5 }}>
                                    ✅ Element found!<br/>{'<button id="submit">'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: 6, textAlign: 'right' }}>
                    <button onClick={resetSim} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, background: 'transparent', color: darkMode ? '#6b7280' : '#9ca3af', cursor: 'pointer' }}>↺ Reset</button>
                </div>
            </div>
        )
    }

    // === IFRAME DETECTION PLAYGROUND ===
    const renderIframeDetectionPlayground = () => {
        const phase = simState
        const isScanning  = phase === 'scanning'
        const isFound     = ['found','switching','inside'].includes(phase)
        const isSwitching = phase === 'switching'
        const isInside    = phase === 'inside'

        const iframes = [
            { id: 'iframe[0]', label: isTr ? '💳 Ödeme Formu' : '💳 Payment Form', color: '#f59e0b', desc: isTr ? 'Stripe / PayPal embed' : 'Stripe / PayPal embed' },
            { id: 'iframe[1]', label: isTr ? '🎬 Video Player' : '🎬 Video Player', color: '#3b82f6', desc: 'YouTube embed' },
        ]

        return (
            <div style={{ maxWidth: 340 }}>
                {/* Browser chrome */}
                <div style={{ borderRadius: 10, border: `2px solid ${accent}44`, overflow: 'hidden' }}>
                    {/* Address bar */}
                    <div style={{ background: '#1e293b', padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ display: 'flex', gap: 4 }}>
                            {['#ef4444','#f59e0b','#22c55e'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}
                        </div>
                        <div style={{ flex: 1, background: '#334155', borderRadius: 4, padding: '2px 8px', fontSize: 10, color: '#94a3b8', fontFamily: 'monospace' }}>
                            https://shop.example.com/checkout
                        </div>
                    </div>

                    {/* Page content */}
                    <div style={{ background: darkMode ? '#111827' : '#f8fafc', padding: 10, minHeight: 200, position: 'relative' }}>
                        {/* Normal page elements */}
                        <div style={{ fontSize: 10, color: darkMode ? '#6b7280' : '#9ca3af', marginBottom: 8, fontWeight: 600 }}>
                            🏪 {isTr ? 'Ürün Özeti — Normal DOM' : 'Order Summary — Normal DOM'}
                        </div>
                        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                            {[isTr ? '📦 Ürün: MacBook Pro' : '📦 Product: MacBook Pro', isTr ? '💰 Fiyat: $2499' : '💰 Price: $2499'].map((t, i) => (
                                <div key={i} style={{ flex: 1, padding: '4px 6px', borderRadius: 4, background: darkMode ? '#1f2937' : '#fff', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, fontSize: 9, color: darkMode ? '#d1d5db' : '#374151' }}>{t}</div>
                            ))}
                        </div>

                        {/* iframes embedded in page */}
                        {iframes.map((fr, idx) => {
                            const isActive = isFound && !isInside
                            const isActiveFrame = isInside && idx === 0
                            return (
                                <div key={fr.id} style={{
                                    marginBottom: 6, borderRadius: 6, overflow: 'hidden',
                                    border: `2px ${isActive || isActiveFrame ? 'solid' : 'dashed'} ${isActive || isActiveFrame ? fr.color : (darkMode ? '#374151' : '#d1d5db')}`,
                                    animation: isActive ? `simPulse 1.2s ease infinite` : 'none',
                                    transition: 'border 0.4s, box-shadow 0.4s',
                                    boxShadow: isActiveFrame ? `0 0 16px ${fr.color}88` : isActive ? `0 0 8px ${fr.color}44` : 'none',
                                    position: 'relative',
                                }}>
                                    {/* iframe label badge */}
                                    {(isFound || isInside) && (
                                        <div style={{
                                            position: 'absolute', top: -1, left: 4,
                                            background: isActiveFrame ? fr.color : (darkMode ? '#1f2937' : '#fff'),
                                            border: `1px solid ${fr.color}`,
                                            borderRadius: '0 0 4px 4px', padding: '1px 6px', fontSize: 8, fontWeight: 700,
                                            color: isActiveFrame ? '#fff' : fr.color, zIndex: 10,
                                            animation: isActiveFrame ? 'none' : 'simFadeUp 0.3s',
                                        }}>
                                            {isActiveFrame ? `✅ ${isTr ? 'İçindesin!' : 'You\'re inside!'}` : `📌 ${fr.id}`}
                                        </div>
                                    )}
                                    <div style={{ padding: '10px 8px', background: darkMode ? '#0f172a' : '#fff', fontSize: 9 }}>
                                        <div style={{ color: fr.color, fontWeight: 700, marginBottom: 3 }}>{fr.label}</div>
                                        <div style={{ color: darkMode ? '#6b7280' : '#9ca3af' }}>{fr.desc}</div>
                                        {isActiveFrame && (
                                            <div style={{ marginTop: 4, padding: '3px 6px', background: '#10b98122', border: '1px solid #10b981', borderRadius: 3, color: '#10b981', fontSize: 8, animation: 'simFadeUp 0.3s' }}>
                                                {isTr ? '👁 Selenium burdayım görüyor!' : '👁 Selenium can see me now!'}
                                            </div>
                                        )}
                                        {isScanning && (
                                            <div style={{ marginTop: 3, fontSize: 8, color: darkMode ? '#374151' : '#e5e7eb' }}>
                                                {isTr ? 'tarıyor...' : 'scanning...'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}

                        {/* Scanning overlay */}
                        {isScanning && (
                            <div style={{ position: 'absolute', inset: 0, background: `${accent}08`, animation: 'simPulse 0.6s ease infinite', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ color: accent, fontWeight: 700, fontSize: 10, background: darkMode ? '#111827' : '#fff', padding: '4px 10px', borderRadius: 6, border: `1px solid ${accent}44` }}>
                                    🔍 {isTr ? 'DOM tarıyor...' : 'Scanning DOM...'}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Control buttons */}
                <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    <button
                        onClick={() => runSteps([['scanning', 100], ['found', 800]])}
                        disabled={isRunning}
                        style={{ flex: 1, padding: '6px 8px', borderRadius: 5, border: 'none', cursor: isRunning ? 'not-allowed' : 'pointer', background: accent, color: '#fff', fontSize: 10, fontWeight: 700 }}
                    >
                        🔍 {isTr ? 'iframe\'leri Tara' : 'Scan for iframes'}
                    </button>
                    <button
                        onClick={() => runSteps([['scanning', 50], ['found', 600], ['switching', 400], ['inside', 600]])}
                        disabled={isRunning}
                        style={{ flex: 1, padding: '6px 8px', borderRadius: 5, border: 'none', cursor: isRunning ? 'not-allowed' : 'pointer', background: '#059669', color: '#fff', fontSize: 10, fontWeight: 700 }}
                    >
                        ↩ {isTr ? 'switchTo().frame(0)' : 'switchTo().frame(0)'}
                    </button>
                </div>
                <div style={{ marginTop: 4, textAlign: 'right' }}>
                    <button onClick={resetSim} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, background: 'transparent', color: darkMode ? '#6b7280' : '#9ca3af', cursor: 'pointer' }}>↺ Reset</button>
                </div>
            </div>
        )
    }

    // === SHADOW DOM X-RAY PLAYGROUND ===
    const renderShadowDomXrayPlayground = () => {
        const phase = simState
        const isNormal    = phase === 'idle' || phase === 'normal'
        const isFailing   = phase === 'fail'
        const isXray      = phase === 'xray'
        const isExposed   = phase === 'exposed'
        const isPierced   = phase === 'pierced'
        const showShadow  = isXray || isExposed || isPierced

        return (
            <div style={{ maxWidth: 320 }}>
                {/* The "web component" on the page */}
                <div style={{ borderRadius: 10, border: `2px solid ${accent}44`, overflow: 'hidden' }}>
                    <div style={{ background: '#1e293b', padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ display: 'flex', gap: 4 }}>
                            {['#ef4444','#f59e0b','#22c55e'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}
                        </div>
                        <div style={{ flex: 1, background: '#334155', borderRadius: 4, padding: '2px 8px', fontSize: 10, color: '#94a3b8', fontFamily: 'monospace' }}>
                            https://app.example.com/login
                        </div>
                    </div>

                    <div style={{ background: darkMode ? '#111827' : '#f8fafc', padding: 12, minHeight: 180 }}>
                        {/* Normal looking page */}
                        <div style={{ fontSize: 10, color: darkMode ? '#6b7280' : '#9ca3af', marginBottom: 8 }}>
                            {isTr ? '🔐 Giriş Formu' : '🔐 Login Form'}
                        </div>

                        {/* Username - normal DOM */}
                        <div style={{ marginBottom: 6 }}>
                            <div style={{ fontSize: 9, color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: 2 }}>
                                {isTr ? 'Kullanıcı Adı (normal DOM):' : 'Username (normal DOM):'}
                            </div>
                            <div style={{ padding: '5px 8px', borderRadius: 4, border: `1px solid ${darkMode ? '#374151' : '#d1d5db'}`, background: darkMode ? '#1f2937' : '#fff', fontSize: 10, color: darkMode ? '#d1d5db' : '#374151' }}>
                                <input placeholder="admin" style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 10, color: 'inherit', width: '100%' }} readOnly />
                            </div>
                        </div>

                        {/* Password - inside Shadow DOM (the web component) */}
                        <div style={{ marginBottom: 8, position: 'relative' }}>
                            <div style={{ fontSize: 9, marginBottom: 2, color: isFailing ? '#ef4444' : (showShadow ? '#a78bfa' : (darkMode ? '#9ca3af' : '#6b7280')) }}>
                                {showShadow ? (isTr ? '🕶 Shadow DOM içinde (X-Ray görüşü):' : '🕶 Inside Shadow DOM (X-Ray view):') :
                                 isFailing  ? (isTr ? '❌ Bu element bulunamıyor — Shadow DOM içinde!' : '❌ Cannot find this — it\'s inside Shadow DOM!') :
                                              (isTr ? 'Şifre (<my-password-input> web component):' : 'Password (<my-password-input> web component):')}
                            </div>

                            {/* The web component wrapper */}
                            <div style={{
                                borderRadius: 6, border: `2px ${showShadow ? 'solid' : 'dashed'} ${showShadow ? '#a78bfa' : isFailing ? '#ef4444' : (darkMode ? '#374151' : '#d1d5db')}`,
                                overflow: 'hidden', transition: 'all 0.4s',
                                boxShadow: showShadow ? '0 0 14px #a78bfa44' : isFailing ? '0 0 8px #ef444444' : 'none',
                            }}>
                                {/* Shadow host label */}
                                <div style={{ background: showShadow ? '#a78bfa22' : (darkMode ? '#1f2937' : '#f1f5f9'), padding: '3px 6px', fontSize: 8, color: showShadow ? '#a78bfa' : (darkMode ? '#6b7280' : '#9ca3af'), fontFamily: 'monospace', borderBottom: `1px solid ${showShadow ? '#a78bfa33' : (darkMode ? '#374151' : '#e5e7eb')}` }}>
                                    {'<my-password-input>'}
                                    {showShadow && <span style={{ marginLeft: 6, color: '#f59e0b', fontWeight: 700 }}>← Shadow Host</span>}
                                    {isFailing && <span style={{ marginLeft: 6, color: '#ef4444' }}>← findElement() buraya giremiyor!</span>}
                                </div>

                                {/* Shadow root (only visible in xray mode) */}
                                {showShadow && (
                                    <div style={{ animation: 'simFadeUp 0.4s', padding: '4px 6px', background: darkMode ? '#0f172a' : '#faf5ff' }}>
                                        <div style={{ fontSize: 8, color: '#a78bfa', fontFamily: 'monospace', marginBottom: 3 }}>
                                            #shadow-root (open)
                                        </div>
                                        <div style={{ paddingLeft: 12, fontSize: 8, fontFamily: 'monospace' }}>
                                            <div style={{ color: darkMode ? '#6b7280' : '#9ca3af' }}>{'<style> ... </style>'}</div>
                                            <div style={{
                                                marginTop: 3, padding: '3px 6px',
                                                borderRadius: 3,
                                                border: `1px solid ${isPierced ? '#10b981' : '#a78bfa'}44`,
                                                background: isPierced ? '#10b98122' : '#a78bfa11',
                                                color: isPierced ? '#10b981' : (darkMode ? '#d1d5db' : '#374151'),
                                                fontWeight: isPierced ? 700 : 400,
                                                transition: 'all 0.4s',
                                            }}>
                                                {'<input type="password" id="pwd">'}
                                                {isPierced && <span style={{ color: '#10b981', marginLeft: 4, fontSize: 7 }}>← BULUNDU ✅</span>}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Normal looking input (opaque when not xray) */}
                                {!showShadow && (
                                    <div style={{ padding: '5px 8px', background: darkMode ? '#1f2937' : '#fff' }}>
                                        <input type="password" placeholder="••••••••" style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 10, color: darkMode ? '#d1d5db' : '#374151', width: '100%' }} readOnly />
                                    </div>
                                )}
                            </div>

                            {/* Failure indicator */}
                            {isFailing && (
                                <div style={{ marginTop: 4, fontSize: 9, color: '#ef4444', animation: 'simFadeUp 0.3s', fontFamily: 'monospace' }}>
                                    NoSuchElementException: Unable to locate element: #pwd
                                </div>
                            )}

                            {/* Success indicator */}
                            {isPierced && (
                                <div style={{ marginTop: 4, fontSize: 9, color: '#10b981', animation: 'simFadeUp 0.3s', fontFamily: 'monospace' }}>
                                    ✅ {isTr ? 'shadowRoot.findElement() → bulundu!' : 'shadowRoot.findElement() → found!'}
                                </div>
                            )}
                        </div>

                        {/* Login button - normal DOM */}
                        <div style={{ padding: '6px', borderRadius: 4, background: accent, textAlign: 'center', fontSize: 10, color: '#fff', fontWeight: 700 }}>
                            {isTr ? 'Giriş Yap' : 'Sign In'}
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    <button
                        onClick={() => runSteps([['fail', 300]])}
                        disabled={isRunning}
                        style={{ flex: 1, padding: '5px 6px', borderRadius: 5, border: 'none', cursor: isRunning ? 'not-allowed' : 'pointer', background: '#ef4444', color: '#fff', fontSize: 9, fontWeight: 700 }}
                    >
                        ❌ {isTr ? 'Normal findElement()' : 'Normal findElement()'}
                    </button>
                    <button
                        onClick={() => runSteps([['xray', 200], ['exposed', 500], ['pierced', 600]])}
                        disabled={isRunning}
                        style={{ flex: 1, padding: '5px 6px', borderRadius: 5, border: 'none', cursor: isRunning ? 'not-allowed' : 'pointer', background: '#7c3aed', color: '#fff', fontSize: 9, fontWeight: 700 }}
                    >
                        🕶 {isTr ? 'X-Ray + shadowRoot' : 'X-Ray + shadowRoot'}
                    </button>
                </div>
                <div style={{ marginTop: 4, textAlign: 'right' }}>
                    <button onClick={resetSim} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, background: 'transparent', color: darkMode ? '#6b7280' : '#9ca3af', cursor: 'pointer' }}>↺ Reset</button>
                </div>
            </div>
        )
    }

    // === SHADOW DOM PLAYGROUND ===
    const renderShadowDomPlayground = () => {
        const showRoot = simState === 'root' || simState === 'target'
        const showTarget = simState === 'target'
        return (
            <div style={{ maxWidth: 300 }}>
                <div style={{ fontFamily: 'monospace', fontSize: 10, lineHeight: 2, padding: '10px 14px', borderRadius: 8, background: darkMode ? '#111827' : '#f8fafc', border: `1px solid ${accent}33`, minHeight: 110 }}>
                    <div style={{ color: darkMode ? '#60a5fa' : '#2563eb' }}>{'<my-custom-button>'}</div>
                    <div style={{ paddingLeft: 14, color: (simState === 'host' || showRoot) ? accent : (darkMode ? '#4b5563' : '#9ca3af'), fontWeight: simState === 'host' ? 700 : 400, transition: 'all 0.3s' }}>
                        {'  #shadow-root (open)'}
                        {simState === 'host' && <span style={{ color: '#f59e0b', fontSize: 9, marginLeft: 4 }}>← .shadowRoot</span>}
                    </div>
                    {showRoot && (
                        <div style={{ animation: 'simFadeUp 0.3s' }}>
                            <div style={{ paddingLeft: 28, color: darkMode ? '#a78bfa' : '#7c3aed' }}>{'  <style>...</style>'}</div>
                            <div style={{
                                paddingLeft: 28,
                                color: showTarget ? '#10b981' : (darkMode ? '#d1d5db' : '#374151'),
                                fontWeight: showTarget ? 700 : 400,
                                background: showTarget ? (darkMode ? '#064e3b' : '#ecfdf5') : 'transparent',
                                padding: showTarget ? '1px 4px' : '0 0 0 28px',
                                borderRadius: showTarget ? 3 : 0,
                                transition: 'all 0.4s',
                            }}>
                                {'  <button class="inner-btn">Click Me</button>'}
                                {showTarget && <span style={{ color: '#10b981', fontSize: 9, marginLeft: 4 }}>← FOUND ✅</span>}
                            </div>
                        </div>
                    )}
                    <div style={{ color: darkMode ? '#60a5fa' : '#2563eb' }}>{'</my-custom-button>'}</div>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                    {[
                        { id: 'host',   label: isTr ? '1. Host Bul' : '1. Find Host' },
                        { id: 'root',   label: isTr ? '2. Root Aç' : '2. Pierce Root' },
                        { id: 'target', label: isTr ? '3. Element Bul!' : '3. Find Target!' },
                    ].map(step => (
                        <button
                            key={step.id}
                            onClick={() => {
                                if (!isRunning) {
                                    const order = ['host', 'root', 'target']
                                    const upTo = order.slice(0, order.indexOf(step.id) + 1).map(s => [s, 500])
                                    runSteps(upTo)
                                }
                            }}
                            style={{
                                padding: '5px 10px', borderRadius: 5, border: 'none',
                                cursor: isRunning ? 'not-allowed' : 'pointer',
                                background: simState === step.id ? accent : (darkMode ? '#374151' : '#f1f5f9'),
                                color: simState === step.id ? '#fff' : (darkMode ? '#9ca3af' : '#6b7280'),
                                fontSize: 10, fontWeight: 600, transition: 'all 0.3s'
                            }}
                        >
                            {step.label}
                        </button>
                    ))}
                </div>
                <div style={{ marginTop: 6, textAlign: 'right' }}>
                    <button onClick={resetSim} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, background: 'transparent', color: darkMode ? '#6b7280' : '#9ca3af', cursor: 'pointer' }}>↺ Reset</button>
                </div>
            </div>
        )
    }

    // === DOM VISUALIZER (right pane) ===
    const renderDomVisualizer = () => {
        if (block.scenario === 'explicit-wait') {
            const nodes = [
                { tag: '<div id="app">', level: 0, state: 'normal' },
                { tag: '  <button id="load-btn">', level: 1, state: ['found','done'].includes(simState) ? 'success' : ['clicking','loading'].includes(simState) ? 'active' : 'normal' },
                { tag: '  <div id="spinner">', level: 1, state: ['clicking','loading'].includes(simState) ? 'active' : 'hidden' },
                { tag: '  <div id="result">', level: 1, state: ['found','done'].includes(simState) ? 'found' : 'hidden' },
                { tag: '</div>', level: 0, state: 'normal' },
            ]
            return (
                <div>
                    <div style={{ fontFamily: 'monospace', fontSize: 10, lineHeight: 1.9 }}>
                        {nodes.map((n, idx) => {
                            const col = n.state === 'found' ? '#10b981' : n.state === 'success' ? '#10b981' : n.state === 'active' ? accent : n.state === 'hidden' ? (darkMode ? '#374151' : '#d1d5db') : (darkMode ? '#9ca3af' : '#6b7280')
                            const bg = n.state === 'found' ? (darkMode ? '#064e3b44' : '#ecfdf544') : n.state === 'active' ? `${accent}22` : 'transparent'
                            return (
                                <div key={idx} style={{ paddingLeft: n.level * 14 + 4, paddingRight: 4, paddingTop: 2, paddingBottom: 2, color: col, background: bg, borderRadius: 3, border: (n.state === 'found' || n.state === 'active') ? `1px solid ${n.state === 'found' ? '#10b981' : accent}44` : '1px solid transparent', transition: 'all 0.4s ease', fontWeight: n.state === 'found' ? 700 : 400 }}>
                                    {n.tag}
                                    {n.state === 'hidden' && <span style={{ opacity: 0.5, fontSize: 9, marginLeft: 4 }}>{isTr ? '(gizli)' : '(hidden)'}</span>}
                                    {n.state === 'found' && <span style={{ fontSize: 9, marginLeft: 4 }}>← WebDriverWait ✅</span>}
                                    {n.state === 'active' && <span style={{ fontSize: 9, marginLeft: 4, animation: 'simPulse 1s ease infinite' }}>← {isTr ? 'bekleniyor...' : 'polling...'}</span>}
                                </div>
                            )
                        })}
                    </div>
                    <div style={{ marginTop: 10, padding: '6px 10px', borderRadius: 6, fontSize: 10, background: darkMode ? '#0f172a' : '#f8fafc', border: `1px dashed ${accent}33`, fontFamily: 'monospace' }}>
                        <div style={{ color: accent, fontWeight: 700, marginBottom: 3, fontFamily: 'sans-serif' }}>{isTr ? '🤖 Test Engine:' : '🤖 Test Engine:'}</div>
                        <div style={{ color: darkMode ? '#9ca3af' : '#6b7280', lineHeight: 1.6 }}>
                            {simState === 'idle'     ? (isTr ? '⏸ Hazır — Butona tıkla!' : '⏸ Ready — Click the button!') :
                             simState === 'clicking' ? 'driver.findElement("load-btn").click()' :
                             simState === 'loading'  ? 'WebDriverWait(driver, 10)\n.until(EC.visibility_of(result))' :
                             simState === 'found'    ? '✅ Element found! Test continues.' :
                                                       '✅ Test passed!'}
                        </div>
                    </div>
                </div>
            )
        }

        if (block.scenario === 'implicit-wait') {
            const isNoFail = simState === 'no-fail'
            const isWithRetry = simState === 'with-retry'
            const isWithFound = simState === 'with-found'
            return (
                <div style={{ fontSize: 10, fontFamily: 'monospace' }}>
                    <div style={{ color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: 8, fontFamily: 'sans-serif' }}>
                        {isTr ? '⏱ Zaman Çizelgesi' : '⏱ Timeline'}
                    </div>
                    {[
                        { t: '0s',   label: 'findElement() çağrıldı', active: simState !== 'idle' },
                        { t: '~0s',  label: isNoFail ? 'NoSuchElementException! ❌' : isWithRetry || isWithFound ? 'DOM tarıyor... 🔄' : '—', error: isNoFail, active: isNoFail || isWithRetry || isWithFound },
                        { t: '~2s',  label: isWithFound ? 'Element bulundu! ✅' : '—', success: isWithFound, active: isWithFound },
                    ].map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
                            <div style={{ width: 28, flexShrink: 0, color: item.error ? '#ef4444' : item.success ? '#10b981' : (darkMode ? '#6b7280' : '#9ca3af'), fontWeight: 700, paddingTop: 3 }}>{item.t}</div>
                            <div style={{ flex: 1, padding: '3px 7px', borderRadius: 4, background: item.error ? '#ef444422' : item.success ? '#10b98122' : (item.active ? `${accent}22` : 'transparent'), border: `1px solid ${item.error ? '#ef4444' : item.success ? '#10b981' : (item.active ? accent : (darkMode ? '#374151' : '#e5e7eb'))}44`, color: item.error ? '#ef4444' : item.success ? '#10b981' : (darkMode ? '#9ca3af' : '#6b7280'), opacity: item.active ? 1 : 0.4, transition: 'all 0.4s' }}>
                                {item.label}
                            </div>
                        </div>
                    ))}
                    <div style={{ marginTop: 10, padding: '6px 10px', borderRadius: 6, background: darkMode ? '#0f172a' : '#f8fafc', border: `1px dashed ${accent}33`, fontFamily: 'sans-serif' }}>
                        <div style={{ color: accent, fontWeight: 700 }}>{isTr ? '📖 Fark Nedir?' : '📖 Key Difference:'}</div>
                        <div style={{ color: darkMode ? '#9ca3af' : '#6b7280', marginTop: 2, lineHeight: 1.5 }}>
                            {isTr ? 'Implicit Wait, tüm findElement() çağrılarına global uygulanır. Koşul bazlı değil, sadece süre bazlıdır.' : 'Implicit Wait applies globally to all findElement() calls. Time-based only, not condition-based.'}
                        </div>
                    </div>
                </div>
            )
        }

        if (block.scenario === 'iframe-detection') {
            const phase = simState
            const isFound    = ['found','switching','inside'].includes(phase)
            const isSwitching = phase === 'switching'
            const isInside   = phase === 'inside'
            return (
                <div style={{ fontSize: 10, fontFamily: 'monospace' }}>
                    <div style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontFamily: 'sans-serif', marginBottom: 8 }}>
                        {isTr ? '🗂 DOM Ağacı — iframe Konumları' : '🗂 DOM Tree — iframe Locations'}
                    </div>
                    {/* DOM tree */}
                    {[
                        { tag: '<html>', level: 0 },
                        { tag: '  <body>', level: 1 },
                        { tag: '    <div id="app">  ← Normal DOM', level: 2, normal: true },
                        { tag: '    <iframe src="stripe.com">  ← 💳 iframe[0]', level: 2, color: '#f59e0b', active: isFound, found: isInside },
                        { tag: '    <iframe src="youtube.com"> ← 🎬 iframe[1]', level: 2, color: '#3b82f6', active: isFound && !isInside },
                        { tag: '  </body>', level: 1 },
                    ].map((n, idx) => (
                        <div key={idx} style={{
                            paddingLeft: n.level * 10 + 3, paddingRight: 3, paddingTop: 2, paddingBottom: 2,
                            borderRadius: 3, marginBottom: 2,
                            background: n.found ? '#10b98122' : n.active ? `${n.color || accent}22` : 'transparent',
                            border: (n.active || n.found) ? `1px solid ${n.found ? '#10b981' : n.color || accent}44` : '1px solid transparent',
                            color: n.found ? '#10b981' : n.active ? (n.color || accent) : n.normal ? (darkMode ? '#60a5fa' : '#2563eb') : (darkMode ? '#9ca3af' : '#6b7280'),
                            fontWeight: (n.active || n.found) ? 700 : 400,
                            transition: 'all 0.4s',
                        }}>
                            {n.tag}
                            {n.found && <span style={{ marginLeft: 4, fontSize: 9 }}>← driver burada şimdi!</span>}
                        </div>
                    ))}

                    {/* Status messages */}
                    <div style={{ marginTop: 10, padding: '6px 10px', borderRadius: 6, background: darkMode ? '#0f172a' : '#f8fafc', border: `1px dashed ${accent}33`, fontFamily: 'sans-serif' }}>
                        <div style={{ color: accent, fontWeight: 700 }}>{isTr ? '🤖 Driver Durumu:' : '🤖 Driver Status:'}</div>
                        <div style={{ color: darkMode ? '#9ca3af' : '#6b7280', marginTop: 2, lineHeight: 1.6 }}>
                            {phase === 'idle'      ? (isTr ? '⏸ Hazır — Tarama başlatılmadı' : '⏸ Ready — No scan yet') :
                             phase === 'scanning'  ? (isTr ? '🔍 driver.findElements(By.tagName("iframe"))' : '🔍 driver.findElements(By.tagName("iframe"))') :
                             phase === 'found'     ? (isTr ? '✅ 2 iframe bulundu!\niframe[0]: Stripe, iframe[1]: YouTube' : '✅ 2 iframes found!\niframe[0]: Stripe, iframe[1]: YouTube') :
                             phase === 'switching' ? 'driver.switchTo().frame(0)' :
                             (isTr ? '✅ İçindeyiz! iframe[0] context\'i aktif.\nArtık iframe içindeki elementleri bulabiliriz.' : '✅ Inside! iframe[0] context active.\nNow we can find elements inside the iframe.')}
                        </div>
                    </div>

                    {/* Key insight */}
                    {isInside && (
                        <div style={{ marginTop: 8, padding: '6px 10px', borderRadius: 6, background: '#10b98122', border: '1px solid #10b98144', animation: 'simFadeUp 0.4s', fontFamily: 'sans-serif' }}>
                            <div style={{ color: '#10b981', fontWeight: 700, marginBottom: 3 }}>💡 {isTr ? 'Altın Kural:' : 'Golden Rule:'}</div>
                            <div style={{ color: darkMode ? '#6ee7b7' : '#065f46', fontSize: 9, lineHeight: 1.5 }}>
                                {isTr ? 'İşin bitince mutlaka switchTo().defaultContent() çağır! Yoksa diğer elementler "not found" verir.' : 'Always call switchTo().defaultContent() when done! Otherwise other elements give "not found".'}
                            </div>
                        </div>
                    )}
                </div>
            )
        }

        if (block.scenario === 'shadow-dom-xray') {
            const phase = simState
            const isFailing  = phase === 'fail'
            const isXray     = phase === 'xray'
            const isExposed  = phase === 'exposed'
            const isPierced  = phase === 'pierced'
            return (
                <div style={{ fontSize: 10, fontFamily: 'monospace' }}>
                    <div style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontFamily: 'sans-serif', marginBottom: 8 }}>
                        {isTr ? '🔬 Shadow DOM Katmanları' : '🔬 Shadow DOM Layers'}
                    </div>

                    {[
                        { tag: '<body>', level: 0 },
                        { tag: '  <input id="username">', level: 1, normal: true, desc: isTr ? '← Normal DOM ✅' : '← Normal DOM ✅' },
                        { tag: '  <my-password-input>', level: 1, host: true },
                        { tag: '    #shadow-root (open)', level: 2, root: true, show: isXray || isExposed || isPierced },
                        { tag: '      <style>...</style>', level: 3, inner: true, show: isExposed || isPierced },
                        { tag: '      <input id="pwd">', level: 3, target: true, show: isExposed || isPierced, found: isPierced },
                        { tag: '  </my-password-input>', level: 1, host: true },
                    ].filter(n => n.show !== false).map((n, idx) => (
                        <div key={idx} style={{
                            paddingLeft: n.level * 12 + 3, paddingRight: 3, paddingTop: 2, paddingBottom: 2,
                            borderRadius: 3, marginBottom: 2,
                            animation: (n.root || n.inner || n.target) ? 'simFadeUp 0.3s' : 'none',
                            background: n.found ? '#10b98122' : n.root ? '#a78bfa11' : n.target ? '#a78bfa11' : 'transparent',
                            border: n.found ? '1px solid #10b98144' : (n.root || n.target) ? '1px solid #a78bfa33' : '1px solid transparent',
                            color: n.found ? '#10b981' : n.normal ? (darkMode ? '#60a5fa' : '#2563eb') : n.host ? (isFailing ? '#ef4444' : '#a78bfa') : n.root ? '#f59e0b' : n.target ? (darkMode ? '#d1d5db' : '#374151') : (darkMode ? '#6b7280' : '#9ca3af'),
                            fontWeight: (n.found || n.root) ? 700 : 400,
                            transition: 'all 0.4s',
                        }}>
                            {n.tag}
                            {n.normal && <span style={{ opacity: 0.7 }}> {n.desc}</span>}
                            {n.host && isFailing && <span style={{ color: '#ef4444', marginLeft: 4, fontSize: 9 }}>← girilemiyor!</span>}
                            {n.host && isXray && <span style={{ color: '#f59e0b', marginLeft: 4, fontSize: 9 }}>← .shadowRoot</span>}
                            {n.found && <span style={{ marginLeft: 4, fontSize: 9 }}>← getShadowRoot().findElement() ✅</span>}
                        </div>
                    ))}

                    {/* Status */}
                    <div style={{ marginTop: 10, padding: '6px 10px', borderRadius: 6, background: darkMode ? '#0f172a' : '#f8fafc', border: `1px dashed ${isFailing ? '#ef4444' : isPierced ? '#10b981' : '#a78bfa'}33`, fontFamily: 'sans-serif' }}>
                        <div style={{ color: isFailing ? '#ef4444' : isPierced ? '#10b981' : '#a78bfa', fontWeight: 700 }}>
                            {isFailing ? '❌ Hata:' : isPierced ? '✅ Başarı:' : '🕶 X-Ray Modu:'}
                        </div>
                        <div style={{ color: darkMode ? '#9ca3af' : '#6b7280', marginTop: 2, lineHeight: 1.6 }}>
                            {phase === 'idle'     ? (isTr ? '⏸ Hazır. Bir yöntem seç.' : '⏸ Ready. Choose a method.') :
                             isFailing            ? 'NoSuchElementException:\ndriver.findElement(By.id("pwd"))\n→ Shadow DOM içindeki elemente erişilemiyor!' :
                             isXray               ? (isTr ? 'shadowHost.getShadowRoot() çağrıldı...' : 'shadowHost.getShadowRoot() called...') :
                             isExposed            ? (isTr ? '#shadow-root açıldı! İçerideki elementler görünür.' : '#shadow-root open! Inner elements visible.') :
                             (isTr ? 'shadowRoot.findElement(By.css("input#pwd")) → ✅' : 'shadowRoot.findElement(By.css("input#pwd")) → ✅')}
                        </div>
                    </div>
                </div>
            )
        }

        if (block.scenario === 'shadow-dom') {
            return (
                <div style={{ fontSize: 10, fontFamily: 'monospace' }}>
                    <div style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontFamily: 'sans-serif', marginBottom: 8 }}>
                        {isTr ? '🔬 DOM Erişim Katmanları' : '🔬 DOM Access Layers'}
                    </div>
                    {[
                        { label: 'Document', desc: 'querySelector() — normal DOM', active: true, layer: 0 },
                        { label: 'Shadow Host', desc: '<my-custom-button>', active: simState === 'host' || simState === 'root' || simState === 'target', layer: 1 },
                        { label: 'Shadow Root', desc: '.shadowRoot property', active: simState === 'root' || simState === 'target', layer: 2 },
                        { label: 'Target Element', desc: '.inner-btn → CLICK ✅', active: simState === 'target', layer: 3, success: simState === 'target' },
                    ].map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
                            <span style={{ color: item.active ? accent : (darkMode ? '#374151' : '#e5e7eb'), paddingLeft: item.layer * 10, flexShrink: 0 }}>{idx > 0 ? '↳' : '▸'}</span>
                            <div style={{ flex: 1, padding: '3px 8px', borderRadius: 4, background: item.success ? '#10b98122' : (item.active ? `${accent}22` : (darkMode ? '#1f2937' : '#f9fafb')), border: `1px solid ${item.success ? '#10b981' : item.active ? accent : (darkMode ? '#374151' : '#e5e7eb')}44`, color: item.success ? '#10b981' : (item.active ? (darkMode ? '#e5e7eb' : '#111827') : (darkMode ? '#4b5563' : '#9ca3af')), fontWeight: item.active ? 600 : 400, transition: 'all 0.4s' }}>
                                <span style={{ fontWeight: 700 }}>{item.label}</span>
                                <span style={{ opacity: 0.7, marginLeft: 4 }}>— {item.desc}</span>
                            </div>
                        </div>
                    ))}
                    {simState === 'target' && (
                        <div style={{ marginTop: 8, padding: '6px 10px', borderRadius: 6, background: '#10b98122', border: '1px solid #10b98144', color: '#10b981', animation: 'simFadeUp 0.4s', fontFamily: 'sans-serif', fontSize: 10 }}>
                            ✅ {isTr ? 'Shadow DOM başarıyla geçildi! Element bulundu.' : 'Shadow DOM pierced! Element found and clicked.'}
                        </div>
                    )}
                </div>
            )
        }

        return null
    }

    const title = (block.title && typeof block.title === 'object')
        ? (isTr ? block.title.tr : block.title.en)
        : (block.title || '')

    return (
        <div className={`mt-6 rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}
             style={{ boxShadow: `0 0 20px ${accent}18` }}>
            <style>{`
                @keyframes simSpin { to { transform: rotate(360deg); } }
                @keyframes simFadeUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
                @keyframes simPulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
                @media (prefers-reduced-motion: reduce) { .sim-animate { animation: none !important; } }
            `}</style>

            {/* Header */}
            <div style={{ background: accent }} className="px-4 py-3 flex items-center gap-3">
                <span className="text-2xl">{block.icon || '🧪'}</span>
                <div>
                    <div className="text-white font-bold text-sm">{title}</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        {isTr ? 'İnteraktif Simülasyon — Gör, Anla, Dene!' : 'Interactive Simulation — See, Understand, Try!'}
                    </div>
                </div>
                <span className="ml-auto text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full hidden md:block">🧪 Live Sim</span>
            </div>

            {/* Description */}
            {block.description && (
                <div className={`px-4 py-2.5 text-sm border-b ${darkMode ? 'border-gray-700 text-gray-300 bg-gray-800' : 'border-gray-200 text-gray-600 bg-gray-50'}`}>
                    {isTr ? block.description.tr : block.description.en}
                </div>
            )}

            {/* Body: split layout */}
            <div className="grid md:grid-cols-2">
                {/* Left: Playground */}
                <div className={`p-4 border-b md:border-b-0 md:border-r ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        🎮 {isTr ? 'Canlı Demo Alanı' : 'Live Playground'}
                    </div>
                    {block.scenario === 'explicit-wait'     && renderExplicitWaitPlayground()}
                    {block.scenario === 'implicit-wait'     && renderImplicitWaitPlayground()}
                    {block.scenario === 'shadow-dom'        && renderShadowDomPlayground()}
                    {block.scenario === 'iframe-detection'  && renderIframeDetectionPlayground()}
                    {block.scenario === 'shadow-dom-xray'   && renderShadowDomXrayPlayground()}
                </div>

                {/* Right: DOM Visualizer */}
                <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        🔬 {isTr ? 'DOM & Otomasyon Durumu' : 'DOM & Automation State'}
                    </div>
                    {renderDomVisualizer()}
                </div>
            </div>

            {/* Code block */}
            {block.code && (
                <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className={`px-4 py-2 flex items-center gap-2 text-xs ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                        <span>💻</span>
                        <span className="font-semibold">{isTr ? 'Otomasyon Kodu — Bu Senaryoyu Test Et' : 'Automation Code — Test This Scenario'}</span>
                    </div>
                    <CodeBlock code={block.code} language={block.language || 'java'} darkMode={darkMode} />
                </div>
            )}
        </div>
    )
}

// ─── Block Renderer ───────────────────────────────────────────────────────────

function renderBlock(block, i, darkMode, language = 'en') {
    const textCls = `text-sm leading-relaxed mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`
    const h3Cls = `text-xl font-bold mt-8 mb-3 pb-2 border-b ${darkMode ? 'text-white border-gray-700' : 'text-gray-800 border-gray-200'}`
    const h4Cls = `text-base font-semibold mt-5 mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`
    const bulletColor = block.accentColor || (darkMode ? 'text-indigo-400' : 'text-indigo-600')

    switch (block.type) {
        case 'text':
            return <p key={i} className={textCls}>{tx(block.content, language)}</p>
        case 'heading':
            return (
                <h3 key={i} className={h3Cls}>
                    {tx(block.text || block.content, language)}
                    {block.difficulty && <span className={`ml-3 text-xs font-normal px-2 py-0.5 rounded-full align-middle ${block.difficulty.startsWith('🟢') ? (darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700') : block.difficulty.startsWith('🟡') ? (darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-700') : (darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700')}`}>{block.difficulty}</span>}
                </h3>
            )
        case 'subheading':
            return <h4 key={i} className={h4Cls}>{tx(block.text || block.content, language)}</h4>
        case 'code':
            return (
                <div key={i}>
                    {block.label && <div className={`mt-4 mb-1 text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{block.label}</div>}
                    <CodeBlock code={block.code ?? block.content} language={block.language} darkMode={darkMode} />
                    {block.expected && (
                        <div className={`mt-1 p-3 rounded-b-lg font-mono text-xs border-l-4 border-emerald-500 ${darkMode ? 'bg-gray-900 text-emerald-400' : 'bg-emerald-50 text-emerald-800'}`}>
                            <div className={`text-xs font-sans mb-1 ${darkMode ? 'opacity-50' : 'opacity-60'}`}>▶ Beklenen Çıktı:</div>
                            <pre className="whitespace-pre-wrap">{block.expected}</pre>
                        </div>
                    )}
                </div>
            )
        case 'tip':
            return (
                <div key={i} className={`mt-4 p-4 rounded-lg border-l-4 border-green-500 text-sm ${darkMode ? 'bg-green-900/20 text-green-300' : 'bg-green-50 text-green-800'}`}>
                    💡 <strong>{language === 'tr' ? 'İpucu: ' : 'Tip: '}</strong>{tx(block.content, language)}
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
                    ⚠️ <strong>Dikkat: </strong>{block.content}
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
                            <span className="leading-relaxed">{typeof item === 'string' ? item : <span><strong>{tx(item.label, language)}</strong>{item.desc && `: ${tx(item.desc, language)}`}</span>}</span>
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
                            <div className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{tx(item.label, language)}</div>
                            {item.desc && <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{tx(item.desc, language)}</div>}
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
                                {block.headers.map((h, j) => <th key={j} className={`p-3 text-left font-semibold border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>{tx(h, language)}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {block.rows.map((row, j) => (
                                <tr key={j} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                                    {row.map((cell, k) => <td key={k} className={`p-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{tx(cell, language)}</td>)}
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
        case 'comparison':
            return <ComparisonBlock key={i} block={block} darkMode={darkMode} language={language} />
        case 'quiz':
            return <QuizBlock key={i} block={block} darkMode={darkMode} language={language} />
        case 'visual':
            return <VisualBlock key={i} block={block} darkMode={darkMode} />
        case 'callout':
            return <CalloutBlock key={i} block={block} darkMode={darkMode} />
        case 'java-compare':
            return <JavaCompareBlock key={i} block={block} darkMode={darkMode} />

        case 'postman-compare':
            return <PostmanCompareBlock key={i} block={block} darkMode={darkMode} language={language} />

        case 'editor':
            if (block.lang === 'typescript')
                return <TSEditor key={i} defaultCode={block.defaultCode || block.code || ''} height={block.height} />
            if (block.lang === 'sql')
                return <SQLEditor key={i} defaultCode={block.defaultCode || block.code || ''} schema={block.schema} height={block.height} />
            return <PyodideEditor key={i} defaultCode={block.defaultCode || block.code || ''} height={block.height} />

        // ── New block types ────────────────────────────────────────────────────

        case 'simple-box':
            return (
                <div key={i} className="mt-4 p-4 rounded-xl border-2 flex items-start gap-3" style={{ background: '#fef3c7', borderColor: '#f59e0b' }}>
                    <span className="text-2xl flex-shrink-0">{block.emoji || '💡'}</span>
                    <p className="text-sm leading-relaxed" style={{ color: '#78350f' }}>
                        {tx(block.content, language)}
                    </p>
                </div>
            )

        case 'glossary-term':
            return (
                <div key={i} className={`mt-4 rounded-xl border overflow-hidden ${darkMode ? 'border-purple-800 bg-purple-900/10' : 'border-purple-200 bg-purple-50'}`}>
                    <div className={`px-4 py-2 font-mono font-bold text-sm ${darkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>
                        📖 {block.term}
                    </div>
                    <div className="p-4 space-y-2.5">
                        {block.items?.map((item, j) => (
                            <div key={j} className={`flex items-start gap-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                                <div>
                                    <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                        {tx(item.label, language)}:
                                    </span>{' '}
                                    <span>{tx(item.content, language)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )

        case 'glossary-section':
            return (
                <div key={i} className={`mt-8 p-5 rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                    <div className={`flex items-center gap-2 mb-4 pb-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <span className="text-xl">📚</span>
                        <h4 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {language === 'tr' ? 'Terimler Sözlüğü' : 'Glossary'}
                        </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {block.terms?.map((item, j) => (
                            <div key={j} className={`p-3 rounded-lg border ${darkMode ? 'bg-gray-750 border-gray-700' : 'bg-white border-gray-200'}`}>
                                <div className={`font-mono font-bold text-sm mb-1 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>{item.term}</div>
                                <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {tx(item.definition, language)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )

        case 'interview-questions':
            return <InterviewQuestionsBlock key={i} block={block} darkMode={darkMode} />

        case 'error-dictionary':
            return <ErrorDictionaryBlock key={i} block={block} darkMode={darkMode} />

        case 'quiz-fill':
            return <QuizFillBlock key={i} block={block} darkMode={darkMode} />

        case 'installation':
            return (
                <div key={i} className="mt-4">
                    {block.title && (
                        <h4 className={`text-sm font-semibold mb-3 uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {tx(block.title, language)}
                        </h4>
                    )}
                    <div className="space-y-2">
                        {block.steps?.map((step, j) => (
                            <div key={j} className={`rounded-xl border overflow-hidden ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <div className="bg-slate-900 px-4 py-2.5 flex items-center gap-3">
                                    <span className={`w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-700 text-gray-200'}`}>{j + 1}</span>
                                    <code className="font-mono text-sm text-green-400 flex-1">{step.cmd}</code>
                                    {step.cmd_mac && <code className="font-mono text-xs text-gray-500 hidden md:block">{step.cmd_mac}</code>}
                                </div>
                                <div className={`px-4 py-2 text-sm ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-600'}`}>
                                    {tx(step.explanation, language)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )

        case 'file-tree':
            return (
                <div key={i} className={`mt-4 rounded-xl border overflow-hidden ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    {block.title && (
                        <div className={`px-4 py-2.5 text-sm font-semibold ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
                            📁 {tx(block.title, language)}
                        </div>
                    )}
                    <div className="bg-slate-900 p-4 overflow-x-auto">
                        <pre className="font-mono text-xs text-slate-300 leading-relaxed whitespace-pre">{block.tree}</pre>
                    </div>
                    {block.note && (
                        <div className={`px-4 py-2 text-xs italic border-t ${darkMode ? 'bg-gray-800 text-gray-500 border-gray-700' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                            💡 {tx(block.note, language)}
                        </div>
                    )}
                </div>
            )

        case 'diagram-svg':
            return (
                <div key={i} className="mt-5">
                    {block.title && (
                        <div className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {tx(block.title, language)}
                        </div>
                    )}
                    <div
                        className="rounded-xl overflow-hidden w-full"
                        dangerouslySetInnerHTML={{ __html: block.svg }}
                    />
                </div>
            )

        case 'locator-visual':
            return <LocatorVisualBlock key={i} block={block} darkMode={darkMode} language={language} />

        case 'selenium-visual':
            return <SeleniumVisualBlock key={i} block={block} darkMode={darkMode} language={language} />

        case 'playwright-visual':
            return <PlaywrightVisualBlock key={i} block={block} darkMode={darkMode} language={language} />

        case 'simulation':
            return <SimulationBlock key={i} block={block} darkMode={darkMode} language={language} />

        default:
            return null
    }
}

// ─── TopicPage ────────────────────────────────────────────────────────────────

function TopicPage({ data, gradient, bgLight, extraBanner }) {
    const { language } = useLanguage()
    const location = useLocation()
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        return saved !== null ? JSON.parse(saved) : true
    })
    const [activeTab, setActiveTab] = useState(() => location.state?.openTab ?? 0)
    const [completedTabs, setCompletedTabs] = useState(() => {
        try {
            const d = data['tr'] || data['en']
            const key = (d?.hero?.title || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
            const saved = localStorage.getItem(`progress_${key}`)
            return saved ? JSON.parse(saved) : {}
        } catch { return {} }
    })

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        window.scrollTo(0, 0)
    }, [darkMode])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [activeTab])

    const content = data[language] || data['en']
    const { hero, tabs, sections } = content
    const pageKey = (hero?.title || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    const completedCount = Object.values(completedTabs).filter(Boolean).length

    const toggleTabComplete = (tabIndex, e) => {
        e.stopPropagation()
        const updated = { ...completedTabs, [tabIndex]: !completedTabs[tabIndex] }
        setCompletedTabs(updated)
        try { localStorage.setItem(`progress_${pageKey}`, JSON.stringify(updated)) } catch {}
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-gray-900' : bgLight}`}>
            <ScrollProgressBar />
            <HomeButton />
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="container mx-auto px-3 py-4 md:px-4 md:py-8 max-w-7xl">
                {/* Hero */}
                <div className={`rounded-xl md:rounded-2xl p-4 md:p-8 mb-4 md:mb-6 bg-gradient-to-r ${gradient} text-white shadow-xl`}>
                    <h1 className="text-xl md:text-4xl font-bold mb-1 md:mb-2">{hero.title}</h1>
                    <p className="text-sm md:text-xl opacity-90">{hero.subtitle}</p>
                    <p className="mt-2 md:mt-3 opacity-80 max-w-3xl text-xs md:text-sm leading-relaxed hidden sm:block">{hero.intro}</p>
                </div>

                {/* Extra Banner (e.g. resource link) */}
                {extraBanner}

                {/* Sidebar + Content layout */}
                <div className="flex gap-3 md:gap-5 items-start">

                    {/* Vertical Sidebar Tabs */}
                    <div className={`flex-shrink-0 w-10 md:w-52 self-start sticky top-3 rounded-xl p-1 md:p-2 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                        {/* Progress counter — desktop only */}
                        {completedCount > 0 && (
                            <div className="hidden md:block mb-2 px-2">
                                <div className={`text-xs font-semibold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {completedCount}/{tabs.length} tamamlandı
                                </div>
                                <div className={`h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                    <div
                                        className="h-full rounded-full bg-green-500 transition-all duration-500"
                                        style={{ width: `${(completedCount / tabs.length) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col gap-0.5 md:gap-1">
                            {tabs.map((tab, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveTab(i)}
                                    title={tab}
                                    className={`w-full text-left rounded-lg font-semibold transition-all duration-200 ${activeTab === i
                                        ? `bg-gradient-to-r ${gradient} text-white shadow-md`
                                        : darkMode
                                            ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                                            : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                                        } px-1.5 py-2 md:px-3 md:py-2.5`}
                                >
                                    {/* Mobile: emoji + green dot if completed */}
                                    <span className="md:hidden text-base text-center block leading-none relative">
                                        {[...tab][0]}
                                        {completedTabs[i] && (
                                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-white" />
                                        )}
                                    </span>
                                    {/* Desktop: label + completion toggle */}
                                    <span className="hidden md:flex items-center justify-between gap-1 text-xs leading-snug">
                                        <span className="flex-1 truncate">{tab}</span>
                                        <span
                                            role="checkbox"
                                            aria-checked={!!completedTabs[i]}
                                            onClick={(e) => toggleTabComplete(i, e)}
                                            title={completedTabs[i] ? 'Tamamlandı — kaldır' : 'Tamamlandı işaretle'}
                                            className={`flex-shrink-0 w-4 h-4 rounded border transition-all cursor-pointer flex items-center justify-center ${
                                                completedTabs[i]
                                                    ? 'bg-green-500 border-green-500 text-white'
                                                    : darkMode
                                                        ? 'border-gray-600 hover:border-green-400'
                                                        : 'border-gray-300 hover:border-green-500'
                                            }`}
                                        >
                                            {completedTabs[i] && <span className="text-white leading-none" style={{ fontSize: '10px' }}>✓</span>}
                                        </span>
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main content + pagination */}
                    <div className="flex-1 min-w-0">
                        {/* Content */}
                        <div className={`rounded-2xl p-4 md:p-8 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                {tx(sections[activeTab]?.title, language)}
                            </h2>
                            {sections[activeTab]?.blocks?.map((block, i) => renderBlock(block, i, darkMode, language))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-between mt-4 md:mt-6 gap-4">
                            {activeTab > 0 && (
                                <button
                                    onClick={() => setActiveTab(activeTab - 1)}
                                    className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                                >
                                    ← {tabs[activeTab - 1]}
                                </button>
                            )}
                            {activeTab < tabs.length - 1 && (
                                <button
                                    onClick={() => setActiveTab(activeTab + 1)}
                                    className={`ml-auto flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all bg-gradient-to-r ${gradient} text-white hover:shadow-lg`}
                                >
                                    {tabs[activeTab + 1]} →
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default TopicPage
