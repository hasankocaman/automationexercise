import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { canonicalUrl, getSeoForPath } from '../utils/seo'

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
    const { pathname } = useLocation()

    useEffect(() => {
        const seo = getSeoForPath(pathname)
        const url = canonicalUrl(seo.path)

        document.title = seo.title
        upsertMeta('meta[name="description"]', { name: 'description', content: seo.description })
        upsertLink('link[rel="canonical"]', { rel: 'canonical', href: url })

        upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
        upsertMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title })
        upsertMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description })
        upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url })
        upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'LearnQA.dev' })

        upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary' })
        upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title })
        upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description })
    }, [pathname])

    return null
}

export default SeoMeta
