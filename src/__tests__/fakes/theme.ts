import type {
  SystemSchemeListener,
  ThemePort,
  Unsubscribe,
} from '../../types/ports/theme';
import { SystemScheme, Theme, ThemePreference } from '../../types/theme';

export interface FakeThemePort extends ThemePort {
  readonly appliedThemes: readonly Theme[];
  readonly writtenPreferences: readonly ThemePreference[];
  readonly listenerCount: number;
  emitSystemScheme(scheme: SystemScheme): void;
}

export interface FakeThemePortConfig {
  readonly storedPreference?: ThemePreference;
  readonly systemScheme?: SystemScheme;
}

/**
 * In-memory stand-in for the browser theme port. Unit tests never touch
 * localStorage, matchMedia or the document element.
 */
export function createFakeThemePort(
  config: FakeThemePortConfig = {}
): FakeThemePort {
  const appliedThemes: Theme[] = [];
  const writtenPreferences: ThemePreference[] = [];
  const listeners = new Set<SystemSchemeListener>();
  let storedPreference = config.storedPreference ?? ThemePreference.System;
  let systemScheme = config.systemScheme ?? SystemScheme.Light;

  return {
    readPreference: (): ThemePreference => storedPreference,

    writePreference: (preference: ThemePreference): void => {
      storedPreference = preference;
      writtenPreferences.push(preference);
    },

    readSystemScheme: (): SystemScheme => systemScheme,

    watchSystemScheme: (listener: SystemSchemeListener): Unsubscribe => {
      listeners.add(listener);
      return (): void => {
        listeners.delete(listener);
      };
    },

    applyTheme: (theme: Theme): void => {
      appliedThemes.push(theme);
    },

    emitSystemScheme: (scheme: SystemScheme): void => {
      systemScheme = scheme;
      for (const listener of listeners) {
        listener(scheme);
      }
    },

    get appliedThemes(): readonly Theme[] {
      return appliedThemes;
    },

    get writtenPreferences(): readonly ThemePreference[] {
      return writtenPreferences;
    },

    get listenerCount(): number {
      return listeners.size;
    },
  };
}
