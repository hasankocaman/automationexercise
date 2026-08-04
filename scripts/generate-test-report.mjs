// ─── Test envanteri + kapsam raporu (HTML) ───────────────────────────────────
//
// Ne üretir: `reports/test-report.html` — her test senaryosunu, adımlarını ve
// beklenen sonucunu okunur biçimde gösteren, renkli ve filtrelenebilir tek
// dosyalık bir rapor. Ayrıca kapsam özeti: hangi sayfanın testi var, hangisinin
// yok.
//
// Kaynak: `tests/*.spec.ts` dosyalarının KENDİSİ statik olarak ayrıştırılır.
// Yani rapor "testler ne yapmayı amaçlıyor"u gösterir ve testler değiştiği anda
// otomatik olarak güncellenir — elle yazılan bir test dokümanı gibi eskimez.
//
// ⚠ Bu bir KOD KAPSAMI (line/branch coverage) raporu DEĞİLDİR. Projede birim
// test altyapısı yok; ölçülen şey "hangi sayfa/akış için test var" kapsamıdır.
// Satır bazlı kapsam istenirse ayrı bir araç (V8/istanbul) kurulması gerekir —
// bu rapor onu ölçüyormuş gibi yapmaz.
//
// Kullanım: npm run test:report

import { readdir, readFile, mkdir, writeFile, access } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ROUTE_SEO } from '../src/utils/seo.js'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const testsDir = join(rootDir, 'tests')

// Kalıcı test istisnaları: korumalı sayfalar ve kullanıcı isteğiyle kapsam
// dışında tutulan sayfa. Kapsam oranı bunları paydadan düşer — aksi hâlde
// oran, bilerek alınmış bir kararı eksiklik gibi gösterirdi.
const EXCLUDED_ROUTES = new Set(['/basit-backend', '/security', '/backend'])

// ─────────────────────────────────────────────────────────────────────────────
// Kaynak tarayıcı: string / template literal / yorum içindeki süslü parantezler
// blok sınırını bozmasın diye elle yürüyen küçük bir tarayıcı.
// ─────────────────────────────────────────────────────────────────────────────
function matchBlock(text, openIndex) {
    let depth = 0
    let i = openIndex
    while (i < text.length) {
        const ch = text[i]
        const next = text[i + 1]

        if (ch === '/' && next === '/') {
            i = text.indexOf('\n', i)
            if (i === -1) return text.length
            continue
        }
        if (ch === '/' && next === '*') {
            const end = text.indexOf('*/', i + 2)
            i = end === -1 ? text.length : end + 2
            continue
        }
        if (ch === '\'' || ch === '"' || ch === '`') {
            const quote = ch
            i += 1
            while (i < text.length) {
                if (text[i] === '\\') { i += 2; continue }
                if (text[i] === quote) { i += 1; break }
                i += 1
            }
            continue
        }
        if (ch === '{') depth += 1
        if (ch === '}') {
            depth -= 1
            if (depth === 0) return i
        }
        i += 1
    }
    return text.length
}

/** Eşleşmenin ardından gelen callback gövdesinin `{` konumunu bulur. */
function bodyStart(text, from) {
    const arrow = text.indexOf('=>', from)
    if (arrow === -1) return -1
    const brace = text.indexOf('{', arrow)
    return brace
}

/** Bir bloğun hemen üstündeki bitişik `//` yorum bloğu = senaryonun gerekçesi. */
function leadingComment(text, index) {
    const before = text.slice(0, index)
    const lines = before.split('\n')
    lines.pop() // eşleşmenin kendi satırı
    const collected = []
    for (let i = lines.length - 1; i >= 0; i -= 1) {
        const line = lines[i].trim()
        if (line.startsWith('//')) {
            collected.unshift(line.replace(/^\/\/\s?/, ''))
            continue
        }
        break
    }
    return collected.join(' ').trim()
}

