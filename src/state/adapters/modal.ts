import type { ModalPort } from '../../types/ports/modal';

function cycleFocus(dialog: HTMLDialogElement, event: KeyboardEvent): void {
  if (event.key !== 'Tab') return;
  const controls = [
    ...dialog.querySelectorAll<HTMLElement>(
      'button:not(:disabled), input:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]'
    ),
  ];
  const index = controls.indexOf(document.activeElement as HTMLElement);
  const next =
    (index + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
  event.preventDefault();
  controls[next]?.focus();
}

/** Native modal dialogs isolate focus, make the page inert, and restore focus. */
export function createBrowserModalPort(): ModalPort {
  return {
    activate(dialog) {
      const previousOverflow = document.body.style.overflow;
      const opener = document.activeElement;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      const keydown = (event: KeyboardEvent) => cycleFocus(dialog, event);
      dialog.addEventListener('keydown', keydown);
      return {
        destroy(): void {
          dialog.removeEventListener('keydown', keydown);
          dialog.close();
          document.body.style.overflow = previousOverflow;
          if (opener instanceof HTMLElement && opener.isConnected)
            opener.focus();
        },
      };
    },
  };
}
