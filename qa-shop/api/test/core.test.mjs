// Çekirdek iş kuralları — VERİTABANI GEREKTİRMEZ.
//
// core/ klasörü bilinçli olarak saf tutuldu (bkz. core/pricing.js başlığı):
// fiyat ve kural hesapları Express'ten ve PostgreSQL'den bağımsız. Bunun somut
// karşılığı bu dosyadır — Docker ayakta olmasa bile fiyat mantığı saniyeler
// içinde doğrulanabilir.
//
//     npm test          (qa-shop/api içinde)
import { test, describe } from 'node:test'
import assert from 'node:assert/strict'

import {
    round2, lineTotal, subtotalOf, discountFor, shippingFor, grandTotalOf, summarize,
    FREE_SHIPPING_THRESHOLD, SHIPPING_FEE,
} from '../src/core/pricing.js'

import {
    checkCoupon, COUPON_REASONS, availableQty, checkStock,
    canTransition, canCancel, canReturn, RETURN_WINDOW_DAYS, ORDER_TRANSITIONS,
} from '../src/core/rules.js'

import {
    BUG_FLAGS, BUG_FLAG_KEYS, isBugOn, activeFlags, describeFlags, unknownFlagKeys,
    HIDDEN_KEY, isHidden, pickRandomFlags, describeFlagsHidden, hiddenCount,
} from '../src/core/bugFlags.js'

describe('pricing — para hesabı', () => {
    test('round2 kayan nokta artığını temizler', () => {
        // 0.1 + 0.2 === 0.30000000000000004 tuzağı. Yuvarlanmazsa kuruş farkları
        // birikir ve mutabakat kontrolleri haksız yere kırmızıya döner.
        assert.equal(round2(0.1 + 0.2), 0.3)
        assert.equal(round2(2.005), 2.01)
        assert.equal(round2(100), 100)
    })

    test('lineTotal adet ile birim fiyatı çarpar', () => {
        assert.equal(lineTotal(19.99, 3), 59.97)
        assert.equal(lineTotal(0, 5), 0)
    })

    test('subtotalOf satır toplamı verilmemişse kendisi hesaplar', () => {
        assert.equal(subtotalOf([{ line_total: 10 }, { line_total: 5.5 }]), 15.5)
        assert.equal(subtotalOf([{ unit_price: 10, qty: 2 }]), 20)
    })

    test('yüzde kuponu ara toplam üzerinden hesaplanır', () => {
        assert.equal(discountFor({ kind: 'percent', value: 10 }, 200), 20)
    })

    test('sabit kupon ara toplamı AŞAMAZ', () => {
        // Aşsaydı negatif sipariş tutarı oluşur, yani müşteriye para iade eden
        // bir satış ortaya çıkardı.
        assert.equal(discountFor({ kind: 'fixed', value: 500 }, 120), 120)
    })

    test('kupon yoksa indirim sıfırdır', () => {
        assert.equal(discountFor(null, 100), 0)
    })

    test('kargo eşiği: eşikte bedava, altında ücretli', () => {
        assert.equal(shippingFor(FREE_SHIPPING_THRESHOLD), 0)
        assert.equal(shippingFor(FREE_SHIPPING_THRESHOLD - 0.01), SHIPPING_FEE)
    })

    test('grandTotal formülü: ara toplam - indirim + kargo', () => {
        assert.equal(grandTotalOf({ subtotal: 200, discount: 20, shipping: 29.9 }), 209.9)
    })

    test('summarize dört alanı birlikte üretir — eşiğin ALTINDA kargo eklenir', () => {
        // 200 TL, bedava kargo eşiğinin (500) altında: 200 - 20 + 29.90 = 209.90
        const totals = summarize([{ unit_price: 100, qty: 2 }], { kind: 'percent', value: 10 })
        assert.deepEqual(totals, {
            subtotal: 200, discount_total: 20, shipping_total: SHIPPING_FEE, grand_total: 209.9,
        })
    })

    test('summarize — eşiğin ÜSTÜNDE kargo sıfırlanır', () => {
        // İndirim kargo eşiğini AŞAĞI çekmez: eşik ara toplama bakar, indirimli
        // tutara değil. 600 - 60 = 540 olsa da kargo yine bedava.
        const totals = summarize([{ unit_price: 300, qty: 2 }], { kind: 'percent', value: 10 })
        assert.equal(totals.subtotal, 600)
        assert.equal(totals.shipping_total, 0)
        assert.equal(totals.grand_total, 540)
    })

    test('summarize ile mutabakat formülü her zaman tutar', () => {
        // Doğrulama sorgularındaki mutabakat kontrolü tam olarak bu eşitliği
        // arar. Formül burada değişip orada değişmezse, kontrol her siparişi
        // hatalı sanardı — bu test iki tarafı birbirine bağlar.
        for (const [qty, price] of [[1, 9.99], [3, 33.33], [7, 128.5]]) {
            const t = summarize([{ unit_price: price, qty }], { kind: 'percent', value: 15 })
            assert.equal(t.grand_total, round2(t.subtotal - t.discount_total + t.shipping_total))
        }
    })
})

