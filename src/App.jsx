import { useState, useEffect } from 'react'
import { useLanguage } from './context/LanguageContext'
import BasicElements from './components/BasicElements'
import ComplexInteractions from './components/ComplexInteractions'
import AdvancedScenarios from './components/AdvancedScenarios'
import DataTable from './components/DataTable'
import APISimulation from './components/APISimulation'
import FrameworkComparison from './components/FrameworkComparison'
import LocatorGuide from './components/LocatorGuide'

function App() {
    const { language, t, toggleLanguage } = useLanguage()
    const [activeSection, setActiveSection] = useState('basic')
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        return saved !== null ? JSON.parse(saved) : true
    })

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }, [darkMode])

    const sections = [
        { id: 'basic', name: t('nav.basic') },
        { id: 'locator-guide', name: t('nav.locatorGuide') },
        { id: 'complex', name: t('nav.complex') },
        { id: 'advanced', name: t('nav.advanced') },
        { id: 'table', name: t('nav.table') },
        { id: 'api', name: t('nav.api') },
        { id: 'comparison', name: t('nav.comparison') },
    ]

    const renderSection = () => {
        switch (activeSection) {
            case 'basic':
                return <BasicElements darkMode={darkMode} />
            case 'locator-guide':
                return <LocatorGuide darkMode={darkMode} />
            case 'complex':
                return <ComplexInteractions darkMode={darkMode} />
            case 'advanced':
                return <AdvancedScenarios darkMode={darkMode} />
            case 'table':
                return <DataTable darkMode={darkMode} />
            case 'api':
                return <APISimulation darkMode={darkMode} />
            case 'comparison':
                return <FrameworkComparison darkMode={darkMode} />
            default:
                return <BasicElements darkMode={darkMode} />
        }
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'}`}>
            {/* Header */}
            <header className={`shadow-2xl transition-colors duration-300 sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-indigo-600 to-purple-600'}`}>
                <div className="container mx-auto px-6 py-8">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col items-center gap-2">
                            <a
                                href="https://hasankocaman.net"
                                target="_self"
                                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                            >
                                {t('buttons.backToWebsite')}
                            </a>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                title={t('buttons.homeTooltip')}
                                className={`text-4xl hover:scale-110 transition-transform duration-200 cursor-pointer ${darkMode ? 'hover:text-yellow-400' : 'hover:text-yellow-300'}`}
                            >
                                🏠
                            </button>
                        </div>
                        <div className="flex-1 text-center">
                            <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-white'}`} data-testid="main-title">
                                {t('header.title')}
                            </h1>
                            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-indigo-100'}`}>
                                {t('header.subtitle')}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex bg-white rounded-lg overflow-hidden" data-testid="language-toggle">
                                <button
                                    onClick={() => language === 'tr' && toggleLanguage()}
                                    className={`px-4 py-2 font-semibold transition-all duration-300 ${language === 'en' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                                >
                                    ENG
                                </button>
                                <button
                                    onClick={() => language === 'en' && toggleLanguage()}
                                    className={`px-4 py-2 font-semibold transition-all duration-300 ${language === 'tr' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                                >
                                    TR
                                </button>
                            </div>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                data-testid="dark-mode-toggle"
                                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${darkMode ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                            >
                                {darkMode ? `☀️ ${t('buttons.lightMode')}` : `🌙 ${t('buttons.darkMode')}`}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className={`shadow-md sticky top-0 z-40 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`} data-testid="main-navigation">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap gap-2 justify-center py-4">
                        {/* Cypress Button */}
                        <a
                            href="https://hasankocaman.net/#/teachCypress"
                            className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${darkMode
                                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 hover:scale-102'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                                }`}
                        >
                            {language === 'tr' ? 'Cypress Öğren' : 'Learn Cypress'}
                        </a>

                        {/* Playwright Button */}
                        <a
                            href="https://hasankocaman.github.io/teachPlaywright/"
                            className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${darkMode
                                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 hover:scale-102'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                                }`}
                        >
                            {language === 'tr' ? 'Playwright Öğren' : 'Learn Playwright'}
                        </a>

                        {/* JS/TS Comparison Button */}
                        <a
                            href="https://hasankocaman.github.io/boltJSTScompare/"
                            className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${darkMode
                                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 hover:scale-102'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                                }`}
                        >
                            {language === 'tr' ? 'JavaScript ve TypeScript Karşılaştırma' : 'JavaScript and TypeScript compare'}
                        </a>

                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                data-testid={`nav-${section.id}`}
                                className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${activeSection === section.id
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                                    : darkMode
                                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 hover:scale-102'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                                    }`}
                            >
                                {section.name}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                <div className="animate-fadeIn">
                    {renderSection()}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6 mt-12">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-gray-300" data-testid="footer-text">
                        {t('footer.text')}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                        {t('footer.hint')}
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default App
