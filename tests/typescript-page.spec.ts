import { test, expect } from '@playwright/test';

test('TypeScript tabs load and render without crash', async ({ page }) => {
    // Set test timeout to 90s to accommodate heavy dev server compilation on first load
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

    await page.goto('/typescript');
    // Wait up to 60s for the first page render to compile
    await page.waitForSelector('h1', { timeout: 60000 });

    // Find only sidebar navigation buttons
    const tabButtons = page.locator('div[class*="w-52"] button');
    const count = await tabButtons.count();
    console.log(`Found ${count} tabs`);

    for (let i = 0; i < count; i++) {
        const tabButton = tabButtons.nth(i);
        const titleText = await tabButton.innerText();
        console.log(`Clicking tab ${i}: ${titleText.trim()}`);
        
        await tabButton.click();
        await page.waitForTimeout(500);

        // Check if lock screen or warning is shown, or if there are any rendering exceptions
        const bodyContent = await page.locator('body').innerText();
        const hasErrorText = bodyContent.includes('Objects are not valid') || 
                             bodyContent.includes('Cannot read properties') || 
                             bodyContent.includes('ReferenceError') ||
                             bodyContent.includes('Render Error') ||
                             bodyContent.includes('something went wrong') ||
                             bodyContent.includes('[object Object]');
        
        expect(hasErrorText).toBe(false);

        // Verify that non-interview tabs do not show the interview locked warning page
        if (i < count - 1) {
            const hasLockWarning = bodyContent.includes('Mülakat sorularına geçmeden önce') || 
                                   bodyContent.includes('unlock Interview Questions');
            expect(hasLockWarning).toBe(false);

            // Specific content assertion for the Installation / Kurulum tab
            if (titleText.includes('Kurulum') || titleText.includes('Installation')) {
                const stepTexts = await page.locator('div.mt-4.space-y-2 > div').allInnerTexts();
                expect(stepTexts.length).toBeGreaterThan(0);
                for (const text of stepTexts) {
                    // Check that text contains more than just the step index number
                    expect(text.trim().length).toBeGreaterThan(5);
                }
            }
        } else {
            // The last tab (Interview Questions) should show the lock warning initially since we haven't completed 60% of quizzes
            const hasLockWarning = bodyContent.includes('Mülakat sorularına geçmeden önce') || 
                                   bodyContent.includes('unlock Interview Questions');
            expect(hasLockWarning).toBe(true);
        }
    }

    // Verify no critical errors occurred
    expect(errors).toHaveLength(0);
});
