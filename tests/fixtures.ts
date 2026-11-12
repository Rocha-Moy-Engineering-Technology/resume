import {
  test as base,
  expect,
  type Page,
  type TestInfo,
} from '@playwright/test';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export const test = base.extend<{ evidence: void }>({
  page: async ({ page }, use) => {
    // Contact tests must install their own intercepted response. An omitted
    // interception can never send a real message to the owner's inbox.
    await page.route('https://api.web3forms.com/**', (route) => route.abort());
    await page.route('https://fonts.googleapis.com/**', (route) =>
      route.abort()
    );
    await page.route('https://fonts.gstatic.com/**', (route) => route.abort());
    await use(page);
  },
  evidence: [
    async ({ page }, use, testInfo) => {
      await use();
      await captureEvidence(page, testInfo, 'Final state');
    },
    { auto: true },
  ],
});

export async function captureEvidence(
  page: Page,
  testInfo: TestInfo,
  label: string
): Promise<void> {
  const outputRoot = process.env.CONTRACTOR_SITE_E2E_ROOT;
  if (!outputRoot) throw new Error('Site evidence output directory missing');
  const key = createHash('sha256')
    .update([...testInfo.titlePath, label].join(' / '))
    .digest('hex')
    .slice(0, 16);
  const directory = join(outputRoot, 'screenshots');
  await mkdir(directory, { recursive: true });
  await page.screenshot({
    path: join(directory, `${key}.png`),
    fullPage: false,
    animations: 'disabled',
  });
  await writeFile(
    join(directory, `${key}.json`),
    JSON.stringify({
      title: [...testInfo.titlePath.slice(1), label].join(' / '),
      status: testInfo.status ?? 'captured',
      image: `${key}.png`,
    })
  );
}

export { expect };
