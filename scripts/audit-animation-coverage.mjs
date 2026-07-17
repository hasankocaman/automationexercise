#!/usr/bin/env node
/**
 * audit-animation-coverage.mjs
 *
 * CLAUDE.md §9.1 "her atomik kod bloğunun ardına animasyon" hedefinin
 * denetleyicisi. `audit-interactive.mjs` sekme başına ≥1 kontrolü yapar;
 * bu script ise KOD BLOĞU BAŞINA animasyon kapsamını ölçer:
 *
 *   sekme açığı (deficit) = max(0, codeBlocks - animationBlocks)
 *
 * Animasyon tanımı CLAUDE.md §9.5 ile birebir aynıdır:
 *   step-animation | simulation | animated-timeline | css-animation
 *
 * Usage:
 *   node scripts/audit-animation-coverage.mjs               # tüm sayfalar
 *   node scripts/audit-animation-coverage.mjs python git    # seçili sayfalar
 *   node scripts/audit-animation-coverage.mjs --missing     # sadece açık olan sekmeler
 *   node scripts/audit-animation-coverage.mjs --json        # makine-okur çıktı (dalga planlama için)
 *   node scripts/audit-animation-coverage.mjs --fail-on-missing  # CI gate: açık varsa exit 1
 *
 * Exit code: 0 (bilgilendirme amaçlı; --fail-on-missing ile 1 dönebilir).
 */

