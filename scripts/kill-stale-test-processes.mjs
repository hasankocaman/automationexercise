// Windows disi platformlarda (CI/Linux/macOS) sessizce no-op olan cross-platform
// sarmalayici. Gercek tespit/sonlandirma mantigi kill-stale-test-processes.ps1'de.
// npm'in pretest:e2e / pretest:interview-flows / pretest:quiz-audit kancalari
// tarafindan HER Playwright test kosumundan once otomatik cagrilir (package.json).
//
// Bilerek asla testleri ENGELLEMEZ: temizlik scripti hata verse veya
// PowerShell bulunamasa bile HER ZAMAN 0 ile cikar.
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

if (process.platform !== 'win32') {
  console.log('[kill-stale] Windows dışı platform — temizlik atlandı.')
  process.exit(0)
}

const scriptPath = path.join(__dirname, 'kill-stale-test-processes.ps1')

try {
  execFileSync(
    'powershell.exe',
    ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', scriptPath],
    { stdio: 'inherit' }
  )
} catch (err) {
  console.warn('[kill-stale] Temizlik scripti hata verdi, testler yine de devam edecek:', err.message)
}

process.exit(0)
