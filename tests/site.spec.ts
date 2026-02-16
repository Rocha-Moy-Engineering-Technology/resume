import { expect, test } from '@playwright/test';

test.describe('Contractor Site', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(
      'Pedro Henrique Rocha Moy - Data Scientist and Machine Learning Developer'
    );
  });

  test('navigation bar is visible with download and contact', async ({
    page,
  }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    await expect(nav.getByText('PHR Moy')).toBeVisible();
    await expect(nav.getByRole('link', { name: /download resume/i })).toBeVisible();
    await expect(nav.getByRole('button', { name: /contact/i })).toBeVisible();
  });

  test('profile column displays name and title', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Pedro Henrique Rocha Moy' })
    ).toBeVisible();
    await expect(
      page.getByAltText('Pedro Henrique Rocha Moy')
    ).toBeVisible();
  });

  test('navbar has social icon links', async ({ page }) => {
    const nav = page.locator('nav');
    const github = nav.getByRole('link', { name: /github/i });
    await expect(github).toBeVisible();
    await expect(github).toHaveAttribute('href', 'https://github.com/phrmoy');

    const linkedin = nav.getByRole('link', { name: /linkedin/i });
    await expect(linkedin).toBeVisible();
    await expect(linkedin).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/phrmoy/'
    );
  });

  test('profile column has education entries', async ({ page }) => {
    await expect(
      page.getByText('Executive MBA in Business Administration')
    ).toBeVisible();
    await expect(
      page.getByText('Georgia Institute of Technology')
    ).toBeVisible();
  });

  test('profile column shows inline interests', async ({ page }) => {
    await expect(page.getByText(/Interests:.*ML & AI/)).toBeVisible();
  });

  test('resume section has experience entries', async ({ page }) => {
    const resume = page.locator('#resume');
    await expect(resume).toBeVisible();
    await expect(resume.getByText('Chief Architect')).toBeVisible();
    await expect(resume.getByText('AI Consultant')).toBeVisible();
    await expect(resume.getByText('AI Software Developer')).toBeVisible();
  });

  test('resume section has portfolio entry', async ({ page }) => {
    const resume = page.locator('#resume');
    const portfolioLink = resume.getByRole('link', {
      name: 'Pastoral Conscience AI',
    });
    await expect(portfolioLink).toBeVisible();
    await expect(portfolioLink).toHaveAttribute('target', '_blank');
  });

  test('navbar download resume icon link has correct attributes', async ({
    page,
  }) => {
    const nav = page.locator('nav');
    const downloadLink = nav.getByRole('link', {
      name: /download resume/i,
    });
    await expect(downloadLink).toBeVisible();
    await expect(downloadLink).toHaveAttribute('href', '/resume.pdf');
    await expect(downloadLink).toHaveAttribute('download', '');
  });

  test('contact modal opens and closes', async ({ page }) => {
    await page.getByRole('button', { name: /contact/i }).click();
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('Get in Touch')).toBeVisible();
    await expect(dialog.getByLabel(/name/i)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });

  test('contact modal closes on X button', async ({ page }) => {
    await page.getByRole('button', { name: /contact/i }).click();
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    await page.getByRole('button', { name: /close contact form/i }).click();
    await expect(dialog).not.toBeVisible();
  });
});
