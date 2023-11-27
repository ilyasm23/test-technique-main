//ts-check
import { test, expect } from '@playwright/test';

test('can sign in', async ({ page }) => {
  console.log(process.env);
  await page.goto(process.env.VUE_APP_BASE_URL);
  await page.getByLabel('Email*').fill('toto@kresus.eu');
  await page.getByLabel('Mot de passe*').fill('test');
  await page.getByRole('button', { name: 'Connecter' }).click();
  await expect(page.getByRole('banner')).toContainText(
    'Une TODO app pas comme les autres',
  );
});
