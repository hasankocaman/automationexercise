# Onceki oturumlardan kalma zombi node/vite/playwright surecleri temizler.
# npm'in pretest:e2e kancasi tarafindan HER `npm run test:e2e` cagrisindan once
# otomatik calistirilir (bkz. scripts/kill-stale-test-processes.mjs + package.json).
#
# Neden gerekli: onceki bir oturumdan duzgun kapanmadan kalan `npm run dev` /
# `npm run test:e2e` / Playwright test-server surecleri, yeni bir test kosumuyla
# ayni CPU/tarayici kaynaklarini paylasip cekisiyor ve rastgele, gittikce kotulesen
# zaman asimi hatalarina (topic-pages-ui.spec.ts'teki agir sayfalarda) yol aciyordu
# (2026-07-21, gercek olayda teyit edildi: 36 saatlik zombi test:e2e/dev sureci).
#
# Guvenlik kurallari (bilerek agresif DEGIL):
# - Sadece bu projenin ("automationexercise") kendi node sureclerini hedefler.
# - Sadece playwright/vite/npm-run-dev/test:e2e/test-server komut satirina sahip
#   surecleri hedefler — baska hicbir node sureci ELLENMEZ.
# - 5 dakikadan daha yeni surecler DOKUNULMADAN atlanir (yanlislikla az once
#   baslatilmis mesru bir kosumu oldurmemek icin).
# - Bir dev server (vite) ise ve suanda ONA bagli aktif (ESTABLISHED) bir tarayici
#   baglantisi varsa DOKUNULMAZ — kullanici o an gercekten izliyor olabilir.
# - Kendi kendine bir engelleyici degildir: hata alsa bile HER ZAMAN 0 ile cikar,
#   testlerin devam etmesini engellemez (bkz. .mjs sarmalayici).

$ErrorActionPreference = 'Stop'

$patternRegex = 'playwright|vite\.js|npm-cli\.js run dev|npm-cli\.js run test:e2e|test-server'

Write-Host "[kill-stale] Onceki oturumlardan kalma zombi node/vite/playwright surecleri taraniyor..."

$candidates = Get-CimInstance Win32_Process -Filter "Name='node.exe'" -ErrorAction SilentlyContinue | Where-Object {
    $_.CommandLine -and ($_.CommandLine -match 'automationexercise') -and ($_.CommandLine -match $patternRegex)
}

if (-not $candidates) {
    Write-Host "[kill-stale] Temiz - zombi surec bulunamadi."
    exit 0
}

$now = Get-Date
$killed = @()
$skipped = @()

foreach ($p in $candidates) {
    $ageMin = [math]::Round(($now - $p.CreationDate).TotalMinutes, 1)

    if ($ageMin -lt 5) {
        $skipped += "PID $($p.ProcessId) (yeni, $ageMin dk) - az once baslamis, dokunulmadi"
        continue
    }

    $listenPorts = Get-NetTCPConnection -State Listen -OwningProcess $p.ProcessId -ErrorAction SilentlyContinue
    $hasActiveClient = $false
    foreach ($lp in $listenPorts) {
        $active = Get-NetTCPConnection -State Established -ErrorAction SilentlyContinue |
            Where-Object { $_.LocalPort -eq $lp.LocalPort }
        if ($active) { $hasActiveClient = $true }
    }
    if ($hasActiveClient) {
        $skipped += "PID $($p.ProcessId) ($ageMin dk) - aktif tarayici baglantisi var, DOKUNULMADI"
        continue
    }

    try {
        Stop-Process -Id $p.ProcessId -Force -ErrorAction Stop
        $shortCmd = $p.CommandLine.Substring(0, [Math]::Min(90, $p.CommandLine.Length))
        $killed += "PID $($p.ProcessId) ($ageMin dk) sonlandirildi: $shortCmd"
    } catch {
        $skipped += "PID $($p.ProcessId) - sonlandirilamadi: $($_.Exception.Message)"
    }
}

if ($killed.Count -gt 0) {
    Write-Host "[kill-stale] Sonlandirilan zombi surecler:"
    $killed | ForEach-Object { Write-Host "  - $_" }
}
if ($skipped.Count -gt 0) {
    Write-Host "[kill-stale] Atlanan surecler:"
    $skipped | ForEach-Object { Write-Host "  - $_" }
}

exit 0
