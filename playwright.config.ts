import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

// .env.local'daki VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY / TEST_USER_EMAIL /
// TEST_USER_PASSWORD değerlerini process.env'e yükler (Node 20.6+ native API).
// CI ortamında .env.local yoksa secrets zaten process.env üzerinden gelir.
if (existsSync('.env.local')) {
    process.loadEnvFile('.env.local');
}

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:5173',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI,
    },
});
