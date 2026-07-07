import { test, expect } from '@playwright/test';

// TopicPage tabanlı (sol dikey sidebar + sekmeler) herkese açık route'lar.
// Admin/login gerektiren route'lar (/security, /backend, /qa-assistant), özel
// layout'a sahip sayfalar (/, /java-document, /git-document, /leaderboard,
// /verify-certificate/:id) ve tek-sayfa/scroll-spy navigasyonu kullanan sayfalar
// (/manual-testing, /algorithms, /advanced-algorithms, /qa-mentor — bunlar TopicPage
// kullanmaz, tüm içerik aynı anda render olur) burada YOK — onlar other-pages-ui.spec.ts'de.
// /basit-backend de YOK — CLAUDE.md §22.1 gereği kalıcı olarak hiçbir otomatik
// test suite'ine dahil edilmiyor.
// Yeni bir TopicPage route'u eklenirse buraya da eklenmeli (bkz. CLAUDE.md Bölüm 2).
const TOPIC_ROUTES = [
    '/jmeter', '/sql', '/typescript', '/javascript', '/python', '/test-frameworks',
    '/postman', '/bruno', '/jenkins', '/docker', '/rest-assured', '/kubernetes',
    '/kafka', '/appium', '/playwright', '/cypress', '/selenium', '/aws', '/azure',
    '/browserstack', '/git-github', '/linux', '/java', '/what-is-testing',
    '/claude-ai',
];

// Test ortamında dışarıya ağ bağlantısı olmadığı için oluşan bilinen hata kalıpları.
// Örn. /playwright sayfasındaki Supabase AiExplanationPanel, test ortamında
// net::ERR_FAILED alır — bu uygulama hatası değil, ağ erişim kısıtlamasıdır.
const ALLOWED_CONSOLE_ERROR_PATTERNS = [
    /net::ERR_/i,
    /supabase/i,
    /Failed to fetch/i,
    /Load failed/i,
];

function isAllowedError(msg: string): boolean {
    return ALLOWED_CONSOLE_ERROR_PATTERNS.some((re) => re.test(msg));
}

// Sidebar genişliği sayfaya göre değişebilir (w-52 / w-56 vb.) — ortak özellik
// flex-shrink-0 + sticky olması (bkz. TopicPage.jsx ve TestFrameworksPage.jsx).
const SIDEBAR_TAB_BUTTONS = 'div[class*="flex-shrink-0"][class*="sticky"] button';
// :visible — bazı butonlar bilinçli olarak md:hidden (mobil-only toggle vb.);
// masaüstü viewport'ta gizli olmaları beklenen davranış, bug değil.
const CONTENT_BUTTONS = 'div[class*="flex-shrink-0"][class*="sticky"] + div button:visible';
// "Cannot read properties", "something went wrong" gibi genel ifadeler kasıtlı
// olarak YOK — error-dictionary block'ları gerçek hata mesajı örnekleri içerir
// (örn. cypressData.js) ve bunlar gerçek crash değildir. Gerçek render hataları
// zaten page/console error listener'larıyla (pageErrors) yakalanıyor; burada sadece
// herhangi bir exception fırlatmadan sessizce yanlış render olan, çok spesifik
// "[object Object]" stringification belirtisini kontrol ediyoruz.
const CRASH_MARKERS = ['[object Object]'];

