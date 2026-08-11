import { useEffect, useRef, useState } from 'react'
import TopicPage from './TopicPage'
import { jiraData } from '../data/jiraData'
import { useLanguage } from '../context/LanguageContext'

/* ─── Mini pano: SHOP-142 kartının workflow boyunca ilerleyişi ───────────────
   Sayfanın ana fikrini (bir bug bir panoda ilerler ve her sütun bir sözleşmedir)
   tek bakışta gösteren canlı banner. Yeni CSS dosyası eklenmez; hareket React
   state + Tailwind geçişleriyle yapılır. */
const COLUMNS = [
    { id: 'todo', tr: 'Yapılacak', en: 'To Do', dot: 'bg-slate-400' },
    { id: 'progress', tr: 'Geliştirmede', en: 'In Progress', dot: 'bg-blue-400' },
    { id: 'ready', tr: 'QA Bekliyor', en: 'Ready for QA', dot: 'bg-amber-400' },
    { id: 'qa', tr: 'QA Testinde', en: 'In QA', dot: 'bg-purple-400' },
    { id: 'done', tr: 'Bitti', en: 'Done', dot: 'bg-emerald-400' },
]

function JiraBoardBanner() {
    const { language } = useLanguage()
    const isTr = language === 'tr'
    const [activeIndex, setActiveIndex] = useState(0)
    const timerRef = useRef(null)

    useEffect(() => {
        const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (noMotion) return undefined
        timerRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % COLUMNS.length)
        }, 1900)
        return () => clearInterval(timerRef.current)
    }, [])

    return (
        <div
            className="mb-6 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4 md:p-6 shadow-lg"
            data-testid="jira-board-banner"
        >
            <div className="flex items-center justify-between mb-3 md:mb-4">
                <span className="text-xs md:text-sm font-semibold tracking-wide text-blue-200">
                    {isTr ? 'SHOP · Sprint Panosu' : 'SHOP - Sprint Board'}
                </span>
                <span className="text-[11px] md:text-xs text-blue-300/80">
                    {isTr ? 'SHOP-142 · Kupon tutarı iki kez düşülüyor' : 'SHOP-142 - Coupon amount deducted twice'}
                </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
                {COLUMNS.map((column, index) => {
                    const isActive = index === activeIndex
                    const isPassed = index < activeIndex
                    return (
                        <div
                            key={column.id}
                            className={`rounded-xl border p-2.5 md:p-3 min-h-[92px] transition-all duration-500 ${
                                isActive
                                    ? 'border-blue-400/70 bg-blue-500/15 scale-[1.02]'
                                    : 'border-slate-700/60 bg-slate-800/40'
                            }`}
                        >
                            <div className="flex items-center gap-1.5 mb-2">
                                <span className={`w-2 h-2 rounded-full ${column.dot}`} aria-hidden="true" />
                                <span className="text-[11px] md:text-xs font-medium text-slate-300 truncate">
                                    {isTr ? column.tr : column.en}
                                </span>
                            </div>

                            {isActive && (
                                <div className="rounded-lg bg-slate-900/80 border border-blue-400/50 px-2 py-1.5 text-[11px] md:text-xs text-blue-100 shadow">
                                    <span className="font-mono font-semibold">SHOP-142</span>
                                    <span className="block text-[10px] md:text-[11px] text-blue-300/90 mt-0.5">
                                        🐞 {isTr ? 'Bug · Yüksek' : 'Bug - High'}
                                    </span>
                                </div>
                            )}

                            {isPassed && (
                                <div className="text-[11px] md:text-xs text-emerald-300/80">
                                    ✓ {isTr ? 'geçildi' : 'passed'}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <p className="mt-3 md:mt-4 text-[11px] md:text-xs text-slate-400 leading-relaxed">
                {isTr
                    ? 'Her sütun bir sözleşmedir: karta dokunan kişi, o sütunun gerektirdiği kanıtı bırakmadan bir sonrakine geçemez.'
                    : 'Every column is a contract: whoever touches the card cannot move it on without leaving the evidence that column requires.'}
            </p>
        </div>
    )
}

function JiraPage() {
    return (
        <TopicPage
            data={jiraData}
            gradient="from-blue-600 to-indigo-600"
            bgLight="bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50"
            extraBanner={<JiraBoardBanner />}
        />
    )
}

export default JiraPage
