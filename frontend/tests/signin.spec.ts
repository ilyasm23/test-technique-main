//ts-check
import { test, expect } from '@playwright/test';

test('can sign in', async ({ page }) => {
  await page.goto(process.env.VUE_APP_BASE_URL);
  await expect(
    page.locator('form div').filter({ hasText: 'Connecter' }),
  ).toBeVisible();
  await page.getByLabel('Email*').fill('toto@kresus.eu');
  await page.getByLabel('Mot de passe*').fill('test');
  await expect(page.getByLabel('Email*')).toBeVisible();
  await page.getByRole('button', { name: 'Connecter' }).click();
  // await expect(page.getByRole('banner')).toContainText(
  //   'Une TODO app pas comme les autres',
  // );
  await expect(
    page.getByRole('button', { name: 'Ajouter une tâche' }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Déconnexion' })).toBeVisible();
});
