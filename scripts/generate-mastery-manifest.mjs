#!/usr/bin/env node
/**
 * generate-mastery-manifest.mjs
 *
 * Learning OS Faz 2 (Documents/learning-os-redesign-plan.md §6/F7) — build-time
 * denominators for progressStore.getMastery(route): total quiz/exercise block
 * counts + tab count per TopicPage-based route.
 *
 * Neden build-time: mastery formülü "kaç soru/egzersizin YÜZDE kaçını
 * bitirdin" hesaplamak için her sayfanın TOPLAM blok sayısını bilmeli, ama
 * progressStore.js (HomePage/qa-mentor'da erken yüklenen salt-okunur adaptör)
 * o sayfaların (bazıları 600KB+) *Data.js dosyalarını runtime'da import
 * EDEMEZ — bundle boyutunu patlatır. Bunun yerine bu script build sırasında
 * dosyaları Node'da okuyup küçük bir sayısal manifest üretir, progressStore
 * sadece o küçük dosyayı import eder.
 *
 * `npm run build` zincirinde generate-seo-files'tan SONRA, vite build'ten
 * ÖNCE çalışır (ürettiği dosya vite'ın bundle'layacağı bir kaynak dosyasıdır).
 */

import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dir = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dir, '../src/data')
const OUT_PATH = path.join(__dir, '../src/data/generated/masteryManifest.js')

// route -> data dosyasının export adı (dosya adıyla aynı, örn. dockerData -> src/data/dockerData.js).
// Bilinçli olarak TopicPage tabanlı sayfalarla sınırlı — Algorithms/ManualTesting/QAMentor gibi
// özel component'ler kapsam dışı (plan §5-F4'teki aynı istisnayla tutarlı).
const ROUTE_MAP = {
  '/selenium': 'seleniumData',
  '/playwright': 'playwrightData',
  '/cypress': 'cypressData',
  '/python': 'pythonData',
  '/typescript': 'typescriptData',
  '/javascript': 'javascriptData',
  '/sql': 'sqlData',
  '/java': 'javaData',
  '/git-github': 'gitGithubData',
  '/linux': 'linuxData',
  '/jmeter': 'jmeterData',
  '/postman': 'postmanData',
  '/bruno': 'brunoData',
  '/rest-assured': 'restAssuredData',
  '/docker': 'dockerData',
  '/jenkins': 'jenkinsData',
  '/kubernetes': 'kubernetesData',
  '/kafka': 'kafkaData',
  '/appium': 'appiumData',
  '/browserstack': 'browserstackData',
  '/aws': 'awsData',
  '/azure': 'azureData',
  '/gauge': 'gaugeData',
  '/what-is-testing': 'whatIsTestingData',
  '/claude-ai': 'claudeAiData',
  '/llm-agents': 'llmAgentsData',
  '/backend': 'backendData',
  '/basit-backend': 'basitBackendData',
  '/security': 'securityData',
}

const QUIZ_TYPES = new Set(['quiz', 'quiz-fill'])
const EXERCISE_TYPES = new Set([
  'code-playground', 'challenge', 'editor', 'git-practice', 'java-practice',
  'backend-practice', 'docker-sandbox', 'k8s-sandbox', 'jenkins-sandbox', 'video-scene',
])

// İki ağaçlı ({en:{...}, tr:{...}}) ve tek ağaçlı (TR runtime overlay ile üretilen,
// örn. pythonData/sqlData/typescriptData) dosyaların HER İKİSİNİ de destekler —
// blok SAYISI iki dilde de aynıdır, hangi ağaçtan okunduğu önemsizdir.
function deriveSections(data) {
  if (data?.en?.sections) return { sections: data.en.sections, hero: data.en.hero }
  if (data?.sections) return { sections: data.sections, hero: data.hero }
  return null
}

// TopicPage.jsx'teki `pageKey` türetmesiyle BİREBİR aynı mantık (satır ~20238) —
// buradan sapma, üretilen manifest'in localStorage anahtarlarıyla (quizScore_<pageKey>
// gibi) eşleşmemesine yol açar.
function derivePageKey(heroTitle) {
  return (heroTitle || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
}

async function main() {
  const manifest = {}
  const problems = []

  for (const [route, exportName] of Object.entries(ROUTE_MAP)) {
    const filePath = path.join(DATA_DIR, `${exportName}.js`)
    let mod
    try {
      mod = await import(pathToFileURL(filePath).href)
    } catch (e) {
      problems.push(`${route}: dosya import edilemedi (${filePath}) — ${e.message}`)
      continue
    }
    const data = mod[exportName]
    if (!data) {
      problems.push(`${route}: '${exportName}' export'u bulunamadı`)
      continue
    }
    const derived = deriveSections(data)
    if (!derived) {
      problems.push(`${route}: sections bulunamadı (ne .en.sections ne .sections)`)
      continue
    }
    const { sections, hero } = derived
    let totalQuizBlocks = 0
    let totalExerciseBlocks = 0
    let hasInterview = false
    for (const section of sections) {
      for (const block of section.blocks || []) {
        if (QUIZ_TYPES.has(block.type)) totalQuizBlocks++
        if (EXERCISE_TYPES.has(block.type)) totalExerciseBlocks++
        if (block.type === 'interview-questions') hasInterview = true
      }
    }
    manifest[route] = {
      pageKey: derivePageKey(hero?.title),
      tabCount: sections.length,
      totalQuizBlocks,
      totalExerciseBlocks,
      hasInterview,
    }
  }

  if (problems.length > 0) {
    console.error('Mastery manifest üretiminde sorunlar bulundu:')
    problems.forEach((p) => console.error(`  - ${p}`))
    process.exit(1)
  }

  await mkdir(path.dirname(OUT_PATH), { recursive: true })
  const header = '// OTOMATİK ÜRETİLDİ — elle düzenleme, npm run build sırasında yeniden yazılır.\n' +
    '// Kaynak: scripts/generate-mastery-manifest.mjs (Documents/learning-os-redesign-plan.md §6/F7)\n\n'
  const body = `export const MASTERY_MANIFEST = ${JSON.stringify(manifest, null, 2)}\n`
  await writeFile(OUT_PATH, header + body, 'utf8')
  console.log(`Mastery manifest üretildi: ${Object.keys(manifest).length} route -> ${path.relative(process.cwd(), OUT_PATH)}`)
}

main()
