<script lang="ts">
  import { onDestroy } from 'svelte';
  import NavBar from './NavBar.svelte';
  import ProfileColumn from './ProfileColumn.svelte';
  import ExperienceColumn from './ExperienceColumn.svelte';
  import ContactModal from './ContactModal.svelte';
  import { createThemeController } from '../../theme.svelte';
  import { createPageController } from '../../page.svelte';
  import type { ThemePort } from '../../../types/ports/theme';
  import type { ContactPort } from '../../../types/ports/contact';
  import type { ModalPort } from '../../../types/ports/modal';
  import type { ClockPort } from '../../../types/ports/clock';
  import type { NavigationPort } from '../../../types/ports/navigation';

  interface Props {
    themePort: ThemePort;
    contactPort: ContactPort;
    modalPort: ModalPort;
    clockPort: ClockPort;
    navigationPort: NavigationPort;
  }

  let { themePort, contactPort, modalPort, clockPort, navigationPort }: Props =
    $props();

  // The port is injected once at mount and never swapped; capturing it here is
  // deliberate.
  // svelte-ignore state_referenced_locally
  const themeController = createThemeController(themePort);

  // svelte-ignore state_referenced_locally
  const pageController = createPageController(clockPort);

  onDestroy(() => themeController.destroy());
</script>

<NavBar
  theme={themeController.theme}
  onthemetoggle={themeController.toggle}
  oncontact={pageController.openContact}
  downloadFilename={pageController.downloadFilename}
/>
<main class="flex flex-col lg:flex-row">
  <ProfileColumn />
  <ExperienceColumn currentYear={pageController.year} port={navigationPort} />
</main>
<ContactModal
  state={pageController.modalState}
  onclose={pageController.closeContact}
  {contactPort}
  {modalPort}
/>
