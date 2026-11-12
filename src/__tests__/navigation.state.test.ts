import { describe, expect, it } from 'vitest';
import { createNavigationController } from '../state/navigation.svelte';
import { ResumeTab } from '../types/navigation';
import { createFakeNavigationPort } from './fakes/navigation';

describe('resume navigation state', () => {
  it('starts on experience and ignores unknown hashes and keys', () => {
    const port = createFakeNavigationPort('#unrelated');
    const controller = createNavigationController(port);
    expect(controller.activeTab).toBe(ResumeTab.Experience);
    expect(controller.key('Enter', 0)).toBe(false);
    expect(port.focusedTabs).toEqual([]);
    controller.select(ResumeTab.Experience);
    expect(port.replacedHashes).toEqual([]);
    expect(port.reveals).toBe(0);
    controller.destroy();
    expect(port.listeners.size).toBe(0);
  });

  it('opens known hashes and follows later hash changes without rewriting history', () => {
    const port = createFakeNavigationPort('#Portfolio');
    const controller = createNavigationController(port);
    expect(controller.activeTab).toBe(ResumeTab.Portfolio);
    port.changeHash('#experience');
    expect(controller.activeTab).toBe(ResumeTab.Experience);
    port.changeHash('#ignored');
    expect(controller.activeTab).toBe(ResumeTab.Experience);
    expect(port.replacedHashes).toEqual([]);
  });

  it('updates history and reveals the column only when selection changes', () => {
    const port = createFakeNavigationPort();
    const controller = createNavigationController(port);
    controller.select(ResumeTab.Portfolio);
    expect(controller.activeTab).toBe(ResumeTab.Portfolio);
    expect(port.replacedHashes).toEqual([ResumeTab.Portfolio]);
    expect(port.reveals).toBe(1);
  });

  it('moves focus on recognized keys even if they name the current tab', () => {
    const port = createFakeNavigationPort();
    const controller = createNavigationController(port);
    expect(controller.key('ArrowRight', 0)).toBe(true);
    expect(controller.activeTab).toBe(ResumeTab.Portfolio);
    expect(controller.key('End', 1)).toBe(true);
    expect(port.focusedTabs).toEqual([1, 1]);
    expect(port.replacedHashes).toEqual([ResumeTab.Portfolio]);
  });
});
