<script lang="ts">
  import { onDestroy } from 'svelte';
  import { createNavigationController } from '../../navigation.svelte';
  import type { NavigationPort } from '../../../types/ports/navigation';
  import { RESUME_TABS, ResumeTab, SectionId } from '../../../types/navigation';
  import {
    PROFILE,
    EXPERIENCE_ENTRIES,
    PORTFOLIO_ENTRIES,
  } from '../../../types/resume';

  interface Props {
    currentYear: number;
    port: NavigationPort;
  }
  let { currentYear, port }: Props = $props();
  // The navigation dependency lasts for this mounted column.
  // svelte-ignore state_referenced_locally
  const controller = createNavigationController(port);
  const activeTab = $derived(controller.activeTab);
  onDestroy(controller.destroy);

  function onTabKeydown(event: KeyboardEvent, index: number): void {
    if (controller.key(event.key, index)) event.preventDefault();
  }
</script>

<div id={SectionId.Resume} class="lg:w-3/5">
  <div
    class="mx-auto max-w-[46rem] px-6 py-12 sm:px-8 lg:px-10 lg:py-12 xl:px-14 xl:py-14"
  >
    <div use:port.registerStart class="scroll-mt-[3.75rem]"></div>

    <!--
      The tablist's hairline opens each panel, so a panel's first entry drops
      its own top rule rather than doubling it.
      Sticky on wide screens only, where the profile column sits beside this one
      and the list can run long; on phones the tabs scroll away with the page.
    -->
    <div
      class="bg-canvas-veil z-10 -mt-3 pt-3 backdrop-blur-xl lg:sticky lg:top-[3.75rem]"
    >
      <div
        role="tablist"
        aria-label="Resume sections"
        class="border-line flex items-end gap-5 border-b sm:gap-10"
      >
        {#each RESUME_TABS as tab, i (tab.id)}
          {@const selected = activeTab === tab.id}
          <button
            use:port.registerTab={i}
            type="button"
            role="tab"
            id="tab-{tab.id}"
            aria-selected={selected}
            aria-controls="panel-{tab.id}"
            tabindex={selected ? 0 : -1}
            onclick={() => controller.select(tab.id)}
            onkeydown={(event) => onTabKeydown(event, i)}
            class={[
              'display relative cursor-pointer pb-3 text-[1.25rem] transition-colors duration-150 sm:text-[2.125rem]',
              selected ? 'text-ink' : 'text-ink-faint hover:text-ink-soft',
            ]}
          >
            {tab.label}
            <span
              aria-hidden="true"
              class={[
                'bg-ink ease-out-soft absolute -bottom-px left-0 h-0.5 w-full origin-left transition-transform duration-300',
                selected ? 'scale-x-100' : 'scale-x-0',
              ]}
            ></span>
          </button>
        {/each}
      </div>
    </div>

    <div
      role="tabpanel"
      id="panel-{ResumeTab.Experience}"
      aria-labelledby="tab-{ResumeTab.Experience}"
      hidden={activeTab !== ResumeTab.Experience}
      class="[&>article:first-child]:border-t-0"
    >
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

    <div
      role="tabpanel"
      id="panel-{ResumeTab.Portfolio}"
      aria-labelledby="tab-{ResumeTab.Portfolio}"
      hidden={activeTab !== ResumeTab.Portfolio}
      class="[&>article:first-child]:border-t-0"
    >
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

    <p class="label border-line mt-16 border-t pt-6">
      &copy; {currentYear}
      {PROFILE.name}
    </p>
  </div>
</div>
