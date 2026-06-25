import { test, expect } from '@playwright/test';

test('Python Foundations tab loads without crash', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));

    await page.goto('/automationexercise/#/python');
    await page.waitForSelector('text=Python', { timeout: 10000 });

    // Click Syntax & Comments tab
    const syntaxTab = page.locator('button', { hasText: 'Syntax & Comments' });
    if (await syntaxTab.count() > 0) {
        await syntaxTab.first().click();
        await page.waitForTimeout(1000);
    }

    // Check page is not white (has visible content)
    const body = await page.locator('body').innerHTML();
    expect(body.length).toBeGreaterThan(500);

    // No "Objects are not valid as a React child" errors
    const criticalErrors = errors.filter(e => e.includes('Objects are not valid') || e.includes('Cannot read properties'));
    expect(criticalErrors).toHaveLength(0);

    // Comparison table should be visible
    const conceptCell = page.locator('table td').first();
    if (await conceptCell.count() > 0) {
        await expect(conceptCell).toBeVisible();
    }
});

test('TypeScript Foundations tab loads without crash', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));

    await page.goto('/automationexercise/#/typescript');
    await page.waitForSelector('text=TypeScript', { timeout: 10000 });

    const foundationsTab = page.locator('button', { hasText: 'Foundations' });
    if (await foundationsTab.count() > 0) {
        await foundationsTab.first().click();
        await page.waitForTimeout(1000);
    }

    const body = await page.locator('body').innerHTML();
    expect(body.length).toBeGreaterThan(500);

    const criticalErrors = errors.filter(e => e.includes('Objects are not valid') || e.includes('Cannot read properties'));
    expect(criticalErrors).toHaveLength(0);
});
