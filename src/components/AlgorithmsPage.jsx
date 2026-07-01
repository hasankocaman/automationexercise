import { Link } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import TopicHeader from './TopicHeader'
import { useLanguage } from '../context/LanguageContext'
import { beginnerAlgorithmsData } from '../data/beginnerAlgorithmsData'

const neuroLabels = {
    tr: {
        neuroModeToggle: '🧠 Nöro-Optimizasyon Modu',
        neuroModeDesc: 'Aralıklı tekrar, Feynman tekniği ve aktif hatırlama ile öğrenme hızınızı 10 kat artırın.',
        spacedRepTitle: 'Aralıklı Tekrar Takipçisi',
        spacedRepStart: 'Öğrenme Döngüsünü Başlat',
        spacedRepReset: 'Sıfırla',
        spacedRepDone: 'Tamamlandı!',
        spacedRepTodayDone: 'Bugünkü Tekrarı Tamamla',
        spacedRepLocked: 'Kilitli',
        spacedRepDay1: '1. Gün: Öğrenim',
        spacedRepDay3: '3. Gün: Aktif Hatırlama',
        spacedRepDay7: '7. Gün: Pekiştirme',
        spacedRepDay30: '30. Gün: Kalıcılık',
        feynmanTitle: '💬 Feynman Tekniği (5 Yaşındaki Çocuğa Anlatır Gibi)',
        feynmanPrompt: 'Bu algoritmanın çalışma mantığını, 5 yaşındaki bir çocuğa anlatır gibi, teknik terim kullanmadan (basit kelimelerle) buraya yazın:',
        feynmanCheck: 'Açıklarımı Bul & Kontrol Et',
        feynmanKeywords: 'Anahtar Kavramlar:',
        feynmanSuccess: 'Tebrikler! Konuyu başarıyla sadeleştirdiniz ve boşluklarınızı kapattınız.',
        forbiddenWordsWarning: '⚠️ Dikkat! 5 yaşındaki bir çocuk için şu teknik terim(ler) çok ağır gelebilir: ',
        activeRecallTitle: '🔍 Aktif Hatırlama (Active Recall) Sınaması',
        activeRecallPrompt: 'Konunun ayrıntılarını açmak için aşağıdaki sorunun cevabını zihninizden çağırın, ardından kartı çevirip kendinizi test edin.',
        activeRecallFlip: 'Kartı Çevir 🔄',
        activeRecallGotIt: 'Hatırladım ✓ (İçeriği Aç)',
        activeRecallFailed: 'Tekrar Bak ✗ (Kilitli Kalır)',
        activeRecallLocked: '🔒 İçerik Kilitli: Lütfen yukarıdaki Aktif Hatırlama sorusunu yanıtlayın.',
        interleavedPracticeTitle: '🔀 Zihinsel Vites Değiştirici (Interleaved Mode)',
        interleavedPracticeDesc: 'Konuları doğrusal değil, beyni vites değiştirmeye zorlayan karışık sırayla çalışın.',
    },
    en: {
        neuroModeToggle: '🧠 Neuro-Optimization Mode',
        neuroModeDesc: 'Accelerate your learning speed 10x with spaced repetition, Feynman technique, and active recall.',
        spacedRepTitle: 'Spaced Repetition Tracker',
        spacedRepStart: 'Start Learning Cycle',
        spacedRepReset: 'Reset',
        spacedRepDone: 'Completed!',
        spacedRepTodayDone: 'Complete Today\'s Review',
        spacedRepLocked: 'Locked',
        spacedRepDay1: 'Day 1: Learn',
        spacedRepDay3: 'Day 3: Active Recall',
        spacedRepDay7: 'Day 7: Reinforce',
        spacedRepDay30: 'Day 30: Consolidate',
        feynmanTitle: '💬 Feynman Technique (Explain to a 5-Year-Old)',
        feynmanPrompt: 'Explain the working logic of this algorithm without using technical jargon (use simple terms), as if explaining to a 5-year-old:',
        feynmanCheck: 'Find My Gaps & Verify',
        feynmanKeywords: 'Key Concepts:',
        feynmanSuccess: 'Congratulations! You successfully simplified the topic and filled your knowledge gaps.',
        forbiddenWordsWarning: '⚠️ Warning! These technical terms might be too heavy for a 5-year-old: ',
        activeRecallTitle: '🔍 Active Recall Challenge',
        activeRecallPrompt: 'To unlock this topic\'s details, recall the answer to the question below, then flip the card to test yourself.',
        activeRecallFlip: 'Flip Card 🔄',
        activeRecallGotIt: 'I Recalled It ✓ (Unlock Content)',
        activeRecallFailed: 'Study Again ✗ (Stays Locked)',
        activeRecallLocked: '🔒 Content Locked: Please complete the Active Recall challenge above.',
        interleavedPracticeTitle: '🔀 Mental Gear Shifter (Interleaved Mode)',
        interleavedPracticeDesc: 'Study topics in a mixed order that forces the brain to switch tasks and context.',
    }
}

