import type { NavigationPort } from '../../types/ports/navigation';
import type { ResumeTab } from '../../types/navigation';

export interface FakeNavigationPort extends NavigationPort {
  readonly listeners: Set<() => void>;
  readonly replacedHashes: ResumeTab[];
  readonly focusedTabs: number[];
  reveals: number;
  changeHash(value: string): void;
}

export function createFakeNavigationPort(initialHash = '') {
  let hash = initialHash;
  const listeners = new Set<() => void>();
  const buttons = new Map<number, HTMLButtonElement>();
  const port: FakeNavigationPort = {
    listeners,
    replacedHashes: [] as ResumeTab[],
    focusedTabs: [] as number[],
    reveals: 0,
    readHash: () => hash,
    watchHash(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    replaceHash(tab: ResumeTab) {
      hash = `#${tab}`;
      port.replacedHashes.push(tab);
    },
    revealStart() {
      port.reveals += 1;
    },
    focusTab(index: number) {
      port.focusedTabs.push(index);
      buttons.get(index)?.focus();
    },
    registerTab(element: HTMLButtonElement, index: number) {
      buttons.set(index, element);
      return {
        destroy: () => {
          buttons.delete(index);
        },
      };
    },
    registerStart() {
      return { destroy: () => undefined };
    },
    changeHash(value: string) {
      hash = value;
      listeners.forEach((listener) => listener());
    },
  };
  return port;
}
