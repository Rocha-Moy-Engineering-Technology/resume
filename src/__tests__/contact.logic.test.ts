import { describe, expect, it } from 'vitest';
import { contactResponseSucceeded } from '../logic/contact';

describe('contact response validation', () => {
  it.each([
    null,
    undefined,
    false,
    '',
    [],
    {},
    { success: false },
    { success: 'true' },
    { success: 1 },
  ])('rejects malformed or unconfirmed response %j', (body) =>
    expect(contactResponseSucceeded(body)).toBe(false)
  );

  it('accepts only explicit success', () => {
    expect(contactResponseSucceeded({ success: true })).toBe(true);
  });
});
