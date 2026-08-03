// ─────────────────────────────────────────────────────────────────────────────
// SEKME-SEVİYESİ URL KATMANI (Documents/seo-phase-3-plan.md §3)
//
// Ders sayfalarının içeriği bugüne kadar TEK URL'in ve `activeTab` React
// state'inin arkasındaydı: /selenium sayfasında 15 sekme / 428 blok var ama
// crawler yalnızca ~665 kelime görüyordu. Bu modül her sekmeyi kendi URL'i
// (/selenium/wait-strategies) ve kendi metadata'sı olan bir sayfaya çevirir.
//
// Buradaki hesaplama İKİ script tarafından da kullanılır (sitemap ve statik
// shell üretimi) — ikisinin aynı sonucu üretmesi zorunludur, bu yüzden tek
// modülde toplandı.
// ─────────────────────────────────────────────────────────────────────────────

import { ROUTE_SEO } from '../../src/utils/seo.js'
import {
    deriveSectionSeo,
    sectionProse,
    stripLeadingEmoji,
    textValue,
    truncateAtWord,
    wordCount,
} from '../../src/utils/sectionSeoText.js'
import { DATA_MODULES, contentForLocale, loadDataModule } from './topicDataModules.mjs'
import { howToFromSection, isInstallationTitle } from './howTo.mjs'

// Slug üretimi ve metin türetimi runtime ile ORTAK (src/utils/sectionSeoText.js).
// Buradan yeniden dışa aktarılır ki slug üreticisi tek bir modül import etsin.
export { slugifySectionTitle, stripLeadingEmoji } from '../../src/utils/sectionSeoText.js'

/** Bir sekme shell'inin indekslenebilmesi için gereken minimum kelime sayısı. */
export const MIN_INDEXABLE_WORDS = 180

/** Sekme URL'leri iki dilde de AYNI slug'ı kullanır (bkz. §5 slug kısıtı). */
export const LOCALES_FOR_SECTIONS = ['tr', 'en']

function pageLabelFor(content, routeSeo, locale) {
    const heroTitle = stripLeadingEmoji(textValue(content?.hero?.title, locale))
    if (heroTitle) return heroTitle
    const fallback = locale === 'tr' && routeSeo?.tr ? routeSeo.tr.title : routeSeo?.title
    return stripLeadingEmoji(String(fallback || '').replace(' | LearnQA.dev', '').split(':')[0])
}

/**
 * Slug'sız ham katalog: her uygun ders sayfası için bölüm başlıkları, düz metin
 * parçaları, kelime sayısı ve kilitlilik bilgisi. Slug ataması bunun üstüne
 * `generate-section-slugs.mjs` tarafından yapılır (slug'lar DONDURULUR).
 */
export async function computeSectionCatalog() {
    const catalog = {}

    for (const routePath of Object.keys(DATA_MODULES)) {
        const routeSeo = ROUTE_SEO.find((item) => item.path === routePath)
        // Sitemap dışı (korumalı/işlevsel) ve dinamik route'lar sekme URL'i almaz.
        if (!routeSeo || routeSeo.noindex || routeSeo.dynamic) continue

        const loaded = await loadDataModule(routePath)
        if (!loaded?.data) continue

        const perLocale = {}
        for (const locale of LOCALES_FOR_SECTIONS) {
            perLocale[locale] = contentForLocale(loaded.data, locale)
        }

        const sections = perLocale.en?.sections
        if (!Array.isArray(sections) || sections.length < 2) continue

        const entries = sections.map((_, index) => {
            const byLocale = {}
            for (const locale of LOCALES_FOR_SECTIONS) {
                const localeSections = perLocale[locale]?.sections ?? sections
                const section = localeSections[index] ?? sections[index]
                const title = textValue(section?.title, locale)
                    || textValue(perLocale[locale]?.tabs?.[index], locale)
                    || `Section ${index + 1}`
                const prose = sectionProse(section, locale)
                byLocale[locale] = {
                    title,
                    prose,
                    words: wordCount(prose),
                    pageLabel: pageLabelFor(perLocale[locale], routeSeo, locale),
                    section,
                }
            }

            // Kurulum sekmesi mi? Karar İKİ dilin başlığına birden bakılarak
            // verilir: bir dilde "Kurulum" yazan sekme öbür dilde "Setup"tır,
            // ama bazı sayfalarda başlıklardan yalnızca biri kalıbı tutar
            // (ör. "⚙️ Erişim & Kurulum" / "⚙️ Access & Setup"). Tek dile
            // bakmak, prosedürü öbür dilde sessizce düşürürdü.
            const installTab = isInstallationTitle(
                ...LOCALES_FOR_SECTIONS.map((locale) => byLocale[locale].title),
            )
            for (const locale of LOCALES_FOR_SECTIONS) {
                byLocale[locale].howTo = installTab
                    ? howToFromSection(byLocale[locale].section, locale, { sectionTitle: byLocale[locale].title })
                    : null
                // Ham bölüm nesnesi katalogda TAŞINMAZ: buradan çıkan veri
                // sitemap ve shell üretimine gidiyor, veri dosyasının tamamını
                // sürüklemek hem gereksiz hem de kazara sızma riski.
                delete byLocale[locale].section
            }

            const enSection = sections[index]
            const gated = Array.isArray(enSection?.blocks)
                && enSection.blocks.some((block) => block?.type === 'interview-questions')

            return { index, gated, byLocale }
        })

        catalog[routePath] = entries
    }

    return catalog
}

