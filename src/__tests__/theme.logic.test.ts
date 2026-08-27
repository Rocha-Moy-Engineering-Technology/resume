import { describe, expect, it } from 'vitest';
import {
  nextPreference,
  parsePreference,
  resolveTheme,
  themeToggleLabel,
  toSystemScheme,
} from '../logic/theme';
import { SystemScheme, Theme, ThemePreference } from '../types/theme';

describe('parsePreference', () => {
  it('accepts the two explicit preferences', () => {
    expect(parsePreference('light')).toBe(ThemePreference.Light);
    expect(parsePreference('dark')).toBe(ThemePreference.Dark);
  });

  it('falls back to following the system for anything else', () => {
    expect(parsePreference(null)).toBe(ThemePreference.System);
    expect(parsePreference('')).toBe(ThemePreference.System);
    expect(parsePreference('system')).toBe(ThemePreference.System);
    expect(parsePreference('sepia')).toBe(ThemePreference.System);
  });
});

describe('toSystemScheme', () => {
  it('maps the media query result onto the scheme', () => {
    expect(toSystemScheme(true)).toBe(SystemScheme.Dark);
    expect(toSystemScheme(false)).toBe(SystemScheme.Light);
  });
});

describe('resolveTheme', () => {
  it('honours an explicit preference regardless of the system', () => {
    expect(resolveTheme(ThemePreference.Light, SystemScheme.Dark)).toBe(
      Theme.Light
    );
    expect(resolveTheme(ThemePreference.Dark, SystemScheme.Light)).toBe(
      Theme.Dark
    );
  });

  it('follows the system when no preference is stored', () => {
    expect(resolveTheme(ThemePreference.System, SystemScheme.Dark)).toBe(
      Theme.Dark
    );
    expect(resolveTheme(ThemePreference.System, SystemScheme.Light)).toBe(
      Theme.Light
    );
  });
});

describe('nextPreference', () => {
  it('pins the opposite of what is currently on screen', () => {
    expect(nextPreference(ThemePreference.System, SystemScheme.Dark)).toBe(
      ThemePreference.Light
    );
    expect(nextPreference(ThemePreference.System, SystemScheme.Light)).toBe(
      ThemePreference.Dark
    );
    expect(nextPreference(ThemePreference.Dark, SystemScheme.Dark)).toBe(
      ThemePreference.Light
    );
    expect(nextPreference(ThemePreference.Light, SystemScheme.Light)).toBe(
      ThemePreference.Dark
    );
  });
});

describe('themeToggleLabel', () => {
  it('describes the action, not the current state', () => {
    expect(themeToggleLabel(Theme.Dark)).toBe('Switch to light theme');
    expect(themeToggleLabel(Theme.Light)).toBe('Switch to dark theme');
  });
});