function SpacedRepetitionTracker({ labels, darkMode }) {
    const [cycle, setCycle] = useState(() => {
        const saved = localStorage.getItem('algorithms_spaced_rep')
        return saved ? JSON.parse(saved) : null
    })

    const startCycle = () => {
        const newCycle = {
            startDate: new Date().toISOString(),
            completedDays: [1]
        }
        localStorage.setItem('algorithms_spaced_rep', JSON.stringify(newCycle))
        setCycle(newCycle)
    }

    const resetCycle = () => {
        localStorage.removeItem('algorithms_spaced_rep')
        setCycle(null)
    }

    const completeDay = (day) => {
        if (!cycle) return
        const completedDays = [...cycle.completedDays]
        if (!completedDays.includes(day)) {
            completedDays.push(day)
        }
        const updated = { ...cycle, completedDays }
        localStorage.setItem('algorithms_spaced_rep', JSON.stringify(updated))
        setCycle(updated)
    }

    if (!cycle) {
        return (
            <div className={`rounded-xl border p-5 text-center transition-all duration-300 shadow-lg ${darkMode ? 'border-sky-500/20 bg-sky-950/20' : 'border-sky-200 bg-sky-50/50'}`}>
                <h3 className="text-base font-black">{labels.spacedRepTitle}</h3>
                <p className="mt-2 text-xs opacity-85 leading-relaxed">{labels.neuroModeDesc}</p>
                <button onClick={startCycle} className="mt-4 min-h-10 rounded-lg bg-sky-600 hover:bg-sky-500 px-5 text-xs font-black text-white shadow-md hover:scale-105 transition duration-200">
                    {labels.spacedRepStart}
                </button>
            </div>
        )
    }

    const startDate = new Date(cycle.startDate)
    const getTargetDate = (daysToAdd) => {
        const d = new Date(startDate)
        d.setDate(d.getDate() + daysToAdd)
        return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
    }

    const milestones = [
        { day: 1, label: labels.spacedRepDay1, daysToAdd: 0 },
        { day: 3, label: labels.spacedRepDay3, daysToAdd: 2 },
        { day: 7, label: labels.spacedRepDay7, daysToAdd: 6 },
        { day: 30, label: labels.spacedRepDay30, daysToAdd: 29 }
    ]

    return (
        <div className={`rounded-xl border p-5 shadow-lg transition duration-300 ${darkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white'}`}>
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <h3 className="text-sm font-black flex items-center gap-2">
                    <span>📅</span> {labels.spacedRepTitle}
                </h3>
                <button onClick={resetCycle} className={`min-h-8 rounded-lg px-3 text-[10px] font-black transition ${darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                    {labels.spacedRepReset}
                </button>
            </div>
            
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
                {milestones.map((ms) => {
                    const isDone = cycle.completedDays.includes(ms.day)
                    const targetDateStr = getTargetDate(ms.daysToAdd)
                    const isPrevDone = ms.day === 1 || cycle.completedDays.includes(ms.day === 3 ? 1 : ms.day === 7 ? 3 : 7)
                    const isAvailable = !isDone && isPrevDone
                    
                    return (
                        <div key={ms.day} className={`rounded-lg border p-3 flex flex-col justify-between min-h-[110px] transition duration-200 ${isDone ? (darkMode ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-emerald-200 bg-emerald-50/30') : isAvailable ? (darkMode ? 'border-sky-500/40 bg-sky-500/5' : 'border-sky-200 bg-sky-50/30') : 'opacity-40'}`}>
                            <div>
                                <div className="text-[9px] font-bold opacity-60">{targetDateStr}</div>
                                <div className={`mt-1 text-[11px] font-black leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{ms.label}</div>
                            </div>
                            <div className="mt-3">
                                {isDone ? (
                                    <span className="text-xs font-black text-emerald-400">{labels.spacedRepDone}</span>
                                ) : isAvailable ? (
                                    <button onClick={() => completeDay(ms.day)} className="w-full min-h-8 rounded bg-sky-600 hover:bg-sky-500 text-[10px] font-black text-white transition duration-150">
                                        {labels.spacedRepTodayDone}
                                    </button>
                                ) : (
                                    <span className="text-xs font-black opacity-45">{labels.spacedRepLocked}</span>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function FeynmanWorkspace({ lesson, labels, darkMode }) {
    const [text, setText] = useState('')
    const [checked, setChecked] = useState(false)
    const [foundForbidden, setFoundForbidden] = useState([])

    const normalize = (str) => {
        return str
            .toLowerCase()
            .replace(/ı/g, 'i')
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
    }

    const keywords = lesson.feynman?.keywords || []
    const forbiddenWords = lesson.feynman?.forbiddenWords || []

    const keywordMatches = useMemo(() => {
        const normText = normalize(text)
        return keywords.map(kw => {
            const normKw = normalize(kw)
            return {
                word: kw,
                matched: normText.includes(normKw)
            }
        })
    }, [text, keywords])

    const matchCount = keywordMatches.filter(m => m.matched).length
    const scorePercentage = keywords.length > 0 ? (matchCount / keywords.length) * 100 : 0

    const checkText = () => {
        const normText = normalize(text)
        const forbidden = forbiddenWords.filter(fw => normText.includes(normalize(fw)))
        setFoundForbidden(forbidden)
        setChecked(true)
    }

    return (
        <div className={`mt-5 rounded-xl border p-4 transition-all duration-300 shadow-md ${darkMode ? 'border-slate-800 bg-slate-950/40 hover:border-sky-500/20' : 'border-slate-200 bg-slate-50/40 hover:border-sky-500/20'}`}>
            <h4 className={`text-xs font-black flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {labels.feynmanTitle}
            </h4>
            <p className="mt-2 text-[11px] opacity-80 leading-relaxed">{labels.feynmanPrompt}</p>
            
            <textarea
                value={text}
                onChange={(e) => {
                    setText(e.target.value)
                    setChecked(false)
                }}
                className={`mt-2 w-full min-h-[96px] rounded-lg border p-3 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-sky-500 ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-200 placeholder-slate-500' : 'border-slate-300 bg-white text-slate-800 placeholder-slate-400'}`}
                placeholder="..."
            />
            
            <div className="mt-3 flex flex-wrap gap-2">
                <button
                    onClick={checkText}
                    disabled={!text.trim()}
                    className="min-h-9 rounded-lg bg-sky-600 disabled:opacity-50 hover:bg-sky-500 px-4 text-xs font-black text-white transition duration-150"
                >
                    {labels.feynmanCheck}
                </button>
                <button
                    onClick={() => {
                        setText('')
                        setChecked(false)
                        setFoundForbidden([])
                    }}
                    className={`min-h-9 rounded-lg px-4 text-xs font-black transition duration-150 ${darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                >
                    {labels.reset || 'Reset'}
                </button>
            </div>

            {checked && (
                <div className="mt-4 space-y-4 border-t border-slate-700/30 pt-4 transition duration-300">
                    {foundForbidden.length > 0 && (
                        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs font-bold text-red-400 animate-pulse">
                            {labels.forbiddenWordsWarning}
                            <span className="font-mono bg-red-500/10 px-1 py-0.5 rounded">{foundForbidden.join(', ')}</span>
                        </div>
                    )}
                    
                    <div>
                        <div className="text-xs font-black opacity-75">{labels.feynmanKeywords}</div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                            {keywordMatches.map((item) => (
                                <span
                                    key={item.word}
                                    className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold border transition duration-200 ${item.matched ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 scale-105' : 'bg-slate-500/10 border-slate-850 text-slate-400'}`}
                                >
                                    {item.word} {item.matched ? '✓' : '✗'}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    <div className={`rounded-lg border p-3 transition duration-200 ${darkMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white'}`}>
                        <div className="text-[10px] font-black text-sky-400 uppercase tracking-wider">Model Açıklama / Model Answer</div>
                        <p className="mt-1.5 text-xs leading-relaxed font-medium">{lesson.feynman?.modelAnswer}</p>
                    </div>

                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs font-black text-emerald-400">
                        {labels.feynmanSuccess} (Kapsama Oranı: %{Math.round(scorePercentage)})
                    </div>
                </div>
            )}
        </div>
    )
}

function RecallFlashcard({ lesson, labels, darkMode, onRecallComplete }) {
    const [flipped, setFlipped] = useState(false)
    const [status, setStatus] = useState(null)

    useEffect(() => {
        setFlipped(false)
        setStatus(null)
    }, [lesson])

    const handleAnswer = (success) => {
        setStatus(success ? 'success' : 'fail')
        if (success) {
            onRecallComplete()
        }
    }

    const question = lesson.recall?.question || 'What is this algorithm?'
    const answer = lesson.recall?.answer || 'No answer provided.'

    return (
        <div className={`rounded-xl border p-4 transition-all duration-300 shadow-md ${darkMode ? 'border-slate-850 bg-slate-900/30 hover:border-sky-500/20' : 'border-slate-200 bg-slate-50/50 hover:border-sky-500/20'}`}>
            <div className="flex items-center justify-between gap-2">
                <h4 className={`text-xs font-black flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {labels.activeRecallTitle}
                </h4>
                {status && (
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded transition duration-200 ${status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 scale-105' : 'bg-rose-500/10 text-rose-400 border border-rose-500/25'}`}>
                        {status === 'success' ? 'Recalled ✓' : 'Study Again ✗'}
                    </span>
                )}
            </div>
            <p className="mt-2 text-[11px] opacity-80 leading-relaxed">{labels.activeRecallPrompt}</p>

            <div className="mt-3 relative min-h-[110px] rounded-lg overflow-hidden border border-slate-700/20 bg-slate-950/20">
                <div 
                    onClick={() => setFlipped(!flipped)}
                    className={`p-4 min-h-[110px] flex flex-col justify-center items-center text-center cursor-pointer transition-all duration-500 ${flipped ? 'bg-emerald-950/20' : 'bg-sky-950/20'}`}
                >
                    <div className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-2" style={{ color: flipped ? '#10b981' : '#0ea5e9' }}>
                        {flipped ? 'Cevap / Answer' : 'Soru / Question'}
                    </div>
                    <p className={`text-xs font-bold leading-relaxed px-2 ${darkMode ? 'text-white' : 'text-slate-100'}`}>
                        {flipped ? answer : question}
                    </p>
                    <div className="mt-3 text-[9px] font-bold opacity-60 border border-current rounded px-2 py-0.5 hover:opacity-100 transition select-none">
                        {labels.activeRecallFlip}
                    </div>
                </div>
            </div>

            {flipped && (
                <div className="mt-3 flex gap-2 justify-center">
                    <button
                        onClick={() => handleAnswer(true)}
                        className={`min-h-8 rounded-lg px-3 text-[11px] font-black text-white transition duration-150 ${status === 'success' ? 'bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                    >
                        {labels.activeRecallGotIt}
                    </button>
                    <button
                        onClick={() => handleAnswer(false)}
                        className={`min-h-8 rounded-lg px-3 text-[11px] font-black text-white transition duration-150 ${status === 'fail' ? 'bg-rose-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                    >
                        {labels.activeRecallFailed}
                    </button>
                </div>
            )}
        </div>
    )
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
            <div className="h-full transition-[width] duration-100" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #22c55e, #06b6d4, #f59e0b)' }} />
        </div>
    )
}

function useDarkModeState() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        const isDark = saved !== null ? JSON.parse(saved) : true
        if (isDark) {
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('light-mode-forced')
        } else {
            document.documentElement.classList.remove('dark-mode')
            document.documentElement.classList.add('light-mode-forced')
        }
        return isDark
    })

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        if (darkMode) {
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('light-mode-forced')
        } else {
            document.documentElement.classList.remove('dark-mode')
            document.documentElement.classList.add('light-mode-forced')
        }
    }, [darkMode])

    return [darkMode, setDarkMode]
}

