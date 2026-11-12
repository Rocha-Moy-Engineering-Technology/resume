<script lang="ts">
  import { onDestroy } from 'svelte';
  import { createContactController } from '../../contact.svelte';
  import { FormState } from '../../../types/contact';
  import type { FormData, FormErrors } from '../../../types/contact';
  import type { ContactPort } from '../../../types/ports/contact';

  interface Props {
    port: ContactPort;
  }
  let { port }: Props = $props();
  // The dependency is fixed for the lifetime of this mounted form.
  // svelte-ignore state_referenced_locally
  const controller = createContactController(port);
  const formState = $derived(controller.state);
  const formData: FormData = $derived(controller.data);
  const errors: FormErrors = $derived(controller.errors);
  const submissionMessage = $derived(controller.message);
  const isSubmitting = $derived(formState === FormState.Submitting);
  onDestroy(controller.destroy);

  const FIELD_CLASS =
    'w-full border border-line bg-canvas px-4 py-3 text-ink placeholder:text-ink-faint transition-colors duration-200 outline-none focus:border-ink';
  const LABEL_CLASS = 'label mb-2 block';
</script>

{#if formState === FormState.Success}
  <div class="border-line bg-canvas border p-6 text-center">
    <p class="text-success display text-lg">{submissionMessage}</p>
    <button type="button" onclick={controller.reset} class="chip mt-6">
      Send another message
    </button>
  </div>
{:else}
  <form
    novalidate
    onsubmit={(e: SubmitEvent) => {
      e.preventDefault();
      controller.submit();
    }}
    class="space-y-5"
  >
    <div>
      <label for="name" class={LABEL_CLASS}>Name</label>
      <input
        id="name"
        type="text"
        disabled={isSubmitting}
        value={formData.name}
        oninput={(e: Event) =>
          controller.input('name', (e.target as HTMLInputElement).value)}
        class={FIELD_CLASS}
        placeholder="Your name"
      />
      {#if errors.name}
        <p class="text-error mt-1.5 text-sm">{errors.name}</p>
      {/if}
    </div>

    <div>
      <label for="email" class={LABEL_CLASS}>Email</label>
      <input
        id="email"
        type="email"
        disabled={isSubmitting}
        value={formData.email}
        oninput={(e: Event) =>
          controller.input('email', (e.target as HTMLInputElement).value)}
        class={FIELD_CLASS}
        placeholder="your@email.com"
      />
      {#if errors.email}
        <p class="text-error mt-1.5 text-sm">{errors.email}</p>
      {/if}
    </div>

    <div>
      <label for="message" class={LABEL_CLASS}>Message</label>
      <textarea
        id="message"
        disabled={isSubmitting}
        value={formData.message}
        oninput={(e: Event) =>
          controller.input('message', (e.target as HTMLTextAreaElement).value)}
        rows={5}
        class="{FIELD_CLASS} resize-none"
        placeholder="Your message..."
      ></textarea>
      {#if errors.message}
        <p class="text-error mt-1.5 text-sm">{errors.message}</p>
      {/if}
    </div>

    {#if formState === FormState.SubmissionError}
      <p class="text-error text-sm">{submissionMessage}</p>
    {/if}

    <button type="submit" disabled={isSubmitting} class="action w-full">
      {isSubmitting ? 'Sending...' : 'Send Message'}
    </button>
  </form>
{/if}
