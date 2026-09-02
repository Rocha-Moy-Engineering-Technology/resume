<script lang="ts">
  import ThemeToggle from './ThemeToggle.svelte';
  import { PROFILE } from '../types/resume';
  import type { Theme } from '../types/theme';

  interface Props {
    theme: Theme;
    onthemetoggle: () => void;
    oncontact: () => void;
  }

  let { theme, onthemetoggle, oncontact }: Props = $props();

  const now = new Date();
  const rev = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const downloadFilename = `PHRMOY_RESUME_rev${rev}.pdf`;
</script>

<nav
  class="border-line bg-canvas-veil sticky top-0 z-40 border-b backdrop-blur-xl"
>
  <div
    class="flex items-center justify-between gap-3 py-3 pl-4 sm:gap-4 sm:pl-6 lg:gap-8 lg:pl-0"
  >
    <div
      class="flex min-w-0 flex-1 items-center lg:w-2/5 lg:flex-none lg:justify-center"
    >
      <span
        class="display text-ink text-[1.05rem] sm:shrink-0 sm:text-2xl sm:whitespace-nowrap lg:text-[1.6rem]"
        >{PROFILE.name}</span
      >
    </div>
    <span class="label hidden min-w-0 flex-1 text-right text-balance xl:block">
      {PROFILE.title}
    </span>
    <div class="flex shrink-0 items-center gap-0 pr-3 sm:gap-1 sm:pr-6">
      <ThemeToggle {theme} ontoggle={onthemetoggle} />
      <a
        href="{import.meta.env.BASE_URL}resume.pdf"
        download={downloadFilename}
        aria-label="Download Resume"
        class="tooltip icon-link relative p-1.5 sm:p-2"
      >
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
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
          />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <polyline points="9 15 12 18 15 15" />
        </svg>
        <span
          class="tooltip-text label border-line bg-canvas pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 border px-2.5 py-1 whitespace-nowrap opacity-0 transition-opacity duration-150"
        >
          Download Resume PDF
        </span>
      </a>
      <a
        href={PROFILE.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        class="icon-link p-1.5 sm:p-2"
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
          />
        </svg>
      </a>
      <a
        href={PROFILE.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        class="icon-link p-1.5 sm:p-2"
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          />
        </svg>
      </a>
      <button
        type="button"
        onclick={oncontact}
        class="chip ml-2 shrink-0 sm:ml-3"
      >
        Contact
      </button>
    </div>
  </div>
</nav>

<style>
  .tooltip:hover .tooltip-text {
    opacity: 1;
  }
</style>
