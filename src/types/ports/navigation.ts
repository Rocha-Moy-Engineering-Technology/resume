import type { ResumeTab } from '../navigation';

export interface NavigationHandle {
  destroy(): void;
}

export interface NavigationPort {
  readHash(): string;
  watchHash(listener: () => void): () => void;
  replaceHash(tab: ResumeTab): void;
  revealStart(): void;
  focusTab(index: number): void;
  registerTab(element: HTMLButtonElement, index: number): NavigationHandle;
  registerStart(element: HTMLElement): NavigationHandle;
}
