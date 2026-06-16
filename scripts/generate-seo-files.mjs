import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ROUTE_SEO, canonicalUrl } from '../src/utils/seo.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const publicDir = join(rootDir, 'public')

const priorities = {
    '/': '1.0',
    '/selenium': '0.9',
    '/playwright': '0.9',
    '/python': '0.9',
    '/typescript': '0.9',
    '/sql': '0.9',
    '/java': '0.9',
    '/aws': '0.7',
    '/azure': '0.7',
    '/java-document': '0.7',
}

function sitemapUrl(seo) {
    const priority = priorities[seo.path] || '0.8'
    const changefreq = ['/', '/selenium', '/playwright', '/python', '/typescript', '/sql', '/java'].includes(seo.path)
        ? 'weekly'
        : 'monthly'

    return `  <url>
    <loc>${canonicalUrl(seo.path)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

await mkdir(publicDir, { recursive: true })

await writeFile(
    join(publicDir, 'robots.txt'),
    `User-agent: *
Allow: /

Sitemap: https://learnqa.dev/sitemap.xml
`,
)

await writeFile(
    join(publicDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTE_SEO.map(sitemapUrl).join('\n')}
</urlset>
`,
)

console.log(`Generated robots.txt and sitemap.xml for ${ROUTE_SEO.length} routes.`)