import { pathToFileURL, fileURLToPath } from 'url'
import { resolve, dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = resolve(__dirname, '..')

// ─── Config ─────────────────────────────────────────────────────────────────

const ANIMATION_TYPES = new Set([
  'step-animation',
  'simulation',
  'animated-timeline',
  'css-animation',
])

const PAGES = [
  { key: 'python',       file: 'src/data/pythonData.js',       export: 'pythonData' },
  { key: 'typescript',   file: 'src/data/typescriptData.js',   export: 'typescriptData' },
  { key: 'javascript',   file: 'src/data/javascriptData.js',   export: 'javascriptData' },
  { key: 'java',         file: 'src/data/javaData.js',         export: 'javaData' },
  { key: 'postman',      file: 'src/data/postmanData.js',      export: 'postmanData' },
  { key: 'restassured',  file: 'src/data/restAssuredData.js',  export: 'restAssuredData' },
  { key: 'docker',       file: 'src/data/dockerData.js',       export: 'dockerData' },
  { key: 'jenkins',      file: 'src/data/jenkinsData.js',      export: 'jenkinsData' },
  { key: 'kubernetes',   file: 'src/data/kubernetesData.js',   export: 'kubernetesData' },
  { key: 'selenium',     file: 'src/data/seleniumData.js',     export: 'seleniumData' },
  { key: 'playwright',   file: 'src/data/playwrightData.js',   export: 'playwrightData' },
  { key: 'cypress',      file: 'src/data/cypressData.js',      export: 'cypressData' },
  { key: 'sql',          file: 'src/data/sqlData.js',          export: 'sqlData' },
  { key: 'git',          file: 'src/data/gitGithubData.js',    export: 'gitGithubData' },
  { key: 'linux',        file: 'src/data/linuxData.js',        export: 'linuxData' },
  { key: 'jmeter',       file: 'src/data/jmeterData.js',       export: 'jmeterData' },
  { key: 'appium',       file: 'src/data/appiumData.js',       export: 'appiumData' },
  { key: 'kafka',        file: 'src/data/kafkaData.js',        export: 'kafkaData' },
  { key: 'aws',          file: 'src/data/awsData.js',          export: 'awsData' },
  { key: 'azure',        file: 'src/data/azureData.js',        export: 'azureData' },
  { key: 'bruno',        file: 'src/data/brunoData.js',        export: 'brunoData' },
  { key: 'browserstack', file: 'src/data/browserstackData.js', export: 'browserstackData' },
  { key: 'what-is-testing', file: 'src/data/whatIsTestingData.js', export: 'whatIsTestingData' },
  { key: 'llm-agents',   file: 'src/data/llmAgentsData.js',    export: 'llmAgentsData' },
  { key: 'claude-ai',    file: 'src/data/claudeAiData.js',     export: 'claudeAiData' },
]

// ─── Arg parsing ─────────────────────────────────────────────────────────────

const args = process.argv.slice(2)
const onlyMissing   = args.includes('--missing')
const asJson        = args.includes('--json')
const failOnMissing = args.includes('--fail-on-missing')
const filterKeys    = args.filter(a => !a.startsWith('--'))

const pages = filterKeys.length
  ? PAGES.filter(p => filterKeys.includes(p.key))
  : PAGES

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getSections(data) {
  // { en: { sections: [...] }, tr: {...} } yapısını da düz yapıyı da destekler
  const root = data?.en || data?.tr || data
  return root?.sections || (Array.isArray(root) ? root : [])
}

function sectionTitle(section) {
  const t = section.title
  if (!t) return '(untitled)'
  if (typeof t === 'string') return t
  return t.en || t.tr || '(untitled)'
}

function codeLang(block) {
  const l = block.language || block.lang
  return typeof l === 'string' ? l.toLowerCase() : ''
}

function countBlocks(blocks) {
  let code = 0, shellCode = 0, anim = 0
  const animByType = {}
  ;(blocks || []).forEach(b => {
    if (!b || typeof b !== 'object') return
    if (b.type === 'code') {
      code++
      const lang = codeLang(b)
      if (lang === 'bash' || lang === 'shell' || lang === 'sh' || lang === 'text') shellCode++
    }
    if (ANIMATION_TYPES.has(b.type)) {
      anim++
      animByType[b.type] = (animByType[b.type] || 0) + 1
    }
  })
  return { code, shellCode, anim, animByType }
}

// ─── Colours ─────────────────────────────────────────────────────────────────

const C = {
  reset: '\x1b[0m', bold: '\x1b[1m', green: '\x1b[32m',
  red: '\x1b[31m', yellow: '\x1b[33m', cyan: '\x1b[36m', grey: '\x1b[90m',
}
const bold = s => `${C.bold}${s}${C.reset}`
const cyan = s => `${C.cyan}${s}${C.reset}`

// ─── Main ────────────────────────────────────────────────────────────────────

let totalCode = 0, totalAnim = 0, totalDeficit = 0
const jsonOut = []

for (const page of pages) {
  const filePath = resolve(ROOT, page.file)
  let mod
  try {
    mod = await import(pathToFileURL(filePath).href)
  } catch (err) {
    console.error(`${C.red}[SKIP]${C.reset} ${page.key}: ${err.message.split('\n')[0]}`)
    continue
  }

  const data = mod[page.export]
  if (!data) {
    console.error(`${C.red}[SKIP]${C.reset} ${page.key}: export "${page.export}" not found`)
    continue
  }

  const sections = getSections(data)
  if (sections.length === 0) continue

  let pageCode = 0, pageAnim = 0, pageDeficit = 0
  const rows = []
  const jsonSections = []

  sections.forEach((section, i) => {
    const counts = countBlocks(section.blocks || [])
    const deficit = Math.max(0, counts.code - counts.anim)
    pageCode += counts.code
    pageAnim += counts.anim
    pageDeficit += deficit

    if (onlyMissing && deficit === 0) return

    const status = counts.code === 0
      ? `${C.grey}no-code${C.reset}`
      : deficit === 0
        ? `${C.green}✓${C.reset}`
        : `${C.red}-${deficit}${C.reset}`

    rows.push(
      `  ${String(i).padStart(2, '0')}  ${sectionTitle(section).slice(0, 46).padEnd(46)} ` +
      `code:${counts.code}  anim:${counts.anim}  ${status}`
    )

    if (deficit > 0) {
      jsonSections.push({
        index: i,
        title: sectionTitle(section),
        codeBlocks: counts.code,
        shellCodeBlocks: counts.shellCode,
        animationBlocks: counts.anim,
        deficit,
      })
    }
  })

  totalCode += pageCode
  totalAnim += pageAnim
  totalDeficit += pageDeficit

  const coverage = pageCode === 0 ? 100 : Math.min(100, Math.round((pageAnim / pageCode) * 100))

  if (asJson) {
    jsonOut.push({
      key: page.key,
      file: page.file,
      codeBlocks: pageCode,
      animationBlocks: pageAnim,
      deficit: pageDeficit,
      coveragePct: coverage,
      gapSections: jsonSections,
    })
    continue
  }

  const badge = pageDeficit === 0
    ? `${C.green}✓ tam kapsam${C.reset}`
    : `${C.red}${pageDeficit} açık${C.reset}`
  console.log(`\n${bold(cyan(page.key.toUpperCase()))} ${C.grey}(${sections.length} sections)${C.reset}  ${badge}  ${C.grey}coverage:${C.reset} ${coverage}%`)
  rows.forEach(r => console.log(r))
  console.log(`  ${C.grey}TOTAL:${C.reset}  code:${bold(pageCode)}  anim:${bold(pageAnim)}  deficit:${pageDeficit > 0 ? C.red : C.green}${pageDeficit}${C.reset}`)
}

if (asJson) {
  jsonOut.sort((a, b) => b.deficit - a.deficit)
  console.log(JSON.stringify({
    generatedAt: new Date().toISOString(),
    totals: { codeBlocks: totalCode, animationBlocks: totalAnim, deficit: totalDeficit },
    pages: jsonOut,
  }, null, 2))
} else {
  console.log(`\n${'─'.repeat(70)}`)
  const pct = totalCode === 0 ? 100 : Math.min(100, Math.round((totalAnim / totalCode) * 100))
  console.log(`Kod bloğu: ${bold(totalCode)}  Animasyon: ${bold(totalAnim)}  Toplam açık: ${totalDeficit > 0 ? C.red : C.green}${bold(totalDeficit)}${C.reset}  Kapsam: ${bold(pct + '%')}`)
}

if (failOnMissing && totalDeficit > 0) process.exit(1)
