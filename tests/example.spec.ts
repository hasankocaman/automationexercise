import { test, expect } from '@playwright/test';

test('homepage has title and loads', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    // Using a generic check first since we haven't confirmed the exact title.
    await expect(page).toHaveTitle(/./);

    // Check if body is visible to ensure page rendered
    await expect(page.locator('body')).toBeVisible();
});
