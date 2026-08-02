// Sekme URL'lerinde sayfanın <title>/description'ını SEKMEYE özgü hâle getiren
// küçük yayın kanalı.
//
// Neden gerekli: `seo.js` yalnızca route metadata'sını bilir; bir sekmenin
// gerçek başlığı ve metni ise ders veri dosyasındadır ve o dosya SADECE ilgili
// sayfa açıldığında (lazy chunk) yüklenir. 412 sekmenin metadata'sını herkese
// açık bir manifeste koymak ilk yükleme boyutunu gereksiz büyütürdü.
//
// Akış: TopicPage aktif sekme değişince türetilmiş başlığı buraya yazar,
// SeoMeta dinler ve DOM'a yansıtır. `path` alanı zorunlu — SeoMeta yalnızca
// override'ın ait olduğu adres hâlâ açıksa uygular, böylece sayfa değişince
// eski başlık asla sızmaz.

let current = null
const listeners = new Set()

export function setSeoOverride(next) {
    const unchanged = current?.path === next?.path
        && current?.title === next?.title
        && current?.description === next?.description
    if (unchanged) return

    current = next || null
    for (const listener of listeners) listener(current)
}

export function getSeoOverride() {
    return current
}

export function subscribeSeoOverride(listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
}
