import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

// Ayrı config: tests-cross-browser/ — Documents/sprint-simulator-and-open-items-plan.md
// §6.3 (S4.2). Ana `npm run test:e2e` YALNIZCA chromium'da koşar (playwright.config.ts);
// bu, projedeki 31+ dosyanın TAMAMINI bir de Firefox/WebKit altında koşturmak CI süresini
// katlar ve çoğu kontrol tarayıcıdan bağımsızdır (React SPA + Tailwind). Bunun yerine
// CLAUDE.md §22'deki "temsili sayfa" mantığıyla AYRI, küçük bir dosyaya (ana sayfa + /docker)
// SADECE Firefox/WebKit'te koşulur. Çalıştırmak için: npm run test:cross-browser
if (existsSync('.env.local')) {
    process.loadEnvFile('.env.local');
}

export default defineConfig({
    testDir: './tests-cross-browser',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'list',
    use: {
        baseURL: 'http://localhost:5173',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    projects: [
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    ],
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI,
    },
});
