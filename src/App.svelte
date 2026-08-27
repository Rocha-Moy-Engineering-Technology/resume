<script lang="ts">
  import { onDestroy } from 'svelte';
  import NavBar from './components/NavBar.svelte';
  import ProfileColumn from './components/ProfileColumn.svelte';
  import ExperienceColumn from './components/ExperienceColumn.svelte';
  import ContactModal from './components/ContactModal.svelte';
  import { createThemeController } from './state/theme.svelte';
  import { ModalState } from './types/modal';
  import type { ThemePort } from './types/ports/theme';

  interface Props {
    themePort: ThemePort;
  }

  let { themePort }: Props = $props();

  // The port is injected once at mount and never swapped; capturing it here is
  // deliberate.
  // svelte-ignore state_referenced_locally
  const themeController = createThemeController(themePort);

  let modalState = $state<ModalState>(ModalState.Closed);

  function openContact(): void {
    modalState = ModalState.Open;
  }

  function closeContact(): void {
    modalState = ModalState.Closed;
  }

  onDestroy(() => themeController.destroy());
</script>

<NavBar
  theme={themeController.theme}
  onthemetoggle={themeController.toggle}
  oncontact={openContact}
/>
<main class="flex flex-col lg:flex-row">
  <ProfileColumn />
  <ExperienceColumn />
</main>
<ContactModal state={modalState} onclose={closeContact} />
