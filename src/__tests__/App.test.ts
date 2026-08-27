import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import App from '../App.svelte';
import { SystemScheme, Theme, ThemePreference } from '../types/theme';
import { createFakeThemePort, type FakeThemePort } from './fakes/theme';

function renderApp(port: FakeThemePort = createFakeThemePort()) {
  return { port, ...render(App, { props: { themePort: port } }) };
}

describe('App', () => {
  it('renders the navigation bar', () => {
    renderApp();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders the name in the navbar', () => {
    renderApp();
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveTextContent(/Pedro Henrique Rocha Moy/i);
  });

  it('renders the resume section', () => {
    const { container } = renderApp();
    expect(container.querySelector('#resume')).toBeInTheDocument();
  });

  it('renders download resume link in navbar', () => {
    renderApp();
    expect(
      screen.getByRole('link', { name: /download resume/i })
    ).toBeInTheDocument();
  });

  it('renders contact button in navbar', () => {
    renderApp();
    expect(
      screen.getByRole('button', { name: /contact/i })
    ).toBeInTheDocument();
  });

  it('renders two-column layout', () => {
    const { container } = renderApp();
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
    expect(main?.querySelector('aside')).toBeInTheDocument();
    expect(main?.querySelector('#resume')).toBeInTheDocument();
  });

  it('applies the system theme through the injected port', () => {
    const { port } = renderApp(
      createFakeThemePort({ systemScheme: SystemScheme.Dark })
    );
    expect(port.appliedThemes).toEqual([Theme.Dark]);
    expect(
      screen.getByRole('button', { name: /switch to light theme/i })
    ).toBeInTheDocument();
  });

  it('switches theme when the navbar toggle is pressed', async () => {
    const { port } = renderApp(
      createFakeThemePort({ systemScheme: SystemScheme.Light })
    );

    await fireEvent.click(
      screen.getByRole('button', { name: /switch to dark theme/i })
    );

    expect(port.writtenPreferences).toEqual([ThemePreference.Dark]);
    expect(port.appliedThemes).toEqual([Theme.Light, Theme.Dark]);
    expect(
      screen.getByRole('button', { name: /switch to light theme/i })
    ).toBeInTheDocument();
  });

  it('stops listening to the operating system when unmounted', () => {
    const port = createFakeThemePort();
    const { unmount } = render(App, { props: { themePort: port } });
    expect(port.listenerCount).toBe(1);

    unmount();

    expect(port.listenerCount).toBe(0);
  });

  it('opens and closes the contact modal', async () => {
    renderApp();

    await fireEvent.click(screen.getByRole('button', { name: 'Contact' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await fireEvent.click(
      screen.getByRole('button', { name: /close contact form/i })
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
