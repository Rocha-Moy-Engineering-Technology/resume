import { SystemScheme, Theme, ThemePreference } from '../types/theme';

export function parsePreference(raw: string | null): ThemePreference {
  switch (raw) {
    case ThemePreference.Light:
      return ThemePreference.Light;
    case ThemePreference.Dark:
      return ThemePreference.Dark;
    default:
      return ThemePreference.System;
  }
}

export function toSystemScheme(prefersDark: boolean): SystemScheme {
  return prefersDark ? SystemScheme.Dark : SystemScheme.Light;
}

export function resolveTheme(
  preference: ThemePreference,
  systemScheme: SystemScheme
): Theme {
  switch (preference) {
    case ThemePreference.Light:
      return Theme.Light;
    case ThemePreference.Dark:
      return Theme.Dark;
    default:
      return systemScheme === SystemScheme.Dark ? Theme.Dark : Theme.Light;
  }
}

/**
 * Toggling always pins an explicit preference: whatever is on screen now, the
 * visitor gets the opposite and it stops following the operating system.
 */
export function nextPreference(
  preference: ThemePreference,
  systemScheme: SystemScheme
): ThemePreference {
  return resolveTheme(preference, systemScheme) === Theme.Dark
    ? ThemePreference.Light
    : ThemePreference.Dark;
}

export function themeToggleLabel(theme: Theme): string {
  return theme === Theme.Dark
    ? 'Switch to light theme'
    : 'Switch to dark theme';
}
