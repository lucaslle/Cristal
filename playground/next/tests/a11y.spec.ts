import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const audit = (page: import('@playwright/test').Page) =>
  new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();

test('page has no WCAG 2.1 AA violations detectable by axe', async ({ page }) => {
  await page.goto('/');
  expect((await audit(page)).violations).toEqual([]);
});

for (const [trigger, name] of [['Supprimer le produit', 'Supprimer le produit ?'], ['Filtres', 'Filtres']]) {
  test(`open overlay "${name}" has no WCAG 2.1 AA violations detectable by axe`, async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: trigger }).click();
    await expect(page.getByRole('dialog', { name })).toBeVisible();
    expect((await audit(page)).violations).toEqual([]);
  });
}
