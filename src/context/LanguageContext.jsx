import { createContext, useContext, useState, useEffect } from 'react'
import en from '../locales/en.json'
import tr from '../locales/tr.json'

const LanguageContext = createContext()

const translations = {
    en,
    tr
}

const getDefaultLanguage = () => {
    const saved = localStorage.getItem('language')
    if (saved === 'tr' || saved === 'en') return saved
    if (typeof navigator !== 'undefined') {
        return navigator.language?.startsWith('tr') ? 'tr' : 'en'
    }
    return 'en'
}

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(getDefaultLanguage)

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

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'tr' : 'en')
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
