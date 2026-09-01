#!/usr/bin/env node
// scripts/check-qa-shop-backlog.mjs
//
// QA Shop backlog'unun (gereksinim → epic → business story → frontend/backend
// story) yapısal ve DİLSEL bütünlüğünü denetler. Build zincirinde koşar,
// ihlalde hard-fail eder.
//
// NEDEN BİR KAPI GEREKİYOR: bu backlog'un en kolay bozulan yanı görünmez.
// Bir kabul kriterine "409 döner" yazmak sayfayı BOZMAZ, derleme geçer,
// render doğru olur — yalnızca öğretmeyi bozar, çünkü test edenin üretmesi
// gereken çıktıyı hazır vermiş olur. Aynı şekilde bir epic'ten story
// düşürmek de sessizdir. İkisini de yalnızca ölçerek yakalayabiliriz.
//
// Kontroller:
//   [A] Yapı        — epic/gereksinim/child referansları gerçek mi, öksüz var mı
//   [B] İzlenebilirlik — her gereksinim bir epic'e, her epic bir gereksinime bağlı mı
//   [C] Bölünme     — split:'full' epic'lerin HER story'sinde FE+BE çifti var mı
//   [D] İki dillilik — her metin alanının tr ve en tarafı dolu mu
//   [E] Kriter dili   — herkese açık `acceptance` iş dilinde mi (status kodu,
//                     hata sabiti ve Given/When/Then YASAK — onlar `criteria`da)
//   [F] Story aktörü — story kullanıcı gözünden mi yazılmış (geliştirici YASAK)

import { qaShopBacklogData as data, businessStories, businessStoryById } from '../src/data/qaShopBacklogData.js'

const ihlaller = []
const bildir = (kontrol, mesaj) => ihlaller.push(`[${kontrol}] ${mesaj}`)

const epicById = Object.fromEntries(data.epics.map((e) => [e.id, e]))
const reqById = Object.fromEntries(data.requirements.map((r) => [r.id, r]))

// ─────────────────────────────────────────────────────────────────────────────
// [A] Yapı
// ─────────────────────────────────────────────────────────────────────────────
const epicStories = data.epics.flatMap((e) => e.stories)

for (const e of data.epics) {
    for (const sid of e.stories) {
        if (!businessStoryById[sid]) bildir('A', `${e.id} olmayan bir story'ye bağlı: ${sid}`)
    }
    for (const rid of e.requirements) {
        if (!reqById[rid]) bildir('A', `${e.id} olmayan bir gereksinime bağlı: ${rid}`)
    }
    if (!['full', 'pending'].includes(e.split)) {
        bildir('A', `${e.id} geçersiz split değeri taşıyor: ${e.split}`)
    }
}

for (const s of businessStories) {
    const sahip = data.epics.filter((e) => e.stories.includes(s.id))
    if (sahip.length === 0) bildir('A', `${s.id} hiçbir epic'e bağlı değil (öksüz story)`)
    if (sahip.length > 1) bildir('A', `${s.id} birden fazla epic'e bağlı: ${sahip.map((e) => e.id).join(', ')}`)
}

const childIds = new Set()
for (const c of data.childStories) {
    if (childIds.has(c.id)) bildir('A', `child story id tekrar ediyor: ${c.id}`)
    childIds.add(c.id)

    if (!businessStoryById[c.parent]) bildir('A', `${c.id} olmayan bir parent'a bağlı: ${c.parent}`)
    const ep = epicById[c.epic]
    if (!ep) bildir('A', `${c.id} olmayan bir epic'e bağlı: ${c.epic}`)
    else if (!ep.stories.includes(c.parent)) {
        bildir('A', `${c.id} epic'i (${c.epic}) parent'ının (${c.parent}) epic'i DEĞİL`)
    }
    if (!['frontend', 'backend'].includes(c.kind)) bildir('A', `${c.id} geçersiz kind taşıyor: ${c.kind}`)
    if (!Array.isArray(c.acceptance) || c.acceptance.length === 0) bildir('A', `${c.id} kabul kriteri taşımıyor`)
    if (!Array.isArray(c.criteria) || c.criteria.length === 0) bildir('A', `${c.id} teknik kriter taşımıyor`)
}

