import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { waitForAppReady } from './helpers/app-ready';

// ─────────────────────────────────────────────────────────────────────────────
// /claude-ai → "AI Vision: Visual Regression" — bakım durumu ile sıradan hata
// AYRI şeylerdir.
//
// ── NEDEN ───────────────────────────────────────────────────────────────────
// Groq hesabında görsel destekli model kalmadı (2026-08-29 ölçüldü), yani
// `visual-diff-judge` onarılabilir bir hata değil, kapalı bir yetenek. Eski
// arayüz her başarısızlıkta "Analiz yapılamadı, lütfen tekrar dene." diyordu:
// asla başarılı olmayacak bir şey için kullanıcıyı sonsuza kadar denemeye
// çağırıyordu.
//
// ── BU TEST NEYİ KANITLAR ───────────────────────────────────────────────────
// İki dal AYRI AYRI sabitlenir. Tek bir dalı sınamak yeterli değildi:
//   · yalnızca bakımı sınasaydık, "her hatayı bakım say" diye yazılmış bir
//     uygulama da geçerdi ve gerçek arızalar bakım gibi görünürdü;
//   · yalnızca hatayı sınasaydık, bakım dalının hiç çalışmaması fark edilmezdi.
// İkisi birlikte, ayrımın gerçekten yapıldığını kanıtlar.
//
// ⚠ Servis çalışanı BLOKLANIR: bu uygulama bir Service Worker kaydediyor ve
// `page.route` onun ele aldığı isteği KESEMEZ (sessizce eşleşmez).
// ─────────────────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;

const yapilandirilmis = Boolean(
    SUPABASE_URL && SUPABASE_ANON_KEY && TEST_USER_EMAIL && TEST_USER_PASSWORD &&
    !SUPABASE_URL.includes('YOUR_PROJECT_REF') && !SUPABASE_ANON_KEY.includes('xxxx'),
);

// 1x1 PNG — gerçek dosya içeriği gerekmiyor, yalnızca yükleme akışı tetiklenecek.
const PNG = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64',
);

test.describe('Visual diff — bakım ile hata birbirine karışmıyor', () => {
    test.skip(!yapilandirilmis, '.env.local içinde Supabase adresi/anahtarı veya test kullanıcısı eksik');
    test.skip(process.env.GITHUB_ACTIONS === 'true',
        'CI runner IP\'sinden bu Supabase projesinin auth yolu engelleniyor (altyapı kısıtlaması).');
    test.setTimeout(180_000);

    async function uyeSayfasiAc(browser: any, cevap: { status: number; body: unknown }) {
        const istemci = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
        const { data, error } = await istemci.auth.signInWithPassword({
            email: TEST_USER_EMAIL!, password: TEST_USER_PASSWORD!,
        });
        if (error || !data.session) throw new Error(`Giriş başarısız: ${error?.message ?? 'oturum yok'}`);
        const projeRef = new URL(SUPABASE_URL!).hostname.split('.')[0];

        const context = await browser.newContext({ serviceWorkers: 'block' });
        await context.addInitScript(([anahtar, oturumJson]) => {
            window.localStorage.setItem(anahtar as string, oturumJson as string);
        }, [`sb-${projeRef}-auth-token`, JSON.stringify(data.session)] as const);

        const page = await context.newPage();

        // Fonksiyon çağrısı ele geçirilir: gerçek Groq'a gitmeden istenen
        // cevabı döndürürüz. Kesicinin GERÇEKTEN ateşlendiği ayrıca sayılır —
        // hiç ateşlenmeyen bir kesici, testi sessizce yanlış tarafa baktırır.
        let kesildi = 0;
        await page.route((url) => url.pathname.endsWith('/functions/v1/visual-diff-judge'), async (route) => {
            kesildi += 1;
            await route.fulfill({
                status: cevap.status,
                contentType: 'application/json',
                body: JSON.stringify(cevap.body),
            });
        });

        await page.goto('/claude-ai');
        await waitForAppReady(page, { timeout: 60_000 });

        // Blok 13. sekmede; sekmeye adıyla gidiyoruz ki sıra değişirse test
        // "bulunamadı" desin, sessizce başka bir sekmeyi sınamasın.
        await page.getByRole('button', { name: /Visual Regression/i }).first().click();
        const blok = page.locator('[data-testid="visual-diff-detective-block"]');
        await expect(blok).toBeVisible({ timeout: 30_000 });

        // Üye olmadan canlı analiz hiç çağrılmaz; oturumun oturduğunu doğrula.
        await expect(blok).not.toContainText(/sadece üyeler|members-only/i);

        await blok.locator('[data-testid="visual-diff-upload-before"]')
            .setInputFiles({ name: 'once.png', mimeType: 'image/png', buffer: PNG });
        await blok.locator('[data-testid="visual-diff-upload-after"]')
            .setInputFiles({ name: 'sonra.png', mimeType: 'image/png', buffer: PNG });

        await blok.locator('[data-testid="visual-diff-analyze"]').click();
        return { context, page, blok, kesildiSayaci: () => kesildi };
    }

    test('bakım cevabı geldiğinde "tekrar dene" DEMEZ ve düğmeyi kapatır', async ({ browser }) => {
        const { context, blok, kesildiSayaci } = await uyeSayfasiAc(browser, {
            status: 503,
            body: { maintenance: true, error: 'Görsel analiz özelliği şu anda bakımda.' },
        });

        const bakim = blok.locator('[data-testid="visual-diff-bakim"]');
        await expect(bakim).toBeVisible({ timeout: 30_000 });
        await expect(bakim).toContainText(/bakımda/i);

        // Asıl vaat: kullanıcı boş yere tekrar denemeye çağrılmıyor.
        await expect(blok).not.toContainText(/tekrar dene/i);
        await expect(blok.locator('[data-testid="visual-diff-analyze"]')).toBeDisabled();

        expect(kesildiSayaci(), 'fonksiyon çağrısı hiç kesilmedi — test yanlış tarafa bakıyor')
            .toBeGreaterThan(0);
        await context.close();
    });

    test('sıradan hata bakım sayılmaz — "tekrar dene" mesajı korunur', async ({ browser }) => {
        const { context, blok, kesildiSayaci } = await uyeSayfasiAc(browser, {
            status: 500,
            body: { error: 'AI servisinden yanıt alınamadı (HTTP 500)' },
        });

        // Geçici bir arızada tekrar denemek MANTIKLI; o mesaj kaybolmamalı.
        await expect(blok).toContainText(/tekrar dene/i, { timeout: 30_000 });
        await expect(blok.locator('[data-testid="visual-diff-bakim"]')).toHaveCount(0);
        await expect(blok.locator('[data-testid="visual-diff-analyze"]')).toBeEnabled();

        expect(kesildiSayaci(), 'fonksiyon çağrısı hiç kesilmedi — test yanlış tarafa bakıyor')
            .toBeGreaterThan(0);
        await context.close();
    });
});
