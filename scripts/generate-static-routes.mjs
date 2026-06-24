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
    '/cypress': { file: '../src/data/cypressData.js', exportName: 'cypressData' },
    '/python': { file: '../src/data/pythonData.js', exportName: 'pythonData' },
    '/typescript': { file: '../src/data/typescriptData.js', exportName: 'typescriptData' },
    '/javascript': { file: '../src/data/javascriptData.js', exportName: 'javascriptData' },
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
    '/git-github': { file: '../src/data/gitGithubData.js', exportName: 'gitGithubData' },
    '/linux': { file: '../src/data/linuxData.js', exportName: 'linuxData' },
    '/aws': { file: '../src/data/awsData.js', exportName: 'awsData' },
    '/azure': { file: '../src/data/azureData.js', exportName: 'azureData' },
    '/what-is-testing': { file: '../src/data/whatIsTestingData.js', exportName: 'whatIsTestingData' },
    '/security': { file: '../src/data/securityData.js', exportName: 'securityData' },
    '/manual-testing': { file: '../src/data/manualTestingData.js', exportName: 'manualTestingData' },
    '/algorithms': { file: '../src/data/beginnerAlgorithmsData.js', exportName: 'beginnerAlgorithmsData' },
    '/advanced-algorithms': { file: '../src/data/algorithmsData.js', exportName: 'algorithmsData' },
    '/qa-mentor': { file: '../src/data/qaMentorData.js', exportName: null },
    '/backend': { file: '../src/data/backendData.js', exportName: 'backendData' },
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

function testFrameworksContent() {
    return {
        title: 'Pytest vs Selenium vs Playwright Comparison',
        intro: 'Compare pytest, Selenium and Playwright from a QA automation perspective, including when to use each framework, language trade-offs, locator strategy, waits, reporting, CI usage and Java-friendly migration guidance.',
        topics: [
            {
                title: 'Framework Comparison',
                snippets: [
                    'Understand where pytest, Selenium and Playwright fit in a real QA stack: test runner, browser automation, API validation, reporting and CI/CD execution.',
                    'Use the comparison to decide whether a project needs Selenium ecosystem coverage, Playwright auto-waiting and modern locators, or pytest fixture-driven test organization.',
                ],
            },
            {
                title: 'Playwright Language Comparison',
                snippets: [
                    'Compare Playwright examples across TypeScript, Python and Java so QA engineers can map familiar Java patterns to modern browser automation APIs.',
                    'Learn differences in async/await, assertions, locator syntax, fixtures and page object design across supported languages.',
                ],
            },
            {
                title: 'Python Frameworks',
                snippets: [
                    'Explore pytest, Selenium and Playwright in Python with project structure, fixtures, setup and teardown, browser actions, waits and common automation failures.',
                    'Connect pytest concepts to JUnit/TestNG habits: test discovery, parametrization, markers, fixtures, assertions and report generation.',
                ],
            },
        ],
    }
}

