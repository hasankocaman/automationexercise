import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { LOCALES, ROUTE_SEO, alternatesFor, canonicalUrl, localizedPath } from '../src/utils/seo.js'

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
    '/git-document': '0.7',
}

// Her route iki dilde de listelenir (TR = çıplak path, EN = /en prefix) ve her
// girdi xhtml:link alternates taşır — Google'ın hreflang kümesini sitemap'ten
// de doğrulaması için. Bkz. Documents/seo-phase-2-plan.md §2.
function sitemapUrl(seo, locale) {
    const priority = priorities[seo.path] || '0.8'
    const changefreq = ['/', '/selenium', '/playwright', '/python', '/typescript', '/sql', '/java'].includes(seo.path)
        ? 'weekly'
        : 'monthly'
    const alternates = alternatesFor(seo.path)
        .filter((alt) => alt.hreflang !== 'x-default')
        .map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`)
        .join('\n')

    return `  <url>
    <loc>${canonicalUrl(localizedPath(seo.path, locale))}</loc>
${alternates}
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

// `noindex` girdiler sitemap'e GİRMEZ. Sitemap "bunları indeksle" demektir;
// korumalı (RequireAdmin/ProtectedRoute) ya da işlevsel (login, OAuth callback)
// sayfaları oraya koymak Google'a görebileceğinden fazlasını vaat eder — ziyaretçi
// içerik göremediği için thin content/soft 404 sinyali üretir, `/auth/callback`
// ise arama sonucundan tıklandığında bozuk bir akışa düşürür. Bir URL'i indeksten
// çıkarmak eklemekten kat kat yavaş olduğu için bu filtre YAYIN ÖNCESİ kritiktir
// (bkz. DEPLOY.md §9.2). Statik shell'leri yine üretilir (GitHub Pages'te derin
// bağlantıda sert yenileme için gerekir) ama shell'de robots=noindex taşır.
const indexableRoutes = ROUTE_SEO.filter((seo) => !seo.dynamic && !seo.noindex)
const entries = LOCALES.flatMap((locale) => indexableRoutes.map((seo) => sitemapUrl(seo, locale)))

await writeFile(
    join(publicDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`,
)

console.log(`Generated robots.txt and sitemap.xml for ${indexableRoutes.length} routes x ${LOCALES.length} locales = ${entries.length} URLs.`)
