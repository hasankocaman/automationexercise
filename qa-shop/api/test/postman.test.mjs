// Postman koleksiyonu ↔ sözleşme tutarlılığı — VERİTABANI GEREKTİRMEZ.
//
// NEDEN VAR: koleksiyon elle bakımı yapılan bir JSON. Bir uç yeniden
// adlandırıldığında ya da bir yol değiştiğinde koleksiyon sessizce eskir ve
// bunu ancak Newman'ı gerçek bir yığına karşı koştururken fark edersin — yani
// en geç ve en pahalı anda. Bu paket, aynı bilgiyi Docker olmadan saniyeler
// içinde verir.
//
// Ayrıca koleksiyonun KENDİ kalitesini denetler: her isteğin bir doğrulaması
// var mı. Doğrulaması olmayan bir istek, koşulduğunda hep yeşil görünür ama
// hiçbir şey kanıtlamaz — paketin en tehlikeli üyesi budur.
import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { parse } from 'yaml'

const here = dirname(fileURLToPath(import.meta.url))
const postmanDir = join(here, '..', '..', 'postman')

const collection = JSON.parse(
    readFileSync(join(postmanDir, 'qa-shop.postman_collection.json'), 'utf8'))
const environment = JSON.parse(
    readFileSync(join(postmanDir, 'qa-shop.postman_environment.json'), 'utf8'))
const spec = parse(readFileSync(join(here, '..', 'openapi.yaml'), 'utf8'))

// Koleksiyondaki tüm istekleri (klasörler dahil) düzleştir.
function flattenRequests(items, path = []) {
    const out = []
    for (const item of items ?? []) {
        if (item.item) out.push(...flattenRequests(item.item, [...path, item.name]))
        else if (item.request) out.push({ ...item, folder: path.join(' / ') })
    }
    return out
}

const requests = flattenRequests(collection.item)

// `{{baseUrl}}/carts/{{cartId}}/items` → `/api/v1/carts/{id}/items`
// Sayısal ve değişken segmentler yol parametresine indirgenir; sözleşme de
// aynı biçimi kullanıyor.
function toContractPath(raw) {
    let p = raw
        .replace('{{baseUrl}}', '/api/v1')
        .replace('http://localhost:4000', '')
        .split('?')[0]

    const segments = p.split('/').map((s) => {
        if (/^\{\{.+\}\}$/.test(s)) return '{id}'
        if (/^\d+$/.test(s)) return '{id}'
        return s
    })
    return segments.join('/')
}

describe('Postman koleksiyonu — yapı', () => {
    test('geçerli Collection v2.1 belgesi', () => {
        assert.match(collection.info.schema, /v2\.1\.0/)
        assert.ok(collection.info.name)
        assert.ok(Array.isArray(collection.item))
    })

    test('istekler klasörlenmiş ve boş klasör yok', () => {
        for (const folder of collection.item) {
            assert.ok(folder.item?.length, `Boş klasör: ${folder.name}`)
        }
    })

    test('koleksiyon boş değil', () => {
        assert.ok(requests.length >= 20, `Yalnızca ${requests.length} istek var`)
    })
})

describe('Postman koleksiyonu — doğrulama kalitesi', () => {
    test('HER isteğin en az bir pm.test doğrulaması var', () => {
        // Doğrulaması olmayan istek koşulduğunda yeşil görünür ama hiçbir şey
        // kanıtlamaz. Paketteki en tehlikeli üye budur.
        const dogrulamasiz = requests.filter((r) => {
            const testEvent = (r.event ?? []).find((e) => e.listen === 'test')
            const kod = (testEvent?.script?.exec ?? []).join('\n')
            return !kod.includes('pm.test')
        })
        assert.deepEqual(dogrulamasiz.map((r) => `${r.folder} / ${r.name}`), [])
    })

    test('durum kodu doğrulaması olmayan istek yok', () => {
        const kodsuz = requests.filter((r) => {
            const testEvent = (r.event ?? []).find((e) => e.listen === 'test')
            const kod = (testEvent?.script?.exec ?? []).join('\n')
            return !/to\.have\.status|response\.code/.test(kod)
        })
        assert.deepEqual(kodsuz.map((r) => `${r.folder} / ${r.name}`), [])
    })

    test('negatif testler gerçekten hata kodu bekliyor', () => {
        // Adı NEGATIF olan bir istek 2xx bekliyorsa, ya adı ya doğrulaması
        // yanlıştır; ikisi de sessiz bir yalan üretir.
        const negatifler = requests.filter((r) => r.name.toUpperCase().includes('NEGATIF'))
        assert.ok(negatifler.length >= 4, 'Pakette yeterli negatif test yok')

        for (const r of negatifler) {
            const kod = (r.event.find((e) => e.listen === 'test').script.exec ?? []).join('\n')
            const beklenen = kod.match(/to\.have\.status\((\d{3})\)/)
            assert.ok(beklenen, `${r.name}: durum kodu doğrulaması yok`)
            assert.ok(Number(beklenen[1]) >= 400,
                `${r.name}: negatif test ${beklenen[1]} bekliyor, 4xx beklemeli`)
        }
    })

    test('koleksiyon düzeyinde ortak doğrulama tanımlı', () => {
        const kod = (collection.event ?? [])
            .filter((e) => e.listen === 'test')
            .flatMap((e) => e.script?.exec ?? []).join('\n')
        assert.match(kod, /pm\.test/)
    })
})

