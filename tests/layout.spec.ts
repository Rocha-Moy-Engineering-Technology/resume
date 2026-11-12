import { readFile } from 'node:fs/promises';
import { PROFILE } from '../src/types/resume';
import { captureEvidence, expect, test } from './fixtures';

test.describe('Responsive layout and resume controls', () => {
  for (const width of [320, 375, 640, 1024, 1280, 1440]) {
    test(`viewport ${width} has one title and no horizontal overflow`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      await expect(
        page.getByText(PROFILE.title, { exact: true }).filter({ visible: true })
      ).toHaveCount(1);
      const overflow = await page.locator('body *').evaluateAll((elements) =>
        elements
          .filter(
            (element) => element.getBoundingClientRect().right > innerWidth
          )
          .map((element) => ({
            tag: element.tagName,
            class: element.className,
            right: element.getBoundingClientRect().right,
          }))
      );
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        JSON.stringify(overflow)
      ).toBeLessThanOrEqual(width);
      const name = await page
        .locator('nav')
        .getByText(PROFILE.name)
        .boundingBox();
      const controls = await page
        .locator('nav')
        .getByRole('button', { name: /switch to/i })
        .boundingBox();
      expect(name).not.toBeNull();
      expect(controls).not.toBeNull();
      const separated =
        name!.x + name!.width <= controls!.x ||
        name!.y + name!.height <= controls!.y ||
        controls!.y + controls!.height <= name!.y;
      expect(separated).toBe(true);
      const lineHeight = await page
        .locator('nav')
        .getByText(PROFILE.name)
        .evaluate((element) => {
          const style = getComputedStyle(element);
          return (
            parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.5
          );
        });
      expect(name!.height).toBeLessThanOrEqual(lineHeight * 2 + 1);
    });
  }

  test('resume tabs support keyboard navigation and hash changes', async ({
    page,
  }, testInfo) => {
    await page.goto('/');
    const experience = page.getByRole('tab', { name: 'Experience' });
    const portfolio = page.getByRole('tab', { name: 'Portfolio' });
    await experience.focus();
    await page.keyboard.press('ArrowRight');
    await expect(portfolio).toBeFocused();
    await expect(portfolio).toHaveAttribute('aria-selected', 'true');
    await expect(page).toHaveURL(/#portfolio$/);
    await captureEvidence(page, testInfo, 'Portfolio selected by keyboard');
    await page.keyboard.press('ArrowRight');
    await expect(experience).toBeFocused();
    await page.keyboard.press('End');
    await expect(portfolio).toBeFocused();
    await page.keyboard.press('Home');
    await expect(experience).toBeFocused();
    await page.evaluate(() => {
      window.location.hash = '#portfolio';
    });
    await expect(portfolio).toHaveAttribute('aria-selected', 'true');
  });

  test('download control saves the real PDF with its dated filename', async ({
    page,
  }) => {
    await page.clock.install({ time: new Date(2031, 1, 3, 12) });
    await page.goto('/');
    const downloaded = page.waitForEvent('download');
    await page
      .getByRole('link', { name: 'Download Resume', exact: true })
      .click();
    const download = await downloaded;
    expect(download.suggestedFilename()).toBe('PHRMOY_RESUME_rev20310203.pdf');
    const path = await download.path();
    expect(path).not.toBeNull();
    expect((await readFile(path!)).subarray(0, 5).toString()).toBe('%PDF-');
  });

  test('switching from deep experience returns the portfolio to its top', async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page
      .getByRole('tabpanel', { name: 'Experience' })
      .locator('article')
      .last()
      .scrollIntoViewIfNeeded();
    expect(
      await page
        .locator('#resume')
        .evaluate((element) => element.getBoundingClientRect().top)
    ).toBeLessThan(0);
    const portfolio = page.getByRole('tab', { name: 'Portfolio' });
    await portfolio.click();
    await expect(portfolio).toHaveAttribute('aria-selected', 'true');
    await expect(page).toHaveURL(/#portfolio$/);
    await expect
      .poll(() =>
        page
          .locator('#resume')
          .evaluate((element) => element.getBoundingClientRect().top)
      )
      .toBeGreaterThanOrEqual(0);
    const tabBounds = await portfolio.boundingBox();
    const navBounds = await page.locator('nav').boundingBox();
    expect(tabBounds).not.toBeNull();
    expect(navBounds).not.toBeNull();
    expect(tabBounds!.y).toBeGreaterThanOrEqual(
      navBounds!.y + navBounds!.height
    );
    await captureEvidence(
      page,
      testInfo,
      'Portfolio returned to its top after scrolling'
    );
  });

  test('dark and light mobile themes keep contact and tab controls usable', async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await captureEvidence(page, testInfo, 'Mobile dark theme');
    await page.getByRole('button', { name: 'Switch to light theme' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.getByRole('tab', { name: 'Portfolio' }).click();
    await captureEvidence(page, testInfo, 'Mobile light portfolio');
    await page.getByRole('button', { name: 'Contact', exact: true }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });
});
