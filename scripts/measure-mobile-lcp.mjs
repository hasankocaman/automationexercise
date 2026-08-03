// ─── Mobil LCP ölçümü ────────────────────────────────────────────────────────
//
// Neden ayrı bir araç: Google'ın sıralama sinyali olarak kullandığı Core Web
// Vitals ölçümü MOBİL koşulda yapılır — masaüstü tarayıcıda hızlı açılan bir
// sayfa, 4x yavaş bir telefonda ve Slow 4G bağlantıda tamamen başka bir sayfadır.
// Bu projede en büyük veri modülleri 600 kB - 1.1 MB arasında; masaüstünde
// fark edilmeyen bir gecikme mobilde doğrudan sıralama kaybıdır.
//
// Ölçülen: LCP (en büyük içerik ne zaman göründü), FCP, TTFB, CLS.
// Ölçüm LABORATUVAR ölçümüdür — gerçek kullanıcı verisinin (CrUX/Search Console)
// yerine geçmez, ama regresyonu yayından ÖNCE yakalar: bir sayfaya ağır bir blok
// eklendiğinde bunu Search Console'da 28 gün sonra öğrenmek yerine burada
// aynı gün görürsün.
//
// Kullanım:
//   npm run seo:lcp                     → varsayılan sayfa listesi, 3 koşum
//   npm run seo:lcp -- --strict         → bütçe aşılırsa çıkış kodu 1
//   npm run seo:lcp -- --routes /,/sql --runs 5
//   npm run seo:lcp -- --base http://localhost:4173   (kendi sunucun)
//
// ⚠ `dist/` ister — önce `npm run build`.

import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium, devices } from '@playwright/test'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')

// ─── Argümanlar ──────────────────────────────────────────────────────────────
function argValue(name, fallback) {
    const index = process.argv.indexOf(`--${name}`)
    return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback
}
const strict = process.argv.includes('--strict')
const runs = Number(argValue('runs', '3'))
const port = Number(argValue('port', '4185'))
const externalBase = argValue('base', '')

// "İyi" eşiği Core Web Vitals tanımından: LCP ≤ 2500 ms, CLS ≤ 0.1.
const BUDGET = {
    lcp: Number(argValue('budget', '2500')),
    cls: 0.1,
}

// Varsayılan liste bilinçli olarak KARMA: ana sayfa, en ağır veri dosyasına
// sahip ders sayfaları, bir sekme URL'i ve bir İngilizce sayfa. Hepsi hızlı
// olan bir listeyi ölçmek regresyonu göstermez.
const DEFAULT_ROUTES = [
    '/',
    '/selenium/',
    '/selenium/wait-strategies/',
    '/typescript/',
    '/sql/',
    '/test-automation/',
    '/en/selenium/',
]
const routes = argValue('routes', '')
    ? argValue('routes', '').split(',').map((item) => item.trim()).filter(Boolean)
    : DEFAULT_ROUTES

// ─── Ölçüm kancası ───────────────────────────────────────────────────────────
// Sayfadaki HİÇBİR script çalışmadan önce enjekte edilir: PerformanceObserver
// sonradan kurulursa ilk boyama olaylarını kaçırır ve LCP olduğundan iyi ölçülür.
const COLLECTOR = `
window.__vitals = { lcp: 0, lcpElement: '', cls: 0, fcp: 0 }
try {
    new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            window.__vitals.lcp = entry.startTime
            const el = entry.element
            window.__vitals.lcpElement = el
                ? el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).slice(0, 2).join('.') : '')
                : ''
        }
    }).observe({ type: 'largest-contentful-paint', buffered: true })

    new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            // Kullanıcı etkileşimiyle tetiklenen kaymalar CLS'e girmez.
            if (!entry.hadRecentInput) window.__vitals.cls += entry.value
        }
    }).observe({ type: 'layout-shift', buffered: true })

    new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') window.__vitals.fcp = entry.startTime
        }
    }).observe({ type: 'paint', buffered: true })
} catch { /* ölçüm desteklenmiyorsa sessizce geç */ }
`

