import { access, readFile } from 'node:fs/promises'
import { LOCALES, ROUTE_SEO, alternatesFor, canonicalUrl, localizedPath, seoFor } from '../src/utils/seo.js'

const distDir = new URL('../dist/', import.meta.url)
const errors = []

function routeIndexPath(urlPath) {
    if (urlPath === '/') return new URL('index.html', distDir)
    return new URL(`${urlPath.replace(/^\//, '')}/index.html`, distDir)
}

function htmlIncludes(html, value) {
    return html.includes(String(value).replaceAll('&', '&amp;'))
}

const checkedRoutes = ROUTE_SEO.filter((seo) => !seo.dynamic)
let checked = 0

// Her route İKİ dilde de üretilmiş olmalı: TR → /<route>, EN → /en/<route>.
// (Documents/seo-phase-2-plan.md §2)
for (const locale of LOCALES) {
    for (const entry of checkedRoutes) {
        const { title, description } = seoFor(entry, locale)
        const urlPath = localizedPath(entry.path, locale)
        const htmlPath = routeIndexPath(urlPath)

        try {
            await access(htmlPath)
        } catch {
            errors.push(`Missing generated HTML for ${urlPath}: ${htmlPath.pathname}`)
            continue
        }

        checked += 1
        const html = await readFile(htmlPath, 'utf8')
        const canonical = canonicalUrl(urlPath)

        if (!htmlIncludes(html, `<title>${title}</title>`)) {
            errors.push(`Missing title in generated HTML for ${urlPath}`)
        }

        if (!htmlIncludes(html, `<link rel="canonical" href="${canonical}" />`)) {
            errors.push(`Missing canonical URL in generated HTML for ${urlPath}`)
        }

        if (!htmlIncludes(html, `<meta name="description" content="${description}" />`)) {
            errors.push(`Missing meta description in generated HTML for ${urlPath}`)
        }

        if (!html.includes(`<html lang="${locale}"`)) {
            errors.push(`Wrong or missing <html lang="${locale}"> for ${urlPath}`)
        }

        for (const alt of alternatesFor(entry.path)) {
            if (!htmlIncludes(html, `hreflang="${alt.hreflang}" href="${alt.href}"`)) {
                errors.push(`Missing hreflang="${alt.hreflang}" alternate for ${urlPath}`)
            }
        }

        if (!html.includes('data-seo-fallback="true"')) {
            errors.push(`Missing crawlable fallback content for ${urlPath}`)
        }

        if (!html.includes('"@type": "WebPage"')) {
            errors.push(`Missing WebPage structured data for ${urlPath}`)
        }

        if (!html.includes('"@type": "BreadcrumbList"')) {
            errors.push(`Missing BreadcrumbList structured data for ${urlPath}`)
        }
    }
}

// Zengin snippet kazanımı ölçülebilir olsun diye raporlanır (hard-fail DEĞİL:
// her route ders sayfası değil, mülakat bloğu olmayan sayfalar da var).
let faqPages = 0
let coursePages = 0

for (const locale of LOCALES) {
    for (const entry of checkedRoutes) {
        const htmlPath = routeIndexPath(localizedPath(entry.path, locale))

        try {
            const html = await readFile(htmlPath, 'utf8')
            if (html.includes('"@type": "FAQPage"')) faqPages += 1
            if (html.includes('"@type": "Course"')) coursePages += 1
        } catch { /* eksiklik yukarıda zaten raporlandı */ }
    }
}

if (errors.length) {
    console.error(errors.join('\n'))
    process.exit(1)
}

console.log(`Dist SEO check passed for ${checked} generated pages (${checkedRoutes.length} routes x ${LOCALES.length} locales).`)
console.log(`Rich results: ${faqPages} pages with FAQPage, ${coursePages} pages with Course structured data.`)
