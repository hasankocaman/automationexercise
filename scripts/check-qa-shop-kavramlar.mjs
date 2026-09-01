#!/usr/bin/env node
// QA Shop — kavram baloncukları ile sözlük arasındaki tutarlılık kapısı.
//
// ── NEDEN ───────────────────────────────────────────────────────────────────
// Baloncuklar `<Kavram k="..." />` ile yerleştirilir, metinleri ise
// `src/data/qaShopKavramlarData.js`'te durur. İki taraf ayrı olduğu için
// sessizce ayrışabilir ve İKİ YÖNDE de kayıp verir:
//   · Sözlükte olmayan bir anahtar → baloncuk HİÇ render edilmez. Sayfa
//     çalışmaya devam eder, kimse fark etmez, açıklama kaybolur.
//   · Arayüzde kullanılmayan bir sözlük kaydı → yazılmış ama kimseye
//     görünmeyen ölü metin.
//
// ── ÖLÇÜT KONTROLÜ ──────────────────────────────────────────────────────────
// Sözlük YALNIZCA bu uygulamaya mahsus davranışları anlatır; herkesin bildiği
// genel kavramlar (API, database, Swagger, endpoint, sepet) buraya girmez.
// Bunu makine tam olarak ölçemez, ama bilinen genel terimlerin BAŞLIK olarak
// geri sızmasını yakalayabilir.
//
//   node scripts/check-qa-shop-kavramlar.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BILESENLER = [
    'src/components/QaShopPage.jsx',
    'src/components/QaShopApiPage.jsx',
    'src/components/QaShopSetupPage.jsx',
    'src/components/QaShopSpecPage.jsx',
]

const hatalar = []
const ekle = (m) => hatalar.push(m)

const { QA_SHOP_KAVRAMLAR } = await import(
    pathToFileURL(path.join(KOK, 'src/data/qaShopKavramlarData.js')).href
)

// ── Arayüzde kullanılan anahtarları topla ───────────────────────────────────
const kullanilan = new Map()   // anahtar → [dosya, ...]
for (const rel of BILESENLER) {
    const yol = path.join(KOK, rel)
    if (!fs.existsSync(yol)) continue
    const metin = fs.readFileSync(yol, 'utf8')
    for (const es of metin.matchAll(/<Kavram\s+k="([^"]+)"/g)) {
        if (!kullanilan.has(es[1])) kullanilan.set(es[1], [])
        kullanilan.get(es[1]).push(rel)
    }
}

const tanimli = new Set(Object.keys(QA_SHOP_KAVRAMLAR))

// ── 1) Arayüzdeki her anahtar sözlükte var mı ───────────────────────────────
for (const [anahtar, dosyalar] of kullanilan) {
    if (!tanimli.has(anahtar)) {
        ekle(`[1] <Kavram k="${anahtar}"> — sözlükte böyle bir kavram yok (${dosyalar.join(', ')}). Baloncuk hiç render edilmez.`)
    }
}

// ── 2) Sözlükteki her kavram kullanılıyor mu ────────────────────────────────
for (const anahtar of tanimli) {
    if (!kullanilan.has(anahtar)) {
        ekle(`[2] "${anahtar}" sözlükte tanımlı ama hiçbir yerde kullanılmıyor — kimseye görünmeyen ölü metin.`)
    }
}

// ── 3) Her kavram iki dilli ve dolu mu ──────────────────────────────────────
for (const [anahtar, k] of Object.entries(QA_SHOP_KAVRAMLAR)) {
    for (const alan of ['ad', 'ozet']) {
        if (!k[alan]?.tr || !k[alan]?.en) ekle(`[3] "${anahtar}": ${alan} alanı iki dilli değil.`)
    }
    if (k.detay && (!k.detay.tr || !k.detay.en)) ekle(`[3] "${anahtar}": detay alanı iki dilli değil.`)
}

// ── 4) Genel kavram sızıntısı ───────────────────────────────────────────────
// Başlık tek başına genel bir terimse, o kavram muhtemelen buraya ait değil.
// Uygulamaya özgü başlıklar niteleyici taşır ("Sandbox — burada ne demek").
const GENEL_BASLIKLAR = [
    'api', 'database', 'veritabanı', 'swagger', 'openapi', 'endpoint', 'uç',
    'sepet', 'kupon', 'sipariş', 'http', 'json', 'rest', 'base url',
    'istek gövdesi', 'cevap gövdesi', 'request body', 'response body',
    'data-testid', 'seed', 'tohum',
]
for (const [anahtar, k] of Object.entries(QA_SHOP_KAVRAMLAR)) {
    const baslik = String(k.ad?.tr ?? '').trim().toLowerCase()
    if (GENEL_BASLIKLAR.includes(baslik)) {
        ekle(`[4] "${anahtar}" başlığı düz bir genel terim ("${k.ad.tr}"). Sözlük yalnızca BU UYGULAMAYA mahsus davranışları anlatır; genel kavram açıklaması okuyanın zamanını çalar. Başlığı uygulamaya bağla ya da kavramı çıkar.`)
    }
}

// ── Sonuç ───────────────────────────────────────────────────────────────────
if (hatalar.length) {
    console.error('✖ QA Shop kavram kapısı geçilemedi:\n')
    for (const h of hatalar) console.error('   ' + h)
    console.error(`\n   Toplam ${hatalar.length} ihlal.`)
    process.exit(1)
}

console.log(`✔ QA Shop kavramları tutarlı — ${tanimli.size} kavram, hepsi tanımlı ve kullanılıyor.`)
