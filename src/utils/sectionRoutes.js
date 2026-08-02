// Sekme (bölüm) URL katmanının çalışma zamanı tarafı.
//
// Her ders sayfasının dikey sekmeleri artık kendi URL'ine sahiptir:
//   /selenium                  → hub (ilk sekme)
//   /selenium/wait-strategies  → "Wait Stratejileri" sekmesi
//   /en/selenium/wait-strategies → aynı sekmenin İngilizcesi
//
// Slug İKİ dilde de AYNIDIR (İngilizce başlıktan türetilir): uygulama
// `basename="/en"` ile kurulduğu için TR ve EN aynı path'i paylaşır, dile göre
// ayrı slug tutmak çift yönlü bir eşleme tablosu ve yönlendirme katmanı
// gerektirirdi. Slug'ın sıralamaya katkısı zayıf olduğundan bu ödünleşim
// bilinçli: başlık, h1 ve gövde metni zaten sayfanın dilindedir.

import { SECTION_SLUGS } from '../data/generated/sectionSlugs.js'

export { SECTION_SLUGS }

/** Sekme URL'i olan ders sayfalarının route path listesi. */
export const SECTION_ROUTE_PATHS = Object.keys(SECTION_SLUGS)

/** Pathname'in ilk segmentinden ders sayfasının kök path'ini verir (`/selenium`). */
export function basePathOf(pathname) {
    const first = String(pathname || '').split('/').filter(Boolean)[0]
    return first ? `/${first}` : '/'
}

export function sectionsFor(routePath) {
    return SECTION_SLUGS[routePath] ?? null
}

/** Slug → sekme index'i. Bilinmeyen slug'ta -1 döner (çağıran 0'a düşer). */
export function sectionIndexFromSlug(routePath, slug) {
    if (!slug) return -1
    const list = SECTION_SLUGS[routePath]
    if (!list) return -1
    return list.findIndex((item) => item.slug === slug)
}

/** Sekme index'i → slug. Sayfanın sekme URL'i yoksa null. */
export function sectionSlugForIndex(routePath, index) {
    const list = SECTION_SLUGS[routePath]
    if (!list || index < 0 || index >= list.length) return null
    return list[index].slug
}

/**
 * Sekme index'inin adres çubuğunda görünmesi gereken path'i.
 * İlk sekme HUB URL'inde kalır (`/selenium`) — aksi hâlde hub URL'i adres
 * çubuğunda hiç durmaz ve aynı içerik iki URL'de indekslenir.
 */
export function pathForSection(routePath, index) {
    if (index <= 0) return routePath
    const slug = sectionSlugForIndex(routePath, index)
    return slug ? `${routePath}/${slug}` : routePath
}
