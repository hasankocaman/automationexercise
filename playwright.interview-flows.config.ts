import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

// Ayrı config: tests-extended/ altındaki "her mülakat sayfası" akış testleri
// ana post-commit suite'in (playwright.config.ts → tests/) parçası DEĞİLDİR —
// her biri gerçek bir Groq AI çağrısı yapar, 18 sayfa × ~birkaç saniye sürer.
// Çalıştırmak için: npm run test:interview-flows
if (existsSync('.env.local')) {
    process.loadEnvFile('.env.local');
}

export default defineConfig({
    testDir: './tests-extended',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: 1,
    // workers: 1 — her test gerçek bir Groq AI çağrısı yapıyor; paralel çalıştırmak
    // dakikalık rate limit'i (502) tetikliyor ve aynı anda çok sayıda Chromium +
    // dev server CPU rekabeti yaratıp ilgisiz zaman aşımlarına yol açıyor.
    workers: 1,
    reporter: 'list',
    use: {
        baseURL: 'http://localhost:5173',
        trace: 'on-first-retry',
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ],
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI,
    },
});
