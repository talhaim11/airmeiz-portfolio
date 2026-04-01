import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('home header hash links point to real sections', async ({ page }) => {
    // Validate home header links map to existing in-page sections.
    await page.goto('/');

    const nav = page.locator('header nav').first();
    await expect(nav).toBeVisible();

    const links = [
      { name: 'About', hash: '#about', section: '#about' },
      { name: 'Projects', hash: '#projects', section: '#projects' },
      { name: 'Team', hash: '#team', section: '#team' },
      { name: 'Contact', hash: '#contact', section: '#contact' },
    ];

    for (const link of links) {
      const locator = nav.getByRole('link', { name: link.name });
      await expect(locator).toHaveAttribute('href', link.hash);
      await expect(page.locator(link.section)).toBeVisible();
    }
  });

  test('project page header keeps route-aware links', async ({ page }) => {
    // Validate SiteHeader switches links to root-hash routes outside home.
    await page.goto('/projects/swappex');

    const nav = page.locator('header nav').first();
    await expect(nav).toBeVisible();

    await expect(nav.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    await expect(nav.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/#about');
    await expect(nav.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/#projects');
    await expect(nav.getByRole('link', { name: 'Team' })).toHaveAttribute('href', '/#team');
    await expect(nav.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/#contact');
  });

  test('project cards navigate to project routes', async ({ page }) => {
    // Validate clickable project cards route to their real pages.
    await page.goto('/');

    await page.getByRole('button', { name: /SWAPPEX/i }).click();
    await expect(page).toHaveURL(/\/projects\/swappex$/);
    await expect(page.getByRole('heading', { name: /Moving Things Should\s*Be Simple/i })).toBeVisible();

    await page.goto('/');
    await page.getByRole('button', { name: /ALPHAFLOW/i }).click();
    await expect(page).toHaveURL(/\/projects\/alphaflow$/);
    await expect(page.getByRole('heading', { name: /Alpha/i }).first()).toBeVisible();
  });
});