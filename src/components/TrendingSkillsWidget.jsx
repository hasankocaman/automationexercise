import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

// LLM'in ürettiği serbest metin skill isimleri route'larla otomatik eşlenmez —
// sadece burada listelenen skill'ler tıklanabilir olur, diğerleri düz etiket kalır.
const SKILL_ROUTE_MAP = {
    'Selenium': '/selenium',
    'Playwright': '/playwright',
    'Cypress': '/cypress',
    'Python': '/python',
    'TypeScript': '/typescript',
    'JavaScript': '/javascript',
    'SQL': '/sql',
    'Java': '/java',
    'Git': '/git-github',
    'GitHub': '/git-github',
    'Linux': '/linux',
    'JMeter': '/jmeter',
    'Postman': '/postman',
    'Bruno': '/bruno',
    'REST Assured': '/rest-assured',
    'API Testing': '/postman',
    'Docker': '/docker',
    'Jenkins': '/jenkins',
    'Kubernetes': '/kubernetes',
    'Kafka': '/kafka',
    'Appium': '/appium',
    'BrowserStack': '/browserstack',
    'AWS': '/aws',
    'Azure': '/azure',
}

// "2026-07-01" + "2026-07-07" -> "1-7 Temmuz 2026" / "July 1-7, 2026" (aynı ay)
// ya da "28 Haziran - 4 Temmuz 2026" / "June 28 - July 4, 2026" (ay değişiyorsa).
// tr-TR gün-ay-yıl, en-US ay-gün-yıl sırası kullandığından aynı-ay durumu
// locale'e göre ayrı kurulur — naif birleştirme yanlış sırada çıkar.
function formatDateRange(startISO, endISO, language) {
    const locale = language === 'tr' ? 'tr-TR' : 'en-US'
    const start = new Date(`${startISO}T00:00:00`)
    const end = new Date(`${endISO}T00:00:00`)
    const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()
    if (sameMonth) {
        const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(end)
        const year = end.getFullYear()
        return language === 'tr'
            ? `${start.getDate()}-${end.getDate()} ${month} ${year}`
            : `${month} ${start.getDate()}-${end.getDate()}, ${year}`
    }
    const startFmt = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long' }).format(start)
    const endFmt = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(end)
    return `${startFmt} - ${endFmt}`
}

function formatPlatformList(sources, language) {
    if (!sources || sources.length === 0) return null
    if (sources.length === 1) return sources[0]
    const joiner = language === 'tr' ? ' ve ' : ' and '
    return `${sources.slice(0, -1).join(', ')}${joiner}${sources[sources.length - 1]}`
}

function TrendingSkillPill({ skillName, darkMode }) {
    const route = SKILL_ROUTE_MAP[skillName]
    const classes = `px-2.5 py-1.5 rounded-lg font-semibold text-xs whitespace-nowrap border transition-all duration-200 ${
        darkMode
            ? 'bg-gray-700 border-gray-600 text-gray-200'
            : 'bg-white border-rose-200 text-rose-700'
    } ${route ? 'hover:scale-105 hover:shadow-md hover:border-rose-400 cursor-pointer' : ''}`

    if (route) {
        return <Link to={route} className={classes}>{skillName}</Link>
    }
    return <span className={classes}>{skillName}</span>
}

function TrendingSkillsWidget({ darkMode }) {
    const { t, language } = useLanguage()
    const [skills, setSkills] = useState([])
    const [meta, setMeta] = useState(null)
    const [status, setStatus] = useState('loading')

    useEffect(() => {
        if (!isSupabaseConfigured) {
            setStatus('error')
            return
        }
        let cancelled = false
        Promise.all([
            supabase.from('trending_skills').select('skill_name, frequency').order('frequency', { ascending: false }).limit(10),
            supabase.from('trending_skills_meta').select('window_start, window_end, postings_scanned, sources').eq('id', 1).maybeSingle(),
        ]).then(([skillsResult, metaResult]) => {
            if (cancelled) return
            if (skillsResult.error) {
                console.warn('trending_skills fetch failed:', skillsResult.error)
                setStatus('error')
                return
            }
            if (metaResult.error) {
                console.warn('trending_skills_meta fetch failed:', metaResult.error)
            }
            setSkills(skillsResult.data ?? [])
            setMeta(metaResult.data ?? null)
            setStatus('ready')
        })
        return () => { cancelled = true }
    }, [])

    // Supabase yapılandırılmamış veya sorgu hata verdiyse sayfayı bozmadan sessizce gizle.
    if (status === 'error') return null
    if (status !== 'ready') return null

    const platforms = formatPlatformList(meta?.sources, language)
    const subtitle = meta
        ? (language === 'tr'
            ? `${formatDateRange(meta.window_start, meta.window_end, language)} tarihleri arasında${platforms ? ` ${platforms} üzerinden` : ''} taranan ${meta.postings_scanned} iş ilanından çıkarılan trend teknik yetenekler`
            : `Trending technical skills extracted from ${meta.postings_scanned} job postings${platforms ? ` scanned on ${platforms}` : ' scanned'} between ${formatDateRange(meta.window_start, meta.window_end, language)}`)
        : t('home.trendingSkills.subtitle')

    if (skills.length === 0) {
        return (
            <div className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-rose-100 shadow-sm'}`}>
                <div className={`px-3 py-2 flex items-center gap-1.5 border-b ${darkMode ? 'bg-rose-900/30 border-gray-700' : 'bg-rose-50 border-rose-100'}`}>
                    <span className="text-sm">🔥</span>
                    <span className={`text-xs font-bold tracking-wide uppercase ${darkMode ? 'text-rose-300' : 'text-rose-700'}`}>{t('home.trendingSkills.title')}</span>
                </div>
                <div className={`p-3 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t('home.trendingSkills.empty')}
                </div>
            </div>
        )
    }

    return (
        <div className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-rose-100 shadow-sm'}`}>
            <div className={`px-3 py-2 flex items-center gap-1.5 border-b ${darkMode ? 'bg-rose-900/30 border-gray-700' : 'bg-rose-50 border-rose-100'}`}>
                <span className="text-sm">🔥</span>
                <span className={`text-xs font-bold tracking-wide uppercase ${darkMode ? 'text-rose-300' : 'text-rose-700'}`}>{t('home.trendingSkills.title')}</span>
            </div>
            <div className={`px-3 pt-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {subtitle}
            </div>
            <div className="p-2 flex flex-wrap gap-1">
                {skills.map((row) => (
                    <TrendingSkillPill key={row.skill_name} skillName={row.skill_name} darkMode={darkMode} />
                ))}
            </div>
        </div>
    )
}

export default TrendingSkillsWidget
