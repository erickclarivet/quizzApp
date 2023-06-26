import { test, expect } from '@playwright/test';

//  see commands : npx playwright codegen localhost:4200

test.describe('Test the home page', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle('QuizzApp');
  });

  test('is quizz working', async ({ page }) => {
    await page.getByRole('button', { name: 'DEMARRER' }).click();

    // Q1
    await expect(
      page.getByRole('heading', { name: 'Question 1/5' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: "Quel fleuve traverse l'Égypte ?" })
    ).toBeVisible();
    expect(await page.getByRole('radio', { name: 'Le Kibo' })).toBeVisible();
    await page.locator('#mat-radio-1').click();
    expect(await page.getByRole('radio', { name: 'Le Kibo' })).toBeChecked();

    expect(await page.getByRole('radio', { name: 'Le Danube' })).toBeVisible();
    await page.locator('#mat-radio-2').click();
    expect(await page.getByRole('radio', { name: 'Le Danube' })).toBeChecked();

    expect(await page.getByRole('radio', { name: 'Le Nil' })).toBeVisible();
    await page.locator('#mat-radio-3').click();
    expect(await page.getByRole('radio', { name: 'Le Nil' })).toBeChecked();

    expect(await page.getByRole('button', { name: 'VALIDER' })).toBeVisible();
    await page.getByRole('button', { name: 'VALIDER' }).click();

    // Q2
    await expect(
      page.getByRole('heading', { name: 'Question 2/5' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: 'Quel était le prénom du peintre Van Gogh. ?',
      })
    ).toBeVisible();

    await expect(page.getByRole('radio', { name: 'Paul' })).toBeVisible();
    await page.locator('#mat-radio-6').click();
    await expect(page.getByRole('radio', { name: 'Paul' })).toBeChecked();

    await expect(page.getByRole('radio', { name: 'Claude' })).toBeVisible();
    await page.locator('#mat-radio-5').click();
    await expect(page.getByRole('radio', { name: 'Claude' })).toBeChecked();

    await expect(page.getByRole('radio', { name: 'Christian' })).toBeVisible();
    await page.locator('#mat-radio-7').click();
    await expect(page.getByRole('radio', { name: 'Christian' })).toBeChecked();

    await expect(page.getByRole('radio', { name: 'Vincent' })).toBeVisible();
    await page.locator('#mat-radio-4').click();
    await expect(page.getByRole('radio', { name: 'Vincent' })).toBeChecked();

    await expect(page.getByRole('button', { name: 'VALIDER' })).toBeVisible();
    await page.getByRole('button', { name: 'VALIDER' }).click();

    // Q3
    await expect(
      page.getByRole('heading', { name: 'Question 3/5' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: 'Quelle est la capitale de la France ?',
      })
    ).toBeVisible();

    await page.getByPlaceholder('Entrer votre reponse').fill('Paris');
    expect(await page.inputValue('input.answer2')).toEqual('Paris');

    await expect(page.getByRole('button', { name: 'VALIDER' })).toBeVisible();
    await page.getByRole('button', { name: 'VALIDER' }).click();

    // Q4
    await expect(
      page.getByRole('heading', { name: 'Question 4/5' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: 'Quelle est la capitale du Brésil ?',
      })
    ).toBeVisible();

    await page.getByPlaceholder('Entrer votre reponse').fill('Brasilia');
    expect(await page.inputValue('input.answer2')).toEqual('Brasilia');

    await expect(page.getByRole('button', { name: 'VALIDER' })).toBeVisible();
    await page.getByRole('button', { name: 'VALIDER' }).click();

    // Q5
    await expect(
      page.getByRole('heading', { name: 'Question 5/5' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: 'Lequel de ces français a remporté le tournoi de tennis Roland-Garros ?',
      })
    ).toBeVisible();

    await expect(
      page.getByRole('checkbox', { name: 'Mary Pierce' })
    ).toBeVisible();
    await page.locator('#mat-checkbox-1').click();
    await expect(
      page.getByRole('checkbox', { name: 'Mary Pierce' })
    ).toBeChecked();

    await expect(
      page.getByRole('checkbox', { name: 'Jo Wilfried Tsonga' })
    ).toBeVisible();
    await page.locator('#mat-checkbox-2').click();
    await expect(
      page.getByRole('checkbox', { name: 'Jo Wilfried Tsonga' })
    ).toBeChecked();
    await page.locator('#mat-checkbox-2').click();

    await expect(
      page.getByRole('checkbox', { name: 'Amélie Mauresmo' })
    ).toBeVisible();
    await page.locator('#mat-checkbox-3').click();
    await expect(
      page.getByRole('checkbox', { name: 'Amélie Mauresmo' })
    ).toBeChecked();
    await page.locator('#mat-checkbox-3').click();

    await expect(
      page.getByRole('checkbox', { name: 'Yannick Noah' })
    ).toBeVisible();
    await page.locator('#mat-checkbox-4').click();
    await expect(
      page.getByRole('checkbox', { name: 'Yannick Noah' })
    ).toBeChecked();

    await expect(page.getByRole('button', { name: 'VALIDER' })).toBeVisible();

    await page.getByRole('button', { name: 'VALIDER' }).click();

    // RESULTS
    await expect(
      page.getByRole('heading', { name: ' Le Quiz est terminé ! ' })
    ).toBeVisible();
  });
});
