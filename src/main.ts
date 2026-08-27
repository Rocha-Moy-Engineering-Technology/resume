import './app.css';
import App from './App.svelte';
import { createBrowserThemePort } from './state/adapters/theme';
import { mount } from 'svelte';

const app = mount(App, {
  target: document.getElementById('app')!,
  props: { themePort: createBrowserThemePort() },
});

export default app;
