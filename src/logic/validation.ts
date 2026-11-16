import type { FormData, ValidationResult } from '../types/contact';
import { COPY, type ValidationCopy } from '../types/language';

const WHITESPACE = /\s/;

export function validateEmail(config: { email: string }): boolean {
  const email = config.email;
  const separator = email.indexOf('@');
  if (separator <= 0 || email.lastIndexOf('@') !== separator) return false;
  const domain = email.slice(separator + 1);
  const dot = domain.lastIndexOf('.');
  return dot > 0 && dot < domain.length - 1 && !WHITESPACE.test(email);
}

export function validateFormData(
  formData: FormData,
  copy: ValidationCopy = COPY.en.contact.validation
): ValidationResult {
  const nameError = formData.name.trim() === '' ? copy.nameRequired : '';
  const emailError = validateEmailField(formData.email, copy);
  const messageError =
    formData.message.trim() === '' ? copy.messageRequired : '';

  return {
    isValid: nameError === '' && emailError === '' && messageError === '',
    errors: {
      name: nameError,
      email: emailError,
      message: messageError,
    },
  };
}

function validateEmailField(email: string, copy: ValidationCopy): string {
  if (email.trim() === '') return copy.emailRequired;
  return validateEmail({ email }) ? '' : copy.emailInvalid;
}
