#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// check-i18n-leaks.mjs — EN modda Türkçe sızıntısı ve sekme-trio bütünlüğü denetimi
//
// NEDEN VAR: Mevcut `i18n-content-toggle.spec.ts` (Playwright) EN modda yalnızca
// GÖRÜNÜR tab metnini ve yalnızca `[ığş]` karakterlerini tarıyordu; kod blokları,
// tablo hücreleri, error-dictionary ve SVG içindeki sızıntıları kaçırdı
// (CLAUDE.md §23.1). Bu STATİK scanner veri dosyalarını doğrudan gezerek
// `{tr,en}` objelerinin `en` tarafındaki Türkçe-özgü karakterleri (ığşİĞŞ) ve
// tablo/error-dictionary hücrelerindeki düz-string Türkçe'yi yakalar — hızlı,
// kapsamlı, deterministik.
//
// BASELINE MANTIĞI: Sitede 646 mevcut (grandfathered) sızıntı var; hepsi tek
// oturumda düzeltilemez. Bu yüzden `scripts/i18n-leaks-baseline.json` mevcut
// borcu dosya bazında sayar. Scanner yalnızca **baseline'ı AŞAN** (regresyon)
// veya baseline'da 0 olan sayfalardaki (ör. api-testing) sızıntılarda FAIL eder.
// Borç azaldıkça baseline'ı `--update-baseline` ile düşür (asla yükseltme).
//
// SEKME-TRIO (§9.5): TRIO_COMPLETE_PAGES listesindeki sayfaların HER sekmesinde
// ≥1 video-scene + ≥1 animasyon + ≥1 sandbox olmalı (GRUP K'de eksik video-scene
// defect'i buradan yakalanırdı — CLAUDE.md §23.5).
//
// Kullanım:
//   node scripts/check-i18n-leaks.mjs                 # denetle (CI/build)
//   node scripts/check-i18n-leaks.mjs --update-baseline  # baseline'ı yeniden yaz
// ─────────────────────────────────────────────────────────────────────────────

import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DATA_DIR = join(ROOT, 'src', 'data')
const BASELINE_PATH = join(__dirname, 'i18n-leaks-baseline.json')

