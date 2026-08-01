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
// Dikkat çekme davranışı (kullanıcı talebi, 2026-07-31): sayfa açılışında
// rozet, kullanıcı İLK KEZ tıklayana kadar yanıp söner (`tooltipGuideAttention`,
// ölçekleme + opaklık pulse'ı); ilk tıklamadan SONRA (o sayfa ziyareti
// boyunca) animasyon kalıcı olarak durur ve rozet normal boyutunda sabit
// kalır — açık/kapalı durumundan bağımsız, bir daha yanıp sönmez.
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

// Parametreleştirme (2026-08-01): bileşen başta TEK bir sabit mesaja (Kavram
// Tooltip'i tanıtımı) gömülüydü. `/sprint` sayfası da "kullanıcı ne yapacağını
// bilmiyor" sorunu yaşayınca İKİNCİ bir maskot yazmak yerine bu bileşen
// props'landı. TÜM props opsiyoneldir ve varsayılanları eski davranışın
// BİREBİR aynısıdır — mevcut 3 giriş sayfası (ve `tooltip-guide-mascot.spec.ts`)
// hiçbir değişiklik görmez.
const DEFAULT_MESSAGE = {
    tr: 'Merhaba! 👋 Sayfada altı noktalı çizgili bir kelime görürsen, bilmediğin bir terim demektir — üstüne gel (mobilde dokun), sana günlük hayattan bir örnekle açıklayayım!',
    en: "Hi there! 👋 If you see a word with a dashed underline on the page, it's a term you might not know — hover over it (tap on mobile) and I'll explain it with an everyday example!",
}

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

export default function TooltipGuideMascot({
    message = DEFAULT_MESSAGE,   // { tr, en } — balonun gövde metni
    emoji = '🦉',                 // rozetteki karakter
    ariaLabel,                   // özel erişilebilirlik etiketi (yoksa varsayılan)
    initiallyOpen = false,       // balon ilk render'da açık gelsin mi
    size = 44,                   // rozet çapı (px), ilk tıklamadan SONRA hep bu boyut
    emphasizedSize = size,       // ilk tıklamaya KADAR rozet çapı — varsayılan = size
                                  // (yani "büyütme yok", mevcut 3 giriş sayfasının
                                  // davranışı BİREBİR korunur; sadece bunu size'dan
                                  // büyük bir değerle geçen sayfa büyütülmüş+küçülen
                                  // rozet davranışını alır — bkz. SprintPage.jsx).
}) {
    const { language } = useLanguage()
    const isTr = language === 'tr'
    const darkMode = useObservedDarkMode()
    const [open, setOpen] = useState(initiallyOpen)
    // Sayfa açılışında dikkat çekmek için yanıp söner (kullanıcı talebi,
    // 2026-07-31); İLK tıklamada (ya da balon zaten açık geldiyse İLK
    // kapatmada — kullanıcı talebi, 2026-08-01) kalıcı olarak durur ve
    // normal boyutuna döner — bir daha (o ziyaret boyunca) animasyon oynamaz.
    // `initiallyOpen`'dan BAĞIMSIZ olarak her zaman false'tan başlar: balon
    // açık gelse bile kullanıcı henüz OKUMADI/etkileşmedi, rozet dikkat
    // çekmeye devam etmeli (bkz. SprintPage.jsx — initiallyOpen açık ama
    // maskot yine de büyük+yanıp sönerek başlamalı).
    const [hasInteracted, setHasInteracted] = useState(false)
    const handleToggle = () => {
        setOpen((v) => !v)
        setHasInteracted(true)
    }
    const handleClose = () => {
        setOpen(false)
        setHasInteracted(true)
    }

    // İlk tıklamaya kadar (henüz "okumadıysa") büyütülmüş boyutta yanıp söner;
    // tıklayıp balonu okuduktan sonra normal boyutuna doğru YUMUŞAKÇA küçülür
    // (`transition`, aşağıdaki `animation` keyframe'inden bağımsız bir CSS
    // özelliği olduğu için ikisi çakışmaz).
    const badgeDiameter = hasInteracted ? size : emphasizedSize
    const badgeFontSize = Math.round(22 * (badgeDiameter / 44))

    const bubbleBg = darkMode ? '#1e1b4b' : '#ffffff'
    const bubbleBorder = darkMode ? '#4f46e5' : '#818cf8'
    const bubbleText = darkMode ? '#e0e7ff' : '#312e81'

    return (
        <div
            data-testid="tooltip-guide-mascot"
            style={{ position: 'fixed', top: '50%', left: '14px', transform: 'translateY(-50%)', zIndex: 900, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}
        >
            {/* Keyframes HER ZAMAN mevcut olmalı — rozet, balon hiç açılmadan
                ÖNCE (kapalıyken) zaten yanıp sönmeye başlar; tanım balonun
                içine gömülseydi ilk açılışa kadar animasyon çalışmazdı. */}
            <style>{`
                @keyframes tooltipGuidePop { from { opacity: 0; transform: translateY(6px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes tooltipGuideAttention {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.22); opacity: 0.55; }
                }
            `}</style>

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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                        <strong style={{ fontSize: 12.5, color: darkMode ? '#a5b4fc' : '#4f46e5' }}>
                            {isTr ? '💡 Rehber' : '💡 Guide'}
                        </strong>
                        <button
                            type="button"
                            onClick={handleClose}
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
                    {isTr ? message.tr : message.en}
                </div>
            )}

            <button
                type="button"
                onClick={handleToggle}
                aria-expanded={open}
                aria-label={ariaLabel ?? (isTr ? 'Rehber karakteri — Kavram Tooltip\'i hakkında ipucu' : 'Guide character — tip about the Concept Tooltip')}
                data-testid="tooltip-guide-badge"
                style={{
                    minHeight: badgeDiameter, minWidth: badgeDiameter, width: badgeDiameter, height: badgeDiameter,
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: darkMode ? '#312e81' : '#eef2ff',
                    border: `2px solid ${darkMode ? '#6366f1' : '#818cf8'}`,
                    boxShadow: darkMode ? '0 4px 16px rgba(79,70,229,0.5)' : '0 4px 16px rgba(99,102,241,0.35)',
                    cursor: 'pointer', fontSize: badgeFontSize,
                    transition: 'width 0.35s ease, height 0.35s ease, min-width 0.35s ease, min-height 0.35s ease, font-size 0.35s ease',
                    // İlk tıklamaya kadar dikkat çekmek için yanıp söner; bir kez
                    // etkileşim alınca kalıcı olarak durur ve normal boyutuna döner.
                    animation: hasInteracted ? 'none' : 'tooltipGuideAttention 1.1s ease-in-out infinite',
                }}
            >
                {emoji}
            </button>
        </div>
    )
}
