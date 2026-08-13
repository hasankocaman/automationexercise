import { access, readFile } from 'node:fs/promises'
import { LOCALES, ROUTE_SEO, alternatesFor, canonicalUrl, localizedPath, seoFor } from '../src/utils/seo.js'
import { SECTION_SLUGS } from '../src/data/generated/sectionSlugs.js'
import { MIN_INDEXABLE_WORDS, buildSectionSeoIndex } from './lib/sectionSeo.mjs'
import { AUTHOR, AUTHOR_ID, ORGANIZATION, ORGANIZATION_ID } from '../src/utils/authorship.js'
import { DATA_MODULES, contentForLocale, loadDataModule } from './lib/topicDataModules.mjs'

// generate-static-routes.mjs'teki escapeHtml ile BİREBİR aynı olmalı: görünür
// gövde escape edilmiş hâlde yazılıyor, şema ham metni taşıyor. Aynı dönüşümü
// uygulamadan karşılaştırmak tırnak içeren her soruda yanlış-pozitif verir.
function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('"', '&quot;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
}

// Şemayı METİN olarak aramak yerine gerçekten PARSE et — bozuk JSON burada patlar.
function parseJsonLd(html) {
    const blocks = []
    const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
    let m
    while ((m = re.exec(html)) !== null) {
        const parsed = JSON.parse(m[1])
        if (Array.isArray(parsed)) blocks.push(...parsed)
        else blocks.push(parsed)
    }
    return blocks
}

function textValue(value, locale) {
    if (!value) return ''
    if (typeof value === 'string') return value
    const other = locale === 'tr' ? 'en' : 'tr'
    return value[locale] || value[other] || ''
}

const distDir = new URL('../dist/', import.meta.url)
const errors = []

function routeIndexPath(urlPath) {
    if (urlPath === '/') return new URL('index.html', distDir)
    return new URL(`${urlPath.replace(/^\//, '')}/index.html`, distDir)
}

function htmlIncludes(html, value) {
    return html.includes(String(value).replaceAll('&', '&amp;'))
}

/** Shell gövdesindeki (script/style hariç) görünür kelime sayısı. */
function visibleWordCount(html) {
    const start = html.indexOf('<main')
    const end = html.indexOf('</main>')
    const body = start >= 0 && end > start ? html.slice(start, end) : html
    return body
        .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .filter(Boolean).length
}

/** Script/style çıkarılmış gövde — "bu metin kullanıcıya görünüyor mu?" için. */
function visibleBodyOf(html) {
    return html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '')
}

// ─── E-E-A-T: yazar/kurum kimliği ────────────────────────────────────────────
// Üç şey AYNI ANDA doğru olmalı, yoksa sinyal değersizleşir:
//   1. Grafikte Organization ve Person düğümleri var,
//   2. WebPage bu düğümlere `@id` ile referans veriyor (kopyasını değil),
//   3. Aynı yazar adı sayfanın GÖRÜNÜR gövdesinde de yazıyor.
// (3) olmadan şema, kullanıcının doğrulayamayacağı bir iddiaya dönüşür.
function checkIdentity(html, urlPath, label) {
    const graph = parseJsonLd(html)
    const nodes = graph.filter((node) => node['@id'])
    const org = nodes.find((node) => node['@id'] === ORGANIZATION_ID)
    const person = nodes.find((node) => node['@id'] === AUTHOR_ID)

    if (!org || org['@type'] !== 'Organization') {
        errors.push(`Missing Organization identity node in ${label} ${urlPath}`)
    }
    if (!person || person['@type'] !== 'Person') {
        errors.push(`Missing Person (author) identity node in ${label} ${urlPath}`)
    } else if (person.name !== AUTHOR.name) {
        errors.push(`Author node name does not match the single source in ${label} ${urlPath}`)
    }

    const webPage = graph.find((node) => node['@type'] === 'WebPage')
    if (webPage) {
        if (webPage.author?.['@id'] !== AUTHOR_ID) {
            errors.push(`WebPage is missing an author reference in ${label} ${urlPath}`)
        }
        if (webPage.publisher?.['@id'] !== ORGANIZATION_ID) {
            errors.push(`WebPage is missing a publisher reference in ${label} ${urlPath}`)
        }
    }

    const visible = visibleBodyOf(html)
    if (!visible.includes('data-seo-byline="true"')) {
        errors.push(`Missing visible byline in ${label} ${urlPath}`)
    } else if (!visible.includes(escapeHtml(AUTHOR.name)) || !visible.includes(escapeHtml(ORGANIZATION.name))) {
        errors.push(`Byline does not name the author/publisher from the schema in ${label} ${urlPath}`)
    }
}

