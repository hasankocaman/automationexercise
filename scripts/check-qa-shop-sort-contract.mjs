#!/usr/bin/env node
// QA Shop — sıralama alanlarının ÜÇ YERDE de aynı olduğunu doğrular.
//
// ── NEDEN BU KAPI VAR ───────────────────────────────────────────────────────
// Aynı arayüz iki arka uçla konuşur: Docker'daki Express API ve tarayıcı içi
// sql.js katmanı. Sıralama alanının adı üç ayrı yerde yazılıdır ve üçü
// birbirinden habersiz kaydı:
//
//   · sunucu  (catalog.js SORTABLE)         → price | name | created | sku
//   · tarayıcı (qa-shop-browser/api.js)     → price | name | created_at | id
//   · arayüz  (QaShopPage.jsx select)       → created_at:desc gönderiyordu
//
// Sonuç ölçüldü (2026-09-02): "En yeniler" seçeneği Docker kipinde 400
// döndürüyor ve vitrin "0 ürün" gösteriyordu; tarayıcı kipinde ise sessizce
// `id`ye düşüp YANLIŞ sıralıyor ama hata vermiyordu. Yani bozukluk yayındaki
// varsayılan kipte GÖRÜNMEZ, geliştiricinin makinesinde ise vitrini boşaltan
// bir arıza gibi çıkıyordu.
//
// E2E testleri bunu yakalayamazdı: CI'da Docker yoktur, tüm dükkân testleri
// tarayıcı kipinde koşar ve orada istek 200 döner. Bu yüzden koruma tarayıcı
// gerektirmeyen bir SÖZLEŞME kontrolü olarak yazıldı — üç kaynak da düz metin
// olarak okunur ve karşılaştırılır.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const oku = (p) => fs.readFileSync(path.join(KOK, p), 'utf8')

const hatalar = []

// ── 1. Sunucu: SORTABLE sözlüğü (DOĞRULUK KAYNAĞI) ─────────────────────────
const sunucuMetin = oku('qa-shop/api/src/routes/catalog.js')
const sunucuBlok = sunucuMetin.match(/const SORTABLE = \{([\s\S]*?)\}/)
if (!sunucuBlok) {
    console.error('✖ catalog.js içinde SORTABLE sözlüğü bulunamadı — kapı doğrulama yapamıyor.')
    process.exit(1)
}
const sunucuAlanlar = [...sunucuBlok[1].matchAll(/^\s*(\w+)\s*:/gm)].map((m) => m[1]).sort()

// ── 2. Tarayıcı katmanı: siralanabilir sözlüğü ─────────────────────────────
const tarayiciMetin = oku('src/qa-shop-browser/api.js')
const tarayiciBlok = tarayiciMetin.match(/const siralanabilir = \{([^}]*)\}/)
if (!tarayiciBlok) {
    console.error('✖ qa-shop-browser/api.js içinde siralanabilir sözlüğü bulunamadı.')
    process.exit(1)
}
const tarayiciAlanlar = [...tarayiciBlok[1].matchAll(/(\w+)\s*:/g)].map((m) => m[1]).sort()

// ── 3. Arayüz: kullanıcıya sunulan sıralama seçenekleri ────────────────────
const arayuzMetin = oku('src/components/QaShopPage.jsx')
const arayuzBlok = arayuzMetin.match(/const SIRALAMA_SECENEKLERI = \[([^\]]*)\]/)
if (!arayuzBlok) {
    console.error('✖ QaShopPage.jsx içinde SIRALAMA_SECENEKLERI dizisi bulunamadı.')
    process.exit(1)
}
const arayuzSecenekler = [...arayuzBlok[1].matchAll(/'([^']+)'/g)].map((m) => m[1])
const arayuzAlanlar = [...new Set(arayuzSecenekler.map((s) => s.split(':')[0]))].sort()

