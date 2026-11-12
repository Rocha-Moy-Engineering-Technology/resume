import { describe, expect, it } from 'vitest';
import { createContactController } from '../state/contact.svelte';
import { FormState } from '../types/contact';
import { FakeContactPort } from './fakes/contact';

// Proves agent_context/docs/sdoc/modules/contractor-site/GHERKIN/contact-reliability.feature.
function filledController() {
  const port = new FakeContactPort();
  const controller = createContactController(port);
  controller.input('name', 'Jane');
  controller.input('email', 'jane@example.com');
  controller.input('message', 'A project inquiry');
  return { controller, port };
}

describe('contact controller', () => {
  it('returns synchronously and receives completion through the contact port', () => {
    const { controller, port } = filledController();
    expect(controller.submit()).toBeUndefined();
    expect(controller.state).toBe(FormState.Submitting);
    port.resolve(true);
    expect(controller.state).toBe(FormState.Success);
  });
  it('returns independent draft and error snapshots without exposing mutable state', () => {
    const { controller } = filledController();
    const draft = controller.data as { name: string };
    draft.name = 'Untrusted mutation';
    expect(controller.data.name).toBe('Jane');
    const errors = controller.errors as { name: string };
    errors.name = 'Untrusted mutation';
    expect(controller.errors.name).toBe('');
    expect(controller.data).not.toBe(controller.data);
    expect(controller.errors).not.toBe(controller.errors);
  });
  it('starts empty and validates before creating a request', () => {
    const port = new FakeContactPort();
    const controller = createContactController(port);
    expect(controller.state).toBe(FormState.Idle);
    expect(controller.message).toBe('');
    controller.submit();
    expect(controller.state).toBe(FormState.ValidationError);
    expect(controller.errors.name).toBe('Name is required');
    expect(port.requests).toHaveLength(0);
    controller.input('name', 'Jane');
    expect(controller.state).toBe(FormState.Filling);
    expect(Object.values(controller.errors)).toEqual(['', '', '']);
    controller.destroy();
  });

  it('prevents duplicate contact submissions and input changes while pending', () => {
    const { controller, port } = filledController();
    controller.submit();
    expect(controller.state).toBe(FormState.Submitting);
    controller.submit();
    controller.input('name', 'Changed');
    expect(controller.data.name).toBe('Jane');
    expect(port.requests).toHaveLength(1);
    expect(port.requests[0]).toEqual(controller.data);
    port.resolve(true);
    expect(controller.state).toBe(FormState.Success);
    expect(controller.message).toBe('Message sent successfully!');
    expect(controller.data).toEqual({ name: '', email: '', message: '' });
    controller.input('name', 'Ignored');
    expect(controller.data.name).toBe('');
    controller.reset();
    expect(controller.state).toBe(FormState.Idle);
    expect(controller.message).toBe('');
  });

  it('preserves fields on a rejected response and permits a direct retry', () => {
    const { controller, port } = filledController();
    controller.submit();
    controller.reset();
    expect(controller.state).toBe(FormState.Submitting);
    port.resolve(false);
    expect(controller.state).toBe(FormState.SubmissionError);
    expect(controller.data.message).toBe('A project inquiry');
    expect(controller.message).toBe(
      'Failed to send message. Please try again.'
    );
    controller.submit();
    port.resolve(true);
    expect(port.requests).toHaveLength(2);
    expect(controller.state).toBe(FormState.Success);
  });

  it('preserves fields after a transport failure and clears the message on editing', () => {
    const { controller, port } = filledController();
    controller.submit();
    port.reject();
    expect(controller.state).toBe(FormState.SubmissionError);
    expect(controller.data.name).toBe('Jane');
    controller.input('message', 'Revised inquiry');
    expect(controller.state).toBe(FormState.Filling);
    expect(controller.message).toBe('');
  });

  it('cancels a pending request when destroyed and ignores its late response', () => {
    const { controller, port } = filledController();
    controller.submit();
    controller.destroy();
    expect(port.cancelled).toBe(1);
    expect(controller.state).toBe(FormState.Submitting);
    controller.submit();
    controller.input('name', 'Ignored');
    controller.reset();
    controller.destroy();
    expect(port.requests).toHaveLength(1);
    expect(port.cancelled).toBe(1);
    expect(controller.data.name).toBe('Jane');
  });

  it('does not publish a success that completes after destruction', () => {
    const { controller, port } = filledController();
    controller.submit();
    controller.destroy();
    port.resolve(true);
    expect(controller.state).toBe(FormState.Submitting);
  });

  it('handles a synchronous port completion without retaining a finished request', () => {
    let cancelled = false;
    const controller = createContactController({
      submit: (_data, complete) => {
        complete(true);
        return {
          cancel: () => {
            cancelled = true;
          },
        };
      },
    });
    controller.input('name', 'Jane');
    controller.input('email', 'jane@example.com');
    controller.input('message', 'Hello');
    controller.submit();
    expect(controller.state).toBe(FormState.Success);
    controller.destroy();
    expect(cancelled).toBe(false);
  });

  it('reports a port setup failure while preserving the draft', () => {
    const controller = createContactController({
      submit: () => {
        throw new Error('setup failed');
      },
    });
    controller.input('name', 'Jane');
    controller.input('email', 'jane@example.com');
    controller.input('message', 'Hello');
    controller.submit();
    expect(controller.state).toBe(FormState.SubmissionError);
    expect(controller.data.name).toBe('Jane');
  });

  it('ignores reset outside the success state', () => {
    const { controller } = filledController();
    controller.reset();
    expect(controller.state).toBe(FormState.Filling);
    expect(controller.data.name).toBe('Jane');
  });
});
