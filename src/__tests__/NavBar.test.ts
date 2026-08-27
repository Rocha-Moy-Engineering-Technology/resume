import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import NavBar from '../components/NavBar.svelte';
import { PROFILE } from '../types/resume';
import { Theme } from '../types/theme';

describe('NavBar', () => {
  const mockOnContact = vi.fn();
  const mockOnThemeToggle = vi.fn();
  const props = {
    theme: Theme.Dark,
    onthemetoggle: mockOnThemeToggle,
    oncontact: mockOnContact,
  };

  it('renders a nav element', () => {
    render(NavBar, { props });
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders the brand text', () => {
    render(NavBar, { props });
    expect(screen.getByText(PROFILE.name)).toBeInTheDocument();
  });

  it('renders the professional title beside the name', () => {
    render(NavBar, { props });
    expect(screen.getByText(PROFILE.title)).toBeInTheDocument();
  });

  it('renders download resume icon link with correct href', () => {
    render(NavBar, { props });
    const link = screen.getByRole('link', { name: /download resume/i });
    expect(link).toHaveAttribute(
      'href',
      `${import.meta.env.BASE_URL}resume.pdf`
    );
    expect(link.getAttribute('download')).toMatch(
      /^PHRMOY_RESUME_rev\d{8}\.pdf$/
    );
    expect(link.querySelector('svg')).toBeInTheDocument();
  });

  it('renders GitHub icon link', () => {
    render(NavBar, { props });
    const github = screen.getByRole('link', { name: /github/i });
    expect(github).toHaveAttribute('href', PROFILE.github);
    expect(github).toHaveAttribute('target', '_blank');
    expect(github).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders LinkedIn icon link', () => {
    render(NavBar, { props });
    const linkedin = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedin).toHaveAttribute('href', PROFILE.linkedin);
    expect(linkedin).toHaveAttribute('target', '_blank');
    expect(linkedin).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders contact button that calls oncontact', async () => {
    render(NavBar, { props });
    const button = screen.getByRole('button', { name: /contact/i });
    await fireEvent.click(button);
    expect(mockOnContact).toHaveBeenCalledOnce();
  });
  it('renders the theme toggle and forwards its press', async () => {
    render(NavBar, { props });
    const toggle = screen.getByRole('button', {
      name: /switch to light theme/i,
    });
    await fireEvent.click(toggle);
    expect(mockOnThemeToggle).toHaveBeenCalledOnce();
  });
});