// ── Karşılaştırma ──────────────────────────────────────────────────────────
if (sunucuAlanlar.join(',') !== tarayiciAlanlar.join(',')) {
    hatalar.push(
        'Sunucu ile tarayıcı katmanının sıralama alanları AYRIŞMIŞ:\n'
        + `    sunucu  : ${sunucuAlanlar.join(', ')}\n`
        + `    tarayıcı: ${tarayiciAlanlar.join(', ')}\n`
        + '    Aynı arayüz iki kipte farklı davranır — biri 400 döner, öbürü sessizce yanlış sıralar.',
    )
}

const tanimsiz = arayuzAlanlar.filter((a) => !sunucuAlanlar.includes(a))
if (tanimsiz.length) {
    hatalar.push(
        `Arayüz sözleşmede OLMAYAN sıralama alanı gönderiyor: ${tanimsiz.join(', ')}\n`
        + `    Sunucunun kabul ettikleri: ${sunucuAlanlar.join(', ')}\n`
        + '    Bu istek 400 döner ve vitrin boş görünür.',
    )
}

// ── 4. Kategori ucu: taklit katman sözleşmeden GEVŞEK olamaz ───────────────
//
// Sözleşme /categories/{id}/products için id: integer der. Tarayıcı katmanı bir
// süre `slug = ? or id = ?` diyerek slug'ı da kabul etti; bu hoşgörü arayüzün
// yanlış istek attığını GİZLEDİ. Docker kipinde her kategori sekmesi 400
// dönerken tarayıcı kipinde sorunsuz görünüyordu.
//
// Ders: iki arka uçtan gevşek olanı, hatayı saklayan taraftır.
const kategoriBlok = tarayiciMetin.match(/function kategoriUrunleri\([\s\S]*?\n\}/)
if (!kategoriBlok) {
    console.error('✖ qa-shop-browser/api.js icinde kategoriUrunleri bulunamadi.')
    process.exit(1)
}
if (/categories where slug/.test(kategoriBlok[0])) {
    hatalar.push(
        'Tarayıcı katmanı kategori ucunda SLUG kabul ediyor, sözleşme ise sayısal id istiyor.\n'
        + '    Gevşek taklit katman, arayüzün yanlış istek attığını gizler:\n'
        + '    Docker kipinde 400 dönerken tarayıcı kipinde sorunsuz görünür.',
    )
}
if (!/Number\.parseInt\(idHam/.test(kategoriBlok[0])) {
    hatalar.push('Tarayıcı katmanı kategori id\'sini sayıya çevirip doğrulamıyor.')
}

// ── 5. Arayüz kategori yoluna SLUG koymamalı ───────────────────────────────
if (/\/categories\/\$\{aktifKategori\}/.test(arayuzMetin)) {
    hatalar.push(
        'Arayüz kategori yoluna slug koyuyor (/categories/${aktifKategori}/products).\n'
        + '    Sözleşme sayısal id ister; slug gonderen istek 400 doner ve vitrin bosalir.',
    )
}

// ── 6. İki dilli katalog alanları ÜÇ katmanda da bulunmalı ────────────────
//
// Katalog iki dillidir: her cevapta hem İngilizce hem Türkçe alan döner ve
// hangisinin gösterileceğine arayüz karar verir. Bu ancak üç katman da aynı
// alanları taşırsa çalışır:
//
//   · sunucu   (catalog.js select listeleri)
//   · tarayıcı (qa-shop-browser/api.js)
//   · sözleşme (openapi.yaml)
//
// Bir katman bir alanı unutursa sonuç SESSİZDİR: alan undefined gelir,
// arayüzdeki tercih İngilizceye düşer ve dükkân o ekranda yarı Türkçe
// görünür. Hiçbir test bunu kırmaz, çünkü sayfa çalışmaya devam eder.
//
// ⚠ Bir ara bu çeviri ARAYÜZDE yapılıyordu. Yanlıştı: burası bir otomasyon
// hedefi ve öğrenci ekrandaki metni API nin döndürdüğüyle karşılaştırır.
// Ekranda "Klasik Lacivert Mont" gösterip API de "Classic Navy Coat"
// döndürmek, öğrencinin yazdığı her karşılaştırmayı yalancı yapardı.
const sozlesmeMetin = oku('qa-shop/api/openapi.yaml')

const IKI_DILLI_ALANLAR = [
    { alan: 'name_tr', nerede: 'ürün adı' },
    { alan: 'description_tr', nerede: 'ürün açıklaması' },
    { alan: 'category_name_tr', nerede: 'kategori adı (ürün cevabında)' },
    { alan: 'color_tr', nerede: 'varyant rengi' },
]

for (const { alan, nerede } of IKI_DILLI_ALANLAR) {
    const eksik = []
    if (!sunucuMetin.includes(alan)) eksik.push('sunucu (catalog.js)')
    if (!tarayiciMetin.includes(alan)) eksik.push('tarayıcı (qa-shop-browser/api.js)')
    if (!sozlesmeMetin.includes(alan)) eksik.push('sözleşme (openapi.yaml)')
    if (eksik.length) {
        hatalar.push(
            `İki dilli alan ${alan} (${nerede}) şu katmanlarda YOK: ${eksik.join(', ')}\n`
            + '    Eksik katman alanı undefined döndürür, arayüz İngilizceye düşer ve\n'
            + '    dükkân o ekranda sessizce yarı Türkçe görünür.',
        )
    }
}

// Kategori ağacı cevabında da Türkçe ad dönmeli: şerit etiketleri oradan gelir.
if (!/c\.name_tr/.test(sunucuMetin) || !/name_tr, slug, parent_id/.test(tarayiciMetin)) {
    hatalar.push(
        'Kategori ağacı cevabı name_tr taşımıyor.\n'
        + '    Kategori şeridi etiketlerini oradan okur; eksikse şerit İngilizce kalır.',
    )
}

// Arayüz kendi çeviri sözlüğünü YENİDEN kurmamalı: çeviri veridedir.
if (/KATEGORI_ADLARI_TR|URUN_ADLARI_TR/.test(arayuzMetin)) {
    hatalar.push(
        'Arayüzde katalog çeviri sözlüğü var. Çeviri VERİDEDİR (name_tr/color_tr).\n'
        + '    İkinci bir mekanizma kaçınılmaz olarak veriden ayrışır ve ekranla\n'
        + '    API birbirini tutmaz — otomasyon hedefinde bu bir hata kaynağıdır.',
    )
}

const gecersizYon = arayuzSecenekler.filter((s) => !['asc', 'desc'].includes(s.split(':')[1]))
if (gecersizYon.length) {
    hatalar.push(`Sıralama yönü yalnızca asc|desc olabilir, geçersiz: ${gecersizYon.join(', ')}`)
}

// Arayüzdeki <option> değerleri de listeyle aynı olmalı: liste doğrulama için
// kullanılıyor, option kullanıcıya gönderileni belirliyor. İkisi ayrışırsa
// seçilen değer doğrulamaya takılıp sessizce varsayılana düşerdi.
const optionDegerleri = [...arayuzMetin.matchAll(/<option value="([^"]+)">\{tx\(M\.sirala/g)]
    .map((m) => m[1]).sort()
if (optionDegerleri.length && optionDegerleri.join(',') !== [...arayuzSecenekler].sort().join(',')) {
    hatalar.push(
        'Sıralama <option> değerleri ile SIRALAMA_SECENEKLERI listesi ayrışmış:\n'
        + `    option'lar: ${optionDegerleri.join(', ')}\n`
        + `    liste     : ${[...arayuzSecenekler].sort().join(', ')}\n`
        + '    Listede olmayan bir option seçilirse doğrulama onu varsayılana düşürür.',
    )
}

if (hatalar.length) {
    console.error('\n✖ QA Shop sıralama sözleşmesi ihlali:\n')
    for (const h of hatalar) console.error('  • ' + h + '\n')
    process.exit(1)
}

console.log(
    `QA Shop katalog sözleşmesi uyumlu (sıralama: ${sunucuAlanlar.join(', ')} · `
    + `arayüz: ${arayuzSecenekler.join(', ')} · kategori ucu sayısal id).`,
)
