import { test, expect } from '@playwright/test';

test.describe('Activity 1: GitHub Sign In', () => {
  test('shows an error with dummy credentials', async ({ page }) => {
    await page.goto('https://github.com/');
    await page.getByRole('link', { name: /sign in/i }).click();

    await page.locator('#login_field').fill('dummy.user@example.com');
    await page.locator('#password').fill('dummy-password-123');
    await page.getByRole('button', { name: /^sign in$/i }).click();

    const alert = page.locator('div[role="alert"]');
    await expect(alert).toContainText(/incorrect username or password/i);
  });
});

test.describe('Activity 2: Browsers & Browser context', () => {
  test('firefox context and page count', async ({ browser }, testInfo) => {
    test.skip(testInfo.project.name !== 'firefox', 'Run this test in Firefox');

    const context = await browser.newContext();

    console.log('Browser contexts length before page:', browser.contexts().length);

    const page = await context.newPage();

    console.log('Browser contexts length after page:', browser.contexts().length);

    await page.goto('https://playwright.dev/');
    await context.close();
  });
});

test.describe('Activity 3: Multiple pages', () => {
  test('chromium browser with two pages', async ({ browser }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'Run this test in Chromium');

    const context = await browser.newContext();

    const page1 = await context.newPage();
    await page1.goto('https://playwright.dev/docs/intro');

    const page2 = await context.newPage();
    await page2.goto('https://playwright.dev/docs/writing-tests');

    const pages = context.pages();
    console.log('Pages in context:', pages.length);

    await context.close();
  });
});

test.describe('Activity 4: Pages Methods', () => {
  test('firefox screenshot and back navigation', async ({ browser }, testInfo) => {
    test.skip(testInfo.project.name !== 'firefox', 'Run this test in Firefox');

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://playwright.dev/');
    await page.screenshot({ path: 'artifacts/playwright-home.png', fullPage: true });

    await page.goto('https://github.com/');
    console.log('Page loaded!');

    await page.goBack();

    await context.close();
  });
});
