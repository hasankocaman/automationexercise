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
    `QA Shop sıralama sözleşmesi uyumlu (alanlar: ${sunucuAlanlar.join(', ')} · `
    + `arayüz: ${arayuzSecenekler.join(', ')}).`,
)
