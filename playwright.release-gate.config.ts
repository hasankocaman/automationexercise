import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

// Ayrı config: tests-release-gate/ — DEPLOY.md §9'daki elle koşulan yayın öncesi
// doğrulamaların (A1/A5/A6/A7/A8/D3/F1/F2) otomatik karşılığı. Diğer suite'lerden
// farkı: gerçek `dist/` çıktısına karşı, GERÇEK bir HTTP sunucusu (vite preview)
// üzerinden koşar — `npm run dev` bunu YAPAMAZ (statik shell servis etmez) ve
// `readFile('dist/...')` ile dosya okuyan testler (seo-phase2-coverage.spec.ts)
// sunucunun HTTP davranışını (örn. trailing-slash çözümü) test etmez. Bu suite
// tam olarak o katmanı test eder — DEPLOY.md'nin kendi doğrulama komutlarının
// yanlış çalıştığı bir durum (`vite preview`'ın sondaki `/` olmadan alt route'ları
// çözememesi) bu yüzden yalnızca burada, gerçek sunucuya karşı yakalanabilirdi.
//
// `pretest:release-gate` (package.json) önce TAM bir `npm run build` koşturur —
// bu suite'in amacı gerçekten yayınlanacak dist'i doğrulamak, eski/yarım bir
// build'i değil. `reuseExistingServer: false` bilinçlidir: bu bir "yayın kapısı",
// arkada unutulmuş eski bir preview sunucusuna güvenmemeli. Ayrı port (4174)
// kullanılır ki kullanıcının kendi elle açtığı `npm run preview` (4173) ile
// çakışmasın. Çalıştırmak için: npm run test:release-gate
if (existsSync('.env.local')) {
    process.loadEnvFile('.env.local');
}

export default defineConfig({
    testDir: './tests-release-gate',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 2 : 4,
    reporter: 'list',
    use: {
        baseURL: 'http://localhost:4174',
        trace: 'on-first-retry',
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ],
    webServer: {
        command: 'npx vite preview --port 4174 --strictPort',
        url: 'http://localhost:4174/',
        reuseExistingServer: false,
        timeout: 30_000,
    },
});
