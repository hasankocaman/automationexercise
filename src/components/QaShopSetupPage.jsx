// src/components/QaShopSetupPage.jsx
// QA Shop Kurulum Rehberi — /qa-shop-setup
//
// QA Shop pratik ortamının (ayrı PostgreSQL + ayrı Express API) kurulum ve
// ilk test adımlarını anlatır. Sayfa kabuğu PortfolioPage/SprintPage kalıbını
// izler: TopicHeader + ScrollProgressBar + useDarkModeState + sabit ana sayfa
// butonu.
//
// TopicPage KULLANILMAZ. Bu bir ders sayfası değil, sıralı bir yordam
// rehberidir; TopicPage'in quiz/mülakat/ustalık makinesi burada anlamsız
// yükümlülükler doğururdu (her sekmede video+animasyon+sandbox gibi).
//
// Şu an yalnızca admin görüyor. Herkese açılacağı gün iki satır değişir:
// App.jsx'teki sarmalayıcı ve seo.js'teki noindex.

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import TopicHeader from './TopicHeader'
import { qaShopSetupData } from '../data/qaShopSetupData'

const tx = (val, isTr) => {
    if (val == null) return ''
    if (typeof val === 'string') return val
    return isTr ? (val.tr ?? val.en ?? '') : (val.en ?? val.tr ?? '')
}

function ScrollProgressBar() {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const update = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement
            const max = Math.max(1, scrollHeight - clientHeight)
            setProgress(Math.min(100, Math.max(0, (scrollTop / max) * 100)))
        }
        update()
        window.addEventListener('scroll', update, { passive: true })
        return () => window.removeEventListener('scroll', update)
    }, [])
    return (
        <div className="fixed left-0 right-0 top-0 z-[9999] h-[3px] bg-transparent">
            <div
                className="h-full transition-[width] duration-100"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #6366f1, #0ea5e9, #14b8a6)' }}
            />
        </div>
    )
}

function useDarkModeState() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        const isDark = saved !== null ? JSON.parse(saved) : true
        document.documentElement.classList.toggle('dark-mode', isDark)
        document.documentElement.classList.toggle('light-mode-forced', !isDark)
        return isDark
    })
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        document.documentElement.classList.toggle('dark-mode', darkMode)
        document.documentElement.classList.toggle('light-mode-forced', !darkMode)
    }, [darkMode])
    return [darkMode, setDarkMode]
}

// ─── Kod bloğu ──────────────────────────────────────────────────────────────
// Kopyala düğmesi zorunlu (CLAUDE.md §8). Prism yerine sade <pre>: bu sayfadaki
// kod parçaları komut satırı ve yapılandırma; renklendirme okunurluğa bir şey
// katmıyor, ek bir CDN bağımlılığı getiriyordu.
function CodeBlock({ code, language, darkMode }) {
    const [copied, setCopied] = useState(false)
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 1600)
        } catch {
            // Pano izni yoksa sessizce geç — kod zaten seçilebilir durumda.
        }
    }
    return (
        <div className="relative my-3">
            <div className="flex items-center justify-between rounded-t-lg border border-b-0 border-slate-700 bg-slate-800 px-3 py-1.5">
                <span className="font-mono text-[11px] uppercase tracking-wide text-slate-400">{language}</span>
                <button
                    type="button"
                    onClick={copy}
                    className="min-h-[36px] rounded px-2 text-xs font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
                >
                    {copied ? '✓' : '⧉'}
                </button>
            </div>
            <pre className={`overflow-x-auto rounded-b-lg border border-slate-700 p-3 text-[13px] leading-relaxed ${darkMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-900 text-slate-200'}`}>
                <code className="font-mono">{code}</code>
            </pre>
        </div>
    )
}

const CALLOUT_TONES = {
    warning: { emoji: '⚠️', border: 'border-amber-500/60', bg: 'bg-amber-500/10', title: 'text-amber-300' },
    insight: { emoji: '💡', border: 'border-sky-500/60', bg: 'bg-sky-500/10', title: 'text-sky-300' },
}

