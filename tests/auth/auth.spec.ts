import { test, expect } from '@playwright/test';

test('unauthorized access handled', async ({ page }) => {
  await page.goto('/admin');

  // תלוי בפרויקט שלך — רק בסיס
  expect(await page.url()).not.toContain('error');
});