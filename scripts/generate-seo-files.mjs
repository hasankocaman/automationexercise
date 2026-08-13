import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { LOCALES, ROUTE_SEO, alternatesFor, canonicalUrl, localizedPath } from '../src/utils/seo.js'
import { SECTION_SLUGS } from '../src/data/generated/sectionSlugs.js'
import { buildSectionSeoIndex } from './lib/sectionSeo.mjs'
import { isShallowRepo, lastModFor } from './lib/lastmod.mjs'
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

// `changefreq`/`priority` Google tarafından yıllardır yok sayılıyor; `lastmod`
// ise hâlâ yeniden tarama önceliği için kullanılıyor — ama yalnızca güvenilirse.
// Tarihin nereden geldiği ve ne zaman hiç yazılmadığı: scripts/lib/lastmod.mjs.
if (isShallowRepo) {
    console.warn('sitemap: shallow clone algılandı, lastmod yazılmıyor (fetch-depth: 0 gerekir).')
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

// ─── Sitemap: TEK dosya değil, DÖRT parça + bir indeks ────────────────────────
// Neden bölündü: tek bir urlset'te 700+ URL varken Search Console "şu kadar
// gönderildi, şu kadar dizine eklendi" bilgisini tek blok olarak verir. O rakam
// "hangi grup takıldı?" sorusuna cevap veremez — Türkçe hub'lar mı girmiyor,
// yoksa bölüm sayfaları mı? Grup başına ayrı sitemap, o cevabı ÖLÇÜLEBİLİR
// hale getirir: her alt sitemap kendi indekslenme oranıyla raporlanır.
//
// Bölme ölçütü dil × sayfa tipi: dil, çünkü iki dilin indekslenme hızı ayrışır;
// tip, çünkü hub sayfaları (47) ile bölüm sayfaları (~350) tarama önceliği
// bakımından aynı sınıfta değildir — hub'lar önce girmeli.
//
// `sitemap.xml` adı KORUNDU (artık içeriği indeks). Arama motoruna daha önce
// bu adres bildirildiyse yeni bir gönderim gerekmez; indeksi gören motor
// çocukları kendisi keşfeder.
const SITEMAP_GROUPS = LOCALES.flatMap((locale) => [
    {
        file: `sitemap-${locale}-hubs.xml`,
        urls: indexableRoutes.map((seo) => ({
            path: seo.path,
            locale,
            priority: priorities[seo.path] || '0.8',
            changefreq: ['/', '/selenium', '/playwright', '/python', '/typescript', '/sql', '/java'].includes(seo.path)
                ? 'weekly'
                : 'monthly',
            lastmod: lastModFor(seo.path),
        })),
    },
    {
        file: `sitemap-${locale}-sections.xml`,
        urls: sectionEntries.map((entry) => ({
            path: entry.path,
            locale,
            priority: '0.7',
            changefreq: 'monthly',
            lastmod: lastModFor(entry.routePath),
        })),
    },
])

let totalUrls = 0
for (const group of SITEMAP_GROUPS) {
    totalUrls += group.urls.length
    await writeFile(
        join(publicDir, group.file),
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${group.urls.map(sitemapUrl).join('\n')}
</urlset>
`,
    )
}

// İndeksteki `lastmod`, o alt sitemap'teki EN YENİ sayfa tarihidir — motor
// hangi grubu yeniden çekeceğine buna bakarak karar verir.
function newestLastmod(urls) {
    const dates = urls.map((u) => u.lastmod).filter(Boolean).sort()
    return dates.length ? dates[dates.length - 1] : ''
}

await writeFile(
    join(publicDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_GROUPS.map((group) => {
        const lastmod = newestLastmod(group.urls)
        return `  <sitemap>
    <loc>${canonicalUrl(`/${group.file}`)}</loc>
${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}  </sitemap>`
    }).join('\n')}
</sitemapindex>
`,
)

console.log(
    `Generated robots.txt and sitemap index: ${SITEMAP_GROUPS.length} alt sitemap, `
    + `${indexableRoutes.length} route + ${sectionEntries.length} bölüm x ${LOCALES.length} dil = ${totalUrls} URL.`,
)

// ─── Görünür "son güncelleme" tarihi ─────────────────────────────────────────
// Aynı tarih üç yerde birden görünmek zorunda: sitemap `lastmod`, sayfanın
// `dateModified` şeması ve kullanıcıya GÖRÜNEN künye. Statik shell tarihi
// build sırasında doğrudan okuyabilir ama React uygulaması okuyamaz (tarayıcıda
// git yoktur) — bu manifest o boşluğu kapatır. Manifest olmadan künye
// JavaScript sonrası tarihini kaybederdi: ham HTML'de tarih var, render sonrası
// yok — arama motoru için ayrışma, kullanıcı için kaybolan bilgi.
const updatedEntries = Object.keys(DATA_MODULES)
    .map((routePath) => [routePath, lastModFor(routePath)])
    .filter(([, iso]) => iso)
    .sort(([a], [b]) => a.localeCompare(b))

await mkdir(join(rootDir, 'src', 'data', 'generated'), { recursive: true })
await writeFile(
    join(rootDir, 'src', 'data', 'generated', 'pageUpdated.js'),
    `// OTOMATİK ÜRETİLDİ — elle düzenleme, npm run build sırasında yeniden yazılır.
// Kaynak: scripts/generate-seo-files.mjs (tarih: scripts/lib/lastmod.mjs)
//
// Ders sayfası → içeriğini taşıyan veri dosyasının son commit tarihi.
// Sayfadaki görünür künye ve \`dateModified\` şeması bunu kullanır; sitemap
// \`lastmod\` alanı da AYNI kaynaktan gelir, bu yüzden üçü ayrışamaz.
// Shallow clone'da güvenilir tarih üretilemediği için manifest BOŞ kalır ve
// künye tarihsiz basılır (yanlış tarih göstermektense hiç göstermemek).

export const PAGE_UPDATED = ${JSON.stringify(Object.fromEntries(updatedEntries), null, 2)}

export function pageUpdatedFor(routePath) {
    return PAGE_UPDATED[routePath] || ''
}
`,
)

console.log(`Generated pageUpdated.js: ${updatedEntries.length} sayfa için son güncelleme tarihi.`)
