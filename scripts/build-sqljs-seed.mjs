#!/usr/bin/env node
// QA Shop — tarayıcı içi (sql.js) veri katmanının TÜREV üreteci.
//
// ── NEDEN BU DOSYA VAR ──────────────────────────────────────────────────────
// Şema ve seed veri TEK KAYNAKTIR: `qa-shop/db/schema.sql` + `qa-shop/db/seed.sql`.
// Aynı veri iki yere gider (Docker Postgres, tarayıcı içi sql.js). İki yerde
// ELLE tutulan şema kaçınılmaz olarak birbirinden kayar — bu projede çift veri
// ağacının bozulması tam olarak böyle yaşandı.
//
// ── NEDEN "ÇEVİRİCİ" DEĞİL "DÖKÜMCÜ" ───────────────────────────────────────
// İlk akla gelen yol, schema.sql'i regex'le SQLite'a çevirmekti. Ölçüldü ve
// reddedildi: 793 satırda 7 `generate_series`, 3 plpgsql fonksiyonu, jsonb,
// uuid, interval ve 17 tip cast'i var. Elle yazılmış bir çevirici bunların
// hepsini bugün doğru yapsa bile, kaynak dosya değiştiğinde SESSİZCE yanlış
// veri üretmeye başlardı — kaçınmaya çalıştığımız ayrışmanın ta kendisi.
//
// Bunun yerine üreteç ÇALIŞAN Postgres'ten döker:
//   · Tablo/sütun listesi `information_schema`'dan okunur — tahmin yok.
//   · Satırlar ŞABLON sandbox'tan JSON olarak alınır.
//   · Çıktı sql.js'e GERÇEKTEN yüklenerek doğrulanır; yüklenmezse üretim düşer.
//
// Üretim geliştiricinin makinesinde (Docker açıkken) koşar. CI'da Docker
// gerekmez: build zinciri yalnızca HASH DOĞRULAR. Kaynak dosya değişip türev
// yenilenmediyse build kırmızıya döner.
//
//   node scripts/build-sqljs-seed.mjs --generate   → türevi yeniden üretir
//   node scripts/build-sqljs-seed.mjs              → yalnızca hash doğrular
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const KAYNAKLAR = [
    path.join(KOK, 'qa-shop/db/schema.sql'),
    path.join(KOK, 'qa-shop/db/seed.sql'),
]
const CIKTI = path.join(KOK, 'src/data/generated/qaShopSeed.js')

const SABLON_ID = '00000000-0000-0000-0000-000000000000'
const KAP = process.env.QA_SHOP_DB_CONTAINER || 'qashop-db'

// Tarayıcıda tek bir veri alanı vardır; çok kiracılılık orada anlamsızdır.
// `sandbox` tablosu ile denetim kaydı dökülmez: ilki tarayıcı tarafında
// yönetilir, ikincisi kullanım sırasında dolar.
const ATLANAN_TABLOLAR = new Set(['sandbox', 'audit_log'])

// PBKDF2 parametreleri tarayıcı tarafıyla BİREBİR aynı olmalı; tek bir sayı
// kayarsa doğrulama sessizce hep false döner ve giriş hiç çalışmaz.
const PBKDF2_TUR = 100000
const PBKDF2_UZUNLUK = 32

// ─── Yardımcılar ────────────────────────────────────────────────────────────

function psql(sorgu) {
    return execFileSync('docker', [
        'exec', KAP, 'psql', '-U', 'qashop', '-d', 'qashop', '-t', '-A', '-c', sorgu,
    ], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }).trim()
}

export function kaynakHash() {
    const h = crypto.createHash('sha256')
    for (const dosya of KAYNAKLAR) h.update(fs.readFileSync(dosya))
    return h.digest('hex').slice(0, 32)
}

// Postgres tipi → SQLite tipi.
//
// SQLite'ın tip sistemi esnektir (type affinity); amaç birebir eşleme değil,
// sayısal alanların metin gibi sıralanmaması.
const TIP_ESLEME = {
    bigint: 'INTEGER', integer: 'INTEGER', smallint: 'INTEGER',
    boolean: 'INTEGER', numeric: 'REAL', 'double precision': 'REAL',
}
const sqliteTipi = (pgTip) => TIP_ESLEME[pgTip] ?? 'TEXT'

