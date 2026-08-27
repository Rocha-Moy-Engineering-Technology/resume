import type { SystemScheme, Theme, ThemePreference } from '../theme';

export type SystemSchemeListener = (scheme: SystemScheme) => void;

export type Unsubscribe = () => void;

/**
 * Port isolating every browser side effect the theme feature needs:
 * persistence, operating-system preference, and DOM application.
 */
export interface ThemePort {
  readPreference(): ThemePreference;
  writePreference(preference: ThemePreference): void;
  readSystemScheme(): SystemScheme;
  watchSystemScheme(listener: SystemSchemeListener): Unsubscribe;
  applyTheme(theme: Theme): void;
}
