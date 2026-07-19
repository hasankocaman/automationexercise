// src/components/LessonFinishBadge.jsx
// Ders bitirme rozeti (ürün kararı 2026-07-19): kullanıcı her derste — özellikle
// kariyer haritasının ilk düğümleri olan başlangıç derslerinde — son bölümün/
// sekmenin altında toplam ilerlemesini görür; TÜM bölümler tamamlanınca konfetili
// bitirme rozeti görünür (CLAUDE.md §20 kutlama standardı). Bileşen sunumsaldır:
// tamamlama verisini tutmaz, sayfanın kendi ilerleme state'ini gösterir.
import { useEffect, useState } from 'react'

const CONFETTI_COLORS = ['#f59e0b', '#22c55e', '#6366f1', '#ec4899', '#06b6d4', '#a855f7']

function LessonFinishBadge({ language, darkMode, completedCount, total, lessonTitle }) {
    const isTr = language === 'tr'
    const done = total > 0 && completedCount >= total
    const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0
    const [celebrate, setCelebrate] = useState(false)

    // "Bitti" durumuna her girişte kısa bir konfeti patlaması — dönüşte de küçük
    // bir kutlama göstermek motive eder, 2.5 sn sonra kendiliğinden durur.
    useEffect(() => {
        if (!done) return
        setCelebrate(true)
        const t = setTimeout(() => setCelebrate(false), 2500)
        return () => clearTimeout(t)
    }, [done])

    return (
        <div
            data-testid="lesson-finish-badge"
            data-state={done ? 'done' : 'progress'}
            className={`relative mt-6 overflow-hidden rounded-2xl border-2 p-5 text-center md:p-6 ${
                done
                    ? darkMode
                        ? 'border-amber-500/60 bg-gradient-to-br from-amber-900/30 via-yellow-900/20 to-orange-900/30'
                        : 'border-amber-400 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50'
                    : darkMode
                        ? 'border-gray-700 bg-gray-800/60'
                        : 'border-gray-200 bg-gray-50'
            }`}
        >
            {celebrate && (
                <div className="pointer-events-none absolute inset-0 flex justify-center gap-2 overflow-hidden" aria-hidden="true">
                    {CONFETTI_COLORS.concat(CONFETTI_COLORS).map((c, i) => (
                        <span
                            key={i}
                            className="mt-auto"
                            style={{
                                width: 9,
                                height: 9,
                                borderRadius: i % 2 === 0 ? '50%' : '2px',
                                background: c,
                                animation: `lesson-badge-confetti ${0.9 + (i % 6) * 0.15}s ease ${i * 0.06}s forwards`,
                            }}
                        />
                    ))}
                    <style>{`
                        @keyframes lesson-badge-confetti {
                            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                            100% { transform: translateY(-130px) rotate(660deg) scale(0.3); opacity: 0; }
                        }
                    `}</style>
                </div>
            )}

            <div className={`text-4xl md:text-5xl ${done ? '' : 'opacity-40 grayscale'}`}>🏆</div>

            {done ? (
                <>
                    <div className={`mt-2 text-lg font-black md:text-xl ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                        {isTr ? '🎉 Tebrikler — bu dersi bitirdin!' : '🎉 Congratulations — you finished this lesson!'}
                    </div>
                    {lessonTitle && (
                        <div className={`mt-1 text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{lessonTitle}</div>
                    )}
                    <p className={`mx-auto mt-2 max-w-md text-xs leading-relaxed md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {isTr
                            ? 'Tüm bölümleri tamamladın — ilerlemen kariyer haritana işlendi. Sıradaki derse geçebilirsin. 🚀'
                            : 'You completed every section — your progress is recorded on your career map. On to the next lesson! 🚀'}
                    </p>
                </>
            ) : (
                <>
                    <div className={`mt-2 text-sm font-black md:text-base ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {isTr ? '🏅 Bitirme Rozeti' : '🏅 Completion Badge'}
                    </div>
                    <div className={`mt-1 text-xs font-bold md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {isTr
                            ? `${completedCount}/${total} bölüm tamamlandı`
                            : `${completedCount}/${total} sections completed`}
                    </div>
                    <div className={`mx-auto mt-3 h-2 max-w-xs overflow-hidden rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #f59e0b, #22c55e)' }}
                        />
                    </div>
                    <p className={`mx-auto mt-2 max-w-md text-xs leading-relaxed ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {isTr
                            ? 'Tüm bölümleri tamamlayınca bu rozet senin — ilerlemen kariyer haritana da işlenir. 💪'
                            : 'Complete every section to earn this badge — your progress also counts toward your career map. 💪'}
                    </p>
                </>
            )}
        </div>
    )
}

export default LessonFinishBadge
