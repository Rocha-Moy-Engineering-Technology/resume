import type { FormData } from '../contact';

export interface ContactRequest {
  cancel(): void;
}

export type ContactCompletion = (success: boolean) => void;

export interface ContactPort {
  submit(data: FormData, complete: ContactCompletion): ContactRequest;
}
