import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { LOCALES, ROUTE_SEO, alternatesFor, canonicalUrl, localizedPath, seoFor } from '../src/utils/seo.js'
import { INTERVIEW_SHOWCASE } from '../src/data/generated/interviewShowcase.js'
import { interviewWarmupData } from '../src/data/interviewWarmupData.js'
import { SECTION_SLUGS } from '../src/data/generated/sectionSlugs.js'
import { buildSectionSeoIndex } from './lib/sectionSeo.mjs'
import { DATA_MODULES, loadDataModule } from './lib/topicDataModules.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const distDir = join(rootDir, 'dist')
const indexPath = join(distDir, 'index.html')


function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('"', '&quot;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
}

// Shell'ler artık iki dilde üretiliyor (Documents/seo-phase-2-plan.md §2):
// TR → dist/<route>/index.html, EN → dist/en/<route>/index.html.
// Gövde metni ELLE yazılmaz; mevcut bilingual veriden locale'e göre seçilir.
function textValue(value, locale = 'en') {
    if (!value) return ''
    if (typeof value === 'string') return value
    if (typeof value === 'object') {
        const other = locale === 'tr' ? 'en' : 'tr'
        return value[locale] || value[other] || ''
    }
    return ''
}

// Statik shell'deki sabit arayüz metinleri (gövde crawler için okunabilir olmalı,
// bu yüzden sayfanın diliyle aynı dilde olmalı).
const UI_TEXT = {
    tr: {
        whatYouLearn: 'Bu sayfada neler öğreneceksin',
        topicNav: 'QA Öğrenme Konuları',
        navLabel: 'LearnQA.dev konu bağlantıları',
    },
    en: {
        whatYouLearn: 'What you can learn on this page',
        topicNav: 'QA Learning Topics',
        navLabel: 'LearnQA.dev topic links',
    },
}

