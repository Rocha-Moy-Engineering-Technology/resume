import type { ClockPort } from '../../types/ports/clock';

export function createBrowserClockPort(): ClockPort {
  return {
    readDate() {
      const date = new Date();
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      };
    },
  };
}
