import { readdir, readFile } from 'node:fs/promises'
import { LOCALES, ROUTE_SEO, SITE_URL, canonicalUrl, localizedPath, seoFor } from '../src/utils/seo.js'

const appSource = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8')
const netlifySource = await readFile(new URL('../netlify.toml', import.meta.url), 'utf8')
const publicDir = new URL('../public/', import.meta.url)
const publicHtmlFiles = (await readdir(publicDir)).filter((file) => file.endsWith('.html'))
const routeMatches = [...appSource.matchAll(/<Route\s+path="([^"]+)"/g)].map((match) => match[1])
const appRoutes = new Set(routeMatches)
const seoRoutes = new Set(ROUTE_SEO.map((item) => item.path))
const errors = []

for (const route of appRoutes) {
    if (!seoRoutes.has(route)) {
        errors.push(`Missing SEO metadata for route: ${route}`)
    }
}

for (const route of seoRoutes) {
    if (!appRoutes.has(route)) {
        errors.push(`SEO metadata exists for non-App route: ${route}`)
    }
}

// Metadata kuralları HER İKİ DİL için de geçerlidir (Documents/seo-phase-2-plan.md §2).
// Eksik `tr` bloğu build'i kırar — yeni route eklerken iki dil de zorunludur.
const seenDescriptions = new Map()

for (const item of ROUTE_SEO) {
    if (!item.path.startsWith('/')) errors.push(`SEO path must start with "/": ${item.path}`)
    if (!item.tr) errors.push(`Missing Turkish (tr) SEO metadata for ${item.path}`)

    for (const locale of LOCALES) {
        const { title, description } = seoFor(item, locale)
        const where = `${item.path} [${locale}]`

        if (!title || title.length < 20) errors.push(`SEO title is too short for ${where}`)
        if (!title || !title.includes('LearnQA.dev')) errors.push(`SEO title should include LearnQA.dev for ${where}`)
        if (!description || description.length < 80) errors.push(`SEO description is too short for ${where}`)
        if (description && description.length > 180) errors.push(`SEO description is too long for ${where}`)
        if (!canonicalUrl(localizedPath(item.path, locale)).startsWith(SITE_URL)) {
            errors.push(`Canonical URL is invalid for ${where}`)
        }

        // Aynı description iki route'ta tekrarlanırsa Google duplicate meta sayar.
        const key = `${locale}|${description}`
        if (seenDescriptions.has(key)) {
            errors.push(`Duplicate SEO description for ${where} (same as ${seenDescriptions.get(key)})`)
        } else {
            seenDescriptions.set(key, item.path)
        }
    }

    // TR metadata gerçekten Türkçeleştirilmiş mi — İngilizce metnin kopyalanıp
    // bırakılmasını yakalar (bu, dil-ayrık URL'lerin tüm faydasını yok ederdi).
    if (item.tr && item.tr.title === item.title && item.tr.description === item.description) {
        errors.push(`Turkish SEO metadata is identical to English for ${item.path}`)
    }
}

for (const route of seoRoutes) {
    if (route === '/') continue

    const htmlFile = `${route.replace(/^\//, '')}.html`
    if (publicHtmlFiles.includes(htmlFile)) {
        errors.push(`Public HTML file shadows React route ${route}: public/${htmlFile}`)
    }
}

for (const htmlFile of publicHtmlFiles) {
    const redirectPattern = new RegExp(`from\\s*=\\s*["']/${htmlFile.replace('.', '\\.')}["']`)
    if (!redirectPattern.test(netlifySource)) {
        errors.push(`Public HTML file must have an explicit Netlify redirect before SPA fallback: public/${htmlFile}`)
    }
}

if (errors.length) {
    console.error(errors.join('\n'))
    process.exit(1)
}

console.log(`SEO check passed for ${ROUTE_SEO.length} routes.`)
