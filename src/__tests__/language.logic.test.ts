import { describe, expect, it } from 'vitest';
import { resumeLanguage } from '../logic/language';
import { resumeDownloadFilename } from '../logic/page';
import { themeToggleLabel } from '../logic/theme';
import { validateFormData } from '../logic/validation';
import { createContactController } from '../state/contact.svelte';
import { COPY } from '../types/language';
import { Theme } from '../types/theme';
import { FakeContactPort } from './fakes/contact';

describe('resume language', () => {
  it('selects Portuguese explicitly and defaults unsupported or absent values to English', () => {
    expect(resumeLanguage('pt-BR')).toBe('pt-BR');
    for (const value of [null, '', 'en', 'fr', 'pt-PT']) {
      expect(resumeLanguage(value)).toBe('en');
    }
  });

  it('distinguishes the Portuguese download and translates both theme actions', () => {
    expect(
      resumeDownloadFilename({ year: 2026, month: 1, day: 2 }, 'pt-BR')
    ).toBe('PHRMOY_RESUME_PT_rev20260102.pdf');
    expect(themeToggleLabel(Theme.Dark, 'pt-BR')).toBe('Mudar para tema claro');
    expect(themeToggleLabel(Theme.Light, 'pt-BR')).toBe(
      'Mudar para tema escuro'
    );
  });

  it('uses the selected language for required and malformed field errors', () => {
    const copy = COPY['pt-BR'].contact;
    expect(
      validateFormData({ name: '', email: '', message: '' }, copy.validation)
        .errors
    ).toEqual({
      name: 'Informe seu nome',
      email: 'Informe seu e-mail',
      message: 'Escreva uma mensagem',
    });
    expect(
      validateFormData(
        { name: 'Ana', email: 'invalid', message: 'Olá' },
        copy.validation
      ).errors.email
    ).toBe('Informe um endereço de e-mail válido');
    expect(
      validateFormData(
        { name: 'Ana', email: 'ana@example.com', message: 'Olá' },
        copy.validation
      ).isValid
    ).toBe(true);
  });

  it('uses Portuguese throughout validation, failure, retry and success', () => {
    const port = new FakeContactPort();
    const form = createContactController(port, COPY['pt-BR'].contact);
    form.submit();
    expect(form.errors.name).toBe('Informe seu nome');
    form.input('name', 'Ana');
    form.input('email', 'ana@example.com');
    form.input('message', 'Olá');
    form.submit();
    port.reject();
    expect(form.message).toBe(
      'Não foi possível enviar a mensagem. Tente novamente.'
    );
    form.submit();
    port.resolve(true);
    expect(form.message).toBe('Mensagem enviada com sucesso!');
    form.destroy();
  });
});