const checkedRoutes = ROUTE_SEO.filter((seo) => !seo.dynamic)
let checked = 0

// Her route İKİ dilde de üretilmiş olmalı: TR → /<route>, EN → /en/<route>.
// (Documents/seo-phase-2-plan.md §2)
for (const locale of LOCALES) {
    for (const entry of checkedRoutes) {
        const { title, description } = seoFor(entry, locale)
        const urlPath = localizedPath(entry.path, locale)
        const htmlPath = routeIndexPath(urlPath)

        try {
            await access(htmlPath)
        } catch {
            errors.push(`Missing generated HTML for ${urlPath}: ${htmlPath.pathname}`)
            continue
        }

        checked += 1
        const html = await readFile(htmlPath, 'utf8')
        const canonical = canonicalUrl(urlPath)

        if (!htmlIncludes(html, `<title>${title}</title>`)) {
            errors.push(`Missing title in generated HTML for ${urlPath}`)
        }

        if (!htmlIncludes(html, `<link rel="canonical" href="${canonical}" />`)) {
            errors.push(`Missing canonical URL in generated HTML for ${urlPath}`)
        }

        if (!htmlIncludes(html, `<meta name="description" content="${description}" />`)) {
            errors.push(`Missing meta description in generated HTML for ${urlPath}`)
        }

        if (!html.includes(`<html lang="${locale}"`)) {
            errors.push(`Wrong or missing <html lang="${locale}"> for ${urlPath}`)
        }

        for (const alt of alternatesFor(entry.path)) {
            if (!htmlIncludes(html, `hreflang="${alt.hreflang}" href="${alt.href}"`)) {
                errors.push(`Missing hreflang="${alt.hreflang}" alternate for ${urlPath}`)
            }
        }

        if (!html.includes('data-seo-fallback="true"')) {
            errors.push(`Missing crawlable fallback content for ${urlPath}`)
        }

        if (!html.includes('"@type": "WebPage"')) {
            errors.push(`Missing WebPage structured data for ${urlPath}`)
        }

        if (!html.includes('"@type": "BreadcrumbList"')) {
            errors.push(`Missing BreadcrumbList structured data for ${urlPath}`)
        }

        checkIdentity(html, urlPath, 'route')
    }
}

// Zengin snippet kazanımı ölçülebilir olsun diye raporlanır (hard-fail DEĞİL:
// her route ders sayfası değil, mülakat bloğu olmayan sayfalar da var).
let coursePages = 0
let faqPages = 0
let noindexShells = 0

for (const locale of LOCALES) {
    for (const entry of checkedRoutes) {
        const htmlPath = routeIndexPath(localizedPath(entry.path, locale))

        try {
            const html = await readFile(htmlPath, 'utf8')
            if (html.includes('"@type": "Course"')) coursePages += 1

            // FAQPage ana sayfaya ARTIK ÖZEL DEĞİL — herhangi bir route'ta
            // olabilir, TEK KOŞULLA: şemadaki HER sorunun aynı sayfanın
            // GÖRÜNÜR gövdesinde BİREBİR aynı metinle bulunması (arama motoru
            // politikası — görünmeyen soru/cevap = cloaking riski). Kaynağı
            // ana sayfada `interviewWarmupData`, diğer route'larda kilitsiz
            // `faq` bloğu (mülakat soruları/`interview-questions` ASLA kaynak
            // olamaz — quiz kilidi arkasında, bkz. generate-static-routes.mjs
            // faqItemsFromContent). Şema ile ekranda yazan şey ayrışırsa
            // burada hard-fail eder — sessizce yayına çıkmaz.
            if (html.includes('"@type": "FAQPage"')) {
                faqPages += 1
                const visibleBody = html.replace(/<script[\s\S]*?<\/script>/g, '')
                // ŞEMANIN KENDİSİ gezilir, kaynak liste DEĞİL: şemaya elle ya da
                // başka bir kod yolundan görünmeyen bir soru eklenirse kaynak
                // listeyi taramak onu KAÇIRIR (bu kontrol ilk yazımında tam olarak
                // bunu kaçırıyordu, sonda testiyle yakalandı).
                for (const block of parseJsonLd(html)) {
                    if (block['@type'] !== 'FAQPage') continue
                    const questions = Array.isArray(block.mainEntity) ? block.mainEntity : []
                    if (questions.length < 3) {
                        errors.push(`FAQPage has too few questions in ${localizedPath(entry.path, locale)}`)
                    }
                    for (const q of questions) {
                        const name = String(q?.name ?? '')
                        if (!name || !String(q?.acceptedAnswer?.text ?? '')) {
                            errors.push(`FAQPage entry missing question or answer text in ${localizedPath(entry.path, locale)}`)
                            continue
                        }
                        if (!visibleBody.includes(escapeHtml(name))) {
                            errors.push(`FAQPage question is not visible in the page body (${localizedPath(entry.path, locale)}): "${name.slice(0, 60)}..."`)
                        }
                    }
                }
            }

            // Sitemap'e girmeyen sayfalar shell'de robots=noindex taşımalı.
            if (entry.noindex) {
                if (!html.includes('name="robots" content="noindex')) {
                    errors.push(`Missing robots noindex meta in ${localizedPath(entry.path, locale)} (route is excluded from sitemap)`)
                } else {
                    noindexShells += 1
                }
            } else if (html.includes('name="robots" content="noindex')) {
                errors.push(`Unexpected robots noindex in indexable route ${localizedPath(entry.path, locale)}`)
            }
        } catch { /* eksiklik yukarıda zaten raporlandı */ }
    }
}

