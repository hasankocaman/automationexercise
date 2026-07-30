import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { getPersistentWeakness } from '../lib/mentorSnapshots'
import { routeLabel } from '../lib/mentorAdvice'

// ─────────────────────────────────────────────────────────────────────────────
// MentorNudge — proaktif site-giriş hatırlatıcısı (öğrenme yazısı #5). Plan Bölüm 6 (O6).
//
// Kullanıcı HomePage DIŞINDAKİ sayfalarda (ders/test) gezerken, KALICI bir zayıflık
// varsa (getPersistentWeakness, ≥1 gündür) kapatılabilir küçük bir kart gösterir ve
// HomePage'deki mentor bölümüne yönlendirir. HomePage'de zaten MentorPanel öne
// çıktığından nudge orada GÖSTERİLMEZ.
//
// TAMAMEN YEREL — üyelik gerektirmez (karar §6.2-②, e-posta yok, uygulama-içi).
// Aynı gün kapatılırsa o gün tekrar rahatsız etmez (localStorage).
// ─────────────────────────────────────────────────────────────────────────────

const DISMISS_KEY = 'learnqa_mentor_nudge_dismissed'

function utcDay() {
    return new Date().toISOString().slice(0, 10)
}

function readDarkMode() {
    try {
        const saved = localStorage.getItem('darkMode')
        return saved !== null ? JSON.parse(saved) : true
    } catch {
        return true
    }
}

export default function MentorNudge() {
    const { language } = useLanguage()
    const isTr = language === 'tr'
    const location = useLocation()
    const [weakness, setWeakness] = useState(null)
    const [dismissed, setDismissed] = useState(false)
    const darkMode = readDarkMode()

    useEffect(() => {
        try {
            if (localStorage.getItem(DISMISS_KEY) === utcDay()) { setDismissed(true); return }
            const w = getPersistentWeakness()
            // Yalnızca GERÇEKTEN kalıcı (≥1 gündür) zayıflıkta rahatsız et — aksi
            // halde HomePage paneli yeterli, her sayfada nudge göstermek gürültü olur.
            if (w && (w.daysStruggling || 0) >= 1) setWeakness(w)
        } catch { /* localStorage kapalı olabilir */ }
    }, [])

    // HomePage'de gösterme (panel zaten orada), veri yoksa/kapatıldıysa gösterme.
    if (location.pathname === '/' || dismissed || !weakness) return null

    function dismiss() {
        try { localStorage.setItem(DISMISS_KEY, utcDay()) } catch { /* sessizce geç */ }
        setDismissed(true)
    }

    const label = weakness.pageTitle || routeLabel(weakness.route)
    const days = weakness.daysStruggling

    return (
        <div className="fixed bottom-4 left-4 z-40 max-w-[calc(100vw-2rem)] sm:max-w-sm" data-testid="mentor-nudge">
            <div className={`rounded-2xl border-2 shadow-2xl p-3.5 ${darkMode ? 'border-indigo-600/70 bg-gray-900' : 'border-indigo-300 bg-white'}`}>
                <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0" aria-hidden="true">🧭</span>
                    <div className="min-w-0">
                        <div className={`text-sm font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {isTr ? 'Mentorun seni bekliyor' : 'Your mentor is waiting'}
                        </div>
                        <p className={`mt-0.5 text-xs leading-snug ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {isTr
                                ? `${label} konusunda ${days} gündür takılıyorsun. Ana sayfada sana özel bir plan var.`
                                : `You've been stuck on ${label} for ${days} day${days === 1 ? '' : 's'}. There's a plan for you on the home page.`}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                            <Link
                                to="/"
                                onClick={dismiss}
                                className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold min-h-[36px] ${darkMode ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
                            >
                                → {isTr ? 'Planı gör' : 'See the plan'}
                            </Link>
                            <button
                                onClick={dismiss}
                                className={`rounded-lg px-2.5 py-1.5 text-xs font-bold min-h-[36px] ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {isTr ? 'Şimdi değil' : 'Not now'}
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={dismiss}
                        aria-label={isTr ? 'Kapat' : 'Dismiss'}
                        className={`flex-shrink-0 -mt-1 -mr-1 rounded-lg p-1 text-lg leading-none ${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        ×
                    </button>
                </div>
            </div>
        </div>
    )
}
