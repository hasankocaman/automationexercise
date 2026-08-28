// ÜRETİLMİŞ DOSYA — ELLE DÜZENLEME.
//
// Kaynak: qa-shop/api/src/core/rules.js
// Senkron: scripts/sync-qa-shop-core.mjs --write
//
// Bu modül hem Node API'sinde hem tarayıcı içi katmanda AYNI kuralları
// çalıştırır. Buradaki bir düzeltme kaynağa yazılmazsa iki taraf ayrışır;
// build hash kontrolü bunu kırar.
/* eslint-disable */
// İş kuralları — SAF fonksiyonlar (bkz. core/pricing.js başlığı).
//
// Her kural, REDDETME NEDENİNİ ayrı bir kodla döndürür. "Kupon geçersiz"
// demek yetmez: süresi mi bitti, limiti mi doldu, alt tutar mı yetersiz —
// bunlar farklı testlerdir ve API'nin her birini ayırt edebilmesi gerekir.

export const COUPON_REASONS = {
    NOT_FOUND: 'COUPON_NOT_FOUND',
    NOT_STARTED: 'COUPON_NOT_STARTED',
    EXPIRED: 'COUPON_EXPIRED',
    USAGE_LIMIT: 'COUPON_USAGE_LIMIT_REACHED',
    MIN_TOTAL: 'COUPON_MIN_TOTAL_NOT_MET',
}

export function checkCoupon(coupon, subtotal, now = new Date()) {
    if (!coupon) {
        return { ok: false, reason: COUPON_REASONS.NOT_FOUND, message: 'Böyle bir kupon yok' }
    }
    if (coupon.valid_from && new Date(coupon.valid_from) > now) {
        return {
            ok: false, reason: COUPON_REASONS.NOT_STARTED,
            message: 'Kupon henüz başlamadı',
            details: { validFrom: coupon.valid_from },
        }
    }
    if (coupon.valid_to && new Date(coupon.valid_to) < now) {
        return {
            ok: false, reason: COUPON_REASONS.EXPIRED,
            message: 'Kuponun süresi doldu',
            details: { validTo: coupon.valid_to },
        }
    }
    if (coupon.max_uses != null && Number(coupon.used_count) >= Number(coupon.max_uses)) {
        return {
            ok: false, reason: COUPON_REASONS.USAGE_LIMIT,
            message: 'Kupon kullanım limiti doldu',
            details: { maxUses: coupon.max_uses, usedCount: coupon.used_count },
        }
    }
    if (Number(subtotal) < Number(coupon.min_total)) {
        return {
            ok: false, reason: COUPON_REASONS.MIN_TOTAL,
            message: `Bu kupon için sepet tutarı en az ${coupon.min_total} olmalı`,
            details: { minTotal: coupon.min_total, subtotal },
        }
    }
    return { ok: true }
}

// Satılabilir adet = stok - rezerve.
//
// Sadece `stock_qty`'ye bakmak, sepette bekleyen adedi görmez ve OVERSELL
// üretir: iki kullanıcı son ürünü aynı anda sipariş eder, ikisi de geçer.
// Bu ayrımın kendisi bir test senaryosudur.
export function availableQty(stockQty, reservedQty) {
    return Math.max(0, Number(stockQty) - Number(reservedQty))
}

export function checkStock({ stock_qty, reserved_qty }, requestedQty) {
    const available = availableQty(stock_qty, reserved_qty)
    if (Number(requestedQty) > available) {
        return {
            ok: false,
            message: available === 0 ? 'Ürün tükendi' : `Stokta yalnızca ${available} adet var`,
            details: { requested: Number(requestedQty), available },
        }
    }
    return { ok: true, available }
}

// Sipariş yaşam döngüsü. Hangi durumdan hangisine geçilebileceği TEK yerde
// tanımlı — her endpoint kendi `if` zincirini yazsaydı, biri güncellenip
// diğeri unutulurdu.
export const ORDER_TRANSITIONS = {
    placed:    ['paid', 'cancelled'],
    paid:      ['shipped', 'cancelled'],
    shipped:   ['delivered', 'returned'],
    delivered: ['returned'],
    cancelled: [],
    returned:  [],
}

export function canTransition(from, to) {
    return (ORDER_TRANSITIONS[from] || []).includes(to)
}

// İptal edilebilirlik: kargolanmış sipariş iptal EDİLEMEZ, iade edilir.
// İkisini karıştırmak stok ve muhasebe tarafında farklı sonuçlar doğurur.
export function canCancel(status) {
    return canTransition(status, 'cancelled')
}

export const RETURN_WINDOW_DAYS = 14

export function canReturn(status, deliveredAt, now = new Date()) {
    if (!canTransition(status, 'returned')) {
        return { ok: false, message: `'${status}' durumundaki sipariş iade edilemez` }
    }
    if (deliveredAt) {
        const days = (now - new Date(deliveredAt)) / 86_400_000
        if (days > RETURN_WINDOW_DAYS) {
            return { ok: false, message: `İade süresi ${RETURN_WINDOW_DAYS} gündür, doldu` }
        }
    }
    return { ok: true }
}
