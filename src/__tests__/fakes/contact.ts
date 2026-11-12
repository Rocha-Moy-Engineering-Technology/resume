import type {
  ContactCompletion,
  ContactPort,
  ContactRequest,
} from '../../types/ports/contact';
import type { FormData } from '../../types/contact';

export class FakeContactPort implements ContactPort {
  requests: FormData[] = [];
  cancelled = 0;
  private complete!: ContactCompletion;

  submit(data: FormData, complete: ContactCompletion): ContactRequest {
    this.requests.push(data);
    this.complete = complete;
    return {
      cancel: () => {
        this.cancelled += 1;
        this.complete(false);
      },
    };
  }

  resolve(success: boolean): void {
    this.complete(success);
  }

  reject(): void {
    this.complete(false);
  }
}
