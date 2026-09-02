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

    <div class="mt-7">
      {#each EXPERIENCE_ENTRIES as entry (entry.title)}
        <article class="entry py-8">
          <div
            class="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-6"
          >
            <h3 class="entry-title text-[1.5rem] sm:text-[1.75rem]">
              {entry.title}
            </h3>
            <span class="label shrink-0 tabular-nums">{entry.dates}</span>
          </div>
          <p class="label text-ink mt-2">{entry.company}</p>
          <ul class="text-ink-soft mt-5 space-y-2.5 text-[0.9375rem]">
            {#each entry.descriptions as desc, j (j)}
              <li
                class="before:bg-ink-faint relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:h-[3px] before:w-[3px] before:content-['']"
              >
                {desc}
              </li>
            {/each}
          </ul>
          <div class="mt-6 flex flex-wrap gap-2">
            {#each entry.technologies as tech (tech)}
              <span class="chip cursor-default">{tech}</span>
            {/each}
          </div>
        </article>
      {/each}
    </div>

    <div class="mt-16">
      <SectionHeading title="Portfolio" />
      <div class="mt-7">
        {#each PORTFOLIO_ENTRIES as entry (entry.title)}
          <article class="entry group py-8">
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              class="entry-title text-ink-soft group-hover:text-ink inline-flex items-baseline gap-2 text-[1.5rem] transition-colors duration-150 sm:text-[1.75rem]"
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
                class="translate-y-px transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
            <p class="text-ink-soft mt-4 text-[0.9375rem]">
              {entry.description}
            </p>
          </article>
        {/each}
      </div>
    </div>

    <p class="label border-line mt-16 border-t pt-6">
      &copy; {currentYear}
      {PROFILE.name}
    </p>
  </div>
</div>
