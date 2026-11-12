import { defineConfig } from 'vitest/config';
import baseConfig from './vite.config';

// Reuse the production Svelte/Vite plugins and browser setup. This suite tests
// rendered inbound adapters; it is separate from controller/logic unit coverage.
export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ['tests/integration/**/*.test.ts'],
    coverage: { enabled: false },
  },
});