function median(values) {
    const sorted = [...values].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

async function startPreviewServer() {
    // Vite doğrudan node ile çağrılır (npm üzerinden DEĞİL): Windows'ta
    // `npm.cmd` + `shell: true` kombinasyonunda alt sürecin stdout'u güvenilir
    // biçimde akmıyor. Hazır olma tespiti de stdout'a DEĞİL, sunucunun kendisine
    // istek atarak yapılıyor — banner biçimi sürümden sürüme değişebilir, açık
    // bir port değişmez.
    const child = spawn(
        process.execPath,
        [join(rootDir, 'node_modules', 'vite', 'bin', 'vite.js'), 'preview', '--port', String(port), '--strictPort'],
        { cwd: rootDir, stdio: ['ignore', 'ignore', 'pipe'] },
    )

    let exited = false
    child.on('exit', (code) => { exited = true; exitCode = code })
    let exitCode = 0
    child.stderr.on('data', (chunk) => process.stderr.write(chunk))

    const deadline = Date.now() + 30_000
    while (Date.now() < deadline) {
        if (exited) {
            throw new Error(`vite preview kapandı (kod ${exitCode}). Port dolu olabilir ya da dist yok — önce "npm run build" çalıştır.`)
        }
        try {
            const response = await fetch(`http://localhost:${port}/`, { method: 'GET' })
            if (response.ok) return child
        } catch { /* henüz ayakta değil */ }
        await new Promise((resolve) => { setTimeout(resolve, 400) })
    }

    child.kill()
    throw new Error('vite preview 30 saniyede yanıt vermedi.')
}

async function measure(page, url) {
    const client = await page.context().newCDPSession(page)
    // Orta segment bir Android telefonun CPU'su, masaüstü referansının ~4'te
    // biri kadar; Slow 4G ise Google'ın mobil raporlarında referans aldığı
    // bağlantı. İkisi birlikte olmadan ölçüm "iyimser laboratuvar" kalır.
    await client.send('Emulation.setCPUThrottlingRate', { rate: 4 })
    await client.send('Network.enable')
    await client.send('Network.emulateNetworkConditions', {
        offline: false,
        latency: 150,
        downloadThroughput: (1.6 * 1024 * 1024) / 8,
        uploadThroughput: (750 * 1024) / 8,
        connectionType: 'cellular4g',
    })

    const response = await page.goto(url, { waitUntil: 'load', timeout: 120_000 })
    if (!response || response.status() >= 400) {
        throw new Error(`${url} → HTTP ${response ? response.status() : 'yanıt yok'}`)
    }

    // LCP adayı geç yüklenen bir öğeyle değişebilir; ölçümü kapatmadan önce
    // sayfanın oturmasını bekle.
    await page.waitForTimeout(3000)

    const result = await page.evaluate(() => {
        const nav = performance.getEntriesByType('navigation')[0] || {}
        return {
            lcp: window.__vitals.lcp,
            lcpElement: window.__vitals.lcpElement,
            cls: window.__vitals.cls,
            fcp: window.__vitals.fcp,
            ttfb: nav.responseStart || 0,
            domContentLoaded: nav.domContentLoadedEventEnd || 0,
            load: nav.loadEventEnd || 0,
            transferKb: performance.getEntriesByType('resource')
                .reduce((sum, entry) => sum + (entry.transferSize || 0), nav.transferSize || 0) / 1024,
        }
    })

    await client.detach()
    return result
}

// ─── Koşum ───────────────────────────────────────────────────────────────────
let server = null
const base = externalBase || `http://localhost:${port}`

if (!externalBase) {
    console.log(`vite preview başlatılıyor (port ${port})...`)
    server = await startPreviewServer()
}

const browser = await chromium.launch()
const results = []
let failures = 0

try {
    for (const route of routes) {
        const samples = []
        // İlk koşum ATILIR. Tarayıcı ve preview sunucusu ilk istekte ısınıyor
        // (ilk ölçümde 7.5 sn, sonrakilerde 1.0 sn gördük) — bu fark sayfanın
        // değil, ölçüm ortamının. Isınma koşumu olmadan az sayıda koşumda
        // medyan bu tek aykırı değerle zehirleniyor ve araç olmayan bir
        // regresyonu bildiriyor.
        for (let run = 0; run < runs + 1; run += 1) {
            // Her koşum TEMİZ bir bağlamda: ikinci koşumun disk/bellek
            // önbelleğinden faydalanması ölçümü olduğundan iyi gösterirdi.
            const context = await browser.newContext({ ...devices['Pixel 5'] })
            await context.addInitScript(COLLECTOR)
            const page = await context.newPage()
            try {
                const sample = await measure(page, `${base}${route}`)
                if (run > 0) samples.push(sample)
            } finally {
                await context.close()
            }
        }

        const summary = {
            route,
            runs: samples.length,
            lcp: Math.round(median(samples.map((s) => s.lcp))),
            fcp: Math.round(median(samples.map((s) => s.fcp))),
            ttfb: Math.round(median(samples.map((s) => s.ttfb))),
            cls: Number(median(samples.map((s) => s.cls)).toFixed(3)),
            transferKb: Math.round(median(samples.map((s) => s.transferKb))),
            lcpElement: samples[samples.length - 1].lcpElement,
        }
        summary.overBudget = summary.lcp > BUDGET.lcp || summary.cls > BUDGET.cls
        if (summary.overBudget) failures += 1
        results.push(summary)

        console.log(
            `${summary.overBudget ? '✗' : '✓'} ${route.padEnd(30)} LCP ${String(summary.lcp).padStart(5)} ms · `
            + `FCP ${String(summary.fcp).padStart(5)} ms · TTFB ${String(summary.ttfb).padStart(4)} ms · `
            + `CLS ${String(summary.cls).padStart(5)} · ${String(summary.transferKb).padStart(5)} kB · ${summary.lcpElement}`,
        )
    }
} finally {
    await browser.close()
    if (server) server.kill()
}

const report = {
    measuredAt: new Date().toISOString(),
    device: 'Pixel 5',
    throttling: { cpu: '4x', network: 'Slow 4G (1.6 Mbps / 150 ms RTT)' },
    budget: BUDGET,
    runsPerRoute: runs,
    results,
}

const reportDir = join(rootDir, 'reports')
await mkdir(reportDir, { recursive: true })
await writeFile(join(reportDir, 'mobile-lcp.json'), `${JSON.stringify(report, null, 2)}\n`)

console.log(`\nRapor: reports/mobile-lcp.json (${results.length} sayfa, sayfa başına ${runs} koşum, medyan alındı)`)
console.log(`Bütçe: LCP ≤ ${BUDGET.lcp} ms, CLS ≤ ${BUDGET.cls} — bütçeyi aşan: ${failures}`)

if (failures && strict) {
    console.error('Mobil performans bütçesi aşıldı.')
    process.exit(1)
}