function tablolariOku() {
    return psql(`
        select table_name from information_schema.tables
         where table_schema='public' and table_type='BASE TABLE'
         order by table_name`).split('\n').filter(Boolean)
        .filter((t) => !ATLANAN_TABLOLAR.has(t))
}

function sutunlariOku(tablo) {
    return psql(`
        select column_name || '~' || data_type
          from information_schema.columns
         where table_schema='public' and table_name='${tablo}'
         order by ordinal_position`)
        .split('\n').filter(Boolean)
        .map((s) => { const [ad, tip] = s.split('~'); return { ad, tip } })
}

function birincilAnahtar(tablo) {
    return psql(`
        select a.attname
          from pg_index i
          join pg_attribute a on a.attrelid = i.indrelid and a.attnum = any(i.indkey)
         where i.indrelid = '${tablo}'::regclass and i.indisprimary`)
        .split('\n').filter(Boolean)
}

function satirlariOku(tablo, sutunlar) {
    const sandboxli = sutunlar.some((s) => s.ad === 'sandbox_id')
    const nerede = sandboxli ? `where sandbox_id = '${SABLON_ID}'` : ''
    // json_agg boş tabloda NULL döner; coalesce ile boş diziye çekilir.
    const ham = psql(`
        select coalesce(json_agg(t order by 1)::text, '[]')
          from (select * from ${tablo} ${nerede}) t`)
    return JSON.parse(ham || '[]')
}

// ─── DDL üretimi ────────────────────────────────────────────────────────────

function ddlUret(tablo, sutunlar, pk) {
    const tekTamsayiPk = pk.length === 1
        && sqliteTipi(sutunlar.find((s) => s.ad === pk[0])?.tip) === 'INTEGER'

    const alanlar = sutunlar.map((s) => {
        const tip = sqliteTipi(s.tip)
        // Tek sütunlu tamsayı birincil anahtar AUTOINCREMENT olur: tarayıcıda
        // yeni sipariş/sepet satırı eklenirken id üretimi gerekiyor.
        if (tekTamsayiPk && pk[0] === s.ad) return `  ${s.ad} INTEGER PRIMARY KEY AUTOINCREMENT`
        return `  ${s.ad} ${tip}`
    })
    if (!tekTamsayiPk && pk.length) alanlar.push(`  PRIMARY KEY (${pk.join(', ')})`)
    return `CREATE TABLE ${tablo} (\n${alanlar.join(',\n')}\n);`
}

// ─── Değer normalleştirme ───────────────────────────────────────────────────

// jsonb ve dizi alanları JSON metnine, boolean 0/1'e çevrilir. Tarayıcı
// katmanı bunları okurken aynı dönüşümü ters uygular.
function normalize(deger, pgTip) {
    if (deger === null || deger === undefined) return null
    if (pgTip === 'boolean') return deger ? 1 : 0
    if (typeof deger === 'object') return JSON.stringify(deger)
    if (pgTip === 'numeric' || pgTip === 'double precision') return Number(deger)
    return deger
}

// ─── Parola özeti dönüşümü ──────────────────────────────────────────────────
//
// Node API'si scrypt kullanır (lib/password.js). WebCrypto'da scrypt YOKTUR;
// tarayıcı katmanı parolayı doğrulayamazdı ve "yanlış parola → 401" adımı hiç
// çalışmazdı. Bu yüzden seed kullanıcıların özeti PBKDF2-SHA256'ya çevrilir —
// tarayıcının yerleşik olarak desteklediği türev fonksiyon.
//
// Parola TAHMİN EDİLMEZ: seed.sql'de yazan değer okunur ve gerçekten o
// kullanıcının scrypt özetini açıp açmadığı DOĞRULANIR. Açmıyorsa üretim düşer.

function tohumParolasiniOku() {
    const metin = fs.readFileSync(KAYNAKLAR[1], 'utf8')
    const esleme = metin.match(/Demo parolas[ıi][^:]*:\s*(\S+)/)
    if (!esleme) {
        throw new Error('seed.sql içinde demo parolası satırı bulunamadı — parola dönüşümü yapılamaz')
    }
    return esleme[1].trim()
}

