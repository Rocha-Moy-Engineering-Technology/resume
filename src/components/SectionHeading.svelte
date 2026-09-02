<script lang="ts">
  interface Props {
    title: string;
  }

  let { title }: Props = $props();
</script>

<div class="flex items-baseline gap-5">
  <h2 class="display text-ink shrink-0 text-[1.75rem] sm:text-[2.125rem]">
    {title}
  </h2>
  <span class="bg-line h-px flex-1" aria-hidden="true"></span>
</div>
