import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

// TooltipGuideMascot — Kavram Tooltip'i (challenge-first-experience-plan.md
// §3.6) özelliğini yeni başlayan kullanıcıya tanıtan sevimli bir rehber
// karakter (CLAUDE.md §20 "Disney/Pixar Modu" ruhu). Kullanıcı kararı
// (2026-07-31): sabit köşede durur (scroll'u TAKİP ETMEZ — OnboardingTour'un
// "spotlight yerine sabit kart" mühendislik kararıyla aynı gerekçe, düşük
// risk/karmaşıklık), HER ziyarette küçük bir rozet olarak görünür kalır
// (localStorage ile bir daha gösterme mantığı YOK), tıklanınca bir konuşma
// balonu açılır. Kapsam: sadece 3 giriş sayfası (/what-is-testing,
// /manual-testing, /algorithms) — bu sayfaların KENDİ wrapper component'ine
// eklenir, TopicPage.jsx'e DOKUNULMAZ (TopicPage onlarca sayfada paylaşılır).
//
// Self-contained: darkMode'u kendi algılar (document.documentElement'teki
// 'dark-mode' class'ını izler — TopicPage/AlgorithmsPage'in zaten yazdığı
// class, salt-okunur gözlemlenir, İKİNCİ bir state yöneticisi YAZILMAZ).
//
// Konum notu (2026-07-31, gerçek tarayıcı testiyle bulundu): İlk sürüm sol-alt
// köşedeydi ama App.jsx'te GLOBAL render edilen ChatWidget (`fixed bottom-20
// left-4 z-[999]`) ile aynı sütunda sadece 20px arayla duruyordu — konuşma
// balonu AÇILINCA ChatWidget'ın üstüne biniyordu. Sol kenar DİKEY-ORTA konuma
// taşındı: tüm köşe-yığılan widget'lardan (ChatWidget sol-alt, CommentsWidget
// sağ-alt, 🏠/📍 sağ-alt — TopicPage.jsx) tamamen bağımsız, çakışma riski yok.

function useObservedDarkMode() {
    const [darkMode, setDarkMode] = useState(() =>
        typeof document !== 'undefined' && document.documentElement.classList.contains('dark-mode')
    )
    useEffect(() => {
        const el = document.documentElement
        const observer = new MutationObserver(() => setDarkMode(el.classList.contains('dark-mode')))
        observer.observe(el, { attributes: true, attributeFilter: ['class'] })
        return () => observer.disconnect()
    }, [])
    return darkMode
}

export default function TooltipGuideMascot() {
    const { language } = useLanguage()
    const isTr = language === 'tr'
    const darkMode = useObservedDarkMode()
    const [open, setOpen] = useState(false)

    const bubbleBg = darkMode ? '#1e1b4b' : '#ffffff'
    const bubbleBorder = darkMode ? '#4f46e5' : '#818cf8'
    const bubbleText = darkMode ? '#e0e7ff' : '#312e81'

    return (
        <div
            data-testid="tooltip-guide-mascot"
            style={{ position: 'fixed', top: '50%', left: '14px', transform: 'translateY(-50%)', zIndex: 900, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}
        >
            {open && (
                <div
                    data-testid="tooltip-guide-bubble"
                    role="status"
                    style={{
                        maxWidth: 'min(300px, 78vw)', background: bubbleBg, color: bubbleText,
                        border: `2px solid ${bubbleBorder}`, borderRadius: '16px 16px 16px 4px',
                        padding: '14px 16px', boxShadow: darkMode ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(49,46,129,0.18)',
                        fontSize: 13.5, lineHeight: 1.55, animation: 'tooltipGuidePop 0.25s ease-out',
                    }}
                >
                    <style>{`
                        @keyframes tooltipGuidePop { from { opacity: 0; transform: translateY(6px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
                        @keyframes tooltipGuideBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
                    `}</style>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                        <strong style={{ fontSize: 12.5, color: darkMode ? '#a5b4fc' : '#4f46e5' }}>
                            {isTr ? '💡 Rehber' : '💡 Guide'}
                        </strong>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label={isTr ? 'Kapat' : 'Close'}
                            data-testid="tooltip-guide-close"
                            style={{
                                minHeight: 24, minWidth: 24, border: 'none', background: 'transparent',
                                color: bubbleText, opacity: 0.6, cursor: 'pointer', fontSize: 14, lineHeight: 1,
                            }}
                        >
                            ✕
                        </button>
                    </div>
                    {isTr
                        ? 'Merhaba! 👋 Sayfada altı noktalı çizgili bir kelime görürsen, bilmediğin bir terim demektir — üstüne gel (mobilde dokun), sana günlük hayattan bir örnekle açıklayayım!'
                        : "Hi there! 👋 If you see a word with a dashed underline on the page, it's a term you might not know — hover over it (tap on mobile) and I'll explain it with an everyday example!"}
                </div>
            )}

            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={isTr ? 'Rehber karakteri — Kavram Tooltip\'i hakkında ipucu' : 'Guide character — tip about the Concept Tooltip'}
                data-testid="tooltip-guide-badge"
                style={{
                    minHeight: 44, minWidth: 44, width: 44, height: 44, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: darkMode ? '#312e81' : '#eef2ff',
                    border: `2px solid ${darkMode ? '#6366f1' : '#818cf8'}`,
                    boxShadow: darkMode ? '0 4px 16px rgba(79,70,229,0.5)' : '0 4px 16px rgba(99,102,241,0.35)',
                    cursor: 'pointer', fontSize: 22, animation: open ? 'none' : 'tooltipGuideBounce 2.4s ease-in-out infinite',
                }}
            >
                🦉
            </button>
        </div>
    )
}
