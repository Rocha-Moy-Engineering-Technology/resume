import { fireEvent, render, screen } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';
import ExperienceColumn from '../components/ExperienceColumn.svelte';
import {
  PROFILE,
  EXPERIENCE_ENTRIES,
  PORTFOLIO_ENTRIES,
} from '../types/resume';

function experienceTab(): HTMLElement {
  return screen.getByRole('tab', { name: 'Experience' });
}

function portfolioTab(): HTMLElement {
  return screen.getByRole('tab', { name: 'Portfolio' });
}

describe('ExperienceColumn', () => {
  afterEach(() => {
    history.replaceState(null, '', window.location.pathname);
  });

  it('renders the resume section with correct id', () => {
    const { container } = render(ExperienceColumn);
    expect(container.querySelector('#resume')).toBeInTheDocument();
  });

  it('renders Experience then Portfolio as tabs', () => {
    render(ExperienceColumn);
    const tabs = screen.getAllByRole('tab');
    expect(tabs.map((tab) => tab.textContent?.trim())).toEqual([
      'Experience',
      'Portfolio',
    ]);
    expect(screen.getByRole('tablist')).toContainElement(tabs[0]);
  });

  it('selects the Experience tab by default', () => {
    render(ExperienceColumn);
    expect(experienceTab()).toHaveAttribute('aria-selected', 'true');
    expect(experienceTab()).toHaveAttribute('tabindex', '0');
    expect(portfolioTab()).toHaveAttribute('aria-selected', 'false');
    expect(portfolioTab()).toHaveAttribute('tabindex', '-1');
    expect(
      screen.getByRole('tabpanel', { name: 'Experience' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('tabpanel', { name: 'Portfolio' })
    ).not.toBeInTheDocument();
  });

  it('wires each tab to its panel', () => {
    render(ExperienceColumn);
    for (const tab of screen.getAllByRole('tab', { hidden: true })) {
      const panel = document.getElementById(
        tab.getAttribute('aria-controls') ?? ''
      );
      expect(panel).toHaveAttribute('role', 'tabpanel');
      expect(panel).toHaveAttribute('aria-labelledby', tab.id);
    }
  });

  it('renders all experience entry titles', () => {
    render(ExperienceColumn);
    for (const entry of EXPERIENCE_ENTRIES) {
      expect(screen.getByText(entry.title)).toBeVisible();
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

  it('renders the technology tags of every entry', () => {
    render(ExperienceColumn);
    for (const entry of EXPERIENCE_ENTRIES) {
      for (const technology of entry.technologies) {
        expect(screen.getAllByText(technology).length).toBeGreaterThan(0);
      }
    }
  });

  it('hides the portfolio until its tab is chosen', () => {
    render(ExperienceColumn);
    expect(
      screen.queryByRole('link', { name: PORTFOLIO_ENTRIES[0].title })
    ).not.toBeInTheDocument();
  });

  it('shows the portfolio and hides experience on clicking Portfolio', async () => {
    render(ExperienceColumn);
    await fireEvent.click(portfolioTab());

    expect(portfolioTab()).toHaveAttribute('aria-selected', 'true');
    expect(experienceTab()).toHaveAttribute('aria-selected', 'false');
    const link = screen.getByRole('link', {
      name: PORTFOLIO_ENTRIES[0].title,
    });
    expect(link).toHaveAttribute('href', PORTFOLIO_ENTRIES[0].url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(screen.getByText(EXPERIENCE_ENTRIES[0].title)).not.toBeVisible();
  });

  it('returns to experience on clicking Experience', async () => {
    render(ExperienceColumn);
    await fireEvent.click(portfolioTab());
    await fireEvent.click(experienceTab());

    expect(experienceTab()).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText(EXPERIENCE_ENTRIES[0].title)).toBeVisible();
  });

  it('moves selection and focus with the arrow keys', async () => {
    render(ExperienceColumn);
    await fireEvent.keyDown(experienceTab(), { key: 'ArrowRight' });
    expect(portfolioTab()).toHaveAttribute('aria-selected', 'true');
    expect(portfolioTab()).toHaveFocus();

    await fireEvent.keyDown(portfolioTab(), { key: 'ArrowRight' });
    expect(experienceTab()).toHaveAttribute('aria-selected', 'true');
    expect(experienceTab()).toHaveFocus();
  });

  it('opens the tab named in the URL fragment', () => {
    history.replaceState(null, '', '#portfolio');
    render(ExperienceColumn);
    expect(portfolioTab()).toHaveAttribute('aria-selected', 'true');
  });

  it('ignores a fragment that names no tab', () => {
    history.replaceState(null, '', '#contact');
    render(ExperienceColumn);
    expect(experienceTab()).toHaveAttribute('aria-selected', 'true');
  });

  it('follows the fragment when it changes', async () => {
    render(ExperienceColumn);
    history.replaceState(null, '', '#portfolio');
    await fireEvent(window, new HashChangeEvent('hashchange'));
    expect(portfolioTab()).toHaveAttribute('aria-selected', 'true');
  });

  it('writes the chosen tab to the URL fragment', async () => {
    render(ExperienceColumn);
    await fireEvent.click(portfolioTab());
    expect(window.location.hash).toBe('#portfolio');
    await fireEvent.click(experienceTab());
    expect(window.location.hash).toBe('#experience');
  });

  it('renders copyright text', () => {
    render(ExperienceColumn);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} ${PROFILE.name}`)).toBeInTheDocument();
  });
});
