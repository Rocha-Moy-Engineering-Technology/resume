import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ProfileColumn from '../components/ProfileColumn.svelte';
import { PROFILE, EDUCATION_ENTRIES } from '../types/resume';

describe('ProfileColumn', () => {
  it('renders the profile image', () => {
    render(ProfileColumn);
    expect(screen.getByAltText(PROFILE.name)).toBeInTheDocument();
  });

  it('renders education entries', () => {
    render(ProfileColumn);
    for (const entry of EDUCATION_ENTRIES) {
      expect(screen.getByText(entry.degree)).toBeInTheDocument();
      expect(screen.getByText(entry.institution)).toBeInTheDocument();
    }
  });
});
