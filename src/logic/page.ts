import type { CalendarDate } from '../types/page';
import { COPY, type ResumeLanguage } from '../types/language';

export function resumeDownloadFilename(
  date: CalendarDate,
  language: ResumeLanguage = 'en'
): string {
  const revision = `${date.year}${String(date.month).padStart(2, '0')}${String(date.day).padStart(2, '0')}`;
  return `${COPY[language].filename}_rev${revision}.pdf`;
}
