import { describe, expect, it } from 'vitest';
import { createThemeController } from '../state/theme.svelte';
import { SystemScheme, Theme, ThemePreference } from '../types/theme';
import { createFakeThemePort } from './fakes/theme';

describe('createThemeController', () => {
  it('applies the system theme on creation when nothing is stored', () => {
    const port = createFakeThemePort({ systemScheme: SystemScheme.Dark });
    const controller = createThemeController(port);

    expect(controller.preference).toBe(ThemePreference.System);
    expect(controller.theme).toBe(Theme.Dark);
    expect(port.appliedThemes).toEqual([Theme.Dark]);
  });

  it('applies a stored preference over the system scheme', () => {
    const port = createFakeThemePort({
      storedPreference: ThemePreference.Light,
      systemScheme: SystemScheme.Dark,
    });
    const controller = createThemeController(port);

    expect(controller.theme).toBe(Theme.Light);
    expect(port.appliedThemes).toEqual([Theme.Light]);
  });

  it('persists and applies the opposite theme when toggled', () => {
    const port = createFakeThemePort({ systemScheme: SystemScheme.Light });
    const controller = createThemeController(port);

    controller.toggle();

    expect(controller.preference).toBe(ThemePreference.Dark);
    expect(controller.theme).toBe(Theme.Dark);
    expect(port.writtenPreferences).toEqual([ThemePreference.Dark]);
    expect(port.appliedThemes).toEqual([Theme.Light, Theme.Dark]);
  });

  it('toggles back to light from dark', () => {
    const port = createFakeThemePort({ systemScheme: SystemScheme.Dark });
    const controller = createThemeController(port);

    controller.toggle();

    expect(controller.preference).toBe(ThemePreference.Light);
    expect(controller.theme).toBe(Theme.Light);
  });

  it('follows live system changes while no preference is pinned', () => {
    const port = createFakeThemePort({ systemScheme: SystemScheme.Light });
    const controller = createThemeController(port);

    port.emitSystemScheme(SystemScheme.Dark);

    expect(controller.theme).toBe(Theme.Dark);
    expect(port.appliedThemes).toEqual([Theme.Light, Theme.Dark]);
  });

  it('ignores system changes once a preference is pinned', () => {
    const port = createFakeThemePort({
      storedPreference: ThemePreference.Light,
      systemScheme: SystemScheme.Light,
    });
    const controller = createThemeController(port);

    port.emitSystemScheme(SystemScheme.Dark);

    expect(controller.theme).toBe(Theme.Light);
  });

  it('stops listening to the system when destroyed', () => {
    const port = createFakeThemePort();
    const controller = createThemeController(port);
    expect(port.listenerCount).toBe(1);

    controller.destroy();

    expect(port.listenerCount).toBe(0);
  });
});
