#!/usr/bin/env node
// QA Shop — SQL doğrulama paketi ile sayfa verisi arasındaki tutarlılık kapısı.
//
// ── NEDEN ───────────────────────────────────────────────────────────────────
// Sorgular `qa-shop/db/validation-queries.sql`'de, herkese açık dizinleri
// `src/data/qaShopSqlPackData.js`'te, iş kuralı / story / defect eşlemesi ise
// `src/data/qaShopSqlMap.js`'te. Eşleme SQL dosyasının İÇİNDE tutulamaz:
// dosyayı öğrenen de okuyor ve eşleme, test edenin kendisinin kurması gereken
// bağdır. Ayrı dosyada tutmanın bedeli sessiz eskimedir — sorgu eklenir,
// dizine yazılmaz; kural silinir, eşleme onu göstermeye devam eder. Bu kapı
// tam olarak o bedeli ödetir.
//
// ── NE DOĞRULAR ─────────────────────────────────────────────────────────────
//  1. SQL'deki her sorgunun bir "Ne bakar:" satırı var mı
//  2. SQL'deki sorgu kümesi ile herkese açık dizin BİREBİR aynı mı
//  3. Eşlemedeki anahtar kümesi de aynı mı
//  4. Eşlemenin gösterdiği her kural / story / defect gerçekten var mı
//  5. SQL dosyasına cevap sızdıran satır geri gelmiş mi
//
//   node scripts/check-qa-shop-sql-map.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SQL_YOLU = path.join(KOK, 'qa-shop/db/validation-queries.sql')

const hatalar = []
const ekle = (m) => hatalar.push(m)

// ── 1) SQL dosyasını ayrıştır ───────────────────────────────────────────────
// Sorgu başlıkları `-- A1 · ...` biçiminde. F bölümü (defect enjeksiyonu)
// bir kütüphane sorgusu değil, kontrolün kendisini sınayan bloklardır —
// kapsam dışı.
const sqlMetin = fs.readFileSync(SQL_YOLU, 'utf8')
const sqlSatirlar = sqlMetin.split(/\r?\n/)

const sqlIdler = []
for (let i = 0; i < sqlSatirlar.length; i += 1) {
    const es = /^--\s+([A-EG]\d+)\s+·/.exec(sqlSatirlar[i])
    if (!es) continue
    const id = es[1]
    sqlIdler.push(id)

    // Başlığın hemen ardından gelen yorum bloğunda "Ne bakar:" aranır.
    let neBakarVar = false
    for (let j = i + 1; j < sqlSatirlar.length; j += 1) {
        const s = sqlSatirlar[j]
        if (!s.startsWith('--')) break
        if (/^--\s*Ne bakar:/.test(s)) { neBakarVar = true; break }
    }
    if (!neBakarVar) {
        ekle(`[1] ${id}: SQL dosyasında "-- Ne bakar:" satırı yok — sorgunun ne incelediği yazılmamış.`)
    }
}

const yinelenen = sqlIdler.filter((id, i) => sqlIdler.indexOf(id) !== i)
if (yinelenen.length) ekle(`[1] SQL dosyasında yinelenen sorgu id'si: ${[...new Set(yinelenen)].join(', ')}`)

// ── 5) Cevap sızdıran satır geri gelmiş mi ──────────────────────────────────
// Bu satırlar bir zamanlar dosyadaydı ve sorgunun HANGİ defect'i yakaladığını
// peşinen söylüyordu. Eşleme admin tarafına taşındı; geri sızmasın diye kapı.
const SIZINTI_KALIPLARI = [
    /Yakaladığı gerçek bug/i,
    /bug vardır/i,
]
for (const kalip of SIZINTI_KALIPLARI) {
    const satir = sqlSatirlar.findIndex((s) => kalip.test(s))
    if (satir >= 0) {
        ekle(`[5] validation-queries.sql:${satir + 1} cevap sızdıran satır: "${sqlSatirlar[satir].trim()}"`)
    }
}

// ── Veri modüllerini oku ────────────────────────────────────────────────────
const iceriAktar = (rel) => import(pathToFileURL(path.join(KOK, rel)).href)

