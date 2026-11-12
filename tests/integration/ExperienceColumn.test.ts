import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ExperienceColumn from '../../src/state/adapters/inbound/ExperienceColumn.svelte';
import {
  PROFILE,
  EXPERIENCE_ENTRIES,
  PORTFOLIO_ENTRIES,
} from '../../src/types/resume';
import { createFakeNavigationPort } from '../../src/__tests__/fakes/navigation';

function renderColumn(hash = '') {
  const port = createFakeNavigationPort(hash);
  return {
    port,
    ...render(ExperienceColumn, { props: { currentYear: 2026, port } }),
  };
}

function experienceTab(): HTMLElement {
  return screen.getByRole('tab', { name: 'Experience' });
}

function portfolioTab(): HTMLElement {
  return screen.getByRole('tab', { name: 'Portfolio' });
}

describe('ExperienceColumn', () => {
  it('renders the resume section with correct id', () => {
    const { container } = renderColumn();
    expect(container.querySelector('#resume')).toBeInTheDocument();
  });

  it('renders Experience then Portfolio as tabs', () => {
    renderColumn();
    const tabs = screen.getAllByRole('tab');
    expect(tabs.map((tab) => tab.textContent?.trim())).toEqual([
      'Experience',
      'Portfolio',
    ]);
    expect(screen.getByRole('tablist')).toContainElement(tabs[0]);
  });

  it('selects the Experience tab by default', () => {
    renderColumn();
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
    renderColumn();
    for (const tab of screen.getAllByRole('tab', { hidden: true })) {
      const panel = document.getElementById(
        tab.getAttribute('aria-controls') ?? ''
      );
      expect(panel).toHaveAttribute('role', 'tabpanel');
      expect(panel).toHaveAttribute('aria-labelledby', tab.id);
    }
  });

  it('renders all experience entry titles', () => {
    renderColumn();
    for (const entry of EXPERIENCE_ENTRIES) {
      expect(screen.getByText(entry.title)).toBeVisible();
    }
  });

  it('renders experience companies', () => {
    renderColumn();
    for (const entry of EXPERIENCE_ENTRIES) {
      expect(screen.getAllByText(entry.company).length).toBeGreaterThan(0);
    }
  });

  it('renders experience date ranges', () => {
    renderColumn();
    const uniqueDates = [...new Set(EXPERIENCE_ENTRIES.map((e) => e.dates))];
    for (const dates of uniqueDates) {
      expect(screen.getAllByText(dates).length).toBeGreaterThan(0);
    }
  });

  it('renders the technology tags of every entry', () => {
    renderColumn();
    for (const entry of EXPERIENCE_ENTRIES) {
      for (const technology of entry.technologies) {
        expect(screen.getAllByText(technology).length).toBeGreaterThan(0);
      }
    }
  });

  it('hides the portfolio until its tab is chosen', () => {
    renderColumn();
    expect(
      screen.queryByRole('link', { name: PORTFOLIO_ENTRIES[0].title })
    ).not.toBeInTheDocument();
  });

  it('shows the portfolio and hides experience on clicking Portfolio', async () => {
    renderColumn();
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
    renderColumn();
    await fireEvent.click(portfolioTab());
    await fireEvent.click(experienceTab());

    expect(experienceTab()).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText(EXPERIENCE_ENTRIES[0].title)).toBeVisible();
  });

  it('moves selection and focus with the arrow keys', async () => {
    renderColumn();
    await fireEvent.keyDown(experienceTab(), { key: 'ArrowRight' });
    expect(portfolioTab()).toHaveAttribute('aria-selected', 'true');
    expect(portfolioTab()).toHaveFocus();

    await fireEvent.keyDown(portfolioTab(), { key: 'ArrowRight' });
    expect(experienceTab()).toHaveAttribute('aria-selected', 'true');
    expect(experienceTab()).toHaveFocus();
  });

  it('opens the tab named in the URL fragment', () => {
    renderColumn('#portfolio');
    expect(portfolioTab()).toHaveAttribute('aria-selected', 'true');
  });

  it('ignores a fragment that names no tab', () => {
    renderColumn('#contact');
    expect(experienceTab()).toHaveAttribute('aria-selected', 'true');
  });

  it('follows the fragment when it changes', async () => {
    const { port } = renderColumn();
    port.changeHash('#portfolio');
    await Promise.resolve();
    expect(portfolioTab()).toHaveAttribute('aria-selected', 'true');
  });

  it('writes the chosen tab to the URL fragment', async () => {
    const { port } = renderColumn();
    await fireEvent.click(portfolioTab());
    expect(port.readHash()).toBe('#portfolio');
    await fireEvent.click(experienceTab());
    expect(port.readHash()).toBe('#experience');
  });

  it('renders copyright text', () => {
    renderColumn();
    const year = 2026;
    expect(screen.getByText(`© ${year} ${PROFILE.name}`)).toBeInTheDocument();
  });
});
