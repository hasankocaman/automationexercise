import { access, readFile } from 'node:fs/promises'
import { ROUTE_SEO, canonicalUrl } from '../src/utils/seo.js'

const distDir = new URL('../dist/', import.meta.url)
const errors = []

function routeIndexPath(routePath) {
    if (routePath === '/') return new URL('index.html', distDir)
    return new URL(`${routePath.replace(/^\//, '')}/index.html`, distDir)
}

function htmlIncludes(html, value) {
    return html.includes(String(value).replaceAll('&', '&amp;'))
}

const checkedRoutes = ROUTE_SEO.filter((seo) => !seo.dynamic)

for (const seo of checkedRoutes) {
    const htmlPath = routeIndexPath(seo.path)

    try {
        await access(htmlPath)
    } catch {
        errors.push(`Missing generated HTML for ${seo.path}: ${htmlPath.pathname}`)
        continue
    }

    const html = await readFile(htmlPath, 'utf8')
    const canonical = canonicalUrl(seo.path)

    if (!htmlIncludes(html, `<title>${seo.title}</title>`)) {
        errors.push(`Missing title in generated HTML for ${seo.path}`)
    }

    if (!htmlIncludes(html, `<link rel="canonical" href="${canonical}" />`)) {
        errors.push(`Missing canonical URL in generated HTML for ${seo.path}`)
    }

    if (!htmlIncludes(html, `<meta name="description" content="${seo.description}" />`)) {
        errors.push(`Missing meta description in generated HTML for ${seo.path}`)
    }

    if (!html.includes('data-seo-fallback="true"')) {
        errors.push(`Missing crawlable fallback content for ${seo.path}`)
    }

    if (!html.includes('"@type": "WebPage"')) {
        errors.push(`Missing WebPage structured data for ${seo.path}`)
    }

    if (!html.includes('"@type": "BreadcrumbList"')) {
        errors.push(`Missing BreadcrumbList structured data for ${seo.path}`)
    }
}

if (errors.length) {
    console.error(errors.join('\n'))
    process.exit(1)
}

console.log(`Dist SEO check passed for ${checkedRoutes.length} generated pages.`)
