import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ROUTE_SEO, canonicalUrl } from '../src/utils/seo.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const distDir = join(rootDir, 'dist')
const indexPath = join(distDir, 'index.html')

const DATA_MODULES = {
    '/selenium': { file: '../src/data/seleniumData.js', exportName: 'seleniumData' },
    '/playwright': { file: '../src/data/playwrightData.js', exportName: 'playwrightData' },
    '/python': { file: '../src/data/pythonData.js', exportName: 'pythonData' },
    '/typescript': { file: '../src/data/typescriptData.js', exportName: 'typescriptData' },
    '/sql': { file: '../src/data/sqlData.js', exportName: 'sqlData' },
    '/java': { file: '../src/data/javaData.js', exportName: 'javaData' },
    '/jmeter': { file: '../src/data/jmeterData.js', exportName: 'jmeterData' },
    '/postman': { file: '../src/data/postmanData.js', exportName: 'postmanData' },
    '/rest-assured': { file: '../src/data/restAssuredData.js', exportName: 'restAssuredData' },
    '/docker': { file: '../src/data/dockerData.js', exportName: 'dockerData' },
    '/jenkins': { file: '../src/data/jenkinsData.js', exportName: 'jenkinsData' },
    '/kubernetes': { file: '../src/data/kubernetesData.js', exportName: 'kubernetesData' },
    '/kafka': { file: '../src/data/kafkaData.js', exportName: 'kafkaData' },
    '/appium': { file: '../src/data/appiumData.js', exportName: 'appiumData' },
    '/browserstack': { file: '../src/data/browserstackData.js', exportName: 'browserstackData' },
    '/aws': { file: '../src/data/awsData.js', exportName: 'awsData' },
    '/azure': { file: '../src/data/azureData.js', exportName: 'azureData' },
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('"', '&quot;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
}

function textValue(value) {
    if (!value) return ''
    if (typeof value === 'string') return value
    if (typeof value === 'object') return value.en || value.tr || ''
    return ''
}

function snippetFromBlock(block) {
    if (!block || typeof block !== 'object') return ''
    if (['code', 'editor', 'visual', 'diagram', 'table'].includes(block.type)) return ''
    return textValue(block.content || block.text || block.title || block.question || block.description)
}

async function routeContent(seo) {
    const config = DATA_MODULES[seo.path]
    if (!config) return null

    try {
        const module = await import(config.file)
        const data = module[config.exportName]
        const content = data?.en || data?.tr || data
        if (!content) return null

        const hero = content.hero || {}
        const sections = Array.isArray(content.sections) ? content.sections : []
        const topics = sections
            .map((section, index) => ({
                title: section.title || content.tabs?.[index] || '',
                snippets: (section.blocks || []).map(snippetFromBlock).filter(Boolean).slice(0, 2),
            }))
            .filter((item) => item.title)
            .slice(0, 8)

        return {
            title: hero.title || seo.title.replace(' | LearnQA.dev', ''),
            intro: hero.intro || hero.subtitle || '',
            topics,
        }
    } catch (error) {
        console.warn(`Could not load SEO content for ${seo.path}: ${error.message}`)
        return null
    }
}

function fallbackContent(seo, content) {
    const links = ROUTE_SEO
        .filter((item) => item.path !== seo.path)
        .map((item) => `          <li><a href="${escapeHtml(item.path)}">${escapeHtml(item.title.replace(' | LearnQA.dev', ''))}</a></li>`)
        .join('\n')
    const contentIntro = content?.intro ? `<p>${escapeHtml(content.intro)}</p>` : ''
    const topicList = content?.topics?.length
        ? `<section>
        <h2>What you can learn on this page</h2>
        <ul>
${content.topics.map((topic) => `          <li><strong>${escapeHtml(textValue(topic.title))}</strong>${topic.snippets.length ? ` — ${escapeHtml(topic.snippets.join(' ')).slice(0, 260)}` : ''}</li>`).join('\n')}
        </ul>
        </section>`
        : ''

    return `<main data-seo-fallback="true" style="font-family: Inter, Arial, sans-serif; max-width: 960px; margin: 0 auto; padding: 32px 20px; line-height: 1.6;">
        <h1>${escapeHtml(content?.title || seo.title.replace(' | LearnQA.dev', ''))}</h1>
        <p>${escapeHtml(seo.description)}</p>
        ${contentIntro}
        ${topicList}
        <nav aria-label="LearnQA.dev topic links">
        <h2>QA Learning Topics</h2>
        <ul>
${links}
        </ul>
        </nav>
    </main>`
}

function replaceMeta(html, seo) {
    const url = canonicalUrl(seo.path)
    const title = escapeHtml(seo.title)
    const description = escapeHtml(seo.description)
    const canonical = escapeHtml(url)
    const structuredData = JSON.stringify([
        {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: seo.title,
            description: seo.description,
            url,
            isPartOf: {
                '@type': 'WebSite',
                name: 'LearnQA.dev',
                url: 'https://learnqa.dev/',
            },
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'LearnQA.dev',
                    item: 'https://learnqa.dev/',
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: seo.path === '/' ? 'QA Learning Platform' : seo.title.replace(' | LearnQA.dev', ''),
                    item: url,
                },
            ],
        },
    ], null, 2).replaceAll('</script', '<\\/script')

    return html
        .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
        .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`)
        .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`)
        .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
        .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`)
        .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`)
        .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
        .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`)
        .replace('<div id="root"></div>', `<div id="root">\n${fallbackContent(seo, seo.content)}\n    </div>`)
        .replace('</head>', `    <script type="application/ld+json">\n${structuredData}\n    </script>\n  </head>`)
}

const template = await readFile(indexPath, 'utf8')

for (const seo of ROUTE_SEO) {
    const html = replaceMeta(template, { ...seo, content: await routeContent(seo) })

    if (seo.path === '/') {
        await writeFile(indexPath, html)
        continue
    }

    const routeDir = join(distDir, seo.path.replace(/^\//, ''))
    await mkdir(routeDir, { recursive: true })
    await writeFile(join(routeDir, 'index.html'), html)
}

console.log(`Generated ${ROUTE_SEO.length} static route HTML shells.`)
