// Sekme (bölüm) metadata TÜRETİMİ — saf fonksiyonlar, Node API'si kullanmaz.
//
// Neden `src/utils` altında: bu türetme İKİ yerde birden çalışır.
//   1. Build zamanı — statik shell ve sitemap üretimi (scripts/lib/sectionSeo.mjs)
//   2. Çalışma zamanı — bir sekme URL'i açıldığında sayfanın gerçek
//      <title>/description'ı (SeoMeta + TopicPage)
// İkisi ayrı yazılsaydı, Google'ın ham HTML'de gördüğü başlıkla JavaScript
// çalıştıktan sonra gördüğü başlık ayrışırdı — indeksleme bunu kararsızlık
// sayar. Tek kaynak olduğu için ayrışamaz.

const TURKISH_MAP = {
    ı: 'i', İ: 'i', ğ: 'g', Ğ: 'g', ş: 's', Ş: 's',
    ç: 'c', Ç: 'c', ö: 'o', Ö: 'o', ü: 'u', Ü: 'u',
}

const TAIL_STOPWORDS = new Set([
    'a', 'an', 'the', 'and', 'or', 'of', 'to', 'for', 'in', 'on', 'with',
    'is', 'are', 'it', 'its', 'do', 'does', 'how', 'why', 'what', 'when',
    've', 'ile', 'bir', 'da', 'de',
])

/**
 * Bölüm başlığından URL slug'ı üretir.
 * Emoji ve Türkçe karakterler temizlenir; başlıkta " — " varsa yalnızca ilk
 * parça kullanılır ("Wait Strategies — Handling Timing Issues" →
 * "wait-strategies"), çünkü kısa slug hem okunur hem paylaşılabilir kalır.
 */
export function slugifySectionTitle(title, { full = false } = {}) {
    const raw = String(title || '')
    const head = full ? raw : raw.split(/\s[—–-]\s/)[0]
    const source = head.trim().length >= 3 ? head : raw

    const ascii = [...source].map((ch) => TURKISH_MAP[ch] ?? ch).join('')
    const slug = ascii
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/&/g, ' and ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

    // 6 kelime / 48 karakter üstünü kelime sınırında kes.
    const words = slug.split('-').filter(Boolean).slice(0, 6)
    let out = words.join('-')
    while (out.length > 48 && words.length > 1) {
        words.pop()
        out = words.join('-')
    }

    // Kırpma sonrası sonda kalan bağlaç/yardımcı fiil at
    // ("what-is-selenium-how-does-it" → "what-is-selenium"). SADECE sondan:
    // baştaki "what"/"nedir" sorgunun kendisidir, korunur.
    while (words.length > 2 && TAIL_STOPWORDS.has(words[words.length - 1])) {
        words.pop()
    }
    return words.join('-')
}

/** `{tr, en}` objesi ya da düz string → istenen dildeki metin. */
export function textValue(value, locale) {
    if (!value) return ''
    if (typeof value === 'string') return value
    if (typeof value === 'object' && !Array.isArray(value)) {
        const other = locale === 'tr' ? 'en' : 'tr'
        if (typeof value[locale] === 'string') return value[locale]
        if (typeof value[other] === 'string') return value[other]
    }
    return ''
}

// Gövde metnine GİRECEK alanlar. Allowlist bilinçli: bir veri dosyasına yeni
// bir alan eklendiğinde otomatik olarak SEO metnine sızmasın (kod, çözüm,
// cevap anahtarı gibi alanlar kazara yayına çıkmasın) diye.
const PROSE_KEYS = new Set([
    'content', 'text', 'title', 'description', 'intro', 'subtitle', 'summary',
    'label', 'detail', 'explanation', 'caption', 'tip', 'why', 'analogy',
    'note', 'term', 'definition', 'meaning', 'scenario', 'goal', 'cause',
    'fix', 'when', 'headline', 'body', 'question', 'prompt',
])

// Hiç inilmeyen alanlar: kod, görsel kaynak, cevap anahtarı, teknik kimlikler.
const SKIP_KEYS = new Set([
    'code', 'starterCode', 'solutionCode', 'codeWrong', 'codeFixed', 'svg',
    'java', 'python', 'typescript', 'javascript', 'sql', 'html', 'css',
    'command', 'output', 'keywords', 'highlights', 'id', 'type', 'icon',
    'emoji', 'color', 'gradient', 'className', 'image', 'src', 'href',
    'correct', 'answerIndex', 'solution', 'relatedTopicId', 'topicId',
])

