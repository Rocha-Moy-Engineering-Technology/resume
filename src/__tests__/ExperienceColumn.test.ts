import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ExperienceColumn from '../components/ExperienceColumn.svelte';
import {
  PROFILE,
  INTERESTS_INLINE_TEXT,
  EXPERIENCE_ENTRIES,
  PORTFOLIO_ENTRIES,
} from '../types/resume';

describe('ExperienceColumn', () => {
  it('renders the resume section with correct id', () => {
    const { container } = render(ExperienceColumn);
    expect(container.querySelector('#resume')).toBeInTheDocument();
  });

  it('renders the summary heading', () => {
    render(ExperienceColumn);
    expect(
      screen.getByRole('heading', { name: /summary/i })
    ).toBeInTheDocument();
  });

  it('renders the summary text', () => {
    render(ExperienceColumn);
    expect(screen.getByText(PROFILE.summary)).toBeInTheDocument();
  });

  it('renders inline interests', () => {
    render(ExperienceColumn);
    expect(
      screen.getByText(`Interests: ${INTERESTS_INLINE_TEXT}`)
    ).toBeInTheDocument();
  });

  it('renders the experience heading', () => {
    render(ExperienceColumn);
    expect(
      screen.getByRole('heading', { name: /experience/i })
    ).toBeInTheDocument();
  });

  it('renders all experience entry titles', () => {
    render(ExperienceColumn);
    for (const entry of EXPERIENCE_ENTRIES) {
      expect(screen.getByText(entry.title)).toBeInTheDocument();
    }
  });

  it('renders experience companies', () => {
    render(ExperienceColumn);
    for (const entry of EXPERIENCE_ENTRIES) {
      expect(screen.getAllByText(entry.company).length).toBeGreaterThan(0);
    }
  });

  it('renders experience date ranges', () => {
    render(ExperienceColumn);
    const uniqueDates = [...new Set(EXPERIENCE_ENTRIES.map((e) => e.dates))];
    for (const dates of uniqueDates) {
      expect(screen.getAllByText(dates).length).toBeGreaterThan(0);
    }
  });

  it('renders technology tags', () => {
    const { container } = render(ExperienceColumn);
    const tags = container.querySelectorAll('.bg-tag-bg');
    expect(tags.length).toBeGreaterThan(0);
  });

  it('renders the portfolio heading', () => {
    render(ExperienceColumn);
    expect(
      screen.getByRole('heading', { name: /portfolio/i })
    ).toBeInTheDocument();
  });

  it('renders portfolio entry with link', () => {
    render(ExperienceColumn);
    const link = screen.getByRole('link', {
      name: PORTFOLIO_ENTRIES[0].title,
    });
    expect(link).toHaveAttribute('href', PORTFOLIO_ENTRIES[0].url);
    expect(link).toHaveAttribute('target', '_blank');
  });
});
