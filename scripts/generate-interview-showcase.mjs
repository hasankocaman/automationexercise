#!/usr/bin/env node
/**
 * generate-interview-showcase.mjs
 *
 * Ana sayfadaki "Mülakat Isınma Turu" bölümünün verisini build sırasında üretir.
 *
 * NEDEN BUILD-TIME: sorular 12 ayrı ders verisi dosyasında yaşıyor ve o
 * dosyalar 300 KB - 1 MB arası. Ana sayfanın onları runtime'da import etmesi
 * ilk boyayı yıkardı (SEO Faz 2'nin S1 adımında tam tersi yapıldı). Bu script
 * Node'da okuyup yalnızca seçilen soruları küçük bir dosyaya yazar; ana sayfa
 * sadece o küçük dosyayı import eder. Kaynak dosyalar TEK doğruluk kaynağı
 * olarak kalır — üretilen dosya elle DÜZENLENMEZ.
 *
 * NEDEN VAR: mülakat soruları ders sayfalarında %60 quiz barajının arkasında
 * (Documents/acceptancecriterias.md AC 04 — bilinçli bir ürün kararı). Bu,
 * yapılandırılmış veriye giren metnin kullanıcıya görünmemesi demekti ve
 * FAQPage şemasının kaldırılmasına yol açtı (bkz. DEPLOY.md §9.3). Ana
 * sayfadaki bu bölüm sorunu kaynağından çözer: herkese açık, gate'siz, gerçekten
 * GÖRÜNEN bir soru-cevap kümesi. Şema yalnızca bu görünür metinden üretilir.
 *
 * SEÇİM DETERMİNİSTİKTİR: rastgelelik yok. Her build aynı çıktıyı verir —
 * aksi hâlde her build'de git diff'i kirlenir ve Google her taramada farklı
 * içerik görür.
 */

import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dir = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dir, '../src/data')
const OUT_PATH = path.join(__dir, '../src/data/generated/interviewShowcase.js')

// Kapsam bilinçli olarak dar: en yüksek trafikli ve birbirinden farklı 12 konu.
// Amaç eksiksizlik değil, ana sayfada "her dersten bir tat" vermek.
const PAGES = [
    { route: '/selenium', file: 'seleniumData' },
    { route: '/playwright', file: 'playwrightData' },
    { route: '/cypress', file: 'cypressData' },
    { route: '/java', file: 'javaData' },
    { route: '/python', file: 'pythonData' },
    { route: '/sql', file: 'sqlData' },
    { route: '/javascript', file: 'javascriptData' },
    { route: '/typescript', file: 'typescriptData' },
    { route: '/docker', file: 'dockerData' },
    { route: '/jenkins', file: 'jenkinsData' },
    { route: '/git-github', file: 'gitGithubData' },
    { route: '/postman', file: 'postmanData' },
    { route: '/jira', file: 'jiraData' },
]

// Seviye rotasyonu: liste boyunca basic → intermediate → advanced döner, böylece
// kümede hem ısınma hem derinlik olur ("karışık soru" hedefi).
const LEVELS = ['basic', 'intermediate', 'advanced']

// Bir veri ağacındaki TÜM mülakat sorularını sırayla düzleştirir.
function flattenQuestions(tree) {
    const out = []
    const walk = (node) => {
        if (Array.isArray(node)) return node.forEach(walk)
        if (!node || typeof node !== 'object') return
        if (node.type === 'interview-questions') {
            for (const q of node.questions || []) out.push(q)
        }
        for (const value of Object.values(node)) walk(value)
    }
    walk(tree)
    return out
}

// Alan hem düz string hem {tr,en} olabilir (çift-ağaçlı dosyalarda TR ağacındaki
// alan yalnızca `tr` anahtarını taşır) — ikisini de destekle.
function textOf(value, locale) {
    if (!value) return ''
    if (typeof value === 'string') return value
    const other = locale === 'tr' ? 'en' : 'tr'
    return value[locale] || value[other] || ''
}

const showcase = []
const warnings = []

for (let i = 0; i < PAGES.length; i++) {
    const { route, file } = PAGES[i]
    const mod = await import(pathToFileURL(path.join(DATA_DIR, `${file}.js`)).href)
    const data = mod[file] ?? mod.default
    if (!data) { warnings.push(`${file}: export bulunamadı`); continue }

    // Çift ağaçlı dosyada TR ve EN AYRI dizilerdir; tek ağaçlıda ikisi de aynı
    // referanstır ve alanlar {tr,en} taşır. Her iki durumda da aynı kod çalışır.
    const trQuestions = flattenQuestions(data.tr ?? data)
    const enQuestions = flattenQuestions(data.en ?? data.tr ?? data)

    // Diller arası eşleme İNDEKSE dayanır. İki ağacın soru sayısı tutmuyorsa
    // eşleme kayar ve TR soruya EN cevap yapıştırılır — sessiz ve utandırıcı bir
    // hata. Böyle bir durumda sayfayı ATLA, uydurma yapma (CLAUDE.md §23.4).
    if (trQuestions.length !== enQuestions.length) {
        warnings.push(`${file}: tr(${trQuestions.length}) ve en(${enQuestions.length}) soru sayısı tutmuyor — atlandı`)
        continue
    }
    if (!trQuestions.length) { warnings.push(`${file}: interview-questions bulunamadı`); continue }

    const wantedLevel = LEVELS[i % LEVELS.length]
    let index = trQuestions.findIndex((q) => (q.level || '').toLowerCase() === wantedLevel)
    if (index === -1) index = 0 // seviye yoksa ilk soruya düş

    const tr = trQuestions[index]
    const en = enQuestions[index]

    const entry = {
        route,
        level: (tr.level || wantedLevel).toLowerCase(),
        q: { tr: textOf(tr.q, 'tr'), en: textOf(en.q, 'en') },
        a: { tr: textOf(tr.a, 'tr'), en: textOf(en.a, 'en') },
    }

    if (!entry.q.tr || !entry.q.en || !entry.a.tr || !entry.a.en) {
        warnings.push(`${file}: seçilen soruda eksik dil alanı — atlandı`)
        continue
    }
    showcase.push(entry)
}

if (warnings.length) {
    for (const w of warnings) console.warn(`⚠ interview-showcase: ${w}`)
}

// En az 8 soru üretilemiyorsa bu bir içerik/şema regresyonudur: ana sayfadaki
// bölüm de, ona dayanan FAQPage şeması da yarım kalır. Sessizce küçülmesin.
if (showcase.length < 8) {
    console.error(`✖ interview-showcase: yalnızca ${showcase.length} soru üretildi (en az 8 bekleniyor).`)
    process.exit(1)
}

const header = `// OTOMATİK ÜRETİLDİ — elle düzenleme, npm run build sırasında yeniden yazılır.
// Kaynak: scripts/generate-interview-showcase.mjs
//
// Ana sayfadaki herkese açık mülakat ısınma bölümünün verisi. Ders
// sayfalarındaki mülakat sekmesi %60 quiz barajının arkasındadır; burası
// gate'siz ve GÖRÜNÜRDÜR — ana sayfanın FAQPage şeması yalnızca bu görünür
// metinden üretilir, böylece şema ile ekranda yazan şey birebir aynıdır.
`

await mkdir(path.dirname(OUT_PATH), { recursive: true })
await writeFile(OUT_PATH, `${header}\nexport const INTERVIEW_SHOWCASE = ${JSON.stringify(showcase, null, 2)}\n\nexport default INTERVIEW_SHOWCASE\n`)

console.log(`Generated interview showcase: ${showcase.length} questions from ${PAGES.length} pages.`)
