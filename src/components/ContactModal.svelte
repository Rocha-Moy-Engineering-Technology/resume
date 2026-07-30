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
    class="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-backdrop)]"
    role="dialog"
    tabindex="-1"
    aria-modal="true"
    aria-label="Contact form"
    onclick={handleBackdropClick}
  >
    <div
      class="bg-bg-primary relative mx-4 w-full max-w-lg rounded-2xl p-8 shadow-xl"
    >
      <button
        type="button"
        onclick={onclose}
        class="text-text-secondary hover:text-text-primary absolute top-4 right-4 text-2xl leading-none transition-colors"
        aria-label="Close contact form"
      >
        &times;
      </button>

      <h2 class="text-text-primary mb-6 text-2xl font-bold">Get in Touch</h2>

      <ContactForm />
    </div>
  </div>
{/if}
