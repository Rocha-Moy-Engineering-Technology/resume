<script lang="ts">
  import type { LanguageFlag } from '../../../types/language';

  interface Props {
    flag: LanguageFlag;
  }

  let { flag }: Props = $props();
</script>

<svg
  viewBox="0 0 30 20"
  aria-hidden="true"
  focusable="false"
  data-flag={flag}
  class="block aspect-[3/2] w-4 shrink-0 md:w-[1.375rem]"
>
  {#if flag === 'us'}
    <rect width="30" height="20" fill="#fff" />
    <path
      fill="#b22234"
      d="M0 0h30v1.54H0zm0 3.08h30v1.54H0zm0 3.07h30v1.54H0zm0 3.08h30v1.54H0zm0 3.08h30v1.54H0zm0 3.07h30v1.54H0zm0 3.08h30v1.54H0z"
    />
    <rect width="12" height="10.77" fill="#3c3b6e" />
    <g fill="#fff">
      {#each [1.6, 4.1, 6.6, 9.1] as cy, row (cy)}
        {#each row % 2 === 0 ? [1.5, 4.5, 7.5, 10.5] : [3, 6, 9] as cx (cx)}
          <circle {cx} {cy} r=".55" />
        {/each}
      {/each}
    </g>
  {:else}
    <rect width="30" height="20" fill="#009c3b" />
    <path fill="#ffdf00" d="M15 2.2 27.6 10 15 17.8 2.4 10z" />
    <circle cx="15" cy="10" r="4.6" fill="#002776" />
    <path
      d="M10.5 9.2c3-.6 6.3.1 8.8 2.2"
      fill="none"
      stroke="#fff"
      stroke-width=".9"
    />
  {/if}
</svg>
