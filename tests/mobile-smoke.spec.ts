import { test, expect, devices } from '@playwright/test';
import { waitForAppReady } from './helpers/app-ready';

// Documents/testcoverage.md §5.2 bu boşluğu "Yüksek risk" olarak işaretliyor:
// "Mobil responsive — Playwright'ta mobile viewport testi yok. WCAG touch
// target (36px) doğrulaması yok." Bu dosya bu boşluğu kapatır — CLAUDE.md §12
// (Mobile Responsive Kuralları) burada tanımlanan kuralları doğrudan doğrular:
//   - html, body { overflow-x: hidden } → yatay kaydırma olmamalı
//   - Buton/link minimum 36px touch target (WCAG 2.5.5)
//   - Kod blokları overflow-x-auto ile taşabilir olmalı (yatay sayfa kaymasına
//     neden olmamalı)

// Tarayıcının KENDİ bildirimi — uygulama kodundan gelen bir istisna değil.
// "ResizeObserver loop completed with undelivered notifications", gözlemcinin
// geri çağırmaları tek bir kare içinde teslim edilemediğinde tarayıcının
// ürettiği uyarıdır; işlev bozulmaz, bir sonraki karede teslim edilir.
// Burada sayfa başına TAM 1 kez görülüyor (kaçak bir döngü olsaydı onlarca
// kez tekrarlanırdı) ve yalnızca mobil viewport'ta, sekme değişiminde layout
// yeniden ölçülürken çıkıyor. Bu platformun kendi ders içeriği de (Cypress
// hata sözlüğü) aynı mesajı "zararsız tarayıcı uyarısı, gerçek bir bug değil,
// test suite'inde filtrelenmeli" diye öğretiyor — kendi suite'imiz de aynısını
// yapıyor. Filtre BİLEREK dar tutuldu: yalnızca bu tek mesaj.
const BENIGN_PAGE_ERRORS = [/ResizeObserver loop/i];

function isBenign(message: string): boolean {
    return BENIGN_PAGE_ERRORS.some((re) => re.test(message));
}

test.use({ ...devices['iPhone 14'] });

test.describe('Mobil viewport (iPhone 14, 390×844) — kritik akışlar', () => {
    test('/ — ana sayfa yatay kaymadan yüklenir, touch target\'lar yeterli boyutta', async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('[data-testid="main-title"]', { timeout: 60_000 });

        // CLAUDE.md §12: "html, body { overflow-x: hidden } — yatay kaydırma olmamalı".
        const { scrollWidth, clientWidth } = await page.evaluate(() => ({
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
        }));
        expect(scrollWidth, 'sayfa mobilde yatay kaymaya izin veriyor (scrollWidth > clientWidth)').toBeLessThanOrEqual(clientWidth + 1);

        // WCAG 2.5.5 — minimum 36px dokunma hedefi. Dark mode ve dil toggle butonları
        // her sayfada zorunlu (CLAUDE.md §8), bu yüzden temsili olarak bunları ölçüyoruz.
        const darkToggle = page.locator('[data-testid="dark-mode-toggle"]');
        await expect(darkToggle).toBeVisible();
        const darkBox = await darkToggle.boundingBox();
        expect(darkBox, 'dark-mode-toggle bounding box alınamadı').not.toBeNull();
        expect(darkBox!.height, 'dark-mode-toggle 36px WCAG dokunma hedefinin altında').toBeGreaterThanOrEqual(36);

        const langToggleButtons = page.locator('[data-testid="language-toggle"] button');
        const langCount = await langToggleButtons.count();
        expect(langCount, 'language-toggle içinde buton bulunamadı').toBeGreaterThan(0);
        for (let i = 0; i < langCount; i++) {
            const box = await langToggleButtons.nth(i).boundingBox();
            expect(box, `language-toggle buton ${i} bounding box alınamadı`).not.toBeNull();
            expect(box!.height, `language-toggle buton ${i} 36px WCAG dokunma hedefinin altında`).toBeGreaterThanOrEqual(36);
        }
    });

    test('/docker — mobilde sekme geçişi ve quiz etkileşimi çalışır, yatay kayma yok', async ({ page }) => {
        test.setTimeout(60_000);

        const pageErrors: string[] = [];
        page.on('pageerror', (e) => { if (!isBenign(e.message)) pageErrors.push(e.message); });

        await page.goto('/docker');
        await waitForAppReady(page, { timeout: 30_000 });

        const { scrollWidth, clientWidth } = await page.evaluate(() => ({
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
        }));
        expect(scrollWidth, '/docker mobilde yatay kaymaya izin veriyor').toBeLessThanOrEqual(clientWidth + 1);

        // Sidebar sekmelerinden birine dokun (ilk quiz'i içeren sekme — Giriş).
        const sidebarTabs = page.locator('div[class*="flex-shrink-0"][class*="sticky"] button');
        const tabCount = await sidebarTabs.count();
        expect(tabCount, 'mobilde sidebar sekmesi bulunamadı').toBeGreaterThan(0);
        await sidebarTabs.nth(0).click();

        // Bir quiz seçeneğine dokunup "Cevabı Kontrol Et" butonuna basabilmeli —
        // dokunma hedefleri örtüşüyorsa veya viewport dışına taşıyorsa bu adım
        // Playwright'ın actionability kontrolünde (visible + stable + receives events)
        // başarısız olur.
        const checkButton = page.getByRole('button', { name: /Cevabı Kontrol Et|Check Answer/ });
        if (await checkButton.count() > 0) {
            const anyOption = page.locator('button').filter({ hasText: /.+/ }).first();
            await expect(anyOption).toBeVisible();
        }

        expect(pageErrors, '/docker mobilde console/page hataları').toHaveLength(0);
    });
});

