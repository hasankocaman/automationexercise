// src/components/LessonFinishBadge.jsx
// Ders bitirme rozeti (ürün kararı 2026-07-19): kullanıcı her derste — özellikle
// kariyer haritasının ilk düğümleri olan başlangıç derslerinde — son bölümün/
// sekmenin altında toplam ilerlemesini görür; TÜM bölümler tamamlanınca konfetili
// bitirme rozeti görünür (CLAUDE.md §20 kutlama standardı). Bileşen sunumsaldır:
// tamamlama verisini tutmaz, sayfanın kendi ilerleme state'ini gösterir.
import { useEffect, useState } from 'react'
import { trackMapEvent } from '../utils/mapEvents'
import { getLessonSocialProof } from '../lib/socialProof'

const CONFETTI_COLORS = ['#f59e0b', '#22c55e', '#6366f1', '#ec4899', '#06b6d4', '#a855f7']

function LessonFinishBadge({ language, darkMode, completedCount, total, lessonTitle, route }) {
    const isTr = language === 'tr'
    const done = total > 0 && completedCount >= total
    const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0
    const [celebrate, setCelebrate] = useState(false)
    // { count, windowDays } | null — windowDays: 7 ise haftalık, null ise
    // tüm-zamanlar sayısı (retention-and-motivation-plan.md Aşama C.2 fallback).
    const [socialProof, setSocialProof] = useState(null)

    // "Bitti" durumuna her girişte kısa bir konfeti patlaması — dönüşte de küçük
    // bir kutlama göstermek motive eder, 2.5 sn sonra kendiliğinden durur.
    useEffect(() => {
        if (!done) return
        setCelebrate(true)
        const t = setTimeout(() => setCelebrate(false), 2500)
        return () => clearTimeout(t)
    }, [done])

    // Ambient sosyal kanıt: agregat tamamlama sayısı (kişisel veri yok, sadece
    // count). Fire-and-forget — RPC henüz yoksa/hata verirse sessizce gizli
    // kalır. Aynı anon_id birden çok kez bitirse bile DB tarafı COUNT(DISTINCT
    // anon_id) kullandığı için sayı şişmez (supabase/social_proof_schema.sql).
    useEffect(() => {
        if (!done || !route) return
        trackMapEvent('lesson_completed', { route })
        let cancelled = false
        getLessonSocialProof(route).then((proof) => {
            if (!cancelled) setSocialProof(proof)
        })
        return () => { cancelled = true }
    }, [done, route])

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
                        {isTr ? '🎉 Tebrikler — bu dersin tüm tuğlalarını dizdin!' : '🎉 Congratulations — you laid all bricks for this lesson!'}
                    </div>
                    {lessonTitle && (
                        <div className={`mt-1 text-sm font-bold ${darkMode ? 'text-teal-300' : 'text-teal-700'}`}>🧱 {lessonTitle}</div>
                    )}
                    <p className={`mx-auto mt-2 max-w-md text-xs leading-relaxed md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {isTr
                            ? 'Tüm bölümleri tamamladın — sağlam tuğlan bina haritana işlendi. Sıradaki katmanı inşa etmeye hazırsın! 🚀'
                            : 'You completed every section — your solid brick is placed on your building map. On to the next floor! 🚀'}
                    </p>
                    {socialProof && (
                        <p
                            data-testid="lesson-social-proof"
                            className={`mt-2 text-xs font-semibold ${darkMode ? 'text-amber-400/90' : 'text-amber-600'}`}
                        >
                            {socialProof.windowDays
                                ? (isTr
                                    ? `🙌 Son 7 günde ${socialProof.count} yapı ustası bu dersi seninle birlikte tamamladı`
                                    : `🙌 ${socialProof.count} builders finished this lesson alongside you this week`)
                                : (isTr
                                    ? `🙌 ${socialProof.count} yapı ustası bu dersi seninle birlikte tamamladı`
                                    : `🙌 ${socialProof.count} builders have finished this lesson alongside you`)}
                        </p>
                    )}
                </>
            ) : (
                <>
                    <div className={`mt-2 text-sm font-black md:text-base ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {isTr ? '🧱 Tuğla Katmanı Rozeti' : '🧱 Layer Badge'}
                    </div>
                    <div className={`mt-1 text-xs font-bold md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {isTr
                            ? `${completedCount}/${total} tuğla dizildi`
                            : `${completedCount}/${total} bricks laid`}
                    </div>
                    <div className="mx-auto mt-3 max-w-xs">
                        <div className={`h-3 w-full rounded-full overflow-hidden p-0.5 border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-200 border-gray-300'}`}>
                            <div
                                className="h-full rounded-full transition-all duration-500 brick-bevel"
                                style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #14b8a6, #06b6d4, #f59e0b)' }}
                            />
                        </div>
                    </div>
                    <p className={`mx-auto mt-2 max-w-md text-xs leading-relaxed ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {isTr
                            ? 'Tüm tuğlaları tamamlayınca bu katman rozeti senin — ilerlemen bina inşaatına da işlenir. 💪'
                            : 'Lay all bricks to earn this badge — your progress builds your structure. 💪'}
                    </p>
                </>
            )}
        </div>
    )
}

export default LessonFinishBadge