/**
 * Katalog + dondurulmuş slug manifesti → yayına giden tam sekme SEO listesi.
 *
 * `indexable` kuralı (planın "ince içerik guard'ı" maddesi):
 *  - index 0 ASLA indekslenmez → içeriği zaten hub sayfasının hedeflediği
 *    sorguyu ("selenium nedir") yanıtlıyor; ayrı URL kanibalizasyon olurdu.
 *    Shell yine üretilir (derin bağlantı çalışsın diye) ama canonical HUB'a
 *    işaret eder.
 *  - mülakat bloğu içeren bölümler (%60 quiz kilidi arkasında) indekslenmez —
 *    kullanıcının göremediği içeriği arama motoruna sunmak politika ihlalidir.
 *  - İKİ dilde de en az MIN_INDEXABLE_WORDS kelime çıkmıyorsa indekslenmez.
 */
export async function buildSectionSeoIndex(sectionSlugs) {
    const catalog = await computeSectionCatalog()
    const index = {}
    const problems = []

    for (const [routePath, entries] of Object.entries(catalog)) {
        const manifest = sectionSlugs[routePath]
        if (!Array.isArray(manifest) || manifest.length !== entries.length) {
            problems.push(`${routePath}: slug manifesti güncel değil (${manifest?.length ?? 0} kayıt, ${entries.length} bölüm) — "npm run seo:section-slugs" çalıştır.`)
            continue
        }

        index[routePath] = entries.map((entry) => {
            const slug = manifest[entry.index]?.slug
            if (!slug) problems.push(`${routePath}[${entry.index}]: slug yok — "npm run seo:section-slugs" çalıştır.`)

            const thin = LOCALES_FOR_SECTIONS.some((locale) => entry.byLocale[locale].words < MIN_INDEXABLE_WORDS)
            const isHubDuplicate = entry.index === 0
            const indexable = !thin && !entry.gated && !isHubDuplicate

            const seo = {}
            for (const locale of LOCALES_FOR_SECTIONS) {
                const { title, prose, pageLabel } = entry.byLocale[locale]
                seo[locale] = deriveSectionSeo({ sectionTitle: title, pageLabel, prose, locale })
            }

            return {
                routePath,
                index: entry.index,
                slug,
                path: `${routePath}/${slug}`,
                gated: entry.gated,
                thin,
                isHubDuplicate,
                indexable,
                words: Object.fromEntries(LOCALES_FOR_SECTIONS.map((l) => [l, entry.byLocale[l].words])),
                titles: Object.fromEntries(LOCALES_FOR_SECTIONS.map((l) => [l, entry.byLocale[l].title])),
                prose: Object.fromEntries(LOCALES_FOR_SECTIONS.map((l) => [l, entry.byLocale[l].prose])),
                pageLabels: Object.fromEntries(LOCALES_FOR_SECTIONS.map((l) => [l, entry.byLocale[l].pageLabel])),
                // Kurulum sekmelerinde sıralı prosedür (bkz. ./howTo.mjs); diğer
                // sekmelerde iki dilde de null.
                howTo: Object.fromEntries(LOCALES_FOR_SECTIONS.map((l) => [l, entry.byLocale[l].howTo])),
                seo,
            }
        })
    }

    dedupeSectionSeo(index)

    return { index, problems }
}

/**
 * Türetilmiş metadata'da tekillik zorunludur: iki sayfa aynı title/description
 * ile çıkarsa Google ikisini birbirinin kopyası sayar ve genelde ikisini de
 * geri iter. Çakışma nadirdir (aynı adlı bölüm iki sayfada, ör. "Kurulum"),
 * bu yüzden çözüm basit: sayfa etiketini ekle, hâlâ çakışıyorsa slug'ı ekle.
 * Çakışma listesi hub route'larının metadata'sını da kapsar.
 */
function dedupeSectionSeo(index) {
    const seenTitle = new Map()
    const seenDescription = new Map()

    for (const item of ROUTE_SEO) {
        for (const locale of LOCALES_FOR_SECTIONS) {
            const meta = locale === 'tr' && item.tr ? item.tr : item
            seenTitle.set(`${locale}|${meta.title}`, item.path)
            seenDescription.set(`${locale}|${meta.description}`, item.path)
        }
    }

    for (const entries of Object.values(index)) {
        for (const entry of entries) {
            for (const locale of LOCALES_FOR_SECTIONS) {
                const seo = entry.seo[locale]
                const label = entry.pageLabels[locale]

                if (seenTitle.has(`${locale}|${seo.title}`)) {
                    seo.title = `${seo.title.replace(' | LearnQA.dev', '')} — ${label} | LearnQA.dev`
                }
                if (seenTitle.has(`${locale}|${seo.title}`)) {
                    seo.title = `${seo.title.replace(' | LearnQA.dev', '')} (${entry.slug}) | LearnQA.dev`
                }
                seenTitle.set(`${locale}|${seo.title}`, entry.path)

                if (seenDescription.has(`${locale}|${seo.description}`)) {
                    seo.description = truncateAtWord(`${label} — ${seo.description}`, 178)
                }
                seenDescription.set(`${locale}|${seo.description}`, entry.path)
            }
        }
    }
}
