<script lang="ts">
  import {
    FormState,
    EMPTY_FORM_DATA,
    EMPTY_FORM_ERRORS,
  } from '../types/contact';
  import type { FormData, FormErrors } from '../types/contact';
  import { validateFormData } from '../logic/validation';

  const FIELD_CLASS =
    'w-full rounded-xl border border-line bg-canvas px-4 py-3 text-ink placeholder:text-ink-faint transition-colors duration-200 outline-none focus:border-accent';
  const LABEL_CLASS = 'mb-2 block text-sm font-medium text-ink';

  let formState = $state<FormState>(FormState.Idle);
  let formData = $state<FormData>({ ...EMPTY_FORM_DATA });
  let errors = $state<FormErrors>({ ...EMPTY_FORM_ERRORS });
  let submissionMessage = $state('');

  function handleInput(field: keyof FormData, value: string): void {
    formData = { ...formData, [field]: value };
    switch (formState) {
      case FormState.Idle:
        formState = FormState.Filling;
        break;
      case FormState.ValidationError:
        formState = FormState.Filling;
        errors = { ...EMPTY_FORM_ERRORS };
        break;
      case FormState.SubmissionError:
        formState = FormState.Filling;
        break;
      case FormState.Filling:
      case FormState.Submitting:
      case FormState.Success:
        break;
    }
  }

  async function handleSubmit(): Promise<void> {
    const result = validateFormData(formData);

    if (!result.isValid) {
      errors = result.errors;
      formState = FormState.ValidationError;
      return;
    }

    formState = FormState.Submitting;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'd77aad95-d23a-421d-9f78-e210e2da4632',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        formState = FormState.Success;
        submissionMessage = 'Message sent successfully!';
        formData = { ...EMPTY_FORM_DATA };
        errors = { ...EMPTY_FORM_ERRORS };
      } else {
        formState = FormState.SubmissionError;
        submissionMessage = 'Failed to send message. Please try again.';
      }
    } catch {
      formState = FormState.SubmissionError;
      submissionMessage = 'Failed to send message. Please try again.';
    }
  }

  const isSubmitting = $derived(formState === FormState.Submitting);
</script>

{#if formState === FormState.Success}
  <div class="border-line bg-canvas rounded-xl border p-6 text-center">
    <p class="text-success text-lg font-semibold">{submissionMessage}</p>
    <button
      type="button"
      onclick={() => {
        formState = FormState.Idle;
      }}
      class="bg-accent text-accent-contrast hover:bg-accent-strong mt-5 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200"
    >
      Send another message
    </button>
  </div>
{:else}
  <form
    novalidate
    onsubmit={(e: SubmitEvent) => {
      e.preventDefault();
      handleSubmit();
    }}
    class="space-y-5"
  >
    <div>
      <label for="name" class={LABEL_CLASS}>Name</label>
      <input
        id="name"
        type="text"
        value={formData.name}
        oninput={(e: Event) =>
          handleInput('name', (e.target as HTMLInputElement).value)}
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
        value={formData.email}
        oninput={(e: Event) =>
          handleInput('email', (e.target as HTMLInputElement).value)}
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
        value={formData.message}
        oninput={(e: Event) =>
          handleInput('message', (e.target as HTMLTextAreaElement).value)}
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

    <button
      type="submit"
      disabled={isSubmitting}
      class="bg-accent text-accent-contrast hover:bg-accent-strong w-full rounded-full px-6 py-3 font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isSubmitting ? 'Sending...' : 'Send Message'}
    </button>
  </form>
{/if}
