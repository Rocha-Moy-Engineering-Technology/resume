import type { Page } from '@playwright/test';
import { CONTACT_REQUEST_TIMEOUT_MS } from '../src/types/contact';
import { captureEvidence, expect, test } from './fixtures';

// Scenarios: agent_context/docs/sdoc/modules/contractor-site/GHERKIN/contact-reliability.feature

const CONTACT_ENDPOINT = 'https://api.web3forms.com/submit';
const DETAILS = {
  name: 'Example Visitor',
  email: 'visitor@example.com',
  message: 'This is an intercepted test message.',
};

async function openContact(page: Page): Promise<void> {
  await page.goto('/');
  await page.getByRole('button', { name: 'Contact', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
}

async function fillContact(page: Page): Promise<void> {
  await page.getByLabel('Name', { exact: true }).fill(DETAILS.name);
  await page.getByLabel('Email', { exact: true }).fill(DETAILS.email);
  await page.getByLabel('Message', { exact: true }).fill(DETAILS.message);
}

test.describe('Contact reliability', () => {
  test('Prevent duplicate contact submissions', async ({ page }, testInfo) => {
    let requests = 0;
    let release!: () => void;
    const pending = new Promise<void>((resolve) => (release = resolve));
    await page.route(CONTACT_ENDPOINT, async (route) => {
      requests += 1;
      await pending;
      await route.fulfill({ json: { success: true } });
    });
    await openContact(page);
    await fillContact(page);
    await page.locator('form').evaluate((form) => {
      (form as HTMLFormElement).requestSubmit();
      (form as HTMLFormElement).requestSubmit();
    });
    await expect.poll(() => requests).toBeGreaterThan(0);
    await expect(
      page.getByRole('button', { name: 'Sending...' })
    ).toBeDisabled();
    await expect(page.getByLabel('Name', { exact: true })).toBeDisabled();
    await expect(page.getByLabel('Email', { exact: true })).toBeDisabled();
    await expect(page.getByLabel('Message', { exact: true })).toBeDisabled();
    await captureEvidence(
      page,
      testInfo,
      'One message sending with fields disabled'
    );
    release();
    await expect(page.getByText('Message sent successfully!')).toBeVisible();
    expect(requests).toBe(1);
  });

  test('Retry a failed contact message', async ({ page }, testInfo) => {
    let requests = 0;
    await page.route(CONTACT_ENDPOINT, async (route) => {
      requests += 1;
      await route.fulfill({
        status: requests === 1 ? 503 : 200,
        json: { success: requests !== 1 },
      });
    });
    await openContact(page);
    await fillContact(page);
    await page.getByRole('button', { name: 'Send Message' }).click();
    await expect(
      page.getByText('Failed to send message. Please try again.')
    ).toBeVisible();
    await expect(page.getByLabel('Name', { exact: true })).toHaveValue(
      DETAILS.name
    );
    await expect(page.getByLabel('Email', { exact: true })).toHaveValue(
      DETAILS.email
    );
    await expect(page.getByLabel('Message', { exact: true })).toHaveValue(
      DETAILS.message
    );
    await captureEvidence(page, testInfo, 'Failed message retained for retry');
    await page.getByRole('button', { name: 'Send Message' }).click();
    await expect(page.getByText('Message sent successfully!')).toBeVisible();
    await captureEvidence(page, testInfo, 'Successful retry confirmation');
    await page.getByRole('button', { name: 'Send another message' }).click();
    await expect(page.getByLabel('Name', { exact: true })).toHaveValue('');
    expect(requests).toBe(2);
  });

  test('invalid contact response fails safely and keeps the message', async ({
    page,
  }) => {
    await page.route(CONTACT_ENDPOINT, (route) =>
      route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<html>Error</html>',
      })
    );
    await openContact(page);
    await fillContact(page);
    await page.getByRole('button', { name: 'Send Message' }).click();
    await expect(
      page.getByText('Failed to send message. Please try again.')
    ).toBeVisible();
    await expect(page.getByLabel('Message', { exact: true })).toHaveValue(
      DETAILS.message
    );
  });

  test('nonboolean success response does not claim a message was sent', async ({
    page,
  }) => {
    await page.route(CONTACT_ENDPOINT, (route) =>
      route.fulfill({ json: { success: 'true' } })
    );
    await openContact(page);
    await fillContact(page);
    await page.getByRole('button', { name: 'Send Message' }).click();
    await expect(
      page.getByText('Failed to send message. Please try again.')
    ).toBeVisible();
    await expect(page.getByLabel('Message', { exact: true })).toHaveValue(
      DETAILS.message
    );
  });

  test('contact timeout restores retry without losing the message', async ({
    page,
  }) => {
    let requested = false;
    await page.route(CONTACT_ENDPOINT, async () => {
      requested = true;
    });
    await openContact(page);
    await page.clock.install();
    await fillContact(page);
    await page.getByRole('button', { name: 'Send Message' }).click();
    await expect.poll(() => requested).toBe(true);
    await page.clock.fastForward(CONTACT_REQUEST_TIMEOUT_MS + 1);
    await expect(
      page.getByText('Failed to send message. Please try again.')
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Send Message' })
    ).toBeEnabled();
    await expect(page.getByLabel('Message', { exact: true })).toHaveValue(
      DETAILS.message
    );
  });

  test('contact validation blocks malformed input without a request', async ({
    page,
  }) => {
    let requests = 0;
    await page.route(CONTACT_ENDPOINT, (route) => {
      requests += 1;
      return route.abort();
    });
    await openContact(page);
    await fillContact(page);
    await page.getByLabel('Email', { exact: true }).fill('not-an-email');
    await page.getByRole('button', { name: 'Send Message' }).click();
    await expect(
      page.getByText('Please enter a valid email address')
    ).toBeVisible();
    expect(requests).toBe(0);
  });

  test('empty contact form reports all required fields', async ({ page }) => {
    await openContact(page);
    await page.getByRole('button', { name: 'Send Message' }).click();
    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Message is required')).toBeVisible();
  });

  test('closing a sending contact dialog cancels the request', async ({
    page,
  }) => {
    let requested = false;
    await page.route(CONTACT_ENDPOINT, async () => {
      requested = true;
    });
    await openContact(page);
    await fillContact(page);
    await page.getByRole('button', { name: 'Send Message' }).click();
    await expect.poll(() => requested).toBe(true);
    const cancelled = page.waitForEvent('requestfailed', {
      predicate: (request) => request.url() === CONTACT_ENDPOINT,
    });
    await page.getByRole('button', { name: 'Close contact form' }).click();
    await cancelled;
    await expect(page.getByRole('dialog')).toBeHidden();
    await page.getByRole('button', { name: 'Contact', exact: true }).click();
    await expect(page.getByLabel('Message', { exact: true })).toHaveValue('');
  });
});

