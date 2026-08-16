// Uygulama iskeleti — VERİTABANI GEREKTİRMEZ.
//
// Buradaki testler kasıtlı olarak veritabanına dokunmayan yüzeyi denetler:
// route montajı, sağlık ucunun bozuk veritabanında nasıl davrandığı, hata
// gövdesinin sözleşmeye uyması, CORS başlıkları.
//
// NEDEN DEĞERLİ: bu yüzey bozulduğunda diğer TÜM testler anlamsız hatalarla
// düşer ve teşhis saatler alır. Ayrıca Docker kurulu olmayan bir makinede bile
// koşabildiği için, kurulum sorunları ile kod sorunlarını birbirinden ayırır.
import { test, describe, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { createApp } from '../src/app.js'

let server
let base

before(async () => {
    const app = createApp()
    // Port 0: işletim sistemi boş bir port seçsin. Sabit port yazsaydık,
    // paralel koşan iki test paketi birbirini "port dolu" ile düşürürdü.
    server = app.listen(0)
    await new Promise((resolve) => server.once('listening', resolve))
    base = `http://localhost:${server.address().port}`
})

after(() => server?.close())

describe('sistem uçları', () => {
    test('sağlık ucu veritabanı yokken 503 ve degraded döner', async () => {
        // Sağlık ucu sandbox çözümlemesinden ÖNCE cevap verir: veritabanı ölüyken
        // bile yanıt vermeli, yoksa "servis mi öldü, DB mi öldü" ayırt edilemez.
        const res = await fetch(`${base}/health`)
        const body = await res.json()
        assert.equal(res.status, 503)
        assert.equal(body.status, 'degraded')
        assert.equal(body.database, 'down')
        assert.equal(typeof body.uptimeSeconds, 'number')
    })

    test('keşif ucu sürüm ve hızlı başlangıç döner', async () => {
        const res = await fetch(`${base}/api/v1`)
        const body = await res.json()
        assert.equal(res.status, 200)
        assert.equal(body.version, 'v1')
        assert.ok(Array.isArray(body.quickStart))
    })

    test('OpenAPI sözleşmesi HTTP üzerinden servis edilir', async () => {
        // Postman "Import > Link" ve Swagger "Import URL" bu adresi okur.
        const res = await fetch(`${base}/api/v1/openapi.yaml`)
        const text = await res.text()
        assert.equal(res.status, 200)
        assert.match(res.headers.get('content-type'), /yaml/)
        assert.match(text, /^openapi: 3\./m)
    })
})

describe('istek/cevap sözleşmesi', () => {
    test('correlation id cevabın başlığında döner', async () => {
        const res = await fetch(`${base}/api/v1`)
        assert.match(res.headers.get('x-correlation-id'), /^req-/)
    })

    test('istemcinin gönderdiği correlation id korunur', async () => {
        // Kök neden analizi pratiği buna dayanır: test kendi id'sini gönderir,
        // sonra log zincirini o id ile çeker.
        const res = await fetch(`${base}/api/v1`, { headers: { 'X-Correlation-Id': 'test-123' } })
        assert.equal(res.headers.get('x-correlation-id'), 'test-123')
    })

    test('tanımsız yol tek tip hata gövdesi döner', async () => {
        const res = await fetch(`${base}/api/v1/boyle-bir-uc-yok`)
        const body = await res.json()
        assert.equal(res.status, 404)
        assert.equal(body.error.code, 'ROUTE_NOT_FOUND')
        assert.ok(body.correlationId)
    })

    test('bozuk JSON gövdesi 500 değil 400 döner', async () => {
        // Hata İSTEMCİDEDİR. 500 dönseydi "sunucu çöktü" gibi görünür ve
        // ekip yanlış yerde arardı.
        const res = await fetch(`${base}/api/v1/sandbox`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{bozuk json',
        })
        const body = await res.json()
        assert.equal(res.status, 400)
        assert.equal(body.error.code, 'MALFORMED_JSON')
    })

    test('CORS ön kontrolü 204 ve izinli başlıklarla döner', async () => {
        const res = await fetch(`${base}/api/v1/products`, { method: 'OPTIONS' })
        assert.equal(res.status, 204)
        const allowed = res.headers.get('access-control-allow-headers')
        assert.match(allowed, /X-Sandbox-Key/)
        assert.match(allowed, /Authorization/)
    })
})

describe('route yüzeyi', () => {
    // ⚠ BU KONTROLÜN SINIRI — okumadan güvenme.
    //
    // "404 dönmüyorsa route bağlanmıştır" çıkarımı YALNIZCA kimlik istemeyen
    // router'lar için geçerlidir. `ordersRouter` ve `addressesRouter`
    // `router.use(requireWritableSandbox, requireAuth)` kullanıyor; Express'te
    // `router.use(...)` mount yolunun ALTINDAKİ HER istekte çalışır — route
    // eşleşmese bile. Yani o router'larda uydurma bir yol da 401 döner ve
    // 404 kontrolü hiçbir şeye bakmaz.
    //
    // Bu tam olarak "hep yeşil kalan bekçi" tuzağıdır ve gerçekten yaşandı:
    // canlı bir yığında sipariş uçları 404 verirken bu test yeşildi.
    //
    // Montajın GERÇEK kanıtı contract.test.mjs'te: orada Express'in router
    // yığını gezilip sözleşmeyle iki yönlü karşılaştırılıyor.
    const kimlikIstemeyen = [
        ['GET', '/api/v1/products'],
        ['GET', '/api/v1/categories'],
        ['GET', '/api/v1/brands'],
        ['GET', '/api/v1/search?q=test'],
        ['GET', '/api/v1/products/1/variants'],
        ['GET', '/api/v1/products/1/reviews'],
        ['GET', '/api/v1/products/1/rating'],
        ['GET', '/api/v1/sandbox/state'],
        ['GET', '/api/v1/sandbox/bugs'],
        ['GET', '/api/v1/sandbox/logs'],
        ['POST', '/api/v1/sandbox'],
        ['POST', '/api/v1/auth/login'],
        ['POST', '/api/v1/auth/register'],
    ]

    for (const [method, path] of kimlikIstemeyen) {
        test(`${method} ${path} monte edilmiş (404 dönmüyor)`, async () => {
            const res = await fetch(base + path, {
                method,
                headers: method === 'POST' ? { 'Content-Type': 'application/json' } : {},
                body: method === 'POST' ? '{}' : undefined,
            })
            assert.notEqual(res.status, 404, `${method} ${path} → 404: route bağlanmamış`)
        })
    }

    test('kimlik isteyen router\'da 404 kontrolü KÖRDÜR — kanıt', async () => {
        // Bekçinin kendi testi: uydurma bir yol da 401 dönüyorsa, o router
        // için "404 dönmedi" ifadesi montaj hakkında hiçbir şey söylemiyor
        // demektir. Bu davranış değişirse (ör. auth route bazına taşınırsa)
        // bu test kırılır ve yukarıdaki listeyi genişletebileceğimizi anlarız.
        const uydurma = await fetch(`${base}/api/v1/orders/1/kesinlikle-boyle-bir-uc-yok`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{}',
        })
        assert.equal(uydurma.status, 401,
            'Beklenen 401: router seviyesindeki auth, eşleşmeyen yolu da yakalıyor')

        const gercek = await fetch(`${base}/api/v1/orders/1/deliver`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{}',
        })
        assert.equal(gercek.status, uydurma.status,
            'Var olan ve olmayan yol AYNI kodu dönüyor — ayırt etmek için contract.test.mjs gerekli')
    })
})