function testFrameworksContent(locale) {
    if (locale === 'tr') {
        return {
            title: 'pytest, Selenium ve Playwright Karşılaştırması',
            intro: 'pytest, Selenium ve Playwright\'ı QA otomasyonu açısından karşılaştır: hangi araç ne zaman kullanılır, dil tercihinin getirdiği ödünleşimler, locator stratejisi, wait yapıları, raporlama, CI kullanımı ve Java bilenler için geçiş rehberi.',
            topics: [
                {
                    title: 'Framework Karşılaştırması',
                    snippets: [
                        'pytest, Selenium ve Playwright\'ın gerçek bir QA stack\'inde nereye oturduğunu anla: test runner, tarayıcı otomasyonu, API doğrulama, raporlama ve CI/CD koşumu.',
                        'Bir projenin Selenium ekosistem genişliğine mi, Playwright auto-waiting ve modern locator API\'sine mi, yoksa pytest fixture düzenine mi ihtiyacı olduğuna karar vermek için karşılaştırmayı kullan.',
                    ],
                },
                {
                    title: 'Playwright Dil Karşılaştırması',
                    snippets: [
                        'Playwright örneklerini TypeScript, Python ve Java üzerinde karşılaştır; bildiğin Java desenlerini modern tarayıcı otomasyon API\'lerine eşle.',
                        'Diller arasında async/await kullanımı, assertion yazımı, locator sözdizimi, fixture yapısı ve page object tasarımı farklarını öğren.',
                    ],
                },
                {
                    title: 'Python Framework\'leri',
                    snippets: [
                        'Python tarafında pytest, Selenium ve Playwright\'ı incele: proje yapısı, fixture kullanımı, setup ve teardown, tarayıcı aksiyonları, wait yapıları ve sık görülen otomasyon hataları.',
                        'pytest kavramlarını JUnit/TestNG alışkanlıklarına bağla: test keşfi, parametrizasyon, marker kullanımı, fixture, assertion ve rapor üretimi.',
                    ],
                },
            ],
        }
    }

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

// TR dokümanlarında bölüm satırı `**Chapter N: Türkçe Başlık**` biçimindedir —
// cleanDocumentLine `**` işaretlerini attığı için aynı regex iki dilde de çalışır.
function documentPath(baseName, locale) {
    return join(rootDir, 'public', 'documents', locale === 'tr' ? `${baseName}_tr.md` : `${baseName}.md`)
}

const DOC_TEXT = {
    java: {
        tr: {
            title: 'QA Otomasyonu İçin Java Referans Rehberi',
            intro: 'QA otomasyon mühendisleri için hazırlanmış Java referansına göz at: aranabilir bölümler, iki dilli gezinme, kopyalanabilir Java örnekleri ve Selenium, API testi ile mülakat hazırlığına bağlanan konular.',
            chapterSnippet: 'Java sözdizimini, nesne yönelimli tasarımı, collection yapılarını, exception yönetimini, concurrency konularını ve teste dönük desenleri QA otomasyonu bakış açısıyla gözden geçir.',
            chapterLabel: 'Bölüm',
        },
        en: {
            title: 'Java Reference Guide for QA Automation',
            intro: 'Browse a Java reference tailored for QA automation engineers, with searchable chapters, bilingual navigation, copyable Java examples and topics that map back to Selenium, API testing and interview preparation.',
            chapterSnippet: 'Review Java syntax, object-oriented design, collections, exceptions, concurrency and testing-related patterns from a QA automation point of view.',
            chapterLabel: 'Chapter',
        },
    },
    git: {
        tr: {
            title: 'QA Otomasyonu İçin Git ve GitHub Referans Rehberi',
            intro: 'QA otomasyon mühendisleri için hazırlanmış Git ve GitHub referans kitabına göz at: aranabilir bölümler, iki dilli çeviri, kopyalanabilir komut örnekleri ve SSH ile credential kurulumlarının ayrıntılı anlatımı.',
            chapterSnippet: 'Git geçmişini, staging alanını, commit atmayı, remote yapılandırmasını, branch açmayı, conflict çözmeyi, stash kullanımını, rebase işlemini ve GitHub iş birliği akışlarını gözden geçir.',
            chapterLabel: 'Bölüm',
        },
        en: {
            title: 'Git & GitHub Reference Guide for QA Automation',
            intro: 'Browse a Git and GitHub reference book tailored for QA automation engineers, featuring searchable chapters, bilingual translation, copyable command examples and detailed setups for SSH and credentials.',
            chapterSnippet: 'Review Git history, staging, committing, remote configuration, branching, conflict resolution, stashing, rebasing, and GitHub collaboration workflows.',
            chapterLabel: 'Chapter',
        },
    },
}

async function javaDocumentContent(locale) {
    const docPath = documentPath('JavaNotesForProfessionals', locale)
    const text_ = DOC_TEXT.java[locale]

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
            title: text_.title,
            intro: text_.intro,
            topics: chapters.map((chapter) => ({
                title: `${text_.chapterLabel} ${chapter.number}: ${chapter.title}`,
                snippets: [text_.chapterSnippet],
            })),
        }
    } catch (error) {
        console.warn(`Could not load Java document SEO content (${locale}): ${error.message}`)
        return {
            title: text_.title,
            intro: text_.intro,
            topics: locale === 'tr'
                ? [
                    { title: 'Java Dil Temelleri', snippets: ['Java otomasyon araçları kullanan QA mühendisleri için temel sözdizimi, tipler, string işlemleri, diziler ve kontrol akışı.'] },
                    { title: 'Collection Yapıları ve OOP', snippets: ['Güvenilir otomasyon kodu için list, set, map yapıları, class, interface, kalıtım ve generics kullanımı.'] },
                    { title: 'Exception Yönetimi ve Test', snippets: ['Java QA projelerinde kullanılan exception yönetimi, assertion yazımı, unit test ve hata ayıklama desenleri.'] },
                ]
                : [
                    { title: 'Java Language Basics', snippets: ['Core syntax, types, strings, arrays and control flow for QA engineers using Java automation tools.'] },
                    { title: 'Collections and OOP', snippets: ['Lists, sets, maps, classes, interfaces, inheritance and generics for reliable automation code.'] },
                    { title: 'Exceptions and Testing', snippets: ['Exception handling, assertions, unit testing and debugging patterns used in Java QA projects.'] },
                ],
        }
    }
}