describe('rules — kupon geçerliliği', () => {
    const gecerli = { kind: 'percent', value: 10, min_total: 0, used_count: 0 }

    test('kupon yoksa NOT_FOUND', () => {
        assert.equal(checkCoupon(null, 100).reason, COUPON_REASONS.NOT_FOUND)
    })

    test('başlamamış kupon NOT_STARTED', () => {
        const yarin = new Date(Date.now() + 86_400_000)
        const v = checkCoupon({ ...gecerli, valid_from: yarin }, 100)
        assert.equal(v.reason, COUPON_REASONS.NOT_STARTED)
    })

    test('süresi dolmuş kupon EXPIRED', () => {
        const dun = new Date(Date.now() - 86_400_000)
        assert.equal(checkCoupon({ ...gecerli, valid_to: dun }, 100).reason, COUPON_REASONS.EXPIRED)
    })

    test('limiti dolmuş kupon USAGE_LIMIT', () => {
        const v = checkCoupon({ ...gecerli, max_uses: 5, used_count: 5 }, 100)
        assert.equal(v.reason, COUPON_REASONS.USAGE_LIMIT)
    })

    test('alt tutar karşılanmazsa MIN_TOTAL', () => {
        const v = checkCoupon({ ...gecerli, min_total: 1000 }, 100)
        assert.equal(v.reason, COUPON_REASONS.MIN_TOTAL)
        assert.equal(v.details.subtotal, 100)
    })

    test('beş red nedeni birbirinden AYRI kodlarla döner', () => {
        // Hepsi tek bir "kupon geçersiz" mesajına indirgenseydi, hangi iş
        // kuralının çalıştığını test etmek imkânsız olurdu.
        const kodlar = new Set(Object.values(COUPON_REASONS))
        assert.equal(kodlar.size, 5)
    })

    test('geçerli kupon ok döner', () => {
        assert.equal(checkCoupon(gecerli, 100).ok, true)
    })
})

describe('rules — stok', () => {
    test('satılabilir adet = stok - rezerve', () => {
        assert.equal(availableQty(10, 3), 7)
    })

    test('rezerve stoğu aşarsa negatife düşmez', () => {
        assert.equal(availableQty(2, 5), 0)
    })

    test('rezerve edilmiş adet satılabilir sayılmaz', () => {
        // Yalnızca stock_qty'ye bakan bir kontrol burada yanlışlıkla GEÇERDİ.
        // Oversell tam olarak bu farktan doğar.
        const inv = { stock_qty: 5, reserved_qty: 4 }
        assert.equal(checkStock(inv, 2).ok, false)
        assert.equal(checkStock(inv, 1).ok, true)
    })

    test('tükenmiş üründe mesaj ayrışır', () => {
        const v = checkStock({ stock_qty: 3, reserved_qty: 3 }, 1)
        assert.equal(v.ok, false)
        assert.equal(v.details.available, 0)
    })
})

