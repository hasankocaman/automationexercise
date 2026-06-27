import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

// Ayrı config: tests-quiz-audit/ — projedeki HER quiz bloğunu (AC02 retry +
// AC03 dil doğruluğu) tek tek doğrulayan kapsamlı denetim. Gerçek AI çağrısı
// YOK (tamamen yerel/maliyetsiz) ama 340+ quiz bloğu × birden çok DOM
// etkileşimi olduğu için post-commit hook'a (./tests) bağlanmadı — süre
// post-commit'i anlamsız şekilde uzatır. Çalıştırmak için: npm run test:quiz-audit
if (existsSync('.env.local')) {
    process.loadEnvFile('.env.local');
}

export default defineConfig({
    testDir: './tests-quiz-audit',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 2 : 4,
    reporter: 'list',
    timeout: 600_000,
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
