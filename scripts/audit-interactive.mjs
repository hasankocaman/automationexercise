#!/usr/bin/env node
/**
 * audit-interactive.mjs
 *
 * Reports code-playground, step-animation, challenge/order-sort, and
 * feynman-checkpoint counts per data file and per section.
 *
 * Usage:
 *   node scripts/audit-interactive.mjs              # all pages
 *   node scripts/audit-interactive.mjs python       # single page
 *   node scripts/audit-interactive.mjs --missing    # only sections with gaps
 *
 * Exit code: 0 always (informational only — not a CI gate by default).
 * To make it a CI gate add --fail-on-missing and the script exits 1 when
 * any section that has code blocks is missing at least one of the trio.
 */

import { pathToFileURL, fileURLToPath } from 'url'
import { resolve, dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = resolve(__dirname, '..')

// ─── Config ─────────────────────────────────────────────────────────────────

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
const onlyMissing  = args.includes('--missing')
const failOnMissing = args.includes('--fail-on-missing')
const filterKeys   = args.filter(a => !a.startsWith('--'))

const pages = filterKeys.length
  ? PAGES.filter(p => filterKeys.includes(p.key))
  : PAGES

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getSections(data) {
  // Handle { en: { sections: [...] }, tr: {...} } structure (most pages)
  const root = data?.en || data?.tr || data
  return root?.sections || (Array.isArray(root) ? root : [])
}

function sectionTitle(section) {
  const t = section.title
  if (!t) return '(untitled)'
  if (typeof t === 'string') return t
  return t.en || t.tr || '(untitled)'
}

function countBlocks(blocks) {
  let code = 0, cp = 0, sa = 0, ch = 0, fc = 0
  ;(blocks || []).forEach(b => {
    if (!b || typeof b !== 'object') return
    if (b.type === 'code')              code++
    if (b.type === 'code-playground')   cp++
    if (b.type === 'step-animation')    sa++
    if (b.type === 'challenge' && b.variant === 'order-sort') ch++
    if (b.type === 'feynman-checkpoint') fc++
  })
  return { code, cp, sa, ch, fc }
}

function trioComplete(counts) {
  return counts.cp > 0 && counts.sa > 0 && counts.ch > 0
}

// ─── Colours ─────────────────────────────────────────────────────────────────

const C = {
  reset: '\x1b[0m',
  bold:  '\x1b[1m',
  green: '\x1b[32m',
  red:   '\x1b[31m',
  yellow:'\x1b[33m',
  cyan:  '\x1b[36m',
  grey:  '\x1b[90m',
}

function ok(n)    { return n > 0 ? `${C.green}${n}${C.reset}` : `${C.red}${n}${C.reset}` }
function warn(n)  { return n > 0 ? `${C.yellow}${n}${C.reset}` : `${C.grey}${n}${C.reset}` }
function bold(s)  { return `${C.bold}${s}${C.reset}` }
function cyan(s)  { return `${C.cyan}${s}${C.reset}` }

// ─── Main ────────────────────────────────────────────────────────────────────

let totalGaps = 0
let pagesLoaded = 0

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
  if (sections.length === 0) {
    console.log(`${C.grey}[EMPTY]${C.reset} ${page.key}: no sections found`)
    continue
  }

  pagesLoaded++

  // Per-page totals
  let pageCodes = 0, pageCp = 0, pageSa = 0, pageCh = 0, pageFc = 0, pageGaps = 0

  const sectionRows = []

  sections.forEach((section, i) => {
    const seenBlocks = section.blocks || []
    const counts = countBlocks(seenBlocks)
    pageCodes += counts.code
    pageCp    += counts.cp
    pageSa    += counts.sa
    pageCh    += counts.ch
    pageFc    += counts.fc

    const hasCode  = counts.code > 0
    const complete = trioComplete(counts)
    const missing  = hasCode && !complete
    if (missing) pageGaps++

    sectionRows.push({ i, section, counts, hasCode, complete, missing })
  })

  totalGaps += pageGaps

  if (onlyMissing && pageGaps === 0) continue

  // ── Page header ────────────────────────────────────────────────────────────
  const pageStatus = pageGaps === 0 ? `${C.green}✓ complete${C.reset}` : `${C.red}${pageGaps} gap(s)${C.reset}`
  console.log(`\n${bold(cyan(page.key.toUpperCase()))} ${C.grey}(${sections.length} sections)${C.reset}  ${pageStatus}`)
  console.log(
    `  ${C.grey}TOTAL:${C.reset}` +
    `  code:${bold(String(pageCodes))}` +
    `  playground:${ok(pageCp)}` +
    `  step-anim:${ok(pageSa)}` +
    `  order-sort:${ok(pageCh)}` +
    `  feynman:${warn(pageFc)}`
  )

  // ── Section rows ───────────────────────────────────────────────────────────
  for (const { i, section, counts, hasCode, complete, missing } of sectionRows) {
    if (onlyMissing && !missing) continue

    const status = !hasCode
      ? `${C.grey}no-code${C.reset}`
      : complete
        ? `${C.green}✓${C.reset}`
        : `${C.red}✗ MISSING: ${[counts.cp===0&&'playground', counts.sa===0&&'step-anim', counts.ch===0&&'order-sort'].filter(Boolean).join(', ')}${C.reset}`

    const title = sectionTitle(section).slice(0, 45).padEnd(45)
    console.log(
      `  ${String(i).padStart(2, '0')}  ${title}` +
      `  code:${counts.code}` +
      `  cp:${counts.cp}` +
      `  sa:${counts.sa}` +
      `  ch:${counts.ch}` +
      `  fc:${warn(counts.fc)}` +
      `  ${status}`
    )
  }
}

// ─── Summary ─────────────────────────────────────────────────────────────────

console.log(`\n${'─'.repeat(70)}`)
console.log(`Pages loaded: ${bold(String(pagesLoaded))}  Total gaps: ${totalGaps === 0 ? `${C.green}0${C.reset}` : `${C.red}${totalGaps}${C.reset}`}`)

if (failOnMissing && totalGaps > 0) {
  console.error(`\n${C.red}Exit 1: --fail-on-missing set and ${totalGaps} gap(s) found.${C.reset}`)
  process.exit(1)
}