function scryptDogrula(parola, saklanan) {
    const parcalar = String(saklanan).split('$')
    const [onek, saltHex, hashHex] = parcalar
    if (onek !== 'scrypt' || !saltHex || !hashHex) return false
    const turetilen = crypto.scryptSync(parola, Buffer.from(saltHex, 'hex'), 64)
    const beklenen = Buffer.from(hashHex, 'hex')
    return beklenen.length === turetilen.length && crypto.timingSafeEqual(beklenen, turetilen)
}

function pbkdf2Uret(parola, saltHex) {
    const ozet = crypto.pbkdf2Sync(parola, Buffer.from(saltHex, 'hex'), PBKDF2_TUR, PBKDF2_UZUNLUK, 'sha256')
    return ['pbkdf2', String(PBKDF2_TUR), saltHex, ozet.toString('hex')].join('$')
}

function parolalariCevir(kullanicilar, tohumParola) {
    let dogrulanan = 0
    const cikti = kullanicilar.map((u, i) => {
        if (!scryptDogrula(tohumParola, u.password_hash)) return u
        dogrulanan += 1
        // Salt kullanıcı sırasından türetilir: üretim belirlenimci kalsın,
        // aynı kaynaktan her seferinde aynı türev çıksın.
        const salt = crypto.createHash('sha256').update(`qa-shop-seed-${i}`).digest('hex').slice(0, 32)
        return { ...u, password_hash: pbkdf2Uret(tohumParola, salt) }
    })
    if (!dogrulanan) {
        throw new Error(`seed.sql'deki parola ("${tohumParola}") hiçbir kullanıcının özetini açmadı — dönüşüm güvenilir değil`)
    }
    return { cikti, dogrulanan }
}

// ─── Üretim ─────────────────────────────────────────────────────────────────

