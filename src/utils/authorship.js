// YAZAR / KURUM KİMLİĞİ — tek kaynak.
//
// Neden `src/utils` altında: bu bilgi İKİ yerde birden kullanılır.
//   1. Build zamanı — statik shell'lerin JSON-LD grafiği ve görünür künyesi
//      (scripts/generate-static-routes.mjs)
//   2. Çalışma zamanı — ders sayfasında JavaScript sonrası görünen künye
//      (src/components/TopicPage.jsx)
// İkisi ayrı yazılsaydı, arama motorunun ham HTML'de gördüğü yazar bilgisiyle
// sayfayı render ettikten sonra gördüğü ayrışırdı. Yazar/yayıncı bilgisinde bu
// ayrışma özellikle pahalıdır: içeriğin arkasında gerçek bir kişi olduğunu
// doğrulamak, arama motorunun kalite değerlendirmesindeki ana sinyallerden
// biridir — çelişkili sinyal onu tümden değersizleştirir.
//
// Şemadaki kişi/kurum, sayfada GÖRÜNEN künyeyle aynı olmak zorundadır; bu
// yüzden metinler de burada durur, bileşenin içinde hardcode edilmez.

export const SITE_ORIGIN = 'https://learnqa.dev'

/** JSON-LD düğüm kimlikleri — grafikteki diğer düğümler bunlara referans verir. */
export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`
export const AUTHOR_ID = `${SITE_ORIGIN}/#author`

export const ORGANIZATION = {
    name: 'LearnQA.dev',
    url: `${SITE_ORIGIN}/`,
    logo: `${SITE_ORIGIN}/favicon.svg`,
    sameAs: [
        'https://github.com/hasankocaman/automationexercise',
        'https://www.linkedin.com/in/hasankocaman/',
    ],
}

export const AUTHOR = {
    name: 'Hasan Kocaman',
    url: 'https://www.linkedin.com/in/hasankocaman/',
    jobTitle: {
        tr: 'QA Otomasyon Mühendisi',
        en: 'QA Automation Engineer',
    },
    sameAs: [
        'https://www.linkedin.com/in/hasankocaman/',
        'https://github.com/hasankocaman',
    ],
}

/** Görünür künyenin sabit parçaları (şemadaki adla BİREBİR aynı ad kullanılır). */
export const BYLINE_TEXT = {
    tr: {
        author: 'Yazan',
        publisher: 'Yayıncı',
        updated: 'Son güncelleme',
    },
    en: {
        author: 'Written by',
        publisher: 'Published by',
        updated: 'Last updated',
    },
}

/** `Organization` düğümü — her sayfanın grafiğine bir kez girer. */
export function organizationNode() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: ORGANIZATION.name,
        url: ORGANIZATION.url,
        logo: {
            '@type': 'ImageObject',
            url: ORGANIZATION.logo,
        },
        sameAs: ORGANIZATION.sameAs,
        founder: { '@id': AUTHOR_ID },
    }
}

/** `Person` düğümü — içeriği yazan gerçek kişi. */
export function authorNode(locale) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': AUTHOR_ID,
        name: AUTHOR.name,
        url: AUTHOR.url,
        jobTitle: AUTHOR.jobTitle[locale] || AUTHOR.jobTitle.en,
        sameAs: AUTHOR.sameAs,
        worksFor: { '@id': ORGANIZATION_ID },
    }
}

/**
 * ISO tarihi (`2026-08-03T12:00:00+03:00`) → sayfada görünen kısa tarih.
 * Tarih biçimi dile göre değişir; `Intl` yerine elle kuruluyor çünkü aynı
 * dizenin build (Node) ve tarayıcı tarafında BİREBİR aynı çıkması gerekiyor —
 * `Intl` çıktısı ortamın ICU sürümüne göre değişebiliyor.
 */
const MONTHS = {
    tr: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
}

export function formatUpdatedDate(iso, locale) {
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''))
    if (!match) return ''
    const [, year, month, day] = match
    const names = MONTHS[locale] || MONTHS.en
    const monthName = names[Number(month) - 1]
    if (!monthName) return ''
    return locale === 'tr'
        ? `${Number(day)} ${monthName} ${year}`
        : `${monthName} ${Number(day)}, ${year}`
}

/**
 * Görünür künye satırının parçaları. Aynı fonksiyon hem statik HTML'i hem
 * React bileşenini besler, böylece iki metin ayrışamaz.
 */
export function bylineParts(locale, updatedIso) {
    const labels = BYLINE_TEXT[locale] || BYLINE_TEXT.en
    const updated = formatUpdatedDate(updatedIso, locale)
    return {
        author: `${labels.author}: ${AUTHOR.name}`,
        role: AUTHOR.jobTitle[locale] || AUTHOR.jobTitle.en,
        publisher: `${labels.publisher}: ${ORGANIZATION.name}`,
        updated: updated ? `${labels.updated}: ${updated}` : '',
        authorUrl: AUTHOR.url,
    }
}
