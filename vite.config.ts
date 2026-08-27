import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';
import { coverageConfigDefaults } from 'vitest/config';
import {
  DARK_SCHEME_QUERY,
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
} from './src/types/theme';

const THEME_PLACEHOLDERS: ReadonlyArray<readonly [string, string]> = [
  ['__THEME_STORAGE_KEY__', THEME_STORAGE_KEY],
  ['__THEME_ATTRIBUTE__', THEME_ATTRIBUTE],
  ['__DARK_SCHEME_QUERY__', DARK_SCHEME_QUERY],
];

/**
 * Keeps the pre-paint theme snippet in index.html single-sourced from
 * src/types/theme.ts instead of hard-coding the storage key twice.
 */
function themeBootstrap(): Plugin {
  return {
    name: 'theme-bootstrap',
    transformIndexHtml(html: string): string {
      return THEME_PLACEHOLDERS.reduce(
        (current, [token, value]) => current.split(token).join(value),
        html
      );
    },
  };
}

export default defineConfig({
  base: '/resume/',
  plugins: [tailwindcss(), svelte(), themeBootstrap()],
  resolve: {
    conditions: ['browser'],
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    coverage: {
      // Ports, adapters and static assets are covered by integration and
      // end-to-end tests, not by the unit suite.
      exclude: [
        ...coverageConfigDefaults.exclude,
        'src/assets/**',
        'src/types/ports/**',
        'src/state/adapters/**',
        'src/__tests__/**',
      ],
    },
  },
});
