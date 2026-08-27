<script lang="ts">
  interface Props {
    title: string;
  }

  let { title }: Props = $props();
</script>

<div class="flex items-center gap-5">
  <h2
    class="text-ink font-display shrink-0 text-2xl font-semibold sm:text-[1.7rem]"
  >
    {title}
  </h2>
  <span class="bg-line h-px flex-1" aria-hidden="true"></span>
</div>
