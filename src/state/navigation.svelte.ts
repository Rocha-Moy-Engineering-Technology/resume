import { nextTabIndex, tabFromHash } from '../logic/tabs';
import {
  RESUME_TABS,
  ResumeTab,
  type NavigationController,
} from '../types/navigation';
import type { NavigationPort } from '../types/ports/navigation';

const TAB_IDS = RESUME_TABS.map((tab) => tab.id);

/** Owns tab selection; browser history and element access remain behind the port. */
export function createNavigationController(
  port: NavigationPort
): NavigationController {
  let activeTab = $state(ResumeTab.Experience);

  function followHash(): void {
    const tab = tabFromHash(port.readHash(), TAB_IDS);
    if (tab) activeTab = tab;
  }

  followHash();
  const unsubscribe = port.watchHash(followHash);

  function select(tab: ResumeTab): void {
    if (tab === activeTab) return;
    activeTab = tab;
    port.replaceHash(tab);
    port.revealStart();
  }

  return {
    get activeTab() {
      return activeTab;
    },
    select,
    key(key: string, index: number): boolean {
      const next = nextTabIndex(index, key, RESUME_TABS.length);
      if (next === null) return false;
      select(RESUME_TABS[next].id);
      port.focusTab(next);
      return true;
    },
    destroy: unsubscribe,
  };
}
