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

// WP3 (fableplan.md) — Odak Modu: dekoratif efektleri (parçacık, gece gökyüzü,
// glitch, 3D tilt, ambiyans sesi) SADECE CSS ile kapatan toggle. JS efekt
// kodlarına dokunulmadı — parçacık elemanı DOM'da kalır, sadece görünmez olur
// (bkz. src/focus-mode.css, TopicHeader.jsx `focus-mode-toggle`).
test.describe('WP3 — Odak Modu (Focus Mode) toggle', () => {
    test('/docker — odak modu açılınca parçacıklar gizlenir, reload sonrası kalıcı, tekrar basınca geri gelir', async ({ page }) => {
        test.setTimeout(60_000);
        await page.goto('/docker');
        await page.waitForSelector('h1', { timeout: 30_000 });

        // Başlangıçta odak modu kapalı olmalı (default focusMode='false').
        await expect(page.locator('html')).not.toHaveClass(/focus-mode/);
        const particle = page.locator('.dp-particle').first();
        await expect(particle).toBeVisible();

        const toggle = page.locator('[data-testid="focus-mode-toggle"]');
        await expect(toggle).toBeVisible();
        await expect(toggle).toBeEnabled();

        // Odak modunu aç.
        await toggle.click();
        await expect(page.locator('html')).toHaveClass(/focus-mode/);
        await expect(particle).toBeHidden();
        await expect.poll(() => page.evaluate(() => localStorage.getItem('focusMode'))).toBe('true');

        // Reload sonrası kalıcı olmalı.
        await page.reload();
        await page.waitForSelector('h1', { timeout: 30_000 });
        await expect(page.locator('html')).toHaveClass(/focus-mode/);
        await expect(page.locator('.dp-particle').first()).toBeHidden();

        // Tekrar basınca efektler geri gelmeli.
        await page.locator('[data-testid="focus-mode-toggle"]').click();
        await expect(page.locator('html')).not.toHaveClass(/focus-mode/);
        await expect(page.locator('.dp-particle').first()).toBeVisible();
        await expect.poll(() => page.evaluate(() => localStorage.getItem('focusMode'))).toBe('false');
    });

    // focus-mode.css, 23 sayfanın `*-effects.css` dosyasındaki `prefers-reduced-motion`
    // kurallarını mekanik olarak `:root.focus-mode` önekiyle mirror'lıyor (bkz.
    // NEXT_SESSION.md WP3 notu — 3 dosyada [docker, selenium, playwright] bir parser
    // hatasıyla kural sessizce düşmüştü). Docker dışında ikinci bir sayfada da
    // mekanizmanın çalıştığını doğrulamak, sayfaya-özel bir CSS regresyonunu yakalar.
    test('/selenium — odak modu diğer bir sayfada da parçacıkları ve ambiyans ses butonunu gizler', async ({ page }) => {
        test.setTimeout(60_000);
        await page.goto('/selenium');
        await page.waitForSelector('h1', { timeout: 30_000 });

        await expect(page.locator('html')).not.toHaveClass(/focus-mode/);
        const particle = page.locator('.se-particle').first();
        await expect(particle).toBeVisible();

        // Ambiyans ses butonu sadece light mode'da JS tarafından render edilir
        // (bkz. SeleniumPage.jsx `isLightMode ? <button data-testid="selenium-sound-toggle">`)
        // — anlamlı bir doğrulama için önce light mode'a geçilmeli.
        await page.locator('[data-testid="dark-mode-toggle"]').click();
        const soundToggle = page.locator('[data-testid="selenium-sound-toggle"]');
        await expect(soundToggle).toBeVisible();

        await page.locator('[data-testid="focus-mode-toggle"]').click();
        await expect(page.locator('html')).toHaveClass(/focus-mode/);
        await expect(particle).toBeHidden();
        await expect(soundToggle).toBeHidden();
    });
});
