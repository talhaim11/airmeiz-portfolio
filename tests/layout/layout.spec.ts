import { test, expect } from '@playwright/test';

test.describe('Layout', () => {
  test('home renders core section structure', async ({ page }) => {
    // Validate key home sections and footer navigation are present.
    await page.goto('/');

    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('#home')).toBeVisible();
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#team')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('project pages include shared SiteHeader and SiteFooter', async ({ page }) => {
    // Validate shared site shell around project-specific content.
    await page.goto('/projects/swappex');

    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    await expect(page.getByRole('heading', { name: /Moving Things Should\s*Be Simple/i })).toBeVisible();
    await expect(page.getByText(/The Future of Moving Items/i)).toBeVisible();
  });

  test('legal page contains legal footer links and back navigation', async ({ page }) => {
    // Validate legal layout and expected legal-link destinations.
    await page.goto('/privacy');

    await expect(page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Terms of Service' })).toHaveAttribute('href', '/terms');
    await expect(page.getByRole('link', { name: 'Back to Home' })).toHaveAttribute('href', '/');
  });
});