describe('rules — sipariş durum geçişleri', () => {
    test('izinli geçişler', () => {
        assert.ok(canTransition('placed', 'paid'))
        assert.ok(canTransition('paid', 'shipped'))
        assert.ok(canTransition('shipped', 'delivered'))
        assert.ok(canTransition('delivered', 'returned'))
    })

    test('ödemesiz kargo ENGELLENİR', () => {
        // Doğrulama sorgularındaki "ödemesi alınmamış ama kargolanmış sipariş"
        // kontrolünün uygulama tarafındaki karşılığı.
        assert.equal(canTransition('placed', 'shipped'), false)
    })

    test('kargolanmış sipariş iptal edilemez, iade edilir', () => {
        assert.equal(canCancel('shipped'), false)
        assert.ok(canTransition('shipped', 'returned'))
    })

    test('bitmiş durumlardan çıkış yok', () => {
        assert.deepEqual(ORDER_TRANSITIONS.cancelled, [])
        assert.deepEqual(ORDER_TRANSITIONS.returned, [])
    })

    test('bilinmeyen durum çökmez, false döner', () => {
        assert.equal(canTransition('boyle-bir-durum-yok', 'paid'), false)
    })

    test('iade penceresi dolduysa reddedilir', () => {
        const cokEski = new Date(Date.now() - (RETURN_WINDOW_DAYS + 1) * 86_400_000)
        assert.equal(canReturn('delivered', cokEski).ok, false)
    })

    test('iade penceresi içindeyse kabul edilir', () => {
        const dun = new Date(Date.now() - 86_400_000)
        assert.equal(canReturn('delivered', dun).ok, true)
    })

    test('teslim edilmemiş sipariş iade edilemez', () => {
        assert.equal(canReturn('placed', null).ok, false)
    })
})

describe('bugFlags — kontrollü kusur kataloğu', () => {
    test('kapalı anahtar false döner', () => {
        assert.equal(isBugOn({}, 'oversell'), false)
        assert.equal(isBugOn(null, 'oversell'), false)
        assert.equal(isBugOn(undefined, 'oversell'), false)
    })

    test('yalnızca gerçek true açık sayılır', () => {
        // 'true' metni, 1 veya boş nesne AÇIK SAYILMAZ. Gevşek karşılaştırma
        // olsaydı, yanlış tipte gönderilen bir değer kusuru sessizce açardı.
        assert.equal(isBugOn({ oversell: true }, 'oversell'), true)
        assert.equal(isBugOn({ oversell: 'true' }, 'oversell'), false)
        assert.equal(isBugOn({ oversell: 1 }, 'oversell'), false)
    })

    test('activeFlags yalnızca açık olanları listeler', () => {
        assert.deepEqual(activeFlags({ oversell: true, discount_twice: false }), ['oversell'])
        assert.deepEqual(activeFlags({}), [])
    })

    test('bilinmeyen anahtar yakalanır', () => {
        assert.deepEqual(unknownFlagKeys(['oversell', 'uydurma_anahtar']), ['uydurma_anahtar'])
        assert.deepEqual(unknownFlagKeys(BUG_FLAG_KEYS), [])
    })

    test('katalogdaki her anahtar iki dilde eksiksiz tanımlı', () => {
        // Katalog kullanıcıya doğrudan gösteriliyor; eksik bir alan arayüzde
        // boş kutu olarak görünürdü.
        for (const key of BUG_FLAG_KEYS) {
            const flag = BUG_FLAGS[key]
            for (const alan of ['title', 'breaks', 'catchableBy']) {
                assert.ok(flag[alan]?.tr, `${key}.${alan}.tr eksik`)
                assert.ok(flag[alan]?.en, `${key}.${alan}.en eksik`)
            }
        }
    })

    test('describeFlags açık/kapalı durumu taşır', () => {
        const liste = describeFlags({ oversell: true })
        const oversell = liste.find((f) => f.key === 'oversell')
        assert.equal(oversell.enabled, true)
        assert.equal(liste.every((f) => typeof f.key === 'string'), true)
        assert.equal(liste.length, BUG_FLAG_KEYS.length)
    })
})