// ─────────────────────────────────────────────────────────────────────────────
// [B] İzlenebilirlik — zincir iki yönde de yürünebilmeli
// ─────────────────────────────────────────────────────────────────────────────
for (const r of data.requirements) {
    if (!r.epics?.length) bildir('B', `${r.id} hiçbir epic'e düşmüyor — zincir aşağı doğru kopuk`)
    for (const eid of r.epics) {
        if (!epicById[eid]) bildir('B', `${r.id} olmayan bir epic'e işaret ediyor: ${eid}`)
        else if (!epicById[eid].requirements.includes(r.id)) {
            bildir('B', `${r.id} → ${eid} bağı tek yönlü; ${eid} bu gereksinimi geri göstermiyor`)
        }
    }
}
for (const e of data.epics) {
    if (!e.requirements?.length) bildir('B', `${e.id} hiçbir gereksinime bağlı değil — zincir yukarı doğru kopuk`)
}

// ─────────────────────────────────────────────────────────────────────────────
// [C] Bölünme dürüstlüğü
// split:'full' bir epic, altındaki HER story için FE ve BE story'si vaat eder.
// Sayfa bu rozeti gösteriyor; vaat tutulmuyorsa rozet yalan söylüyor demektir.
// ─────────────────────────────────────────────────────────────────────────────
for (const e of data.epics) {
    for (const sid of e.stories) {
        const kinds = data.childStories.filter((c) => c.parent === sid).map((c) => c.kind).sort()
        if (e.split === 'full') {
            if (kinds.join('+') !== 'backend+frontend') {
                bildir('C', `${e.id} "full" işaretli ama ${sid} altında beklenen FE+BE çifti yok (bulunan: ${kinds.join('+') || 'hiçbiri'})`)
            }
        } else if (kinds.length) {
            bildir('C', `${e.id} "pending" işaretli ama ${sid} altında ${kinds.length} child story var — rozet güncellenmeli`)
        }
    }
}

const beklenenFE = data.epics.filter((e) => e.split === 'full').flatMap((e) => e.stories).length
if (data.childStories.filter((c) => c.kind === 'frontend').length !== beklenenFE) {
    bildir('C', `frontend story sayısı, "full" epic'lerdeki story sayısıyla uyuşmuyor`)
}

// ─────────────────────────────────────────────────────────────────────────────
// [D] İki dillilik
// ─────────────────────────────────────────────────────────────────────────────
function ikiDilliMi(deger) {
    return deger && typeof deger === 'object' && typeof deger.tr === 'string' && typeof deger.en === 'string'
        && deger.tr.trim() && deger.en.trim()
}

function diliDenetle(nesne, alanlar, etiket) {
    for (const alan of alanlar) {
        const deger = nesne[alan]
        if (deger === undefined) continue
        if (Array.isArray(deger)) {
            deger.forEach((d, i) => {
                if (!ikiDilliMi(d)) bildir('D', `${etiket}.${alan}[${i}] iki dilli değil`)
            })
        } else if (!ikiDilliMi(deger)) {
            bildir('D', `${etiket}.${alan} iki dilli değil`)
        }
    }
}

data.requirements.forEach((r) => diliDenetle(r, ['title', 'need', 'rationale'], r.id))
data.epics.forEach((e) => diliDenetle(e, ['title', 'goal'], e.id))
// `screens` ekran ADIDIR ve çevrilir; `endpoints` teknik terimdir ve iki
// dilde de aynı kalır — bu yüzden yalnızca ilki iki dillilik denetimine girer.
data.childStories.forEach((c) => diliDenetle(c, ['title', 'story', 'acceptance', 'criteria', 'screens'], c.id))
data.chain.steps.forEach((s, i) => diliDenetle(s, ['label', 'detail'], `chain.steps[${i}]`))
data.testerFlow.steps.forEach((s, i) => diliDenetle(s, ['title', 'detail'], `testerFlow.steps[${i}]`))
data.faq.forEach((f, i) => diliDenetle(f, ['q', 'a'], `faq[${i}]`))

