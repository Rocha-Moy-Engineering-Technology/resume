export enum SectionId {
  Resume = 'resume',
}

/** The tabs at the top of the resume column, in display order. */
export enum ResumeTab {
  Experience = 'experience',
  Portfolio = 'portfolio',
}

export const RESUME_TABS: readonly { id: ResumeTab; label: string }[] = [
  { id: ResumeTab.Experience, label: 'Experience' },
  { id: ResumeTab.Portfolio, label: 'Portfolio' },
];

export interface NavigationController {
  readonly activeTab: ResumeTab;
  select(tab: ResumeTab): void;
  key(key: string, index: number): boolean;
  destroy(): void;
}