async function uret() {
    console.log('QA Shop sql.js türevi üretiliyor…')
    console.log(`  kaynak hash: ${kaynakHash()}`)

    let tablolar
    try {
        tablolar = tablolariOku()
    } catch (err) {
        console.error(`\n✖ Postgres'e ulaşılamadı (konteyner: ${KAP}).`)
        console.error('  Üretim için yığın ayakta olmalı:  cd qa-shop && docker compose up -d')
        console.error(`  Ayrıntı: ${err.message.split('\n')[0]}`)
        process.exit(1)
    }

    const tohumParola = tohumParolasiniOku()
    const ddl = []
    const veri = {}
    const tipHaritasi = {}
    let toplamSatir = 0

    for (const tablo of tablolar) {
        const sutunlar = sutunlariOku(tablo)
        const pk = birincilAnahtar(tablo)
        ddl.push(ddlUret(tablo, sutunlar, pk))

        const satirlar = satirlariOku(tablo, sutunlar)
        tipHaritasi[tablo] = Object.fromEntries(sutunlar.map((s) => [s.ad, s.tip]))
        veri[tablo] = satirlar.map((r) => {
            const cikti = {}
            for (const s of sutunlar) cikti[s.ad] = normalize(r[s.ad], s.tip)
            return cikti
        })

        if (tablo === 'users') {
            const { cikti, dogrulanan } = parolalariCevir(veri[tablo], tohumParola)
            veri[tablo] = cikti
            console.log(`  ↳ parola özeti: ${dogrulanan}/${cikti.length} kullanıcı scrypt → PBKDF2`)
        }

        toplamSatir += veri[tablo].length
        console.log(`  ${tablo.padEnd(18)} ${String(veri[tablo].length).padStart(5)} satır`)
    }

    // ── Doğrulama: çıktı sql.js'e GERÇEKTEN yükleniyor mu ───────────────────
    // "Ürettim" demek yetmez; üretilen şey çalışmıyorsa türev bozuktur ve bunu
    // ancak kullanıcı fark ederdi.
    const initSqlJs = (await import('sql.js')).default
    const SQL = await initSqlJs()
    const db = new SQL.Database()
    db.run(ddl.join('\n'))
    for (const [tablo, satirlar] of Object.entries(veri)) {
        if (!satirlar.length) continue
        const sutunlar = Object.keys(satirlar[0])
        const yer = sutunlar.map(() => '?').join(',')
        const stmt = db.prepare(`INSERT INTO ${tablo} (${sutunlar.join(',')}) VALUES (${yer})`)
        for (const r of satirlar) stmt.run(sutunlar.map((c) => r[c]))
        stmt.free()
    }
    const urunSayisi = db.exec('select count(*) from products')[0].values[0][0]
    const enUcuz = db.exec('select price from products order by price asc limit 1')[0].values[0][0]
    db.close()
    if (!urunSayisi) throw new Error('Doğrulama düştü: products tablosu boş yüklendi')
    if (typeof enUcuz !== 'number') throw new Error(`Doğrulama düştü: fiyat sayı değil (${typeof enUcuz})`)
    console.log(`  ✔ sql.js doğrulaması: ${urunSayisi} ürün, en ucuz ${enUcuz}`)

    const govde = [
        '// ÜRETİLMİŞ DOSYA — ELLE DÜZENLEME.',
        '//',
        '// Kaynak: qa-shop/db/schema.sql + qa-shop/db/seed.sql',
        '// Üreten: scripts/build-sqljs-seed.mjs  (npm run qa-shop:seed)',
        '//',
        '// Kaynak dosyalar değişip bu türev yenilenmezse build kırılır — hash',
        '// kontrolü build zincirindedir. Bu bilinçli: şema iki yerde elle',
        '// tutulursa kaçınılmaz olarak ayrışır.',
        '//',
        '// NOT: parola özetleri Postgres\'teki scrypt yerine PBKDF2-SHA256\'dır.',
        '// WebCrypto scrypt desteklemez; dönüşüm üretim sırasında doğrulanır.',
        '/* eslint-disable */',
        '',
        `export const KAYNAK_HASH = ${JSON.stringify(kaynakHash())}`,
        `export const URETIM_ZAMANI = ${JSON.stringify(new Date().toISOString())}`,
        `export const TOPLAM_SATIR = ${toplamSatir}`,
        `export const PBKDF2_TUR = ${PBKDF2_TUR}`,
        `export const PBKDF2_UZUNLUK = ${PBKDF2_UZUNLUK}`,
        '',
        `export const SQLITE_SEMA = ${JSON.stringify(ddl.join('\n'))}`,
        '',
        `export const SUTUN_TIPLERI = ${JSON.stringify(tipHaritasi)}`,
        '',
        `export const TOHUM_VERI = ${JSON.stringify(veri)}`,
        '',
    ].join('\n')

    fs.mkdirSync(path.dirname(CIKTI), { recursive: true })
    fs.writeFileSync(CIKTI, govde)
    const kb = Math.round(Buffer.byteLength(govde) / 1024)
    console.log(`\n✔ ${path.relative(KOK, CIKTI)} yazıldı — ${toplamSatir} satır, ${kb} KB`)
}

// ─── Doğrulama (build zinciri bunu koşar) ───────────────────────────────────

function dogrula() {
    if (!fs.existsSync(CIKTI)) {
        console.error('✖ sql.js türevi yok: src/data/generated/qaShopSeed.js')
        console.error('  Üret:  npm run qa-shop:seed   (Docker açıkken)')
        process.exit(1)
    }
    const icerik = fs.readFileSync(CIKTI, 'utf8')
    const turevHash = icerik.match(/export const KAYNAK_HASH = "([a-f0-9]+)"/)?.[1]
    const guncelHash = kaynakHash()

    if (turevHash !== guncelHash) {
        console.error('\n✖ sql.js türevi KAYNAKTAN KAYMIŞ.')
        console.error(`  türevdeki hash : ${turevHash ?? '(okunamadı)'}`)
        console.error(`  kaynak hash    : ${guncelHash}`)
        console.error('  qa-shop/db/schema.sql veya seed.sql değişmiş ama türev yenilenmemiş.')
        console.error('  Çözüm (Docker açıkken):  npm run qa-shop:seed')
        process.exit(1)
    }
    const satir = icerik.match(/export const TOPLAM_SATIR = (\d+)/)?.[1] ?? '?'
    console.log(`sql.js türevi kaynakla uyumlu (${satir} satır, hash ${guncelHash}).`)
}

if (process.argv.includes('--generate')) {
    uret().catch((err) => { console.error('✖ Üretim düştü:', err.message); process.exit(1) })
} else {
    dogrula()
}
