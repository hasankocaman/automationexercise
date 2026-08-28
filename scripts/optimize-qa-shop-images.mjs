#!/usr/bin/env node
// QA Shop — ürün fotoğraflarını vitrine hazırlar.
//
// ── NEDEN AYRI BİR ADIM ─────────────────────────────────────────────────────
// Kullanıcının ürettiği fotoğraflar 1024-2048 piksel ve dosya başına 0.3-2.6 MB
// (ölçüldü: yedi dosya toplam 11 MB). Vitrin kartı bu görseli ~220 piksel,
// ürün detayı ~500 piksel gösteriyor. 2048 piksellik bir dosyayı sunmak
// gereksiz 40 kat veri indirtir ve "kurulum istemeden saniyeler içinde açılan
// dükkân" vaadini zayıflatır.
//
// Ölçüldü: 800px / kalite 80 → 47 KB (orijinal 2622 KB). 800 piksel, detay
// görünümünün retina ihtiyacını da karşılıyor.
//
// ── KAYNAK / TÜREV AYRIMI ───────────────────────────────────────────────────
//   qa-shop/urunler/          → KAYNAK (kullanıcının ürettiği büyük dosyalar)
//   public/qa-shop/urunler/   → TÜREV (vitrine sunulan, optimize edilmiş)
// Kaynak klasör depoya girmez (11 MB); türevler girer (~0.4 MB). Projenin
// diğer türevleriyle (seed, OpenAPI, çekirdek kurallar) aynı mantık.
//
//   npm run qa-shop:gorseller
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const KAYNAK = path.join(KOK, 'qa-shop/urunler')
const HEDEF = path.join(KOK, 'public/qa-shop/urunler')

const BOYUT = 800
const KALITE = 80

// Vitrinin tanıdığı sekiz kategori. Uydurulmuş değil: `siluetTipi()`
// (src/components/QaShopStore.jsx) tam olarak bunları döndürür.
const KATEGORILER = ['shirts', 'tshirts', 'dresses', 'coats', 'jeans', 'boots', 'sneakers', 'bags']

// Her kategoride TEK bir ürün adı var (seed'den ölçüldü) — fotoğrafın o adla
// tutarlı olması vitrinin inandırıcılığını belirleyen şey.
const URUN_ADI = {
    shirts: 'Slim Fit Red Shirt',
    tshirts: 'Classic Black T-Shirt',
    dresses: 'Oversize Beige Dress',
    coats: 'Casual Green Coat',
    jeans: 'Vintage White Jeans',
    boots: 'Basic Navy Boots',
    sneakers: 'Premium Grey Sneakers',
    bags: 'Sport Blue Bag',
}

// Kaynak dosya adı → kategori.
//
// ⚠ Dosya adından ANAHTAR KELİMEYLE otomatik çıkarım yapılmıyor, çünkü
// yanıltıcı: `slim fit red tshirt.webp` dosyasının İÇİ bir gömlek (yakalı,
// düğmeli) ve dükkândaki ürün "Slim Fit Red Shirt". Ada bakan bir eşleyici
// onu `tshirts`e gönderir ve vitrinde tişört yazan kartta gömlek çıkardı.
// Bu yüzden eşleme açık ve gözle doğrulanmış.
//
// Yeni dosya eklerken: ya adını doğrudan kategori yap (`coats.webp`), ya da
// buraya bir satır ekle.
const ELLE_ESLEME = {
    'slim fit red tshirt': 'shirts',        // içerik: kırmızı DÜĞMELİ gömlek
    'oversize beige dress': 'dresses',
    'vintage white jeans': 'jeans',
    'premium grey suede': 'sneakers',
    'lacivert bot': 'boots',
    'denim tote çanta': 'bags',
    'denim tote canta': 'bags',             // Türkçe karakteri olmayan yazım
}

const UZANTILAR = new Set(['.webp', '.avif', '.jpg', '.jpeg', '.png'])