// ─────────────────────────────────────────────────────────────────────────────
// [E] Kriter dili — §25.2'nin makineyle zorlanan hâli
//
// Herkese açık `acceptance` sahada bir tester'ın eline geldiği hâlde yazılır:
// iş dilinde, tek cümle. Beklenen status kodu, hata sabiti ve Given/When/Then
// dökümü test edenin ÜRETECEĞİ çıktıdır — `criteria` alanında, admin'de kalır.
// ─────────────────────────────────────────────────────────────────────────────
const STATUS_KODU = /\b[1-5]\d{2}\b/
const HATA_SABITI = /\b[A-Z][A-Z0-9]{2,}(?:_[A-Z0-9]+)+\b/
// ⚠ Yanlış-pozitif koruması (§23.9 ile aynı disiplin): düz İngilizce bir cümle
// pekâlâ "When the server rejects..." diye başlayabilir ve bu Gherkin DEĞİLDİR.
// Gerçek sinyal, bir Given adım satırının yanında When ya da Then adım satırının
// da bulunmasıdır — yani çok satırlı bir senaryo dökümü. Tek bir anahtar kelime
// tek başına suç değildir.
const ADIM = (kelime) => new RegExp(`(^|\\n)\\s*${kelime}\\b`)
const gherkinDokumuMu = (metin) =>
    ADIM('Given').test(metin) && (ADIM('When').test(metin) || ADIM('Then').test(metin))

function acceptanceDiliniDenetle(id, acceptance) {
    acceptance.forEach((c, i) => {
        for (const dil of ['tr', 'en']) {
            const metin = c[dil]
            if (typeof metin !== 'string') continue
            const yer = `${id}.acceptance[${i}].${dil}`
            const kod = metin.match(STATUS_KODU)
            if (kod) bildir('E', `${yer} beklenen status kodu içeriyor ("${kod[0]}") — bu bilgi criteria alanına aittir`)
            const sabit = metin.match(HATA_SABITI)
            if (sabit) bildir('E', `${yer} hata sabiti içeriyor ("${sabit[0]}") — bu bilgi criteria alanına aittir`)
            if (gherkinDokumuMu(metin)) bildir('E', `${yer} Given/When/Then dökümü içeriyor — acceptance iş dilinde tek cümle olmalı`)
        }
    })
}

data.childStories.forEach((c) => acceptanceDiliniDenetle(c.id, c.acceptance))

// Gereksinim metinleri de herkese açık — aynı kural orada da geçerli.
data.requirements.forEach((r) => acceptanceDiliniDenetle(r.id, [r.need, r.rationale]))

// ─────────────────────────────────────────────────────────────────────────────
// [F] Story'nin aktörü — user story'yi KULLANICI yazar, geliştirici değil
//
// "Bir frontend geliştirici olarak ... istiyorum" bir user story DEĞİLDİR;
// kılık değiştirmiş bir task'tır. Bir story'nin değeri her zaman kullanıcıya
// akar — frontend/backend ayrımı işin NEREDE yaşadığını söyler, KİMİN
// faydalandığını değil. Aktörü geliştirici yapmak story'yi tersine çevirir ve
// test edeni "bu kim için?" sorusundan koparır.
//
// Bu, sayfayı bozmayan ama öğretmeyi bozan bir hatadır: kart yine render
// edilir, derleme yine geçer. Sonraki epic bölünürken aynı kalıbın
// kopyalanmaması için kural burada.
// ─────────────────────────────────────────────────────────────────────────────
const GELISTIRICI_AKTOR = /\b(geliştirici|yazılımcı|developer|engineer)\b\s*(olarak|,)/i

data.childStories.forEach((c) => {
    for (const dil of ['tr', 'en']) {
        const metin = c.story?.[dil]
        if (typeof metin !== 'string') continue
        const esles = metin.match(GELISTIRICI_AKTOR)
        if (esles) {
            bildir('F', `${c.id}.story.${dil} aktör olarak geliştiriciyi kullanıyor ("${esles[0]}") — user story kullanıcı gözünden yazılır; frontend/backend etiketi işin nerede yaşadığını söyler, kimin faydalandığını değil`)
        }
    }
})

// ─────────────────────────────────────────────────────────────────────────────
// Rapor
// ─────────────────────────────────────────────────────────────────────────────
const cizgi = '─'.repeat(60)
console.log(`QA Shop Backlog Kontrolü — ${data.requirements.length} gereksinim, ${data.epics.length} epic, ${businessStories.length} business story, ${data.childStories.length} frontend/backend story`)
console.log(cizgi)

if (ihlaller.length) {
    for (const i of ihlaller) console.error('  ✗ ' + i)
    console.log(cizgi)
    console.error(`QA Shop backlog: ${ihlaller.length} İHLAL ✗`)
    process.exit(1)
}

console.log(cizgi)
console.log('QA Shop backlog: TÜM KONTROLLER GEÇTİ ✓')
