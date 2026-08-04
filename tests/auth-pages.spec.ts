import { test, expect } from '@playwright/test';

// Giriş sayfası ve oturum koruması.
//
// Bu iki adres uzun süre HİÇBİR testte geçmiyordu — kapsam raporu onları
// "testi olmayan sayfa" olarak işaretledi. Oysa ikisi de sessizce bozulabilecek
// yerler: `/login` sitenin tek kimlik doğrulama girişi, `/qa-assistant` ise
// yalnızca üyelere açık olması GEREKEN bir sayfa. Korumanın kalkması hiçbir
// hata üretmez, sadece sayfa herkese açılır — yani ancak açıkça test edilirse
// fark edilir.
//
// Hiçbiri gerçek bir oturum açmaz: anonim ziyaretçinin gördüğü hâl test edilir.
// Bu bilinçli — canlı kimlik doğrulama gerektiren testler CI'da çalışmıyor
// (paylaşımlı IP'den gelen istekler reddediliyor), bu suite ise her yerde
// çalışmak zorunda.

// Test ortamında dışarı ağ erişimi kısıtlı olduğu için beklenen hata kalıpları
// (topic-pages-ui.spec.ts ile aynı gerekçe).
const ALLOWED_CONSOLE_ERROR_PATTERNS = [/net::ERR_/i, /supabase/i, /Failed to fetch/i, /Load failed/i];

function collectErrors(page: import('@playwright/test').Page): string[] {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (msg) => {
        if (msg.type() === 'error' && !ALLOWED_CONSOLE_ERROR_PATTERNS.some((re) => re.test(msg.text()))) {
            errors.push(msg.text());
        }
    });
    return errors;
}

test.describe('/login — giriş sayfası (anonim ziyaretçi)', () => {
    test('TR: başlık, e-posta alanı ve gönder butonu çalışır durumda', async ({ page }) => {
        const errors = collectErrors(page);
        await page.goto('/login');

        await expect(page.getByRole('heading', { name: /Giriş yap veya kayıt ol/i }))
            .toBeVisible({ timeout: 20_000 });

        // Kullanıcının gerçekten giriş yapabilmesi için gereken asgari üçlü:
        // bir e-posta alanı, bir gönderme butonu ve butonun tıklanabilir olması.
        const email = page.locator('input[type="email"]');
        await expect(email).toBeVisible();
        await expect(email).toHaveAttribute('required', '');

        const submit = page.getByRole('button', { name: /Magic Link ile kayıt ol/i });
        await expect(submit).toBeVisible();
        await expect(submit).toBeEnabled();

        // Sosyal giriş seçenekleri de görünür olmalı — tek giriş yolu kalırsa
        // (örn. sağlayıcı listesi boş render edilirse) kimse giremez.
        const providerButtons = page.locator('section button[type="button"]');
        expect(await providerButtons.count(), 'sosyal giriş butonu yok').toBeGreaterThan(0);

        expect(errors, '/login: console/page hataları').toHaveLength(0);
    });

    test('EN: aynı sayfa İngilizce açılır', async ({ page }) => {
        await page.goto('/en/login');
        await expect(page.getByRole('heading', { name: /Sign in or sign up/i }))
            .toBeVisible({ timeout: 20_000 });
        await expect(page.locator('input[type="email"]')).toBeVisible();
    });

    test('e-posta alanı doldurulabilir (form gerçekten etkileşimli)', async ({ page }) => {
        await page.goto('/login');
        const email = page.locator('input[type="email"]');
        await expect(email).toBeVisible({ timeout: 20_000 });
        await email.fill('ada@example.com');
        await expect(email).toHaveValue('ada@example.com');
    });
});

test.describe('/qa-assistant — oturum koruması', () => {
    test('anonim ziyaretçi giriş sayfasına yönlendirilir', async ({ page }) => {
        await page.goto('/qa-assistant');

        // Koruma kalkarsa bu bekleyiş zaman aşımına uğrar — sayfa açık kalmış
        // demektir. Testin asıl değeri bu: "açılmaması gerekiyordu" durumu
        // hiçbir hata mesajı üretmez.
        await expect(page).toHaveURL(/\/login/, { timeout: 20_000 });

        // Yönlendirme kullanıcıyı nereye dönmesi gerektiğini unutturmamalı.
        expect(page.url()).toContain('next=');
        expect(decodeURIComponent(page.url())).toContain('/qa-assistant');

        // Çıkmaz sokağa düşmemeli: giriş sayfası gerçekten render olmalı.
        await expect(page.getByRole('heading', { name: /Giriş yap veya kayıt ol/i })).toBeVisible();
    });

    test('EN oturumunda da korunur ve EN giriş sayfasına düşer', async ({ page }) => {
        await page.goto('/en/qa-assistant');
        await expect(page).toHaveURL(/\/en\/login/, { timeout: 20_000 });
        await expect(page.getByRole('heading', { name: /Sign in or sign up/i })).toBeVisible();
    });
});
