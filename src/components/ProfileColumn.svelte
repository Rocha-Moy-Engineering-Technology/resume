<script lang="ts">
  import profilePortrait from '../assets/profile.webp';
  import { EDUCATION_ENTRIES, PROFILE } from '../types/resume';
</script>

<aside
  class="bg-canvas lg:border-line lg:sticky lg:top-[3.75rem] lg:h-[calc(100vh-3.75rem)] lg:w-2/5 lg:overflow-y-auto lg:border-r"
>
  <div
    class="mx-auto flex max-w-sm flex-col px-8 py-10 lg:px-10 lg:py-12 xl:py-14"
  >
    <div
      class="group relative mx-auto h-56 w-56 shrink-0 sm:h-64 sm:w-64 xl:h-72 xl:w-72"
    >
      <span
        class="border-line pointer-events-none absolute -inset-4 rounded-full border"
        aria-hidden="true"
      ></span>
      <div
        class="ring-line-strong portrait-disc relative h-full w-full overflow-hidden rounded-full ring-1"
      >
        <img
          src={profilePortrait}
          alt={PROFILE.name}
          width="720"
          height="720"
          class="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
    </div>

    <p class="label mt-9 text-center text-balance xl:hidden">
      {PROFILE.title}
    </p>

    <section class="mt-10 xl:mt-12">
      <h2 class="label">Education</h2>
      <div class="border-line mt-4 border-t">
        {#each EDUCATION_ENTRIES as entry (entry.degree)}
          <div class="border-line border-b py-4">
            <p class="entry-title text-ink text-[1.0625rem]">
              {entry.degree}
            </p>
            <p class="text-ink-soft mt-1.5 text-sm">
              {entry.institution}
            </p>
            <p class="label mt-2 text-[0.6875rem] tabular-nums">
              {entry.dates}
            </p>
          </div>
        {/each}
      </div>
    </section>
  </div>
</aside>

<style>
  .portrait-disc {
    background-image: radial-gradient(
      115% 115% at 50% 0%,
      var(--disc-top) 0%,
      var(--disc-bottom) 100%
    );
  }
</style>
