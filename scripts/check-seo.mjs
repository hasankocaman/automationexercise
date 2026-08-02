import { readdir, readFile } from 'node:fs/promises'
import { LOCALES, ROUTE_SEO, SITE_URL, canonicalUrl, localizedPath, seoFor } from '../src/utils/seo.js'
import { SECTION_SLUGS } from '../src/data/generated/sectionSlugs.js'

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

// ─── Sekme (bölüm) URL katmanı ───────────────────────────────────────────────
// Sekme route'ları App.jsx'te tek tek yazılmaz, SECTION_PAGE_ELEMENTS tablosu
// üzerinden üretilir. Bu tablo slug manifestiyle AYNI sayfaları içermezse ya
// bir sayfanın sekme URL'leri hiç mount edilmez (derin bağlantı 404) ya da
// üretilmemiş bir route'a element aranır. İki liste burada karşılaştırılır.
const sectionElementBlock = appSource.match(/const SECTION_PAGE_ELEMENTS = \{([\s\S]*?)\n\}/)
if (!sectionElementBlock) {
    errors.push('SECTION_PAGE_ELEMENTS table not found in App.jsx (section URLs would not mount)')
} else {
    const appSectionPages = new Set(
        [...sectionElementBlock[1].matchAll(/'([^']+)':/g)].map((match) => match[1]),
    )
    const manifestPages = new Set(Object.keys(SECTION_SLUGS))

    for (const page of manifestPages) {
        if (!appSectionPages.has(page)) {
            errors.push(`Section slugs exist for ${page} but App.jsx has no SECTION_PAGE_ELEMENTS entry`)
        }
        if (!seoRoutes.has(page)) {
            errors.push(`Section slugs exist for ${page} but there is no ROUTE_SEO entry`)
        }
    }
    for (const page of appSectionPages) {
        if (!manifestPages.has(page)) {
            errors.push(`App.jsx renders section routes for ${page} but the slug manifest has none (run: npm run seo:section-slugs)`)
        }
    }
}

// Slug'lar sayfa içinde tekil olmalı — çakışma iki bölümü aynı URL'e bindirir.
for (const [page, entries] of Object.entries(SECTION_SLUGS)) {
    const seen = new Set()
    for (const entry of entries) {
        if (!entry.slug || !/^[a-z0-9-]+$/.test(entry.slug)) {
            errors.push(`Invalid section slug for ${page}: "${entry.slug}"`)
        }
        if (seen.has(entry.slug)) {
            errors.push(`Duplicate section slug for ${page}: "${entry.slug}"`)
        }
        seen.add(entry.slug)
    }
}

// Metadata kuralları HER İKİ DİL için de geçerlidir (Documents/seo-phase-2-plan.md §2).
// Eksik `tr` bloğu build'i kırar — yeni route eklerken iki dil de zorunludur.
const seenDescriptions = new Map()
const seenTitles = new Map()

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
        const descKey = `${locale}|${description}`
        if (seenDescriptions.has(descKey)) {
            errors.push(`Duplicate SEO description for ${where} (same as ${seenDescriptions.get(descKey)})`)
        } else {
            seenDescriptions.set(descKey, item.path)
        }

        // Aynı title iki route'ta tekrarlanırsa arama sonucunda birbirini yer
        // (DEPLOY.md §9.4 D1 — önceden yalnızca elle koşulan bir kontroldü).
        const titleKey = `${locale}|${title}`
        if (seenTitles.has(titleKey)) {
            errors.push(`Duplicate SEO title for ${where} (same as ${seenTitles.get(titleKey)})`)
        } else {
            seenTitles.set(titleKey, item.path)
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
