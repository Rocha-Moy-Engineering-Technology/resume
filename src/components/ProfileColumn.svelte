<script lang="ts">
  import profilePic from '../../pic.png';
  import { EDUCATION_ENTRIES, PROFILE } from '../types/resume';

</script>

<aside
  class="bg-bg-primary lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:w-2/5 lg:overflow-y-auto lg:border-r lg:border-divider"
>
  <div class="flex flex-col px-8 py-8 lg:px-10 lg:py-8">
    <div class="h-56 w-56 shrink-0 rounded-2xl shadow-2xl lg:h-64 lg:w-64 xl:h-72 xl:w-72 mx-auto overflow-hidden border border-white/10">
      <img
        src={profilePic}
        alt={PROFILE.name}
        class="h-full w-full object-cover scale-[1.15] object-[60%_8%]"
      />
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