function cleanProse(value) {
    return String(value)
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

function collectProse(node, locale, out, depth = 0) {
    if (!node || depth > 6 || out.length >= 40) return

    if (Array.isArray(node)) {
        for (const item of node) collectProse(item, locale, out, depth + 1)
        return
    }

    if (typeof node !== 'object') return

    for (const [key, value] of Object.entries(node)) {
        if (SKIP_KEYS.has(key)) continue

        if (typeof value === 'string') {
            if (!PROSE_KEYS.has(key)) continue
            const cleaned = cleanProse(value)
            if (cleaned.length >= 20) out.push(cleaned)
            continue
        }

        if (value && typeof value === 'object') {
            const localized = textValue(value, locale)
            // `{tr, en}` çifti: dil seçilir, içine inilmez.
            if (localized && PROSE_KEYS.has(key) && !Array.isArray(value)) {
                const cleaned = cleanProse(localized)
                if (cleaned.length >= 20) out.push(cleaned)
                continue
            }
            collectProse(value, locale, out, depth + 1)
        }
    }
}

/** Bir bölümün crawl edilebilir düz metin parçaları (kod ve cevap anahtarı hariç). */
export function sectionProse(section, locale) {
    const out = []
    collectProse(section?.blocks ?? [], locale, out)
    // Tekrarları at (aynı metin birden çok blokta geçebilir).
    return [...new Set(out)]
}

export function wordCount(parts) {
    return parts.join(' ').split(/\s+/).filter(Boolean).length
}

/** Başlıktaki baştaki emoji/simge süslerini atar. */
export function stripLeadingEmoji(title) {
    return String(title || '')
        .replace(/^[^\p{L}\p{N}]+/u, '')
        .trim()
}

export function truncateAtWord(value, max) {
    const text = String(value || '').trim()
    if (text.length <= max) return text
    const cut = text.slice(0, max)
    const lastSpace = cut.lastIndexOf(' ')
    return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-—–]+$/, '')
}

const DESCRIPTION_TAIL = {
    tr: 'Örnekler, alıştırmalar ve gerçek QA senaryolarıyla adım adım anlatım.',
    en: 'Step-by-step explanation with examples, exercises and real QA scenarios.',
}

/**
 * Sekme için title/description türetir.
 * ELLE yazılmaz: 400+ bölüm için metadata'yı elle girmek hem sürdürülemez hem
 * de içerik değiştiğinde sessizce eskir. Kurallar (uzunluk, tekillik,
 * canonical) `check-dist-seo.mjs` tarafından doğrulanır.
 */
export function deriveSectionSeo({ sectionTitle, pageLabel, prose = [], locale }) {
    const cleanPage = truncateAtWord(stripLeadingEmoji(pageLabel), 24)
    const pageKeyword = (cleanPage.split(/\s+/)[0] || '').toLowerCase()

    // ── title ────────────────────────────────────────────────────────────────
    // Hedef ≤ 62 karakter: Google bunun üstünü SERP'te kırpar ve kırpılan
    // başlık tıklanma oranını düşürür. Bölüm başlığı zaten sayfanın adını
    // içeriyorsa ("Selenium Nedir?") sayfa etiketi TEKRAR EDİLMEZ.
    const suffix = ' | LearnQA.dev'
    let section = truncateAtWord(stripLeadingEmoji(sectionTitle), 46) || cleanPage
    const repeatsPage = pageKeyword.length > 2 && section.toLowerCase().includes(pageKeyword)

    // Bölüm başlığı kendi içinde " — " kullanabiliyor; sayfa etiketi aynı
    // işaretle eklenirse başlık iki tireli, okunması zor bir dizeye dönüşür.
    // Sayfa etiketi bu yüzden " · " ile ayrılır.
    const shortPage = cleanPage.split(/\s+/)[0]
    const build = (sec, page) => (repeatsPage ? `${sec}${suffix}` : `${sec} · ${page}${suffix}`)

    let title = build(section, cleanPage)
    if (title.length > 62) title = build(section, shortPage)
    while (title.length > 62 && section.length > 24) {
        section = truncateAtWord(section, section.length - 6)
        title = build(section, shortPage)
    }

    // ── description ──────────────────────────────────────────────────────────
    // Bölüm başlığıyla AÇILIR: aranan terim description'ın başında geçsin
    // (SERP'te kalın yazılır, sorguyla eşleşme sinyali güçlenir).
    const lead = truncateAtWord(stripLeadingEmoji(sectionTitle), 40)
    let body = ''
    for (const part of prose) {
        if (body.length >= 150) break
        body = body ? `${body} ${part}` : part
    }

    let description = cleanProse(`${lead}: ${body}`)
    if (description.length < 80) {
        description = cleanProse(`${description} ${DESCRIPTION_TAIL[locale] || DESCRIPTION_TAIL.en}`)
    }

    // Cümle sonunda bitir; olmuyorsa kelime sınırında kes (yarım kelime yok).
    if (description.length > 178) {
        const cut = description.slice(0, 178)
        const lastStop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '))
        description = lastStop >= 95 ? cut.slice(0, lastStop + 1) : truncateAtWord(cut, 178)
    }

    return { title, description }
}