async function gitDocumentContent(locale) {
    const docPath = documentPath('GitNotesForProfessionals', locale)
    const text_ = DOC_TEXT.git[locale]

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
            title: text_.title,
            intro: text_.intro,
            topics: chapters.map((chapter) => ({
                title: `${text_.chapterLabel} ${chapter.number}: ${chapter.title}`,
                snippets: [text_.chapterSnippet],
            })),
        }
    } catch (error) {
        console.warn(`Could not load Git document SEO content (${locale}): ${error.message}`)
        return {
            title: text_.title,
            intro: text_.intro,
            topics: locale === 'tr'
                ? [
                    { title: 'Başlangıç ve Yapılandırma', snippets: ['Git kurulumu, credential ayarları, GitHub hesabı açma ve SSH anahtarı yapılandırması.'] },
                    { title: 'Remote ve Staging', snippets: ['Remote URL yönetimi, staging alanına ekleme, geri alma, commit atma, push ve pull işlemleri.'] },
                    { title: 'Branch ve Conflict', snippets: ['Branch yönetimi, merge işlemleri, merge conflict çözümü ve interaktif rebase.'] },
                ]
                : [
                    { title: 'Getting Started and Config', snippets: ['Git installation, credentials setup, GitHub account registration, and SSH key configurations.'] },
                    { title: 'Remotes and Staging', snippets: ['Working with remote URLs, staging, unstaging, committing, pushing and pulling.'] },
                    { title: 'Branching and Conflicts', snippets: ['Managing branches, merge operations, resolving merge conflicts, and interactive rebasing.'] },
                ],
        }
    }
}

