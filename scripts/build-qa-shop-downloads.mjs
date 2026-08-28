// QA Shop — indirilebilir paketleri üretir.
//
// NEDEN VAR: Postman koleksiyonu (6 klasör, negatif istekler dahil) ve
// REST Assured başlangıç projesi depoda AYLARDIR duruyordu ama siteden
// hiçbir yere bağlı değildi. Kurulum rehberini okuyan kişi ikisinin de
// varlığından haberdar olmuyordu; ölçüldü, aktif olarak arayan bir inceleme
// bile bulamadı. Paketi üretmek yetmiyor — indirilebilir olması gerekiyor.
//
// NE YAPAR: kaynak dosyaları `public/qa-shop/indirilebilir/` altına kopyalar
// ve REST Assured projesini tek bir zip'e toplar. `vite build` `public/`
// içeriğini olduğu gibi `dist/`e taşıdığı için dosyalar yayında
// `/qa-shop/indirilebilir/...` adresinden inilebilir olur.
//
// NEDEN DEPOYA GİRMİYOR: çıktı türevdir ve her build'de kaynaktan yeniden
// üretilir (`.gitignore`). Depoya girseydi kaynak değişip türev unutulduğunda
// site eski koleksiyonu dağıtırdı — sessiz ve fark edilmesi zor bir hata.
// Zip ayrıca ikili bir dosya: her üretimde diff üreterek geçmişi kirletirdi.
//
// Zip yazıcısı elle yazıldı: projeye arşiv bağımlılığı eklemek, tek bir
// dosya formatı için bütün bir paket ağacı taşımak olurdu.
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const HEDEF = path.join(KOK, 'public', 'qa-shop', 'indirilebilir')

// Kopyalanacak tekil dosyalar: kaynak → yayındaki ad.
const DOSYALAR = [
    ['qa-shop/postman/qa-shop.postman_collection.json', 'qa-shop.postman_collection.json'],
    ['qa-shop/postman/qa-shop.postman_environment.json', 'qa-shop.postman_environment.json'],
    ['qa-shop/postman/README.md', 'postman-README.md'],
    // SQL doğrulama paketi. Kurulum rehberi bunu bir zamanlar YALNIZCA repo
    // yoluyla ("qa-shop/db/validation-queries.sql dosyasını aç") tarif
    // ediyordu; repoyu indirmeyen kullanıcının açacağı böyle bir dosya YOK.
    // Yayınlanan veritabanı imajının içinde duruyor ama orası konteynerin
    // içi — DBeaver'da File > Open File ile açılamaz.
    ['qa-shop/db/validation-queries.sql', 'qa-shop-validation-queries.sql'],
]

// Zip'e girecek proje: kaynak klasör → yayındaki zip adı.
const REST_ASSURED_KAYNAK = 'qa-shop/rest-assured'
const REST_ASSURED_ZIP = 'qa-shop-rest-assured-starter.zip'

// `target/` Maven'in derleme çıktısı: 5 MB'lık .class ve rapor dosyası.
// Başlangıç projesine koymak, kullanıcıya kendi makinesinde üretilecek olan
// çöpü indirtmek olurdu.
const HARIC = new Set(['target', '.git', 'node_modules'])

// ─── CRC-32 (zip zorunlu kılar) ─────────────────────────────────────────────
const CRC_TABLOSU = (() => {
    const t = new Int32Array(256)
    for (let n = 0; n < 256; n += 1) {
        let c = n
        for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
        t[n] = c
    }
    return t
})()