function Block({ block, isTr, darkMode }) {
    const body = darkMode ? 'text-slate-300' : 'text-slate-700'
    const heading = darkMode ? 'text-slate-100' : 'text-slate-900'

    switch (block.type) {
        case 'why':
            return (
                <div className={`my-4 rounded-xl border-l-4 border-indigo-500 py-3 pl-4 pr-3 ${darkMode ? 'bg-indigo-500/10' : 'bg-indigo-50'}`}>
                    <p className={`mb-1 text-sm font-bold ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>
                        {tx(block.title, isTr)}
                    </p>
                    <p className={`text-sm leading-relaxed ${body}`}>{tx(block.content, isTr)}</p>
                </div>
            )

        case 'substep':
            return (
                <div className="my-5">
                    <h3 className={`mb-1.5 text-base font-bold ${heading}`}>{tx(block.title, isTr)}</h3>
                    <p className={`text-sm leading-relaxed ${body}`}>{tx(block.content, isTr)}</p>
                    {block.code && (
                        <CodeBlock code={tx(block.code, isTr)} language={block.language || 'bash'} darkMode={darkMode} />
                    )}
                </div>
            )

        case 'callout': {
            const tone = CALLOUT_TONES[block.tone] || CALLOUT_TONES.insight
            return (
                <div className={`my-4 rounded-xl border ${tone.border} ${tone.bg} p-3 md:p-4`}>
                    <p className={`mb-1 text-sm font-bold ${tone.title}`}>
                        {tone.emoji} {tx(block.title, isTr)}
                    </p>
                    <p className={`text-sm leading-relaxed ${body}`}>{tx(block.content, isTr)}</p>
                </div>
            )
        }

        case 'table':
            return (
                <div className="my-4">
                    {block.title && <h3 className={`mb-2 text-base font-bold ${heading}`}>{tx(block.title, isTr)}</h3>}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[420px] border-collapse text-sm">
                            <thead>
                                <tr className={darkMode ? 'bg-slate-800' : 'bg-slate-100'}>
                                    {tx(block.headers, isTr).map((h) => (
                                        <th key={h} className={`border px-3 py-2 text-left font-semibold ${darkMode ? 'border-slate-700 text-slate-200' : 'border-slate-300 text-slate-800'}`}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {block.rows.map((row, ri) => (
                                    <tr key={ri} className={ri % 2 ? (darkMode ? 'bg-slate-900/40' : 'bg-slate-50') : ''}>
                                        {row.map((cell, ci) => (
                                            <td key={ci} className={`border px-3 py-2 align-top ${darkMode ? 'border-slate-700 text-slate-300' : 'border-slate-300 text-slate-700'}`}>
                                                {tx(cell, isTr)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )

        // Arayüzde sırayla yapılacak tıklamalar. Düz metinde "şuraya tıkla, sonra
        // şuraya" cümleleri birbirine karışıyordu; numaralı liste sırayı görünür
        // kılıyor ve kullanıcı nerede kaldığını kaybetmiyor.
        case 'clickpath':
            return (
                <div className={`my-4 rounded-xl border p-3 md:p-4 ${darkMode ? 'border-slate-700 bg-slate-800/40' : 'border-slate-300 bg-white'}`}>
                    {block.title && (
                        <p className={`mb-2.5 text-sm font-bold ${heading}`}>👉 {tx(block.title, isTr)}</p>
                    )}
                    <ol className="space-y-2">
                        {block.items.map((item, i) => (
                            <li key={i} className={`flex gap-2.5 text-sm leading-relaxed ${body}`}>
                                <span
                                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold ${darkMode ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-700'}`}
                                    aria-hidden="true"
                                >
                                    {i + 1}
                                </span>
                                <span>{tx(item, isTr)}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            )

        case 'checklist':
            return (
                <div className={`my-4 rounded-xl border p-3 md:p-4 ${darkMode ? 'border-emerald-600/50 bg-emerald-500/10' : 'border-emerald-300 bg-emerald-50'}`}>
                    <p className={`mb-2 text-sm font-bold ${darkMode ? 'text-emerald-300' : 'text-emerald-800'}`}>
                        {tx(block.title, isTr)}
                    </p>
                    <ul className="space-y-1.5">
                        {block.items.map((item, i) => (
                            <li key={i} className={`flex gap-2 text-sm leading-relaxed ${body}`}>
                                <span className="shrink-0 text-emerald-500">✓</span>
                                <span>{tx(item, isTr)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )

        default:
            return null
    }
}

export default function QaShopSetupPage() {
    const { language } = useLanguage()
    const [darkMode, setDarkMode] = useDarkModeState()
    const isTr = language === 'tr'
    const { meta, steps, next } = qaShopSetupData

    const shell = darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    const card = darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'

    return (
        <div className={`min-h-screen ${shell}`}>
            <ScrollProgressBar />
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="mx-auto max-w-4xl px-3 py-6 md:px-6 md:py-10">

                <header className="mb-6">
                    <h1 className="text-2xl font-extrabold md:text-3xl">{tx(meta.title, isTr)}</h1>
                    <p className={`mt-2 text-sm leading-relaxed md:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {tx(meta.subtitle, isTr)}
                    </p>
                </header>

                {/* İzolasyon beyanı: pratik yığını sitenin kendi backend'inden ayrıdır.
                    Sayfanın en üstünde duruyor çünkü bu bir detay değil, temel kısıt. */}
                <div
                    data-testid="qa-shop-setup-isolation"
                    className={`mb-8 rounded-xl border p-3 md:p-4 ${darkMode ? 'border-slate-700 bg-slate-800/60' : 'border-slate-300 bg-slate-100'}`}
                >
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        🔒 {tx(meta.isolationNote, isTr)}
                    </p>
                </div>

                {/* Yol haritası: dört adımın hangi sırayla neyi kazandırdığı.
                    Uzun bir yordam rehberinde okuyucunun "kaç adım var, şu an
                    neredeyim" sorusuna sayfanın başında cevap vermek gerekiyor. */}
                {meta.roadmap && (
                    <div className="mb-8" data-testid="qa-shop-setup-roadmap">
                        <h2 className="mb-3 text-lg font-bold">{tx(meta.roadmap.title, isTr)}</h2>
                        <ol className="grid gap-2 md:grid-cols-2">
                            {meta.roadmap.items.map((item, i) => (
                                <li
                                    key={i}
                                    className={`flex gap-3 rounded-xl border p-3 ${card}`}
                                >
                                    <span className="text-xl" aria-hidden="true">{item.icon}</span>
                                    <div>
                                        <p className={`text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                                            {i + 1}. {tx(item.label, isTr)}
                                        </p>
                                        <p className={`mt-0.5 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                            {tx(item.result, isTr)}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}

                {steps.map((step) => (
                    <section
                        key={step.id}
                        id={step.id}
                        data-testid={`practice-step-${step.number}`}
                        className={`mb-8 rounded-2xl border p-4 md:p-6 ${card}`}
                    >
                        <div className="mb-3 flex items-start gap-3">
                            <span
                                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 text-lg font-bold text-white"
                                aria-hidden="true"
                            >
                                {step.number}
                            </span>
                            <div>
                                <h2 className="text-lg font-bold md:text-xl">
                                    {step.icon} {tx(step.title, isTr)}
                                </h2>
                                <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {tx(step.goal, isTr)}
                                </p>
                            </div>
                        </div>

                        {step.blocks.map((block, i) => (
                            <Block key={i} block={block} isTr={isTr} darkMode={darkMode} />
                        ))}
                    </section>
                ))}

                <section className={`mb-10 rounded-2xl border border-dashed p-4 md:p-6 ${darkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-300 bg-white'}`}>
                    <h2 className="mb-2 text-lg font-bold">{tx(next.title, isTr)}</h2>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {tx(next.content, isTr)}
                    </p>
                </section>
            </main>

            <Link
                to="/"
                aria-label={isTr ? 'Ana sayfa' : 'Home'}
                className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-indigo-600 text-2xl text-white shadow-lg transition hover:bg-indigo-500"
            >
                🏠
            </Link>
        </div>
    )
}
