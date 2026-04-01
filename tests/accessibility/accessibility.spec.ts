import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('home has meaningful landmarks and accessible form controls', async ({ page }) => {
    // Validate core landmark structure and accessible form field labels.
    await page.goto('/');

    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Message' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send Message' })).toBeVisible();
  });

  test('site header and footer links are accessible on project route', async ({ page }) => {
    // Validate named navigation links and social icon labels.
    await page.goto('/projects/swappex');

    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Team' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();

    await expect(page.getByRole('link', { name: 'Instagram' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Facebook' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Twitter/X' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
  });
});