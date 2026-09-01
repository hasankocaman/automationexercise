#!/usr/bin/env node
// QA Shop — OpenAPI sözleşmesinin TARAYICI TÜREVİ.
//
// ── NEDEN ───────────────────────────────────────────────────────────────────
// `/qa-shop-api` sayfası sözleşmeyi okunabilir biçimde gösterir. Sözleşmenin
// kaynağı TEK yerdir: `qa-shop/api/openapi.yaml`. Sayfa o dosyayı çalışma
// anında okusaydı iki sorun çıkardı:
//
//   1. Tarayıcıya bir YAML ayrıştırıcı indirmek gerekirdi (paket şişer).
//   2. Dosya lokal API'den (`localhost:4000/openapi.yaml`) çekilseydi, Docker
//      kurmayan ziyaretçi BOŞ bir sayfa görürdü — tam da tarayıcı modunu
//      yazarken kapattığımız açık.
//
// Bu yüzden dönüşüm BUILD sırasında yapılır ve sayfa hazır JSON okur. Sözleşme
// değişip türev yenilenmezse build kırılır (hash kontrolü) — şema/sözleşme iki
// yerde elle tutulduğunda kaçınılmaz olan ayrışma böyle engellenir.
//
//   node scripts/build-openapi-json.mjs --generate   → türevi üretir
//   node scripts/build-openapi-json.mjs              → yalnızca hash doğrular
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const KAYNAK = path.join(KOK, 'qa-shop/api/openapi.yaml')
const CIKTI = path.join(KOK, 'src/data/generated/qaShopOpenApi.js')

export function kaynakHash() {
    return crypto.createHash('sha256').update(fs.readFileSync(KAYNAK)).digest('hex').slice(0, 32)
}

// Sayfanın gerçekten kullandığı alanlar alınır; şema bileşenlerinin tamamı
// (components.schemas ayrıntısı) ATLANMAZ ama sadeleştirilir — amaç Swagger
// UI'ı birebir kopyalamak değil, uçları okunur kılmak.
// $ref çözer. Sözleşme şemaları components altında tutuluyor; türevde
// referans bırakmak sayfayı "şu adı ara" işine sokardı, o da tarayıcıda ikinci
// bir çözümleyici demek olurdu.
function cozumle(doc, sema, derinlik = 0) {
    if (!sema || typeof sema !== 'object' || derinlik > 8) return sema ?? null
    if (sema.$ref) {
        const ad = sema.$ref.split('/').pop()
        return cozumle(doc, doc.components?.schemas?.[ad], derinlik + 1)
    }
    return sema
}

// Bir şemayı düz alan listesine indirger: ad · tip · zorunlu · kısıt.
//
// NEDEN DÜZ: testi yazan kişinin sorduğu üç soru "hangi alan zorunlu",
// "tipi ne", "sınırı ne". İç içe bir ağaç bunları saklar; tablo gösterir.
// İki seviye iniliyor — daha derini bu sözleşmede yok ve olsaydı da tabloyu
// okunmaz yapardı.
const KISIT_ANAHTARLARI = ['format', 'enum', 'minimum', 'maximum', 'minLength', 'maxLength', 'pattern', 'minItems', 'maxItems', 'default']

function kisitMetni(sema) {
    const parcalar = []
    for (const k of KISIT_ANAHTARLARI) {
        if (!(k in sema)) continue
        const v = sema[k]
        parcalar.push(Array.isArray(v) ? `${k}: ${v.join(' | ')}` : `${k}: ${v}`)
    }
    return parcalar.join(' · ')
}

function alanlar(doc, sema, onEk = '', derinlik = 0) {
    const c = cozumle(doc, sema)
    if (!c || derinlik > 2) return []

    if (c.type === 'array' && c.items) {
        const ic = cozumle(doc, c.items)
        if (ic?.type === 'object') return alanlar(doc, ic, `${onEk}[]`, derinlik + 1)
        return [{ ad: `${onEk}[]`, tip: ic?.type ?? 'any', zorunlu: false, kisit: ic ? kisitMetni(ic) : '', aciklama: (ic?.description ?? '').trim() }]
    }

    if (!c.properties) return []
    const zorunlular = new Set(c.required ?? [])
    const out = []
    for (const [ad, ham] of Object.entries(c.properties)) {
        const alt = cozumle(doc, ham)
        const tamAd = onEk ? `${onEk}.${ad}` : ad
        const tip = alt?.type === 'array'
            ? `array<${cozumle(doc, alt.items)?.type ?? 'object'}>`
            : (alt?.type ?? 'object')
        out.push({
            ad: tamAd,
            tip,
            zorunlu: zorunlular.has(ad),
            kisit: alt ? kisitMetni(alt) : '',
            aciklama: (alt?.description ?? '').trim(),
        })
        // Bir seviye daha in: iç içe nesnelerin alanları da görünsün.
        if (derinlik < 2 && alt && (alt.type === 'object' || (alt.type === 'array' && cozumle(doc, alt.items)?.type === 'object'))) {
            const hedef = alt.type === 'array' ? cozumle(doc, alt.items) : alt
            out.push(...alanlar(doc, hedef, alt.type === 'array' ? `${tamAd}[]` : tamAd, derinlik + 1))
        }
    }
    return out
}

