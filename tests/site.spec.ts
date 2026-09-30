import { expect, test } from '@playwright/test';
// Expected resume content comes from src/types/resume.ts, the data the page
// renders, so editing the resume never means editing this spec. Entry text is
// matched exactly: the default match ignores case and accepts a substring, so
// a short title would also hit a longer title or a bullet that contains it.
import {
  EDUCATION_ENTRIES,
  EXPERIENCE_ENTRIES,
  PORTFOLIO_ENTRIES,
  PROFILE,
} from '../src/types/resume';

// Vite is configured with base: '/resume/', so every asset and the document
// itself are served under that prefix.
const SITE_PATH = '/resume/';

test.describe('Contractor Site', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SITE_PATH);
  });

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(`${PROFILE.name} - ${PROFILE.title}`);
  });

  test('navigation bar is visible with download and contact', async ({
    page,
  }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    await expect(nav.getByText(PROFILE.name)).toBeVisible();
    await expect(
      nav.getByRole('link', { name: /download resume/i })
    ).toBeVisible();
    await expect(nav.getByRole('button', { name: /contact/i })).toBeVisible();
  });

  test('profile column displays the photo', async ({ page }) => {
    await expect(page.getByAltText(PROFILE.name)).toBeVisible();
  });

  test('navbar has social icon links', async ({ page }) => {
    const nav = page.locator('nav');
    const github = nav.getByRole('link', { name: /github/i });
    await expect(github).toBeVisible();
    await expect(github).toHaveAttribute('href', PROFILE.github);

    const linkedin = nav.getByRole('link', { name: /linkedin/i });
    await expect(linkedin).toBeVisible();
    await expect(linkedin).toHaveAttribute('href', PROFILE.linkedin);
  });

  test('profile column has education entries', async ({ page }) => {
    for (const entry of EDUCATION_ENTRIES) {
      await expect(page.getByText(entry.degree, { exact: true })).toBeVisible();
      await expect(
        page.getByText(entry.institution, { exact: true })
      ).toBeVisible();
    }
  });

  // The title is rendered twice -- in the navbar for >=xl and in the profile
  // column below xl -- with CSS hiding whichever does not apply. Exactly one
  // copy must be visible at any viewport, so the text is never duplicated on
  // screen and never disappears entirely.
  test('professional title is visible exactly once', async ({ page }) => {
    const copies = page.getByText(PROFILE.title);
    await expect(copies).toHaveCount(2);
    await expect(copies.filter({ visible: true })).toHaveCount(1);
  });

  test('resume section has experience entries', async ({ page }) => {
    const resume = page.locator('#resume');
    await expect(resume).toBeVisible();
    for (const entry of EXPERIENCE_ENTRIES) {
      await expect(
        resume.getByText(entry.title, { exact: true })
      ).toBeVisible();
    }
  });

  test('resume section has portfolio entry', async ({ page }) => {
    const resume = page.locator('#resume');
    for (const entry of PORTFOLIO_ENTRIES) {
      const portfolioLink = resume.getByRole('link', {
        name: entry.title,
        exact: true,
      });
      await expect(portfolioLink).toBeVisible();
      await expect(portfolioLink).toHaveAttribute('target', '_blank');
    }
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