describe('bugFlags — gizli tur', () => {
    test('gizli katalog HANGİ kusurun açık olduğunu TAŞIMAZ', () => {
        // Bu paketin en önemli testi. Gizli turun tek vaadi cevabı
        // saklamaktır; katalogda `enabled` alanı kalsaydı vaat sessizce
        // boşa düşerdi ve bunu hiçbir şey söylemezdi.
        const liste = describeFlagsHidden()
        assert.equal(liste.length, BUG_FLAG_KEYS.length)
        for (const kusur of liste) {
            assert.ok(!('enabled' in kusur), `${kusur.key} enabled alanı taşıyor`)
        }
    })

    test('gizli katalog kusurların KENDİSİNİ gösterir — av listesi', () => {
        // Cevabı saklamak, ihtimalleri saklamak demek değildir. Kullanıcı
        // neyin mümkün olduğunu bilmeli; yoksa arama sınırı belirsiz bir
        // tahmin oyununa döner.
        const liste = describeFlagsHidden()
        for (const kusur of liste) {
            assert.ok(kusur.title?.tr && kusur.title?.en)
            assert.ok(kusur.catchableBy?.tr && kusur.catchableBy?.en)
        }
    })

    test('isHidden yalnızca ayrılmış anahtara bakar', () => {
        assert.equal(isHidden({}), false)
        assert.equal(isHidden({ oversell: true }), false)
        assert.equal(isHidden({ [HIDDEN_KEY]: true }), true)
        assert.equal(isHidden(null), false)
    })

    test('ayrılmış anahtar kusur sayılmaz', () => {
        // activeFlags yalnızca BUG_FLAG_KEYS üzerinde döner; dönmeseydi
        // gizli tur işaretinin kendisi "açık kusur" gibi sayılır ve
        // kullanıcıya bir fazla kusur varmış gibi görünürdü.
        const flags = { [HIDDEN_KEY]: true, oversell: true }
        assert.deepEqual(activeFlags(flags), ['oversell'])
        assert.equal(hiddenCount(flags), 1)
        assert.equal(unknownFlagKeys([HIDDEN_KEY]).length, 1)   // kullanıcı PATCH ile yazamaz
    })

    test('pickRandomFlags istenen adette ve TEKRARSIZ döner', () => {
        for (const adet of [1, 3, 5, BUG_FLAG_KEYS.length]) {
            const secim = pickRandomFlags(adet)
            assert.equal(secim.length, adet)
            assert.equal(new Set(secim).size, adet, "aynı kusur iki kez seçildi")
            for (const k of secim) assert.ok(BUG_FLAG_KEYS.includes(k))
        }
    })

    test('pickRandomFlags sınırların dışına taşmaz', () => {
        assert.equal(pickRandomFlags(0).length, 1)
        assert.equal(pickRandomFlags(999).length, BUG_FLAG_KEYS.length)
    })

    test('seçim gerçekten değişiyor — sabit sıra değil', () => {
        // Sıra sabit olsaydı kullanıcı ikinci turda diziyi ezberler ve
        // arama biterdi. 40 turda ilk sıradaki anahtarın hep aynı çıkma
        // olasılığı yok denecek kadar düşüktür.
        const ilkler = new Set()
        for (let i = 0; i < 40; i += 1) ilkler.add(pickRandomFlags(3)[0])
        assert.ok(ilkler.size > 1, "seçim sabit görünüyor")
    })
})