async function specialRouteContent(seo, locale) {
    if (seo.path === '/test-frameworks') return testFrameworksContent(locale)
    if (seo.path === '/java-document') return javaDocumentContent(locale)
    if (seo.path === '/git-document') return gitDocumentContent(locale)
    if (seo.path === '/sprint') return locale === 'tr' ? {
        title: 'QA Sprint Simülatörü — Analiz Et, Test Yaz, Otomatikleştir, Yayınla',
        intro: 'Bir QA ekibine katıl ve gerçek sprint bug\'larını uçtan uca kapat. Her bug, bir QA mühendisinin gerçekten izlediği akışı takip eder: raporu analiz edip hatalı katmanı bul, gözlemlenebilir bir test case yaz, doğru assertion ile otomatikleştir, CI hatasını kanıt olarak oku ve merge öncesi pipeline\'da kapıya bağla.',
        topics: [
            { title: 'Bug raporunu analiz et', snippets: ['Raporlamadan önce yeniden üret: tek bir test yazmadan önce hatanın frontend\'de mi, API\'de mi, yoksa veri katmanında mı olduğunu bul.'] },
            { title: 'Test case yaz', snippets: ['Gözlemlenebilir bir sonucu ifade eden Given/When/Then adımları — bug\'ı maskeleyecek olan sayfa yenileme adımı olmadan.'] },
            { title: 'Assertion ile otomatikleştir', snippets: ['Sabit süre yerine koşul bekleyen Selenium ve Playwright testleri; böylece bug varken güvenilir biçimde kırmızı olurlar.'] },
            { title: 'CI hatasını oku', snippets: ['Yeni yazılmış bir regresyon testinin ilk koşumda kırmızı olması testin çalıştığının kanıtıdır, devre dışı bırakılacak bir sorun değil.'] },
            { title: 'Merge öncesi kapıya bağla', snippets: ['Testi regresyon suite\'ine etiketle ve her pull request\'te pipeline\'ı tetikle ki bug sessizce geri dönemesin.'] },
        ],
    } : {
        title: 'QA Sprint Simulator — Analyze, Test, Automate, Ship',
        intro: 'Join a QA team and close real sprint bugs end to end. Every bug follows the workflow a QA engineer actually uses: analyze the report and find the faulty layer, write an observable test case, automate it with a proper assertion, read the CI failure as evidence, and gate it in the pipeline before merge.',
        topics: [
            { title: 'Analyze the bug report', snippets: ['Reproduce before you report: find whether the fault lives in the frontend, the API or the data layer before writing a single test.'] },
            { title: 'Write the test case', snippets: ['Given/When/Then steps that state an observable outcome, without the refresh step that would mask the bug.'] },
            { title: 'Automate with an assertion', snippets: ['Selenium and Playwright tests that wait on a condition instead of a fixed duration, so they fail reliably while the bug exists.'] },
            { title: 'Read the CI failure', snippets: ['A newly written regression test going red on its first run is proof the test works, not a problem to disable.'] },
            { title: 'Gate it before merge', snippets: ['Tag the test into the regression suite and trigger the pipeline on every pull request so the bug cannot silently return.'] },
        ],
    }
    // Portfolyo içeriği %100 yerel (kullanıcının tarayıcısında) üretilir —
    // crawler'a gösterilecek gerçek kullanıcı verisi YOKTUR. Shell, sayfanın NE
    // OLDUĞUNU anlatan tanıtım metni içerir; kullanıcı verisi taklit etmez.
    if (seo.path === '/portfolio') return locale === 'tr' ? {
        title: 'QA Portfolyo — Çözdüğün Görevleri Somut Kanıta Dönüştür',
        intro: 'QA öğrenme ilerlemeni tek sayfada topla. Portfolyo yeni bir şey üretmez; çözdüğün görev zincirlerini, kapattığın sprint bug\'larını, ustalık skorlarını ve kariyer rozetlerini bir araya getirip gösterilebilir bir çalışma günlüğüne çevirir. Tamamen tarayıcında çalışır, üyelik gerektirmez ve Markdown olarak dışa aktarılabilir.',
        topics: [
            { title: 'İnşa ettiklerin', snippets: ['Bitirdiğin her görev zinciri için ne yaptığını, hangi beceriyi kullandığını ve ne zaman tamamladığını gösteren bir kart.'] },
            { title: 'Sprint deneyimi', snippets: ['Kapattığın bug\'lar: severity rozeti, bug başlığı ve Analiz → Test Case → Otomasyon → CI → Merge akışının hangi adımlarından geçtiği.'] },
            { title: 'Beceri haritası ve ustalık', snippets: ['Beceri alanı başına ortalama ustalık skoru ve başladığın konuların mülakat puanıyla birlikte listesi.'] },
            { title: 'Markdown dışa aktarım', snippets: ['Portfolyonu GitHub README veya LinkedIn profiline yapıştırabileceğin bir metne çevir.'] },
        ],
    } : {
        title: 'QA Portfolio — Turn the Missions You Solved Into Proof',
        intro: 'Gather your QA learning progress onto one page. The portfolio produces nothing new; it brings together the mission chains you solved, the sprint bugs you closed, your mastery scores and your career badges, turning them into a work log you can actually show. It runs entirely in your browser, needs no account, and exports as Markdown.',
        topics: [
            { title: 'What you built', snippets: ['A card for every mission chain you finished, showing what you did, which skill you used and when you completed it.'] },
            { title: 'Sprint experience', snippets: ['The bugs you closed: severity badge, bug title, and the Analyze to Test Case to Automate to CI to Merge steps you worked through.'] },
            { title: 'Skill map and mastery', snippets: ['Average mastery score per skill area, plus a list of the topics you started along with their interview scores.'] },
            { title: 'Markdown export', snippets: ['Turn your portfolio into text you can paste into a GitHub README or your LinkedIn profile.'] },
        ],
    }
    if (seo.path === '/qa-mentor') return locale === 'en' ? {
        title: 'QA Career Roadmap — Personalized Learning Plan',
        intro: 'Build a personalized QA career mind map based on your experience level and preferences. Four different maps, from the Algorithms → Manual Testing → Java → Selenium path for absolute beginners to the Java+Playwright or Python/TypeScript routes for experienced developers.',
        topics: [
            { title: 'QA Engineer From Scratch (MAP A)', snippets: ['An 11-step path for people starting without a software background: Algorithms, Manual Testing, Java, Selenium, Postman, REST Assured, Jenkins, AWS, Docker, Kubernetes, Kafka.'] },
            { title: 'Java + Selenium Path (MAP C1)', snippets: ['For QA engineers with a software background who want the classic industry stack: Java, Selenium, REST Assured, Jenkins, Docker, AWS, Kubernetes.'] },
            { title: 'Java + Playwright Path (MAP C2)', snippets: ['For modern QA automation: Java, Playwright, TypeScript, REST Assured, Jenkins, Docker, AWS, Kubernetes plus optional Cypress and Azure DevOps.'] },
            { title: 'Python / TypeScript Path (MAP B)', snippets: ['Modern automation with Python and TypeScript: pytest, Playwright, Postman, SQL, Jenkins, Docker, AWS plus optional Selenium, Cypress and BrowserStack.'] },
        ],
    } : {
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

function snippetFromBlock(block, locale) {
    if (!block || typeof block !== 'object') return ''
    if (['code', 'editor', 'visual', 'diagram', 'table'].includes(block.type)) return ''
    return textValue(block.content || block.text || block.title || block.question || block.description, locale)
}

function snippetsFromLesson(lesson, locale) {
    return [
        textValue(lesson.analogy, locale),
        textValue(lesson.why, locale),
        textValue(lesson.game?.title, locale),
        textValue(lesson.game?.prompt, locale),
    ].filter(Boolean).slice(0, 2)
}

async function routeContent(seo, locale) {
    const specialContent = await specialRouteContent(seo, locale)
    if (specialContent) return specialContent

    const config = DATA_MODULES[seo.path]
    if (!config) return null

    try {
        const loaded = await loadDataModule(seo.path)
        const data = loaded?.data
        const other = locale === 'tr' ? 'en' : 'tr'
        const content = data?.[locale] || data?.[other] || data
        if (!content) return null

        const hero = content.hero || {}
        const sections = Array.isArray(content.sections) ? content.sections : []
        const lessons = Array.isArray(content.lessons) ? content.lessons : []
        const topicSource = sections.length ? sections : lessons
        const topics = topicSource
            .map((item, index) => ({
                title: item.title || content.tabs?.[index] || '',
                snippets: Array.isArray(item.blocks)
                    ? item.blocks.map((block) => snippetFromBlock(block, locale)).filter(Boolean).slice(0, 2)
                    : snippetsFromLesson(item, locale),
            }))
            .filter((item) => item.title)
            .slice(0, 8)

        return {
            title: hero.title || seo.title.replace(' | LearnQA.dev', ''),
            intro: hero.intro || hero.subtitle || '',
            // "X nedir?" sorusunun doğrudan cevabı — uygulamada da AYNEN
            // görünür (bkz. TopicPage hero altı). Tanımlıysa gövdenin ilk
            // paragrafı olur, çünkü öne çıkan cevap kutusu ilk paragrafa bakar.
            seoAnswer: textValue(content.seoAnswer, locale),
            topics,
            isCourse: Boolean(config.exportName),
        }
    } catch (error) {
        console.warn(`Could not load SEO content for ${seo.path} (${locale}): ${error.message}`)
        return null
    }
}

function fallbackContent(seo, content, locale) {
    const ui = UI_TEXT[locale]
    // Statik shell'deki iç bağlantılar da dil-tutarlı olmalı: TR shell TR
    // sayfalara, EN shell /en/... sayfalarına link verir. Karışık linkleme,
    // crawler'ın dil kümelerini birbirine bağlamasına yol açar.
    const links = ROUTE_SEO
        .filter((item) => item.path !== seo.path && !item.dynamic && !item.noindex)
        .map((item) => {
            const label = seoFor(item, locale).title.replace(' | LearnQA.dev', '')
            return `          <li><a href="${escapeHtml(localizedPath(item.path, locale))}">${escapeHtml(label)}</a></li>`
        })
        .join('\n')
    // Cevap paragrafı, açıklama ve giriş metninden ÖNCE gelir: "X nedir"
    // sorgularında arama motoru sayfanın ilk paragrafına bakar.
    const seoAnswer = content?.seoAnswer
        ? `<p data-seo-answer="true">${escapeHtml(textValue(content.seoAnswer, locale))}</p>`
        : ''
    const contentIntro = content?.intro ? `<p>${escapeHtml(textValue(content.intro, locale))}</p>` : ''
    const topicList = content?.topics?.length
        ? `<section>
        <h2>${escapeHtml(ui.whatYouLearn)}</h2>
        <ul>
${content.topics.map((topic) => `          <li><strong>${escapeHtml(textValue(topic.title, locale))}</strong>${topic.snippets.length ? ` — ${escapeHtml(topic.snippets.join(' ')).slice(0, 260)}` : ''}</li>`).join('\n')}
        </ul>
        </section>`
        : ''

    // Mülakat ısınma bölümü YALNIZCA ana sayfada. Bu metin gate'siz ve
    // görünürdür; ana sayfanın FAQPage şeması BİREBİR bu metinden üretilir
    // (şema ile ekranda yazan şey ayrışmasın diye — bkz. DEPLOY.md §9.3).
    const warmup = seo.path === '/' && INTERVIEW_SHOWCASE.length
        ? `<section>
        <h2>${escapeHtml(textValue(interviewWarmupData.heading, locale))}</h2>
        <p>${escapeHtml(textValue(interviewWarmupData.intro, locale))}</p>
        <p><strong>${escapeHtml(textValue(interviewWarmupData.purposeTitle, locale))}</strong> ${escapeHtml(textValue(interviewWarmupData.purposeBody, locale))}</p>
${INTERVIEW_SHOWCASE.map((item) => `        <article>
          <h3>${escapeHtml(textValue(item.q, locale))}</h3>
          <p>${escapeHtml(textValue(item.a, locale))}</p>
          <p><a href="${escapeHtml(localizedPath(item.route, locale))}">${escapeHtml(interviewWarmupData.routeLabels[item.route] || item.route)}</a></p>
        </article>`).join('\n')}
        </section>`
        : ''

    return `<main data-seo-fallback="true" style="font-family: Inter, Arial, sans-serif; max-width: 960px; margin: 0 auto; padding: 32px 20px; line-height: 1.6;">
        <h1>${escapeHtml(textValue(content?.title, locale) || seo.title.replace(' | LearnQA.dev', ''))}</h1>
        ${seoAnswer}
        <p>${escapeHtml(seo.description)}</p>
        ${contentIntro}
        ${topicList}
        ${warmup}
        <nav aria-label="${escapeHtml(ui.navLabel)}">
        <h2>${escapeHtml(ui.topicNav)}</h2>
        <ul>
${links}
        </ul>
        </nav>
    </main>`
}

// Sekme shell'inin gövdesi. Hub shell'inden farkı: burada O SEKMENİN gerçek
// metni basılır (8 başlıklık özet değil), altında da aynı dersin diğer
// sekmelerine bağlantı listesi olur — crawler sayfayı bulduğunda kardeş
// sekmeleri de keşfedebilsin diye.
function sectionFallbackContent(seo, locale) {
    const ui = UI_TEXT[locale]
    const paragraphs = seo.prose
        .slice(0, 14)
        .map((part) => `        <p>${escapeHtml(part)}</p>`)
        .join('\n')

    const siblings = seo.siblings
        .map((item) => `          <li><a href="${escapeHtml(localizedPath(item.path, locale))}">${escapeHtml(item.label)}</a></li>`)
        .join('\n')

    return `<main data-seo-fallback="true" data-seo-section="true" style="font-family: Inter, Arial, sans-serif; max-width: 960px; margin: 0 auto; padding: 32px 20px; line-height: 1.6;">
        <nav aria-label="breadcrumb">
        <a href="${escapeHtml(localizedPath('/', locale))}">LearnQA.dev</a> › <a href="${escapeHtml(localizedPath(seo.hubPath, locale))}">${escapeHtml(seo.hubLabel)}</a>
        </nav>
        <h1>${escapeHtml(seo.sectionLabel)}</h1>
        <p>${escapeHtml(seo.description)}</p>
${paragraphs}
        <nav aria-label="${escapeHtml(ui.navLabel)}">
        <h2>${escapeHtml(seo.siblingsHeading)}</h2>
        <ul>
${siblings}
        </ul>
        </nav>
    </main>`
}

function structuredDataFor(seo, url, locale) {
    // Sekme sayfaları: 3 basamaklı breadcrumb (Ana Sayfa › Ders › Bölüm).
    // SERP'te çıplak URL yerine bu yol gösterilir ve sayfanın hiyerarşideki
    // yerini Google'a açıkça bildirir.
    if (seo.isSection) {
        return JSON.stringify([
            {
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                name: seo.title,
                description: seo.description,
                url,
                inLanguage: locale,
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
                    { '@type': 'ListItem', position: 1, name: 'LearnQA.dev', item: 'https://learnqa.dev/' },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: seo.hubLabel,
                        item: canonicalUrl(localizedPath(seo.hubPath, locale)),
                    },
                    { '@type': 'ListItem', position: 3, name: seo.sectionLabel, item: url },
                ],
            },
        ], null, 2).replaceAll('</script', '<\\/script')
    }

    const graph = [
        {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: seo.title,
            description: seo.description,
            url,
            inLanguage: locale,
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
    ]

    // Course: gerçek ders sayfaları için (veri modülü olan route'lar).
    if (seo.content?.isCourse) {
        graph.push({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: seo.title.replace(' | LearnQA.dev', ''),
            description: seo.description,
            url,
            inLanguage: locale,
            isAccessibleForFree: true,
            provider: {
                '@type': 'Organization',
                name: 'LearnQA.dev',
                url: 'https://learnqa.dev/',
            },
        })
    }

    // FAQPage: YALNIZCA ana sayfada ve YALNIZCA orada GÖRÜNÜR olan sorulardan.
    //
    // Geçmişi önemli: şema önce her ders sayfasında mülakat sorularından
    // üretiliyordu, ama o sorular sayfanın görünür gövdesinde YOKTU (yalnızca
    // JSON-LD içindeydiler) ve uygulamada %60 quiz barajının arkasındaydılar.
    // Arama motoru politikası soru/cevabın kullanıcıya GÖRÜNÜR olmasını şart
    // koştuğu için şema tamamen kaldırılmıştı. Ana sayfaya eklenen gate'siz
    // ısınma bölümüyle koşul artık gerçekten sağlanıyor: aşağıdaki metnin
    // AYNISI yukarıda `fallbackContent`'te görünür olarak basılıyor ve
    // uygulamada `InterviewWarmup` bileşeni olarak render ediliyor.
    //
    // KURAL: bu şemaya, sayfada görünmeyen tek bir soru bile eklenemez.
    // `tests/seo-phase2-coverage.spec.ts` her FAQPage sorusunun aynı sayfanın
    // görünür gövdesinde bulunduğunu doğrular.
    if (seo.path === '/' && INTERVIEW_SHOWCASE.length >= 3) {
        graph.push({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            inLanguage: locale,
            mainEntity: INTERVIEW_SHOWCASE.map((item) => ({
                '@type': 'Question',
                name: textValue(item.q, locale),
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: textValue(item.a, locale),
                },
            })),
        })
    }

    return JSON.stringify(graph, null, 2).replaceAll('</script', '<\\/script')
}

