import { defineConfig, devices } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(fileURLToPath(import.meta.url));
let agentRoot = projectRoot;
while (!existsSync(join(agentRoot, '.agent_root'))) {
  const parent = dirname(agentRoot);
  if (parent === agentRoot) throw new Error('Agent root marker not found');
  agentRoot = parent;
}

// Workers inherit the coordinator's choice; every invocation owns a fresh
// preview server and can never attach to another project's listener.
const port = Number(
  process.env.CONTRACTOR_SITE_TEST_PORT ??
    execFileSync(join(agentRoot, '.scripts/port_utility.py'), ['grab'], {
      cwd: agentRoot,
      encoding: 'utf8',
      timeout: 30_000,
    }).trim()
);
if (!Number.isInteger(port) || port < 5200 || port > 6199) {
  throw new Error('The site test port must be in the agent free-listen range');
}
process.env.CONTRACTOR_SITE_TEST_PORT = String(port);
process.env.CONTRACTOR_SITE_E2E_RUN ??= randomUUID();
process.env.CONTRACTOR_SITE_E2E_ROOT = join(
  agentRoot,
  'tmp',
  'contractor-site-headless',
  process.env.CONTRACTOR_SITE_E2E_RUN
);
const outputRoot = process.env.CONTRACTOR_SITE_E2E_ROOT;
const baseURL = `http://127.0.0.1:${port}`;
const browserOptions = {
  ...devices['Desktop Chrome'],
  ...(process.env.PLAYWRIGHT_CHROMIUM_PATH
    ? {
        launchOptions: {
          executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH,
        },
      }
    : { channel: 'chrome' }),
};

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  globalTeardown: './tests/evidence-teardown.ts',
  outputDir: join(outputRoot, 'results'),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: join(outputRoot, 'report') }],
  ],
  use: {
    baseURL,
    headless: true,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: '**/smoke.spec.ts',
      use: browserOptions,
    },
    {
      name: 'chromium-smoke',
      testMatch: '**/smoke.spec.ts',
      dependencies: ['chromium'],
      use: browserOptions,
    },
  ],
  webServer: {
    command: `npm run build && npm run preview -- --host 127.0.0.1 --port ${port} --strictPort`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