function StepPill({ children, color }) {
    return (
        <div className="flex min-h-12 items-center justify-center rounded-lg border px-3 py-2 text-center text-sm font-black text-white shadow-lg" style={{ background: color, borderColor: `${color}aa` }}>
            {children}
        </div>
    )
}

function Arrow() {
    return <div className="hidden items-center justify-center text-2xl font-black text-slate-400 md:flex">→</div>
}

function ConceptVisual({ lesson, labels, darkMode }) {
    const color = lesson.color
    const visual = labels.visual
    const boxClass = darkMode ? 'border-slate-700 bg-slate-900 text-slate-200' : 'border-slate-200 bg-white text-slate-700'

    if (lesson.visual === 'recipe') {
        return (
            <div className="grid gap-3 md:grid-cols-[1fr_32px_1fr_32px_1fr]">
                <StepPill color={color}>{visual.ingredient}</StepPill>
                <Arrow />
                <StepPill color="#06b6d4">{visual.order}</StepPill>
                <Arrow />
                <StepPill color="#10b981">{visual.result}</StepPill>
            </div>
        )
    }

    if (lesson.visual === 'machine') {
        return (
            <div className="grid gap-3 md:grid-cols-[1fr_1.2fr_1fr] md:items-center">
                <StepPill color="#06b6d4">Input</StepPill>
                <div className={`relative overflow-hidden rounded-lg border p-4 text-center ${boxClass}`}>
                    <div className="absolute inset-y-0 left-0 w-1/3 animate-pulse bg-cyan-400/10" />
                    <div className="relative text-3xl">⚙️</div>
                    <div className="relative mt-2 text-sm font-black">{visual.process}</div>
                </div>
                <StepPill color="#10b981">Output</StepPill>
            </div>
        )
    }

    if (lesson.visual === 'decision') {
        return (
            <svg viewBox="0 0 520 220" className="h-auto w-full" role="img" aria-label="Decision flowchart">
                <rect x="28" y="78" width="120" height="56" rx="8" fill={color} />
                <text x="88" y="111" textAnchor="middle" fill="white" fontSize="15" fontWeight="800">{visual.weather}</text>
                <path d="M148 106 L220 106" stroke={darkMode ? '#94a3b8' : '#64748b'} strokeWidth="4" strokeLinecap="round" />
                <polygon points="260,50 340,106 260,162 180,106" fill={darkMode ? '#1e293b' : '#f8fafc'} stroke={color} strokeWidth="4" />
                <text x="260" y="111" textAnchor="middle" fill={darkMode ? '#f8fafc' : '#0f172a'} fontSize="14" fontWeight="800">{visual.rainy}</text>
                <path d="M340 106 L408 72" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
                <path d="M340 106 L408 140" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                <rect x="408" y="44" width="88" height="48" rx="8" fill="#10b981" />
                <rect x="408" y="116" width="88" height="48" rx="8" fill="#ef4444" />
                <text x="452" y="73" textAnchor="middle" fill="white" fontSize="13" fontWeight="800">{visual.umbrella}</text>
                <text x="452" y="145" textAnchor="middle" fill="white" fontSize="13" fontWeight="800">{visual.continue}</text>
            </svg>
        )
    }

    if (lesson.visual === 'loop') {
        return (
            <div className="flex flex-col items-center gap-3">
                <div className="relative h-40 w-40 rounded-full border-8 border-emerald-400/30">
                    <div className="absolute left-1/2 top-2 h-10 w-10 -translate-x-1/2 animate-bounce rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/40" />
                    <div className={`absolute inset-8 flex items-center justify-center rounded-full border text-center text-sm font-black ${boxClass}`}>{visual.repeat}</div>
                </div>
                <div className={`rounded-lg border px-3 py-2 text-xs font-bold ${boxClass}`}>{visual.repeatNote}</div>
            </div>
        )
    }

    if (lesson.visual === 'memory') {
        return (
            <div className="grid gap-3 md:grid-cols-3">
                {visual.memoryItems.map((item, index) => (
                    <div key={item} className={`rounded-lg border p-4 text-center ${boxClass}`}>
                        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-lg text-2xl font-black text-white" style={{ background: ['#3b82f6', '#10b981', '#f59e0b'][index] }}>
                            {index + 1}
                        </div>
                        <div className="text-sm font-black">{item}</div>
                        <div className="mt-1 text-xs opacity-70">{visual.memoryBox}</div>
                    </div>
                ))}
            </div>
        )
    }

    if (lesson.visual === 'debug') {
        return (
            <div className="grid gap-3 md:grid-cols-3">
                {visual.debugItems.map((item, index) => (
                    <div key={item} className={`rounded-lg border p-4 ${boxClass}`}>
                        <div className="text-2xl">{index === 0 ? '🔎' : index === 1 ? '🔀' : '✅'}</div>
                        <div className="mt-2 text-sm font-black">{item}</div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="grid gap-3 md:grid-cols-[1fr_32px_1fr_32px_1fr]">
            <StepPill color="#7c3aed">{visual.start}</StepPill>
            <Arrow />
            <StepPill color="#06b6d4">{visual.missingStep}</StepPill>
            <Arrow />
            <StepPill color="#10b981">{visual.finish}</StepPill>
        </div>
    )
}

function SequenceGame({ lesson, labels, darkMode }) {
    const [items, setItems] = useState(lesson.game.items)
    const [checked, setChecked] = useState(false)
    const [dragIndex, setDragIndex] = useState(null)
    const solved = items.every((item, index) => item.id === lesson.game.expected[index])

    useEffect(() => {
        setItems(lesson.game.items)
        setChecked(false)
        setDragIndex(null)
    }, [lesson])

    const reorder = (from, to) => {
        if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) return
        const next = [...items]
        const [item] = next.splice(from, 1)
        next.splice(to, 0, item)
        setItems(next)
        setChecked(false)
    }

    const move = (index, direction) => reorder(index, index + direction)

    return (
        <div>
            <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{lesson.game.prompt}</p>
            <div className="mt-3 grid gap-2">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        draggable
                        onDragStart={() => setDragIndex(index)}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={() => {
                            if (dragIndex !== null) reorder(dragIndex, index)
                            setDragIndex(null)
                        }}
                        onDragEnd={() => setDragIndex(null)}
                        className={`flex cursor-grab items-center gap-2 rounded-lg border p-3 transition active:cursor-grabbing ${dragIndex === index ? 'scale-[1.02] border-cyan-400 opacity-80' : ''} ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-black text-white" style={{ background: lesson.color }}>{index + 1}</div>
                        <div className="min-w-0 flex-1 text-sm font-bold">{item.text}</div>
                        <button onClick={() => move(index, -1)} disabled={index === 0} className="min-h-9 rounded-lg bg-slate-700 px-2 text-xs font-bold text-white disabled:opacity-30">{labels.moveUp}</button>
                        <button onClick={() => move(index, 1)} disabled={index === items.length - 1} className="min-h-9 rounded-lg bg-slate-700 px-2 text-xs font-bold text-white disabled:opacity-30">{labels.moveDown}</button>
                    </div>
                ))}
            </div>
            <GameResult checked={checked} solved={solved} success={lesson.game.success} labels={labels} onCheck={() => setChecked(true)} darkMode={darkMode} />
        </div>
    )
}

function MachineGame({ lesson, labels, darkMode }) {
    const [selected, setSelected] = useState(null)
    const picked = lesson.game.options.find(item => item.id === selected)

    return (
        <div>
            <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{lesson.game.prompt}</p>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
                {lesson.game.options.map(option => (
                    <button key={option.id} onClick={() => setSelected(option.id)} className={`min-h-12 rounded-lg border px-3 text-sm font-black transition ${selected === option.id ? 'border-cyan-400 bg-cyan-500/15 text-cyan-200' : darkMode ? 'border-slate-700 bg-slate-900 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
                        {option.label}
                    </button>
                ))}
            </div>
            {picked && (
                <div className={`mt-3 rounded-lg border p-3 text-sm font-bold ${picked.valid ? `border-emerald-500/40 bg-emerald-500/10 ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}` : `border-amber-500/40 bg-amber-500/10 ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}`}>
                    {labels.result}: {picked.output}
                </div>
            )}
        </div>
    )
}

function DecisionGame({ lesson, labels, darkMode }) {
    const [selected, setSelected] = useState(lesson.game.options[0])

    return (
        <div>
            <p className="text-sm opacity-80">{lesson.game.prompt}</p>
            <div className="mt-3 flex flex-wrap gap-2">
                {lesson.game.options.map(option => (
                    <button key={option.id} onClick={() => setSelected(option)} className={`min-h-10 rounded-lg px-3 text-sm font-black text-white transition ${selected.id === option.id ? 'scale-105 shadow-lg' : 'opacity-80'}`} style={{ background: lesson.color }}>
                        {option.label}
                    </button>
                ))}
            </div>
            <div className={`mt-3 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm font-black ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                {labels.result}: {selected.output}
            </div>
        </div>
    )
}

function LoopGame({ lesson, labels, darkMode }) {
    const [count, setCount] = useState(0)
    const total = lesson.game.total
    const done = count >= total

    return (
        <div>
            <p className="text-sm opacity-80">{lesson.game.prompt}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-2xl">
                {Array.from({ length: total }).map((_, index) => (
                    <span key={index} className={`transition-all ${index < count ? 'scale-110 text-yellow-300' : 'text-slate-600'}`}>★</span>
                ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
                <button onClick={() => setCount(Math.min(total, count + 1))} disabled={done} className="min-h-10 rounded-lg bg-emerald-600 px-4 text-sm font-black text-white disabled:opacity-40">{labels.play}</button>
                <button onClick={() => setCount(0)} className="min-h-10 rounded-lg bg-slate-700 px-4 text-sm font-black text-white">{labels.reset}</button>
            </div>
            {done && <div className={`mt-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm font-black ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>{lesson.game.success}</div>}
        </div>
    )
}

function MemoryGame({ lesson, labels, darkMode }) {
    const [score, setScore] = useState(0)
    const done = score >= lesson.game.target

    return (
        <div>
            <p className="text-sm opacity-80">{lesson.game.prompt}</p>
            <div className="mt-3 flex items-center gap-3">
                <div className="flex h-20 w-28 flex-col items-center justify-center rounded-lg border border-blue-400/50 bg-blue-500/10">
                    <div className="text-xs font-bold text-blue-300">score</div>
                    <div className="font-mono text-3xl font-black text-blue-200">{score}</div>
                </div>
                <button onClick={() => setScore(score + 1)} className="min-h-10 rounded-lg bg-blue-600 px-4 text-sm font-black text-white">+1</button>
                <button onClick={() => setScore(0)} className="min-h-10 rounded-lg bg-slate-700 px-4 text-sm font-black text-white">{labels.reset}</button>
            </div>
            {done && <div className={`mt-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm font-black ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>{lesson.game.success}</div>}
        </div>
    )
}

function DebugGame({ lesson, labels, darkMode }) {
    const [selected, setSelected] = useState('')
    const checked = Boolean(selected)
    const solved = selected === lesson.game.badStep

    return (
        <div>
            <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{lesson.game.prompt}</p>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
                {lesson.game.items.map((item, index) => (
                    <button key={item.id} onClick={() => setSelected(item.id)} className={`min-h-14 rounded-lg border px-3 text-sm font-black transition ${selected === item.id ? 'border-rose-400 bg-rose-500/15 text-rose-200' : darkMode ? 'border-slate-700 bg-slate-900 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
                        {index + 1}. {item.text}
                    </button>
                ))}
            </div>
            <GameResult checked={checked} solved={solved} success={lesson.game.success} labels={labels} darkMode={darkMode} />
        </div>
    )
}

function FlowchartGame({ lesson, labels, darkMode }) {
    const [selected, setSelected] = useState(null)
    const picked = lesson.game.options.find(item => item.id === selected)

    return (
        <div>
            <p className="text-sm opacity-80">{lesson.game.prompt}</p>
            <div className="mt-3 grid gap-3 md:grid-cols-[1fr_32px_1fr_32px_1fr] md:items-center">
                <StepPill color="#7c3aed">{labels.visual.wakeUp}</StepPill>
                <Arrow />
                <div className="rounded-lg border-2 border-dashed border-cyan-400 p-3 text-center text-sm font-black text-cyan-300">{picked?.label || labels.visual.missing}</div>
                <Arrow />
                <StepPill color="#10b981">{labels.visual.goSchool}</StepPill>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
                {lesson.game.options.map(option => (
                    <button key={option.id} onClick={() => setSelected(option.id)} className="min-h-10 rounded-lg bg-violet-600 px-3 text-sm font-black text-white">{option.label}</button>
                ))}
            </div>
            {picked && (
                <div className={`mt-3 rounded-lg border p-3 text-sm font-black ${picked.valid ? `border-emerald-500/40 bg-emerald-500/10 ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}` : `border-amber-500/40 bg-amber-500/10 ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}`}>
                    {picked.valid ? lesson.game.success : labels.wrong}
                </div>
            )}
        </div>
    )
}

function GameResult({ checked, solved, success, labels, onCheck, darkMode }) {
    return (
        <div className="mt-3 flex flex-wrap items-center gap-3">
            {onCheck && (
                <button onClick={onCheck} className="min-h-10 rounded-lg bg-cyan-600 px-4 text-sm font-black text-white hover:bg-cyan-500">
                    {labels.check}
                </button>
            )}
            {checked && (
                <div className={`rounded-lg border px-3 py-2 text-sm font-black ${solved ? `border-emerald-500/40 bg-emerald-500/10 ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}` : `border-amber-500/40 bg-amber-500/10 ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}`}>
                    {solved ? success : labels.wrong}
                </div>
            )}
        </div>
    )
}

function GameBlock({ lesson, labels, darkMode }) {
    const game = lesson.game
    const common = { lesson, labels, darkMode }

    return (
        <div className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950/70' : 'border-slate-200 bg-slate-50'}`}>
            <div className="mb-3 text-sm font-black" style={{ color: lesson.color }}>{game.title}</div>
            {game.type === 'sequence' && <SequenceGame {...common} />}
            {game.type === 'machine' && <MachineGame {...common} />}
            {game.type === 'decision' && <DecisionGame {...common} />}
            {game.type === 'loop' && <LoopGame {...common} />}
            {game.type === 'memory' && <MemoryGame {...common} />}
            {game.type === 'debug' && <DebugGame {...common} />}
            {game.type === 'flowchart' && <FlowchartGame {...common} />}
        </div>
    )
}

function levelColor(level, darkMode) {
    if (level === 'easy')   return { text: darkMode ? 'text-emerald-300' : 'text-emerald-700', border: 'border-emerald-500/40', bg: darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50' }
    if (level === 'medium') return { text: darkMode ? 'text-amber-300'   : 'text-amber-700',   border: 'border-amber-500/40',   bg: darkMode ? 'bg-amber-500/10'   : 'bg-amber-50' }
    return                         { text: darkMode ? 'text-rose-300'    : 'text-rose-700',    border: 'border-rose-500/40',    bg: darkMode ? 'bg-rose-500/10'    : 'bg-rose-50' }
}

function QuestionItem({ item, index, labels, darkMode, open, onToggle }) {
    const level = levelColor(item.level, darkMode)
    const levelLabel = item.level === 'easy' ? labels.levelEasy : item.level === 'medium' ? labels.levelMedium : labels.levelHard

    return (
        <div className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950/70' : 'border-slate-200 bg-slate-50'}`}>
            <div className="flex flex-wrap items-start gap-2">
                <span className={`inline-flex min-h-7 shrink-0 items-center rounded-lg border px-2 text-[11px] font-black uppercase tracking-wide ${level.text} ${level.border} ${level.bg}`}>
                    {levelLabel}
                </span>
                <div className={`flex-1 text-sm font-bold leading-relaxed ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    {index + 1}. {item.q}
                </div>
            </div>
            <button
                onClick={onToggle}
                className="mt-3 min-h-9 rounded-lg bg-cyan-600 px-3 text-xs font-black text-white transition hover:bg-cyan-500"
            >
                {open ? labels.hideAnswer : labels.showAnswer}
            </button>
            {open && (
                <div className={`mt-3 rounded-lg border-l-4 p-3 text-sm leading-relaxed ${darkMode ? 'bg-cyan-500/10 text-cyan-100' : 'bg-cyan-50 text-cyan-900'}`} style={{ borderColor: '#06b6d4' }}>
                    <div className="mb-1 text-[11px] font-black uppercase tracking-wide">{labels.answerLabel}</div>
                    {item.a}
                </div>
            )}
        </div>
    )
}

function QuestionBank({ data, darkMode }) {
    const [openId, setOpenId] = useState(null)
    const labels = data.page
    const groups = [
        { level: 'easy', title: labels.levelEasy },
        { level: 'medium', title: labels.levelMedium },
        { level: 'hard', title: labels.levelHard },
    ]

    return (
        <section id="practice-questions" className="scroll-mt-24">
            <div className={`rounded-lg border p-4 shadow-xl md:p-6 ${darkMode ? 'border-slate-700 bg-slate-900/90' : 'border-slate-200 bg-white'}`}>
                <h2 className={`text-xl font-black leading-tight md:text-2xl ${darkMode ? 'text-white' : 'text-slate-950'}`}>{labels.questionsTitle}</h2>
                <p className={`mt-2 text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{labels.questionsSubtitle}</p>
                {data.questionsIntro && (
                    <p className={`mt-3 rounded-lg border-l-4 p-3 text-sm leading-relaxed ${darkMode ? 'bg-amber-500/10 text-amber-100' : 'bg-amber-50 text-amber-900'}`} style={{ borderColor: '#f59e0b' }}>
                        {data.questionsIntro}
                    </p>
                )}

                {groups.map(group => {
                    const items = data.questions.filter(item => item.level === group.level)
                    const level = LEVEL_COLOR[group.level]
                    return (
                        <div key={group.level} className="mt-6">
                            <div className={`mb-3 inline-flex min-h-8 items-center rounded-lg border px-3 text-xs font-black uppercase tracking-wide ${level.text} ${level.border} ${level.bg}`}>
                                {group.title} ({items.length})
                            </div>
                            <div className="grid gap-3">
                                {items.map((item) => {
                                    const globalIndex = data.questions.indexOf(item)
                                    const id = `${group.level}-${globalIndex}`
                                    return (
                                        <QuestionItem
                                            key={id}
                                            item={item}
                                            index={globalIndex}
                                            labels={labels}
                                            darkMode={darkMode}
                                            open={openId === id}
                                            onToggle={() => setOpenId(openId === id ? null : id)}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

function LessonCard({ lesson, labels, darkMode, neuroMode, recallProgress, onRecallUpdate, nLabels }) {
    const isUnlocked = !neuroMode || recallProgress[lesson.id] === 'recalled';

    return (
        <section id={lesson.id} className="scroll-mt-24">
            <div className={`rounded-lg border p-4 shadow-xl md:p-6 transition duration-300 ${darkMode ? 'border-slate-700 bg-slate-900/90' : 'border-slate-200 bg-white'}`}>
                {neuroMode && !isUnlocked && (
                    <div className="mb-5">
                        <RecallFlashcard 
                            lesson={lesson} 
                            labels={nLabels} 
                            darkMode={darkMode} 
                            onRecallComplete={() => onRecallUpdate(lesson.id)} 
                        />
                    </div>
                )}

                <div className="relative">
                    {!isUnlocked && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-lg bg-slate-950/50 backdrop-blur-md text-center p-4">
                            <div className="rounded-full bg-slate-900/90 p-4 border border-cyan-500/30 text-3xl shadow-lg animate-pulse mb-3">🔒</div>
                            <p className="text-xs font-black text-cyan-200 bg-slate-900/95 px-4 py-2 rounded-lg border border-cyan-500/20 shadow-md max-w-xs leading-normal">
                                {nLabels.activeRecallLocked}
                            </p>
                        </div>
                    )}

                    <div className={!isUnlocked ? "blur-sm select-none pointer-events-none" : ""}>
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                            <span className="inline-flex min-h-9 items-center rounded-lg px-3 text-xs font-black uppercase tracking-wide text-white" style={{ background: lesson.color }}>
                                {lesson.shortTitle}
                            </span>
                            <span className={`inline-flex min-h-9 items-center rounded-lg border px-3 text-xs font-black ${darkMode ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
                                {labels.beginnerBadge}
                            </span>
                        </div>

                        <h2 className={`text-xl font-black leading-tight md:text-2xl ${darkMode ? 'text-white' : 'text-slate-950'}`}>{lesson.title}</h2>

                        <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                            <div className="grid gap-4">
                                <div className={`rounded-lg border-l-4 p-4 text-sm leading-relaxed ${darkMode ? 'bg-amber-500/10 text-amber-100' : 'bg-amber-50 text-amber-900'}`} style={{ borderColor: '#f59e0b' }}>
                                    <div className="mb-1 text-xs font-black uppercase tracking-wide">{labels.lesson}</div>
                                    {lesson.analogy}
                                </div>
                                <div className={`rounded-lg border p-4 text-sm leading-relaxed ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                                    <div className="mb-1 text-xs font-black uppercase tracking-wide" style={{ color: lesson.color }}>{labels.why}</div>
                                    {lesson.why}
                                </div>
                            </div>
                            <div className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950/70' : 'border-slate-200 bg-slate-50'}`}>
                                <ConceptVisual lesson={lesson} labels={labels} darkMode={darkMode} />
                            </div>
                        </div>

                        <div className="mt-5">
                            <div className="mb-3 text-xs font-black uppercase tracking-wide" style={{ color: lesson.color }}>{labels.tryIt}</div>
                            <GameBlock lesson={lesson} labels={labels} darkMode={darkMode} />
                        </div>
                    </div>
                </div>

                {neuroMode && isUnlocked && (
                    <div className="mt-6 border-t pt-5">
                        <FeynmanWorkspace lesson={lesson} labels={nLabels} darkMode={darkMode} />
                    </div>
                )}
            </div>
        </section>
    )
}

function AlgorithmsPage() {
    const { language } = useLanguage()
    const [darkMode, setDarkMode] = useDarkModeState()
    const data = beginnerAlgorithmsData[language] || beginnerAlgorithmsData.tr
    
    // Neuro labels
    const nLabels = neuroLabels[language] || neuroLabels.tr

    // Neuro-Optimization Mode Toggle State
    const [neuroMode, setNeuroMode] = useState(() => {
        const saved = localStorage.getItem('algorithms_neuro_mode')
        return saved !== null ? JSON.parse(saved) : true
    })

    useEffect(() => {
        localStorage.setItem('algorithms_neuro_mode', JSON.stringify(neuroMode))
    }, [neuroMode])

    // Interleaved Mod Toggle State
    const [isInterleaved, setIsInterleaved] = useState(() => {
        const saved = localStorage.getItem('algorithms_interleaved_mode')
        return saved !== null ? JSON.parse(saved) : false
    })

    useEffect(() => {
        localStorage.setItem('algorithms_interleaved_mode', JSON.stringify(isInterleaved))
    }, [isInterleaved])

    // Active Recall Progress State
    const [recallProgress, setRecallProgress] = useState(() => {
        const saved = localStorage.getItem('algorithms_recall_progress')
        return saved ? JSON.parse(saved) : {}
    })

    const handleRecallUpdate = (lessonId) => {
        const updated = { ...recallProgress, [lessonId]: 'recalled' }
        localStorage.setItem('algorithms_recall_progress', JSON.stringify(updated))
        setRecallProgress(updated)
    }

    // Interleave Effect Shuffling (determinstic for render consistency)
    const interleavedLessons = useMemo(() => {
        if (!isInterleaved) return data.lessons
        const shuffled = [...data.lessons]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = (i * 7 + 3) % shuffled.length
            const temp = shuffled[i]
            shuffled[i] = shuffled[j]
            shuffled[j] = temp
        }
        return shuffled
    }, [data.lessons, isInterleaved])

    const [activeId, setActiveId] = useState(interleavedLessons[0].id)
    const lessonIds = useMemo(() => interleavedLessons.map(lesson => lesson.id), [interleavedLessons])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) setActiveId(entry.target.id)
                })
            },
            { rootMargin: '-25% 0px -65% 0px' }
        )
        lessonIds.forEach(id => {
            const node = document.getElementById(id)
            if (node) observer.observe(node)
        })
        return () => observer.disconnect()
    }, [lessonIds])

    const navTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-slate-950 text-slate-100' : 'bg-gradient-to-br from-emerald-50 via-white to-cyan-50 text-slate-900'}`}>
            <ScrollProgressBar />
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="mx-auto max-w-7xl px-3 py-5 md:px-6 md:py-8">
                <section className={`overflow-hidden rounded-lg border p-4 shadow-xl md:p-7 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                    <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
                        <div>
                            <div className="inline-flex min-h-9 items-center rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 text-xs font-black uppercase tracking-wide text-emerald-300">
                                {data.hero.eyebrow}
                            </div>
                            <h1 className={`mt-4 text-3xl font-black leading-tight md:text-5xl ${darkMode ? 'text-white' : 'text-slate-950'}`}>{data.hero.title}</h1>
                            <p className={`mt-4 max-w-3xl text-base leading-relaxed md:text-lg ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{data.hero.subtitle}</p>
                            <p className={`mt-3 max-w-3xl text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{data.hero.intro}</p>
                            <div className="mt-5 flex flex-wrap gap-3">
                                <Link to="/advanced-algorithms" className="inline-flex min-h-11 items-center rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-4 text-sm font-black text-cyan-200 shadow-lg shadow-cyan-500/10 transition hover:scale-105 hover:bg-cyan-500/20">
                                    {data.hero.advancedLabel}
                                </Link>
                                <button 
                                    onClick={() => setNeuroMode(!neuroMode)} 
                                    className={`min-h-11 rounded-lg px-4 text-sm font-black transition duration-200 shadow-lg hover:scale-105 ${neuroMode ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-violet-600/25 animate-pulse' : 'bg-slate-700 hover:bg-slate-600 text-white shadow-slate-700/20'}`}
                                >
                                    {nLabels.neuroModeToggle} {neuroMode ? '✓' : ''}
                                </button>
                                <button 
                                    onClick={() => setIsInterleaved(!isInterleaved)} 
                                    className={`min-h-11 rounded-lg px-4 text-sm font-black transition duration-200 shadow-lg hover:scale-105 ${isInterleaved ? 'bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-cyan-600/25' : 'bg-slate-700 hover:bg-slate-600 text-white shadow-slate-700/20'}`}
                                >
                                    {nLabels.interleavedPracticeTitle} {isInterleaved ? '✓' : ''}
                                </button>
                            </div>
                        </div>
                        <div className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
                            <div className="grid gap-3 md:grid-cols-[1fr_32px_1fr_32px_1fr]">
                                <StepPill color="#22c55e">{data.page.heroSteps.input}</StepPill>
                                <Arrow />
                                <StepPill color="#06b6d4">{data.page.heroSteps.process}</StepPill>
                                <Arrow />
                                <StepPill color="#f59e0b">{data.page.heroSteps.output}</StepPill>
                            </div>
                            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700/40">
                                <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Spaced Repetition Tracker when neuroMode is active */}
                {neuroMode && (
                    <div className="mt-6">
                        <SpacedRepetitionTracker labels={nLabels} darkMode={darkMode} />
                    </div>
                )}

                <div className="mt-6 grid gap-5 lg:grid-cols-[245px_1fr]">
                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        <nav className={`rounded-lg border p-3 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`} aria-label={data.page.navTitle}>
                            <div className={`mb-3 text-sm font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>{data.page.navTitle}</div>
                            <div className="grid gap-2">
                                {interleavedLessons.map(lesson => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => navTo(lesson.id)}
                                        className={`min-h-10 rounded-lg border px-3 text-left text-xs font-bold transition-all ${activeId === lesson.id ? 'text-white' : darkMode ? 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400'}`}
                                        style={activeId === lesson.id ? { background: lesson.color, borderColor: lesson.color } : {}}
                                    >
                                        {lesson.shortTitle}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => navTo('practice-questions')}
                                className={`mt-2 min-h-10 w-full rounded-lg border px-3 text-left text-xs font-bold transition-all ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400'}`}
                            >
                                {data.page.questionsNav}
                            </button>
                            <Link to="/advanced-algorithms" className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-3 text-sm font-black text-cyan-200 transition hover:scale-105">
                                {data.hero.advancedLabel}
                            </Link>
                        </nav>
                    </aside>

                    <div className="grid gap-6">
                        {interleavedLessons.map(lesson => (
                            <LessonCard 
                                key={lesson.id} 
                                lesson={lesson} 
                                labels={data.page} 
                                darkMode={darkMode} 
                                neuroMode={neuroMode}
                                recallProgress={recallProgress}
                                onRecallUpdate={handleRecallUpdate}
                                nLabels={nLabels}
                            />
                        ))}

                        <QuestionBank data={data} darkMode={darkMode} />

                        <section className={`rounded-lg border p-4 md:p-6 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                            <h2 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>{data.page.glossaryTitle}</h2>
                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                                {data.glossary.map(item => (
                                    <div key={item.term} className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
                                        <div className="text-sm font-black text-emerald-300">{item.term}</div>
                                        <p className={`mt-2 text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{item.text}</p>
                                    </div>
                                ))}
                            </div>
                            <Link to="/advanced-algorithms" className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-cyan-600 px-4 text-sm font-black text-white transition hover:scale-105 hover:bg-cyan-500">
                                {data.page.advancedCta}
                            </Link>
                        </section>
                    </div>
                </div>
            </main>

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title={language === 'tr' ? 'Sayfanın başına dön' : 'Back to top'}
                className="fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-xl text-white shadow-lg shadow-emerald-600/30 transition hover:scale-110 hover:bg-emerald-500"
            >
                🏠
            </button>
        </div>
    )
}

export default AlgorithmsPage
