// QA Shop — tarayıcı içi veri katmanı (sql.js + IndexedDB)
//
// ── NE İŞE YARAR ────────────────────────────────────────────────────────────
// Ziyaretçi Docker kurmadan `/qa-shop`'u açtığında dükkânın arkasında gerçek
// bir ilişkisel veritabanı çalışsın diye. Şema ve veri, lokal Postgres ile
// AYNI kaynaktan türetilir (scripts/build-sqljs-seed.mjs) — iki mod aynı
// veriyi, aynı sütun adlarını, aynı iş kurallarını görür.
//
// ── KALICILIK ───────────────────────────────────────────────────────────────
// Veritabanı ikili olarak IndexedDB'de saklanır. Sebep somut: sepete ürün atıp
// sayfayı yenileyen kullanıcı sepetini kaybederse pratiğin ortasında kopar.
// Yazma işleminden sonra kısa bir gecikmeyle kaydedilir (her INSERT'te değil) —
// 330 KB'lık bir ikiliyi her istekte yazmak arayüzü hissedilir şekilde yavaşlatır.
//
// ── SINIR (dürüstçe) ────────────────────────────────────────────────────────
// Bu katman yalnızca bu sekmede yaşar. DBeaver/JDBC ile bağlanılamaz, Postman
// veya REST Assured dışarıdan erişemez — onlar için Docker katmanı gerekir.
import initSqlJs from 'sql.js'
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url'
import { SQLITE_SEMA, TOHUM_VERI, PBKDF2_TUR, PBKDF2_UZUNLUK } from '../data/generated/qaShopSeed.js'

const IDB_AD = 'qa-shop-browser'
const IDB_DEPO = 'db'
const IDB_ANAHTAR = 'sqlite'

let db = null
let kayitZamanlayici = null

// ─── IndexedDB (küçük sarmalayıcı; ek bağımlılık yok) ───────────────────────

function idbAc() {
    return new Promise((resolve, reject) => {
        const istek = indexedDB.open(IDB_AD, 1)
        istek.onupgradeneeded = () => {
            const veritabani = istek.result
            if (!veritabani.objectStoreNames.contains(IDB_DEPO)) veritabani.createObjectStore(IDB_DEPO)
        }
        istek.onsuccess = () => resolve(istek.result)
        istek.onerror = () => reject(istek.error)
    })
}

async function idbOku() {
    try {
        const veritabani = await idbAc()
        return await new Promise((resolve, reject) => {
            const t = veritabani.transaction(IDB_DEPO, 'readonly')
            const istek = t.objectStore(IDB_DEPO).get(IDB_ANAHTAR)
            istek.onsuccess = () => resolve(istek.result ?? null)
            istek.onerror = () => reject(istek.error)
        })
    } catch {
        // Gizli sekmede veya IndexedDB kapalıyken kalıcılık yoktur ama dükkân
        // yine çalışmalı: veri bellekte tutulur, yenilenince sıfırlanır.
        return null
    }
}

async function idbYaz(ikili) {
    try {
        const veritabani = await idbAc()
        await new Promise((resolve, reject) => {
            const t = veritabani.transaction(IDB_DEPO, 'readwrite')
            t.objectStore(IDB_DEPO).put(ikili, IDB_ANAHTAR)
            t.oncomplete = () => resolve()
            t.onerror = () => reject(t.error)
        })
    } catch { /* kalıcılık yoksa sessizce geç — dükkân çalışmaya devam eder */ }
}

async function idbSil() {
    try {
        const veritabani = await idbAc()
        await new Promise((resolve) => {
            const t = veritabani.transaction(IDB_DEPO, 'readwrite')
            t.objectStore(IDB_DEPO).delete(IDB_ANAHTAR)
            t.oncomplete = () => resolve()
            t.onerror = () => resolve()
        })
    } catch { /* yok sayılır */ }
}

// ─── Şema ve tohum ──────────────────────────────────────────────────────────

// Tarayıcıya özgü tek tablo: defect anahtarları ve gizli tur durumu.
// Postgres'te bu bilgi `sandbox.bug_flags` jsonb sütununda durur; tarayıcıda
// tek bir alan olduğu için ayrı bir tabloya alındı.
const META_SEMA = `
CREATE TABLE IF NOT EXISTS browser_meta (
  anahtar TEXT PRIMARY KEY,
  deger   TEXT
);`

function tohumYukle(veritabani) {
    veritabani.run(SQLITE_SEMA)
    veritabani.run(META_SEMA)
    for (const [tablo, satirlar] of Object.entries(TOHUM_VERI)) {
        if (!satirlar.length) continue
        const sutunlar = Object.keys(satirlar[0])
        const yer = sutunlar.map(() => '?').join(',')
        const stmt = veritabani.prepare(`INSERT INTO ${tablo} (${sutunlar.join(',')}) VALUES (${yer})`)
        for (const r of satirlar) stmt.run(sutunlar.map((c) => r[c]))
        stmt.free()
    }
    veritabani.run("INSERT OR REPLACE INTO browser_meta (anahtar, deger) VALUES ('bug_flags', '{}')")
}

let SQL = null

