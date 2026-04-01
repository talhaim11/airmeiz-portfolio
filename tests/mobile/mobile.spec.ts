import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['iPhone 12'] });

test.describe('Mobile', () => {
  test('project header mobile menu toggles and exposes nav links', async ({ page }) => {
    // Validate mobile navigation toggle on SiteHeader pages.
    await page.goto('/projects/swappex');

    const toggle = page.getByRole('button', { name: 'Toggle navigation menu' });
    await expect(toggle).toBeVisible();

    const navMenu = page.locator('header .nav-menu');
    await expect(navMenu).not.toHaveClass(/active/);

    await toggle.click();
    await expect(navMenu).toHaveClass(/active/);
    await expect(navMenu.getByRole('link', { name: 'Contact' })).toBeVisible();
  });

  test('mobile nav link routes back to home hash sections', async ({ page }) => {
    // Validate route transition from project page to home section anchor.
    await page.goto('/projects/swappex');

    await page.getByRole('button', { name: 'Toggle navigation menu' }).click();
    await page.locator('header .nav-menu').getByRole('link', { name: 'Contact' }).click();

    await expect(page).toHaveURL(/\/#contact$/);
    await expect(page.locator('#contact')).toBeVisible();
  });
});