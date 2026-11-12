import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ContactForm from '../../src/state/adapters/inbound/ContactForm.svelte';
import { FakeContactPort } from '../../src/__tests__/fakes/contact';

async function fillForm(): Promise<void> {
  await fireEvent.input(screen.getByLabelText('Name'), {
    target: { value: 'Jane' },
  });
  await fireEvent.input(screen.getByLabelText('Email'), {
    target: { value: 'jane@example.com' },
  });
  await fireEvent.input(screen.getByLabelText('Message'), {
    target: { value: 'A project inquiry' },
  });
}

function renderForm() {
  const port = new FakeContactPort();
  return { port, ...render(ContactForm, { props: { port } }) };
}

describe('ContactForm', () => {
  it('renders fields and validates before submitting', async () => {
    const { port } = renderForm();
    await fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));
    expect(screen.getByText('Name is required')).toBeVisible();
    expect(screen.getByText('Email is required')).toBeVisible();
    expect(screen.getByText('Message is required')).toBeVisible();
    expect(port.requests).toHaveLength(0);
    await fillForm();
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
  });

  it('shows a malformed email error', async () => {
    renderForm();
    await fillForm();
    await fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'invalid' },
    });
    await fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));
    expect(
      screen.getByText('Please enter a valid email address')
    ).toBeVisible();
  });

  it('disables fields while submitting, then permits another message after success', async () => {
    const { port } = renderForm();
    await fillForm();
    await fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));
    expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled();
    expect(screen.getByLabelText('Name')).toBeDisabled();
    port.resolve(true);
    expect(await screen.findByText('Message sent successfully!')).toBeVisible();
    await fireEvent.click(
      screen.getByRole('button', { name: 'Send another message' })
    );
    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeEnabled();
  });

  it('preserves the draft on failure and clears the error when editing', async () => {
    const { port } = renderForm();
    await fillForm();
    await fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));
    port.reject();
    expect(
      await screen.findByText('Failed to send message. Please try again.')
    ).toBeVisible();
    expect(screen.getByLabelText('Name')).toHaveValue('Jane');
    await fireEvent.input(screen.getByLabelText('Name'), {
      target: { value: 'Jane Doe' },
    });
    await waitFor(() =>
      expect(
        screen.queryByText('Failed to send message. Please try again.')
      ).not.toBeInTheDocument()
    );
  });

  it('cancels its request when unmounted', async () => {
    const { port, unmount } = renderForm();
    await fillForm();
    await fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));
    unmount();
    expect(port.cancelled).toBe(1);
  });
});
