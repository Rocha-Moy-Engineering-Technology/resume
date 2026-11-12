import type { FormData, ValidationResult } from '../types/contact';

const WHITESPACE = /\s/;

export function validateEmail(config: { email: string }): boolean {
  const email = config.email;
  const separator = email.indexOf('@');
  if (separator <= 0 || email.lastIndexOf('@') !== separator) return false;
  const domain = email.slice(separator + 1);
  const dot = domain.lastIndexOf('.');
  return dot > 0 && dot < domain.length - 1 && !WHITESPACE.test(email);
}

export function validateFormData(formData: FormData): ValidationResult {
  const nameError = formData.name.trim() === '' ? 'Name is required' : '';
  const emailError = validateEmailField(formData.email);
  const messageError =
    formData.message.trim() === '' ? 'Message is required' : '';

  return {
    isValid: nameError === '' && emailError === '' && messageError === '',
    errors: {
      name: nameError,
      email: emailError,
      message: messageError,
    },
  };
}

function validateEmailField(email: string): string {
  if (email.trim() === '') return 'Email is required';
  return validateEmail({ email }) ? '' : 'Please enter a valid email address';
}
