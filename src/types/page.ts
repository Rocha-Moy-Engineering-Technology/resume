import type { ModalState } from './modal';

export interface CalendarDate {
  readonly year: number;
  readonly month: number;
  readonly day: number;
}

export interface PageController {
  readonly year: number;
  readonly downloadFilename: string;
  readonly modalState: ModalState;
  openContact(): void;
  closeContact(): void;
}
