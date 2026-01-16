import { createContext, useContext, useState, useEffect } from 'react'
import en from '../locales/en.json'
import tr from '../locales/tr.json'

const LanguageContext = createContext()

const translations = {
    en,
    tr
}

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('language')
        return saved || 'en'
    })

    useEffect(() => {
        localStorage.setItem('language', language)
    }, [language])

    const t = (key) => {
        const keys = key.split('.')
        let value = translations[language]

        for (const k of keys) {
            value = value?.[k]
        }

        return value || key
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