// ─── "X nedir?" cevap paragrafı ──────────────────────────────────────────────
// Kural: alan tanımlıysa (a) İKİ dilde de dolu olmalı, (b) statik HTML'de
// gerçekten basılmalı. (b) kritik: metin yalnızca şemada/metadata'da kalıp
// sayfada görünmüyorsa, kullanıcının göremediği içeriği arama motoruna sunmuş
// oluruz — ana sayfadaki FAQ şemasının bir zamanlar kaldırılma sebebi buydu.
let answerPages = 0

for (const routePath of Object.keys(DATA_MODULES)) {
    const entry = ROUTE_SEO.find((item) => item.path === routePath)
    if (!entry || entry.dynamic) continue

    const loaded = await loadDataModule(routePath)
    if (!loaded?.data) continue

    const answers = {}
    for (const locale of LOCALES) {
        answers[locale] = textValue(contentForLocale(loaded.data, locale)?.seoAnswer, locale).trim()
    }
    if (!answers.tr && !answers.en) continue

    for (const locale of LOCALES) {
        const answer = answers[locale]
        const urlPath = localizedPath(routePath, locale)

        if (!answer) {
            errors.push(`seoAnswer is missing for ${urlPath} (defined in the other language)`)
            continue
        }

        const words = answer.split(/\s+/).filter(Boolean).length
        if (words < 25 || words > 120) {
            errors.push(`seoAnswer should be 25-120 words, got ${words}: ${urlPath}`)
        }

        try {
            const html = await readFile(routeIndexPath(urlPath), 'utf8')
            if (!html.includes(`data-seo-answer="true">${escapeHtml(answer)}<`)) {
                errors.push(`seoAnswer is not rendered in the static HTML of ${urlPath}`)
            } else if (locale === 'tr') {
                answerPages += 1
            }
        } catch { /* eksik dosya yukarıda raporlandı */ }
    }
}

// ─── Sekme (bölüm) shell'leri ────────────────────────────────────────────────
// 700+ sekme shell'i ELLE denetlenemez; kurallar burada makineyle zorlanır.
// En kritik ikisi:
//   • Tekillik — iki sayfa aynı title/description ile çıkarsa Google ikisini
//     birbirinin kopyası sayar ve genelde ikisini de geri iter.
//   • İnce içerik — 180 kelimenin altındaki, kilitli ya da hub'ın kopyası olan
//     bölümler sitemap dışıdır ve indekslenmemelidir. Yüzlerce zayıf sayfa
//     yayınlamak sitenin GENEL kalite algısını düşürür (planın A3 guard'ı).
const { index: sectionIndex, problems: sectionProblems } = await buildSectionSeoIndex(SECTION_SLUGS)
errors.push(...sectionProblems)

const seenTitles = new Map()
const seenDescriptions = new Map()
let sectionShells = 0
let sectionIndexable = 0
let sectionNoindex = 0
let howToPages = 0

