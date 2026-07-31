<script lang="ts">
  import profilePic from '../../pic.png';
  import { EDUCATION_ENTRIES, PROFILE } from '../types/resume';
</script>

<aside
  class="bg-bg-primary lg:border-divider lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:w-2/5 lg:overflow-y-auto lg:border-r xl:top-20 xl:h-[calc(100vh-5rem)]"
>
  <div class="flex flex-col px-8 py-8 lg:px-10 lg:py-8">
    <div
      class="mx-auto h-56 w-56 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:h-64 lg:w-64 xl:h-72 xl:w-72"
    >
      <img
        src={profilePic}
        alt={PROFILE.name}
        class="h-full w-full scale-[1.15] object-cover object-[60%_8%]"
      />
    </div>

    <p
      class="from-accent font-display mt-6 bg-gradient-to-r to-cyan-300 bg-clip-text text-center text-base tracking-wide text-balance text-transparent italic xl:hidden"
    >
      {PROFILE.title}
    </p>

    <div class="mt-8 space-y-3">
      {#each EDUCATION_ENTRIES as entry (entry.degree)}
        <div>
          <p class="text-text-primary text-base font-medium">{entry.degree}</p>
          <p class="text-text-secondary text-sm font-medium">
            {entry.institution}
          </p>
          <p class="text-text-secondary text-sm">{entry.dates}</p>
        </div>
      {/each}
    </div>
  </div>
</aside>
