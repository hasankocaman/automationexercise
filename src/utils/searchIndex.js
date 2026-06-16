// searchIndex.js — Global search across all *Data.js files
// Returns an array of { route, pageName, tabName, tabIndex, snippet, searchText }

import { postmanData } from '../data/postmanData'
import { restAssuredData } from '../data/restAssuredData'
import { dockerData } from '../data/dockerData'
import { seleniumData } from '../data/seleniumData'
import { playwrightData } from '../data/playwrightData'
import { pythonData } from '../data/pythonData'
import { typescriptData } from '../data/typescriptData'
import { sqlData } from '../data/sqlData'
import { jmeterData } from '../data/jmeterData'
import { javaData } from '../data/javaData'
import { kubernetesData } from '../data/kubernetesData'
import { jenkinsData } from '../data/jenkinsData'
import { kafkaData } from '../data/kafkaData'
import { appiumData } from '../data/appiumData'
import { browserstackData } from '../data/browserstackData'
import { awsData } from '../data/awsData'
import { azureData } from '../data/azureData'

// ── helpers ───────────────────────────────────────────────────────────────────

function str(v, language = 'en') {
    if (!v) return ''
    if (typeof v === 'string') return v
    if (Array.isArray(v)) return v.map(item => str(item, language)).join(' ')
    if (typeof v === 'object') {
        if (typeof v[language] === 'string') return v[language]
        return ''
    }
    return ''
}

function blockText(block, language = 'en') {
    if (!block) return ''
    const parts = [
        str(block.text, language),
        str(block.content, language),
        str(block.title, language),
    ]
    if (Array.isArray(block.questions)) {
        block.questions.forEach(q => {
            parts.push(str(q.q, language))
            parts.push(str(q.a, language))
        })
    }
    if (Array.isArray(block.terms)) {
        block.terms.forEach(t => {
            parts.push(str(t.term, language))
            parts.push(str(t.definition, language))
        })
    }
    if (Array.isArray(block.headers)) parts.push(block.headers.map(header => str(header, language)).join(' '))
    return parts.filter(Boolean).join(' ')
}

function sectionText(section, language = 'en') {
    const parts = [str(section.title, language)]
    if (Array.isArray(section.blocks)) {
        section.blocks.forEach(b => parts.push(blockText(b, language)))
    }
    return parts.join(' ')
}

function snippet(text, query) {
    const lower = text.toLowerCase()
    const idx = lower.indexOf(query.toLowerCase())
    if (idx === -1) return text.slice(0, 80).trim() + '…'
    const start = Math.max(0, idx - 40)
    const end = Math.min(text.length, idx + query.length + 60)
    return (start > 0 ? '…' : '') + text.slice(start, end).trim() + (end < text.length ? '…' : '')
}

// ── index builder ─────────────────────────────────────────────────────────────

function getContentByLanguage(dataObj, language = 'en') {
    if (dataObj == null) return null
    if (typeof dataObj[language] !== 'undefined') return dataObj[language]
    if (language === 'tr' && typeof dataObj.tr !== 'undefined') return dataObj.tr
    if (language === 'en' && typeof dataObj.en !== 'undefined') return dataObj.en
    if (typeof dataObj.tr !== 'undefined' || typeof dataObj.en !== 'undefined') return null
    return dataObj
}

function buildEntries(dataObj, route, pageName, language = 'en') {
    const entries = []
    const content = getContentByLanguage(dataObj, language)
    const sections = Array.isArray(content) ? content : content?.sections
    const tabs = content?.tabs || []
    if (!Array.isArray(sections)) return entries

    sections.forEach((section, tabIndex) => {
        const tabName = str(tabs[tabIndex], language) || str(section.title, language) || `Tab ${tabIndex + 1}`
        const fullText = sectionText(section, language)
        entries.push({ route, pageName, tabName, tabIndex, fullText })
    })
    return entries
}

// ── exported index ────────────────────────────────────────────────────────────

const ALL_DATA = [
    { data: postmanData, route: '/postman', name: 'Postman' },
    { data: restAssuredData, route: '/rest-assured', name: 'REST Assured' },
    { data: dockerData, route: '/docker', name: 'Docker' },
    { data: seleniumData, route: '/selenium', name: 'Selenium' },
    { data: playwrightData, route: '/playwright', name: 'Playwright' },
    { data: pythonData, route: '/python', name: 'Python' },
    { data: typescriptData, route: '/typescript', name: 'TypeScript' },
    { data: sqlData, route: '/sql', name: 'SQL' },
    { data: jmeterData, route: '/jmeter', name: 'JMeter' },
    { data: javaData, route: '/java', name: 'Java' },
    { data: kubernetesData, route: '/kubernetes', name: 'Kubernetes' },
    { data: jenkinsData, route: '/jenkins', name: 'Jenkins' },
    { data: kafkaData, route: '/kafka', name: 'Kafka' },
    { data: appiumData, route: '/appium', name: 'Appium' },
    { data: browserstackData, route: '/browserstack', name: 'BrowserStack' },
    { data: awsData, route: '/aws', name: 'AWS' },
    { data: azureData, route: '/azure', name: 'Azure' },
]

const indexCache = new Map()

export function getSearchIndex(language = 'en') {
    if (indexCache.has(language)) return indexCache.get(language)
    const index = []
    ALL_DATA.forEach(({ data, route, name }) => {
        try {
            index.push(...buildEntries(data, route, name, language))
        } catch { }
    })
    indexCache.set(language, index)
    return index
}

export function search(query, language = 'en', limit = 12) {
    if (!query || query.trim().length < 2) return []
    const q = query.trim().toLowerCase()
    const index = getSearchIndex(language)
    const results = []

    for (const entry of index) {
        if (entry.fullText.toLowerCase().includes(q)) {
            results.push({
                route: entry.route,
                pageName: entry.pageName,
                tabName: entry.tabName,
                tabIndex: entry.tabIndex,
                snippet: snippet(entry.fullText, query.trim()),
            })
        }
        if (results.length >= limit) break
    }
    return results
}
