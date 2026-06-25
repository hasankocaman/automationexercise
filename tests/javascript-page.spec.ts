import { test, expect } from '@playwright/test';

test('JavaScript tabs load and render without crash', async ({ page }) => {
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

    await page.goto('/javascript');
    await page.waitForSelector('h1', { timeout: 30000 });

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
                             bodyContent.includes('Render Error') ||
                             bodyContent.includes('something went wrong') ||
                             bodyContent.includes('[object Object]');
        
        expect(hasErrorText).toBe(false);

        // Verify that non-interview tabs do not show the interview locked warning page
        if (i < count - 1) {
            const hasLockWarning = bodyContent.includes('Mülakat sorularına geçmeden önce') || 
                                   bodyContent.includes('unlock Interview Questions');
            expect(hasLockWarning).toBe(false);
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
