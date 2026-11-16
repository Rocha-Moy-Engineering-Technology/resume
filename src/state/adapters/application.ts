import { resumeLanguage } from '../../logic/language';
import { mount } from 'svelte';
import App from './inbound/App.svelte';
import { createBrowserThemePort } from './theme';
import { createBrowserContactPort } from './contact';
import { createBrowserModalPort } from './modal';
import { createBrowserClockPort } from './clock';
import { createBrowserNavigationPort } from './navigation';

/** Browser composition root: production ports are created only at the boundary. */
export function startBrowserApplication() {
  const target = document.getElementById('app');
  if (!target) throw new Error('Missing application mount point');
  const language = resumeLanguage(
    new URLSearchParams(window.location.search).get('lang')
  );
  document.documentElement.lang = language;
  return mount(App, {
    target,
    props: {
      language,
      themePort: createBrowserThemePort(),
      contactPort: createBrowserContactPort(),
      modalPort: createBrowserModalPort(),
      clockPort: createBrowserClockPort(),
      navigationPort: createBrowserNavigationPort(),
    },
  });
}
