import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('is server-rendered with declarative shadow DOM', async ({ request }) => {
  const html = await (await request.get('/')).text();
  expect(html).toContain('<template shadowrootmode="open"');
});

test('hydrates without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => message.type() === 'error' && errors.push(message.text()));
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Compter' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('follows the XEFI height scale', async ({ page }) => {
  await page.goto('/');
  for (const [label, height] of [['XS', 30], ['S', 36], ['M', 40], ['L', 48]] as const) {
    const box = await page.getByRole('button', { name: label, exact: true }).boundingBox();
    expect(box?.height).toBe(height);
  }
});

test('fires onClick with mouse and keyboard', async ({ page }) => {
  await page.goto('/');
  const button = page.getByRole('button', { name: 'Compter' });
  await button.click();
  await button.focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Space');
  await expect(page.getByTestId('clicks')).toHaveText('Clics : 3');
});

test('submits and resets the parent form', async ({ page }) => {
  await page.goto('/');
  const email = page.getByLabel('E-mail');
  await email.fill('autre@example.com');
  await page.getByRole('button', { name: 'Envoyer' }).click();
  await expect(page.getByTestId('submitted')).toHaveText('Envoyé : autre@example.com');
  await page.getByRole('button', { name: 'Réinitialiser' }).click();
  await expect(email).toHaveValue('lucas@example.com');
});

test('exposes disabled and loading states', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Désactivé' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Chargement' })).toHaveAttribute('aria-busy', 'true');
});

test('has no WCAG 2.1 AA violations detectable by axe', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(results.violations).toEqual([]);
});
