import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import ThemeToggle from '../components/ThemeToggle.svelte';
import { Theme } from '../types/theme';

describe('ThemeToggle', () => {
  it('offers to switch to light while dark is showing', () => {
    render(ThemeToggle, { props: { theme: Theme.Dark, ontoggle: vi.fn() } });
    expect(
      screen.getByRole('button', { name: 'Switch to light theme' })
    ).toBeInTheDocument();
  });

  it('offers to switch to dark while light is showing', () => {
    render(ThemeToggle, { props: { theme: Theme.Light, ontoggle: vi.fn() } });
    expect(
      screen.getByRole('button', { name: 'Switch to dark theme' })
    ).toBeInTheDocument();
  });

  it('calls ontoggle when pressed', async () => {
    const ontoggle = vi.fn();
    render(ThemeToggle, { props: { theme: Theme.Light, ontoggle } });

    await fireEvent.click(screen.getByRole('button'));

    expect(ontoggle).toHaveBeenCalledOnce();
  });
});
