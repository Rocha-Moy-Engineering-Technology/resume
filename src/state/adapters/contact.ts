import { contactResponseSucceeded } from '../../logic/contact';
import { CONTACT_REQUEST_TIMEOUT_MS, type FormData } from '../../types/contact';
import type {
  ContactCompletion,
  ContactPort,
  ContactRequest,
} from '../../types/ports/contact';

const CONTACT_ENDPOINT = 'https://api.web3forms.com/submit';
// Web3Forms access keys are public client submission identifiers.
const CONTACT_ACCESS_KEY = 'd77aad95-d23a-421d-9f78-e210e2da4632';

export function createBrowserContactPort(): ContactPort {
  return {
    submit(data: FormData, complete: ContactCompletion): ContactRequest {
      const abort = new AbortController();
      const deadline = window.setTimeout(
        () => abort.abort(),
        CONTACT_REQUEST_TIMEOUT_MS
      );

      async function send(): Promise<void> {
        let success = false;
        try {
          const response = await fetch(CONTACT_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ access_key: CONTACT_ACCESS_KEY, ...data }),
            signal: abort.signal,
          });
          success =
            response.ok && contactResponseSucceeded(await response.json());
        } catch {
          success = false;
        } finally {
          window.clearTimeout(deadline);
        }
        complete(success);
      }

      void send();
      return { cancel: () => abort.abort() };
    },
  };
}
