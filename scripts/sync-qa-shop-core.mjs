#!/usr/bin/env node
// QA Shop çekirdek iş kurallarının TÜREV senkronu.
//
// ── NEDEN ───────────────────────────────────────────────────────────────────
// Fiyat hesabı, stok/kupon kuralları ve kusur anahtarları TEK YERDE yazılır:
// `qa-shop/api/src/core/`. Bu modüller bilinçli olarak saftır — Express ve
// PostgreSQL bilmezler — çünkü aynı mantığın hem Node API'sinde hem tarayıcı
// içi katmanda koşması baştan hedeflenmişti.
//
// Tarayıcı katmanı bu dosyaları DOĞRUDAN import etseydi ana site `qa-shop/`
// klasörünün iç yollarına bağlanırdı; iki taraf birbirinden habersiz kalsın
// diye türev buraya kopyalanır ve hash'i build'de doğrulanır.
//
// İkinci bir kopya ELLE YAZILMAZ: kusur gizleme mantığının iki ayrı sürümü
// olsaydı biri düzeltilip diğeri unutulduğunda gizli tur sessizce cevabı
// sızdırırdı.
//
//   node scripts/sync-qa-shop-core.mjs --write   → türevi yeniler
//   node scripts/sync-qa-shop-core.mjs           → yalnızca doğrular
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const KAYNAK_DIZIN = path.join(KOK, 'qa-shop/api/src/core')
const HEDEF_DIZIN = path.join(KOK, 'src/data/generated/qaShopCore')
const MODULLER = ['pricing.js', 'rules.js', 'bugFlags.js']

const BASLIK = `// ÜRETİLMİŞ DOSYA — ELLE DÜZENLEME.
//
// Kaynak: qa-shop/api/src/core/%AD%
// Senkron: scripts/sync-qa-shop-core.mjs --write
//
// Bu modül hem Node API'sinde hem tarayıcı içi katmanda AYNI kuralları
// çalıştırır. Buradaki bir düzeltme kaynağa yazılmazsa iki taraf ayrışır;
// build hash kontrolü bunu kırar.
/* eslint-disable */
`

function dosyaHash(icerik) {
    return crypto.createHash('sha256').update(icerik).digest('hex').slice(0, 16)
}

function kaynakOku() {
    const cikti = {}
    for (const ad of MODULLER) {
        const yol = path.join(KAYNAK_DIZIN, ad)
        if (!fs.existsSync(yol)) {
            console.error(`✖ Çekirdek modül bulunamadı: qa-shop/api/src/core/${ad}`)
            process.exit(1)
        }
        cikti[ad] = fs.readFileSync(yol, 'utf8')
    }
    return cikti
}

function yaz() {
    fs.mkdirSync(HEDEF_DIZIN, { recursive: true })
    const kaynaklar = kaynakOku()
    const damga = {}
    for (const [ad, icerik] of Object.entries(kaynaklar)) {
        damga[ad] = dosyaHash(icerik)
        fs.writeFileSync(path.join(HEDEF_DIZIN, ad), BASLIK.replace('%AD%', ad) + icerik)
        console.log(`  ✔ ${ad}  (${damga[ad]})`)
    }
    fs.writeFileSync(path.join(HEDEF_DIZIN, 'damga.json'), JSON.stringify(damga, null, 2) + '\n')
    console.log(`\n✔ ${MODULLER.length} çekirdek modül senkronlandı.`)
}

function dogrula() {
    const damgaYolu = path.join(HEDEF_DIZIN, 'damga.json')
    if (!fs.existsSync(damgaYolu)) {
        console.error('✖ Çekirdek türevi yok. Çalıştır: node scripts/sync-qa-shop-core.mjs --write')
        process.exit(1)
    }
    const damga = JSON.parse(fs.readFileSync(damgaYolu, 'utf8'))
    const kaynaklar = kaynakOku()
    const kayanlar = []
    for (const [ad, icerik] of Object.entries(kaynaklar)) {
        const simdi = dosyaHash(icerik)
        if (damga[ad] !== simdi) kayanlar.push(`${ad}: türev ${damga[ad] ?? '(yok)'} ≠ kaynak ${simdi}`)
        if (!fs.existsSync(path.join(HEDEF_DIZIN, ad))) kayanlar.push(`${ad}: türev dosyası silinmiş`)
    }
    if (kayanlar.length) {
        console.error('\n✖ Çekirdek türevi KAYNAKTAN KAYMIŞ:')
        kayanlar.forEach((k) => console.error(`  ${k}`))
        console.error('  Çözüm:  node scripts/sync-qa-shop-core.mjs --write')
        process.exit(1)
    }
    console.log(`Çekirdek türevi kaynakla uyumlu (${MODULLER.length} modül).`)
}

if (process.argv.includes('--write')) yaz()
else dogrula()
