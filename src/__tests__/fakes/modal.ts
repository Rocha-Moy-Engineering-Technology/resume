import type { ModalPort } from '../../types/ports/modal';

/** Test-side stand-in; real native dialog behavior is proved headlessly. */
export function createFakeModalPort(): ModalPort {
  return {
    activate(dialog) {
      dialog.setAttribute('open', '');
      return { destroy: () => dialog.removeAttribute('open') };
    },
  };
}
