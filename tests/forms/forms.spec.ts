import { test, expect } from '@playwright/test';

test.describe('Forms', () => {
  test('contact form enforces required fields', async ({ page }) => {
    // Validate native required validation before submit on contact form.
    await page.goto('/#contact');

    const form = page.locator('section#contact form');
    await expect(form).toBeVisible();

    const isValidBefore = await form.evaluate((node) => (node as HTMLFormElement).checkValidity());
    expect(isValidBefore).toBe(false);

    await form.getByRole('button', { name: 'Send Message' }).click();
    await expect(form.locator('input[type="text"]')).toBeFocused();
  });

  test('contact form submit triggers success dialog when fields are valid', async ({ page }) => {
    // Validate successful user flow and exact alert confirmation message.
    await page.goto('/#contact');

    const form = page.locator('section#contact form');
    await form.locator('input[type="text"]').fill('Test User');
    await form.locator('input[type="email"]').fill('test@example.com');
    await form.locator('textarea').fill('Interested in discussing a product concept.');

    const dialogPromise = page.waitForEvent('dialog');
    await form.getByRole('button', { name: 'Send Message' }).click();

    const dialog = await dialogPromise;
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain('Thank you for your interest');
    await dialog.accept();
  });
});