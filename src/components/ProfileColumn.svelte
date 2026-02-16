<script lang="ts">
  import profilePic from '../../pic.png';
  import { EDUCATION_ENTRIES, PROFILE } from '../types/resume';

</script>

<aside
  class="bg-bg-primary lg:sticky lg:top-0 lg:h-screen lg:w-2/5 lg:overflow-y-auto lg:border-r lg:border-divider"
>
  <div class="flex flex-col px-8 py-12 lg:px-10 lg:py-16">
    <img
      src={profilePic}
      alt={PROFILE.name}
      class="h-72 w-56 shrink-0 rounded-xl object-cover shadow-md lg:h-64 lg:w-48 xl:h-80 xl:w-60 mx-auto"
    />

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
