import { readFile } from 'node:fs/promises'
import { ROUTE_SEO, SITE_URL, canonicalUrl } from '../src/utils/seo.js'

const appSource = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8')
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

for (const item of ROUTE_SEO) {
    if (!item.path.startsWith('/')) errors.push(`SEO path must start with "/": ${item.path}`)
    if (!item.title || item.title.length < 20) errors.push(`SEO title is too short for ${item.path}`)
    if (!item.title.includes('LearnQA.dev')) errors.push(`SEO title should include LearnQA.dev for ${item.path}`)
    if (!item.description || item.description.length < 80) errors.push(`SEO description is too short for ${item.path}`)
    if (item.description.length > 180) errors.push(`SEO description is too long for ${item.path}`)
    if (!canonicalUrl(item.path).startsWith(SITE_URL)) errors.push(`Canonical URL is invalid for ${item.path}`)
}

if (errors.length) {
    console.error(errors.join('\n'))
    process.exit(1)
}

console.log(`SEO check passed for ${ROUTE_SEO.length} routes.`)
