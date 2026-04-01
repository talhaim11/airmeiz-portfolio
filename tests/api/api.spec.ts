import { test, expect } from '@playwright/test';

const routes = ['/', '/projects/swappex', '/projects/alphaflow', '/privacy'];

test.describe('API / Network', () => {
  for (const route of routes) {
    test(`no failing same-origin document/assets on ${route}`, async ({ page, baseURL }) => {
      // Validate app-owned network requests complete successfully on each route.
      const failed: string[] = [];
      const origin = new URL(baseURL || 'http://localhost:5173').origin;

      page.on('response', (response) => {
        const request = response.request();
        const resourceType = request.resourceType();
        const url = response.url();

        if (!url.startsWith(origin)) {
          return;
        }

        if (!['document', 'stylesheet', 'script', 'xhr', 'fetch'].includes(resourceType)) {
          return;
        }

        if (response.status() >= 400) {
          failed.push(`${response.status()} ${resourceType} ${url}`);
        }
      });

      await page.goto(route);
      await page.waitForLoadState('networkidle');

      expect(failed).toEqual([]);
    });
  }
});