function cleanDocumentLine(line) {
    return line
        .replace(/\*\*/g, '')
        .replace(/\\(!|\[|\]|=|\+|>|<|-|&|'|")/g, '$1')
        .trim()
}

async function javaDocumentContent() {
    const docPath = join(rootDir, 'public', 'documents', 'JavaNotesForProfessionals.md')

    try {
        const text = await readFile(docPath, 'utf8')
        const chapters = []

        for (const line of text.split('\n')) {
            const cleaned = cleanDocumentLine(line)
            if (cleaned.includes('...')) continue

            const match = cleaned.match(/^Chapter\s+(\d+)\s*:\s*(.+)$/i)
            if (!match) continue

            chapters.push({
                number: Number(match[1]),
                title: match[2].trim(),
            })

            if (chapters.length >= 12) break
        }

        return {
            title: 'Java Reference Guide for QA Automation',
            intro: 'Browse a Java reference tailored for QA automation engineers, with searchable chapters, bilingual navigation, copyable Java examples and topics that map back to Selenium, API testing and interview preparation.',
            topics: chapters.map((chapter) => ({
                title: `Chapter ${chapter.number}: ${chapter.title}`,
                snippets: [
                    'Review Java syntax, object-oriented design, collections, exceptions, concurrency and testing-related patterns from a QA automation point of view.',
                ],
            })),
        }
    } catch (error) {
        console.warn(`Could not load Java document SEO content: ${error.message}`)
        return {
            title: 'Java Reference Guide for QA Automation',
            intro: 'Search and study Java reference material for QA automation, including collections, OOP, exceptions, concurrency, unit testing and practical Selenium/API automation concepts.',
            topics: [
                { title: 'Java Language Basics', snippets: ['Core syntax, types, strings, arrays and control flow for QA engineers using Java automation tools.'] },
                { title: 'Collections and OOP', snippets: ['Lists, sets, maps, classes, interfaces, inheritance and generics for reliable automation code.'] },
                { title: 'Exceptions and Testing', snippets: ['Exception handling, assertions, unit testing and debugging patterns used in Java QA projects.'] },
            ],
        }
    }
}

async function gitDocumentContent() {
    const docPath = join(rootDir, 'public', 'documents', 'GitNotesForProfessionals.md')

    try {
        const text = await readFile(docPath, 'utf8')
        const chapters = []

        for (const line of text.split('\n')) {
            const cleaned = cleanDocumentLine(line)
            if (cleaned.includes('...')) continue

            const match = cleaned.match(/^Chapter\s+(\d+)\s*:\s*(.+)$/i)
            if (!match) continue

            chapters.push({
                number: Number(match[1]),
                title: match[2].trim(),
            })

            if (chapters.length >= 12) break
        }

        return {
            title: 'Git & GitHub Reference Guide for QA Automation',
            intro: 'Browse a Git and GitHub reference book tailored for QA automation engineers, featuring searchable chapters, bilingual translation, copyable command examples and detailed setups for SSH and credentials.',
            topics: chapters.map((chapter) => ({
                title: `Chapter ${chapter.number}: ${chapter.title}`,
                snippets: [
                    'Review Git history, staging, committing, remote configuration, branching, conflict resolution, stashing, rebasing, and GitHub collaboration workflows.',
                ],
            })),
        }
    } catch (error) {
        console.warn(`Could not load Git document SEO content: ${error.message}`)
        return {
            title: 'Git & GitHub Reference Guide for QA Automation',
            intro: 'Search and study Git & GitHub reference material for QA automation, including installation, accounts, branching, conflicts, stashing, rebasing and remote workflows.',
            topics: [
                { title: 'Getting Started and Config', snippets: ['Git installation, credentials setup, GitHub account registration, and SSH key configurations.'] },
                { title: 'Remotes and Staging', snippets: ['Working with remote URLs, staging, unstaging, committing, pushing and pulling.'] },
                { title: 'Branching and Conflicts', snippets: ['Managing branches, merge operations, resolving merge conflicts, and interactive rebasing.'] },
            ],
        }
    }
}

async function specialRouteContent(seo) {
    if (seo.path === '/test-frameworks') return testFrameworksContent()
    if (seo.path === '/java-document') return javaDocumentContent()
    if (seo.path === '/git-document') return gitDocumentContent()
    if (seo.path === '/qa-mentor') return {
        title: 'QA Kariyer Yol Haritası — Kişiselleştirilmiş Öğrenme Planı',
        intro: 'Deneyim seviyene ve tercihlerine göre kişiselleştirilmiş bir QA kariyer zihin haritası oluştur. Sıfırdan başlayanlar için Algoritma → Manuel Test → Java → Selenium yolundan, deneyimli geliştiriciler için Java+Playwright veya Python/TypeScript yoluna kadar 4 farklı kişiselleştirilmiş harita.',
        topics: [
            { title: 'Sıfırdan QA Mühendisi (MAP A)', snippets: ['Yazılım geçmişi olmadan başlayanlar için 11 adımlı yol: Algoritma, Manuel Test, Java, Selenium, Postman, REST Assured, Jenkins, AWS, Docker, Kubernetes, Kafka.'] },
            { title: 'Java + Selenium Yolu (MAP C1)', snippets: ['Yazılım geçmişi olan ve klasik sektör stack\'ini öğrenmek isteyen QA mühendisleri için: Java, Selenium, REST Assured, Jenkins, Docker, AWS, Kubernetes.'] },
            { title: 'Java + Playwright Yolu (MAP C2)', snippets: ['Modern QA automation için: Java, Playwright, TypeScript, REST Assured, Jenkins, Docker, AWS, Kubernetes ve opsiyonel Cypress/Azure DevOps.'] },
            { title: 'Python / TypeScript Yolu (MAP B)', snippets: ['Python ve TypeScript ile modern otomasyon: pytest, Playwright, Postman, SQL, Jenkins, Docker, AWS ve opsiyonel Selenium/Cypress/BrowserStack.'] },
        ],
    }
    return null
}

function snippetFromBlock(block) {
    if (!block || typeof block !== 'object') return ''
    if (['code', 'editor', 'visual', 'diagram', 'table'].includes(block.type)) return ''
    return textValue(block.content || block.text || block.title || block.question || block.description)
}

function snippetsFromLesson(lesson) {
    return [
        textValue(lesson.analogy),
        textValue(lesson.why),
        textValue(lesson.game?.title),
        textValue(lesson.game?.prompt),
    ].filter(Boolean).slice(0, 2)
}

async function routeContent(seo) {
    const specialContent = await specialRouteContent(seo)
    if (specialContent) return specialContent

    const config = DATA_MODULES[seo.path]
    if (!config) return null

    try {
        const module = await import(config.file)
        const data = module[config.exportName]
        const content = data?.en || data?.tr || data
        if (!content) return null

        const hero = content.hero || {}
        const sections = Array.isArray(content.sections) ? content.sections : []
        const lessons = Array.isArray(content.lessons) ? content.lessons : []
        const topicSource = sections.length ? sections : lessons
        const topics = topicSource
            .map((item, index) => ({
                title: item.title || content.tabs?.[index] || '',
                snippets: Array.isArray(item.blocks)
                    ? item.blocks.map(snippetFromBlock).filter(Boolean).slice(0, 2)
                    : snippetsFromLesson(item),
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
        .filter((item) => item.path !== seo.path && !item.dynamic)
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

const staticRoutes = ROUTE_SEO.filter((seo) => !seo.dynamic)

for (const seo of staticRoutes) {
    const html = replaceMeta(template, { ...seo, content: await routeContent(seo) })

    if (seo.path === '/') {
        await writeFile(indexPath, html)
        continue
    }

    const routeDir = join(distDir, seo.path.replace(/^\//, ''))
    await mkdir(routeDir, { recursive: true })
    await writeFile(join(routeDir, 'index.html'), html)
}

console.log(`Generated ${staticRoutes.length} static route HTML shells.`)
