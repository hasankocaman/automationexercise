#!/usr/bin/env node
// QA Shop — ürün fotoğrafı manifesti.
//
// ── NEDEN MANIFEST ──────────────────────────────────────────────────────────
// Vitrin bileşeni "bu kategorinin fotoğrafı var mı?" sorusunu SENKRON bilmek
// zorunda. Bilmezse her ürün için `<img>` basıp dosya yoksa `onError` ile
// SVG'ye düşmek gerekir — bu da dosya yokken 404 üretir. 404, tarayıcı
// konsoluna hata yazar ve testlerdeki "console/page hatası yok" iddiasını
// kırar (CI'da bu klasör boştur).
//
// Bu yüzden klasör build öncesi TARANIR ve elde edilen liste bir modüle
// yazılır. Bileşen listeyi okur; listede yoksa hiç `<img>` denemez.
//
// ── NEDEN BUILD ZİNCİRİNDE DOĞRULAMA YOK ────────────────────────────────────
// Diğer türevlerin (seed, çekirdek kurallar, OpenAPI) aksine burada hash
// kapısı YOKTUR. Gerekçe: fotoğraflar bilinçli olarak OPSİYONEL. Klasör boşken
// SVG yolu birinci sınıf bir davranıştır, arıza değil. Hash kapısı koymak,
// görselleri olmayan bir geliştiricinin build'ini sebepsiz kırardı.
//
//   npm run qa-shop:gorseller
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const GORSEL_DIZIN = path.join(KOK, 'public/qa-shop/urunler')
const CIKTI = path.join(KOK, 'src/data/generated/qaShopUrunGorselleri.js')

// Tarayıcının yolu çözebilmesi için `public/` kökünden sonraki kısım.
const GENEL_ONEK = 'qa-shop/urunler'

// Kategori adları UYDURULMAZ: `siluetTipi()` (src/components/QaShopStore.jsx)
// tam olarak bu sekiz değeri döndürür. Buradan sapan bir dosya adı sessizce
// yok sayılmak yerine uyarı verir — kullanıcı "koydum ama çıkmadı" demesin.
const KATEGORILER = [
    'shirts', 'tshirts', 'dresses', 'coats',
    'jeans', 'boots', 'sneakers', 'bags',
]

const UZANTILAR = new Set(['.webp', '.avif', '.jpg', '.jpeg', '.png'])

// `shirts.webp` → shirts · `shirts-2.webp` → shirts · `jeans-alt.png` → jeans
function kategoriCoz(dosyaAdi) {
    const taban = path.basename(dosyaAdi, path.extname(dosyaAdi)).toLowerCase()
    // En UZUN eşleşme önce denenir: "tshirts" ile "shirts" birbirini yer.
    const sirali = [...KATEGORILER].sort((a, b) => b.length - a.length)
    for (const kategori of sirali) {
        if (taban === kategori || taban.startsWith(`${kategori}-`)) return kategori
    }
    return null
}

function tara() {
    if (!fs.existsSync(GORSEL_DIZIN)) return { harita: {}, atlanan: [], toplam: 0 }

    const harita = {}
    const atlanan = []
    let toplam = 0

    for (const dosya of fs.readdirSync(GORSEL_DIZIN).sort()) {
        const uzanti = path.extname(dosya).toLowerCase()
        if (!UZANTILAR.has(uzanti)) continue

        const kategori = kategoriCoz(dosya)
        if (!kategori) { atlanan.push(dosya); continue }

        harita[kategori] ??= []
        harita[kategori].push(`${GENEL_ONEK}/${dosya}`)
        toplam += 1
    }
    return { harita, atlanan, toplam }
}

const { harita, atlanan, toplam } = tara()

console.log('QA Shop ürün fotoğrafı manifesti üretiliyor…')
console.log(`  klasör: ${path.relative(KOK, GORSEL_DIZIN)}`)

if (!toplam) {
    console.log('  (klasör boş ya da yok — tüm ürünler inline SVG ile gösterilecek)')
} else {
    for (const kategori of KATEGORILER) {
        const adet = harita[kategori]?.length ?? 0
        console.log(`  ${kategori.padEnd(10)} ${adet ? `${adet} görsel` : '—  (SVG yedeği)'}`)
    }
}

if (atlanan.length) {
    console.warn('\n⚠ Adı bilinen bir kategoriyle başlamadığı için ATLANAN dosyalar:')
    atlanan.forEach((d) => console.warn(`   ${d}`))
    console.warn(`   Beklenen adlandırma: ${KATEGORILER.join(', ')} (ör. shirts.webp, shirts-2.webp)`)
}

const govde = [
    '// ÜRETİLMİŞ DOSYA — ELLE DÜZENLEME.',
    '//',
    '// Kaynak: public/qa-shop/urunler/ klasöründeki dosyalar',
    '// Üreten: scripts/build-qa-shop-images.mjs  (npm run qa-shop:gorseller)',
    '//',
    '// Klasöre görsel ekleyip/çıkardıktan sonra bu komutu tekrar çalıştır.',
    '// Liste boşsa vitrin inline SVG kullanır — bu bir arıza değil, tasarlanmış',
    '// yedek yoldur (CI\'da görseller bulunmaz).',
    '/* eslint-disable */',
    '',
    `export const URUN_GORSELLERI = ${JSON.stringify(harita, null, 1)}`,
    '',
    `export const GORSEL_SAYISI = ${toplam}`,
    '',
].join('\n')

fs.mkdirSync(path.dirname(CIKTI), { recursive: true })
fs.writeFileSync(CIKTI, govde)
console.log(`\n✔ ${path.relative(KOK, CIKTI)} yazıldı — ${toplam} görsel, ${Object.keys(harita).length} kategori`)