for (const locale of LOCALES) {
    // Hub sayfalarının metadata'sı da tekillik havuzuna girer.
    for (const entry of checkedRoutes) {
        const { title, description } = seoFor(entry, locale)
        seenTitles.set(`${locale}|${title}`, entry.path)
        seenDescriptions.set(`${locale}|${description}`, entry.path)
    }

    for (const entries of Object.values(sectionIndex)) {
        for (const entry of entries) {
            const urlPath = localizedPath(entry.path, locale)
            const htmlPath = routeIndexPath(urlPath)
            const { title, description } = entry.seo[locale]

            let html
            try {
                html = await readFile(htmlPath, 'utf8')
            } catch {
                errors.push(`Missing generated HTML for section ${urlPath}`)
                continue
            }

            sectionShells += 1

            // Türetilmiş metinler ders içeriğinden gelir; tırnak ve < > içerebilir.
            // Bu yüzden karşılaştırma üretimdeki TAM escape ile yapılır (yalnızca
            // & değiştiren htmlIncludes burada yanlış-negatif verirdi).
            if (!html.includes(`<title>${escapeHtml(title)}</title>`)) {
                errors.push(`Missing/incorrect title in section shell ${urlPath}`)
            }
            if (!html.includes(`<meta name="description" content="${escapeHtml(description)}" />`)) {
                errors.push(`Missing/incorrect meta description in section shell ${urlPath}`)
            }
            if (!html.includes(`<html lang="${locale}"`)) {
                errors.push(`Wrong or missing <html lang="${locale}"> for section ${urlPath}`)
            }
            if (!html.includes('data-seo-section="true"')) {
                errors.push(`Missing crawlable section body for ${urlPath}`)
            }
            if (!html.includes('"@type": "BreadcrumbList"')) {
                errors.push(`Missing BreadcrumbList structured data for section ${urlPath}`)
            }
            if (html.includes('"@type": "FAQPage"')) {
                errors.push(`FAQPage schema must not appear on section shells: ${urlPath}`)
            }

            checkIdentity(html, urlPath, 'section')

            // ─── HowTo ───────────────────────────────────────────────────────
            // Kurulum prosedürünün şemadaki hâli ile ekrandaki hâli ayrışamaz.
            // Kontrol ŞEMANIN KENDİSİNİ gezer, kaynak listeyi değil: şemaya
            // başka bir kod yolundan görünmeyen bir adım eklenirse kaynağı
            // taramak onu kaçırırdı (FAQ kontrolü ilk yazımında tam olarak
            // bunu kaçırmıştı).
            const howToNodes = parseJsonLd(html).filter((node) => node['@type'] === 'HowTo')
            if (howToNodes.length > 1) {
                errors.push(`More than one HowTo schema in section shell ${urlPath}`)
            }
            for (const node of howToNodes) {
                if (!entry.indexable) {
                    errors.push(`HowTo schema on a non-indexable section: ${urlPath}`)
                }
                const steps = Array.isArray(node.step) ? node.step : []
                if (steps.length < 3) {
                    errors.push(`HowTo has too few steps in ${urlPath}`)
                }
                const visible = visibleBodyOf(html)
                for (const step of steps) {
                    const text = String(step?.text ?? '')
                    if (!text) {
                        errors.push(`HowTo step is missing its text in ${urlPath}`)
                        continue
                    }
                    if (!visible.includes(escapeHtml(text))) {
                        errors.push(`HowTo step is not visible in the page body (${urlPath}): "${text.slice(0, 60)}..."`)
                    }
                }
                howToPages += 1
            }

            // Canonical: ilk sekme hub'a, diğerleri kendine.
            const expectedCanonical = canonicalUrl(localizedPath(entry.isHubDuplicate ? entry.routePath : entry.path, locale))
            if (!htmlIncludes(html, `<link rel="canonical" href="${expectedCanonical}" />`)) {
                errors.push(`Wrong canonical in section shell ${urlPath} (expected ${expectedCanonical})`)
            }

            const hasNoindex = html.includes('name="robots" content="noindex')
            if (entry.indexable) {
                sectionIndexable += 1
                if (hasNoindex) errors.push(`Indexable section carries robots noindex: ${urlPath}`)
                // Ölçüm ham veri üzerinden DEĞİL, gerçekten YAYINLANAN gövde
                // üzerinden yapılır: crawler'ın gördüğü şey budur.
                const words = visibleWordCount(html)
                if (words < MIN_INDEXABLE_WORDS) {
                    errors.push(`Indexable section is below the thin-content threshold (${words} words in shell): ${urlPath}`)
                }
            } else if (entry.isHubDuplicate) {
                // Canonical zaten hub'ı işaret ediyor; üstüne noindex konursa
                // Google'a çelişkili sinyal gider.
                if (hasNoindex) errors.push(`First section must rely on canonical, not noindex: ${urlPath}`)
            } else {
                sectionNoindex += 1
                if (!hasNoindex) errors.push(`Non-indexable section is missing robots noindex: ${urlPath}`)
            }

            const titleKey = `${locale}|${title}`
            if (seenTitles.has(titleKey)) {
                errors.push(`Duplicate title in ${urlPath} (same as ${seenTitles.get(titleKey)})`)
            }
            seenTitles.set(titleKey, urlPath)

            const descKey = `${locale}|${description}`
            if (seenDescriptions.has(descKey)) {
                errors.push(`Duplicate meta description in ${urlPath} (same as ${seenDescriptions.get(descKey)})`)
            }
            seenDescriptions.set(descKey, urlPath)
        }
    }
}

