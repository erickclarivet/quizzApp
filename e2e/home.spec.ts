import { test, expect } from '@playwright/test';

//  see commands : npx playwright codegen localhost:4200
// see examples methods : in tests-examples/demo-todo-app.spec.ts

test.describe('Test the home page', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
  });

  test('has title', async ({ page }) => {
    await page.pause();

    await expect(page).toHaveTitle('QuizzApp');
  });

  test('has minimum informations', async ({ page }) => {
    await page.pause();

    await expect(
      page.getByRole('heading', { name: 'NOM DU QUIZ' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Mon test technique' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Meilleur score' })
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: '0/5' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'DEMARRER' })).toBeVisible();
  });
});
