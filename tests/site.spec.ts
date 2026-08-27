import { expect, test } from '@playwright/test';

// Vite is configured with base: '/resume/', so every asset and the document
// itself are served under that prefix.
const SITE_PATH = '/resume/';

const PROFILE_NAME = 'Pedro Henrique Rocha Moy';
const PROFILE_TITLE =
  'Artificial Intelligence, Machine Learning, Data Science, Data & Software Engineering';

test.describe('Contractor Site', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SITE_PATH);
  });

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(`${PROFILE_NAME} - ${PROFILE_TITLE}`);
  });

  test('navigation bar is visible with download and contact', async ({
    page,
  }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    await expect(nav.getByText(PROFILE_NAME)).toBeVisible();
    await expect(
      nav.getByRole('link', { name: /download resume/i })
    ).toBeVisible();
    await expect(nav.getByRole('button', { name: /contact/i })).toBeVisible();
  });

  test('profile column displays the photo', async ({ page }) => {
    await expect(page.getByAltText(PROFILE_NAME)).toBeVisible();
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

  // The title is rendered twice -- in the navbar for >=xl and in the profile
  // column below xl -- with CSS hiding whichever does not apply. Exactly one
  // copy must be visible at any viewport, so the text is never duplicated on
  // screen and never disappears entirely.
  test('professional title is visible exactly once', async ({ page }) => {
    const copies = page.getByText(PROFILE_TITLE);
    await expect(copies).toHaveCount(2);
    await expect(copies.filter({ visible: true })).toHaveCount(1);
  });

  test('resume section has experience entries', async ({ page }) => {
    const resume = page.locator('#resume');
    await expect(resume).toBeVisible();
    await expect(resume.getByText('AI Advisor')).toBeVisible();
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
    await expect(downloadLink).toHaveAttribute('href', '/resume/resume.pdf');
    await expect(downloadLink).toHaveAttribute(
      'download',
      /^PHRMOY_RESUME_rev\d{8}\.pdf$/
    );
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

test.describe('Theme', () => {
  test('follows the operating system preference on first visit', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto(SITE_PATH);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('the toggle pins a theme that survives a reload', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto(SITE_PATH);

    await page.getByRole('button', { name: /switch to light theme/i }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(
      page.getByRole('button', { name: /switch to dark theme/i })
    ).toBeVisible();
  });
});