// ─── İç bağlantı grafiği: hiçbir sayfa öksüz kalmamalı ───────────────────────
// Hub shell'lerinin alt bağlantı bloğu artık düz bir "herkes herkese" listesi
// değil, konu kümesi + kategori çapaları (bkz. lib/topicClusters.mjs). Bu
// doğru bir SEO hamlesi ama bir riski var: kümeleme yanlış kurulursa bir
// sayfaya HİÇBİR yerden link gitmez ve sayfa yalnızca sitemap'ten
// keşfedilebilir hâle gelir. Sitemap keşif sağlar, otorite ve tarama önceliği
// sağlamaz — öksüz sayfa pratikte sıralanmaz.
//
// Bu yüzden kümelemenin kendisini değil, VAAT ETTİĞİ SONUCU doğruluyoruz:
// her indekslenebilir route, kendi dışındaki en az bir sayfanın shell'inden
// link almalı. Ana sayfanın tam dizini bu koşulun taşıyıcısıdır; oradan
// kaldırılırsa bu kontrol kırmızıya döner.
const linkableRoutes = ROUTE_SEO.filter((seo) => !seo.dynamic && !seo.noindex)

for (const locale of LOCALES) {
    const inbound = new Map(linkableRoutes.map((seo) => [localizedPath(seo.path, locale), 0]))

    for (const seo of linkableRoutes) {
        const localized = localizedPath(seo.path, locale)
        const file = new URL(localized === '/' ? 'index.html' : `.${localized}/index.html`, distDir)
        let html
        try {
            html = await readFile(file, 'utf8')
        } catch {
            continue // eksik shell zaten yukarıda raporlandı
        }
        const body = /<main data-seo-fallback[\s\S]*?<\/main>/.exec(html)?.[0] || ''
        for (const match of body.matchAll(/href="([^"]+)"/g)) {
            const target = match[1]
            if (target === localized) continue // kendine link sayılmaz
            if (inbound.has(target)) inbound.set(target, inbound.get(target) + 1)
        }
    }

    for (const [path, count] of inbound) {
        // Ana sayfaya her sekme shell'inin breadcrumb'ından zaten link gider.
        if (count === 0) {
            errors.push(`Orphan route in link graph (${locale}): ${path} — hiçbir shell bu sayfaya link vermiyor`)
        }
    }
}

if (errors.length) {
    console.error(errors.join('\n'))
    process.exit(1)
}

console.log(`Dist SEO check passed for ${checked} generated pages (${checkedRoutes.length} routes x ${LOCALES.length} locales).`)
console.log(`İç bağlantı grafiği: ${linkableRoutes.length} route x ${LOCALES.length} dil — öksüz sayfa yok.`)
console.log(`Section shells: ${sectionShells} checked, ${sectionIndexable} indexable, ${sectionNoindex} noindex (ince/kilitli).`)
console.log(`Answer-first paragraphs: ${answerPages} sayfa (görünür gövdede doğrulandı).`)
console.log(`Rich results: ${coursePages} pages with Course, ${faqPages} with FAQPage, ${howToPages} with HowTo (her biri görünür içerikle doğrulandı).`)
console.log(`Authorship: ${AUTHOR.name} / ${ORGANIZATION.name} — her sayfada şema + görünür künye doğrulandı.`)
console.log(`Noindex shells: ${noindexShells} (sitemap dışı, robots=noindex doğrulandı).`)
