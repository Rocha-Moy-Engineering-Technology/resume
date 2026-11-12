import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import ContactModal from '../../src/state/adapters/inbound/ContactModal.svelte';
import { ModalState } from '../../src/types/modal';
import { FakeContactPort } from '../../src/__tests__/fakes/contact';
import { createFakeModalPort } from '../../src/__tests__/fakes/modal';

const dependencies = () => ({
  contactPort: new FakeContactPort(),
  modalPort: createFakeModalPort(),
});

describe('ContactModal', () => {
  const mockOnClose = vi.fn();

  it('renders nothing when state is Closed', () => {
    const { container } = render(ContactModal, {
      props: {
        state: ModalState.Closed,
        onclose: mockOnClose,
        ...dependencies(),
      },
    });
    expect(container.querySelector('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog when state is Open', () => {
    const { container } = render(ContactModal, {
      props: {
        state: ModalState.Open,
        onclose: mockOnClose,
        ...dependencies(),
      },
    });
    expect(container.querySelector('dialog')).toBeInTheDocument();
  });

  it('renders heading and form when open', () => {
    render(ContactModal, {
      props: {
        state: ModalState.Open,
        onclose: mockOnClose,
        ...dependencies(),
      },
    });
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders close button that calls onclose', async () => {
    render(ContactModal, {
      props: {
        state: ModalState.Open,
        onclose: mockOnClose,
        ...dependencies(),
      },
    });
    const closeButton = screen.getByRole('button', {
      name: /close contact form/i,
    });
    await fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it('closes on Escape key', async () => {
    render(ContactModal, {
      props: {
        state: ModalState.Open,
        onclose: mockOnClose,
        ...dependencies(),
      },
    });
    await fireEvent(
      screen.getByRole('dialog'),
      new Event('cancel', { cancelable: true })
    );
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('closes only for a click on the backdrop itself', async () => {
    render(ContactModal, {
      props: {
        state: ModalState.Open,
        onclose: mockOnClose,
        ...dependencies(),
      },
    });
    await fireEvent.click(screen.getByText('Get in Touch'));
    expect(mockOnClose).not.toHaveBeenCalled();
    await fireEvent.click(screen.getByRole('dialog'));
    expect(mockOnClose).toHaveBeenCalledOnce();
  });
});