// Örnek çıkarımı: sözleşmede example, examples ya da alan bazlı example
// olabiliyor. Üçünü de dene — 46 ucun 2'sinde örnek görünmesinin sebebi
// yalnızca ilkine bakılmasıydı.
function ornekCikar(doc, icerik) {
    if (!icerik) return null
    if (icerik.example !== undefined) return icerik.example
    if (icerik.examples) {
        const ilk = Object.values(icerik.examples)[0]
        if (ilk && ilk.value !== undefined) return ilk.value
    }
    const sema = cozumle(doc, icerik.schema)
    if (!sema) return null
    if (sema.example !== undefined) return sema.example

    // Alan bazlı example'lardan bir örnek gövde kur.
    if (sema.type === 'object' && sema.properties) {
        const kurulan = {}
        for (const [ad, ham] of Object.entries(sema.properties)) {
            const alt = cozumle(doc, ham)
            if (alt?.example !== undefined) kurulan[ad] = alt.example
        }
        if (Object.keys(kurulan).length) return kurulan
    }
    return null
}

function sadelestir(doc) {
    const uclar = []

    // Kimlik şemaları: header adı burada duruyor. Türeve taşınmadığı için
    // sayfa "hangi başlığı göndereceğim" sorusuna cevap veremiyordu — oysa
    // sözleşmenin kendi giriş notu bunu "en sık yapılan hata" diye işaretliyor.
    const kimlikSemalari = Object.entries(doc.components?.securitySchemes ?? {}).map(([ad, v]) => ({
        ad,
        tip: v.type,
        sema: v.scheme ?? null,
        basligi: v.type === 'apiKey' ? v.name : (v.scheme === 'bearer' ? 'Authorization' : null),
        nerede: v.in ?? 'header',
        aciklama: (v.description ?? '').trim(),
    }))
    const basligiOf = Object.fromEntries(kimlikSemalari.map((k) => [k.ad, k]))

    for (const [yol, islemler] of Object.entries(doc.paths ?? {})) {
        // Path düzeyindeki parametreler her operasyona uygulanır; yalnızca
        // op.parameters okunması onları sessizce düşürüyordu.
        const yolParametreleri = islemler.parameters ?? []

        for (const [method, op] of Object.entries(islemler)) {
            if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) continue

            const govdeIcerik = op.requestBody?.content?.['application/json']
            const govdeAlanlari = govdeIcerik ? alanlar(doc, govdeIcerik.schema) : []
            const ornek = ornekCikar(doc, govdeIcerik)

            const cevaplar = Object.entries(op.responses ?? {}).map(([kod, c]) => {
                const icerik = c?.content?.['application/json']
                const cevapOrnegi = ornekCikar(doc, icerik)
                return {
                    kod,
                    aciklama: typeof c?.description === 'string' ? c.description.trim() : '',
                    // Gövde alanları yalnızca BAŞARI cevaplarında taşınır: hata
                    // gövdesi her uçta aynı Error şeması, 46 kez tekrarlamak
                    // türevi şişirir ve okuyucuya yeni bir şey söylemez.
                    alanlar: /^2/.test(kod) && icerik ? alanlar(doc, icerik.schema) : [],
                    ornek: cevapOrnegi ? JSON.stringify(cevapOrnegi, null, 2) : null,
                }
            })

            // Bu uç hangi kimlik başlıklarını istiyor?
            const guvenlik = (op.security ?? doc.security ?? [])
                .flatMap((g) => Object.keys(g))
                .map((ad) => basligiOf[ad])
                .filter(Boolean)
                .map((k) => ({ ad: k.ad, basligi: k.basligi, nerede: k.nerede }))

            uclar.push({
                method: method.toUpperCase(),
                yol,
                etiket: (op.tags ?? ['Diğer'])[0],
                ozet: (op.summary ?? '').trim(),
                aciklama: (op.description ?? '').trim(),
                parametreler: [...yolParametreleri, ...(op.parameters ?? [])].map((prm) => {
                    const c = prm.$ref ? (doc.components?.parameters?.[prm.$ref.split('/').pop()] ?? {}) : prm
                    const sema = cozumle(doc, c.schema)
                    return {
                        ad: c.name,
                        nerede: c.in,
                        zorunlu: !!c.required,
                        tip: sema?.type ?? '',
                        kisit: sema ? kisitMetni(sema) : '',
                        aciklama: (c.description ?? '').trim(),
                    }
                }),
                guvenlik,
                govdeZorunlu: !!op.requestBody?.required,
                govdeAlanlari,
                ornek: ornek ? JSON.stringify(ornek, null, 2) : null,
                cevaplar,
            })
        }
    }

    // Etiket sırası sözleşmedeki `tags` sırasını izler: rastgele alfabetik bir
    // sıra, öğrenme sırasını (önce kimlik, sonra katalog, sonra sepet…) bozar.
    const etiketSirasi = (doc.tags ?? []).map((t) => t.name)
    const etiketAciklamalari = Object.fromEntries(
        (doc.tags ?? []).map((t) => [t.name, (t.description ?? '').trim()]),
    )

    return {
        baslik: doc.info?.title ?? 'QA Shop API',
        surum: doc.info?.version ?? '',
        aciklama: (doc.info?.description ?? '').trim(),
        sunucular: (doc.servers ?? []).map((sv) => ({ url: sv.url, aciklama: (sv.description ?? '').trim() })),
        kimlikSemalari,
        etiketSirasi,
        etiketAciklamalari,
        uclar,
    }
}

