// Proves agent_context/docs/sdoc/modules/contractor-site/GHERKIN/bilingual-resume.feature.
import { readFile } from 'node:fs/promises';
import { COPY } from '../src/types/language';
import { RESUMES } from '../src/types/resume';
import { captureEvidence, expect, test } from './fixtures';

test('Choose a language by its flag', async ({ page }) => {
  await page.goto('/');
  const english = page.getByRole('link', { name: 'English', exact: true });
  const portuguese = page.getByRole('link', {
    name: 'Português',
    exact: true,
  });
  await expect(english.locator('svg[data-flag="us"]')).toBeVisible();
  await expect(portuguese.locator('svg[data-flag="br"]')).toBeVisible();
  await expect(english).toHaveText('EN');
  await expect(portuguese).toHaveText('PT');
  await expect(english.locator('span')).toHaveClass('underline');
  await expect(portuguese.locator('span')).not.toHaveClass('underline');
  await portuguese.click();
  await expect(
    page.getByRole('link', { name: 'Português', exact: true }).locator('span')
  ).toHaveClass('underline');
  await expect(
    page.getByRole('link', { name: 'English', exact: true }).locator('span')
  ).not.toHaveClass('underline');
});

test('Switch languages and reopen the shared Portuguese URL', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('link', { name: 'Português', exact: true }).click();
  await expect(page).toHaveURL('/?lang=pt-BR');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  const resume = RESUMES['pt-BR'];
  await expect(page).toHaveTitle(
    `${resume.profile.name} - ${resume.profile.title}`
  );
  await expect(
    page.getByRole('link', { name: 'Português', exact: true })
  ).toHaveAttribute('aria-current', 'page');
  await expect(
    page.getByRole('heading', { name: 'Formação Acadêmica' })
  ).toBeVisible();
  for (const entry of resume.education) {
    await expect(page.getByText(entry.degree, { exact: true })).toBeVisible();
  }
  const panel = page.getByRole('tabpanel', {
    name: 'Experiência',
    exact: true,
  });
  for (const entry of resume.experience) {
    await expect(
      panel.getByRole('heading', { name: entry.title, exact: true })
    ).toBeVisible();
    for (const description of entry.descriptions) {
      await expect(panel.getByText(description, { exact: true })).toBeVisible();
    }
  }
  await page.getByRole('tab', { name: 'Portfólio', exact: true }).click();
  for (const entry of resume.portfolio) {
    await expect(
      page.getByRole('link', { name: entry.title, exact: true })
    ).toHaveAttribute('href', entry.url);
    await expect(
      page.getByText(entry.description, { exact: true })
    ).toBeVisible();
  }
  await captureEvidence(page, testInfo, 'Portuguese portfolio');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(
    page.getByRole('tab', { name: 'Portfólio', exact: true })
  ).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('link', { name: 'English', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveTitle(
    `${RESUMES.en.profile.name} - ${RESUMES.en.profile.title}`
  );
  await expect(
    page.getByRole('tab', { name: 'Experience', exact: true })
  ).toBeVisible();
});

test('unsupported language falls back to English', async ({ page }) => {
  await page.goto('/?lang=unknown');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(
    page.getByRole('link', { name: 'Download Resume', exact: true })
  ).toHaveAttribute('href', '/resume.pdf');
});

for (const language of ['en', 'pt-BR'] as const) {
  test(`Download the PDF matching the selected language: ${language}`, async ({
    page,
  }) => {
    const copy = COPY[language];
    await page.clock.install({ time: new Date(2031, 1, 3, 12) });
    await page.goto(`/?lang=${language}`);
    const downloadEvent = page.waitForEvent('download');
    await page.getByRole('link', { name: copy.download, exact: true }).click();
    const download = await downloadEvent;
    expect(download.suggestedFilename()).toBe(
      `${copy.filename}_rev20310203.pdf`
    );
    const saved = await download.path();
    expect(await readFile(saved!)).toEqual(
      await readFile(`public/${copy.pdf}`)
    );
  });
}

test('Send a Portuguese contact message with validation and retry', async ({
  page,
}, testInfo) => {
  let attempts = 0;
  await page.route('https://api.web3forms.com/submit', async (route) => {
    attempts += 1;
    expect(route.request().postDataJSON()).toMatchObject({
      name: 'Ana',
      email: 'ana@example.com',
      message: 'Olá, gostaria de conversar.',
    });
    await route.fulfill({
      status: attempts === 1 ? 503 : 200,
      json: { success: attempts > 1 },
    });
  });
  await page.goto('/?lang=pt-BR');
  await page.getByRole('button', { name: 'Contato', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Formulário de contato' });
  await expect(
    dialog.getByRole('heading', { name: 'Entre em contato' })
  ).toBeVisible();
  await dialog
    .getByRole('button', { name: 'Enviar mensagem', exact: true })
    .click();
  for (const message of [
    'Informe seu nome',
    'Informe seu e-mail',
    'Escreva uma mensagem',
  ]) {
    await expect(dialog.getByText(message, { exact: true })).toBeVisible();
  }
  expect(attempts).toBe(0);
  await dialog.getByLabel('Nome', { exact: true }).fill('Ana');
  await dialog.getByLabel('E-mail', { exact: true }).fill('invalid');
  await dialog
    .getByLabel('Mensagem', { exact: true })
    .fill('Olá, gostaria de conversar.');
  await dialog
    .getByRole('button', { name: 'Enviar mensagem', exact: true })
    .click();
  await expect(
    dialog.getByText(COPY['pt-BR'].contact.validation.emailInvalid)
  ).toBeVisible();
  await dialog.getByLabel('E-mail', { exact: true }).fill('ana@example.com');
  await dialog
    .getByRole('button', { name: 'Enviar mensagem', exact: true })
    .click();
  await expect(dialog.getByText(COPY['pt-BR'].contact.failure)).toBeVisible();
  await expect(dialog.getByLabel('Mensagem', { exact: true })).toHaveValue(
    'Olá, gostaria de conversar.'
  );
  await captureEvidence(page, testInfo, 'Portuguese contact failure');
  await dialog
    .getByRole('button', { name: 'Enviar mensagem', exact: true })
    .click();
  await expect(dialog.getByText(COPY['pt-BR'].contact.success)).toBeVisible();
  await captureEvidence(page, testInfo, 'Portuguese contact success');
  await dialog.getByRole('button', { name: 'Enviar outra mensagem' }).click();
  await expect(dialog.getByLabel('Nome', { exact: true })).toHaveValue('');
  await dialog
    .getByRole('button', { name: 'Fechar formulário de contato' })
    .click();
  await expect(dialog).toBeHidden();
  await expect(
    page.getByRole('button', { name: 'Contato', exact: true })
  ).toBeFocused();
  expect(attempts).toBe(2);
});

for (const width of [320, 375, 640, 768, 1024, 1280, 1440, 1536, 1920]) {
  test(`Read Portuguese at phone and desktop widths: ${width}`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/?lang=pt-BR');
    for (const theme of ['light', 'dark']) {
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth)
      ).toBeLessThanOrEqual(width);
      await expect(
        page
          .getByText(RESUMES['pt-BR'].profile.title, { exact: true })
          .filter({ visible: true })
      ).toHaveCount(1);
      await expect(
        page.getByRole('link', { name: 'English', exact: true })
      ).toBeInViewport();
      await expect(
        page.getByRole('button', { name: 'Contato', exact: true })
      ).toBeInViewport();
      await captureEvidence(page, testInfo, `Portuguese ${theme} ${width}`);
      if (width >= 1024) {
        await page
          .getByRole('tabpanel', { name: 'Experiência', exact: true })
          .locator('article')
          .last()
          .scrollIntoViewIfNeeded();
        const tab = page.getByRole('tab', { name: 'Portfólio', exact: true });
        await tab.click();
        const tabBounds = await tab.boundingBox();
        const navBounds = await page.locator('nav').boundingBox();
        expect(tabBounds!.y).toBeGreaterThanOrEqual(
          navBounds!.y + navBounds!.height
        );
        await page
          .getByRole('tab', { name: 'Experiência', exact: true })
          .click();
        await page.evaluate(() =>
          window.scrollTo({ top: 0, behavior: 'instant' })
        );
      }
      await page.getByRole('button', { name: /Mudar para tema/ }).click();
    }
    await page.getByRole('button', { name: 'Contato', exact: true }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await captureEvidence(page, testInfo, `Portuguese contact ${width}`);
    await page.keyboard.press('Escape');
  });
}
