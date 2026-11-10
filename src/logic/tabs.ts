/**
 * Index of the tab a key press moves to in a horizontal tab list, following
 * the WAI-ARIA tabs pattern: the arrows wrap around, Home and End jump to the
 * ends. Returns null for any other key so the caller leaves the event alone.
 */
export function nextTabIndex(
  current: number,
  key: string,
  count: number
): number | null {
  switch (key) {
    case 'ArrowRight':
      return (current + 1) % count;
    case 'ArrowLeft':
      return (current - 1 + count) % count;
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
    default:
      return null;
  }
}

/**
 * The tab a URL fragment such as `#portfolio` names, or null when it names
 * none. Matching ignores case so a hand-typed `#Portfolio` still works.
 */
export function tabFromHash<T extends string>(
  hash: string,
  tabs: readonly T[]
): T | null {
  const name = hash.replace(/^#/, '').toLowerCase();
  return tabs.find((tab) => tab === name) ?? null;
}
