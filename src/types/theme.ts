export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export enum ThemePreference {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}

export enum SystemScheme {
  Light = 'light',
  Dark = 'dark',
}

export interface ThemeController {
  readonly theme: Theme;
  readonly preference: ThemePreference;
  toggle(): void;
  destroy(): void;
}

/**
 * Single source of truth for the theme wiring. The pre-paint bootstrap snippet
 * in index.html is injected with these values by vite.config.ts, so the browser
 * never renders a frame with the wrong palette.
 */
export const THEME_STORAGE_KEY = 'phrmoy-resume:theme-preference';
export const THEME_ATTRIBUTE = 'data-theme';
export const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';
