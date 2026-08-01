// src/lib/analytics.js
// Çerezsiz web analytics sarmalayıcısı (Documents/seo-phase-2-plan.md §7.3).
//
// Neden: sitede hiç sayfa-görüntüleme/olay ölçümü yoktu — "hangi sayfada terk
// ediliyor, /sprint'i kaç kişi bitiriyor, /en sayfaları trafik alıyor mu" hiç
// ölçülemiyordu. Google Analytics KULLANILMADI (çerez rızası banner'ı gerektirir,
// KVKK/GDPR yükü getirir) — Plausible script'i (index.html) çerezsizdir, rıza
// banner'ı gerektirmez.
//
// Fire-and-forget: script YÜKLENMEMİŞSE (adblock, script engelli, hesap henüz
// kurulmamış) trackEvent SESSİZCE no-op olur — sayfa hiçbir koşulda kırılmaz.
// KIRMIZI ÇİZGİ: kişisel veri (e-posta, kullanıcı id, serbest metin cevap)
// ASLA event property'si olarak gönderilmez.

export function trackEvent(name, props = {}) {
    try {
        if (typeof window === 'undefined' || typeof window.plausible !== 'function') return
        window.plausible(name, { props })
    } catch { /* ölçüm asla akışı kesmez */ }
}
