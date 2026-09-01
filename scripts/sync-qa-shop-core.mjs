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

// ⚠ SATIR SONU NORMALIZE EDİLİR — bu bir gevşetme DEĞİL.
//
// Ölçüldü (2026-09-01): bu depoda satır sonları karışık ve git, checkout
// sırasında LF'i CRLF'e çevirebiliyor. `main`'e geçildiğinde `bugFlags.js`
// kaynağının BAYTLARI değişti, hash'i kaydı ve kapı "çekirdek türevi
// kaynaktan kaymış" diye push'u durdurdu — oysa türevin gövdesi kaynakla
// BİREBİR aynıydı, tek fark satır sonlarıydı.
//
// Kapının işi iki tarafın İÇERİĞİNİN ayrışmasını yakalamaktır; satır sonu
// gösterimi içerik değildir. Normalize etmek yanlış-pozitifi kaldırır ve
// gerçek bir kural değişikliğini yakalama gücünü aynen korur: bir karakter
// bile değişse hash yine kayar.
function dosyaHash(icerik) {
    const normalize = icerik.replace(/\r\n/g, '\n')
    return crypto.createHash('sha256').update(normalize).digest('hex').slice(0, 16)
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
        if (damga[ad] !== simdi) kayanlar.push(`${ad}: damga ${damga[ad] ?? '(yok)'} ≠ kaynak ${simdi}`)

        const turevYolu = path.join(HEDEF_DIZIN, ad)
        if (!fs.existsSync(turevYolu)) {
            kayanlar.push(`${ad}: türev dosyası silinmiş`)
            continue
        }

        // Damga ile kaynağı karşılaştırmak TEK BAŞINA yetmez: türev dosyanın
        // GÖVDESİ elle düzenlenirse damga hâlâ kaynağa uyar ve kapı yeşil
        // kalırdı. Dosyanın kendi başlığı "ELLE DÜZENLEME" diyor ama bunu
        // hiçbir şey zorlamıyordu — kusur gizleme mantığının iki sürümü tam
        // da böyle ayrışır.
        const turev = fs.readFileSync(turevYolu, 'utf8')
        const ayrac = '/* eslint-disable */'
        const kesim = turev.indexOf(ayrac)
        if (kesim === -1) {
            kayanlar.push(`${ad}: türev dosyasının üretilmiş başlığı bozulmuş`)
            continue
        }
        const govde = turev.slice(turev.indexOf('\n', kesim) + 1)
        if (govde.replace(/\r\n/g, '\n') !== icerik.replace(/\r\n/g, '\n')) {
            kayanlar.push(`${ad}: türev dosyasının GÖVDESİ kaynaktan farklı (elle mi düzenlendi?)`)
        }
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
