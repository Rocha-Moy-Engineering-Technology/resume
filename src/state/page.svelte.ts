import { resumeDownloadFilename } from '../logic/page';
import { ModalState } from '../types/modal';
import type { PageController } from '../types/page';
import type { ClockPort } from '../types/ports/clock';

/** Owns the page's contact modal; calendar values are captured once per mount. */
export function createPageController(clock: ClockPort): PageController {
  const date = clock.readDate();
  let modalState = $state(ModalState.Closed);

  return {
    year: date.year,
    downloadFilename: resumeDownloadFilename(date),
    get modalState() {
      return modalState;
    },
    openContact(): void {
      modalState = ModalState.Open;
    },
    closeContact(): void {
      modalState = ModalState.Closed;
    },
  };
}
