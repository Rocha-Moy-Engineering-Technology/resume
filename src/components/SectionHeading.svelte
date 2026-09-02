<script lang="ts">
  interface Props {
    title: string;
  }

  let { title }: Props = $props();
</script>

<!--
  No rule of its own: the first entry below carries a top hairline, and a second
  line here would read as a doubled border.
-->
<h2 class="display text-ink text-[1.75rem] sm:text-[2.125rem]">
  {title}
</h2>
