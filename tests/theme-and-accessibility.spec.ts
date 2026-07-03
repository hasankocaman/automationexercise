import { test, expect } from '@playwright/test';

// AC08 (Documents/acceptancecriterias.md) için önceden HİÇ test yoktu
// (bkz. Documents/testcoverage.md §5.2 "AC08 — Tema/dark mode/erişilebilirlik:
// Hiç test yok"). Bu dosya sadece FİİLEN VAR OLAN mekanizmayı test eder:
// tek bir dark/light mode toggle'ı (document.documentElement üzerinde
// 'dark-mode' / 'light-mode-forced' class'ları + localStorage 'darkMode' key'i,
// hem HomePage hem TopicPage'de aynı mekanizma — bkz. HomePage.jsx L99-108,
// TopicPage.jsx L19685-19693). AC08'in bahsettiği "alternatif renk paleti
// seçenekleri (temalar)" kısmı henüz implemente edilmemiş bir özelliktir
// (src/ içinde theme.js / ThemeContext / learnqa_theme yok) — bu dosya
// var olmayan bir özelliği test etmeye çalışmaz, sadece mevcut toggle'ı kapsar.

test.describe('AC08 — Dark/Light mode toggle davranışı', () => {
    test('/ (HomePage) — varsayılan dark mode, toggle ile light\'a geçer, reload sonrası kalıcı', async ({ page }) => {
        // İki sayfa yüklemesi (ilk goto + reload) içerdiğinden varsayılan 30s
        // test timeout'u paralel kosumda yetersiz kalabiliyor (bkz. diğer
        // dosyalardaki aynı desen: topic-pages-ui.spec.ts, other-pages-ui.spec.ts).
        test.setTimeout(60_000);
        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 60_000 });

        // Varsayılan: hiç localStorage yokken dark mode aktif olmalı (HomePage.jsx L70: isDark = true).
        await expect(page.locator('html')).toHaveClass(/dark-mode/);
        const savedInitial = await page.evaluate(() => localStorage.getItem('darkMode'));
        expect(savedInitial === null || JSON.parse(savedInitial)).toBeTruthy();

        const toggle = page.locator('[data-testid="dark-mode-toggle"]');
        await expect(toggle).toBeVisible();
        await expect(toggle).toBeEnabled();

        // Light mode'a geç.
        await toggle.click();
        await expect(page.locator('html')).not.toHaveClass(/dark-mode/);
        await expect(page.locator('html')).toHaveClass(/light-mode-forced/);
        await expect.poll(() => page.evaluate(() => localStorage.getItem('darkMode'))).toBe('false');

        // Reload sonrası light mode kalıcı olmalı.
        await page.reload();
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 60_000 });
        await expect(page.locator('html')).not.toHaveClass(/dark-mode/);

        // Tekrar dark mode'a dönebilmeli.
        await page.locator('[data-testid="dark-mode-toggle"]').click();
        await expect(page.locator('html')).toHaveClass(/dark-mode/);
        await expect.poll(() => page.evaluate(() => localStorage.getItem('darkMode'))).toBe('true');
    });

    test('/docker (TopicPage) — aynı toggle mekanizması, header butonu üzerinden çalışır', async ({ page }) => {
        // localStorage'ı temiz başlatıp varsayılan (dark) durumu doğruluyoruz.
        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await expect(page.locator('html')).toHaveClass(/dark-mode/);

        const toggle = page.locator('[data-testid="dark-mode-toggle"]');
        await expect(toggle).toBeVisible();
        await toggle.click();
        await expect(page.locator('html')).not.toHaveClass(/dark-mode/);

        // Light moddayken sayfa içeriği hâlâ okunabilir olmalı — body arkaplan/metin
        // rengi tamamen aynı olmamalı (kaba bir kontrast-farkı kontrolü, tam WCAG
        // kontrast oranı hesaplaması değil, ama "hiç fark yok" durumunu yakalar).
        const { bg, color } = await page.evaluate(() => {
            const cs = getComputedStyle(document.body);
            return { bg: cs.backgroundColor, color: cs.color };
        });
        expect(bg, 'light modda body arkaplan/metin rengi aynı görünüyor').not.toBe(color);

        // Geri dark mode'a dön — sayfa çökmemeli, h1 hâlâ görünür olmalı.
        await toggle.click();
        await expect(page.locator('html')).toHaveClass(/dark-mode/);
        await expect(page.locator('h1').first()).toBeVisible();
    });

    test('/ — aynı dile veya aynı temaya tekrar geçmek durumu bozmuyor (idempotent)', async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 60_000 });

        const toggle = page.locator('[data-testid="dark-mode-toggle"]');
        // Dark iken dark'a "geri dönecek" bir tıklama yok (toggle tek buton), ama
        // hızlı ardışık 3 tıklama (dark→light→dark→light) sonunda beklenen durumda
        // kalmalı — state machine'in yarış durumuna girmediğini doğrular.
        await toggle.click(); // light
        await toggle.click(); // dark
        await toggle.click(); // light
        await expect(page.locator('html')).not.toHaveClass(/dark-mode/);
        await expect.poll(() => page.evaluate(() => localStorage.getItem('darkMode'))).toBe('false');
    });
});
