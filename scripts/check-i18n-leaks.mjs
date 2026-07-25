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
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DATA_DIR = join(ROOT, 'src', 'data')
const BASELINE_PATH = join(__dirname, 'i18n-leaks-baseline.json')

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
])

const ANIM = new Set(['step-animation', 'simulation', 'animated-timeline', 'css-animation'])
const SANDBOX = new Set(['code-playground', 'git-practice', 'editor', 'java-practice'])

// §9.5 trio bütünlüğü ZORUNLU sayfalar (tamamlanmış olduğu doğrulanmış)
const TRIO_COMPLETE_PAGES = new Set(['apiTestingData.js'])
// Bu dosyalar baseline'da 0 kabul edilir (yeni/temiz) — herhangi bir sızıntı FAIL
// qaFrontendData.js: yeni sayfa, EN alanlarında Türkçe sızıntısı olmamalı.
// TRIO_COMPLETE_PAGES'e sayfa Sonnet fazında tamamlanınca eklenir (plan §D-S11).
const STRICT_ZERO_FILES = new Set(['apiTestingData.js', 'qaFrontendData.js'])

function findLeaks(node, path, parentKey, inTrEn, blockType, out) {
  if (typeof node === 'string') {
    if (parentKey === 'tr') return
    if (SAFE_KEYS.has(parentKey)) return
    // {tr,en} objesinin en tarafı YA DA düz string (her iki dilde görünür)
    const isEnField = parentKey === 'en'
    if ((isEnField || !inTrEn) && TR_CHARS.test(node)) {
      out.push({ path, blockType, snippet: node.replace(/\s+/g, ' ').slice(0, 70) })
    }
    return
  }
  if (Array.isArray(node)) {
    node.forEach((v, i) => findLeaks(v, `${path}[${i}]`, parentKey, inTrEn, blockType, out))
    return
  }
  if (node && typeof node === 'object') {
    const isTrEn = ('tr' in node && 'en' in node)
    const bt = node.type || blockType
    for (const [k, v] of Object.entries(node)) {
      findLeaks(v, `${path}.${k}`, k, inTrEn || isTrEn, bt, out)
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

async function main() {
  const updateBaseline = process.argv.includes('--update-baseline')
  const files = readdirSync(DATA_DIR).filter(f => f.endsWith('Data.js')).sort()

  const counts = {}
  const leaksByFile = {}
  const trioGapsByFile = {}

  for (const f of files) {
    let mod
    try { mod = await import(join(DATA_DIR, f) + '?t=' + Date.now()) }
    catch { continue }
    const exportKey = Object.keys(mod).find(k => k.endsWith('Data'))
    const data = exportKey ? mod[exportKey] : null
    if (!data) continue

    const out = []
    try { findLeaks(data.tr?.sections ?? data, 'sections', null, false, null, out) } catch { /* ignore */ }
    counts[f] = out.length
    leaksByFile[f] = out

    if (TRIO_COMPLETE_PAGES.has(f)) {
      try { trioGapsByFile[f] = findTrioGaps(data) } catch { trioGapsByFile[f] = [] }
    }
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
