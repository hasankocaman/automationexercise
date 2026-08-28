// QA Shop — SQL doğrulama sorgularının iş kuralı / user story / defect
// anahtarı EŞLEMESİ. YALNIZCA ADMIN'E RENDER EDİLİR.
//
// NEDEN AYRI BİR DOSYA: "hangi sorgu hangi kuralı görür" bilgisi, test edenin
// üreteceği iş çıktısıdır. Hazır verilirse story'yi veri katmanından sınama
// işi bir okuma alıştırmasına döner. İçeriği yazan taraf doğruluğunu
// denetleyebilsin diye duruyor; herkese açık dizin qaShopSqlPackData.js'te.
//
// Bu bir güvenlik sınırı DEĞİL, pedagojik bir sınırdır — dosya istemci
// paketine girer, tıpkı story'lerin admin'e açık teknik kriterleri gibi.
//
// TUTARLILIK: scripts/check-qa-shop-sql-map.mjs her satırı doğrular —
// sorgu id'si SQL dosyasında, kural id'si ve story id'si şartname verisinde,
// defect anahtarı da çekirdek modülde gerçekten var mı.

export const SQL_CHECK_MAP = {
    A1: { kural: ['K3'], story: ['US-08', 'US-09'], defect: ['discount_twice'] },
    A2: { kural: ['K3'], story: ['US-06', 'US-09'], defect: ['wrong_line_total'] },
    A3: { kural: ['K3'], story: ['US-06', 'US-09'], defect: ['wrong_line_total'] },
    A4: { kural: ['K3'], story: ['US-10'], defect: ['discount_twice'] },

    B1: { kural: ['K6'], story: ['US-13'], defect: ['leak_other_users_orders'] },
    B2: { kural: ['K6'], story: ['US-16'], defect: [] },
    B3: { kural: ['K6'], story: ['US-16'], defect: [] },
    B4: { kural: ['K3'], story: ['US-09'], defect: [] },
    B5: { kural: ['K1'], story: ['US-05', 'US-16'], defect: [] },

    C1: { kural: ['K1'], story: ['US-05', 'US-09'], defect: ['oversell'] },
    C2: { kural: ['K2'], story: ['US-07'], defect: [] },
    C3: { kural: ['K2'], story: ['US-07', 'US-08'], defect: ['ignore_coupon_expiry'] },
    C4: { kural: ['K2'], story: ['US-08'], defect: [] },
    C5: { kural: [], story: ['US-11', 'US-12'], defect: [] },
    C6: { kural: [], story: ['US-10', 'US-11'], defect: [] },
    C7: { kural: ['K5'], story: ['US-14'], defect: ['pending_reviews_in_average'] },
    C8: { kural: [], story: ['US-03'], defect: [] },

    D1: { kural: [], story: ['US-01'], defect: [] },
    D2: { kural: [], story: ['US-03', 'US-04'], defect: [] },
    D3: { kural: [], story: ['US-03'], defect: [] },
    D4: { kural: ['K7'], story: ['US-15'], defect: [] },
    D5: { kural: [], story: ['US-09'], defect: [] },

    // Log ve rapor sorguları tek bir kurala bağlanmaz: bir hatanın kök nedenini
    // ararken hangi story'de olduğunu zaten bilmiyorsundur.
    E1: { kural: [], story: [], defect: [] },
    E2: { kural: [], story: [], defect: [] },
    E3: { kural: [], story: [], defect: [] },
    E4: { kural: [], story: [], defect: [] },

    G1: { kural: [], story: [], defect: [] },
    G2: { kural: [], story: [], defect: [] },
    G3: { kural: [], story: [], defect: [] },
    G4: { kural: [], story: [], defect: [] },
}

// Ters indeks — kural kartı ve story kartı "beni hangi sorgular görür" diye
// sorar. Elle ikinci bir liste yazmak yerine türetiliyor: eşleme değişince
// ters indeks de değişir, ayrışamazlar.
function tersIndeks(alan) {
    const cikti = {}
    for (const [sorgu, bag] of Object.entries(SQL_CHECK_MAP)) {
        for (const anahtar of bag[alan]) {
            (cikti[anahtar] ||= []).push(sorgu)
        }
    }
    return cikti
}

export const SQL_CHECKS_BY_RULE = tersIndeks('kural')
export const SQL_CHECKS_BY_STORY = tersIndeks('story')
export const SQL_CHECKS_BY_DEFECT = tersIndeks('defect')
