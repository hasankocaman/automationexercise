// ─── Konu kümeleri (topical clusters) ────────────────────────────────────────
// Statik shell'lerin alt bağlantı bloğu uzun süre DÜZ bir listeydi: her sayfa
// diğer 41 sayfanın hepsine link veriyordu. Bunun iki sorunu var:
//
//   1. Konu sinyali yok. "Selenium sayfası Playwright'a link veriyor" ile
//      "Selenium sayfası Kubernetes'e link veriyor" aynı ağırlıkta görünür;
//      oysa ilki gerçek bir konu akrabalığı, ikincisi değil.
//   2. Hiçbir sayfa "önemli" görünmez. Herkes herkese link verince sayfa
//      otoritesi eşit dağılır, yani hiç dağılmaz.
//
// Kümeler UYDURULMUYOR: sitenin ZATEN VAR OLAN görünür site haritasından
// (`/what-is-testing` → Site Haritası sekmesi) türetiliyor. Bu bilinçli bir
// seçim — ikinci bir kategori listesi elle yazılsaydı, yeni bir sayfa
// eklendiğinde ikisi sessizce ayrışırdı (bu projede tekrarlayan bir hata
// sınıfı). Kullanıcının gördüğü gruplama ile crawler'ın gördüğü bağlantı
// grafiği artık AYNI kaynaktan geliyor, ayrışamazlar.
//
// Bir kategorinin "çapası" (anchor) o kategorinin İLK sayfasıdır — site
// haritasındaki sıra öğrenme sırasına göre dizildiği için ilk sayfa doğal
// olarak kategorinin giriş noktasıdır.

import { loadDataModule, contentForLocale } from './topicDataModules.mjs'

const SITE_MAP_ROUTE = '/what-is-testing'

let cached = null

/**
 * Site haritası sekmesinden kategori → route listesi çıkarır.
 * Yapı: `heading` bloğu kategoriyi açar, hemen ardından gelen `link-grid`
 * bloğu o kategorinin sayfalarını taşır.
 */
export async function buildTopicClusters() {
    if (cached) return cached

    const loaded = await loadDataModule(SITE_MAP_ROUTE)
    const content = contentForLocale(loaded?.data, 'tr')
    const section = (content?.sections || []).find(
        (item) => (item.blocks || []).some((block) => block.type === 'link-grid'),
    )

    const categories = []
    if (section) {
        let label = null
        for (const block of section.blocks) {
            if (block.type === 'heading') {
                label = block.text && typeof block.text === 'object' ? block.text : null
                continue
            }
            if (block.type !== 'link-grid' || !label) continue
            const routes = (block.items || []).map((item) => item.route).filter(Boolean)
            if (routes.length) categories.push({ label, routes })
            label = null
        }
    }

    const byRoute = new Map()
    categories.forEach((category, index) => {
        for (const route of category.routes) byRoute.set(route, index)
    })

    cached = { categories, byRoute }
    return cached
}

/** Bir route'un kendi kümesindeki DİĞER sayfaları (kendisi hariç). */
export function clusterSiblings(clusters, routePath) {
    const index = clusters.byRoute.get(routePath)
    if (index === undefined) return null
    const category = clusters.categories[index]
    return { label: category.label, routes: category.routes.filter((path) => path !== routePath) }
}

/**
 * Diğer kategorilerin çapa sayfaları. Kendi kategorisi listeden düşürülür —
 * o kategori zaten `clusterSiblings` ile tam olarak listeleniyor.
 */
export function otherClusterAnchors(clusters, routePath) {
    const own = clusters.byRoute.get(routePath)
    return clusters.categories
        .map((category, index) => ({ index, label: category.label, route: category.routes[0] }))
        .filter((entry) => entry.index !== own && entry.route && entry.route !== routePath)
}
