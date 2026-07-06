import { test, expect } from '@playwright/test';

// AC10 (Documents/acceptancecriterias.md) — TR modda kod bloğu yorum dili
// kalitesi, POZİTİF doğrulama. `i18n-content-toggle.spec.ts` sadece EN modda
// Türkçe karakter SIZINTISI olmadığını kontrol ediyor (ters yön); bu dosya
// AC10'un kendi test kriterlerinde birebir tanımlanan TR-mod senaryosunu
// doğrular: `TopicPage.jsx > englishToTurkishCodeComments` + `localizeCodeComments`
// mekanizmasının düz-string `code` bloklarındaki bilinen İngilizce yorumları
// gerçekten Türkçeye çevirdiğini kanıtlar (AC10 dosyasının kendi notu:
// "opsiyonel, öncelik düşük" — bu oturumda tamamlandı).
const SIDEBAR_TAB_BUTTONS = 'div[class*="flex-shrink-0"][class*="sticky"] button';

// AC10'un kendi metnindeki birebir test kriteri #1: Variables & Types
// sekmesinde "# Multiple assignment" GÖRÜNMEMELİ, "# Çoklu atama" GÖRÜNMELİ.
test('/python — "Değişkenler & Tipler" sekmesi, TR modda: "Multiple assignment" değil "Çoklu atama" görünür', async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto('/python');
    await page.waitForSelector('h1', { timeout: 30_000 });

    const tabButtons = page.locator(SIDEBAR_TAB_BUTTONS);
    await tabButtons.filter({ hasText: 'Değişkenler & Tipler' }).first().click();

    const bodyText = await page.locator('body').innerText();
    expect(bodyText, 'İngilizce "# Multiple assignment" yorumu hâlâ görünüyor').not.toContain('Multiple assignment');
    expect(bodyText, 'Türkçe çevirisi "# Çoklu atama" görünmüyor').toContain('Çoklu atama');
});

// AC10'un kendi metnindeki birebir test kriteri #2: TÜM sekmelerde, TR modda,
// bilinen açıklayıcı İngilizce yorumlar (englishToTurkishCodeComments'te çeviri
// çifti olan ifadeler) hiçbir yerde görünmemeli.
const KNOWN_ENGLISH_COMMENTS_MUST_NOT_LEAK = [
    'Multiple assignment',
    'Check type',
    'Basic function',
    'ALWAYS runs — like Java finally',
];

test('/python — TR modda tüm sekmelerde bilinen İngilizce yorumlar sızmıyor', async ({ page }) => {
    test.setTimeout(120_000);
    await page.goto('/python');
    await page.waitForSelector('h1', { timeout: 30_000 });

    const tabButtons = page.locator(SIDEBAR_TAB_BUTTONS);
    const tabCount = await tabButtons.count();
    expect(tabCount).toBeGreaterThan(0);

    const leaks: string[] = [];
    for (let i = 0; i < tabCount; i++) {
        await tabButtons.nth(i).click();
        await page.waitForTimeout(200);
        const bodyText = await page.locator('body').innerText();
        for (const phrase of KNOWN_ENGLISH_COMMENTS_MUST_NOT_LEAK) {
            if (bodyText.includes(phrase)) leaks.push(`sekme ${i}: "${phrase}"`);
        }
    }

    expect(leaks, `TR modda sızan İngilizce yorumlar: ${leaks.join(', ')}`).toEqual([]);
});
