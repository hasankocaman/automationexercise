// ─── Test kapsamı kapısı ─────────────────────────────────────────────────────
//
// Amaç: "hangi sayfanın testi var?" sorusunun cevabı bir belgede DEĞİL, burada
// dursun ve kendi kendini denetlesin. Belgeye yazılan kapsam listesi ilk yeni
// sayfada sessizce eskir; bu kapı eskiyemez, çünkü kaynağı route tanımlarının
// ve test dosyalarının kendisi.
//
// Kural: yayınlanan her route ya en az bir testte geçmeli, ya da aşağıdaki
// istisna listesinde GEREKÇESİYLE birlikte yer almalı. İkisi de yoksa build
// kırılır. İstisnalar da denetlenir: artık var olmayan ya da aslında test
// edilmiş bir route istisna listesinde duramaz (ölü istisna birikmesin).
//
// Çalıştırma: npm run test:coverage (build zincirinde de otomatik koşar)

import { readdir, readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ROUTE_SEO } from '../src/utils/seo.js'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const testsDir = join(rootDir, 'tests')

// Kapsam dışı route'lar ve GEREKÇELERİ — tek kaynak burasıdır.
// Yeni bir istisna eklerken gerekçe yazmak ZORUNLU: "neden test edilemiyor"
// sorusunun cevabı altı ay sonra hatırlanmaz.
const EXCEPTIONS = {
    '/basit-backend': 'Kullanıcı kararıyla hiçbir otomatik test suite\'ine dahil edilmiyor.',
    '/backend': 'Yalnızca admin oturumuyla açılıyor; normal test hesabıyla erişilemiyor.',
    '/qa-shop-setup': 'Yalnızca admin oturumuyla açılıyor; normal test hesabıyla erişilemiyor. Herkese açıldığında bu istisna SİLİNMELİ ve gerçek test yazılmalı.',
    '/qa-shop': 'Yalnızca admin oturumuyla açılıyor VE anlamlı içerik için kullanıcının kendi makinesinde çalışan bir API gerekiyor (localhost:4000); CI runner\'ında o yığın yok. Herkese açıldığında bu istisna SİLİNMELİ ve API\'yi ayağa kaldıran bir test yazılmalı.',
}

/**
 * Bir route'un herhangi bir testte geçip geçmediği.
 * Tam eşleşme aranır: `/java` araması `/java-document`'i yakalamamalı, yoksa
 * kapsam olduğundan yüksek görünür.
 */
function isMentioned(allText, path) {
    if (path === '/') return /goto\(\s*['"`]\/(?:['"`]|\?)/.test(allText)
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(`['"\`]${escaped}(?:[/'"\`?#])`).test(allText)
}

const files = (await readdir(testsDir)).filter((name) => name.endsWith('.spec.ts'))
let allText = ''
for (const file of files) {
    allText += `\n${await readFile(join(testsDir, file), 'utf8')}`
}

// Dinamik route'lar (ör. sertifika doğrulama) sabit bir adresi olmadığı için
// kapsam ölçümüne girmez — kendi testleri parametreyle çalışır.
const routes = ROUTE_SEO.filter((seo) => !seo.dynamic).map((seo) => seo.path)
const errors = []
const covered = []
const excused = []

for (const path of routes) {
    const mentioned = isMentioned(allText, path)
    const exception = EXCEPTIONS[path]

    if (exception) {
        excused.push(path)
        if (mentioned) {
            errors.push(`${path}: istisna listesinde ama testlerde de geçiyor — istisnayı kaldır (ölü istisna).`)
        }
        continue
    }

    if (mentioned) {
        covered.push(path)
        continue
    }

    errors.push(`${path}: hiçbir testte geçmiyor. Ya test yaz ya da check-test-coverage.mjs içindeki EXCEPTIONS listesine GEREKÇESİYLE ekle.`)
}

// Ölü istisna: artık var olmayan bir route için istisna tutulamaz.
for (const path of Object.keys(EXCEPTIONS)) {
    if (!routes.includes(path)) {
        errors.push(`${path}: istisna listesinde ama böyle bir route yok — istisnayı sil.`)
    }
}

const inScope = routes.length - excused.length
const ratio = inScope ? Math.round((covered.length / inScope) * 100) : 100

if (errors.length) {
    console.error(errors.join('\n'))
    console.error(`\nTest kapsamı: ${covered.length}/${inScope} (%${ratio}) — kapı geçilemedi.`)
    process.exit(1)
}

console.log(`Test coverage gate passed: ${covered.length}/${inScope} route (%${ratio}), ${excused.length} route gerekçeli istisna.`)