export async function dbHazirla() {
    if (db) return db
    if (!SQL) SQL = await initSqlJs({ locateFile: () => wasmUrl })

    const kayitli = await idbOku()
    if (kayitli) {
        try {
            db = new SQL.Database(new Uint8Array(kayitli))
            // Kayıtlı ikili eski bir şemadan kalmış olabilir; şemanın gerçekten
            // beklenen tabloları taşıdığını doğrula, taşımıyorsa tohumdan kur.
            db.exec('select count(*) from products')
            db.run(META_SEMA)
            return db
        } catch {
            db = null
            await idbSil()
        }
    }

    db = new SQL.Database()
    tohumYukle(db)
    await idbYaz(db.export())
    return db
}

export async function dbSifirla() {
    if (!SQL) SQL = await initSqlJs({ locateFile: () => wasmUrl })
    if (db) { try { db.close() } catch { /* zaten kapalı */ } }
    db = new SQL.Database()
    tohumYukle(db)
    await idbYaz(db.export())
    return db
}

// Yazma sonrası kalıcılık: her istekte 330 KB yazmak yerine kısa gecikmeyle
// toplanır. Sekme kapanırken bekleyen kayıt varsa hemen yazılır.
export function kaydetGecikmeli() {
    if (!db) return
    clearTimeout(kayitZamanlayici)
    // 400 ms ölçüldü ve KISALTILDI: sepete ekleyip hemen sayfayı yenileyen
    // kullanıcıda kayıt commit olmadan sekme kapanıyordu ve sepet kayboluyordu.
    kayitZamanlayici = setTimeout(() => { idbYaz(db.export()) }, 120)
}

if (typeof window !== 'undefined') {
    // pagehide TEK BAŞINA yetmez: bekleyen kayıt yokken de son durum yazılır,
    // ayrıca sekme gizlenince (visibilitychange) de boşaltılır.
    const bosalt = () => { if (db) { clearTimeout(kayitZamanlayici); idbYaz(db.export()) } }
    window.addEventListener('pagehide', bosalt)
    window.addEventListener('beforeunload', bosalt)
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') bosalt() })
}

// ─── Sorgu yardımcıları ─────────────────────────────────────────────────────

export function sorgu(sql, parametreler = []) {
    const stmt = db.prepare(sql)
    stmt.bind(parametreler)
    const satirlar = []
    while (stmt.step()) satirlar.push(stmt.getAsObject())
    stmt.free()
    return satirlar
}

export function tekSatir(sql, parametreler = []) {
    return sorgu(sql, parametreler)[0] ?? null
}

export function calistir(sql, parametreler = []) {
    db.run(sql, parametreler)
    kaydetGecikmeli()
}

// SQLite'ta INSERT sonrası id: last_insert_rowid(). Ayrı bir sorgu olduğu için
// araya başka bir yazma girerse yanlış id döner — bu katman tek iş parçacığında
// çalıştığından güvenli, ama sıralamayı bozma.
export function ekleVeIdAl(sql, parametreler = []) {
    db.run(sql, parametreler)
    kaydetGecikmeli()
    return tekSatir('select last_insert_rowid() as id')?.id ?? null
}

export function metaOku(anahtar, varsayilan = null) {
    const r = tekSatir('select deger from browser_meta where anahtar = ?', [anahtar])
    if (!r) return varsayilan
    try { return JSON.parse(r.deger) } catch { return varsayilan }
}

export function metaYaz(anahtar, deger) {
    calistir('INSERT OR REPLACE INTO browser_meta (anahtar, deger) VALUES (?, ?)',
        [anahtar, JSON.stringify(deger)])
}

// ─── Parola (WebCrypto PBKDF2 — üreteçle AYNI parametreler) ─────────────────

const onaltilikCoz = (h) => Uint8Array.from(h.match(/.{2}/g).map((b) => parseInt(b, 16)))
const onaltilikYaz = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')

async function pbkdf2(parola, saltHex, tur = PBKDF2_TUR) {
    const anahtar = await crypto.subtle.importKey(
        'raw', new TextEncoder().encode(parola), 'PBKDF2', false, ['deriveBits'])
    const bit = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt: onaltilikCoz(saltHex), iterations: tur, hash: 'SHA-256' },
        anahtar, PBKDF2_UZUNLUK * 8)
    return onaltilikYaz(bit)
}

export async function parolaDogrula(parola, saklanan) {
    const parcalar = String(saklanan ?? '').split('$')
    if (parcalar.length !== 4 || parcalar[0] !== 'pbkdf2') return false
    const tur = Number(parcalar[1])
    const hesaplanan = await pbkdf2(parola, parcalar[2], tur)
    // Sabit süreli karşılaştırma: tarayıcıda zamanlama saldırısı senaryosu
    // gerçekçi değil ama davranış sunucu tarafıyla aynı kalsın.
    if (hesaplanan.length !== parcalar[3].length) return false
    let fark = 0
    for (let i = 0; i < hesaplanan.length; i += 1) fark |= hesaplanan.charCodeAt(i) ^ parcalar[3].charCodeAt(i)
    return fark === 0
}

export async function parolaOzetle(parola) {
    const salt = onaltilikYaz(crypto.getRandomValues(new Uint8Array(16)))
    return ['pbkdf2', String(PBKDF2_TUR), salt, await pbkdf2(parola, salt)].join('$')
}
