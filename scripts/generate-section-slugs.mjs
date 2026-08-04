// Sekme (bölüm) URL slug'larının DONDURULMUŞ manifestini üretir.
//
// Neden dosyaya yazılıyor da her build'de yeniden türetilmiyor: bir slug
// yayına çıktığı anda Google onu indeksler, kullanıcılar paylaşır. Başlıkta
// yapılan küçük bir düzenleme slug'ı değiştirirse o URL çürür (404) ve
// biriken sıralama sıfırlanır. Manifest checked-in olduğu için slug değişimi
// artık bir kod incelemesinde GÖRÜNÜR — sessizce olmaz.
//
// Kullanım:
//   node scripts/generate-section-slugs.mjs           → manifesti yazar/günceller
//   node scripts/generate-section-slugs.mjs --check    → güncel mi diye bakar (build/CI)
//
// Yeniden üretim kuralları (slug korunumu):
//   1. Başlık daha önce görülmüşse onun slug'ı KORUNUR (bölümler yer değiştirse bile).
//   2. Başlık değişmiş ama aynı index'te bir kayıt varsa onun slug'ı KORUNUR
//      (metin düzeltmesi URL'i çürütmesin diye).
//   3. Aksi hâlde başlıktan yeni slug üretilir.
// Bir slug'ı bilerek değiştirmek istersen manifestteki `slug` alanını elle
// düzenle — bu script onu ezmez (başlık eşleşmesi kural 1 ile korur).

import { readFile, writeFile } from 'node:fs/promises'
import { computeSectionCatalog, slugifySectionTitle, stripLeadingEmoji } from './lib/sectionSeo.mjs'

const manifestUrl = new URL('../src/data/generated/sectionSlugs.js', import.meta.url)
const checkOnly = process.argv.includes('--check')

async function readExistingManifest() {
    try {
        const module = await import(`${manifestUrl.href}?t=${Date.now()}`)
        return module.SECTION_SLUGS ?? {}
    } catch {
        return {}
    }
}

const existing = await readExistingManifest()
const catalog = await computeSectionCatalog()

const manifest = {}
let reused = 0
let created = 0

for (const [routePath, entries] of Object.entries(catalog)) {
    const previous = Array.isArray(existing[routePath]) ? existing[routePath] : []
    // Anahtar İKİ tarafta da emoji'siz: manifest başlıkları `stripLeadingEmoji`
    // ile YAZILIYOR (aşağıdaki `body` şablonu), katalog başlıkları ise emoji'yi
    // KORUYOR ("🟢 What is Selenium?"). Biri strip edilip diğeri edilmezse bu
    // arama HİÇ tutmaz ve Kural 1 sessizce ölür — o zaman slug'lar başlığa
    // değil YALNIZCA index'e bağlanır, araya bölüm eklenince bütün URL'ler
    // bir alt bölümün içeriğine kayar.
    const byTitle = new Map(previous.map((item) => [stripLeadingEmoji(item.title), item.slug]))
    const taken = new Set()

    manifest[routePath] = entries.map((entry) => {
        const title = entry.byLocale.en.title
        let slug = byTitle.get(stripLeadingEmoji(title))

        if (!slug && previous[entry.index]?.slug && !taken.has(previous[entry.index].slug)) {
            slug = previous[entry.index].slug
        }

        if (slug) {
            reused += 1
        } else {
            slug = slugifySectionTitle(title) || `section-${entry.index + 1}`
            created += 1
        }

        // Sayfa içinde tekillik: iki bölüm aynı slug'a düşerse ikincisi tam
        // başlıktan (kısaltmasız) türetilir, o da çakışırsa sayı eklenir.
        if (taken.has(slug)) {
            const full = slugifySectionTitle(title, { full: true })
            slug = taken.has(full) || !full ? `${slug}-${entry.index + 1}` : full
        }
        taken.add(slug)

        return { slug, title }
    })
}

const routeCount = Object.keys(manifest).length
const sectionCount = Object.values(manifest).reduce((sum, list) => sum + list.length, 0)

const body = `// AUTO-GENERATED — elle düzenleme yalnızca bir slug'ı BİLEREK sabitlemek için.
// Üretici: scripts/generate-section-slugs.mjs (npm run seo:section-slugs)
// Kural: bir slug yayına çıktıktan sonra DEĞİŞMEZ (bkz. üretici dosyasındaki not).
// ${routeCount} ders sayfası · ${sectionCount} bölüm.
export const SECTION_SLUGS = {
${Object.entries(manifest).map(([routePath, entries]) => `    '${routePath}': [
${entries.map((entry) => `        { slug: '${entry.slug}', title: ${JSON.stringify(stripLeadingEmoji(entry.title))} },`).join('\n')}
    ],`).join('\n')}
}
`

// Karşılaştırma satır sonundan BAĞIMSIZ olmalı: depoda `core.autocrlf=true`
// ayarlı bir Windows makinesinde her `git checkout` bu dosyayı CRLF'e çevirir,
// üretici ise LF yazar. Ham metin karşılaştırması bu durumda "manifest güncel
// değil" der ve build, içerikte hiçbir değişiklik olmadığı hâlde kırılır
// (2026-08-03'te bir branch geçişinden sonra tam olarak bu yaşandı). Kapının
// amacı içeriğin güncelliğini denetlemek, satır sonu biçimini değil.
const normalizeNewlines = (value) => value.replace(/\r\n/g, '\n').trim()

if (checkOnly) {
    let current = ''
    try {
        current = await readFile(manifestUrl, 'utf8')
    } catch { /* dosya yok — aşağıda hata verilir */ }

    if (normalizeNewlines(current) !== normalizeNewlines(body)) {
        console.error('Bölüm slug manifesti güncel değil. Çalıştır: npm run seo:section-slugs')
        process.exit(1)
    }
    console.log(`Section slug manifest is up to date (${routeCount} pages, ${sectionCount} sections).`)
} else {
    await writeFile(manifestUrl, body)
    console.log(`Wrote section slug manifest: ${routeCount} pages, ${sectionCount} sections (${reused} korundu, ${created} yeni).`)
}