function kategoriCoz(dosya) {
    const taban = path.basename(dosya, path.extname(dosya)).toLowerCase().trim()
    if (ELLE_ESLEME[taban]) return ELLE_ESLEME[taban]
    // Adı doğrudan kategori olan dosyalar (`coats.webp`, `jeans-2.webp`)
    const sirali = [...KATEGORILER].sort((a, b) => b.length - a.length)
    for (const k of sirali) if (taban === k || taban.startsWith(`${k}-`)) return k
    return null
}

async function main() {
    let sharp
    try {
        sharp = (await import('sharp')).default
    } catch {
        console.error('✖ `sharp` bulunamadı. Kur:  npm install -D sharp')
        process.exit(1)
    }

    if (!fs.existsSync(KAYNAK)) {
        console.error(`✖ Kaynak klasör yok: ${path.relative(KOK, KAYNAK)}`)
        console.error('  Ürettiğin fotoğrafları oraya koy, sonra bu komutu çalıştır.')
        process.exit(1)
    }

    fs.mkdirSync(HEDEF, { recursive: true })

    const kapsanan = new Map()
    const atlanan = []
    let kaynakToplam = 0
    let hedefToplam = 0

    for (const dosya of fs.readdirSync(KAYNAK).sort()) {
        if (!UZANTILAR.has(path.extname(dosya).toLowerCase())) continue

        const kategori = kategoriCoz(dosya)
        if (!kategori) { atlanan.push(dosya); continue }

        const kaynakYol = path.join(KAYNAK, dosya)
        // Aynı kategoriye ikinci dosya gelirse `-2`, `-3` diye numaralanır.
        const mevcut = kapsanan.get(kategori)?.length ?? 0
        const cikti = mevcut === 0 ? `${kategori}.webp` : `${kategori}-${mevcut + 1}.webp`

        const buf = await sharp(kaynakYol)
            .resize(BOYUT, BOYUT, { fit: 'cover', position: 'centre' })
            .webp({ quality: KALITE })
            .toBuffer()

        fs.writeFileSync(path.join(HEDEF, cikti), buf)

        kaynakToplam += fs.statSync(kaynakYol).size
        hedefToplam += buf.length
        kapsanan.set(kategori, [...(kapsanan.get(kategori) ?? []), cikti])

        console.log(`  ${cikti.padEnd(16)} ← ${dosya}`)
    }

    console.log('')
    const eksik = KATEGORILER.filter((k) => !kapsanan.has(k))
    for (const k of KATEGORILER) {
        const d = kapsanan.get(k)
        console.log(`  ${k.padEnd(10)} ${d ? `✔ ${d.length} görsel` : `✖ EKSİK — gereken: "${URUN_ADI[k]}"`}`)
    }

    if (atlanan.length) {
        console.warn('\n⚠ Kategorisi çözülemeyen dosyalar (atlandı):')
        atlanan.forEach((d) => console.warn(`   ${d}`))
        console.warn('   Ya adını kategori yap, ya ELLE_ESLEME tablosuna ekle.')
    }

    const mb = (n) => (n / 1048576).toFixed(2)
    console.log(`\n  kaynak ${mb(kaynakToplam)} MB → türev ${mb(hedefToplam)} MB`
        + (kaynakToplam ? `  (%${Math.round((1 - hedefToplam / kaynakToplam) * 100)} küçüldü)` : ''))

    if (eksik.length) {
        console.log(`\n⚠ ${eksik.length} kategori eksik: ${eksik.join(', ')}`)
        console.log('  Bu kategorilerdeki ürünler inline SVG çizimiyle gösterilecek (vitrin bozulmaz).')
    } else {
        console.log('\n✔ Sekiz kategorinin hepsinde fotoğraf var.')
    }
}

main().catch((err) => { console.error('✖ Dönüştürme düştü:', err.message); process.exit(1) })
