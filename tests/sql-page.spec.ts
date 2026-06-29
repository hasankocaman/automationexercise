import { test, expect } from '@playwright/test';

test('SQL tabs load and render without crash', async ({ page }) => {
    test.setTimeout(90000);

    const errors: string[] = [];
    page.on('pageerror', e => {
        console.error('PAGE ERROR:', e.message);
        errors.push(e.message);
    });
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.error('CONSOLE ERROR:', msg.text());
            errors.push(msg.text());
        }
    });

    await page.goto('/sql');
    await page.waitForSelector('h1', { timeout: 30000 });

    const tabButtons = page.locator('div[class*="w-52"] button');
    const count = await tabButtons.count();
    console.log(`Found ${count} SQL tabs`);
    expect(count).toBeGreaterThan(20);

    // Mülakat sekmesini 💼 emoji ile bul — pozisyon varsayımı yapmıyoruz
    let interviewTabIndex = -1;
    for (let i = 0; i < count; i++) {
        const label = await tabButtons.nth(i).innerText();
        if (label.includes('💼')) { interviewTabIndex = i; break; }
    }
    expect(interviewTabIndex, 'dedicated 💼 mülakat sekmesi bulunamadı').toBeGreaterThanOrEqual(0);

    for (let i = 0; i < count; i++) {
        const tabButton = tabButtons.nth(i);
        const titleText = await tabButton.innerText();
        console.log(`Clicking SQL tab ${i}: ${titleText.trim()}`);

        await tabButton.click();
        await page.waitForTimeout(500);

        const bodyContent = await page.locator('body').innerText();
        const hasErrorText = bodyContent.includes('Objects are not valid') ||
                             bodyContent.includes('Cannot read properties') ||
                             bodyContent.includes('Render Error') ||
                             bodyContent.includes('something went wrong') ||
                             bodyContent.includes('[object Object]');

        expect(hasErrorText).toBe(false);

        if (i !== interviewTabIndex) {
            const hasLockWarning = bodyContent.includes('Mülakat sorularına geçmeden önce') ||
                                   bodyContent.includes('unlock Interview Questions');
            expect(hasLockWarning).toBe(false);
        } else {
            const hasLockWarning = bodyContent.includes('Mülakat sorularına geçmeden önce') ||
                                   bodyContent.includes('unlock Interview Questions');
            expect(hasLockWarning).toBe(true);
        }
    }

    expect(errors).toHaveLength(0);
});
