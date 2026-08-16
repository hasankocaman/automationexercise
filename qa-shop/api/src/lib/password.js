// Parola özeti — Node'un yerleşik scrypt'i. Ek bağımlılık YOK.
//
// bcrypt yerine scrypt seçilmesinin pratik nedeni: bcrypt native derleme
// ister ve Alpine tabanlı Docker imajlarında sık sık kurulum hatası verir.
// scrypt Node'un içindedir, imaj küçük ve derlemesiz kalır.
import crypto from 'node:crypto'

const KEY_LEN = 64
const PREFIX = 'scrypt'

export function hashPassword(password) {
    const salt = crypto.randomBytes(16)
    const derived = crypto.scryptSync(password, salt, KEY_LEN)
    return `${PREFIX}$${salt.toString('hex')}$${derived.toString('hex')}`
}

export function verifyPassword(password, stored) {
    if (typeof stored !== 'string') return false
    const [prefix, saltHex, hashHex] = stored.split('$')
    if (prefix !== PREFIX || !saltHex || !hashHex) return false

    let derived
    try {
        derived = crypto.scryptSync(password, Buffer.from(saltHex, 'hex'), KEY_LEN)
    } catch {
        return false
    }

    const expected = Buffer.from(hashHex, 'hex')
    // Uzunluk farklıysa timingSafeEqual İSTİSNA ATAR (eşitsizlik döndürmez) —
    // bozuk bir kayıt yüzünden 500 dönmemesi için önce uzunluk kontrol edilir.
    if (expected.length !== derived.length) return false

    // Düz `===` karşılaştırması, ilk farklı bayta kadar geçen süreyi sızdırır.
    // Ölçülebilir bir zamanlama farkı, saldırganın özeti bayt bayt tahmin
    // etmesine izin verir; timingSafeEqual sabit sürede karşılaştırır.
    return crypto.timingSafeEqual(expected, derived)
}

// Kayıt sırasında uygulanan parola politikası. Bilerek sade: kuralın kendisi
// ders değil, kuralın SINIRLARINI test etmek ders (8 karakter geçer mi,
// 7 karakter 422 mi döner).
export function passwordPolicyError(password) {
    if (typeof password !== 'string' || password.length < 8) {
        return 'Parola en az 8 karakter olmalı'
    }
    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
        return 'Parola en az bir harf ve bir rakam içermeli'
    }
    return null
}
