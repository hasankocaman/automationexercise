import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import ZoomControls from './ZoomControls'
import BasicElements from './BasicElements'
import ComplexInteractions from './ComplexInteractions'
import AdvancedScenarios from './AdvancedScenarios'
import DataTable from './DataTable'
import APISimulation from './APISimulation'
import FrameworkComparison from './FrameworkComparison'
import LocatorGuide from './LocatorGuide'
import Practice from './Practice'
import PlaywrightLangCompare from './PlaywrightLangCompare'

function HomePage() {
    const { language, t, toggleLanguage } = useLanguage()
    const navigate = useNavigate()
    const [activeSection, setActiveSection] = useState('basic')
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        return saved !== null ? JSON.parse(saved) : true
    })

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }, [darkMode])

    const sections = [
        { id: 'basic',        name: t('nav.basic'),       shortName: language === 'tr' ? '📝 Temel'   : '📝 Basic' },
        { id: 'locator-guide',name: t('nav.locatorGuide'),shortName: '🎯 Locator' },
        { id: 'complex',      name: t('nav.complex'),     shortName: language === 'tr' ? '🎯 Karmaşık': '🎯 Complex' },
        { id: 'advanced',     name: t('nav.advanced'),    shortName: language === 'tr' ? '🚀 Gelişmiş': '🚀 Advanced' },
        { id: 'table',        name: t('nav.table'),       shortName: language === 'tr' ? '📊 Tablo'   : '📊 Table' },
        { id: 'api',          name: t('nav.api'),         shortName: '🌐 API' },
        { id: 'comparison',   name: t('nav.comparison'),  shortName: language === 'tr' ? '🔍 Araçlar' : '🔍 Tools' },
        { id: 'lang-compare', name: language === 'tr' ? '🔀 3 Dil Karşılaştır' : '🔀 3-Language Compare', shortName: language === 'tr' ? '🔀 3 Dil' : '🔀 3 Lang' },
        { id: 'practice',     name: t('nav.practice') || '🛠️ Uygulama Bahçesi', shortName: language === 'tr' ? '🛠️ Pratik' : '🛠️ Practice' },
    ]

    const renderSection = () => {
        switch (activeSection) {
            case 'basic':         return <BasicElements darkMode={darkMode} />
            case 'locator-guide': return <LocatorGuide darkMode={darkMode} />
            case 'complex':       return <ComplexInteractions darkMode={darkMode} />
            case 'advanced':      return <AdvancedScenarios darkMode={darkMode} />
            case 'table':         return <DataTable darkMode={darkMode} />
            case 'api':           return <APISimulation darkMode={darkMode} />
            case 'comparison':    return <FrameworkComparison darkMode={darkMode} />
            case 'lang-compare':  return <PlaywrightLangCompare darkMode={darkMode} />
            case 'practice':      return <Practice darkMode={darkMode} onHomeClick={() => setActiveSection('basic')} />
            default:              return <BasicElements darkMode={darkMode} />
        }
    }

    // Category label badge
    const CatLabel = ({ emoji, text }) => (
        <span className={`inline-flex items-center gap-1 text-xs font-bold whitespace-nowrap select-none px-2 py-1 rounded-md mr-0.5 ${
            darkMode ? 'text-gray-400 bg-gray-700/50' : 'text-gray-500 bg-gray-100'
        }`}>
            {emoji} {text}
        </span>
    )

    // Colored nav button class generator
    const nb = (color) => {
        const palettes = {
            yellow:  darkMode ? 'text-yellow-300 hover:bg-yellow-900/70 hover:text-yellow-100 hover:border-yellow-700' : 'text-yellow-700 hover:bg-yellow-100 hover:border-yellow-300',
            indigo:  darkMode ? 'text-indigo-300 hover:bg-indigo-900/70 hover:text-indigo-100 hover:border-indigo-700' : 'text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300',
            blue:    darkMode ? 'text-blue-300 hover:bg-blue-900/70 hover:text-blue-100 hover:border-blue-700'         : 'text-blue-700 hover:bg-blue-100 hover:border-blue-300',
            purple:  darkMode ? 'text-purple-300 hover:bg-purple-900/70 hover:text-purple-100 hover:border-purple-700' : 'text-purple-700 hover:bg-purple-100 hover:border-purple-300',
            emerald: darkMode ? 'text-emerald-300 hover:bg-emerald-900/70 hover:text-emerald-100 hover:border-emerald-700' : 'text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300',
            green:   darkMode ? 'text-green-300 hover:bg-green-900/70 hover:text-green-100 hover:border-green-700'     : 'text-green-700 hover:bg-green-100 hover:border-green-300',
            orange:  darkMode ? 'text-orange-300 hover:bg-orange-900/70 hover:text-orange-100 hover:border-orange-700' : 'text-orange-700 hover:bg-orange-100 hover:border-orange-300',
            cyan:    darkMode ? 'text-cyan-300 hover:bg-cyan-900/70 hover:text-cyan-100 hover:border-cyan-700'         : 'text-cyan-700 hover:bg-cyan-100 hover:border-cyan-300',
            violet:  darkMode ? 'text-violet-300 hover:bg-violet-900/70 hover:text-violet-100 hover:border-violet-700' : 'text-violet-700 hover:bg-violet-100 hover:border-violet-300',
        }
        return `px-2 py-1.5 md:px-4 md:py-2 rounded-lg font-semibold text-xs md:text-sm whitespace-nowrap
            transition-all duration-200 hover:scale-105 hover:shadow-md border
            ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}
            ${palettes[color] || ''}`
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'}`}>

            {/* Header */}
            <header className={`shadow-2xl transition-colors duration-300 sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-indigo-600 to-purple-600'}`}>
                <div className="container mx-auto px-3 py-3 md:px-6 md:py-6">
                    <div className="flex justify-between items-center gap-2">
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            title={t('buttons.homeTooltip')}
                            className={`text-2xl md:text-4xl hover:scale-110 transition-transform duration-200 cursor-pointer flex-shrink-0 ${darkMode ? 'hover:text-yellow-400' : 'hover:text-yellow-300'}`}
                        >
                            🏠
                        </button>
                        <div className="flex-1 text-center min-w-0">
                            <h1 className="text-lg sm:text-2xl md:text-4xl font-bold leading-tight text-white" data-testid="main-title">
                                {t('header.title')}
                            </h1>
                            <p className={`text-xs md:text-lg hidden sm:block mt-0.5 ${darkMode ? 'text-gray-300' : 'text-indigo-100'}`}>
                                {t('header.subtitle')}
                            </p>
                        </div>
                        <div className="flex gap-1.5 md:gap-3 flex-shrink-0 items-center">
                            <div className="flex bg-white rounded-lg overflow-hidden" data-testid="language-toggle">
                                <button
                                    onClick={() => language === 'tr' && toggleLanguage()}
                                    className={`px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-semibold transition-all duration-300 ${language === 'en' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                                >
                                    ENG
                                </button>
                                <button
                                    onClick={() => language === 'en' && toggleLanguage()}
                                    className={`px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-semibold transition-all duration-300 ${language === 'tr' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                                >
                                    TR
                                </button>
                            </div>
                            <ZoomControls darkMode={darkMode} />
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                data-testid="dark-mode-toggle"
                                className={`px-2 md:px-4 py-1 md:py-2 rounded-lg font-semibold text-xs md:text-sm transition-all duration-300 ${darkMode ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                            >
                                {darkMode ? '☀️ ' : '🌙 '}
                                <span className="hidden md:inline">{darkMode ? t('buttons.lightMode') : t('buttons.darkMode')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation — Categorized */}
            <nav
                className={`shadow-md transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-white border-b border-gray-200'}`}
                data-testid="main-navigation"
            >
                <div className="container mx-auto px-2 md:px-6 py-2 md:py-3 space-y-1.5 md:space-y-2">

                    {/* 1. Programlama Dilleri */}
                    <div className="flex flex-wrap gap-1 md:gap-1.5 items-center">
                        <CatLabel emoji="🐍" text={language === 'tr' ? 'Diller' : 'Languages'} />
                        <button onClick={() => navigate('/java')} data-testid="nav-java" className={nb('orange')}>
                            <span className="sm:hidden">☕ Java</span>
                            <span className="hidden sm:inline">{language === 'tr' ? '☕ Java Öğren' : '☕ Learn Java'}</span>
                        </button>
                        <button onClick={() => navigate('/python')} data-testid="nav-python" className={nb('yellow')}>
                            <span className="sm:hidden">🐍 Python</span>
                            <span className="hidden sm:inline">{t('python.navButton')}</span>
                        </button>
                        <button onClick={() => navigate('/typescript')} data-testid="nav-typescript" className={nb('indigo')}>
                            <span className="sm:hidden">💻 TS</span>
                            <span className="hidden sm:inline">{t('typescript.navButton')}</span>
                        </button>
                        <a href="https://hasankocaman.github.io/boltJSTScompare/" className={nb('blue')}>
                            <span className="sm:hidden">JS↔TS</span>
                            <span className="hidden sm:inline">{language === 'tr' ? 'JavaScript ve TypeScript Karşılaştırma' : 'JS vs TypeScript'}</span>
                        </a>
                    </div>

                    {/* 2. Test Otomasyon Araçları */}
                    <div className="flex flex-wrap gap-1 md:gap-1.5 items-center">
                        <CatLabel emoji="🧪" text={language === 'tr' ? 'Test Araçları' : 'Test Tools'} />
                        <a href="https://hasankocaman.github.io/teach-Cypress/" className={nb('purple')}>
                            <span className="sm:hidden">Cypress</span>
                            <span className="hidden sm:inline">{language === 'tr' ? 'Cypress Öğren' : 'Learn Cypress'}</span>
                        </a>
                        <button onClick={() => navigate('/playwright')} className={nb('purple')}>
                            <span className="sm:hidden">Playwright</span>
                            <span className="hidden sm:inline">{language === 'tr' ? 'Playwright Öğren' : 'Learn Playwright'}</span>
                        </button>
                        <button onClick={() => navigate('/rest-assured')} data-testid="nav-rest-assured" className={nb('emerald')}>
                            <span className="sm:hidden">🧪 REST</span>
                            <span className="hidden sm:inline">{language === 'tr' ? '🧪 REST Assured Öğren' : '🧪 Learn REST Assured'}</span>
                        </button>
                        <button onClick={() => navigate('/appium')} data-testid="nav-appium" className={nb('green')}>
                            <span className="sm:hidden">📱 Appium</span>
                            <span className="hidden sm:inline">{language === 'tr' ? '📱 Appium Öğren' : '📱 Learn Appium'}</span>
                        </button>
                        <button onClick={() => navigate('/selenium')} data-testid="nav-selenium" className={nb('emerald')}>
                            <span className="sm:hidden">🟢 Selenium</span>
                            <span className="hidden sm:inline">{language === 'tr' ? '🟢 Selenium Öğren' : '🟢 Learn Selenium'}</span>
                        </button>
                        <button onClick={() => navigate('/browserstack')} data-testid="nav-browserstack" className={nb('orange')}>
                            <span className="sm:hidden">☁️ BS</span>
                            <span className="hidden sm:inline">{language === 'tr' ? '☁️ BrowserStack Öğren' : '☁️ Learn BrowserStack'}</span>
                        </button>
                    </div>

                    {/* 3. Performans & API */}
                    <div className="flex flex-wrap gap-1 md:gap-1.5 items-center">
                        <CatLabel emoji="⚡" text={language === 'tr' ? 'Performans & API' : 'Performance & API'} />
                        <button onClick={() => navigate('/jmeter')} data-testid="nav-jmeter" className={nb('orange')}>
                            {t('jmeter.navButton')}
                        </button>
                        <button onClick={() => navigate('/postman')} data-testid="nav-postman" className={nb('orange')}>
                            <span className="sm:hidden">📮 Postman</span>
                            <span className="hidden sm:inline">{language === 'tr' ? '📮 Postman Öğren' : '📮 Learn Postman'}</span>
                        </button>
                    </div>

                    {/* 4. DevOps & Altyapı */}
                    <div className="flex flex-wrap gap-1 md:gap-1.5 items-center">
                        <CatLabel emoji="🛠️" text="DevOps" />
                        <button onClick={() => navigate('/docker')} data-testid="nav-docker" className={nb('cyan')}>
                            <span className="sm:hidden">🐳 Docker</span>
                            <span className="hidden sm:inline">{language === 'tr' ? '🐳 Docker Öğren' : '🐳 Learn Docker'}</span>
                        </button>
                        <button onClick={() => navigate('/jenkins')} data-testid="nav-jenkins" className={nb('blue')}>
                            <span className="sm:hidden">🔧 Jenkins</span>
                            <span className="hidden sm:inline">{language === 'tr' ? '🔧 Jenkins Öğren' : '🔧 Learn Jenkins'}</span>
                        </button>
                        <button onClick={() => navigate('/kubernetes')} data-testid="nav-kubernetes" className={nb('violet')}>
                            <span className="sm:hidden">☸️ K8s</span>
                            <span className="hidden sm:inline">{language === 'tr' ? '☸️ Kubernetes Öğren' : '☸️ Learn Kubernetes'}</span>
                        </button>
                        <button onClick={() => navigate('/kafka')} data-testid="nav-kafka" className={nb('orange')}>
                            <span className="sm:hidden">🟠 Kafka</span>
                            <span className="hidden sm:inline">{language === 'tr' ? '🟠 Kafka Öğren' : '🟠 Learn Kafka'}</span>
                        </button>
                        <button onClick={() => navigate('/aws')} data-testid="nav-aws" className={nb('orange')}>
                            <span className="sm:hidden">☁️ AWS</span>
                            <span className="hidden sm:inline">{language === 'tr' ? '☁️ AWS Öğren' : '☁️ Learn AWS'}</span>
                        </button>
                        <button onClick={() => navigate('/azure')} data-testid="nav-azure" className={nb('blue')}>
                            <span className="sm:hidden">🔷 Azure</span>
                            <span className="hidden sm:inline">{language === 'tr' ? '🔷 Azure Öğren' : '🔷 Learn Azure'}</span>
                        </button>
                    </div>

                    {/* 5. Veritabanı */}
                    <div className="flex flex-wrap gap-1 md:gap-1.5 items-center">
                        <CatLabel emoji="🗄️" text={language === 'tr' ? 'Veritabanı' : 'Database'} />
                        <button onClick={() => navigate('/sql')} data-testid="nav-sql" className={nb('blue')}>
                            {t('sql.navButton')}
                        </button>
                    </div>

                    {/* 6. Pratik Alan */}
                    <div className="flex flex-wrap gap-1 md:gap-1.5 items-center">
                        <CatLabel emoji="🎯" text={language === 'tr' ? 'Pratik Alan' : 'Practice'} />
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                data-testid={`nav-${section.id}`}
                                className={`px-2 py-1.5 md:px-4 md:py-2 rounded-lg font-semibold text-xs md:text-sm whitespace-nowrap border
                                    transition-all duration-200 hover:scale-105 hover:shadow-md ${
                                    activeSection === section.id
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105 border-transparent'
                                        : darkMode
                                            ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-indigo-900/70 hover:text-indigo-100 hover:border-indigo-700'
                                            : 'bg-white border-gray-200 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 hover:border-indigo-300'
                                    }`}
                            >
                                <span className="sm:hidden">{section.shortName}</span>
                                <span className="hidden sm:inline">{section.name}</span>
                            </button>
                        ))}
                    </div>

                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-3 py-4 md:px-6 md:py-8">
                <div className="animate-fadeIn">
                    {renderSection()}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6 mt-8 md:mt-12">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <p className="text-gray-300" data-testid="footer-text">
                        {t('footer.text')}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                        {t('footer.hint')}
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                        <span className="text-gray-400">{t('buttons.preparedBy')}</span>
                        <a
                            href="https://www.linkedin.com/in/hasankocaman/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            Hasan Kocaman
                        </a>
                    </div>
                </div>
            </footer>

            {/* Fixed LinkedIn Badge */}
            <a
                href="https://www.linkedin.com/in/hasankocaman/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="fixed bottom-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full shadow-lg text-xs font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ background: '#0A66C2', color: '#fff' }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                <span>{t('buttons.preparedBy')}&nbsp;</span>
                <span>Hasan Kocaman</span>
            </a>

            {/* Fixed Home Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title={t('buttons.homeTooltip') || 'Başa dön'}
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

export default HomePage
