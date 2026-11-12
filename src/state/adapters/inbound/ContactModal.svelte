<script lang="ts">
  import { ModalState } from '../../../types/modal';
  import ContactForm from './ContactForm.svelte';
  import type { ContactPort } from '../../../types/ports/contact';
  import type { ModalPort } from '../../../types/ports/modal';

  interface Props {
    state: ModalState;
    onclose: () => void;
    contactPort: ContactPort;
    modalPort: ModalPort;
  }

  let { state, onclose, contactPort, modalPort }: Props = $props();

  function handleBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      onclose();
    }
  }
</script>

{#if state === ModalState.Open}
  <dialog
    use:modalPort.activate
    class="modal-backdrop text-ink fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto border-0 bg-transparent p-0"
    aria-label="Contact form"
    onclick={handleBackdropClick}
    oncancel={(event) => {
      event.preventDefault();
      onclose();
    }}
  >
    <div
      class="border-line bg-canvas modal-panel relative w-full border p-7 sm:p-9"
    >
      <button
        type="button"
        onclick={onclose}
        class="icon-link absolute top-4 right-4 p-1.5"
        aria-label="Close contact form"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      <p class="label">Contact</p>
      <h2 class="display text-ink mt-3 mb-8 text-[1.75rem]">Get in Touch</h2>

      <ContactForm port={contactPort} />
    </div>
  </dialog>
{/if}

<style>
  .modal-backdrop {
    animation: fade-in 0.18s ease-out both;
  }

  .modal-panel {
    animation: panel-in 0.24s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  dialog::backdrop {
    background: var(--color-backdrop);
    backdrop-filter: blur(4px);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes panel-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
