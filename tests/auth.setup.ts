import { expect, test as setup } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('Authenticate', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page
    .getByRole('textbox', { name: 'Email address' })
    .fill('customer@practicesoftwaretesting.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('welcome01');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(
    page.getByRole('heading', { level: 1, name: 'My account' })
  ).toBeVisible();

  await page.context().storageState({ path: authFile });
});
