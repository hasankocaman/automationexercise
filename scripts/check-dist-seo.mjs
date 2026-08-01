import { access, readFile } from 'node:fs/promises'
import { LOCALES, ROUTE_SEO, alternatesFor, canonicalUrl, localizedPath, seoFor } from '../src/utils/seo.js'

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

            // FAQPage yalnızca ana sayfada olabilir ve şemadaki HER sorunun
            // aynı sayfanın GÖRÜNÜR gövdesinde bulunması zorunludur (arama
            // motoru politikası). Şema ile ekranda yazan şey ayrışırsa burada
            // hard-fail eder — sessizce yayına çıkmaz.
            if (html.includes('"@type": "FAQPage"')) {
                if (entry.path !== '/') {
                    errors.push(`FAQPage schema must exist only on the homepage, found on ${localizedPath(entry.path, locale)}`)
                } else {
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

if (errors.length) {
    console.error(errors.join('\n'))
    process.exit(1)
}

console.log(`Dist SEO check passed for ${checked} generated pages (${checkedRoutes.length} routes x ${LOCALES.length} locales).`)
console.log(`Rich results: ${coursePages} pages with Course, ${faqPages} with FAQPage (yalnızca ana sayfa, görünür içerikle doğrulandı).`)
console.log(`Noindex shells: ${noindexShells} (sitemap dışı, robots=noindex doğrulandı).`)
