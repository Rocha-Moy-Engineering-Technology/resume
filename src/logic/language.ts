import type { ResumeLanguage } from '../types/language';

/** Only an explicit supported query value selects the Portuguese resume. */
export function resumeLanguage(value: string | null): ResumeLanguage {
  return value === 'pt-BR' ? 'pt-BR' : 'en';
}
