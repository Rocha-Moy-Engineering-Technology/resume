import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ProfileColumn from '../components/ProfileColumn.svelte';
import {
  PROFILE,
  INTERESTS_INLINE_TEXT,
  EDUCATION_ENTRIES,
} from '../types/resume';

describe('ProfileColumn', () => {
  it('renders the profile image', () => {
    render(ProfileColumn);
    expect(screen.getByAltText(PROFILE.name)).toBeInTheDocument();
  });

  it('renders summary with inline interests', () => {
    render(ProfileColumn);
    expect(
      screen.getByText((_content, element) => {
        return (
          element?.tagName === 'P' &&
          !!element.textContent?.includes(PROFILE.summary) &&
          !!element.textContent?.includes(INTERESTS_INLINE_TEXT)
        );
      })
    ).toBeInTheDocument();
  });

  it('renders education entries', () => {
    render(ProfileColumn);
    for (const entry of EDUCATION_ENTRIES) {
      expect(screen.getByText(entry.degree)).toBeInTheDocument();
      expect(screen.getByText(entry.institution)).toBeInTheDocument();
    }
  });

});