function replaceMeta(html, seo, locale) {
    const urlPath = localizedPath(seo.path, locale)
    const url = canonicalUrl(urlPath)
    // Sekme shell'lerinin bir kısmı canonical'ını KENDİNE değil hub'a verir
    // (ilk sekme: içeriği hub sayfasının hedeflediği sorguyla aynı).
    const canonicalPath = localizedPath(seo.canonicalPath || seo.path, locale)
    const canonicalHref = canonicalUrl(canonicalPath)
    const title = escapeHtml(seo.title)
    const description = escapeHtml(seo.description)
    const canonical = escapeHtml(canonicalHref)
    const structuredData = structuredDataFor(seo, url, locale)
    const hreflangTags = alternatesFor(seo.canonicalPath || seo.path)
        .map((alt) => `    <link rel="alternate" hreflang="${alt.hreflang}" href="${escapeHtml(alt.href)}" data-seo-hreflang="true" />`)
        .join('\n')
    // Korumalı/işlevsel sayfalar sitemap'e girmez ama shell'leri yine üretilir
    // (GitHub Pages'te derin bağlantıda sert yenileme için gerekir). Crawler bu
    // sayfaları başka bir yoldan bulursa (dış bağlantı, tarayıcı geçmişi)
    // indekslemesin diye robots meta'sı burada basılır. `follow` bilinçli:
    // sayfayı indeksleme ama üzerindeki linkleri izlemeye devam et.
    const robotsTag = seo.noindex ? '    <meta name="robots" content="noindex,follow" />\n' : ''

    return html
        .replace(/<html lang="[^"]*"/, `<html lang="${locale}"`)
        .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
        .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`)
        .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`)
        .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
        .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`)
        .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`)
        .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
        .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`)
        .replace('<div id="root"></div>', `<div id="root">\n${seo.isSection ? sectionFallbackContent(seo, locale) : fallbackContent(seo, seo.content, locale)}\n    </div>`)
        .replace('</head>', `${robotsTag}${hreflangTags}\n    <script type="application/ld+json">\n${structuredData}\n    </script>\n  </head>`)
}

const template = await readFile(indexPath, 'utf8')

const staticRoutes = ROUTE_SEO.filter((seo) => !seo.dynamic)
let written = 0

for (const locale of LOCALES) {
    for (const entry of staticRoutes) {
        const localized = { ...entry, ...seoFor(entry, locale) }
        const html = replaceMeta(template, { ...localized, content: await routeContent(localized, locale) }, locale)
        const urlPath = localizedPath(entry.path, locale)

        // TR ana sayfa dist/index.html'i EZER (GitHub Pages 404 fallback'i de
        // bundan kopyalanır — varsayılan dil TR olduğu için doğru davranış).
        if (urlPath === '/') {
            await writeFile(indexPath, html)
            written += 1
            continue
        }

        const routeDir = join(distDir, urlPath.replace(/^\//, ''))
        await mkdir(routeDir, { recursive: true })
        await writeFile(join(routeDir, 'index.html'), html)
        written += 1
    }
}

console.log(`Generated ${written} static route shells (${staticRoutes.length} routes x ${LOCALES.length} locales).`)

// ─── Sekme (bölüm) shell'leri ────────────────────────────────────────────────
// Ders sayfalarının her dikey sekmesi kendi URL'ini ve kendi crawl edilebilir
// gövdesini alır. Bu adım olmadan sitedeki içeriğin büyük bölümü tek URL'in
// arkasında kalıyor ve Google yalnızca ilk sekmenin özetini görüyordu.

const SIBLINGS_HEADING = {
    tr: 'Bu dersin diğer bölümleri',
    en: 'Other sections in this lesson',
}

const { index: sectionIndex, problems } = await buildSectionSeoIndex(SECTION_SLUGS)
if (problems.length) {
    console.error(problems.join('\n'))
    process.exit(1)
}

let sectionsWritten = 0
let sectionsIndexable = 0

for (const locale of LOCALES) {
    for (const [hubPath, entries] of Object.entries(sectionIndex)) {
        const hubEntry = ROUTE_SEO.find((item) => item.path === hubPath)
        if (!hubEntry) continue

        for (const entry of entries) {
            const hubLabel = entry.pageLabels[locale] || seoFor(hubEntry, locale).title.replace(' | LearnQA.dev', '')
            const siblings = entries
                .filter((item) => item.index !== entry.index && !item.isHubDuplicate)
                .map((item) => ({ path: item.path, label: item.titles[locale] }))

            const seo = {
                path: entry.path,
                title: entry.seo[locale].title,
                description: entry.seo[locale].description,
                isSection: true,
                hubPath,
                hubLabel,
                sectionLabel: entry.titles[locale],
                prose: entry.prose[locale],
                siblings,
                siblingsHeading: SIBLINGS_HEADING[locale],
                // İlk sekme: canonical HUB'a gider (aynı sorguyu hedefliyorlar,
                // ikisi birden indekslenirse birbirini yerler). Canonical tek
                // başına birleştirme sinyalidir; üstüne noindex EKLENMEZ —
                // ikisi birlikte çelişkili sinyal olur.
                canonicalPath: entry.isHubDuplicate ? hubPath : undefined,
                // Kilitli (mülakat) ve ince bölümler indekslenmez.
                noindex: !entry.indexable && !entry.isHubDuplicate,
            }

            const html = replaceMeta(template, seo, locale)
            const urlPath = localizedPath(entry.path, locale)
            const routeDir = join(distDir, urlPath.replace(/^\//, ''))
            await mkdir(routeDir, { recursive: true })
            await writeFile(join(routeDir, 'index.html'), html)
            sectionsWritten += 1
            if (entry.indexable && locale === 'tr') sectionsIndexable += 1
        }
    }
}

console.log(`Generated ${sectionsWritten} section shells (${sectionsIndexable} indexable sections x ${LOCALES.length} locales).`)
