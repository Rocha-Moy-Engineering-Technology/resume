import { parsePreference, toSystemScheme } from '../../logic/theme';
import type {
  SystemSchemeListener,
  ThemePort,
  Unsubscribe,
} from '../../types/ports/theme';
import {
  DARK_SCHEME_QUERY,
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
  ThemePreference,
  type SystemScheme,
  type Theme,
} from '../../types/theme';

export function createBrowserThemePort(): ThemePort {
  const query = window.matchMedia(DARK_SCHEME_QUERY);

  return {
    readPreference(): ThemePreference {
      try {
        return parsePreference(window.localStorage.getItem(THEME_STORAGE_KEY));
      } catch {
        return ThemePreference.System;
      }
    },

    writePreference(preference: ThemePreference): void {
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, preference);
      } catch {
        // Storage blocked (private browsing): the choice stays session-only.
      }
    },

    readSystemScheme(): SystemScheme {
      return toSystemScheme(query.matches);
    },

    watchSystemScheme(listener: SystemSchemeListener): Unsubscribe {
      const handler = (event: MediaQueryListEvent): void => {
        listener(toSystemScheme(event.matches));
      };
      query.addEventListener('change', handler);
      return (): void => query.removeEventListener('change', handler);
    },

    applyTheme(theme: Theme): void {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
    },
  };
}
