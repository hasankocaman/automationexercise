// searchIndex.js — Global search across all *Data.js files
// Returns an array of { route, pageName, tabName, tabIndex, snippet, searchText }

import { postmanData } from '../data/postmanData'
import { restAssuredData } from '../data/restAssuredData'
import { dockerData } from '../data/dockerData'
import { seleniumData } from '../data/seleniumData'
import { playwrightData } from '../data/playwrightData'
import { cypressData } from '../data/cypressData'
import { pythonData } from '../data/pythonData'
import { typescriptData } from '../data/typescriptData'
import { javascriptData } from '../data/javascriptData'
import { sqlData } from '../data/sqlData'
import { jmeterData } from '../data/jmeterData'
import { javaData } from '../data/javaData'
import { kubernetesData } from '../data/kubernetesData'
import { jenkinsData } from '../data/jenkinsData'
import { kafkaData } from '../data/kafkaData'
import { appiumData } from '../data/appiumData'
import { browserstackData } from '../data/browserstackData'
import { gitGithubData } from '../data/gitGithubData'
import { linuxData } from '../data/linuxData'
import { awsData } from '../data/awsData'
import { azureData } from '../data/azureData'
import { algorithmsData } from '../data/algorithmsData'
import { beginnerAlgorithmsData } from '../data/beginnerAlgorithmsData'
import { manualTestingData } from '../data/manualTestingData'
import { securityData } from '../data/securityData'

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
        str(block.description, language),
        str(block.label, language),
        str(block.heading, language),
        str(block.note, language),
        str(block.subtitle, language),
        // raw code strings (language-agnostic)
        typeof block.code === 'string' ? block.code : '',
        typeof block.initialCode === 'string' ? block.initialCode : '',
        typeof block.java === 'string' ? block.java : '',
        typeof block.tree === 'string' ? block.tree : '',
    ]
    // questions / interview-questions
    if (Array.isArray(block.questions)) {
        block.questions.forEach(q => {
            parts.push(str(q.q, language))
            parts.push(str(q.a, language))
            parts.push(str(q.question, language))
            parts.push(str(q.answer, language))
        })
    }
    // glossary terms
    if (Array.isArray(block.terms)) {
        block.terms.forEach(t => {
            parts.push(str(t.term, language))
            parts.push(str(t.definition, language))
        })
    }
    // table headers + rows
    if (Array.isArray(block.headers)) parts.push(block.headers.map(h => str(h, language)).join(' '))
    if (Array.isArray(block.rows)) {
        block.rows.forEach(row => {
            if (Array.isArray(row)) row.forEach(cell => parts.push(str(cell, language)))
            else parts.push(str(row, language))
        })
    }
    // grid / card items
    if (Array.isArray(block.items)) {
        block.items.forEach(item => {
            if (typeof item === 'string') { parts.push(item); return }
            parts.push(str(item.title, language))
            parts.push(str(item.content, language))
            parts.push(str(item.label, language))
            parts.push(str(item.description, language))
            parts.push(str(item.text, language))
            if (typeof item.code === 'string') parts.push(item.code)
        })
    }
    // comparison block sides
    if (Array.isArray(block.sides)) {
        block.sides.forEach(side => {
            parts.push(str(side.label, language))
            parts.push(str(side.note, language))
            if (typeof side.code === 'string') parts.push(side.code)
        })
    }
    // error-dictionary entries
    if (Array.isArray(block.errors)) {
        block.errors.forEach(err => {
            parts.push(str(err.title, language))
            parts.push(str(err.message, language))
            parts.push(str(err.cause, language))
            parts.push(str(err.solution, language))
            if (typeof err.fullMessage === 'string') parts.push(err.fullMessage)
        })
    }
    // steps arrays
    if (Array.isArray(block.steps)) {
        block.steps.forEach(step => {
            parts.push(str(step.title || step.label || step, language))
            parts.push(str(step.content || step.description, language))
        })
    }
    return parts.filter(Boolean).join(' ')
}

function sectionText(section, language = 'en') {
    const parts = [
        str(section.title, language),
        str(section.shortTitle, language),
        str(section.analogy, language),
        str(section.why, language),
        str(section.game?.title, language),
        str(section.game?.prompt, language),
        str(section.game?.success, language),
    ]
    if (Array.isArray(section.game?.items)) {
        section.game.items.forEach(item => parts.push(str(item.text || item.label, language)))
    }
    if (Array.isArray(section.game?.options)) {
        section.game.options.forEach(option => {
            parts.push(str(option.label, language))
            parts.push(str(option.output, language))
        })
    }
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
    const sections = Array.isArray(content) ? content : content?.sections || content?.lessons
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
    { data: cypressData, route: '/cypress', name: 'Cypress' },
    { data: pythonData, route: '/python', name: 'Python' },
    { data: typescriptData, route: '/typescript', name: 'TypeScript' },
    { data: javascriptData, route: '/javascript', name: 'JavaScript' },
    { data: sqlData, route: '/sql', name: 'SQL' },
    { data: jmeterData, route: '/jmeter', name: 'JMeter' },
    { data: javaData, route: '/java', name: 'Java' },
    { data: kubernetesData, route: '/kubernetes', name: 'Kubernetes' },
    { data: jenkinsData, route: '/jenkins', name: 'Jenkins' },
    { data: kafkaData, route: '/kafka', name: 'Kafka' },
    { data: appiumData, route: '/appium', name: 'Appium' },
    { data: browserstackData, route: '/browserstack', name: 'BrowserStack' },
    { data: gitGithubData, route: '/git-github', name: 'Git & GitHub' },
    { data: linuxData, route: '/linux', name: 'Linux' },
    { data: awsData, route: '/aws', name: 'AWS' },
    { data: azureData, route: '/azure', name: 'Azure' },
    { data: manualTestingData, route: '/manual-testing', name: 'Manual Testing' },
    { data: securityData, route: '/security', name: 'Siber Güvenlik' },
    { data: beginnerAlgorithmsData, route: '/algorithms', name: 'Algorithms' },
    { data: algorithmsData, route: '/advanced-algorithms', name: 'Advanced Algorithms' },
    // backendData intentionally excluded: /backend is admin-only, not general visitor content.
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
    const scored = []

    for (const entry of index) {
        const text = entry.fullText.toLowerCase()
        const tabLower = entry.tabName.toLowerCase()
        const pageLower = entry.pageName.toLowerCase()

        if (!text.includes(q)) continue

        // relevance: tab name match scores highest, page name next, then content
        let score = 0
        if (tabLower.includes(q)) score += 100
        if (pageLower.includes(q)) score += 50
        // count occurrences in full text for tiebreak
        let pos = 0, count = 0
        while ((pos = text.indexOf(q, pos)) !== -1) { count++; pos++ }
        score += Math.min(count, 20)

        scored.push({
            route: entry.route,
            pageName: entry.pageName,
            tabName: entry.tabName,
            tabIndex: entry.tabIndex,
            snippet: snippet(entry.fullText, query.trim()),
            score,
        })
    }

    scored.sort((a, b) => b.score - a.score)
    return scored.slice(0, limit).map(({ score: _s, ...rest }) => rest)
}
