import { test, expect } from '@playwright/test';
import { waitForAppReady } from './helpers/app-ready';
import { auditTabButtons, CONTENT_AREA } from './helpers/button-audit';

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
    '/postman', '/bruno', '/jenkins', '/docker', '/rest-assured', '/gauge', '/kubernetes',
    '/kafka', '/appium', '/playwright', '/cypress', '/selenium', '/aws', '/azure',
    '/browserstack', '/git-github', '/linux', '/java', '/what-is-testing',
    '/claude-ai', '/llm-agents', '/api-testing', '/qa-frontend',
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
// Buton denetiminin gerekçesi ve kapsamı: ./helpers/button-audit.ts
// "Cannot read properties", "something went wrong" gibi genel ifadeler kasıtlı
// olarak YOK — error-dictionary block'ları gerçek hata mesajı örnekleri içerir
// (örn. cypressData.js) ve bunlar gerçek crash değildir. Gerçek render hataları
// zaten page/console error listener'larıyla (pageErrors) yakalanıyor; burada sadece
// herhangi bir exception fırlatmadan sessizce yanlış render olan, çok spesifik
// "[object Object]" stringification belirtisini kontrol ediyoruz.
const CRASH_MARKERS = ['[object Object]'];

for (const route of TOPIC_ROUTES) {
    test(`${route} — her sekme render olur, içerik butonları görünür`, async ({ page }) => {
        // Buton denetimi sekme başına ~43.000 gidiş-dönüşten 390 `evaluate`
        // çağrısına indi (bkz. dosya başındaki not), bu yüzden 240_000ms'lik
        // eski marj gerekmiyor. En kalabalık sayfa /api-testing (57 sekme);
        // sınır yine de bol tutuldu ki 4 paralel worker altında sekme
        // render'ları için yer kalsın.
        test.setTimeout(180_000);

        const pageErrors: string[] = [];
        page.on('pageerror', (e) => pageErrors.push(e.message));
        page.on('console', (msg) => {
            if (msg.type() === 'error' && !isAllowedError(msg.text())) {
                pageErrors.push(msg.text());
            }
        });

        await page.goto(route);
        await waitForAppReady(page, { timeout: 30_000 });

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
        let visibleButtonsSeen = 0;

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

            // İçerik alanındaki butonların tamamı TEK DOM geçişinde denetlenir
            // (gerekçe: dosyanın başındaki `auditButtons` notu).
            const audit = await auditTabButtons(page);

            visibleButtonsSeen += audit.visible;

            expect(
                audit.brokenLayout,
                `${route} sekme ${i}: yerleşimde yer kaplayan ama 0×0 boyutlu buton(lar) — bozuk render`,
            ).toEqual([]);
            expect(
                audit.unclickable,
                `${route} sekme ${i}: görünür ve enabled olduğu hâlde pointer-events:none olan buton(lar) — tıklanabilir görünüp tıklanamıyor`,
            ).toEqual([]);

            for (const label of audit.disabled) {
                disabledButtonsFound.push(`sekme ${i} ("${label}")`);
            }
        }

        test.info().annotations.push({
            type: 'info',
            description: `${route}: ${tabCount} sekme, ${visibleButtonsSeen} görünür buton denetlendi`
                + (disabledButtonsFound.length
                    ? ` — ilk render'da disabled bulunanlar (beklenen olabilir): ${disabledButtonsFound.join(', ')}`
                    : ''),
        });

        expect(pageErrors, `${route}: console/page hataları`).toHaveLength(0);
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// DENETÇİNİN KENDİ TESTİ
//
// Yukarıdaki iki doğrulama (bozuk yerleşim, tıklanamayan buton) bugün site
// genelinde 0 sonuç veriyor. Bu iyi bir haber ama tek başına HİÇBİR ŞEY
// kanıtlamaz: her zaman boş liste döndüren kırık bir denetçi de aynen böyle
// "yeşil" görünürdü. Bu test, sayfaya bilerek iki bozuk buton enjekte edip
// denetçinin ikisini de yakaladığını gösterir — yani guard'ın dişi olduğunu.
// Enjeksiyon yalnızca bu testin tarayıcı bağlamında yaşar, üründe iz bırakmaz.
// ─────────────────────────────────────────────────────────────────────────────
test('buton denetçisi bozuk butonları GERÇEKTEN yakalıyor (guard\'ın kendi testi)', async ({ page }) => {
    test.setTimeout(60_000);

    await page.goto('/docker');
    await waitForAppReady(page, { timeout: 30_000 });

    const before = await auditTabButtons(page);
    expect(before.brokenLayout, 'temiz sayfada bozuk yerleşim bulunmamalı').toEqual([]);
    expect(before.unclickable, 'temiz sayfada tıklanamayan buton bulunmamalı').toEqual([]);

    await page.evaluate((selector) => {
        const root = document.querySelector(selector);
        if (!root) throw new Error('içerik alanı bulunamadı');

        // 1) Yerleşimde yer kaplayan ama 0×0: kullanıcı göremez.
        const zero = document.createElement('button');
        zero.textContent = 'SIFIR BOYUTLU TEST BUTONU';
        zero.style.cssText = 'width:0;height:0;padding:0;border:0;overflow:hidden';
        root.appendChild(zero);

        // 2) Görünür + enabled ama tıklanamaz: en sinsi tür.
        const dead = document.createElement('button');
        dead.textContent = 'TIKLANAMAYAN TEST BUTONU';
        dead.style.cssText = 'width:120px;height:40px;pointer-events:none';
        root.appendChild(dead);
    }, CONTENT_AREA);

    const after = await auditTabButtons(page);
    expect(after.brokenLayout, '0×0 buton yakalanmadı — denetçi kör').toContain('SIFIR BOYUTLU TEST BUTONU');
    expect(after.unclickable, 'pointer-events:none buton yakalanmadı — denetçi kör').toContain('TIKLANAMAYAN TEST BUTONU');
});
