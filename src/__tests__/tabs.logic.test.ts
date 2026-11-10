import { describe, expect, it } from 'vitest';
import { nextTabIndex, tabFromHash } from '../logic/tabs';

describe('nextTabIndex', () => {
  it('moves right and wraps from the last tab to the first', () => {
    expect(nextTabIndex(0, 'ArrowRight', 2)).toBe(1);
    expect(nextTabIndex(1, 'ArrowRight', 2)).toBe(0);
  });

  it('moves left and wraps from the first tab to the last', () => {
    expect(nextTabIndex(1, 'ArrowLeft', 2)).toBe(0);
    expect(nextTabIndex(0, 'ArrowLeft', 2)).toBe(1);
  });

  it('jumps to the ends on Home and End', () => {
    expect(nextTabIndex(2, 'Home', 4)).toBe(0);
    expect(nextTabIndex(0, 'End', 4)).toBe(3);
  });

  it('ignores every other key', () => {
    expect(nextTabIndex(0, 'Enter', 2)).toBeNull();
    expect(nextTabIndex(0, 'ArrowDown', 2)).toBeNull();
  });
});

describe('tabFromHash', () => {
  const tabs = ['experience', 'portfolio'] as const;

  it('returns the tab a fragment names', () => {
    expect(tabFromHash('#portfolio', tabs)).toBe('portfolio');
    expect(tabFromHash('#experience', tabs)).toBe('experience');
  });

  it('ignores case and a missing leading hash', () => {
    expect(tabFromHash('#Portfolio', tabs)).toBe('portfolio');
    expect(tabFromHash('portfolio', tabs)).toBe('portfolio');
  });

  it('returns null for an empty or unknown fragment', () => {
    expect(tabFromHash('', tabs)).toBeNull();
    expect(tabFromHash('#', tabs)).toBeNull();
    expect(tabFromHash('#contact', tabs)).toBeNull();
  });
});