// ─────────────────────────────────────────────────────────────────────────────
// Adım sınıflandırma — ham kod satırı → okunur adım / beklenen sonuç
// ─────────────────────────────────────────────────────────────────────────────
/** Kaynaktaki kaçış dizilerini geri al (`property\\'leri` → `property'leri`). */
function unescape(value) {
    return String(value).replace(/\\(['"`\\])/g, '$1').replace(/\\n/g, ' ')
}

// Tırnak tipini yakalayıp aynı tırnağa kadar okur: bir CSS seçicisinin İÇİNDE
// başka tipte tırnak olabiliyor (`locator('[data-testid="x"] button')`) ve
// naif bir `[^'"]+` kalıbı orada yarıda kesiyordu.
const QUOTED = /(['"`])((?:\\.|(?!\1).)*)\1/

function firstString(line) {
    const match = QUOTED.exec(line)
    return match ? unescape(match[2]) : ''
}

function afterCall(line, name) {
    const at = line.indexOf(`${name}(`)
    if (at === -1) return ''
    const match = QUOTED.exec(line.slice(at))
    return match ? unescape(match[2]) : ''
}

function locatorSummary(line) {
    if (line.includes('getByRole(')) {
        const role = afterCall(line, 'getByRole')
        const name = /name:\s*(['"`/])((?:\\.|(?!\1).)*)\1/.exec(line)
        return name ? `${role} "${unescape(name[2])}"` : role
    }
    if (line.includes('getByTestId(')) return `test kimliği "${afterCall(line, 'getByTestId')}"`
    if (line.includes('getByText(')) {
        const byText = /getByText\(\s*(['"`/])((?:\\.|(?!\1).)*)\1/.exec(line)
        return byText ? `"${unescape(byText[2])}" metni` : 'metin'
    }
    if (line.includes('getByLabel(')) return `"${afterCall(line, 'getByLabel')}" etiketi`
    if (line.includes('getByPlaceholder(')) return `"${afterCall(line, 'getByPlaceholder')}" alanı`
    if (line.includes('locator(')) return `seçici ${afterCall(line, 'locator')}`
    return ''
}

const STEP_RULES = [
    [/\.goto\(/, (line) => `Adrese git: ${firstString(line) || '(değişken)'}`],
    [/addInitScript|localStorage\.setItem|setItem\(/, () => 'Ön koşul: tarayıcı durumunu hazırla'],
    [/stubPlausible|route\(|fulfill\(/, () => 'Ön koşul: ağ isteğini sahtele'],
    [/\.click\(/, (line) => `Tıkla: ${locatorSummary(line) || 'öğe'}`],
    [/\.fill\(/, (line) => `Alanı doldur: ${locatorSummary(line) || 'girdi'}`],
    [/\.press\(/, (line) => `Tuşa bas: ${firstString(line)}`],
    [/\.selectOption\(|\.check\(|\.setChecked\(/, (line) => `Seçim yap: ${locatorSummary(line) || 'öğe'}`],
    [/\.hover\(/, (line) => `Üzerine gel: ${locatorSummary(line) || 'öğe'}`],
    [/\.scrollIntoViewIfNeeded\(/, () => 'Görünür alana kaydır'],
    [/waitForSelector|waitForURL|waitForTimeout|waitForLoadState|waitForFunction/, () => 'Bekle (öğe/adres/süre)'],
    [/readShell\(|readFile\(/, (line) => `Üretilen dosyayı oku: ${firstString(line) || '(değişken)'}`],
    [/buildSectionSeoIndex|computeSectionCatalog|parseJsonLd/, () => 'Üretilen veriyi/şemayı çözümle'],
    [/\.reload\(/, () => 'Sayfayı yenile'],
    [/\.evaluate\(|\.\$eval\(/, () => 'Sayfa içinde kod çalıştır'],
    [/setTimeout\(|test\.slow\(/, () => 'Süre sınırını uzat'],
]

function classifyLine(raw) {
    const line = raw.trim()
    if (!line || line.startsWith('//') || line.startsWith('*') || line.startsWith('/*')) return null

    if (/\bexpect(?:\.soft|\.poll)?\s*\(/.test(line)) {
        return { kind: 'expect', label: describeExpectation(line), code: line }
    }
    for (const [pattern, toLabel] of STEP_RULES) {
        if (pattern.test(line)) return { kind: 'step', label: toLabel(line), code: line }
    }
    return null
}

function describeExpectation(line) {
    const target = locatorSummary(line)
    const subject = target ? `${target} — ` : ''
    const rules = [
        [/toBeVisible/, 'görünür olmalı'],
        [/not\.toBeVisible|toBeHidden/, 'görünmemeli'],
        [/toBeEnabled/, 'etkin (tıklanabilir) olmalı'],
        [/toBeDisabled/, 'devre dışı olmalı'],
        [/toHaveURL/, `adres ${firstString(line) || 'beklenen değere'} eşleşmeli`],
        [/toHaveTitle/, 'sayfa başlığı beklenen değeri taşımalı'],
        [/toHaveAttribute/, 'öznitelik beklenen değeri taşımalı'],
        [/toHaveText|toContainText/, `metin ${firstString(line) ? `"${firstString(line)}" ` : ''}içermeli`],
        [/not\.toContain/, 'beklenen metni İÇERMEMELİ'],
        [/toContain/, `${firstString(line) ? `"${firstString(line)}" ` : ''}içermeli`],
        [/toHaveCount/, 'öğe sayısı beklenen değere eşit olmalı'],
        [/toBeGreaterThan|toBeGreaterThanOrEqual/, 'değer eşiğin üstünde olmalı'],
        [/toBeLessThan|toBeLessThanOrEqual/, 'değer eşiğin altında olmalı'],
        [/toEqual\(\[\]\)/, 'hiç ihlal bulunmamalı (boş liste)'],
        [/toEqual|toStrictEqual/, 'beklenen değere eşit olmalı'],
        [/toBeTruthy/, 'var olmalı'],
        [/toBeFalsy/, 'olmamalı'],
        [/toBe\(true\)/, 'doğru olmalı'],
        [/toBe\(false\)/, 'yanlış olmalı'],
        [/toBe\(/, `${firstString(line) ? `"${firstString(line)}" ` : 'beklenen '}değerine eşit olmalı`],
        [/toMatch/, 'kalıba uymalı'],
    ]
    for (const [pattern, text] of rules) {
        if (pattern.test(line)) return `${subject}${text}`
    }
    return `${subject}doğrulama`
}

// ─────────────────────────────────────────────────────────────────────────────
// Spec dosyası ayrıştırma
// ─────────────────────────────────────────────────────────────────────────────
function parseSpec(fileName, text) {
    const describes = []
    const describeRe = /\btest\.describe(?:\.serial|\.parallel|\.configure)?\s*\(\s*(['"`])((?:\\.|(?!\1).)*)\1/g
    let match
    while ((match = describeRe.exec(text)) !== null) {
        const open = bodyStart(text, match.index)
        if (open === -1) continue
        describes.push({
            title: unescape(match[2]),
            note: leadingComment(text, match.index),
            start: match.index,
            end: matchBlock(text, open),
        })
    }

    const tests = []
    const testRe = /\btest(?!\.describe|\.beforeAll|\.beforeEach|\.afterAll|\.afterEach|\.setTimeout|\.slow|\.step|\.use)(?:\.skip|\.only|\.fixme)?\s*\(\s*(['"`])((?:\\.|(?!\1).)*)\1/g
    while ((match = testRe.exec(text)) !== null) {
        const open = bodyStart(text, match.index)
        if (open === -1) continue
        const end = matchBlock(text, open)
        const body = text.slice(open, end)

        const steps = []
        const expectations = []
        for (const line of body.split('\n')) {
            const item = classifyLine(line)
            if (!item) continue
            if (item.kind === 'expect') expectations.push(item)
            else steps.push(item)
        }

        // En içteki kapsayıcı describe = senaryonun ait olduğu grup.
        const parents = describes
            .filter((d) => d.start < match.index && d.end > match.index)
            .sort((a, b) => b.start - a.start)

        tests.push({
            file: fileName,
            title: unescape(match[2]),
            skipped: /test\.skip\s*\($/.test(text.slice(Math.max(0, match.index - 10), match.index + 10)),
            group: parents[0]?.title || '',
            groupNote: parents[0]?.note || '',
            note: leadingComment(text, match.index),
            steps,
            expectations,
            index: match.index,
        })
    }

    return { tests, describes }
}

// ─────────────────────────────────────────────────────────────────────────────
// Kapsam hesabı
// ─────────────────────────────────────────────────────────────────────────────
function routeMentioned(allText, path) {
    if (path === '/') return /goto\(\s*['"`]\/['"`]\s*\)/.test(allText)
    // Tam eşleşme: /java, /java-document'i yakalamamalı.
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(`['"\`]${escaped}(?:[/'"\`?#])`).test(allText)
}

// Her push/PR'de doğrulanması zorunlu olan davranışlar. Eşleştirme sözcük
// tabanlıdır — bu yüzden rapor yalnızca "var/yok" demez, EŞLEŞEN test adlarını
// da gösterir ki okuyan kişi kararı kendisi doğrulayabilsin.
const REQUIRED_CHECKS = [
    {
        id: 'buttons',
        title: 'Butonlar görünür ve tıklanabilir',
        detail: 'Ana sayfada ve ders sayfalarında butonlar engellenmemiş olmalı.',
        patterns: [/toBeEnabled/, /tıklanabilir/i, /clickable/i],
    },
    {
        id: 'gating-closed',
        title: 'Mülakat kilidi — quiz barajı geçilmeden sorular gizli',
        detail: 'Konu quizlerinin %60\'ı doğru cevaplanmadan mülakat soruları görünmemeli.',
        patterns: [/kilit/i, /gating/i, /locked/i],
    },
    {
        id: 'gating-open',
        title: 'Mülakat kilidi — baraj geçilince sorular görünür',
        detail: 'Quizlerin %60\'ı doğru cevaplanınca mülakat soruları açılmalı.',
        patterns: [/mülakat/i, /interview/i],
    },
    {
        id: 'answer-input',
        title: 'Mülakat sorusuna cevap yazma alanı',
        detail: 'Kullanıcı kendi cevabını yazabileceği bir alan bulmalı.',
        patterns: [/textarea/i, /cevab/i, /answer/i],
    },
    {
        id: 'ai-grading',
        title: 'Cevabın yapay zeka ile değerlendirilmesi',
        detail: 'Yazılan cevap değerlendirilip bir puan/sonuç dönmeli.',
        patterns: [/grade/i, /değerlendir/i, /puan/i, /mastery/i],
    },
    {
        id: 'finish-badge',
        title: 'Bitirme rozeti',
        detail: 'Mülakat sorularının %80\'ini doğru cevaplayan kullanıcı rozeti almalı.',
        patterns: [/rozet/i, /badge/i],
    },
]

// ─────────────────────────────────────────────────────────────────────────────
// HTML
// ─────────────────────────────────────────────────────────────────────────────
function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
}

function statCard(value, label, tone) {
    return `<div class="stat ${tone}"><div class="stat-value">${escapeHtml(value)}</div><div class="stat-label">${escapeHtml(label)}</div></div>`
}

function renderTest(test, order) {
    const steps = test.steps.length
        ? test.steps.map((step, i) => `<li><span class="n">${i + 1}</span><div><div class="lbl">${escapeHtml(step.label)}</div><code>${escapeHtml(step.code)}</code></div></li>`).join('')
        : '<li class="empty">Bu senaryo tarayıcı adımı içermiyor (üretilen dosyaları/veriyi doğrudan denetliyor).</li>'

    const expectations = test.expectations.length
        ? test.expectations.map((item) => `<li><span class="tick">✓</span><div><div class="lbl">${escapeHtml(item.label)}</div><code>${escapeHtml(item.code)}</code></div></li>`).join('')
        : '<li class="empty">Açık bir doğrulama satırı bulunamadı.</li>'

    return `<article class="case" data-search="${escapeHtml(`${test.title} ${test.group} ${test.file}`.toLowerCase())}">
      <header class="case-head">
        <span class="case-no">#${order}</span>
        <h3>${escapeHtml(test.title)}</h3>
      </header>
      ${test.note ? `<p class="why">${escapeHtml(test.note)}</p>` : ''}
      <div class="cols">
        <section class="col steps">
          <h4>Test adımları</h4>
          <ol>${steps}</ol>
        </section>
        <section class="col expects">
          <h4>Beklenen sonuç</h4>
          <ul>${expectations}</ul>
        </section>
      </div>
    </article>`
}

function renderSuite(file, tests) {
    const groups = new Map()
    for (const test of tests) {
        const key = test.group || '(gruplanmamış)'
        if (!groups.has(key)) groups.set(key, { note: test.groupNote, tests: [] })
        groups.get(key).tests.push(test)
    }

    const totalSteps = tests.reduce((sum, t) => sum + t.steps.length, 0)
    const totalExpects = tests.reduce((sum, t) => sum + t.expectations.length, 0)

    let order = 0
    const body = [...groups.entries()].map(([groupTitle, group]) => `
      <div class="group">
        <h3 class="group-title">${escapeHtml(groupTitle)}</h3>
        ${group.note ? `<p class="group-note">${escapeHtml(group.note)}</p>` : ''}
        ${group.tests.map((test) => renderTest(test, (order += 1))).join('')}
      </div>`).join('')

    return `<details class="suite" open>
      <summary>
        <span class="suite-name">${escapeHtml(file)}</span>
        <span class="pills">
          <span class="pill blue">${tests.length} senaryo</span>
          <span class="pill teal">${totalSteps} adım</span>
          <span class="pill green">${totalExpects} doğrulama</span>
        </span>
      </summary>
      ${body}
    </details>`
}

// ─────────────────────────────────────────────────────────────────────────────
// Çalıştır
// ─────────────────────────────────────────────────────────────────────────────
const files = (await readdir(testsDir)).filter((name) => name.endsWith('.spec.ts')).sort()
const suites = []
let allText = ''

for (const file of files) {
    const text = await readFile(join(testsDir, file), 'utf8')
    allText += `\n${text}`
    const { tests } = parseSpec(file, text)
    suites.push({ file, tests })
}

const totalTests = suites.reduce((sum, s) => sum + s.tests.length, 0)
const totalSteps = suites.reduce((sum, s) => sum + s.tests.reduce((n, t) => n + t.steps.length, 0), 0)
const totalExpects = suites.reduce((sum, s) => sum + s.tests.reduce((n, t) => n + t.expectations.length, 0), 0)

// Route kapsamı
const routes = ROUTE_SEO.filter((seo) => !seo.dynamic).map((seo) => seo.path)
const routeRows = routes.map((path) => ({
    path,
    excluded: EXCLUDED_ROUTES.has(path),
    covered: routeMentioned(allText, path),
}))
const inScope = routeRows.filter((row) => !row.excluded)
const coveredCount = inScope.filter((row) => row.covered).length
const coverageRatio = inScope.length ? Math.round((coveredCount / inScope.length) * 100) : 0

// Zorunlu kontrollerin izi
const requiredRows = REQUIRED_CHECKS.map((check) => {
    const matches = suites.flatMap((suite) => suite.tests
        .filter((test) => check.patterns.some((p) => p.test(`${test.title} ${test.group}`)))
        .map((test) => `${suite.file} › ${test.title}`))
    return { ...check, matches }
})

// Son koşum durumu (varsa)
let lastRun = null
try {
    await access(join(rootDir, 'test-results', '.last-run.json'))
    lastRun = JSON.parse(await readFile(join(rootDir, 'test-results', '.last-run.json'), 'utf8'))
} catch { /* koşum yapılmamış olabilir */ }

const now = new Date()
const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

const html = `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>LearnQA.dev — Test Senaryoları ve Kapsam Raporu</title>
<style>
  :root {
    --bg: #f6f7fb; --card: #ffffff; --ink: #1a1f36; --muted: #5b6478;
    --line: #e3e7f0; --blue: #2563eb; --teal: #0d9488; --green: #16a34a;
    --amber: #d97706; --red: #dc2626; --violet: #7c3aed; --code-bg: #f1f4fa;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #0f1320; --card: #171c2c; --ink: #e8ecf6; --muted: #98a2b8;
      --line: #262e44; --code-bg: #10151f;
    }
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink);
    font-family: 'Inter', -apple-system, Segoe UI, Roboto, sans-serif; line-height: 1.55; }
  .wrap { max-width: 1180px; margin: 0 auto; padding: 28px 18px 80px; }
  header.top { background: linear-gradient(135deg, #4f46e5, #0ea5e9 55%, #14b8a6);
    color: #fff; border-radius: 20px; padding: 28px 26px; margin-bottom: 22px; }
  header.top h1 { margin: 0 0 6px; font-size: 26px; }
  header.top p { margin: 0; opacity: .92; font-size: 14px; }
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px; margin: 20px 0 26px; }
  .stat { background: var(--card); border: 1px solid var(--line); border-radius: 14px;
    padding: 16px; border-left: 5px solid var(--blue); }
  .stat.teal { border-left-color: var(--teal); }
  .stat.green { border-left-color: var(--green); }
  .stat.violet { border-left-color: var(--violet); }
  .stat.amber { border-left-color: var(--amber); }
  .stat-value { font-size: 26px; font-weight: 800; letter-spacing: -.5px; }
  .stat-label { font-size: 12px; color: var(--muted); margin-top: 2px; }
  section.panel { background: var(--card); border: 1px solid var(--line);
    border-radius: 16px; padding: 20px; margin-bottom: 20px; }
  section.panel h2 { margin: 0 0 4px; font-size: 18px; }
  .sub { color: var(--muted); font-size: 13px; margin: 0 0 14px; }
  .bar { height: 12px; border-radius: 99px; background: var(--line); overflow: hidden; margin: 10px 0 16px; }
  .bar > i { display: block; height: 100%; background: linear-gradient(90deg, #16a34a, #22c55e); }
  .chips { display: flex; flex-wrap: wrap; gap: 7px; }
  .chip { font-size: 12px; padding: 4px 10px; border-radius: 99px; border: 1px solid transparent; font-weight: 600; }
  .chip.ok { background: rgba(22,163,74,.13); color: #16a34a; border-color: rgba(22,163,74,.3); }
  .chip.no { background: rgba(220,38,38,.13); color: #dc2626; border-color: rgba(220,38,38,.3); }
  .chip.skip { background: rgba(120,130,150,.16); color: var(--muted); border-color: var(--line); }
  table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  th, td { text-align: left; padding: 9px 10px; border-bottom: 1px solid var(--line); vertical-align: top; }
  th { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: .4px; }
  .badge { display: inline-block; padding: 2px 9px; border-radius: 99px; font-size: 11.5px; font-weight: 700; }
  .badge.ok { background: rgba(22,163,74,.15); color: #16a34a; }
  .badge.no { background: rgba(217,119,6,.16); color: var(--amber); }
  .search { width: 100%; padding: 12px 14px; border-radius: 12px; border: 1px solid var(--line);
    background: var(--card); color: var(--ink); font-size: 14px; margin-bottom: 16px; }
  details.suite { background: var(--card); border: 1px solid var(--line);
    border-radius: 16px; margin-bottom: 14px; overflow: hidden; }
  details.suite > summary { cursor: pointer; padding: 14px 18px; display: flex; gap: 12px;
    align-items: center; justify-content: space-between; flex-wrap: wrap;
    background: linear-gradient(90deg, rgba(79,70,229,.10), transparent); font-weight: 700; }
  .suite-name { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13.5px; }
  .pills { display: flex; gap: 6px; flex-wrap: wrap; }
  .pill { font-size: 11.5px; font-weight: 700; padding: 3px 9px; border-radius: 99px; }
  .pill.blue { background: rgba(37,99,235,.14); color: var(--blue); }
  .pill.teal { background: rgba(13,148,136,.14); color: var(--teal); }
  .pill.green { background: rgba(22,163,74,.14); color: var(--green); }
  .group { padding: 4px 18px 10px; }
  .group-title { font-size: 14.5px; margin: 14px 0 2px; color: var(--violet); }
  .group-note { font-size: 12.5px; color: var(--muted); margin: 0 0 10px; }
  article.case { border: 1px solid var(--line); border-radius: 13px; padding: 14px;
    margin-bottom: 12px; background: var(--bg); }
  .case-head { display: flex; gap: 9px; align-items: baseline; }
  .case-no { font-size: 11.5px; font-weight: 800; color: var(--muted); }
  .case-head h3 { margin: 0; font-size: 15px; }
  .why { font-size: 12.5px; color: var(--muted); margin: 7px 0 0;
    border-left: 3px solid var(--amber); padding-left: 10px; }
  .cols { display: grid; grid-template-columns: 1.15fr .85fr; gap: 14px; margin-top: 12px; }
  @media (max-width: 800px) { .cols { grid-template-columns: 1fr; } }
  .col h4 { margin: 0 0 8px; font-size: 12px; text-transform: uppercase;
    letter-spacing: .5px; color: var(--muted); }
  .col ol, .col ul { margin: 0; padding: 0; list-style: none; }
  .col li { display: flex; gap: 9px; padding: 6px 0; border-bottom: 1px dashed var(--line); }
  .col li:last-child { border-bottom: 0; }
  .col li.empty { color: var(--muted); font-size: 12.5px; font-style: italic; }
  .n { flex: 0 0 20px; height: 20px; border-radius: 50%; background: rgba(37,99,235,.15);
    color: var(--blue); font-size: 11px; font-weight: 800; display: grid; place-items: center; }
  .tick { flex: 0 0 20px; height: 20px; border-radius: 50%; background: rgba(22,163,74,.15);
    color: var(--green); font-size: 12px; font-weight: 800; display: grid; place-items: center; }
  .lbl { font-size: 13px; font-weight: 600; }
  code { display: block; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 11.5px; color: var(--muted); background: var(--code-bg); border-radius: 7px;
    padding: 5px 8px; margin-top: 4px; overflow-x: auto; white-space: pre; }
  .note { font-size: 12.5px; color: var(--muted); border-left: 3px solid var(--blue);
    padding-left: 11px; margin: 12px 0 0; }
</style>
</head>
<body>
<div class="wrap">
  <header class="top">
    <h1>🧪 Test Senaryoları ve Kapsam Raporu</h1>
    <p>LearnQA.dev — ${escapeHtml(stamp)} tarihinde <code style="display:inline;background:transparent;color:#fff;padding:0">tests/*.spec.ts</code> dosyalarından üretildi.</p>
    <p style="margin-top:8px;font-size:12.5px;opacity:.85">Sayılar kaynak koddaki <strong>test tanımlarını</strong> gösterir. Bir kısmı döngü içinde yazıldığı için (her sayfa/route için bir kez) koşumda üretilen test sayısı daha yüksektir.</p>
  </header>

  <div class="stats">
    ${statCard(String(files.length), 'test dosyası', 'violet')}
    ${statCard(String(totalTests), 'test tanımı (senaryo)', 'blue')}
    ${statCard(String(totalSteps), 'test adımı', 'teal')}
    ${statCard(String(totalExpects), 'doğrulama (beklenen sonuç)', 'green')}
    ${statCard(`%${coverageRatio}`, 'sayfa kapsamı', coverageRatio >= 80 ? 'green' : 'amber')}
  </div>

  <section class="panel">
    <h2>Sayfa kapsamı — %${coverageRatio}</h2>
    <p class="sub">${coveredCount} / ${inScope.length} sayfanın en az bir testte adı geçiyor.
    ${EXCLUDED_ROUTES.size} sayfa bilerek kapsam dışında (korumalı sayfalar ve kullanıcı isteğiyle hariç tutulan sayfa) — bunlar paydaya dahil edilmedi.</p>
    <div class="bar"><i style="width:${coverageRatio}%"></i></div>
    <div class="chips">
      ${routeRows.map((row) => `<span class="chip ${row.excluded ? 'skip' : row.covered ? 'ok' : 'no'}">${escapeHtml(row.path)}</span>`).join('')}
    </div>
    ${inScope.filter((row) => !row.covered).length ? `<p class="note" style="border-left-color:var(--red)"><strong>Hiçbir testte adı geçmeyen sayfalar:</strong>
      ${inScope.filter((row) => !row.covered).map((row) => escapeHtml(row.path)).join(', ')}.
      Bunlar üyelik/oturum gerektiren sayfalar olabilir — kapsam boşluğu mu bilinçli tercih mi, karar senin.</p>` : ''}
    <p class="note"><strong>Bu oran satır bazlı kod kapsamı değildir.</strong> Projede birim test altyapısı yok; ölçülen şey
    "hangi sayfa için uçtan uca test var" kapsamıdır. Bir sayfanın yeşil olması o sayfanın her davranışının test edildiği anlamına gelmez —
    yalnızca en az bir senaryonun o adrese girdiğini gösterir.</p>
  </section>

  <section class="panel">
    <h2>Her yayında doğrulanması zorunlu davranışlar</h2>
    <p class="sub">Eşleştirme test adları üzerinden sözcük tabanlı yapılır; bu yüzden yalnızca "var/yok" denmiyor, eşleşen senaryolar da listeleniyor — kararı gözle doğrulayabilirsin.</p>
    <table>
      <thead><tr><th>Kontrol</th><th>Durum</th><th>Eşleşen senaryolar</th></tr></thead>
      <tbody>
        ${requiredRows.map((row) => `<tr>
          <td><strong>${escapeHtml(row.title)}</strong><br /><span style="color:var(--muted);font-size:12.5px">${escapeHtml(row.detail)}</span></td>
          <td><span class="badge ${row.matches.length ? 'ok' : 'no'}">${row.matches.length ? `${row.matches.length} test` : 'eşleşme yok'}</span></td>
          <td style="font-size:12.5px;color:var(--muted)">${row.matches.slice(0, 3).map((m) => escapeHtml(m)).join('<br />') || '—'}${row.matches.length > 3 ? `<br />… +${row.matches.length - 3}` : ''}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </section>

  ${lastRun ? `<section class="panel">
    <h2>Son koşum</h2>
    <p class="sub">Playwright'ın son çalıştırma kaydı (<code style="display:inline;background:transparent;padding:0">test-results/.last-run.json</code>).</p>
    <p><span class="badge ${lastRun.status === 'passed' ? 'ok' : 'no'}">${escapeHtml(lastRun.status || 'bilinmiyor')}</span>
    ${lastRun.failedTests?.length ? ` — ${lastRun.failedTests.length} başarısız test` : ''}</p>
  </section>` : ''}

  <section class="panel">
    <h2>Senaryo listesi</h2>
    <p class="sub">Her senaryonun adımları ve beklenen sonucu, test dosyasının kendisinden çıkarıldı. Testler değiştiğinde bu rapor da değişir.</p>
    <input class="search" id="q" type="search" placeholder="Senaryo, grup veya dosya adında ara…" />
  </section>

  ${suites.filter((s) => s.tests.length).map((s) => renderSuite(s.file, s.tests)).join('')}
</div>

<script>
  const input = document.getElementById('q')
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase()
    for (const suite of document.querySelectorAll('details.suite')) {
      let visible = 0
      for (const item of suite.querySelectorAll('article.case')) {
        const hit = !q || item.dataset.search.includes(q)
        item.style.display = hit ? '' : 'none'
        if (hit) visible += 1
      }
      suite.style.display = visible ? '' : 'none'
      if (q) suite.open = true
    }
  })
</script>
</body>
</html>
`

const reportDir = join(rootDir, 'reports')
await mkdir(reportDir, { recursive: true })
const outPath = join(reportDir, 'test-report.html')
await writeFile(outPath, html)

console.log(`Test raporu üretildi: reports/test-report.html`)
console.log(`  ${files.length} dosya · ${totalTests} senaryo · ${totalSteps} adım · ${totalExpects} doğrulama`)
console.log(`  Sayfa kapsamı: ${coveredCount}/${inScope.length} (%${coverageRatio}), ${EXCLUDED_ROUTES.size} sayfa bilerek kapsam dışı`)
const uncovered = inScope.filter((row) => !row.covered).map((row) => row.path)
if (uncovered.length) console.log(`  Testi olmayan sayfalar: ${uncovered.join(', ')}`)
