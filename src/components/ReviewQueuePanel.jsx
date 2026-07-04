import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getDueItems, recordReviewResult, REVIEW_QUEUE_SESSION_SIZE } from '../lib/reviewQueue'

// WP4 "Bugünkü Tekrar" (fableplan.md) — Leitner-lite spaced repetition paneli.
// Sadece daha önce yanlış cevaplanmış quiz sorularını, en fazla
// REVIEW_QUEUE_SESSION_SIZE tanesini, tek tek MCQ olarak gösterir.
function ReviewQueuePanel({ darkMode, language, onClose }) {
    const [items] = useState(() => getDueItems(Date.now()).slice(0, REVIEW_QUEUE_SESSION_SIZE))
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selected, setSelected] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    const current = items[currentIndex]
    const isDone = items.length === 0 || currentIndex >= items.length

    function handleSubmit() {
        if (selected === null || !current) return
        setSubmitted(true)
        recordReviewResult(current.id, selected === current.correctIndex, Date.now())
    }

    function handleNext() {
        setSelected(null)
        setSubmitted(false)
        setCurrentIndex((i) => i + 1)
    }

    const bi = (val) => (val && (val[language] || val.en || val.tr)) || ''

    return (
        <div
            className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4"
            style={{ background: 'rgba(0,0,0,0.75)' }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
            <div className={`w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`flex items-center justify-between gap-3 p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center gap-2">
                        <span className="text-xl">🔄</span>
                        <h2 className={`font-black text-sm md:text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {language === 'tr' ? 'Bugünkü Tekrar' : "Today's Review"}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        data-testid="review-queue-close"
                        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm transition-colors ${darkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}`}
                    >✕</button>
                </div>

                <div className="p-4 md:p-5">
                    {isDone ? (
                        <div className="text-center py-6">
                            <div className="text-4xl mb-2">🎉</div>
                            <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {language === 'tr' ? 'Bugünlük bu kadar! Harika iş çıkardın.' : "That's it for today! Great work."}
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-4 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm font-semibold min-h-[36px]"
                            >
                                {language === 'tr' ? 'Kapat' : 'Close'}
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className={`text-xs mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {currentIndex + 1} / {items.length} — {current.pageTitle}
                            </p>
                            <p className={`text-sm font-semibold mb-4 leading-relaxed ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                {bi(current.question)}
                            </p>
                            <div className="space-y-2" data-testid="review-queue-options">
                                {(current.options || []).map((opt, i) => {
                                    const isCorrectOpt = i === current.correctIndex
                                    const isSelected = selected === i
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => !submitted && setSelected(i)}
                                            className={`w-full text-left px-4 py-3 rounded-lg text-sm border-2 transition-all min-h-[36px] ${submitted
                                                ? isCorrectOpt
                                                    ? darkMode ? 'bg-green-500/20 border-green-500 text-green-300' : 'bg-green-50 border-green-500 text-green-800'
                                                    : isSelected
                                                        ? darkMode ? 'bg-red-500/20 border-red-500 text-red-300' : 'bg-red-50 border-red-500 text-red-700'
                                                        : darkMode ? 'bg-gray-700 border-gray-600 text-gray-500' : 'bg-white border-gray-200 text-gray-500'
                                                : isSelected
                                                    ? darkMode ? 'bg-indigo-800 border-indigo-500 text-indigo-200' : 'bg-indigo-100 border-indigo-400 text-indigo-800'
                                                    : darkMode ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {bi(opt)}
                                            {submitted && isCorrectOpt && <span className="ml-2">✓</span>}
                                            {submitted && isSelected && !isCorrectOpt && <span className="ml-2">✗</span>}
                                        </button>
                                    )
                                })}
                            </div>

                            {!submitted && (
                                <button
                                    onClick={handleSubmit}
                                    disabled={selected === null}
                                    data-testid="review-queue-submit"
                                    className="mt-4 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm font-semibold hover:shadow-md transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed min-h-[36px]"
                                >
                                    {language === 'tr' ? 'Cevabı Kontrol Et' : 'Check Answer'} →
                                </button>
                            )}

                            {submitted && (
                                <div className={`mt-4 p-4 rounded-lg text-sm leading-relaxed ${selected === current.correctIndex
                                    ? (darkMode ? 'bg-green-900/30 text-green-300 border border-green-700' : 'bg-green-50 text-green-800 border border-green-200')
                                    : (darkMode ? 'bg-amber-900/30 text-amber-300 border border-amber-700' : 'bg-amber-50 text-amber-800 border border-amber-200')
                                    }`}>
                                    <span className="font-bold">
                                        {selected === current.correctIndex
                                            ? (language === 'tr' ? 'Doğru! ' : 'Correct! ')
                                            : (language === 'tr' ? 'Yanlış. ' : 'Incorrect. ')}
                                    </span>
                                    {bi(current.explanation)}
                                </div>
                            )}

                            {submitted && (
                                <div className="mt-4 flex items-center justify-between gap-3">
                                    <Link
                                        to={current.route}
                                        onClick={onClose}
                                        className={`text-xs font-semibold min-h-[36px] flex items-center ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'}`}
                                    >
                                        {language === 'tr' ? 'Konuya git →' : 'Go to topic →'}
                                    </Link>
                                    <button
                                        onClick={handleNext}
                                        data-testid="review-queue-next"
                                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-xs font-semibold min-h-[36px]"
                                    >
                                        {language === 'tr' ? 'Sonraki' : 'Next'} →
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ReviewQueuePanel
