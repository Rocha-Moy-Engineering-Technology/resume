import '@testing-library/jest-dom';
import { afterEach, beforeEach, expect, vi } from 'vitest';

const started = new Map<string, number>();
beforeEach((context) => {
  started.set(context.task.id, performance.now());
});
afterEach((context) => {
  const elapsed = performance.now() - started.get(context.task.id)!;
  started.delete(context.task.id);
  expect(elapsed, 'each unit case must finish within 5 seconds').toBeLessThan(
    5000
  );
});

// Mock fetch globally
global.fetch = vi.fn();

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
});
