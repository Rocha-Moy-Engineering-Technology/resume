import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import SectionHeading from '../components/SectionHeading.svelte';

describe('SectionHeading', () => {
  it('renders the title as a level-two heading', () => {
    render(SectionHeading, { props: { title: 'Experience' } });
    expect(
      screen.getByRole('heading', { level: 2, name: 'Experience' })
    ).toBeInTheDocument();
  });
});
