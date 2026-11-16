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
  import { RESUMES } from '../../../types/resume';
  import type { ResumeLanguage } from '../../../types/language';

  interface Props {
    language?: ResumeLanguage;
    themePort: ThemePort;
    contactPort: ContactPort;
    modalPort: ModalPort;
    clockPort: ClockPort;
    navigationPort: NavigationPort;
  }

  let {
    language = 'en',
    themePort,
    contactPort,
    modalPort,
    clockPort,
    navigationPort,
  }: Props = $props();

  // The port is injected once at mount and never swapped; capturing it here is
  // deliberate.
  // svelte-ignore state_referenced_locally
  const themeController = createThemeController(themePort);

  // svelte-ignore state_referenced_locally
  const pageController = createPageController(clockPort, language);
  const resume = $derived(RESUMES[language]);

  onDestroy(() => themeController.destroy());
</script>

<svelte:head>
  <title>{resume.profile.name} - {resume.profile.title}</title>
</svelte:head>

<NavBar
  {language}
  theme={themeController.theme}
  onthemetoggle={themeController.toggle}
  oncontact={pageController.openContact}
  downloadFilename={pageController.downloadFilename}
/>
<main class="flex flex-col lg:flex-row">
  <ProfileColumn {language} />
  <ExperienceColumn
    {language}
    currentYear={pageController.year}
    port={navigationPort}
  />
</main>
<ContactModal
  {language}
  state={pageController.modalState}
  onclose={pageController.closeContact}
  {contactPort}
  {modalPort}
/>
