import { execFileSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { LOCALES, ROUTE_SEO, alternatesFor, canonicalUrl, localizedPath } from '../src/utils/seo.js'
import { SECTION_SLUGS } from '../src/data/generated/sectionSlugs.js'
import { buildSectionSeoIndex } from './lib/sectionSeo.mjs'
import { DATA_MODULES } from './lib/topicDataModules.mjs'

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

// ─── lastmod ─────────────────────────────────────────────────────────────────
// Bir sayfanın gerçek son değişiklik tarihi, içeriğini taşıyan veri dosyasının
// son commit tarihidir. `changefreq`/`priority` Google tarafından yıllardır yok
// sayılıyor; `lastmod` ise hâlâ yeniden tarama önceliği için kullanılıyor —
// ama YALNIZCA güvenilirse. Bu yüzden iki koruma var:
//   1. Shallow clone'da (CI'ın varsayılan `fetch-depth: 1`) tüm dosyalar aynı
//      tek commit'i gösterir; böyle bir durumda lastmod HİÇ yazılmaz — her
//      deploy'da "her sayfa bugün değişti" demek sinyali tümden değersizleştirir.
//   2. Git yoksa/başarısızsa sessizce atlanır.
function gitOutput(args) {
    try {
        return execFileSync('git', args, { cwd: rootDir, encoding: 'utf8' }).trim()
    } catch {
        return ''
    }
}

const shallowRepo = gitOutput(['rev-parse', '--is-shallow-repository']) !== 'false'
if (shallowRepo) {
    console.warn('sitemap: shallow clone algılandı, lastmod yazılmıyor (fetch-depth: 0 gerekir).')
}

const lastModCache = new Map()
function lastModFor(routePath) {
    if (shallowRepo) return ''
    if (lastModCache.has(routePath)) return lastModCache.get(routePath)

    const config = DATA_MODULES[routePath]
    const relativeFile = config?.file?.replace('../../', '')
    const iso = relativeFile ? gitOutput(['log', '-1', '--format=%cI', '--', relativeFile]) : ''
    lastModCache.set(routePath, iso)
    return iso
}

function sitemapUrl({ path, locale, priority, changefreq, lastmod }) {
    const alternates = alternatesFor(path)
        .filter((alt) => alt.hreflang !== 'x-default')
        .map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`)
        .join('\n')

    return `  <url>
    <loc>${canonicalUrl(localizedPath(path, locale))}</loc>
${alternates}
${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}    <changefreq>${changefreq}</changefreq>
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

// Sekme URL'leri: yalnızca INDEKSLENEBİLİR olanlar (ilk sekme hub'ın kopyası,
// mülakat sekmeleri quiz kilidi arkasında, 180 kelimenin altındakiler ince
// içerik — üçü de sitemap'e girmez, bkz. scripts/lib/sectionSeo.mjs).
const { index: sectionIndex, problems } = await buildSectionSeoIndex(SECTION_SLUGS)
if (problems.length) {
    console.error(problems.join('\n'))
    process.exit(1)
}
const sectionEntries = Object.values(sectionIndex).flat().filter((entry) => entry.indexable)

const entries = LOCALES.flatMap((locale) => [
    ...indexableRoutes.map((seo) => sitemapUrl({
        path: seo.path,
        locale,
        priority: priorities[seo.path] || '0.8',
        changefreq: ['/', '/selenium', '/playwright', '/python', '/typescript', '/sql', '/java'].includes(seo.path)
            ? 'weekly'
            : 'monthly',
        lastmod: lastModFor(seo.path),
    })),
    ...sectionEntries.map((entry) => sitemapUrl({
        path: entry.path,
        locale,
        priority: '0.7',
        changefreq: 'monthly',
        lastmod: lastModFor(entry.routePath),
    })),
])

await writeFile(
    join(publicDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`,
)

console.log(`Generated robots.txt and sitemap.xml: ${indexableRoutes.length} routes + ${sectionEntries.length} sections x ${LOCALES.length} locales = ${entries.length} URLs.`)
