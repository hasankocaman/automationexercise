import { createContext, useContext, useState, useEffect } from 'react'
import en from '../locales/en.json'
import tr from '../locales/tr.json'
import { localizedPath, stripLocalePrefix } from '../utils/seo'
import { trackEvent } from '../lib/analytics'

const LanguageContext = createContext()

const translations = {
    en,
    tr
}

const getDefaultLanguage = () => {
    const saved = localStorage.getItem('language')
    if (saved === 'tr' || saved === 'en') return saved
    return 'tr'
}

/**
 * `initialLanguage` verildiğinde (main.jsx URL'den türetir) URL dil için TEK
 * OTORİTEDİR — localStorage'a bakılmaz. Prop verilmezse eski davranış korunur
 * (localStorage → 'tr'), böylece bu provider'ı doğrudan saran testler/hikâyeler
 * kırılmaz. Bkz. Documents/seo-phase-2-plan.md §2.2.
 */
export function LanguageProvider({ children, initialLanguage }) {
    const [language, setLanguage] = useState(
        () => (initialLanguage === 'tr' || initialLanguage === 'en' ? initialLanguage : getDefaultLanguage()),
    )

    useEffect(() => {
        localStorage.setItem('language', language)
    }, [language])

    const t = (key, defaultValue) => {
        const getValue = (locale) => {
            const keys = key.split('.')
            let value = translations[locale]

            for (const k of keys) {
                value = value?.[k]
            }

            return value
        }

        return getValue(language) ?? getValue('en') ?? getValue('tr') ?? defaultValue ?? key
    }

    // Dil değişimi artık URL değiştirir: /selenium ⇄ /en/selenium. `basename`
    // mount anında sabitlendiği için router içi geçiş yeterli değil, tam
    // navigasyon gerekiyor (§2.2). localStorage ÖNCE yazılır ki mevcut
    // kalıcılık testleri ve localStorage okuyan kodlar doğru değeri görsün.
    const toggleLanguage = () => {
        const next = language === 'en' ? 'tr' : 'en'

        try {
            localStorage.setItem('language', next)
        } catch { /* localStorage kapalı olabilir */ }

        // SEO Faz 2'nin işe yarayıp yaramadığını ölçmek için kritik olay
        // (Documents/seo-phase-2-plan.md §7.3) — tam sayfa navigasyonundan
        // ÖNCE gönderilir ki event kaybolmasın.
        trackEvent('language_changed', { to: next })

        if (typeof window === 'undefined') {
            setLanguage(next)
            return
        }

        const barePath = stripLocalePrefix(window.location.pathname)
        const target = `${localizedPath(barePath, next)}${window.location.search}${window.location.hash}`
        window.location.assign(target)
    }

    return (
        <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider')
    }
    return context
}