async function uret() {
    const { parse } = await import('yaml')
    console.log('QA Shop OpenAPI türevi üretiliyor…')

    const doc = parse(fs.readFileSync(KAYNAK, 'utf8'))
    const sade = sadelestir(doc)

    if (!sade.uclar.length) throw new Error('Sözleşmede hiç uç bulunamadı — ayrıştırma bozuk')

    const etiketler = [...new Set(sade.uclar.map((u) => u.etiket))]
    console.log(`  ${sade.uclar.length} uç, ${etiketler.length} etiket`)
    for (const e of etiketler) {
        console.log(`    ${e.padEnd(12)} ${sade.uclar.filter((u) => u.etiket === e).length}`)
    }

    const govde = [
        '// ÜRETİLMİŞ DOSYA — ELLE DÜZENLEME.',
        '//',
        '// Kaynak: qa-shop/api/openapi.yaml',
        '// Üreten: scripts/build-openapi-json.mjs  (npm run qa-shop:openapi)',
        '//',
        '// Sözleşme değişip bu türev yenilenmezse build kırılır. Bu bilinçli:',
        '// sözleşme iki yerde elle tutulursa kaçınılmaz olarak ayrışır.',
        '/* eslint-disable */',
        '',
        `export const KAYNAK_HASH = ${JSON.stringify(kaynakHash())}`,
        `export const UC_SAYISI = ${sade.uclar.length}`,
        '',
        `export const OPENAPI = ${JSON.stringify(sade, null, 1)}`,
        '',
    ].join('\n')

    fs.mkdirSync(path.dirname(CIKTI), { recursive: true })
    fs.writeFileSync(CIKTI, govde)
    console.log(`\n✔ ${path.relative(KOK, CIKTI)} yazıldı — ${Math.round(Buffer.byteLength(govde) / 1024)} KB`)
}

function dogrula() {
    if (!fs.existsSync(CIKTI)) {
        console.error('✖ OpenAPI türevi yok: src/data/generated/qaShopOpenApi.js')
        console.error('  Üret:  npm run qa-shop:openapi')
        process.exit(1)
    }
    const icerik = fs.readFileSync(CIKTI, 'utf8')
    const turevHash = icerik.match(/export const KAYNAK_HASH = "([a-f0-9]+)"/)?.[1]
    const guncelHash = kaynakHash()

    if (turevHash !== guncelHash) {
        console.error('\n✖ OpenAPI türevi KAYNAKTAN KAYMIŞ.')
        console.error(`  türevdeki hash : ${turevHash ?? '(okunamadı)'}`)
        console.error(`  kaynak hash    : ${guncelHash}`)
        console.error('  qa-shop/api/openapi.yaml değişmiş ama türev yenilenmemiş.')
        console.error('  Çözüm:  npm run qa-shop:openapi')
        process.exit(1)
    }
    const uc = icerik.match(/export const UC_SAYISI = (\d+)/)?.[1] ?? '?'
    console.log(`OpenAPI türevi kaynakla uyumlu (${uc} uç, hash ${guncelHash}).`)
}

if (process.argv.includes('--generate')) {
    uret().catch((err) => { console.error('✖ Üretim düştü:', err.message); process.exit(1) })
} else {
    dogrula()
}
