// src/components/OnboardingTour.jsx
// İlk ziyaretçi için 3 adımlık, ENGELLEMEYEN hoş geldin turu
// (retention-and-motivation-plan.md §6.4 Aşama E.3). Tam ekran modal DEĞİL —
// küçük, dismissible bir kart; arkadaki sayfa her zaman görünür ve
// etkileşilebilir kalır (CLAUDE.md §20 "büyüleyici ama pürüzsüz" ilkesi —
// akışı KESMEZ). Dış kütüphane yok (CLAUDE.md §8) — saf state + CSS.
//
// Bilinçli kapsam kararı: adım adım belirli DOM elemanlarına işaret eden
// bir "spotlight" (ör. react-joyride tarzı) YAZILMADI — bu, header/banner
// elemanlarına ref geçirmeyi ve responsive pozisyon hesaplamayı gerektirir,
// düşük öncelikli bir "hoş geldin" özelliği için orantısız bir mühendislik
// maliyeti olurdu (CLAUDE.md "ihtiyaç duyulmayan soyutlama ekleme"
// ilkesi). Bunun yerine sabit konumlu, kendi içinde adımlanan tek bir kart
// kullanılır — aynı pedagojik mesajı taşır, çok daha düşük risklidir.
import { useState } from 'react'

const STEPS = [
    {
        emoji: '🧭',
        title: { tr: 'LearnQA.dev\'e hoş geldin!', en: 'Welcome to LearnQA.dev!' },
        body: {
            tr: 'Python, Selenium, Playwright gibi QA otomasyon araçlarını interaktif alıştırmalarla, sıfırdan öğrenebileceğin bir platform.',
            en: 'A platform where you can learn QA automation tools like Python, Selenium, and Playwright from scratch through interactive exercises.',
        },
    },
    {
        emoji: '🗺️',
        title: { tr: 'Nasıl ilerleyeceksin?', en: 'How will you progress?' },
        body: {
            tr: 'Kişisel kariyer haritanı oluştur — sana özel, süre tahminli bir öğrenme yolu çizelim.',
            en: 'Build your personal career map — we\'ll chart a learning path tailored to you, with time estimates.',
        },
    },
    {
        emoji: '🚀',
        title: { tr: 'İlk ne yapmalısın?', en: 'What should you do first?' },
        body: {
            tr: 'Yukarıdaki "👋 Yeni misin?" kartına tıkla, 4 kısa soruyla haritan hazır olsun.',
            en: 'Tap the "👋 New Here?" card above — 4 quick questions and your map is ready.',
        },
    },
]

function OnboardingTour({ darkMode, language, onDone }) {
    const isTr = language === 'tr'
    const [step, setStep] = useState(0)
    const isLast = step === STEPS.length - 1
    const current = STEPS[step]

    return (
        <div
            data-testid="onboarding-tour"
            // role="region" (not "dialog"): bu bileşen focus-trap yapmaz, engellemez —
            // "dialog" semantiği yanıltıcı olurdu. Ayrıca index.css'teki
            // `[role="dialog"] { transform: none !important }` kuralı (modallardaki
            // hover-scale sızıntısını önlemek için) top-center konumlama transform'unu
            // (-translate-x-1/2) ezerdi — "region" bu çakışmayı da bypass eder.
            role="region"
            aria-label={isTr ? 'Hoş geldin turu' : 'Welcome tour'}
            className={`fixed top-16 left-1/2 z-[150] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border-2 p-4 shadow-2xl md:top-20 ${
                darkMode ? 'border-indigo-700/60 bg-gray-800' : 'border-indigo-300 bg-white'
            }`}
        >
            <div className="flex items-start gap-3">
                <span className="flex-shrink-0 text-2xl" aria-hidden="true">{current.emoji}</span>
                <div className="min-w-0 flex-1">
                    <h2 className={`text-sm font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {isTr ? current.title.tr : current.title.en}
                    </h2>
                    <p className={`mt-1 text-xs leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? current.body.tr : current.body.en}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onDone}
                    data-testid="onboarding-close"
                    aria-label={isTr ? 'Turu kapat' : 'Close tour'}
                    className={`min-h-[36px] min-w-[36px] flex-shrink-0 rounded-lg text-sm ${darkMode ? 'text-gray-500 hover:bg-gray-700 hover:text-gray-300' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}
                >
                    ✕
                </button>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                    {STEPS.map((s, i) => (
                        <span
                            key={s.title.en}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-4' : 'w-1.5'} ${
                                i === step
                                    ? darkMode ? 'bg-indigo-400' : 'bg-indigo-600'
                                    : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    {!isLast && (
                        <button
                            type="button"
                            onClick={onDone}
                            data-testid="onboarding-skip"
                            className={`min-h-[36px] rounded-lg px-2.5 text-xs font-bold ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {isTr ? 'Geç' : 'Skip'}
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => (isLast ? onDone() : setStep((s) => s + 1))}
                        data-testid="onboarding-next"
                        className={`min-h-[36px] rounded-lg px-3 text-xs font-bold text-white shadow ${darkMode ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                        {isLast ? (isTr ? 'Başlayalım →' : "Let's start →") : (isTr ? 'İleri' : 'Next')}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OnboardingTour
