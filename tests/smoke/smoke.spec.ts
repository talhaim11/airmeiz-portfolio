import { test, expect } from '@playwright/test';

const smokeRoutes = [
  { path: '/', heading: /your vision,\s*our mission/i },
  { path: '/projects/swappex', heading: /Moving Things Should\s*Be Simple/i },
  { path: '/projects/erevshabbat', heading: /EREVSHABAT/i },
  { path: '/projects/alphaflow', heading: /Alpha/i },
  { path: '/projects/pulsegate', heading: /PULSEGATE/i },
  { path: '/projects/novapay', heading: /Novapay/i },
  { path: '/privacy', heading: /Privacy Policy/i },
  { path: '/terms', heading: /Terms of Service/i },
];

test.describe('SMOKE', () => {
  for (const route of smokeRoutes) {
    test(`route ${route.path} renders key content`, async ({ page }) => {
      // Validate each production route resolves and shows expected primary content.
      await page.goto(route.path);
      await expect(page.getByRole('heading', { name: route.heading }).first()).toBeVisible();
    });
  }
});