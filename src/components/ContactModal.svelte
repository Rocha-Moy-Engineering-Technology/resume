<script lang="ts">
  import { ModalState } from '../types/modal';
  import ContactForm from './ContactForm.svelte';

  interface Props {
    state: ModalState;
    onclose: () => void;
  }

  let { state, onclose }: Props = $props();

  function handleBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      onclose();
    }
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      onclose();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if state === ModalState.Open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="bg-backdrop modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
    role="dialog"
    tabindex="-1"
    aria-modal="true"
    aria-label="Contact form"
    onclick={handleBackdropClick}
  >
    <div
      class="border-line bg-canvas modal-panel relative w-full max-w-lg border p-7 sm:p-9"
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

      <ContactForm />
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    animation: fade-in 0.18s ease-out both;
  }

  .modal-panel {
    animation: panel-in 0.24s cubic-bezier(0.22, 1, 0.36, 1) both;
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
