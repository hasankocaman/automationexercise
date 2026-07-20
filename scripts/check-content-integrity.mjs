#!/usr/bin/env node
/**
 * check-content-integrity.mjs
 *
 * Scans src/data/*Data.js for six categories of violations:
 *   (a) English comments in TR-context code blocks (code, editor, code-playground,
 *       error-dictionary codeWrong/codeFixed, interview-questions code snippets)
 *   (b) Missing relatedTopicId on code-playground / interview-questions / error-dictionary blocks
 *   (c) Duplicate hint/practice text (≥85% word overlap) across different topicIds
 *   (d) step-animation steps missing the required 'label' field (renders as empty box)
 *   (e) quiz options missing 'id' (breaks correct/selected matching — ALL options
 *       render red/✗ regardless of the answer chosen; see typescriptData.js incident,
 *       .claude/NEXT_SESSION.md 2026-07-20)
 *   (f) code-playground blocks missing 'id' (CodePlaygroundBlock.jsx's awardXpOnce
 *       bails out silently with `if (!block.id) return` — the UI still shows a
 *       "Doğru!" success message but XP/exercise-completion is NEVER recorded;
 *       see /what-is-testing "Site Haritası" incident, .claude/NEXT_SESSION.md 2026-07-20)
 *
 * Exit code 1 when any violations found (breaks build/commit).
 * Follows the same reporting pattern as check-seo.mjs.
 */

import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dir = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dir, '../src/data')
const TOPIC_PAGE_PATH = path.join(__dir, '../src/components/TopicPage.jsx')

// ─── Configuration ────────────────────────────────────────────────────────────

// Block types that must carry relatedTopicId
const REQUIRES_RELATED_ID = ['code-playground', 'interview-questions', 'error-dictionary']

// English indicator words — common explanatory words that should NOT appear in
// Turkish code comments. Only words that are clearly NOT technical terms.
// Deliberately conservative: action verbs (contains, handles, creates, etc.) excluded
// because they often appear as method/API names in technical context.
const ENGLISH_INDICATOR_RE = /\b(why|usually|on Mac|in your terminal|both|points to|this is|this will|this means|use this|you can|you need|you should|make sure|check that|note that|similar to|instead of|rather than|only when|if you want|as well as|in order to|make sure|at the top|at the bottom|right side|left side|recommended|shortcut|currently|however|although|therefore|because|already installed|instead|otherwise|otherwise|when using|before running|after running|if not|if already|use package|add to|remove from|re\-run|re\-install|re\-start)\b/i

