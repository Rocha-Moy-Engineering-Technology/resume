import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';
import { coverageConfigDefaults } from 'vitest/config';
import { escapeHtmlText, fillPlaceholders } from './src/logic/html';
import { PROFILE } from './src/types/resume';
import {
  DARK_SCHEME_QUERY,
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
} from './src/types/theme';

// The theme values land in the pre-paint script as they are; the name and
// professional title land in the document title, so they are HTML-escaped.
const INDEX_HTML_PLACEHOLDERS = [
  ['__THEME_STORAGE_KEY__', THEME_STORAGE_KEY],
  ['__THEME_ATTRIBUTE__', THEME_ATTRIBUTE],
  ['__DARK_SCHEME_QUERY__', DARK_SCHEME_QUERY],
  ['__PROFILE_NAME__', escapeHtmlText(PROFILE.name)],
  ['__PROFILE_TITLE__', escapeHtmlText(PROFILE.title)],
] as const;

/**
 * Keeps index.html single-sourced: the pre-paint theme snippet takes its key,
 * attribute and media query from src/types/theme.ts, and the document title
 * takes the name and professional title from src/types/resume.ts.
 */
function indexHtmlPlaceholders(): Plugin {
  return {
    name: 'index-html-placeholders',
    transformIndexHtml(html: string): string {
      return fillPlaceholders(html, INDEX_HTML_PLACEHOLDERS);
    },
  };
}

export default defineConfig({
  base: '/resume/',
  plugins: [tailwindcss(), svelte(), indexHtmlPlaceholders()],
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
