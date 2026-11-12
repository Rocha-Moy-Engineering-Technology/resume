import type { CalendarDate } from '../page';

export interface ClockPort {
  readDate(): CalendarDate;
}
