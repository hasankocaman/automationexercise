import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FrameworkComparison from './FrameworkComparison'
import PlaywrightLangCompare from './PlaywrightLangCompare'
import PythonFrameworksTab from './PythonFrameworksTab'
import { useLanguage } from '../context/LanguageContext'

function ScrollProgressBar() {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const update = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement
            const pct = (scrollTop / (scrollHeight - clientHeight)) * 100
            setProgress(Math.min(100, Math.max(0, pct)))
        }
        window.addEventListener('scroll', update, { passive: true })
        return () => window.removeEventListener('scroll', update)
    }, [])
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'transparent', zIndex: 9999 }}>
            <div style={{
                height: '100%', width: `${progress}%`,
                background: 'linear-gradient(90deg, #7c3aed, #10b981)',
                transition: 'width 0.1s linear',
            }} />
        </div>
    )
}

function TestFrameworksPage() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        const isDark = saved !== null ? JSON.parse(saved) : true
        if (isDark) {
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('light-mode-forced')
        } else {
            document.documentElement.classList.remove('dark-mode')
            document.documentElement.classList.add('light-mode-forced')
        }
        return isDark
    })
    const [activeSection, setActiveSection] = useState(0)
    const { language, toggleLanguage } = useLanguage()
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        window.scrollTo(0, 0)
        if (darkMode) {
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('light-mode-forced')
        } else {
            document.documentElement.classList.remove('dark-mode')
            document.documentElement.classList.add('light-mode-forced')
        }
    }, [darkMode])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [activeSection])

    const sections = [
        { emoji: '🔍', label: 'Framework Karşılaştırma', labelEn: 'Framework Comparison' },
        { emoji: '🎭', label: 'Playwright Dil Karşılaştırma', labelEn: 'Playwright Language Compare' },
        { emoji: '🐍', label: 'Python Frameworks', labelEn: 'Python Frameworks' },
    ]

    const gradient = 'from-purple-600 to-indigo-600'

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50'}`}>
            <ScrollProgressBar />

            {/* Header */}
            <header className={`sticky top-0 z-50 shadow-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white border-b border-gray-200'}`}>
                <div className="container mx-auto px-3 py-3 md:px-6 md:py-4 flex justify-between items-center flex-wrap gap-2">
                    <button
                        onClick={() => navigate('/python')}
                        className={`flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 rounded-lg font-semibold text-sm transition-all hover:scale-105 ${darkMode
                            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                            : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                        }`}
                    >
                        ← <span className="hidden sm:inline">{language === 'tr' ? 'Python Sayfasına Dön' : 'Back to Python'}</span>
                        <span className="sm:hidden">Python</span>
                    </button>

                    <h1 className={`text-base md:text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        🧪 Test Frameworks
                    </h1>

                    <div className="flex gap-2">
                        <div data-testid="language-toggle" className={`flex rounded-lg overflow-hidden border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                            <button
                                onClick={() => language === 'tr' && toggleLanguage()}
                                className={`px-3 py-1.5 text-sm font-semibold transition-all ${language === 'en'
                                    ? 'bg-indigo-600 text-white'
                                    : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                            >
                                ENG
                            </button>
                            <button
                                onClick={() => language === 'en' && toggleLanguage()}
                                className={`px-3 py-1.5 text-sm font-semibold transition-all ${language === 'tr'
                                    ? 'bg-indigo-600 text-white'
                                    : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                            >
                                TR
                            </button>
                        </div>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${darkMode
                                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
                                : 'bg-gray-800 text-white hover:bg-gray-700'
                            }`}
                        >
                            <span className="hidden md:inline">{darkMode ? '☀️ Light' : '🌙 Dark'}</span>
                            <span className="md:hidden">{darkMode ? '☀️' : '🌙'}</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <div className="container mx-auto px-3 py-4 md:px-4 md:py-6 max-w-7xl">
                <div className={`rounded-xl md:rounded-2xl p-4 md:p-8 mb-4 md:mb-6 bg-gradient-to-r ${gradient} text-white shadow-xl`}>
                    <h1 className="text-xl md:text-4xl font-bold mb-1 md:mb-2">🧪 Test Frameworks</h1>
                    <p className="text-sm md:text-xl opacity-90">
                        {language === 'tr' ? 'pytest · Selenium · Playwright karşılaştırması' : 'pytest · Selenium · Playwright comparison'}
                    </p>
                    <p className="mt-2 opacity-80 max-w-3xl text-xs md:text-sm leading-relaxed hidden sm:block">
                        {language === 'tr'
                            ? 'Hangi framework ne zaman kullanılır? Java karşılaştırmaları, Playwright dil karşılaştırması ve detaylı özellik tabloları.'
                            : 'Which framework to use when? Java comparisons, Playwright language comparison, and detailed feature tables.'}
                    </p>
                </div>

                {/* Sidebar + Content layout */}
                <div className="flex gap-3 md:gap-5 items-start">

                    {/* Vertical Sidebar */}
                    <div className={`flex-shrink-0 w-10 md:w-56 self-start sticky top-16 rounded-xl p-1 md:p-2 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                        <div className="flex flex-col gap-0.5 md:gap-1">
                            {sections.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveSection(i)}
                                    title={language === 'tr' ? s.label : s.labelEn}
                                    className={`w-full text-left rounded-lg font-semibold transition-all duration-200 ${activeSection === i
                                        ? `bg-gradient-to-r ${gradient} text-white shadow-md`
                                        : darkMode
                                            ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                                            : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                                        } px-1.5 py-2 md:px-3 md:py-2.5`}
                                >
                                    {/* Mobile: emoji only */}
                                    <span className="md:hidden text-base text-center block leading-none">{s.emoji}</span>
                                    {/* Desktop: full label */}
                                    <span className="hidden md:block text-xs leading-snug">
                                        {s.emoji} {language === 'tr' ? s.label : s.labelEn}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <div className={`rounded-2xl p-4 md:p-8 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                {sections[activeSection].emoji}{' '}
                                {language === 'tr' ? sections[activeSection].label : sections[activeSection].labelEn}
                            </h2>
                            {activeSection === 0 && <FrameworkComparison darkMode={darkMode} />}
                            {activeSection === 1 && <PlaywrightLangCompare darkMode={darkMode} />}
                            {activeSection === 2 && <PythonFrameworksTab darkMode={darkMode} language={language} />}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-between mt-4 md:mt-6 gap-4">
                            {activeSection > 0 && (
                                <button
                                    data-testid="tab-nav-prev"
                                    onClick={() => setActiveSection(activeSection - 1)}
                                    className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                                >
                                    ← {sections[activeSection - 1].emoji} {language === 'tr' ? sections[activeSection - 1].label : sections[activeSection - 1].labelEn}
                                </button>
                            )}
                            {activeSection < sections.length - 1 && (
                                <button
                                    data-testid="tab-nav-next"
                                    onClick={() => setActiveSection(activeSection + 1)}
                                    className={`ml-auto flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all bg-gradient-to-r ${gradient} text-white hover:shadow-lg`}
                                >
                                    {sections[activeSection + 1].emoji} {language === 'tr' ? sections[activeSection + 1].label : sections[activeSection + 1].labelEn} →
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Home button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title="Başa dön / Back to top"
                style={{
                    position: 'fixed', bottom: '16px', right: '16px',
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: '#7c3aed', color: '#fff', border: 'none',
                    cursor: 'pointer', fontSize: '22px', zIndex: 999,
                    boxShadow: '0 4px 16px rgba(124,58,237,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(124,58,237,0.7)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,58,237,0.5)' }}
            >
                🏠
            </button>
        </div>
    )
}

export default TestFrameworksPage
