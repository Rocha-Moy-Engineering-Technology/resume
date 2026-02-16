import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import NavBar from '../components/NavBar.svelte';
import { PROFILE } from '../types/resume';

describe('NavBar', () => {
  const mockOnContact = vi.fn();

  it('renders a nav element', () => {
    render(NavBar, { props: { oncontact: mockOnContact } });
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders the brand text', () => {
    render(NavBar, { props: { oncontact: mockOnContact } });
    expect(screen.getByText(PROFILE.name)).toBeInTheDocument();
  });

  it('renders download resume icon link with correct href', () => {
    render(NavBar, { props: { oncontact: mockOnContact } });
    const link = screen.getByRole('link', { name: /download resume/i });
    expect(link).toHaveAttribute('href', '/resume.pdf');
    expect(link).toHaveAttribute('download', '');
    expect(link.querySelector('svg')).toBeInTheDocument();
  });

  it('renders GitHub icon link', () => {
    render(NavBar, { props: { oncontact: mockOnContact } });
    const github = screen.getByRole('link', { name: /github/i });
    expect(github).toHaveAttribute('href', PROFILE.github);
    expect(github).toHaveAttribute('target', '_blank');
    expect(github).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders LinkedIn icon link', () => {
    render(NavBar, { props: { oncontact: mockOnContact } });
    const linkedin = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedin).toHaveAttribute('href', PROFILE.linkedin);
    expect(linkedin).toHaveAttribute('target', '_blank');
    expect(linkedin).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders contact button that calls oncontact', async () => {
    render(NavBar, { props: { oncontact: mockOnContact } });
    const button = screen.getByRole('button', { name: /contact/i });
    await fireEvent.click(button);
    expect(mockOnContact).toHaveBeenCalledOnce();
  });
});
