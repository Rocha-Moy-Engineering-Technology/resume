import type { NavigationPort } from '../../types/ports/navigation';

export function createBrowserNavigationPort(): NavigationPort {
  const buttons = new Map<number, HTMLButtonElement>();
  let start: HTMLElement | undefined;

  return {
    readHash: () => window.location.hash,
    watchHash(listener) {
      window.addEventListener('hashchange', listener);
      return () => window.removeEventListener('hashchange', listener);
    },
    replaceHash(tab) {
      history.replaceState(history.state, '', `#${tab}`);
    },
    revealStart() {
      if (!start) return;
      const margin = parseFloat(getComputedStyle(start).scrollMarginTop) || 0;
      if (start.getBoundingClientRect().top < margin) {
        start.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    },
    focusTab(index) {
      buttons.get(index)?.focus();
    },
    registerTab(element, index) {
      buttons.set(index, element);
      return {
        destroy: () => {
          buttons.delete(index);
        },
      };
    },
    registerStart(element) {
      start = element;
      return {
        destroy: () => {
          start = undefined;
        },
      };
    },
  };
}
