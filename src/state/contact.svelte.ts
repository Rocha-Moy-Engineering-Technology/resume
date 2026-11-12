import { validateFormData } from '../logic/validation';
import {
  EMPTY_FORM_DATA,
  EMPTY_FORM_ERRORS,
  FormState,
  type ContactController,
  type FormData,
  type FormErrors,
} from '../types/contact';
import type { ContactPort, ContactRequest } from '../types/ports/contact';

/** Owns every contact form mutation and the lifetime of its single request. */
export function createContactController(port: ContactPort): ContactController {
  let state = $state(FormState.Idle);
  let data = $state<FormData>({ ...EMPTY_FORM_DATA });
  let errors = $state<FormErrors>({ ...EMPTY_FORM_ERRORS });
  let message = $state('');
  let pending: ContactRequest | undefined;
  let destroyed = false;

  function input(field: keyof FormData, value: string): void {
    if (
      destroyed ||
      state === FormState.Submitting ||
      state === FormState.Success
    )
      return;
    data = { ...data, [field]: value };
    errors = { ...EMPTY_FORM_ERRORS };
    message = '';
    state = FormState.Filling;
  }

  function showFailure(): void {
    state = FormState.SubmissionError;
    message = 'Failed to send message. Please try again.';
  }

  function showSuccess(): void {
    state = FormState.Success;
    message = 'Message sent successfully!';
    data = { ...EMPTY_FORM_DATA };
    errors = { ...EMPTY_FORM_ERRORS };
  }

  function complete(success: boolean): void {
    pending = undefined;
    if (destroyed) return;
    if (success) showSuccess();
    else showFailure();
  }

  function send(): void {
    try {
      const request = port.submit({ ...data }, complete);
      if (state === FormState.Submitting) pending = request;
    } catch {
      complete(false);
    }
  }

  function submit(): void {
    if (destroyed || state === FormState.Submitting) return;
    const result = validateFormData(data);
    errors = result.errors;
    if (!result.isValid) {
      state = FormState.ValidationError;
      return;
    }
    state = FormState.Submitting;
    message = '';
    send();
  }

  return {
    get state() {
      return state;
    },
    get data() {
      return { ...data };
    },
    get errors() {
      return { ...errors };
    },
    get message() {
      return message;
    },
    input,
    submit,
    reset(): void {
      if (destroyed || state !== FormState.Success) return;
      state = FormState.Idle;
      message = '';
    },
    destroy(): void {
      destroyed = true;
      const request = pending;
      pending = undefined;
      request?.cancel();
    },
  };
}
