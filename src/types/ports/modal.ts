export interface ModalHandle {
  destroy(): void;
}

export interface ModalPort {
  activate(dialog: HTMLDialogElement): ModalHandle;
}
