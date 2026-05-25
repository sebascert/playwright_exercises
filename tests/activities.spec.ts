import { test, expect, type Locator } from '@playwright/test';

async function logCount(label: string, locator: Locator) {
  const count = await locator.count();
  console.log(`${label}: ${count}`);
}

test.describe('Activity 1: MercadoLibre locators', () => {
  test('use the 7 recommended locators on MercadoLibre', async ({ page }) => {
    await page.goto('https://www.mercadolibre.com.mx/');

    const loginLink = page.getByRole('link', { name: 'Ingresa', exact: true });
    await expect(loginLink).toBeVisible();

    const searchBox = page.getByPlaceholder(/buscar productos/i);
    await logCount('placeholder locator', searchBox);

    const labelLocator = page.getByLabel(/buscar/i);
    await logCount('label locator', labelLocator);

    const navHeader = page.getByTestId('nav-header');
    await logCount('nav-header', navHeader);

    const altTextLocator = page.getByAltText(/mercado libre/i);
    await logCount('alt text locator', altTextLocator);

    const textLocator = page.getByText(/mercado libre|ingresa|ayuda/i);
    await logCount('text locator', textLocator);

    const titleLocator = page.getByTitle(/mercado libre|ingresa|ayuda/i);
    await logCount('title locator', titleLocator);

    await page.screenshot({
      path: 'artifacts/mercadolibre-home.png',
      fullPage: true,
    });
  });
});

test.describe('Activity 2: TodoMVC tests', () => {

  test('create a todo item @smoke', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const input = page.getByPlaceholder('What needs to be done?');

    await input.fill('Learn Playwright');
    await input.press('Enter');

    await expect(page.getByText('Learn Playwright')).toBeVisible();

    expect(await page.locator('.todo-list li').count()).toBe(1);

    await page.screenshot({
      path: 'artifacts/create-todo.png',
      fullPage: true,
    });
  });

  test('complete a todo item @locator', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const input = page.getByPlaceholder('What needs to be done?');

    await input.fill('Buy milk');
    await input.press('Enter');

    await page.locator('.todo-list li').first().locator('.toggle').check();

    await expect(
      page.getByText('2 items left')
    ).not.toBeVisible();

    await page.screenshot({
      path: 'artifacts/complete-todo.png',
      fullPage: true,
    });
  });

  test('navigation links using getByRole @links', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const input = page.getByPlaceholder('What needs to be done?');

    await input.fill('Task 1');
    await input.press('Enter');

    await page.getByRole('link', { name: 'Active' }).click();

    await expect(page).toHaveURL(/#\/active/);

    await page.goBack();

    await expect(page).toHaveURL(/#\//);

    await page.screenshot({
      path: 'artifacts/navigation-links.png',
      fullPage: true,
    });
  });

  test('soft assertions and page methods @soft', async ({ page }) => {
    test.slow();

    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const input = page.getByPlaceholder('What needs to be done?');

    await input.fill('Testing soft assertions');
    await input.press('Enter');

    await expect.soft(
      page.getByText('Testing soft assertions')
    ).toBeVisible();

    console.log(await page.title());

    await page.reload();

    await expect(
      page.getByText('Testing soft assertions')
    ).toBeVisible();

    await page.screenshot({
      path: 'artifacts/soft-assertions.png',
      fullPage: true,
    });
  });

  test('expected failure demo @fail', async ({ page }) => {
    test.fail();

    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const input = page.getByPlaceholder('What needs to be done?');

    await input.fill('Expected failure');
    await input.press('Enter');

    await page.screenshot({
      path: 'artifacts/expected-failure.png',
      fullPage: true,
    });

    await expect(page.locator('.todo-list li')).toHaveCount(5);
  });

});