const { SQL_PACK_GROUPS, SQL_PACK_IDS } = await iceriAktar('src/data/qaShopSqlPackData.js')
const { SQL_CHECK_MAP } = await iceriAktar('src/data/qaShopSqlMap.js')
const { qaShopSpecData } = await iceriAktar('src/data/qaShopSpecData.js')
const { BUG_FLAGS } = await iceriAktar('src/data/generated/qaShopCore/bugFlags.js')

const specBloklari = qaShopSpecData.sections.flatMap((s) => s.blocks)
const kuralIdleri = new Set(specBloklari.filter((b) => b.type === 'ruleCard').map((b) => b.id))
const storyIdleri = new Set(specBloklari.filter((b) => b.type === 'userStory').map((b) => b.id))
const defectAnahtarlari = new Set(Object.keys(BUG_FLAGS))

// ── 2) SQL ↔ herkese açık dizin ─────────────────────────────────────────────
const kumeFarki = (a, b) => a.filter((x) => !b.includes(x))

const dizindeYok = kumeFarki(sqlIdler, SQL_PACK_IDS)
if (dizindeYok.length) {
    ekle(`[2] SQL'de var ama qaShopSqlPackData.js'te yok: ${dizindeYok.join(', ')} — dizine eklenmeli, yoksa sorgu sitede görünmez.`)
}
const sqldeYok = kumeFarki(SQL_PACK_IDS, sqlIdler)
if (sqldeYok.length) {
    ekle(`[2] qaShopSqlPackData.js'te var ama SQL dosyasında yok: ${sqldeYok.join(', ')} — sitede var olmayan bir sorgu tarif ediliyor.`)
}

// Dizindeki her kaydın iki dilli "bakar" alanı olmalı.
for (const grup of SQL_PACK_GROUPS) {
    for (const q of grup.queries) {
        if (!q.bakar || !q.bakar.tr || !q.bakar.en) {
            ekle(`[2] ${q.id}: dizin kaydında iki dilli "bakar" alanı eksik.`)
        }
    }
}

// ── 3) SQL ↔ eşleme ─────────────────────────────────────────────────────────
const eslemeIdleri = Object.keys(SQL_CHECK_MAP)
const eslemedeYok = kumeFarki(sqlIdler, eslemeIdleri)
if (eslemedeYok.length) {
    ekle(`[3] SQL'de var ama qaShopSqlMap.js'te yok: ${eslemedeYok.join(', ')}`)
}
const olusuz = kumeFarki(eslemeIdleri, sqlIdler)
if (olusuz.length) {
    ekle(`[3] qaShopSqlMap.js'te var ama SQL dosyasında yok: ${olusuz.join(', ')} — ölü eşleme.`)
}

// ── 4) Eşlemenin gösterdiği her şey gerçekten var mı ────────────────────────
for (const [sorgu, bag] of Object.entries(SQL_CHECK_MAP)) {
    for (const alan of ['kural', 'story', 'defect']) {
        if (!Array.isArray(bag[alan])) {
            ekle(`[4] ${sorgu}: "${alan}" alanı dizi değil.`)
        }
    }
    for (const k of bag.kural || []) {
        if (!kuralIdleri.has(k)) ekle(`[4] ${sorgu} → ${k}: böyle bir iş kuralı kartı yok.`)
    }
    for (const s of bag.story || []) {
        if (!storyIdleri.has(s)) ekle(`[4] ${sorgu} → ${s}: böyle bir user story yok.`)
    }
    for (const d of bag.defect || []) {
        if (!defectAnahtarlari.has(d)) ekle(`[4] ${sorgu} → ${d}: böyle bir defect anahtarı yok.`)
    }
}

// ── Sonuç ───────────────────────────────────────────────────────────────────
if (hatalar.length) {
    console.error('✖ QA Shop SQL eşleme kapısı geçilemedi:\n')
    for (const h of hatalar) console.error('   ' + h)
    console.error(`\n   Toplam ${hatalar.length} ihlal.`)
    process.exit(1)
}

console.log(`✔ QA Shop SQL eşlemesi tutarlı — ${sqlIdler.length} sorgu, dizin ve eşleme birebir örtüşüyor.`)