// Lines with these patterns are terminal/program output — NOT explanatory comments
const OUTPUT_LINE_RE = /^\s*(>>|=>|->|#\s*>|#\s*[✔✅✗❌⚠️]|\/\/\s*>|#\s*Output|#\s*Result|Expected:|Got:|\.\.\.|Traceback|Error:|Warning:|Usage:|Version:|v\d+\.\d+)/i

// Tokens that are allowed to remain in English even inside a comment
const TECHNICAL_TOKEN_RE = /^(SELECT|FROM|WHERE|JOIN|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|GROUP\s+BY|ORDER\s+BY|HAVING|UNION|WITH|NULL|TRUE|FALSE|PASS|FAIL|OK|ERROR|GET|POST|PUT|PATCH|DELETE|HTTP|HTTPS|JSON|XML|HTML|CSS|API|URL|UUID|ID|XPath|Selenium|Playwright|pytest|WebDriver|Chrome|Firefox|Safari|Edge|CI\/CD|Docker|Jenkins|Kubernetes|Kafka|Appium|BrowserStack|AWS|Azure|WRONG|CORRECT|FIXME|TODO|NOTE|assert|fixture|locator|selector|pipeline|import|from|def|class|return|print|async|await|const|let|var|function|interface|type|enum|null|true|false|undefined|NaN|GET|POST|PUT)$/i

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractCommentText(line) {
  const hash = line.match(/^\s*#\s*(.+)$/)
  if (hash) return hash[1].trim()
  const slash = line.match(/^\s*\/\/\s*(.+)$/)
  if (slash) return slash[1].trim()
  const dash = line.match(/^\s*--\s*(.+)$/)
  if (dash) return dash[1].trim()
  return null
}

function isAllowedComment(commentText) {
  if (!commentText) return true
  if (OUTPUT_LINE_RE.test(commentText)) return true
  // Pure ALL_CAPS token (keyword/constant)
  if (/^[A-Z][A-Z0-9_\s]+$/.test(commentText.trim())) return true
  // Version number
  if (/^v?\d+\.\d+(\.\d+)*$/.test(commentText.trim())) return true
  // Empty / whitespace only
  if (commentText.trim().length === 0) return true
  // All tokens are technical
  const words = commentText.split(/\s+/)
  const allTechnical = words.every((w) => TECHNICAL_TOKEN_RE.test(w.replace(/[^a-zA-Z0-9_\/]/g, '')))
  if (allTechnical) return true
  return false
}

function hasEnglishIndicator(commentText) {
  if (isAllowedComment(commentText)) return false
  return ENGLISH_INDICATOR_RE.test(commentText)
}

// Load the englishToTurkishCodeComments patterns from TopicPage.jsx
// Used as a reference to confirm which English patterns already have TR mappings
async function loadMappedPatterns() {
  try {
    const src = await readFile(TOPIC_PAGE_PATH, 'utf8')
    const blockMatch = src.match(/const englishToTurkishCodeComments\s*=\s*\[([\s\S]*?)\]\s*\n/)
    if (!blockMatch) return []
    // Extract pattern strings between / / delimiters
    const rawPatterns = [...blockMatch[1].matchAll(/\[\s*\/(.+?)\/(?:gi|ig|i|g)?\s*,/gs)]
    return rawPatterns.map(([, pat]) => {
      try { return new RegExp(pat, 'i') } catch { return null }
    }).filter(Boolean)
  } catch {
    return []
  }
}

// ─── Check (a): English comments ─────────────────────────────────────────────

// Context types for template literals:
//   'en'      — inside `en: \`` bilingual field → skip (EN content is expected English)
//   'tr'      — inside `tr: \`` bilingual field → check
//   'unknown' — plain code string (no qualifier) → check
//   null      — not inside a template literal

function checkEnglishComments(source, filename, mappedPatterns, violations) {
  const lines = source.split('\n')
  // Stack of context types for nested template literals
  const contextStack = []
  let lineNum = 0

  for (const line of lines) {
    lineNum++

    // Determine what context a backtick opens based on the current line's prefix
    // Patterns like `en: \`` or `tr: \`` or just standalone backticks
    const enOpenRE = /\ben\s*:\s*`/
    const trOpenRE = /\btr\s*:\s*`/

    // Count backticks to update the stack, skipping escaped ones
    let escaped = false
    let col = 0
    for (const ch of line) {
      col++
      if (escaped) { escaped = false; continue }
      if (ch === '\\') { escaped = true; continue }
      if (ch === '`') {
        if (contextStack.length === 0 || contextStack[contextStack.length - 1] === null) {
          // Opening a new template literal — determine its context from this line up to col
          const prefix = line.slice(0, col)
          if (enOpenRE.test(prefix)) {
            contextStack.push('en')
          } else if (trOpenRE.test(prefix)) {
            contextStack.push('tr')
          } else {
            contextStack.push('unknown')
          }
        } else {
          // Closing the current template literal
          contextStack.pop()
        }
      }
    }

    const currentContext = contextStack[contextStack.length - 1]
    // Only check lines inside a template literal that is NOT an EN bilingual field
    if (!currentContext || currentContext === 'en') continue

    const commentText = extractCommentText(line)
    if (!commentText) continue
    if (!hasEnglishIndicator(commentText)) continue

    // Check if any mapped pattern already covers this comment
    const alreadyMapped = mappedPatterns.some((p) => p.test(commentText))
    if (alreadyMapped) continue

    violations.push({
      type: 'english-comment',
      file: filename,
      line: lineNum,
      content: line.trim(),
    })
  }
}

// ─── Check (b): Missing relatedTopicId ───────────────────────────────────────

function checkRelatedTopicId(source, filename, violations) {
  const lines = source.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const typeMatch = line.match(/type\s*:\s*['"](.+?)['"]/)
    if (!typeMatch) continue
    const blockType = typeMatch[1]
    if (!REQUIRES_RELATED_ID.includes(blockType)) continue

    // Look for relatedTopicId within the next 60 lines (covers large blocks)
    const window = lines.slice(i, i + 60).join('\n')
    if (/relatedTopicId\s*:/.test(window)) continue

    violations.push({
      type: 'missing-related-topic-id',
      file: filename,
      line: i + 1,
      content: `Block '${blockType}' at line ${i + 1} has no relatedTopicId`,
    })
  }
}

// ─── Check (c): Duplicate hints ──────────────────────────────────────────────

// Normalize text for comparison: lowercase, collapse whitespace, strip punctuation
function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Jaccard similarity between two texts based on word sets
function jaccardSimilarity(a, b) {
  const setA = new Set(a.split(' ').filter((w) => w.length > 2))
  const setB = new Set(b.split(' ').filter((w) => w.length > 2))
  if (setA.size === 0 || setB.size === 0) return 0
  let intersection = 0
  for (const w of setA) { if (setB.has(w)) intersection++ }
  const union = setA.size + setB.size - intersection
  return intersection / union
}

// Extract full string value — handles single/double quoted strings with internal quotes
// Returns the full string content or null if no match
function extractStringValue(line, keyPattern) {
  // Try single-quoted: key: 'value'
  const singleRe = new RegExp(`${keyPattern}\\s*:\\s*'([^']*)'`)
  const singleM = line.match(singleRe)
  if (singleM) return singleM[1]
  // Try double-quoted: key: "value"
  const doubleRe = new RegExp(`${keyPattern}\\s*:\\s*"([^"]*)"`)
  const doubleM = line.match(doubleRe)
  if (doubleM) return doubleM[1]
  // Try TR bilingual: key: { tr: 'value'
  const trRe = new RegExp(`${keyPattern}\\s*:\\s*\\{\\s*tr\\s*:\\s*'([^']*)'`)
  const trM = line.match(trRe)
  if (trM) return trM[1]
  return null
}

// Collect all hint-like text values: 'hint', 'hints', starterCode, practice text
function collectHints(source, filename) {
  const collected = []
  const lines = source.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const hintText = extractStringValue(line, 'hint')
    if (hintText && hintText.length > 10) {
      collected.push({ file: filename, line: i + 1, text: hintText })
    }
  }

  return collected
}

// ─── Check (d): step-animation schema (label/detail required per step) ──────
//
// StepAnimationBlock.jsx requires each `steps[]` entry to carry a `label`
// (short badge text shown inside the numbered box) — a step with only
// {tr,en} and no `label` renders as an EMPTY box in the UI. This mirrors
// the canonical shape produced by interactiveTrioFillers.js's own
// makeStepBlock(): { id, icon, label: {tr,en}, detail: {tr,en} }.
// Discovered 2026-07-18 (see .claude/NEXT_SESSION.md "AÇIK İŞ" section).

async function checkStepAnimationSchema(filepath, filename, violations) {
  let mod
  try {
    mod = await import(pathToFileURL(filepath).href)
  } catch {
    return // file fails to import — not this check's concern
  }

  const exportKey = Object.keys(mod).find((k) => mod[k] && (mod[k].en || mod[k].tr))
  if (!exportKey) return
  const data = mod[exportKey]
  const roots = [data.en, data.tr].filter(Boolean)
  const seenTitles = new Set()

  for (const root of roots) {
    const sections = root?.sections || []
    for (const section of sections) {
      for (const block of section?.blocks || []) {
        if (!block || block.type !== 'step-animation') continue
        const steps = block.steps || []
        if (steps.length === 0) continue

        const titleKey = JSON.stringify(block.title)
        if (seenTitles.has(titleKey)) continue
        seenTitles.add(titleKey)

        const missingLabel = steps.some((s) => !s || !s.label)
        if (!missingLabel) continue

        const titleText = typeof block.title === 'string'
          ? block.title
          : (block.title?.tr || block.title?.en || '(başlıksız)')

        violations.push({
          type: 'step-animation-missing-label',
          file: filename,
          line: 0,
          content: `step-animation "${titleText}" — ${steps.length} adımdan en az biri 'label' alanı içermiyor (StepAnimationBlock boş kutu render eder)`,
        })
      }
    }
  }
}

// ─── Check (e): quiz option `id` schema ──────────────────────────────────────
//
// QuizBlock (TopicPage.jsx) matches selected/correct options by `opt.id`.
// If an object-shaped option has no `id`, every option normalizes to the SAME
// undefined id — clicking ANY option marks it "selected", none ever matches
// the correct answer, so ALL FOUR render red/✗ regardless of what the user
// picked (real bug found on /typescript, 35 quiz blocks, discovered 2026-07-20
// via a user screenshot). TopicPage.jsx now has a defensive fallback (assigns
// positional a/b/c/d when `id` is missing), but that only masks the symptom —
// this check stops the root cause (malformed content) from being written
// again, mirroring the step-animation schema check (D) above.

async function checkQuizOptionIdSchema(filepath, filename, violations) {
  let mod
  try {
    mod = await import(pathToFileURL(filepath).href)
  } catch {
    return // file fails to import — not this check's concern
  }

  const seenQuestions = new Set()

  function checkOptions(options) {
    if (!Array.isArray(options)) return false
    return options.some((o) => o && typeof o === 'object' && o.id == null)
  }

  function walkBlocks(blocks) {
    for (const block of blocks || []) {
      if (!block || block.type !== 'quiz') continue
      const questionKey = JSON.stringify(block.question)
      if (seenQuestions.has(questionKey)) continue // aynı obje iki ağaca da eklenmiş olabilir (typescriptData.js _afterCode kalıbı)
      seenQuestions.add(questionKey)

      const mainBroken = checkOptions(block.options)
      const retryBroken = block.retryQuestion && checkOptions(block.retryQuestion.options)
      if (!mainBroken && !retryBroken) continue

      const questionText = typeof block.question === 'string'
        ? block.question
        : (block.question?.tr || block.question?.en || '(sorusuz)')

      violations.push({
        type: 'quiz-option-missing-id',
        file: filename,
        line: 0,
        content: `quiz "${questionText.slice(0, 70)}" — seçeneklerden en az biri 'id' alanı içermiyor (tüm şıklar seçilse de yanlış/✗ render eder, doğru cevap asla yeşil görünmez)`,
      })
    }
  }

  function walkSections(sections) {
    for (const section of sections || []) walkBlocks(section?.blocks)
  }

  for (const key of Object.keys(mod)) {
    const data = mod[key]
    if (!data || typeof data !== 'object') continue
    if (data.sections) walkSections(data.sections)
    if (data.en?.sections) walkSections(data.en.sections)
    if (data.tr?.sections) walkSections(data.tr.sections)
  }
}

// ─── Check (f): code-playground `id` schema ──────────────────────────────────
//
// CodePlaygroundBlock.jsx's awardXpOnce() does `if (!block.id || isDone) return`
// BEFORE calling markExerciseComplete/addXP/onFirstSuccess — a block without an
// `id` silently NEVER records XP or exercise completion, even though the UI
// still shows a "Doğru!"/"Correct!" success message to the user. This is
// DIFFERENT from relatedTopicId (Check B, a content-authoring/attribution
// field) — `id` is the runtime identity key the XP/completion system keys on.
// Discovered 2026-07-20 via a user report that /what-is-testing's "Site
// Haritası" tab could never be marked complete; a site-wide scan then found
// the same silent gap in 40 other blocks across 10 files.

async function checkCodePlaygroundIdSchema(filepath, filename, violations) {
  let mod
  try {
    mod = await import(pathToFileURL(filepath).href)
  } catch {
    return // file fails to import — not this check's concern
  }

  const seenBlocks = new Set()

  function walkBlocks(blocks) {
    for (const block of blocks || []) {
      if (!block || block.type !== 'code-playground') continue
      if (seenBlocks.has(block)) continue // aynı obje iki ağaca da (tr/en) eklenmiş olabilir
      seenBlocks.add(block)
      if (block.id) continue

      const label = block.relatedTopicId
        || (typeof block.title === 'string' ? block.title : (block.title?.tr || block.title?.en))
        || '(relatedTopicId/title yok)'

      violations.push({
        type: 'code-playground-missing-id',
        file: filename,
        line: 0,
        content: `code-playground "${label}" — 'id' alanı yok (awardXpOnce sessizce çıkar, XP/tamamlama hiç kaydedilmez)`,
      })
    }
  }

  function walkSections(sections) {
    for (const section of sections || []) walkBlocks(section?.blocks)
  }

  for (const key of Object.keys(mod)) {
    const data = mod[key]
    if (!data || typeof data !== 'object') continue
    if (data.sections) walkSections(data.sections)
    if (data.en?.sections) walkSections(data.en.sections)
    if (data.tr?.sections) walkSections(data.tr.sections)
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const allViolations = []
  const mappedPatterns = await loadMappedPatterns()

  const files = (await readdir(DATA_DIR))
    .filter((f) => f.endsWith('Data.js') || f.endsWith('data.js'))
    .sort()

  const allHints = []

  for (const filename of files) {
    const filepath = path.join(DATA_DIR, filename)
    const source = await readFile(filepath, 'utf8')

    checkEnglishComments(source, filename, mappedPatterns, allViolations)
    checkRelatedTopicId(source, filename, allViolations)
    await checkStepAnimationSchema(filepath, filename, allViolations)
    await checkQuizOptionIdSchema(filepath, filename, allViolations)
    await checkCodePlaygroundIdSchema(filepath, filename, allViolations)
    allHints.push(...collectHints(source, filename))
  }

  // Dedup relatedTopicId violations: one per block occurrence is enough
  // (avoids repeating for every line inside the same block)
  const seenBlocks = new Set()
  const dedupedViolations = allViolations.filter((v) => {
    if (v.type !== 'missing-related-topic-id') return true
    const key = `${v.file}:${v.line}`
    if (seenBlocks.has(key)) return false
    seenBlocks.add(key)
    return true
  })

  // Turkish character detection — used to skip TR/EN bilingual pairs
  const TURKISH_CHARS_RE = /[ğüşıöçĞÜŞİÖÇ]/

  // Check (c): duplicate hints
  // Skip pairs that are TR/EN variants of the same content (one has Turkish chars, other doesn't)
  for (let i = 0; i < allHints.length; i++) {
    for (let j = i + 1; j < allHints.length; j++) {
      const a = allHints[i]
      const b = allHints[j]
      if (a.file === b.file && Math.abs(a.line - b.line) < 5) continue // same block

      // Skip TR/EN bilingual pairs: one side Turkish chars, other side not
      const aTurkish = TURKISH_CHARS_RE.test(a.text)
      const bTurkish = TURKISH_CHARS_RE.test(b.text)
      if (aTurkish !== bTurkish) continue

      const sim = jaccardSimilarity(normalizeText(a.text), normalizeText(b.text))
      if (sim >= 0.85) {
        dedupedViolations.push({
          type: 'duplicate-hint',
          file: `${a.file}:${a.line} ↔ ${b.file}:${b.line}`,
          line: a.line,
          content: `Benzer ipucu (${Math.round(sim * 100)}%): "${a.text.slice(0, 60)}…"`,
        })
        // Only report each pair once
        break
      }
    }
  }

  // ─── Report ────────────────────────────────────────────────────────────────

  const englishViolations = dedupedViolations.filter((v) => v.type === 'english-comment')
  const missingIdViolations = dedupedViolations.filter((v) => v.type === 'missing-related-topic-id')
  const duplicateViolations = dedupedViolations.filter((v) => v.type === 'duplicate-hint')
  const stepSchemaViolations = dedupedViolations.filter((v) => v.type === 'step-animation-missing-label')
  const quizIdViolations = dedupedViolations.filter((v) => v.type === 'quiz-option-missing-id')
  const playgroundIdViolations = dedupedViolations.filter((v) => v.type === 'code-playground-missing-id')

  console.log(`\nİçerik Bütünlük Kontrolü — ${files.length} dosya tarandı\n`)
  console.log(`${'─'.repeat(60)}`)

  if (englishViolations.length > 0) {
    console.error(`\n[A] İngilizce kalmış yorumlar (${englishViolations.length} ihlal):`)
    for (const v of englishViolations) {
      console.error(`  ${v.file}:${v.line}  →  ${v.content}`)
    }
  }

  if (missingIdViolations.length > 0) {
    console.error(`\n[B] relatedTopicId eksik bloklar (${missingIdViolations.length} ihlal):`)
    for (const v of missingIdViolations) {
      console.error(`  ${v.file}:${v.line}  →  ${v.content}`)
    }
  }

  if (duplicateViolations.length > 0) {
    console.error(`\n[C] Tekrar eden içerik (${duplicateViolations.length} ihlal):`)
    for (const v of duplicateViolations) {
      console.error(`  ${v.file}  →  ${v.content}`)
    }
  }

  if (stepSchemaViolations.length > 0) {
    console.error(`\n[D] step-animation şema hatası — 'label' alanı eksik (${stepSchemaViolations.length} ihlal):`)
    for (const v of stepSchemaViolations) {
      console.error(`  ${v.file}  →  ${v.content}`)
    }
  }

  if (quizIdViolations.length > 0) {
    console.error(`\n[E] Quiz seçeneğinde 'id' eksik (${quizIdViolations.length} ihlal):`)
    for (const v of quizIdViolations) {
      console.error(`  ${v.file}  →  ${v.content}`)
    }
  }

  if (playgroundIdViolations.length > 0) {
    console.error(`\n[F] code-playground bloğunda 'id' eksik (${playgroundIdViolations.length} ihlal):`)
    for (const v of playgroundIdViolations) {
      console.error(`  ${v.file}  →  ${v.content}`)
    }
  }

  const total = dedupedViolations.length
  console.log(`\n${'─'.repeat(60)}`)

  if (total === 0) {
    console.log(`İçerik bütünlüğü: TÜM KONTROLLER GEÇTİ ✓`)
    process.exit(0)
  } else {
    console.error(`\nToplam ${total} ihlal bulundu: A=${englishViolations.length} B=${missingIdViolations.length} C=${duplicateViolations.length} D=${stepSchemaViolations.length} E=${quizIdViolations.length} F=${playgroundIdViolations.length}`)
    console.error(`Build engellendi — lütfen yukarıdaki ihlalleri düzelt.`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Script hatası:', err)
  process.exit(1)
})
