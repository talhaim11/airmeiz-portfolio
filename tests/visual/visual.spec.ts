import { test, expect } from '@playwright/test';

test.describe('Visual', () => {
  test('homepage hero visual baseline', async ({ page }) => {
    // Validate visual regressions in the home hero and top shell.
    await page.goto('/');
    await expect(page.locator('header')).toBeVisible();
    await expect(page.getByRole('heading', { name: /your vision,\s*our mission/i })).toBeVisible();

    await expect(page).toHaveScreenshot('home-hero.png', {
      fullPage: false,
      animations: 'disabled',
    });
  });

  test('swappex hero visual baseline', async ({ page }) => {
    // Validate visual regressions for SWAPPEX opening scene.
    await page.goto('/projects/swappex');
    await expect(page.getByRole('heading', { name: /Moving Things Should\s*Be Simple/i })).toBeVisible();

    await expect(page).toHaveScreenshot('swappex-hero.png', {
      fullPage: false,
      animations: 'disabled',
    });
  });
});