function crc32(buf) {
    let c = -1
    for (let i = 0; i < buf.length; i += 1) c = CRC_TABLOSU[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
    return (c ^ -1) >>> 0
}

// ─── Küçük zip yazıcısı (deflate) ───────────────────────────────────────────
//
// Zaman damgası SABİT (1980-01-01). Belirlenimci çıktı, aynı kaynaktan aynı
// baytları üretir; "dosya değişti mi" sorusu içeriğe bakarak cevaplanabilir.
const DOS_SAAT = 0
const DOS_TARIH = 33   // (1980-1980)<<9 | 1<<5 | 1

function zipUret(girdiler) {
    const yerel = []
    const merkez = []
    let ofset = 0

    for (const { ad, icerik } of girdiler) {
        const adBaytlari = Buffer.from(ad, 'utf8')
        const sikistirilmis = zlib.deflateRawSync(icerik, { level: 9 })
        const ozet = crc32(icerik)

        const baslik = Buffer.alloc(30)
        baslik.writeUInt32LE(0x04034b50, 0)   // yerel dosya başlığı imzası
        baslik.writeUInt16LE(20, 4)           // gereken sürüm
        baslik.writeUInt16LE(0, 6)            // bayraklar
        baslik.writeUInt16LE(8, 8)            // yöntem: deflate
        baslik.writeUInt16LE(DOS_SAAT, 10)
        baslik.writeUInt16LE(DOS_TARIH, 12)
        baslik.writeUInt32LE(ozet, 14)
        baslik.writeUInt32LE(sikistirilmis.length, 18)
        baslik.writeUInt32LE(icerik.length, 22)
        baslik.writeUInt16LE(adBaytlari.length, 26)
        baslik.writeUInt16LE(0, 28)           // ek alan yok

        yerel.push(baslik, adBaytlari, sikistirilmis)

        const merkezKayit = Buffer.alloc(46)
        merkezKayit.writeUInt32LE(0x02014b50, 0)   // merkezi dizin imzası
        merkezKayit.writeUInt16LE(20, 4)           // üreten sürüm
        merkezKayit.writeUInt16LE(20, 6)           // gereken sürüm
        merkezKayit.writeUInt16LE(0, 8)
        merkezKayit.writeUInt16LE(8, 10)
        merkezKayit.writeUInt16LE(DOS_SAAT, 12)
        merkezKayit.writeUInt16LE(DOS_TARIH, 14)
        merkezKayit.writeUInt32LE(ozet, 16)
        merkezKayit.writeUInt32LE(sikistirilmis.length, 20)
        merkezKayit.writeUInt32LE(icerik.length, 24)
        merkezKayit.writeUInt16LE(adBaytlari.length, 28)
        merkezKayit.writeUInt16LE(0, 30)           // ek alan
        merkezKayit.writeUInt16LE(0, 32)           // yorum
        merkezKayit.writeUInt16LE(0, 34)           // disk
        merkezKayit.writeUInt16LE(0, 36)           // iç öznitelik
        merkezKayit.writeUInt32LE(0, 38)           // dış öznitelik
        merkezKayit.writeUInt32LE(ofset, 42)
        merkez.push(merkezKayit, adBaytlari)

        ofset += baslik.length + adBaytlari.length + sikistirilmis.length
    }

    const merkezGovde = Buffer.concat(merkez)
    const son = Buffer.alloc(22)
    son.writeUInt32LE(0x06054b50, 0)          // merkezi dizin sonu imzası
    son.writeUInt16LE(0, 4)
    son.writeUInt16LE(0, 6)
    son.writeUInt16LE(girdiler.length, 8)
    son.writeUInt16LE(girdiler.length, 10)
    son.writeUInt32LE(merkezGovde.length, 12)
    son.writeUInt32LE(ofset, 16)
    son.writeUInt16LE(0, 20)

    return Buffer.concat([...yerel, merkezGovde, son])
}

function dosyalariTopla(kok, gorece = '') {
    const bulunan = []
    const tam = path.join(kok, gorece)
    for (const girdi of fs.readdirSync(tam, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
        if (HARIC.has(girdi.name)) continue
        const altYol = gorece ? `${gorece}/${girdi.name}` : girdi.name
        if (girdi.isDirectory()) bulunan.push(...dosyalariTopla(kok, altYol))
        else bulunan.push(altYol)
    }
    return bulunan
}

// ─── Çalıştır ───────────────────────────────────────────────────────────────
fs.mkdirSync(HEDEF, { recursive: true })

let kopyalanan = 0
for (const [kaynak, ad] of DOSYALAR) {
    const yol = path.join(KOK, kaynak)
    if (!fs.existsSync(yol)) throw new Error(`QA Shop indirilebilir: kaynak yok — ${kaynak}`)
    fs.copyFileSync(yol, path.join(HEDEF, ad))
    kopyalanan += 1
}

const raKok = path.join(KOK, REST_ASSURED_KAYNAK)
if (!fs.existsSync(raKok)) throw new Error(`QA Shop indirilebilir: kaynak yok — ${REST_ASSURED_KAYNAK}`)

const raDosyalar = dosyalariTopla(raKok)
if (raDosyalar.length === 0) throw new Error('QA Shop indirilebilir: REST Assured projesinde dosya bulunamadı')

// Zip içinde tek bir kök klasör: kullanıcı arşivi açtığında bulunduğu dizine
// on dosya saçılmasın, `qa-shop-rest-assured/` klasörü çıksın.
const zip = zipUret(raDosyalar.map((gorece) => ({
    ad: `qa-shop-rest-assured/${gorece}`,
    icerik: fs.readFileSync(path.join(raKok, gorece)),
})))
fs.writeFileSync(path.join(HEDEF, REST_ASSURED_ZIP), zip)

const kb = (n) => `${(n / 1024).toFixed(1)} KB`
console.log(`✔ QA Shop indirilebilir: ${kopyalanan} dosya + ${REST_ASSURED_ZIP} (${raDosyalar.length} dosya, ${kb(zip.length)})`)
