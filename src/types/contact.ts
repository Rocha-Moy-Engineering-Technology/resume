export enum FormState {
  Idle = 'Idle',
  Filling = 'Filling',
  ValidationError = 'ValidationError',
  Submitting = 'Submitting',
  Success = 'Success',
  SubmissionError = 'SubmissionError',
}

export interface FormData {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

export interface FormErrors {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: FormErrors;
}

export interface ContactController {
  readonly state: FormState;
  readonly data: FormData;
  readonly errors: FormErrors;
  readonly message: string;
  input(field: keyof FormData, value: string): void;
  submit(): void;
  reset(): void;
  destroy(): void;
}

export const CONTACT_REQUEST_TIMEOUT_MS = 15000;

export const EMPTY_FORM_DATA: FormData = {
  name: '',
  email: '',
  message: '',
} as const;

export const EMPTY_FORM_ERRORS: FormErrors = {
  name: '',
  email: '',
  message: '',
} as const;
