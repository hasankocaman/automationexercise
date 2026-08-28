// ÜRETİLMİŞ DOSYA — ELLE DÜZENLEME.
//
// Kaynak: qa-shop/api/src/core/pricing.js
// Senkron: scripts/sync-qa-shop-core.mjs --write
//
// Bu modül hem Node API'sinde hem tarayıcı içi katmanda AYNI kuralları
// çalıştırır. Buradaki bir düzeltme kaynağa yazılmazsa iki taraf ayrışır;
// build hash kontrolü bunu kırar.
/* eslint-disable */
// Fiyat hesabı — SAF fonksiyonlar. Veritabanı yok, Express yok, yan etki yok.
//
// Neden ayrı bir dosya: bu kurallar ileride tarayıcı içi katmanda (MSW) de
// aynen çalışacak. İş mantığı route handler'ının içine gömülseydi, tarayıcı
// tarafı için ikinci kez yazılmak zorunda kalırdı — ve iki kopya kaçınılmaz
// olarak birbirinden kayardı. Tek çekirdek, iki sunum.

// Para yuvarlama. Kayan noktalı sayılarda 0.1 + 0.2 === 0.30000000000000004
// olduğu için her ara adımdan sonra 2 haneye sabitlenir; yoksa kuruş farkları
// birikip mutabakat sorgularını (A1/A2) haksız yere kırmızıya düşürür.
export const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100

export function lineTotal(unitPrice, qty) {
    return round2(Number(unitPrice) * Number(qty))
}

export function subtotalOf(items) {
    return round2(items.reduce((sum, it) => sum + Number(it.line_total ?? lineTotal(it.unit_price, it.qty)), 0))
}

// Kupon indirimi. Kupon geçersizse çağrılmaz (bkz. core/rules.js) — bu
// fonksiyon yalnızca TUTARI hesaplar, GEÇERLİLİĞE karar vermez. İki sorumluluk
// birbirine karışırsa "geçersiz kupon indirim üretti" bug'ı kaçınılmaz olur.
export function discountFor(coupon, subtotal) {
    if (!coupon) return 0
    const base = Number(subtotal)
    const raw = coupon.kind === 'percent'
        ? base * (Number(coupon.value) / 100)
        : Number(coupon.value)
    // İndirim ara toplamı AŞAMAZ: aksi hâlde negatif sipariş tutarı oluşur
    // ve müşteriye para iade eden bir "satış" ortaya çıkar.
    return round2(Math.min(raw, base))
}

export const FREE_SHIPPING_THRESHOLD = 500
export const SHIPPING_FEE = 29.90

export function shippingFor(subtotal) {
    return Number(subtotal) >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
}

// Sipariş toplamının TEK tanımı. Bu formül db/validation-queries.sql · A1
// kontrolüyle birebir aynı olmalıdır — biri değişip diğeri değişmezse
// doğrulama sorgusu her siparişi hatalı sanar.
export function grandTotalOf({ subtotal, discount, shipping }) {
    return round2(Number(subtotal) - Number(discount) + Number(shipping))
}

// Sepet/sipariş özetini tek yerden üretir.
export function summarize(items, coupon) {
    const subtotal = subtotalOf(items)
    const discount = discountFor(coupon, subtotal)
    const shipping = shippingFor(subtotal)
    return {
        subtotal,
        discount_total: discount,
        shipping_total: shipping,
        grand_total: grandTotalOf({ subtotal, discount, shipping }),
    }
}