describe('Postman koleksiyonu ↔ sözleşme', () => {
    test('koleksiyondaki her adres sözleşmede tanımlı', () => {
        const specPaths = new Set(Object.keys(spec.paths))
        const eslesmeyen = []

        for (const r of requests) {
            const raw = r.request.url?.raw
            if (!raw) continue
            const yol = toContractPath(raw)
            if (!specPaths.has(yol)) eslesmeyen.push(`${r.folder} / ${r.name} → ${yol}`)
        }

        assert.deepEqual(eslesmeyen, [],
            `Sözleşmede karşılığı olmayan istekler:\n${eslesmeyen.join('\n')}`)
    })

    test('koleksiyondaki metot sözleşmede tanımlı', () => {
        const eslesmeyen = []
        for (const r of requests) {
            const raw = r.request.url?.raw
            if (!raw) continue
            const yol = toContractPath(raw)
            const metot = r.request.method.toLowerCase()
            if (spec.paths[yol] && !spec.paths[yol][metot]) {
                eslesmeyen.push(`${r.name}: ${metot.toUpperCase()} ${yol}`)
            }
        }
        assert.deepEqual(eslesmeyen, [])
    })
})

describe('Postman ortam dosyası', () => {
    test('koleksiyonun yazdığı her değişken ortamda tanımlı', () => {
        // Ortamda karşılığı olmayan bir değişkene yazmak Postman arayüzünde
        // çalışır ama Newman'da sessizce kaybolur ve zincir kopar.
        const tanimli = new Set(environment.values.map((v) => v.key))
        const yazilan = new Set()

        const tara = (kodSatirlari) => {
            const kod = (kodSatirlari ?? []).join('\n')
            for (const m of kod.matchAll(/pm\.environment\.set\(\s*['"]([^'"]+)['"]/g)) {
                yazilan.add(m[1])
            }
        }
        for (const r of requests) {
            for (const e of r.event ?? []) tara(e.script?.exec)
        }

        const eksik = [...yazilan].filter((k) => !tanimli.has(k))
        assert.deepEqual(eksik, [], `Ortamda tanımsız değişken: ${eksik.join(', ')}`)
    })

    test('okunan her değişken ya ortamda ya koleksiyon değişkeninde tanımlı', () => {
        const tanimli = new Set([
            ...environment.values.map((v) => v.key),
            ...(collection.variable ?? []).map((v) => v.key),
        ])

        const okunan = new Set()
        for (const r of requests) {
            const metin = JSON.stringify(r.request)
            for (const m of metin.matchAll(/\{\{(\w+)\}\}/g)) okunan.add(m[1])
        }

        const eksik = [...okunan].filter((k) => !tanimli.has(k))
        assert.deepEqual(eksik, [], `Tanımsız değişken kullanılıyor: ${eksik.join(', ')}`)
    })

    test('parola ve token secret olarak işaretli', () => {
        for (const anahtar of ['token', 'demoPassword']) {
            const v = environment.values.find((x) => x.key === anahtar)
            assert.ok(v, `${anahtar} ortamda yok`)
            assert.equal(v.type, 'secret', `${anahtar} secret olarak işaretlenmeli`)
        }
    })
})
