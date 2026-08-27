<script lang="ts">
  import SectionHeading from './SectionHeading.svelte';
  import { SectionId } from '../types/navigation';
  import {
    PROFILE,
    EXPERIENCE_ENTRIES,
    PORTFOLIO_ENTRIES,
  } from '../types/resume';

  const currentYear = new Date().getFullYear();
</script>

<div id={SectionId.Resume} class="lg:w-3/5 lg:overflow-y-auto">
  <div
    class="mx-auto max-w-[46rem] px-6 py-12 sm:px-8 lg:px-10 lg:py-12 xl:px-14 xl:py-14"
  >
    <SectionHeading title="Experience" />

    <div class="mt-8 space-y-4">
      {#each EXPERIENCE_ENTRIES as entry (entry.title)}
        <article
          class="group border-line bg-surface shadow-card rounded-card hover:border-accent-line hover:bg-surface-hover hover:shadow-lift relative overflow-hidden border p-6 transition duration-300 hover:-translate-y-0.5 sm:p-7"
        >
          <span
            class="bg-accent absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
            aria-hidden="true"
          ></span>
          <div
            class="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6"
          >
            <h3
              class="text-ink font-display text-[1.2rem] leading-snug font-semibold"
            >
              {entry.title}
            </h3>
            <span
              class="text-ink-faint shrink-0 text-xs font-semibold tracking-[0.14em] uppercase tabular-nums"
              >{entry.dates}</span
            >
          </div>
          <p class="text-accent mt-1.5 text-sm font-semibold">
            {entry.company}
          </p>
          <ul class="text-ink-soft mt-4 space-y-2 text-sm leading-relaxed">
            {#each entry.descriptions as desc, j (j)}
              <li
                class="before:bg-accent-line relative pl-5 before:absolute before:top-[0.55em] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:content-['']"
              >
                {desc}
              </li>
            {/each}
          </ul>
          <div class="mt-5 flex flex-wrap gap-1.5">
            {#each entry.technologies as tech (tech)}
              <span
                class="bg-accent-soft text-accent hover:bg-accent hover:text-accent-contrast cursor-default rounded-full px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide transition-colors duration-200"
              >
                {tech}
              </span>
            {/each}
          </div>
        </article>
      {/each}
    </div>

    <div class="mt-14">
      <SectionHeading title="Portfolio" />
      <div class="mt-8 space-y-4">
        {#each PORTFOLIO_ENTRIES as entry (entry.title)}
          <article
            class="group border-line bg-surface shadow-card rounded-card hover:border-accent-line hover:bg-surface-hover hover:shadow-lift relative overflow-hidden border p-6 transition duration-300 hover:-translate-y-0.5 sm:p-7"
          >
            <span
              class="bg-accent absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
              aria-hidden="true"
            ></span>
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              class="text-ink hover:text-accent font-display inline-flex items-baseline gap-2 text-[1.2rem] font-semibold transition-colors duration-200"
            >
              {entry.title}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                class="text-accent translate-y-px transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
            <p class="text-ink-soft mt-3 text-sm leading-relaxed">
              {entry.description}
            </p>
          </article>
        {/each}
      </div>
    </div>

    <p
      class="border-line text-ink-faint mt-14 border-t pt-6 text-xs tracking-[0.1em] uppercase"
    >
      &copy; {currentYear}
      {PROFILE.name}
    </p>
  </div>
</div>
