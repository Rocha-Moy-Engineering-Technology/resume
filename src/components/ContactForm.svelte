<script lang="ts">
  import {
    FormState,
    EMPTY_FORM_DATA,
    EMPTY_FORM_ERRORS,
  } from '../types/contact';
  import type { FormData, FormErrors } from '../types/contact';
  import { validateFormData } from '../logic/validation';

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
  <div class="bg-success/10 border-success rounded-xl border p-6 text-center">
    <p class="text-success text-lg font-semibold">{submissionMessage}</p>
    <button
      type="button"
      onclick={() => {
        formState = FormState.Idle;
      }}
      class="bg-accent hover:bg-accent-hover mt-4 rounded-lg px-6 py-3 font-semibold text-white transition-colors duration-200"
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
      <label
        for="name"
        class="text-text-primary mb-2 block text-sm font-medium"
      >
        Name
      </label>
      <input
        id="name"
        type="text"
        value={formData.name}
        oninput={(e: Event) =>
          handleInput('name', (e.target as HTMLInputElement).value)}
        class="border-border text-text-primary focus:border-accent w-full rounded-lg border bg-white px-4 py-3 transition-colors duration-200 outline-none"
        placeholder="Your name"
      />
      {#if errors.name}
        <p class="text-error mt-1 text-sm">{errors.name}</p>
      {/if}
    </div>

    <div>
      <label
        for="email"
        class="text-text-primary mb-2 block text-sm font-medium"
      >
        Email
      </label>
      <input
        id="email"
        type="email"
        value={formData.email}
        oninput={(e: Event) =>
          handleInput('email', (e.target as HTMLInputElement).value)}
        class="border-border text-text-primary focus:border-accent w-full rounded-lg border bg-white px-4 py-3 transition-colors duration-200 outline-none"
        placeholder="your@email.com"
      />
      {#if errors.email}
        <p class="text-error mt-1 text-sm">{errors.email}</p>
      {/if}
    </div>

    <div>
      <label
        for="message"
        class="text-text-primary mb-2 block text-sm font-medium"
      >
        Message
      </label>
      <textarea
        id="message"
        value={formData.message}
        oninput={(e: Event) =>
          handleInput('message', (e.target as HTMLTextAreaElement).value)}
        rows={5}
        class="border-border text-text-primary focus:border-accent w-full resize-none rounded-lg border bg-white px-4 py-3 transition-colors duration-200 outline-none"
        placeholder="Your message..."
      ></textarea>
      {#if errors.message}
        <p class="text-error mt-1 text-sm">{errors.message}</p>
      {/if}
    </div>

    {#if formState === FormState.SubmissionError}
      <p class="text-error text-sm">{submissionMessage}</p>
    {/if}

    <button
      type="submit"
      disabled={isSubmitting}
      class="bg-accent hover:bg-accent-hover w-full rounded-lg px-6 py-3 font-semibold text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isSubmitting ? 'Sending...' : 'Send Message'}
    </button>
  </form>
{/if}
