// Sözleşme ↔ uygulama tutarlılığı — VERİTABANI GEREKTİRMEZ.
//
// NEDEN VAR: OpenAPI dosyası elle yazılıyor, koddan ÜRETİLMİYOR. Bu bilinçli
// bir karar (sözleşme önce yazılsın diye) ama bir bedeli var: dosya ile gerçek
// uygulama sessizce ayrışabilir. Sözleşmede duran ama var olmayan bir uç,
// otomasyon yazan kişiye saatler kaybettirir — üstelik hata "benim testimde"
// gibi görünür.
//
// Bu paket iki yönü de denetler:
//   · Sözleşmedeki her yol Express'te GERÇEKTEN monte edilmiş mi
//   · Express'teki her iş ucu sözleşmede BEYAN EDİLMİŞ mi
import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { parse } from 'yaml'
import { createApp } from '../src/app.js'
import { BUG_FLAG_KEYS } from '../src/core/bugFlags.js'

const here = dirname(fileURLToPath(import.meta.url))
const specPath = join(here, '..', 'openapi.yaml')
const spec = parse(readFileSync(specPath, 'utf8'))

// ─── Express'te monte edilmiş yolları topla ────────────────────────────────
// Router'ların regexp'inden ön eki geri çıkarmak kırılgan olurdu; bunun yerine
// her router kendi mount yolu ile birlikte açıkça geziliyor.
function collectMountedRoutes(app) {
    const found = new Set()

    const layerPrefix = (layer) => {
        // Express 4, mount yolunu regexp olarak saklar. `layer.regexp.source`
        // yerine `layer.handle.__mountPath` gibi bir alan yok; bu yüzden
        // regexp'i insan okunur hâle çeviriyoruz. Yalnızca sabit (parametresiz)
        // ön ekler kullanıldığı için bu dönüşüm güvenli.
        const src = layer.regexp?.source ?? ''
        if (src === '^\\/?(?=\\/|$)') return ''          // app.use('/') — kök
        const m = src.match(/^\^\\\/(.*?)\\\/\?\(\?=\\\/\|\$\)$/)
        if (!m) return null
        return '/' + m[1].replace(/\\\//g, '/')
    }

    // Router köküne bağlı bir route Express'te '/' olarak kaydedilir; bu da
    // '/api/v1/carts' yerine '/api/v1/carts/' üretir. Sözleşme sondaki eğik
    // çizgiyi kullanmıyor, bu yüzden karşılaştırmadan önce normalleştiriliyor.
    const normalize = (p) => (p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p)

    const walk = (stack, prefix) => {
        for (const layer of stack) {
            if (layer.route) {
                // Tek handler birden çok yola bağlanmış olabilir (dizi ile
                // kaydedilen takma adlar); Express bunları tek string'de virgülle
                // birleştirir.
                const paths = String(layer.route.path).split(',')
                for (const method of Object.keys(layer.route.methods)) {
                    for (const p of paths) {
                        found.add(`${method.toUpperCase()} ${normalize(prefix + p)}`)
                    }
                }
            } else if (layer.name === 'router' && layer.handle?.stack) {
                const p = layerPrefix(layer)
                if (p === null) continue
                walk(layer.handle.stack, prefix + p)
            }
        }
    }

    walk(app._router.stack, '')
    return found
}

// Sözleşme yolu (`/api/v1/orders/{id}`) → Express yolu (`/api/v1/orders/:id`)
const specPathToExpress = (p) => p.replace(/\{(\w+)\}/g, ':$1')

const mounted = collectMountedRoutes(createApp())
const specPaths = Object.keys(spec.paths)

describe('sözleşme — temel yapı', () => {
    test('geçerli OpenAPI 3 belgesi', () => {
        assert.match(spec.openapi, /^3\./)
        assert.ok(spec.info?.title)
        assert.ok(spec.paths)
    })

    test('tüm $ref referansları çözülüyor', () => {
        // Çözülmeyen bir referans Swagger arayüzünde sayfayı kırar ve Postman
        // içe aktarımını yarıda bırakır — ama dosya "geçerli YAML" olduğu için
        // gözle bakınca fark edilmez.
        const kirik = []
        const gez = (node, yol) => {
            if (node === null || typeof node !== 'object') return
            if (Array.isArray(node)) return node.forEach((n, i) => gez(n, `${yol}[${i}]`))
            for (const [k, v] of Object.entries(node)) {
                if (k === '$ref' && typeof v === 'string') {
                    const parcalar = v.replace(/^#\//, '').split('/')
                    let hedef = spec
                    for (const p of parcalar) hedef = hedef?.[p]
                    if (hedef === undefined) kirik.push(`${yol}: ${v}`)
                } else {
                    gez(v, `${yol}/${k}`)
                }
            }
        }
        gez(spec, '')
        assert.deepEqual(kirik, [], `Çözülemeyen referanslar:\n${kirik.join('\n')}`)
    })

    test('her operasyonun özeti ve en az bir cevabı var', () => {
        const eksik = []
        for (const [yol, ops] of Object.entries(spec.paths)) {
            for (const [metot, op] of Object.entries(ops)) {
                if (!op || typeof op !== 'object') continue
                if (!op.summary) eksik.push(`${metot.toUpperCase()} ${yol}: summary yok`)
                if (!op.responses || !Object.keys(op.responses).length) {
                    eksik.push(`${metot.toUpperCase()} ${yol}: responses yok`)
                }
            }
        }
        assert.deepEqual(eksik, [], eksik.join('\n'))
    })

    test('kullanılan her tag beyan edilmiş', () => {
        const beyan = new Set((spec.tags ?? []).map((t) => t.name))
        const kullanilan = new Set()
        for (const ops of Object.values(spec.paths)) {
            for (const op of Object.values(ops)) {
                for (const t of op?.tags ?? []) kullanilan.add(t)
            }
        }
        const beyansiz = [...kullanilan].filter((t) => !beyan.has(t))
        assert.deepEqual(beyansiz, [], `Beyan edilmemiş tag: ${beyansiz.join(', ')}`)
    })
})

describe('sözleşme ↔ uygulama', () => {
    test('sözleşmedeki her yol Express\'te monte edilmiş', () => {
        const eksik = []
        for (const yol of specPaths) {
            const expressYol = specPathToExpress(yol)
            for (const metot of Object.keys(spec.paths[yol])) {
                if (!['get', 'post', 'patch', 'put', 'delete'].includes(metot)) continue
                const anahtar = `${metot.toUpperCase()} ${expressYol}`
                if (!mounted.has(anahtar)) eksik.push(anahtar)
            }
        }
        assert.deepEqual(eksik, [],
            `Sözleşmede var, uygulamada YOK:\n${eksik.join('\n')}`)
    })

    test('uygulamadaki her iş ucu sözleşmede beyan edilmiş', () => {
        // Sözleşmede olmayan bir uç, onu kullanan otomasyonun dayanağı olmayan
        // bir varsayıma dönüşür: yarın sessizce değişebilir.
        const beyanli = new Set()
        for (const yol of specPaths) {
            for (const metot of Object.keys(spec.paths[yol])) {
                if (!['get', 'post', 'patch', 'put', 'delete'].includes(metot)) continue
                beyanli.add(`${metot.toUpperCase()} ${specPathToExpress(yol)}`)
            }
        }

        // Sözleşme dışı bırakılanlar — her biri GEREKÇELİ:
        //   /openapi.yaml : /api/v1/openapi.yaml'ın takma adı; aynı belgeyi
        //                   sürüm ön eki olmadan da vermek için var. Sözleşmede
        //                   iki kez beyan etmek Postman içe aktarımında yinelenen
        //                   istek üretirdi.
        const SOZLESME_DISI = new Set(['GET /openapi.yaml'])

        const beyansiz = [...mounted].filter((r) => {
            if (r.startsWith('OPTIONS')) return false
            if (SOZLESME_DISI.has(r)) return false
            return !beyanli.has(r)
        })

        assert.deepEqual(beyansiz, [],
            `Uygulamada var, sözleşmede YOK:\n${beyansiz.join('\n')}`)
    })
})

describe('sözleşme — kusur kataloğu', () => {
    test('bug anahtarı uçları sözleşmede tanımlı', () => {
        assert.ok(spec.paths['/api/v1/sandbox/bugs'], '/sandbox/bugs yolu yok')
        assert.ok(spec.paths['/api/v1/sandbox/bugs'].get)
        assert.ok(spec.paths['/api/v1/sandbox/bugs'].patch)
    })

    test('PATCH örneğindeki anahtarlar gerçekten var', () => {
        // Sözleşmedeki örnek, kopyalanıp doğrudan çalıştırılacak bir şeydir.
        // Uydurma bir anahtar içerirse kullanıcı 422 alır ve hatayı kendinde arar.
        const ornek = spec.paths['/api/v1/sandbox/bugs'].patch
            .requestBody.content['application/json'].schema.example
        const uydurma = Object.keys(ornek).filter((k) => !BUG_FLAG_KEYS.includes(k))
        assert.deepEqual(uydurma, [], `Katalogda olmayan anahtar: ${uydurma.join(', ')}`)
    })
})