test.describe('Contact modal accessibility', () => {
  test('Keep keyboard focus inside the contact dialog', async ({
    page,
  }, testInfo) => {
    await openContact(page);
    const dialog = page.getByRole('dialog');
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
    await expect
      .poll(() =>
        dialog.evaluate((element) => element.contains(document.activeElement))
      )
      .toBe(true);
    for (let index = 0; index < 8; index += 1) {
      await page.keyboard.press('Tab');
      await expect
        .poll(() =>
          dialog.evaluate((element) =>
            element.contains(document.activeElement)
              ? 'inside'
              : document.activeElement?.outerHTML.slice(0, 200)
          )
        )
        .toBe('inside');
    }
    await captureEvidence(page, testInfo, 'Open dialog with keyboard focus');
    for (let index = 0; index < 8; index += 1) {
      await page.keyboard.press('Shift+Tab');
      await expect
        .poll(() =>
          dialog.evaluate((element) => element.contains(document.activeElement))
        )
        .toBe(true);
    }
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect
      .poll(() => page.evaluate(() => document.body.style.overflow))
      .toBe('');
    await expect(
      page.getByRole('button', { name: 'Contact', exact: true })
    ).toBeFocused();
  });

  test('Reach contact controls in a short viewport', async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 320, height: 360 });
    await openContact(page);
    await fillContact(page);
    await page
      .getByRole('button', { name: 'Send Message' })
      .scrollIntoViewIfNeeded();
    const button = page.getByRole('button', { name: 'Send Message' });
    await expect(button).toBeInViewport();
    await captureEvidence(page, testInfo, 'Short viewport submit control');
    await page.getByRole('button', { name: 'Close contact form' }).click();
    await expect(page.getByRole('dialog')).toBeHidden();
  });
});
