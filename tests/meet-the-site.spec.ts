import { test, expect } from '@playwright/test';
import exp from 'constants';
import path from 'path';

test.describe('Practice software testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
  });

  test('1. Main logo should be visible', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'Practice Software Testing -' })
    ).toBeVisible();
  });

  // Skip the test after exercise 6 since the login is moved!
  test.skip('2. It should be possible to login', async ({ page }) => {
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page
      .getByRole('textbox', { name: 'Email address' })
      .fill('customer@practicesoftwaretesting.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('welcome01');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(
      page.getByRole('heading', { level: 1, name: 'My account' })
    ).toBeVisible();
  });

  test('3. It should be possible to add product to cart', async ({ page }) => {
    // Click the first element that has a data-test attribute starting with "product"
    await page.locator('[data-test^=product]').first().click();
    await page.getByText('Add to cart').click();
    await expect(
      page.getByText('Product added to shopping cart')
    ).toBeVisible();
  });

  test('5. Add pliers to cart and verify', async ({ page }) => {
    const productName = 'Pliers';
    await page
      .locator('[data-test^=product]')
      .getByText(productName, { exact: true })
      .click();
    await page.getByText('Add to cart').click();
    await expect(
      page.getByText('Product added to shopping cart')
    ).toBeVisible();
    await page.getByTestId('nav-cart').click();
    await expect(page.getByTestId('product-title')).toHaveCount(1);
    await expect(page.getByTestId('product-title')).toHaveText(productName);
  });

  test('6. Do a visual verification of the home page', async ({ page }) => {
    await expect(page.getByText('Combination pliers')).toBeVisible();
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.05 });
  });

  test('6.1 Ignore the logo', async ({ page }) => {
    await expect(page.getByText('Combination pliers')).toBeVisible();

    // Do a visual comparision and allow 5 % of pixels to differ
    await expect(page).toHaveScreenshot({
      stylePath: path.resolve(__dirname, '../screenshots/style.css'),
      maxDiffPixelRatio: 0.05,
    });
  });
});
