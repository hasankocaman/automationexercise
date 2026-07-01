import { useEffect, useMemo, useRef, useState } from 'react'
import { algorithmsData } from '../data/algorithmsData'
import { useLanguage } from '../context/LanguageContext'
import TopicHeader from './TopicHeader'

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
        const saved = localStorage.getItem('advanced_algorithms_spaced_rep')
        return saved ? JSON.parse(saved) : null
    })

    const startCycle = () => {
        const newCycle = {
            startDate: new Date().toISOString(),
            completedDays: [1]
        }
        localStorage.setItem('advanced_algorithms_spaced_rep', JSON.stringify(newCycle))
        setCycle(newCycle)
    }

    const resetCycle = () => {
        localStorage.removeItem('advanced_algorithms_spaced_rep')
        setCycle(null)
    }

    const completeDay = (day) => {
        if (!cycle) return
        const completedDays = [...cycle.completedDays]
        if (!completedDays.includes(day)) {
            completedDays.push(day)
        }
        const updated = { ...cycle, completedDays }
        localStorage.setItem('advanced_algorithms_spaced_rep', JSON.stringify(updated))
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

const accents = {
    violet: { main: '#7c3aed', soft: '#ede9fe', darkSoft: 'rgba(124, 58, 237, 0.16)' },
    emerald: { main: '#10b981', soft: '#d1fae5', darkSoft: 'rgba(16, 185, 129, 0.16)' },
    cyan: { main: '#0891b2', soft: '#cffafe', darkSoft: 'rgba(8, 145, 178, 0.16)' },
    blue: { main: '#3b82f6', soft: '#dbeafe', darkSoft: 'rgba(59, 130, 246, 0.16)' },
    amber: { main: '#f59e0b', soft: '#fef3c7', darkSoft: 'rgba(245, 158, 11, 0.16)' },
    rose: { main: '#e11d48', soft: '#ffe4e6', darkSoft: 'rgba(225, 29, 72, 0.16)' },
}

const cardColors = {
    red: '#ef4444',
    rose: '#e11d48',
    orange: '#f97316',
    amber: '#f59e0b',
    slate: '#64748b',
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
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #7c3aed, #10b981, #f59e0b)' }}
            />
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

function DifficultyBadge({ level }) {
    const config = {
        beginner: { label: 'Beginner', color: '#10b981' },
        intermediate: { label: 'Intermediate', color: '#f59e0b' },
        advanced: { label: 'Advanced', color: '#ef4444' },
    }
    const item = config[level] || config.beginner

    return (
        <span
            className="inline-flex min-h-9 items-center rounded-lg border px-3 text-xs font-bold"
            style={{ color: item.color, borderColor: `${item.color}55`, background: `${item.color}16` }}
        >
            {item.label}
        </span>
    )
}

function CodeBlock({ code, darkMode }) {
    const [copied, setCopied] = useState(false)
    const codeRef = useRef(null)
    const { language } = useLanguage()

    useEffect(() => {
        if (codeRef.current && window.Prism) window.Prism.highlightElement(codeRef.current)
    }, [code])

    const copy = () => {
        navigator.clipboard.writeText(code.trim())
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
    }

    return (
        <div className="relative mt-4 overflow-hidden rounded-lg border border-slate-700 bg-[#111827]">
            <div className="flex items-center justify-between border-b border-slate-700 px-3 py-2">
                <span className="font-mono text-xs font-semibold text-slate-400">Java</span>
                <button
                    onClick={copy}
                    className={`min-h-9 rounded-lg px-3 text-xs font-bold transition-colors ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}
                >
                    {copied ? (language === 'tr' ? 'Kopyalandi' : 'Copied') : (language === 'tr' ? 'Kopyala' : 'Copy')}
                </button>
            </div>
            <pre className={`overflow-x-auto p-4 text-xs leading-relaxed ${darkMode ? 'text-slate-100' : 'text-slate-100'}`}>
                <code ref={codeRef} className="language-java">{code.trim()}</code>
            </pre>
        </div>
    )
}

function CompletionToggle({ id, label, doneLabel, darkMode }) {
    const storageKey = 'qa-platform-completed'
    const topicId = `algorithms-${id}`
    const [done, setDone] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(storageKey) || '[]').includes(topicId)
        } catch {
            return false
        }
    })

    const toggle = () => {
        let saved = []
        try {
            saved = JSON.parse(localStorage.getItem(storageKey) || '[]')
        } catch {
            saved = []
        }
        const updated = done ? saved.filter(item => item !== topicId) : [...new Set([...saved, topicId])]
        localStorage.setItem(storageKey, JSON.stringify(updated))
        setDone(!done)
    }

    return (
        <label className={`inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 text-xs font-bold ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
            <input type="checkbox" checked={done} onChange={toggle} className="h-4 w-4 accent-emerald-500" />
            <span>{done ? doneLabel : label}</span>
        </label>
    )
}

function QuizCard({ quiz, labels, darkMode }) {
    const [selected, setSelected] = useState('')
    const [checked, setChecked] = useState(false)
    const correct = checked && selected === quiz.correct
    const incorrect = checked && selected && selected !== quiz.correct

    useEffect(() => {
        setSelected('')
        setChecked(false)
    }, [quiz])

    return (
        <div className={`mt-5 rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950/60' : 'border-slate-200 bg-slate-50'}`}>
            <div className="mb-3 text-sm font-bold">{labels.quizTitle}</div>
            <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{quiz.question}</p>
            <div className="mt-3 grid gap-2">
                {quiz.options.map(option => {
                    const isPicked = selected === option.id
                    const isCorrectOption = option.id === quiz.correct
                    
                    let buttonStyle = darkMode 
                        ? 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500' 
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'

                    if (checked) {
                        if (isCorrectOption) {
                            buttonStyle = `border-emerald-500 bg-emerald-500/15 font-black ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`
                        } else if (isPicked) {
                            buttonStyle = `border-rose-500 bg-rose-500/15 font-black ${darkMode ? 'text-rose-300' : 'text-rose-700'}`
                        }
                    } else if (isPicked) {
                        buttonStyle = 'border-violet-500 bg-violet-500/15 text-violet-200 font-black'
                    }

                    return (
                        <button
                            key={option.id}
                            disabled={checked}
                            onClick={() => {
                                setSelected(option.id)
                                setChecked(false)
                            }}
                            className={`min-h-10 rounded-lg border px-3 text-left text-sm transition-all duration-150 ${buttonStyle}`}
                        >
                            <span className="font-mono text-xs font-bold">{option.id.toUpperCase()}.</span> {option.text}
                        </button>
                    )
                })}
            </div>
            <div className="mt-4 flex flex-col gap-3">
                {!checked && (
                    <button
                        onClick={() => selected && setChecked(true)}
                        disabled={!selected}
                        className="self-start min-h-9 rounded-lg bg-violet-600 px-4 text-sm font-bold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {labels.answer}
                    </button>
                )}
                
                {checked && (
                    <div className="flex flex-col gap-2 w-full">
                        {correct ? (
                            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs leading-relaxed font-bold text-emerald-400">
                                🎉 {labels.correct}: {quiz.explanation}
                            </div>
                        ) : (
                            <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3 text-xs leading-relaxed font-bold text-rose-400">
                                ❌ {quiz.explanation}
                            </div>
                        )}
                        <button
                            onClick={() => {
                                setSelected('')
                                setChecked(false)
                            }}
                            className={`self-start min-h-8 rounded px-3 text-[11px] font-black transition ${darkMode ? 'bg-slate-800 text-slate-350 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                        >
                            {labels.reset || 'Reset'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

function FlowVisual({ data, darkMode }) {
    return (
        <div className="grid gap-3 md:grid-cols-3">
            {data.principles.map((item, index) => (
                <div
                    key={item.label}
                    className={`relative min-h-[130px] overflow-hidden rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}
                >
                    <div
                        className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20"
                        style={{ background: ['#7c3aed', '#10b981', '#f59e0b'][index] }}
                    />
                    <div className="relative z-10 text-xs font-bold uppercase tracking-wide text-slate-400">0{index + 1}</div>
                    <div className={`relative z-10 mt-2 text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.label}</div>
                    <p className={`relative z-10 mt-2 text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{item.text}</p>
                </div>
            ))}
        </div>
    )
}

function SortLab({ section, labels, darkMode }) {
    const [items, setItems] = useState(section.lab.items)
    const [draggedId, setDraggedId] = useState(null)
    const expected = section.lab.expectedOrder
    const correctCount = items.filter((item, index) => expected[index] === item.id).length
    const solved = correctCount === expected.length

    useEffect(() => {
        setItems(section.lab.items)
        setDraggedId(null)
    }, [section.lab.items])

    const moveTo = (fromId, targetId) => {
        if (!fromId || fromId === targetId) return
        const next = [...items]
        const fromIndex = next.findIndex(item => item.id === fromId)
        const targetIndex = next.findIndex(item => item.id === targetId)
        if (fromIndex < 0 || targetIndex < 0) return
        const [moved] = next.splice(fromIndex, 1)
        next.splice(targetIndex, 0, moved)
        setItems(next)
    }

    const nudge = (id, direction) => {
        const index = items.findIndex(item => item.id === id)
        const target = index + direction
        if (index < 0 || target < 0 || target >= items.length) return
        const next = [...items]
        const [moved] = next.splice(index, 1)
        next.splice(target, 0, moved)
        setItems(next)
    }

    return (
        <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                    <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{section.lab.title}</div>
                    <p className={`mt-1 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{section.lab.prompt}</p>
                </div>
                <button
                    onClick={() => setItems(section.lab.items)}
                    className={`min-h-9 rounded-lg border px-3 text-xs font-bold ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}
                >
                    {labels.reset}
                </button>
            </div>
            <div className="grid gap-2">
                {items.map((item, index) => {
                    const isCorrect = expected[index] === item.id
                    return (
                        <div
                            key={item.id}
                            draggable
                            onDragStart={() => setDraggedId(item.id)}
                            onDragOver={(event) => event.preventDefault()}
                            onDrop={() => moveTo(draggedId, item.id)}
                            className={`group rounded-lg border p-3 transition-all ${isCorrect ? 'border-emerald-500/60' : darkMode ? 'border-slate-700' : 'border-slate-200'} ${draggedId === item.id ? 'scale-[0.98] opacity-70' : 'hover:-translate-y-0.5'} ${darkMode ? 'bg-slate-900' : 'bg-white'}`}
                            style={{ boxShadow: isCorrect ? `0 0 0 1px ${cardColors[item.color]}33` : 'none' }}
                            data-testid={`algorithm-sort-card-${item.id}`}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-sm font-black text-white"
                                    style={{ background: cardColors[item.color] || '#64748b' }}
                                >
                                    {item.score}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{index + 1}. {item.title}</div>
                                    <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.meta}</div>
                                </div>
                                <div className="flex flex-shrink-0 gap-1">
                                    <button onClick={() => nudge(item.id, -1)} className="min-h-9 rounded-lg bg-slate-700 px-2 text-xs font-bold text-white disabled:opacity-30" disabled={index === 0}>{labels.moveUp}</button>
                                    <button onClick={() => nudge(item.id, 1)} className="min-h-9 rounded-lg bg-slate-700 px-2 text-xs font-bold text-white disabled:opacity-30" disabled={index === items.length - 1}>{labels.moveDown}</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={`mt-3 rounded-lg border px-3 py-2 text-sm font-bold ${solved ? `border-emerald-500/50 bg-emerald-500/10 ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}` : `border-amber-500/40 bg-amber-500/10 ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}`}>
                {solved ? section.lab.success : `${correctCount}/${expected.length} ${labels.correct}. ${section.lab.hint}`}
            </div>
        </div>
    )
}

function BinarySearchLab({ section, labels, darkMode }) {
    const commits = section.lab.items
    const target = section.lab.targetIndex
    const [range, setRange] = useState({ low: 0, high: commits.length - 1 })
    const [probe, setProbe] = useState(null)
    const [history, setHistory] = useState([])
    const found = range.low === range.high

    const reset = () => {
        setRange({ low: 0, high: commits.length - 1 })
        setProbe(null)
        setHistory([])
    }

    useEffect(reset, [section])

    const step = () => {
        if (found) return
        const mid = Math.floor((range.low + range.high) / 2)
        const fails = mid >= target
        const nextRange = fails ? { low: range.low, high: mid } : { low: mid + 1, high: range.high }
        setProbe(mid)
        setHistory(prev => [...prev, { label: commits[mid], result: fails ? 'FAIL' : 'PASS', removed: fails ? 'right' : 'left' }])
        setRange(nextRange)
    }

    return (
        <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                    <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{section.lab.title}</div>
                    <p className={`mt-1 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{section.lab.prompt}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={step} disabled={found} className="min-h-9 rounded-lg bg-cyan-600 px-3 text-xs font-bold text-white hover:bg-cyan-500 disabled:opacity-40">
                        {found ? labels.done : labels.run}
                    </button>
                    <button onClick={reset} className={`min-h-9 rounded-lg border px-3 text-xs font-bold ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                        {labels.reset}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-6 gap-2 md:grid-cols-12">
                {commits.map((commit, index) => {
                    const active = index >= range.low && index <= range.high
                    const isProbe = probe === index
                    const isTarget = found && index === target
                    return (
                        <div
                            key={commit}
                            className={`rounded-lg border px-2 py-3 text-center font-mono text-xs font-black transition-all ${active ? 'scale-100 opacity-100' : 'scale-95 opacity-30'} ${darkMode ? 'bg-slate-900' : 'bg-white'}`}
                            style={{
                                borderColor: isTarget ? '#10b981' : isProbe ? '#f59e0b' : active ? '#0891b2' : '#64748b',
                                color: isTarget ? '#10b981' : isProbe ? '#f59e0b' : active ? '#38bdf8' : '#94a3b8',
                            }}
                        >
                            {commit}
                        </div>
                    )
                })}
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1.2fr]">
                <div className={`rounded-lg border p-3 text-sm ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                    <div className="font-bold">low={commits[range.low]} / high={commits[range.high]}</div>
                    <div className="mt-2 h-2 rounded-full bg-slate-700">
                        <div
                            className="h-2 rounded-full bg-cyan-500 transition-all"
                            style={{ marginLeft: `${(range.low / (commits.length - 1)) * 100}%`, width: `${((range.high - range.low + 1) / commits.length) * 100}%` }}
                        />
                    </div>
                </div>
                <div className={`rounded-lg border p-3 text-xs ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                    {history.length === 0 ? section.lab.prompt : history.map((item, index) => (
                        <div key={`${item.label}-${index}`} className="mb-1 font-mono">
                            {item.label}{' -> '}<span className={item.result === 'FAIL' ? 'text-rose-400' : 'text-emerald-400'}>{item.result}</span>
                        </div>
                    ))}
                    {found && <div className="mt-2 font-bold text-emerald-400">{section.lab.success}</div>}
                </div>
            </div>
        </div>
    )
}

function GraphLab({ section, labels, darkMode }) {
    const [stepIndex, setStepIndex] = useState(-1)
    const [running, setRunning] = useState(false)
    const timersRef = useRef([])
    const order = section.lab.order
    const visited = order.slice(0, stepIndex + 1)
    const queue = order.slice(stepIndex + 1, stepIndex + 4)
    const done = stepIndex >= order.length - 1

    const clearTimers = () => {
        timersRef.current.forEach(clearTimeout)
        timersRef.current = []
    }

    const reset = () => {
        clearTimers()
        setStepIndex(-1)
        setRunning(false)
    }

    useEffect(() => clearTimers, [])
    useEffect(reset, [section])

    const run = () => {
        reset()
        setRunning(true)
        section.lab.order.forEach((_, index) => {
            const timer = setTimeout(() => {
                setStepIndex(index)
                if (index === section.lab.order.length - 1) setRunning(false)
            }, 450 * (index + 1))
            timersRef.current.push(timer)
        })
    }

    const nodeById = useMemo(() => Object.fromEntries(section.lab.nodes.map(node => [node.id, node])), [section.lab.nodes])

    return (
        <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                    <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{section.lab.title}</div>
                    <p className={`mt-1 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{section.lab.prompt}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={run} disabled={running} className="min-h-9 rounded-lg bg-blue-600 px-3 text-xs font-bold text-white hover:bg-blue-500 disabled:opacity-40">
                        {done ? labels.again : labels.run}
                    </button>
                    <button onClick={reset} className={`min-h-9 rounded-lg border px-3 text-xs font-bold ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                        {labels.reset}
                    </button>
                </div>
            </div>
            <div className={`rounded-lg border p-2 ${darkMode ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-white'}`}>
                <svg viewBox="0 0 430 310" className="h-auto w-full" role="img" aria-label="Checkout graph traversal">
                    {section.lab.edges.map(([from, to]) => {
                        const a = nodeById[from]
                        const b = nodeById[to]
                        const active = visited.includes(from) && visited.includes(to)
                        return (
                            <line
                                key={`${from}-${to}`}
                                x1={a.x}
                                y1={a.y}
                                x2={b.x}
                                y2={b.y}
                                stroke={active ? '#10b981' : darkMode ? '#475569' : '#cbd5e1'}
                                strokeWidth={active ? 4 : 2}
                                strokeLinecap="round"
                            />
                        )
                    })}
                    {section.lab.nodes.map(node => {
                        const active = visited.includes(node.id)
                        const current = visited[visited.length - 1] === node.id
                        return (
                            <g key={node.id}>
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={current ? 32 : 27}
                                    fill={active ? '#10b981' : darkMode ? '#1e293b' : '#f8fafc'}
                                    stroke={current ? '#f59e0b' : active ? '#34d399' : '#64748b'}
                                    strokeWidth={current ? 5 : 2}
                                    className={current ? 'animate-pulse' : ''}
                                />
                                <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-current text-[11px] font-bold" style={{ color: active ? '#fff' : darkMode ? '#cbd5e1' : '#334155' }}>
                                    {node.id}
                                </text>
                            </g>
                        )
                    })}
                </svg>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div className={`rounded-lg border p-3 text-xs ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                    <div className="mb-2 font-bold">Visited</div>
                    <div className="flex flex-wrap gap-2">{visited.length ? visited.map(item => <span key={item} className={`rounded-lg bg-emerald-500/15 px-2 py-1 font-mono ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>{item}</span>) : '-'}</div>
                </div>
                <div className={`rounded-lg border p-3 text-xs ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                    <div className="mb-2 font-bold">Queue</div>
                    <div className="flex flex-wrap gap-2">{queue.length ? queue.map(item => <span key={item} className="rounded-lg bg-blue-500/15 px-2 py-1 font-mono text-blue-300">{item}</span>) : '-'}</div>
                </div>
            </div>
            {done && <div className={`mt-3 rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-3 py-2 text-sm font-bold ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>{section.lab.success}</div>}
        </div>
    )
}

function StateMachineLab({ section, labels, darkMode }) {
    const [current, setCurrent] = useState(section.lab.states[0])
    const [completed, setCompleted] = useState([])
    const [message, setMessage] = useState(section.lab.prompt)
    const requiredOrder = section.lab.events.map(event => event.id)
    const done = current === section.lab.states[section.lab.states.length - 1]

    const reset = () => {
        setCurrent(section.lab.states[0])
        setCompleted([])
        setMessage(section.lab.prompt)
    }

    useEffect(reset, [section])

    const fireEvent = (event) => {
        const expected = requiredOrder[completed.length]
        if (event.id !== expected || event.from !== current) {
            setMessage(event.message || 'Invalid transition')
            return
        }
        setCurrent(event.to)
        setCompleted(prev => [...prev, event.id])
        setMessage(event.to === 'submitted' ? section.lab.success : `${event.label} -> ${event.to}`)
    }

    const allEvents = [...section.lab.events, ...section.lab.traps]

    return (
        <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                    <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{section.lab.title}</div>
                    <p className={`mt-1 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{section.lab.prompt}</p>
                </div>
                <button onClick={reset} className={`min-h-9 rounded-lg border px-3 text-xs font-bold ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                    {labels.reset}
                </button>
            </div>
            <div className="grid gap-3 md:grid-cols-[1fr_220px]">
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    {section.lab.states.map((state, index) => {
                        const active = current === state
                        const passed = section.lab.states.indexOf(current) > index
                        return (
                            <div
                                key={state}
                                className={`rounded-lg border p-3 text-center transition-all ${active ? 'scale-105 border-amber-400 bg-amber-500/15' : passed ? 'border-emerald-500/50 bg-emerald-500/10' : darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}
                            >
                                <div className={`text-xs font-bold uppercase ${active ? (darkMode ? 'text-amber-300' : 'text-amber-700') : passed ? (darkMode ? 'text-emerald-300' : 'text-emerald-700') : darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{state}</div>
                            </div>
                        )
                    })}
                </div>
                <div className={`rounded-lg border p-3 text-sm font-bold ${done ? `border-emerald-500/50 bg-emerald-500/10 ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}` : `border-amber-500/40 bg-amber-500/10 ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}`}>
                    {message}
                </div>
            </div>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
                {allEvents.map(event => (
                    <button
                        key={event.id}
                        onClick={() => fireEvent(event)}
                        className={`min-h-10 rounded-lg border px-3 text-left text-xs font-bold transition-all ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-200 hover:border-amber-500' : 'border-slate-200 bg-white text-slate-700 hover:border-amber-500'}`}
                    >
                        {event.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

function ComplexityLab({ section, darkMode }) {
    const [n, setN] = useState(section.lab.defaultValue)
    const ops = [
        { label: 'O(1)', value: 1, color: '#10b981' },
        { label: 'O(log n)', value: Math.ceil(Math.log2(n)), color: '#3b82f6' },
        { label: 'O(n)', value: n, color: '#f59e0b' },
        { label: 'O(n^2)', value: n * n, color: '#ef4444' },
    ]
    const maxLog = Math.log10(n * n + 1)

    return (
        <div>
            <div className="mb-3">
                <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{section.lab.title}</div>
                <p className={`mt-1 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{section.lab.prompt}</p>
            </div>
            <label className={`block rounded-lg border p-3 ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                <div className="mb-2 flex items-center justify-between text-sm font-bold">
                    <span>n</span>
                    <span className="font-mono">{n}</span>
                </div>
                <input
                    type="range"
                    min={section.lab.min}
                    max={section.lab.max}
                    value={n}
                    onChange={(event) => setN(Number(event.target.value))}
                    className="w-full accent-rose-600"
                />
            </label>
            <div className="mt-4 grid gap-3">
                {ops.map(item => {
                    const width = Math.max(8, (Math.log10(item.value + 1) / maxLog) * 100)
                    return (
                        <div key={item.label} className={`rounded-lg border p-3 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                            <div className="mb-2 flex items-center justify-between text-xs font-bold">
                                <span style={{ color: item.color }}>{item.label}</span>
                                <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>{item.value.toLocaleString()} ops</span>
                            </div>
                            <div className="h-3 rounded-full bg-slate-700/60">
                                <div className="h-3 rounded-full transition-all duration-300" style={{ width: `${width}%`, background: item.color }} />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="mt-3 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm font-bold text-rose-300">{section.lab.success}</div>
        </div>
    )
}

function VisualLab({ section, labels, darkMode, data }) {
    if (section.visualKind === 'flow') return <FlowVisual data={data} darkMode={darkMode} />
    if (section.visualKind === 'sort') return <SortLab section={section} labels={labels} darkMode={darkMode} />
    if (section.visualKind === 'binary') return <BinarySearchLab section={section} labels={labels} darkMode={darkMode} />
    if (section.visualKind === 'graph') return <GraphLab section={section} labels={labels} darkMode={darkMode} />
    if (section.visualKind === 'state') return <StateMachineLab section={section} labels={labels} darkMode={darkMode} />
    if (section.visualKind === 'complexity') return <ComplexityLab section={section} labels={labels} darkMode={darkMode} />
    return null
}

function SectionCard({ section, labels, darkMode, data, neuroMode, recallProgress, onRecallUpdate, nLabels }) {
    const accent = accents[section.accent] || accents.violet
    const isUnlocked = !neuroMode || recallProgress[section.id] === 'recalled';

    return (
        <section id={section.id} className="scroll-mt-24">
            <div className={`rounded-lg border p-4 shadow-xl md:p-6 transition duration-300 ${darkMode ? 'border-slate-700 bg-slate-800/90' : 'border-slate-200 bg-white'}`}>
                {neuroMode && !isUnlocked && (
                    <div className="mb-5">
                        <RecallFlashcard 
                            lesson={section} 
                            labels={nLabels} 
                            darkMode={darkMode} 
                            onRecallComplete={() => onRecallUpdate(section.id)} 
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
                            <span
                                className="inline-flex min-h-9 items-center rounded-lg px-3 text-xs font-black uppercase tracking-wide text-white"
                                style={{ background: accent.main }}
                            >
                                {section.tag}
                            </span>
                            <DifficultyBadge level={section.difficulty} />
                            <CompletionToggle id={section.id} label={labels.markDone} doneLabel={labels.done} darkMode={darkMode} />
                        </div>

                        <h2 className={`text-xl font-black leading-tight md:text-2xl ${darkMode ? 'text-white' : 'text-slate-950'}`}>{section.title}</h2>

                        <div
                            className="mt-4 rounded-lg border-l-4 p-4 text-sm leading-relaxed"
                            style={{ borderColor: '#f59e0b', background: darkMode ? 'rgba(245, 158, 11, 0.13)' : '#fef3c7', color: darkMode ? '#fde68a' : '#92400e' }}
                        >
                            {section.analogy}
                        </div>

                        <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                            <div className="grid gap-3">
                                {[
                                    [labels.algorithmIdea, section.definition],
                                    [labels.qaUse, section.qaUse],
                                    [labels.javaCompare, section.javaCompare],
                                ].map(([title, text]) => (
                                    <div key={title} className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-900/80' : 'border-slate-200 bg-slate-50'}`}>
                                        <div className="text-xs font-black uppercase tracking-wide" style={{ color: accent.main }}>{title}</div>
                                        <p className={`mt-2 text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{text}</p>
                                    </div>
                                ))}
                            </div>
                            <div className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-900/80' : 'border-slate-200 bg-slate-50'}`}>
                                <div className="text-xs font-black uppercase tracking-wide" style={{ color: accent.main }}>{labels.complexity}</div>
                                <div className="mt-3 grid gap-2">
                                    {section.complexity.map(item => (
                                        <div key={item} className={`rounded-lg px-3 py-2 text-sm font-bold ${darkMode ? 'bg-slate-800 text-slate-200' : 'bg-white text-slate-700'}`}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            <div className="mb-3 text-xs font-black uppercase tracking-wide" style={{ color: accent.main }}>{labels.visualTitle}</div>
                            <div
                                className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950/70' : 'border-slate-200 bg-slate-50'}`}
                                style={{ boxShadow: `0 0 0 1px ${accent.main}22, 0 18px 45px ${accent.main}10` }}
                            >
                                <VisualLab section={section} labels={labels} darkMode={darkMode} data={data} />
                            </div>
                        </div>

                        <CodeBlock code={section.code} darkMode={darkMode} />
                        <QuizCard quiz={section.quiz} labels={labels} darkMode={darkMode} />
                    </div>
                </div>

                {neuroMode && isUnlocked && (
                    <div className="mt-6 border-t pt-5">
                        <FeynmanWorkspace lesson={section} labels={nLabels} darkMode={darkMode} />
                    </div>
                )}
            </div>
        </section>
    )
}

function AdvancedAlgorithmsPage() {
    const { language } = useLanguage()
    const [darkMode, setDarkMode] = useDarkModeState()
    const data = algorithmsData[language] || algorithmsData.tr
    
    // Neuro labels
    const nLabels = neuroLabels[language] || neuroLabels.tr

    // Neuro-Optimization Mode Toggle State
    const [neuroMode, setNeuroMode] = useState(() => {
        const saved = localStorage.getItem('advanced_algorithms_neuro_mode')
        return saved !== null ? JSON.parse(saved) : true
    })

    useEffect(() => {
        localStorage.setItem('advanced_algorithms_neuro_mode', JSON.stringify(neuroMode))
    }, [neuroMode])

    // Interleaved Mod Toggle State
    const [isInterleaved, setIsInterleaved] = useState(() => {
        const saved = localStorage.getItem('advanced_algorithms_interleaved_mode')
        return saved !== null ? JSON.parse(saved) : false
    })

    useEffect(() => {
        localStorage.setItem('advanced_algorithms_interleaved_mode', JSON.stringify(isInterleaved))
    }, [isInterleaved])

    // Active Recall Progress State
    const [recallProgress, setRecallProgress] = useState(() => {
        const saved = localStorage.getItem('advanced_algorithms_recall_progress')
        return saved ? JSON.parse(saved) : {}
    })

    const handleRecallUpdate = (sectionId) => {
        const updated = { ...recallProgress, [sectionId]: 'recalled' }
        localStorage.setItem('advanced_algorithms_recall_progress', JSON.stringify(updated))
        setRecallProgress(updated)
    }

    // Interleave Effect Shuffling (determinstic for render consistency)
    const interleavedSections = useMemo(() => {
        if (!isInterleaved) return data.sections
        const shuffled = [...data.sections]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = (i * 7 + 3) % shuffled.length
            const temp = shuffled[i]
            shuffled[i] = shuffled[j]
            shuffled[j] = temp
        }
        return shuffled
    }, [data.sections, isInterleaved])

    const [activeId, setActiveId] = useState(interleavedSections[0].id)
    const sectionIds = useMemo(() => interleavedSections.map(section => section.id), [interleavedSections])

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
        sectionIds.forEach(id => {
            const node = document.getElementById(id)
            if (node) observer.observe(node)
        })
        return () => observer.disconnect()
    }, [sectionIds])

    const navTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-slate-950 text-slate-100' : 'bg-gradient-to-br from-slate-50 via-white to-cyan-50 text-slate-900'}`}>
            <ScrollProgressBar />
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="mx-auto max-w-7xl px-3 py-5 md:px-6 md:py-8">
                <section className={`overflow-hidden rounded-lg border p-4 shadow-xl md:p-7 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                    <div className="grid gap-6 lg:grid-cols-[1fr_440px] lg:items-center">
                        <div>
                            <div className="inline-flex min-h-9 items-center rounded-lg border border-violet-500/40 bg-violet-500/10 px-3 text-xs font-black uppercase tracking-wide text-violet-300">
                                {data.hero.eyebrow}
                            </div>
                            <h1 className={`mt-4 text-3xl font-black leading-tight md:text-4xl ${darkMode ? 'text-white' : 'text-slate-950'}`}>
                                {data.hero.title}
                            </h1>
                            <p className={`mt-4 max-w-3xl text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                {data.hero.subtitle}
                            </p>
                            <p className={`mt-3 max-w-3xl text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                {data.hero.intro}
                            </p>
                            <div className="mt-5 flex flex-wrap gap-3">
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
                            <FlowVisual data={data} darkMode={darkMode} />
                        </div>
                    </div>
                </section>

                {/* Spaced Repetition Tracker when neuroMode is active */}
                {neuroMode && (
                    <div className="mt-6">
                        <SpacedRepetitionTracker labels={nLabels} darkMode={darkMode} />
                    </div>
                )}

                <div className="mt-6 grid gap-5 lg:grid-cols-[250px_1fr]">
                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        <nav className={`rounded-lg border p-3 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`} aria-label={data.page.navTitle}>
                            <div className={`mb-3 text-sm font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>{data.page.navTitle}</div>
                            <div className="grid gap-2">
                                {interleavedSections.map(section => {
                                    const active = activeId === section.id
                                    const accent = accents[section.accent] || accents.violet
                                    return (
                                        <button
                                            key={section.id}
                                            onClick={() => navTo(section.id)}
                                            className={`min-h-10 rounded-lg border px-3 text-left text-sm font-bold transition-all ${active ? 'text-white' : darkMode ? 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400'}`}
                                            style={active ? { background: accent.main, borderColor: accent.main } : {}}
                                        >
                                            {section.shortTitle}
                                        </button>
                                    )
                                })}
                            </div>
                        </nav>
                    </aside>

                    <div className="grid gap-6">
                        {interleavedSections.map(section => (
                            <SectionCard 
                                key={section.id} 
                                section={section} 
                                labels={data.page} 
                                darkMode={darkMode} 
                                data={data} 
                                neuroMode={neuroMode}
                                recallProgress={recallProgress}
                                onRecallUpdate={handleRecallUpdate}
                                nLabels={nLabels}
                            />
                        ))}

                        <section className={`rounded-lg border p-4 md:p-6 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                            <h2 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>{data.page.glossaryTitle}</h2>
                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                                {data.glossary.map(item => (
                                    <div key={item.term} className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
                                        <div className="text-sm font-black text-violet-300">{item.term}</div>
                                        <p className={`mt-2 text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{item.definition}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title={language === 'tr' ? 'Sayfanin basina don' : 'Back to top'}
                className="fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-xl text-white shadow-lg shadow-violet-600/30 transition hover:scale-110 hover:bg-violet-500"
            >
                🏠
            </button>
        </div>
    )
}

export default AdvancedAlgorithmsPage