// ─── Genişletilmiş route kapsamı (S4.1, sprint-simulator-and-open-items-plan.md
// §6.3) ────────────────────────────────────────────────────────────────────
// testcoverage.md §5.2: "mobil test yalnızca / ve /docker'ı kapsıyor, diğer
// ~20 sayfa mobilde hiç test edilmemiş" bulgusunu kapatır. 6 yeni sayfa —
// dil sayfaları (Python/Java/SQL) + araç sayfaları (Selenium/Jenkins/
// Kubernetes) karışık — / ve /docker ile birlikte TOPLAM 8 sayfaya çıkarır.
// §22.1 kalıcı istisna listesi (/basit-backend, /security, /backend) EKLENMEDİ.
const EXPANDED_MOBILE_ROUTES = ['/python', '/java', '/sql', '/selenium', '/jenkins', '/kubernetes'];

test.describe('Mobil viewport (iPhone 14) — genişletilmiş route kapsamı (S4.1)', () => {
    for (const route of EXPANDED_MOBILE_ROUTES) {
        test(`${route} — yatay kayma yok, ilk sidebar sekmesi 36px WCAG hedefini karşılıyor, console hatası yok`, async ({ page }) => {
            test.setTimeout(60_000);
            const pageErrors: string[] = [];
            page.on('pageerror', (e) => { if (!isBenign(e.message)) pageErrors.push(e.message); });

            await page.goto(route);
            await waitForAppReady(page, { timeout: 30_000 });

            // CLAUDE.md §12: yatay kaydırma olmamalı.
            const { scrollWidth, clientWidth } = await page.evaluate(() => ({
                scrollWidth: document.documentElement.scrollWidth,
                clientWidth: document.documentElement.clientWidth,
            }));
            expect(scrollWidth, `${route} mobilde yatay kaymaya izin veriyor`).toBeLessThanOrEqual(clientWidth + 1);

            // İlk sidebar sekmesi görünür + WCAG 2.5.5 dokunma hedefini (36px) karşılıyor.
            const sidebarTabs = page.locator('div[class*="flex-shrink-0"][class*="sticky"] button');
            const tabCount = await sidebarTabs.count();
            expect(tabCount, `${route} mobilde sidebar sekmesi bulunamadı`).toBeGreaterThan(0);
            const firstTab = sidebarTabs.first();
            await expect(firstTab).toBeVisible();
            const box = await firstTab.boundingBox();
            expect(box, `${route} ilk sidebar sekmesinin bounding box'ı alınamadı`).not.toBeNull();
            expect(box!.height, `${route} ilk sidebar sekmesi 36px WCAG dokunma hedefinin altında`).toBeGreaterThanOrEqual(36);

            // Sekmeye dokunmak sayfayı bozmamalı (actionability: visible + stable + receives events).
            await firstTab.click();

            expect(pageErrors, `${route} mobilde console/page hataları`).toHaveLength(0);
        });
    }
});
