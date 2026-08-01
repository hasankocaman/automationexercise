// src/components/InterviewWarmup.jsx
// Ana sayfadaki herkese açık mülakat ısınma bölümü.
//
// NEDEN VAR: mülakat soruları ders sayfalarında %60 quiz barajının arkasında
// (bilinçli bir ürün kararı). Bu, yapılandırılmış veriye giren metnin
// kullanıcıya görünmemesi demekti — arama motoru politikaları içeriğin sayfada
// GÖRÜNÜR olmasını şart koşar. Burası sorunu kaynağından çözer: gate'siz,
// herkese açık, gerçekten ekranda duran bir soru-cevap kümesi. Ana sayfanın
// FAQPage şeması yalnızca bu görünür metinden üretilir.
//
// Cevaplar açılır-kapanır (accordion) olarak sunulur — ilk bakışta soruyu
// düşünmeye zorlar, metin yine de sayfanın kaynağında ve DOM'unda durur.

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { interviewWarmupData as ui } from '../data/interviewWarmupData'
import { INTERVIEW_SHOWCASE } from '../data/generated/interviewShowcase'

const tx = (val, isTr) => {
    if (val == null) return ''
    if (typeof val === 'string') return val
    return isTr ? (val.tr ?? val.en ?? '') : (val.en ?? val.tr ?? '')
}

function QuestionCard({ item, index, isTr, darkMode }) {
    const [open, setOpen] = useState(false)
    const answerId = `warmup-answer-${index}`
    const label = ui.routeLabels[item.route] || item.route

    const levelStyle = item.level === 'advanced'
        ? (darkMode ? 'bg-rose-500/20 text-rose-300' : 'bg-rose-100 text-rose-700')
        : item.level === 'intermediate'
            ? (darkMode ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700')
            : (darkMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700')

    return (
        <article
            data-testid="warmup-card"
            data-route={item.route}
            className={`rounded-2xl border p-4 ${darkMode ? 'border-gray-700 bg-gray-800/70' : 'border-gray-200 bg-white'}`}
        >
            <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className={`rounded px-2 py-0.5 font-mono text-[11px] font-bold ${darkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
                    {label}
                </span>
                <span className={`rounded px-2 py-0.5 text-[11px] font-bold ${levelStyle}`}>
                    {tx(ui.levelLabels[item.level], isTr)}
                </span>
            </div>

            {/* Soru HER ZAMAN görünür — accordion yalnızca cevabı gizler. */}
            <h3 data-testid="warmup-question" className={`mb-3 text-sm font-bold leading-relaxed md:text-base ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {tx(item.q, isTr)}
            </h3>

            <button
                type="button"
                data-testid="warmup-toggle"
                aria-expanded={open}
                aria-controls={answerId}
                onClick={() => setOpen((v) => !v)}
                className={`min-h-9 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
                {open ? tx(ui.hideAnswer, isTr) : tx(ui.showAnswer, isTr)}
            </button>

            {open && (
                <p
                    id={answerId}
                    data-testid="warmup-answer"
                    className={`mt-3 text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                    {tx(item.a, isTr)}
                </p>
            )}

            <Link
                to={item.route}
                data-testid="warmup-lesson-link"
                className={`mt-3 inline-block text-xs font-bold ${darkMode ? 'text-indigo-300 hover:text-indigo-200' : 'text-indigo-700 hover:text-indigo-800'}`}
            >
                {tx(ui.goToLesson, isTr)}
            </Link>
        </article>
    )
}

export default function InterviewWarmup({ darkMode }) {
    const { language } = useLanguage()
    const isTr = language === 'tr'

    if (!INTERVIEW_SHOWCASE.length) return null

    return (
        <section data-testid="interview-warmup" className="container mx-auto px-3 pt-6 md:px-6 md:pt-10">
            <h2 className={`mb-2 text-xl font-extrabold md:text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {tx(ui.heading, isTr)}
            </h2>
            <p className={`mb-4 max-w-3xl text-sm leading-relaxed md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {tx(ui.intro, isTr)}
            </p>

            {/* Kullanıcıyı yanlış yönlendirmemek için: buradaki sorular ısınma,
                asıl çalışma derslerin sonundaki mülakat bölümünde. */}
            <div
                data-testid="warmup-purpose"
                className={`mb-6 rounded-xl border-l-4 p-4 ${darkMode ? 'border-indigo-500 bg-indigo-950/30' : 'border-indigo-400 bg-indigo-50'}`}
            >
                <p className={`mb-1 text-sm font-extrabold ${darkMode ? 'text-indigo-200' : 'text-indigo-800'}`}>
                    {tx(ui.purposeTitle, isTr)}
                </p>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {tx(ui.purposeBody, isTr)}
                </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {INTERVIEW_SHOWCASE.map((item, i) => (
                    <QuestionCard key={`${item.route}-${i}`} item={item} index={i} isTr={isTr} darkMode={darkMode} />
                ))}
            </div>
        </section>
    )
}
