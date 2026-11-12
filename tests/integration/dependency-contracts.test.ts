import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';

const requireFromTest = createRequire(import.meta.url);
const estreeRequire = createRequire(
  requireFromTest.resolve('@typescript-eslint/typescript-estree/package.json')
);
const { minimatch } = estreeRequire('minimatch');

describe('Estree scoped matcher override', () => {
  it('resolves the patched matcher only in the intended dependency scope', () => {
    expect(estreeRequire('minimatch/package.json').version).toBe('11.0.8');
  });

  it.each([
    ['src/.generated/example.ts', 'src/**/*.ts', true],
    ['src/.example.ts', 'src/**/*.ts', true],
    ['src/example.ts', 'src/**/*.ts', true],
    ['src/example.js', 'src/**/*.ts', false],
    ['other/example.ts', 'src/**/*.ts', false],
  ])(
    'matches %s against %s using the consumed dot option',
    (path, pattern, expected) => {
      expect(minimatch(path, pattern, { dot: true })).toBe(expected);
    }
  );
});
