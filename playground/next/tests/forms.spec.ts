import { expect, test } from '@playwright/test';

const fillValidForm = async (page: import('@playwright/test').Page) => {
  await page.getByLabel('E-mail').fill('autre@example.com');
  await page.getByLabel('Pays').selectOption('be');
  await page.getByLabel("J'accepte les conditions").check();
};

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('blocks submit while required fields are invalid', async ({ page }) => {
  await page.getByRole('button', { name: 'Envoyer' }).click();
  await expect(page.getByTestId('submitted')).toHaveText('Envoyé :');
  expect(await page.locator('cr-select[name="country"]').evaluate((select) => select.matches(':invalid'))).toBe(true);
});

test('submits every field value with the parent form', async ({ page }) => {
  await fillValidForm(page);
  await page.getByRole('button', { name: 'Envoyer' }).click();
  await expect(page.getByTestId('submitted')).toHaveText('Envoyé : {"email":"autre@example.com","country":"be","terms":"on"}');
});

test('submits with Enter from a text field', async ({ page }) => {
  await fillValidForm(page);
  await page.getByLabel('E-mail').press('Enter');
  await expect(page.getByTestId('submitted')).toContainText('"country":"be"');
});

test('resets every field to its initial value', async ({ page }) => {
  await fillValidForm(page);
  await page.getByRole('button', { name: 'Réinitialiser' }).click();
  await expect(page.getByLabel('E-mail')).toHaveValue('lucas@example.com');
  await expect(page.getByLabel('Pays')).toHaveValue('');
  await expect(page.getByLabel("J'accepte les conditions")).not.toBeChecked();
});

test('links hint and error messages to their control', async ({ page }) => {
  await expect(page.getByLabel('E-mail')).toHaveAccessibleDescription('Format : nom@domaine.fr');
  const name = page.getByLabel('Nom', { exact: true });
  await expect(name).toHaveAttribute('aria-invalid', 'true');
  await expect(name).toHaveAccessibleDescription('Le nom est obligatoire. Saisissez au moins 2 caractères.');
});

test('picks up options added after load', async ({ page }) => {
  await page.locator('cr-select[name="country"]').evaluate((select) => {
    const option = document.createElement('option');
    option.value = 'lu';
    option.textContent = 'Luxembourg';
    select.append(option);
  });
  await page.getByLabel('Pays').selectOption('lu');
  await expect(page.getByLabel('Pays')).toHaveValue('lu');
});
