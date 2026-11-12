import type { CalendarDate } from '../types/page';

export function resumeDownloadFilename(date: CalendarDate): string {
  const revision = `${date.year}${String(date.month).padStart(2, '0')}${String(date.day).padStart(2, '0')}`;
  return `PHRMOY_RESUME_rev${revision}.pdf`;
}
