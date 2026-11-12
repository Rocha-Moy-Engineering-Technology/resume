import { PROFILE } from '../src/types/resume';
import { expect, test } from './fixtures';

test.describe('Smoke', () => {
  test('resume and contact controls remain usable together', async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/');
    await expect(page).toHaveTitle(`${PROFILE.name} - ${PROFILE.title}`);
    const initialTheme = await page.locator('html').getAttribute('data-theme');
    await page.getByRole('button', { name: /switch to/i }).click();
    await expect(page.locator('html')).toHaveAttribute(
      'data-theme',
      initialTheme === 'dark' ? 'light' : 'dark'
    );
    await page.getByRole('button', { name: 'Contact', exact: true }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByLabel('Email', { exact: true })).toBeEditable();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();
    await page.getByRole('tab', { name: 'Portfolio' }).click();
    await expect(page).toHaveURL(/#portfolio$/);
    await expect(
      page.getByRole('link', { name: 'Download Resume', exact: true })
    ).toHaveAttribute('href', '/resume.pdf');
    expect(errors).toEqual([]);
  });
});
