import { nextPreference, resolveTheme } from '../logic/theme';
import type { ThemePort } from '../types/ports/theme';
import type { SystemScheme, Theme, ThemePreference } from '../types/theme';

export interface ThemeController {
  readonly theme: Theme;
  readonly preference: ThemePreference;
  toggle(): void;
  destroy(): void;
}

/**
 * Sole owner of the mutable theme state. Every mutation happens in this file;
 * callers read through getters and mutate only through `toggle`.
 */
export function createThemeController(port: ThemePort): ThemeController {
  let preference = $state<ThemePreference>(port.readPreference());
  let systemScheme = $state<SystemScheme>(port.readSystemScheme());

  function apply(): void {
    port.applyTheme(resolveTheme(preference, systemScheme));
  }

  const unsubscribe = port.watchSystemScheme((scheme: SystemScheme): void => {
    systemScheme = scheme;
    apply();
  });

  apply();

  return {
    get theme(): Theme {
      return resolveTheme(preference, systemScheme);
    },
    get preference(): ThemePreference {
      return preference;
    },
    toggle(): void {
      preference = nextPreference(preference, systemScheme);
      port.writePreference(preference);
      apply();
    },
    destroy(): void {
      unsubscribe();
    },
  };
}
