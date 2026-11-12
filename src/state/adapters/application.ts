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
  return mount(App, {
    target,
    props: {
      themePort: createBrowserThemePort(),
      contactPort: createBrowserContactPort(),
      modalPort: createBrowserModalPort(),
      clockPort: createBrowserClockPort(),
      navigationPort: createBrowserNavigationPort(),
    },
  });
}