for (const route of TOPIC_ROUTES) {
    test(`${route} — her sekme render olur, içerik butonları görünür`, async ({ page }) => {
        test.setTimeout(180_000);

        const pageErrors: string[] = [];
        page.on('pageerror', (e) => pageErrors.push(e.message));
        page.on('console', (msg) => {
            if (msg.type() === 'error' && !isAllowedError(msg.text())) {
                pageErrors.push(msg.text());
            }
        });

        await page.goto(route);
        await page.waitForSelector('h1', { timeout: 30_000 });

        const tabButtons = page.locator(SIDEBAR_TAB_BUTTONS);
        const tabCount = await tabButtons.count();
        expect(tabCount, `${route}: sidebar sekmesi bulunamadı`).toBeGreaterThan(0);

        // Sekme başlıkları `title` attribute'unda temiz (ikon/kilit eklentisiz)
        // haliyle duruyor — sekme sayfaya AÇILMADAN ÖNCE, sabit bir referans
        // olarak topluca okunuyor (AC 11: sekme alt gezinme doğruluğu).
        const tabTitles: string[] = [];
        for (let i = 0; i < tabCount; i++) {
            tabTitles.push(((await tabButtons.nth(i).getAttribute('title')) || '').trim());
        }

        const disabledButtonsFound: string[] = [];

        for (let i = 0; i < tabCount; i++) {
            // Sekme butonunun kendisi görünür ve tıklanabilir olmalı.
            const tabButton = tabButtons.nth(i);
            await expect(tabButton, `${route} sekme ${i}: sekme butonu görünür değil`).toBeVisible();
            await expect(tabButton, `${route} sekme ${i}: sekme butonu disabled`).toBeEnabled();
            await tabButton.click();
            await page.waitForTimeout(300);

            const bodyText = await page.locator('body').innerText();
            const hasCrash = CRASH_MARKERS.some((needle) => bodyText.includes(needle));
            expect(hasCrash, `${route} sekme ${i}: render hatası tespit edildi`).toBe(false);

            // AC 11 — Sekme alt gezinme (prev/next) doğruluğu: footer'daki
            // "← Önceki" / "Sonraki →" butonları GERÇEK komşu sekmenin adını
            // göstermeli ve asla birbirinin AYNISI olmamalı (bkz. 2026-07-05
            // /docker'da bildirilen "her zaman Image'lar yazıyor" raporu).
            const prevBtn = page.getByTestId('tab-nav-prev');
            const nextBtn = page.getByTestId('tab-nav-next');
            const hasPrev = i > 0;
            const hasNext = i < tabCount - 1;
            let prevText = '';
            let nextText = '';
            if (hasPrev) {
                await expect(prevBtn, `${route} sekme ${i}: prev butonu görünmüyor`).toBeVisible();
                prevText = (await prevBtn.innerText()).trim();
                expect(prevText, `${route} sekme ${i}: prev butonu "${tabTitles[i - 1]}" içermeli, "${prevText}" bulundu`)
                    .toContain(tabTitles[i - 1]);
            } else {
                await expect(prevBtn, `${route} sekme ${i} (ilk sekme): prev butonu görünmemeli`).toHaveCount(0);
            }
            if (hasNext) {
                await expect(nextBtn, `${route} sekme ${i}: next butonu görünmüyor`).toBeVisible();
                nextText = (await nextBtn.innerText()).trim();
                expect(nextText, `${route} sekme ${i}: next butonu "${tabTitles[i + 1]}" içermeli, "${nextText}" bulundu`)
                    .toContain(tabTitles[i + 1]);
            } else {
                await expect(nextBtn, `${route} sekme ${i} (son sekme): next butonu görünmemeli`).toHaveCount(0);
            }
            if (hasPrev && hasNext) {
                expect(prevText, `${route} sekme ${i}: prev ve next butonu AYNI metni gösteriyor ("${prevText}")`)
                    .not.toBe(nextText);
            }

            // İçerik alanındaki butonlar görünür olmalı. Enabled durumu burada hard-fail
            // yapmıyoruz: birçok aksiyon butonu (AI değerlendir, mesaj gönder vb.) kasıtlı
            // olarak boş input/precondition'a kadar disabled kalır — bu bir bug değil.
            // Disabled bulunanlar test raporuna bilgi amaçlı eklenir.
            const contentButtons = page.locator(CONTENT_BUTTONS);
            const buttonCount = await contentButtons.count();
            for (let b = 0; b < buttonCount; b++) {
                const button = contentButtons.nth(b);
                await expect(button, `${route} sekme ${i} buton ${b}: görünür değil`).toBeVisible();
                if (!(await button.isEnabled())) {
                    const label = (await button.innerText().catch(() => '')).trim().slice(0, 40);
                    disabledButtonsFound.push(`sekme ${i} buton ${b} ("${label}")`);
                }
            }
        }

        if (disabledButtonsFound.length) {
            test.info().annotations.push({
                type: 'info',
                description: `${route}: ilk render'da disabled bulunan butonlar (beklenen olabilir): ${disabledButtonsFound.join(', ')}`,
            });
        }

        expect(pageErrors, `${route}: console/page hataları`).toHaveLength(0);
    });
}
