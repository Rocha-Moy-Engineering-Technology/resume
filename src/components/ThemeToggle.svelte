<script lang="ts">
  import { themeToggleLabel } from '../logic/theme';
  import { Theme } from '../types/theme';

  interface Props {
    theme: Theme;
    ontoggle: () => void;
  }

  let { theme, ontoggle }: Props = $props();

  const label = $derived(themeToggleLabel(theme));
</script>

<button
  type="button"
  onclick={ontoggle}
  aria-label={label}
  title={label}
  class="text-ink-soft hover:bg-accent-soft hover:text-accent rounded-full p-1.5 transition-colors duration-200 sm:p-2"
>
  {#if theme === Theme.Dark}
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
      />
    </svg>
  {:else}
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  {/if}
</button>
