// ─── Kurulum sekmeleri için HowTo türetimi ───────────────────────────────────
//
// "docker kurulumu", "selenium nasıl kurulur", "python install" gibi sorgular
// prosedür arayan sorgulardır: kullanıcı bir tanım değil, sıralı adımlar arar.
// Kurulum sekmelerinin içeriği zaten sıralı adımlardan oluşuyor (`installation`,
// `steps`, `step-animation` blokları) ama bu sıra yalnızca görsel bir düzendi —
// makineye "bu bir prosedürdür, adımları şunlardır" diyen hiçbir işaret yoktu.
//
// Buradaki türetme o işareti üretir. İKİ sert kısıt var:
//   1. Adımlar UYDURULMAZ — yalnızca sayfada zaten var olan bloklardan okunur.
//   2. Şemaya giren her adım, sayfanın GÖRÜNÜR gövdesinde de basılır
//      (generate-static-routes.mjs bunu yapar, check-dist-seo.mjs doğrular).
//      Görünmeyen adımı şemaya koymak, ana sayfanın FAQ şemasının bir zamanlar
//      kaldırılma sebebiyle aynı ihlaldir.
//
// ⚠ Not: Google, HowTo zengin sonuçlarını 2023'te kullanımdan kaldırdı — bu
// şema artık Google'da görsel bir zengin sonuç ÜRETMEZ. Yine de üretiliyor,
// çünkü (a) Bing ve diğer motorlar hâlâ kullanıyor, (b) sayfanın bir prosedür
// olduğunu makine tarafından okunur kılıyor, (c) asıl kazanç zaten yan ürün:
// kurulum adımları bu iş sayesinde İLK KEZ statik HTML'de görünür hâle geldi
// (önceden `cmd` ve düz metin adım listeleri crawl edilebilir metne HİÇ
// girmiyordu — allowlist'te olmayan alanlardı).

import { textValue } from '../../src/utils/sectionSeoText.js'

/** Kurulum sekmesi mi? Başlık üzerinden karar verilir (iki dilde de bakılır). */
const INSTALL_TITLE_RE = /kurulum|kurulumu|install|installing|setup|getting started/i

/** Şemaya giren en fazla adım — daha uzunu prosedür değil, ders anlatımıdır. */
const MAX_STEPS = 12
const MIN_STEPS = 3

export function isInstallationTitle(...titles) {
    return titles.some((title) => INSTALL_TITLE_RE.test(String(title || '')))
}

/** "# Adım 1: WSL 2'yi Etkinleştir" → "WSL 2'yi Etkinleştir" */
function cleanStepName(value) {
    return String(value || '')
        .replace(/^\s*#+\s*/, '')
        .replace(/^\s*(adım|step)\s*\d+\s*[:.)-]\s*/i, '')
        .replace(/^\s*\d+\s*[:.)-]\s*/, '')
        .replace(/\s+/g, ' ')
        .trim()
}

function truncate(value, max) {
    const text = String(value || '').trim()
    if (text.length <= max) return text
    const cut = text.slice(0, max)
    const lastSpace = cut.lastIndexOf(' ')
    return (lastSpace > max * 0.5 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-—–]+$/, '')
}

/**
 * Bir adımın adı ve açıklaması. `name` kısa ve emir kipine yakın olmalı,
 * `text` gerçekten uygulanabilir talimatı taşımalı. İkisi de boşsa adım düşer.
 */
function toStep(name, text) {
    const cleanName = truncate(cleanStepName(name), 90)
    const cleanText = String(text || '').replace(/\s+/g, ' ').trim()
    if (!cleanName && !cleanText) return null
    return {
        name: cleanName || truncate(cleanText, 70),
        text: cleanText || cleanName,
        // Adı olmayan adımlarda ad, metnin kırpılmış hâlinden türetilir. Bu
        // durumda ad ekranda TEKRAR basılmaz ("Windows: SQLite indir —
        // Windows: SQLite indir ve C:\sqlite\ klasörüne çıkar" gibi kekeleyen
        // bir satır çıkardı) ve şemaya da yalnızca metin girer.
        derivedName: !cleanName,
    }
}

function fromInstallationBlock(block, locale) {
    return (block.steps || [])
        .map((step) => toStep(textValue(step.cmd, locale) || step.cmd, textValue(step.explanation, locale)))
        .filter(Boolean)
}

function fromStepsBlock(block, locale) {
    return (block.items || [])
        .map((item) => {
            if (typeof item === 'string') return toStep('', item)
            const localized = textValue(item, locale)
            if (localized) return toStep('', localized)
            const label = textValue(item.label, locale)
            const desc = textValue(item.desc, locale) || textValue(item.detail, locale)
            return toStep(label, desc || label)
        })
        .filter(Boolean)
}

// `step-annimation` BİLEREK kaynak DEĞİL: adları adım gibi görünse de o blok
// çoğu sayfada bir MEKANİZMAYI anlatır ("Sürüm bir sözleşmedir", "Docker
// Desktop ilk çalıştırma akışı"), uygulanabilir bir talimat değildir. Onu
// prosedür diye işaretlemek, kullanıcının izleyemeyeceği sahte bir kurulum
// rehberi ilan etmek olurdu — şemanın içeriği yanlış tanımlaması, eksik
// tanımlamasından daha pahalıdır.

/**
 * Bölümün bloklarından tek bir prosedür türetir.
 *
 * Kaynak önceliği bilinçli: bir kurulum sekmesinde birden fazla adım listesi
 * olabilir (Windows / macOS gibi) ve hepsini TEK prosedüre eklemek "önce
 * Windows'u kur, sonra macOS'u kur" diyen anlamsız bir talimat üretirdi.
 * Bu yüzden İLK uygun blok kullanılır — sayfada da ilk anlatılan yol odur.
 */
export function howToFromSection(section, locale, { sectionTitle } = {}) {
    const blocks = Array.isArray(section?.blocks) ? section.blocks : []
    const sources = [
        (block) => (block.type === 'installation' ? fromInstallationBlock(block, locale) : null),
        (block) => (block.type === 'steps' ? fromStepsBlock(block, locale) : null),
    ]

    for (const pick of sources) {
        for (const block of blocks) {
            const steps = pick(block)
            if (Array.isArray(steps) && steps.length >= MIN_STEPS) {
                return {
                    name: truncate(String(sectionTitle || '').replace(/^[^\p{L}\p{N}]+/u, '').trim(), 100),
                    steps: steps.slice(0, MAX_STEPS),
                }
            }
        }
    }

    return null
}
