<script lang="ts">
  import profilePic from '../../pic.png';
  import { PROFILE, INTERESTS_INLINE_TEXT, EDUCATION_ENTRIES } from '../types/resume';

</script>

<aside
  class="bg-bg-primary lg:sticky lg:top-0 lg:h-screen lg:w-2/5 lg:overflow-y-auto lg:border-r lg:border-divider"
>
  <div class="flex flex-col px-8 py-12 lg:px-10 lg:py-16">
    <div class="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
      <img
        src={profilePic}
        alt={PROFILE.name}
        class="h-56 w-44 shrink-0 rounded-xl object-cover shadow-md lg:h-48 lg:w-36 xl:h-60 xl:w-48"
      />

      <div class="lg:pt-1">
        <p class="text-text-secondary text-sm leading-relaxed">
          {PROFILE.summary} Interests: {INTERESTS_INLINE_TEXT}.
        </p>
      </div>
    </div>

    <div class="mt-8 space-y-3">
      {#each EDUCATION_ENTRIES as entry (entry.degree)}
        <div>
          <p class="text-text-primary text-base font-medium">{entry.degree}</p>
          <p class="text-text-secondary text-sm font-medium">{entry.institution}</p>
          <p class="text-text-secondary text-sm">{entry.dates}</p>
        </div>
      {/each}
    </div>
  </div>
</aside>
