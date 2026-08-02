import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { alternatesFor, canonicalUrl, getSeoForPath } from '../utils/seo'
import { getSeoOverride, subscribeSeoOverride } from '../lib/seoOverride'

function upsertMeta(selector, attrs) {
    let tag = document.head.querySelector(selector)
    if (!tag) {
        tag = document.createElement('meta')
        document.head.appendChild(tag)
    }

    Object.entries(attrs).forEach(([key, value]) => tag.setAttribute(key, value))
}

function upsertLink(selector, attrs) {
    let tag = document.head.querySelector(selector)
    if (!tag) {
        tag = document.createElement('link')
        document.head.appendChild(tag)
    }

    Object.entries(attrs).forEach(([key, value]) => tag.setAttribute(key, value))
}

function SeoMeta() {
    // useLocation() basename'i KIRPAR (/en/selenium → /selenium), bu yüzden
    // yalnızca "route değişti" sinyali olarak kullanılır; dil tespiti için
    // gerçek tam pathname gerekir (Documents/seo-phase-2-plan.md §2.1).
    const { pathname } = useLocation()
    // Sekme URL'lerinde başlık/description'ı TopicPage üretir (bkz. seoOverride).
    const [override, setOverride] = useState(getSeoOverride)
    useEffect(() => subscribeSeoOverride(setOverride), [])

    useEffect(() => {
        const fullPath = typeof window !== 'undefined' ? window.location.pathname : pathname
        const seo = getSeoForPath(fullPath)
        const url = canonicalUrl(seo.urlPath)
        // Override yalnızca AİT OLDUĞU adres hâlâ açıksa uygulanır — sayfa
        // değişiminde bir önceki sekmenin başlığı sızmasın diye.
        const active = override && override.path === fullPath ? override : null
        const title = active?.title || seo.title
        const description = active?.description || seo.description

        document.documentElement.setAttribute('lang', seo.locale)
        document.title = title
        upsertMeta('meta[name="description"]', { name: 'description', content: description })
        upsertLink('link[rel="canonical"]', { rel: 'canonical', href: url })

        // hreflang: her sayfanın TR ve EN karşılığını Google'a bildirir. Dinamik
        // route'lar (sertifika doğrulama) indekslenmediği için üretilmez.
        document.head
            .querySelectorAll('link[rel="alternate"][data-seo-hreflang="true"]')
            .forEach((tag) => tag.remove())

        if (!seo.dynamic) {
            alternatesFor(seo.path).forEach(({ hreflang, href }) => {
                const tag = document.createElement('link')
                tag.setAttribute('rel', 'alternate')
                tag.setAttribute('hreflang', hreflang)
                tag.setAttribute('href', href)
                tag.setAttribute('data-seo-hreflang', 'true')
                document.head.appendChild(tag)
            })
        }

        upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
        upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
        upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
        upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url })
        upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'LearnQA.dev' })
        upsertMeta('meta[property="og:locale"]', {
            property: 'og:locale',
            content: seo.locale === 'tr' ? 'tr_TR' : 'en_US',
        })
        upsertMeta('meta[property="og:locale:alternate"]', {
            property: 'og:locale:alternate',
            content: seo.locale === 'tr' ? 'en_US' : 'tr_TR',
        })

        upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary' })
        upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
        upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
    }, [pathname, override])

    return null
}

export default SeoMeta
