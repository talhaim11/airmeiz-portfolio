import { test, expect } from '@playwright/test';

const primaryRoutes = [
  { path: '/', heading: /your vision,\s*our mission/i },
  { path: '/privacy', heading: /Privacy Policy/i },
  { path: '/terms', heading: /Terms of Service/i },
  { path: '/projects/alphaflow', heading: /A smarter way to understand training/i },
  { path: '/projects/pulsegate', heading: /PULSEGATE/i },
  { path: '/projects/swappex', heading: /The Future of Moving Items/i },
  { path: '/projects/novapay', heading: /Novapay/i },
  { path: '/projects/erevshabbat', heading: /EREVSHABAT/i },
];

const redirects = [
  { from: '/privacy.html', to: /\/privacy$/ },
  { from: '/terms.html', to: /\/terms$/ },
  { from: '/projects/alphaflow.html', to: /\/projects\/alphaflow$/ },
  { from: '/projects/pulsegate.html', to: /\/projects\/pulsegate$/ },
  { from: '/projects/swappex.html', to: /\/projects\/swappex$/ },
  { from: '/projects/swapex', to: /\/projects\/swappex$/ },
  { from: '/projects/swapex.html', to: /\/projects\/swappex$/ },
  { from: '/projects/novapay.html', to: /\/projects\/novapay$/ },
  { from: '/projects/erevshabbat.html', to: /\/projects\/erevshabbat$/ },
  { from: '/this-route-does-not-exist', to: /\/$/ },
];

test.describe('Pages', () => {
  for (const route of primaryRoutes) {
    test(`route ${route.path} loads with expected heading`, async ({ page }) => {
      // Validate top-level pages and project routes from App.tsx.
      await page.goto(route.path);
      await expect(page.getByRole('heading', { name: route.heading }).first()).toBeVisible();
    });
  }

  for (const redirect of redirects) {
    test(`redirect ${redirect.from} resolves correctly`, async ({ page }) => {
      // Validate compatibility redirects and catch-all route.
      await page.goto(redirect.from);
      await expect(page).toHaveURL(redirect.to);
    });
  }

  test('swappex page exposes route-specific interactive sections', async ({ page }) => {
    // Validate real route-specific section IDs and controls.
    await page.goto('/projects/swappex');

    await expect(page.locator('#problem')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Three sides,\s*one platform/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /The cost of inefficiency/i })).toBeVisible();
    await expect(page.getByRole('button', { name: 'BEFORE' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'AFTER' })).toBeVisible();
  });

  test('alphaflow page exposes route-specific sections and cards', async ({ page }) => {
    // Validate alphaflow section IDs and repeated card-like feature blocks.
    await page.goto('/projects/alphaflow');

    await expect(page.locator('#problem')).toBeVisible();
    await expect(page.locator('#solution')).toBeVisible();
    await expect(page.locator('#features')).toBeVisible();
    await expect(page.locator('#vision')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Everything in one place' })).toBeVisible();
  });
});