/** Only an explicit boolean confirmation means a message was accepted. */
export function contactResponseSucceeded(body: unknown): boolean {
  return (
    typeof body === 'object' &&
    body !== null &&
    'success' in body &&
    body.success === true
  );
}