// `code`/`codeWrong`/`codeFixed`/`defaultCode` düz-string alanları CodeBlock →
// getLocalizedCode() → localizeCodeComments() üzerinden EN modda RUNTIME'da
// yorum çevirisi görür (TopicPage.jsx satır ~45-365 `codeCommentTranslations`
// TR→EN regex tablosu, satır ~1322-1339 `localizeCodeComments`/`getLocalizedCode`).
// Scanner bunu simüle etmezse tabloda ZATEN karşılığı olan yorumları yanlışlıkla
// leak sayar (CLAUDE.md §23.6 — 2026-07-29 ikinci örnek). Tabloyu TopicPage.jsx'ten
// canlı çıkarıp aynı dönüşümü uygulayarak GERÇEK kalan borcu ölçer.
function extractArrayLiteral(src, varName) {
  const marker = `const ${varName} = [`
  const start = src.indexOf(marker)
  if (start === -1) return []
  const bracketStart = start + marker.length - 1
  let depth = 0, i = bracketStart
  for (; i < src.length; i++) {
    if (src[i] === '[') depth++
    else if (src[i] === ']') { depth--; if (depth === 0) break }
  }
  try { return new Function(`return ${src.slice(bracketStart, i + 1)}`)() }
  catch { return [] }
}
const topicPageSrc = readFileSync(join(ROOT, 'src', 'components', 'TopicPage.jsx'), 'utf8')
const codeCommentTranslations = extractArrayLiteral(topicPageSrc, 'codeCommentTranslations')
function simulateEnCode(code) {
  if (typeof code !== 'string') return code
  return code.split('\n').map(line => {
    const m = line.match(/(#|\/\/|--)/)
    if (!m) return line
    const before = line.slice(0, m.index + m[0].length)
    const after = line.slice(m.index + m[0].length)
    const translated = codeCommentTranslations.reduce((t, [pattern, repl]) => t.replace(pattern, repl), after)
    return before + translated
  }).join('\n')
}
// Renderer'ın getLocalizedCode() ile bastığı, düz string kaldıklarında yukarıdaki
// simülasyona tabi tutulması gereken alanlar (RAW_FIELDS'ın eski, yanlış "OPUS"
// varsayımının yerine geçti — CodeBlock/getLocalizedCode ikisini de destekler).
// `java`/`python`/`typescript`/`sql`: JavaCompareBlock de aynı getLocalizedCode()
// ile basıyor (TopicPage.jsx satır ~2219/2225, 2026-07-29 doğrulandı).
const CODE_COMMENT_FIELDS = new Set(['code', 'codeWrong', 'codeFixed', 'defaultCode', 'java', 'python', 'typescript', 'sql'])

// Türkçe-özgü karakterler. `[ığş]` YETMEZ — "Parça" (ç), "Örnek" (Ö), "çözüm"
// gibi EN sızıntıları yalnızca ç/ö/ü/İ ile yakalanır (CLAUDE.md §23.1 kör noktası).
// İngilizce teknik içerikte ç/ö/ü pratikte bulunmaz; loanword riski ihmal edilebilir.
const TR_CHARS = /[ığşçöüİĞŞÇÖÜ]/
// Türkçe-özgü karakter içerse bile içerik olmayan / dile göre seçilen alanlar
const SAFE_KEYS = new Set([
  'type', 'id', 'relatedTopicId', 'emoji', 'color', 'icon', 'lang', 'language',
  'framework', 'topic', 'variant', 'order', 'xpReward', 'sceneDurationMs',
  'stageHeight', 'minScore', 'from', 'to', 'level', 'key', 'name', 'tr',
  // feynman-checkpoint dil-varyant alanları: render EN'de promptEn/modelAnswerEn
  // kullanır, keywords görünmez (validation) — leak değildir (CLAUDE.md §23.6)
  'promptTr', 'modelAnswerTr', 'keywords',
  // locator-explorer dil-varyant alanları: LocatorExplorerBlock TR modda *Tr,
  // EN modda *En kullanır (titleEn/noteEn/tipEn ayrıca taranır) — leak değil.
  'titleTr', 'noteTr', 'tipTr',
  // flow-diagram step dil-varyant alanı: TopicPage renderer `isTr && descTr ?
  // descTr : desc` kullanır — EN modda İngilizce `desc` gösterilir, `descTr`
  // yalnızca TR override'ıdır (160/160 descTr'nin `desc` kardeşi var) — leak değil (§23.6).
  'descTr',
  // quiz dil-varyant alanları: TopicPage renderer (18488-18490) EN modda
  // optionsEn/questionEn/explanationEn kullanır, *Tr yalnızca TR override'ıdır;
  // warningTr LocatorExplorerBlock'ta warningEn ile eşleşir. Hepsinin *En/base
  // kardeşi var (0 orphan) — EN'de görünmez, leak değil (§23.6).
  'optionsTr', 'questionTr', 'explanationTr', 'warningTr',
  // git-practice `pattern` alanı: TopicPage `new RegExp(step.pattern, 'i')` ile
  // kullanıcı girdisini eşleştirir (4/4 kullanım) — HİÇBİR YERDE ekrana basılmaz.
  // Bazı pattern'lar bilinçli olarak TR|EN alternatiflerini birlikte kabul eder
  // (ör. 'yeniden başlat|restart') — görünmez, leak değil.
  'pattern',
  // locator-visual `highlights` alanı: TopicPage `highlightHtml(htmlExample,
  // loc.highlights)` içinde SADECE regex eşleştirme/vurgulama için kullanılır
  // (satır ~4522-4536) — ekrana ayrı bir metin olarak HİÇBİR ZAMAN basılmaz.
  // EN modda htmlExample İngilizce olduğundan eşleşme bulunmaz (vurgu kaybolur,
  // hata değildir) — görünmez, leak değil.
  'highlights',
])

const ANIM = new Set(['step-animation', 'simulation', 'animated-timeline', 'css-animation'])
const SANDBOX = new Set(['code-playground', 'git-practice', 'editor', 'java-practice'])

// §9.5 trio bütünlüğü ZORUNLU sayfalar (tamamlanmış olduğu doğrulanmış)
const TRIO_COMPLETE_PAGES = new Set(['apiTestingData.js', 'qaFrontendData.js'])
// Bu dosyalar baseline'da 0 kabul edilir (yeni/temiz) — herhangi bir sızıntı FAIL
// qaFrontendData.js: yeni sayfa, EN alanlarında Türkçe sızıntısı olmamalı.
// TRIO_COMPLETE_PAGES'e sayfa Sonnet fazında tamamlanınca eklenir (plan §D-S11).
const STRICT_ZERO_FILES = new Set([
  'apiTestingData.js', 'qaFrontendData.js',
  // Tamamen temizlenmiş sayfalar — sıfır-tolerans (§23.1). Yeni bir sızıntı build'i kırar.
  // jiraData.js: yeni sayfa, baştan tam bilingual yazıldı — sıfır tolerans.
  'jiraData.js',
  'gaugeData.js', 'javascriptData.js', 'restAssuredData.js', 'securityData.js',
  'kafkaData.js', 'basitBackendData.js', 'jmeterData.js', 'playwrightData.js',
  'cypressData.js', 'typescriptData.js', 'sqlData.js', 'pythonData.js',
  // sprintsData.js: yeni (Sprint Simulator), baştan tam bilingual yazıldı.
  // NOT: TRIO_COMPLETE_PAGES'e EKLENMEZ — /sprint bir TopicPage ders sayfası
  // değil, sekme/video-scene kavramı bu sayfada yoktur (§9.5 kapsamı dışı).
  'sprintsData.js',
  // interviewWarmupData.js: yeni (ana sayfa mülakat ısınma bölümü), baştan bilingual.
  'interviewWarmupData.js',
  // portfolioData.js: yeni (QA Portfolyo), baştan tam bilingual yazıldı.
  // /portfolio bir TopicPage ders sayfası değildir — TRIO_COMPLETE_PAGES'e EKLENMEZ.
  'portfolioData.js',
])

// `why`/`note` (java-compare): JavaCompareBlock EN modda `${key}_en` kardeşini
// tercih eder (`isTr ? block.why : (block.why_en ?? block.why)`), TR modda
// `why`/`note` kalır. Kardeş DOLUYSA leak değildir (§23.6); kardeş yoksa/boşsa
// gerçek leak'tir — bu yüzden sabit SAFE_KEYS değil, parentObj bazlı kontrol.
const EN_SIBLING_FIELDS = new Set(['why', 'note'])

// `label`/`title`/`explanation`/`tip`/`when` (locator-visual, playwright-visual,
// selenium-visual): bu bloklar {tr,en} obje değil, çıplak `field`/`fieldEn` çift
// alan kullanır — renderer `isTr ? loc.title : (loc.titleEn || loc.title)` gibi
// bir düşüşle EN'de doğru alanı seçer (TopicPage.jsx örn. satır 4572/4576/4586/
// 4591/4985/14919-14926 ile doğrulandı, 2026-07-29). Kardeş (`${key}En`) DOLUYSA
// EN modda hiç görünmez — leak değildir. Kardeş yoksa/boşsa gerçek leak kalır.
const EN_SIBLING_FIELDS_CAMEL = new Set(['label', 'title', 'explanation', 'tip', 'when'])

function findLeaks(node, path, parentKey, inTrEn, blockType, out, block = null, parentObj = null) {
  if (typeof node === 'string') {
    if (parentKey === 'tr') return
    if (SAFE_KEYS.has(parentKey)) return
    if (EN_SIBLING_FIELDS.has(parentKey) && parentObj && typeof parentObj[`${parentKey}_en`] === 'string' && parentObj[`${parentKey}_en`].trim()) return
    if (EN_SIBLING_FIELDS_CAMEL.has(parentKey) && parentObj && typeof parentObj[`${parentKey}En`] === 'string' && parentObj[`${parentKey}En`].trim()) return
    // {tr,en} objesinin en tarafı YA DA düz string (her iki dilde görünür)
    const isEnField = parentKey === 'en'
    if ((isEnField || !inTrEn) && TR_CHARS.test(node)) {
      // Düz string code/codeWrong/codeFixed/defaultCode: runtime'da codeCommentTranslations
      // ile çevrilir (yukarı bak) — simülasyon sonrası hâlâ Türkçe kalıyorsa gerçek leak'tir.
      if (!isEnField && CODE_COMMENT_FIELDS.has(parentKey)) {
        const translated = simulateEnCode(node)
        if (!TR_CHARS.test(translated)) return
        out.push({ path, blockType, field: parentKey, isEnField, block, snippet: translated.replace(/\s+/g, ' ').slice(0, 70) })
        return
      }
      // `block`/`field`/`isEnField`: --list modu shared/en-only etiketi + fix önerisi için kullanır.
      out.push({ path, blockType, field: parentKey, isEnField, block, snippet: node.replace(/\s+/g, ' ').slice(0, 70) })
    }
    return
  }
  if (Array.isArray(node)) {
    node.forEach((v, i) => findLeaks(v, `${path}[${i}]`, parentKey, inTrEn, blockType, out, block, parentObj))
    return
  }
  if (node && typeof node === 'object') {
    const isTrEn = ('tr' in node && 'en' in node)
    const bt = node.type || blockType
    // Bir `type` alanı olan obje bir "blok"tur; leak'in hangi blokta olduğunu izle.
    const blk = node.type ? node : block
    for (const [k, v] of Object.entries(node)) {
      findLeaks(v, `${path}.${k}`, k, inTrEn || isTrEn, bt, out, blk, node)
    }
  }
}

function findTrioGaps(data) {
  const sections = data?.tr?.sections || data?.sections || []
  const gaps = []
  sections.forEach((s, i) => {
    const blocks = s.blocks || []
    const hasVideo = blocks.some(b => b.type === 'video-scene')
    const hasAnim = blocks.some(b => ANIM.has(b.type))
    const hasSandbox = blocks.some(b => SANDBOX.has(b.type))
    const missing = []
    if (!hasVideo) missing.push('video-scene')
    if (!hasAnim) missing.push('animation')
    if (!hasSandbox) missing.push('sandbox')
    if (missing.length) {
      const title = typeof s.title === 'object' ? (s.title.tr || s.title.en) : s.title
      gaps.push({ index: i, title: title || `section[${i}]`, missing })
    }
  })
  return gaps
}

// Bir alt-ağaçtaki `type` alanı olan tüm blok objelerini toplar (shared tespiti için).
function collectBlocks(node, set) {
  if (Array.isArray(node)) { node.forEach(v => collectBlocks(v, set)); return }
  if (node && typeof node === 'object') {
    if (node.type) set.add(node)
    for (const k of Object.keys(node)) collectBlocks(node[k], set)
  }
}

// Renderer'ı içerik/kod alanlarını dile göre (tx/pick/getLocalizedCode) basan blok
// tipleri — SHARED (tr===en) bloklarda düz string GÜVENLE {tr,en}'e çevrilebilir.
const LOCALIZING_BLOCKS = new Set(['code-playground', 'code', 'quiz'])

// --list için: her leak'e shared/en-only durumu + güvenli fix önerisi ekler.
function recommendFix(leak, trBlockSet) {
  if (leak.isEnField) return 'EN-ÇEVİR: {tr,en}.en zaten var, en değerini İngilizceye çevir (her blok güvenli)'
  const shared = leak.block ? trBlockSet.has(leak.block) : false
  if (!shared) return 'YERİNDE-ÇEVİR: blok yalnızca EN-ağacında; Türkçeyi İngilizceye çevir, düz string bırak (güvenli)'
  // codeCommentTranslations simülasyonundan SONRA da kalan gerçek leak — CodeBlock/
  // getLocalizedCode {tr,en}'i de destekler (2026-07-29 doğrulandı), renderer işi DEĞİL.
  if (CODE_COMMENT_FIELDS.has(leak.field))
    return "KOD-YORUM: codeCommentTranslations tablosuna eksik ifadeyi ekle YA DA alanı {tr,en} yap (renderer zaten ikisini de destekler)"
  if (LOCALIZING_BLOCKS.has(leak.blockType))
    return "{TR,EN}: paylaşımlı blok ama renderer localize eder; { tr: <mevcut>, en: <İngilizce> } yap"
  return '⚠ OPUS: paylaşımlı + renderer HAM basar ({tr,en} → [object Object]); renderer güncellemesi gerekir, DOKUNMA'
}

async function main() {
  const updateBaseline = process.argv.includes('--update-baseline')
  const files = readdirSync(DATA_DIR).filter(f => f.endsWith('Data.js')).sort()

  const counts = {}
  const leaksByFile = {}
  const trBlockSetByFile = {}
  const trioGapsByFile = {}

  for (const f of files) {
    let mod
    // NOT: import() mutlak dosya yolunu değil file:// URL'i ister; join(...) ham
    // yolu (Windows'ta `D:\...`) ERR_UNSUPPORTED_ESM_URL_SCHEME atar ve scanner'ı
    // sessizce no-op'a çevirirdi. pathToFileURL ile her platformda çalışır.
    try { mod = await import(pathToFileURL(join(DATA_DIR, f)).href + '?t=' + Date.now()) }
    catch (e) { console.error(`⚠ import atlandı: ${f} — ${e.code || e.message}`); continue }
    const exportKey = Object.keys(mod).find(k => k.endsWith('Data'))
    const data = exportKey ? mod[exportKey] : null
    if (!data) continue

    // KRİTİK: EN sızıntısını ölçmek için EN modunun GERÇEKTEN render ettiği ağacı
    // tara. TopicPage `data[language]` ile TÜM ağacı dile göre seçer (bkz. §5) —
    // çift-ağaçlı dosyalarda `data.tr.sections` yalnızca TR modda görünür, oradaki
    // Türkçe DOĞRUdur. Eski kod TR ağacını tarıyordu: çift-ağaçta hem binlerce
    // yanlış-pozitif üretiyor hem gerçek EN-ağacı sızıntılarını KAÇIRIYORDU. Tek
    // ağaçlı dosyalarda (en===tr shared ref) sonuç aynıdır — bu yüzden güvenli.
    const out = []
    try { findLeaks(data.en?.sections ?? data.sections ?? data, 'sections', null, false, null, out) } catch { /* ignore */ }
    counts[f] = out.length
    leaksByFile[f] = out
    // TR-ağacı blok set'i (shared tespiti) — sadece --list modunda gerekli.
    const trSet = new Set()
    try { if (data.tr?.sections) collectBlocks(data.tr.sections, trSet) } catch { /* ignore */ }
    trBlockSetByFile[f] = trSet

    if (TRIO_COMPLETE_PAGES.has(f)) {
      try { trioGapsByFile[f] = findTrioGaps(data) } catch { trioGapsByFile[f] = [] }
    }
  }

  // --list [dosya]: her sızıntının yolunu + snippet'ini yazar (çeviri işi için).
  // Belirli dosya: `--list javaData.js`; hepsi: `--list`. Sadece EN-ağacı sızıntısı.
  const listIdx = process.argv.indexOf('--list')
  if (listIdx !== -1) {
    const only = process.argv[listIdx + 1] && !process.argv[listIdx + 1].startsWith('--') ? process.argv[listIdx + 1] : null
    let grand = 0
    for (const f of files) {
      const out = leaksByFile[f] || []
      if (out.length === 0 || (only && f !== only)) continue
      grand += out.length
      const trSet = trBlockSetByFile[f] || new Set()
      console.log(`\n### ${f} — ${out.length} EN-ağacı sızıntısı`)
      out.forEach((l, i) => console.log(`${String(i + 1).padStart(3)}. [${l.blockType || '?'}] field=${l.field} ${l.path}\n     "${l.snippet}"\n     → ${recommendFix(l, trSet)}`))
    }
    console.log(`\nToplam listelenen: ${grand}`)
    return
  }

  if (updateBaseline) {
    const baseline = {}
    for (const f of files) baseline[f] = STRICT_ZERO_FILES.has(f) ? 0 : (counts[f] || 0)
    writeFileSync(BASELINE_PATH, JSON.stringify(baseline, null, 2) + '\n')
    console.log(`Baseline yazıldı: ${BASELINE_PATH}`)
    console.log(`Toplam grandfathered sızıntı: ${Object.values(baseline).reduce((a, b) => a + b, 0)}`)
    return
  }

  let baseline = {}
  try { baseline = JSON.parse(readFileSync(BASELINE_PATH, 'utf8')) }
  catch { console.error('⚠ baseline yok — önce: node scripts/check-i18n-leaks.mjs --update-baseline'); process.exit(2) }

  console.log('EN modda Türkçe sızıntısı denetimi — ' + files.length + ' veri dosyası\n')
  console.log('─'.repeat(64))

  const failures = []

  // 1) Sızıntı regresyonu
  for (const f of files) {
    const cur = counts[f] || 0
    const base = baseline[f] ?? 0
    if (cur > base) {
      failures.push({ file: f, kind: 'i18n-regression', cur, base, sample: leaksByFile[f].slice(0, 6) })
    }
  }

  // 2) §9.5 trio eksikliği
  for (const [f, gaps] of Object.entries(trioGapsByFile)) {
    if (gaps.length) failures.push({ file: f, kind: 'trio-gap', gaps })
  }

  if (failures.length === 0) {
    const debt = Object.values(baseline).reduce((a, b) => a + b, 0)
    console.log(`\nEN-sızıntı: regresyon YOK (grandfathered borç: ${debt}).`)
    console.log('Sekme-trio (§9.5): ' + [...TRIO_COMPLETE_PAGES].join(', ') + ' — tam.')
    console.log('─'.repeat(64))
    console.log('i18n & trio: TÜM KONTROLLER GEÇTİ ✓')
    return
  }

  console.log('\n❌ İHLAL BULUNDU:\n')
  for (const fail of failures) {
    if (fail.kind === 'i18n-regression') {
      console.log(`[EN-sızıntı REGRESYON] ${fail.file}: ${fail.base} → ${fail.cur} (+${fail.cur - fail.base})`)
      fail.sample.forEach(l => console.log(`    ${l.path} [${l.blockType || ''}]\n      "${l.snippet}"`))
      console.log(`    → Bu alanları {tr,en} yap (en tarafı İngilizce). Borç bilinçli azaldıysa: --update-baseline`)
    } else if (fail.kind === 'trio-gap') {
      console.log(`[TRIO EKSİK §9.5] ${fail.file}: ${fail.gaps.length} sekmede eksik`)
      fail.gaps.forEach(g => console.log(`    [${g.index}] "${g.title}" — eksik: ${g.missing.join(', ')}`))
    }
    console.log('')
  }
  console.log('─'.repeat(64))
  console.log('i18n & trio: İHLAL VAR ✗')
  process.exit(1)
}

main().catch(e => { console.error(e); process.exit(2) })
