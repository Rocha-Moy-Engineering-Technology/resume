import { describe, expect, it } from 'vitest';
import { createPageController } from '../state/page.svelte';
import { resumeDownloadFilename } from '../logic/page';
import { ModalState } from '../types/modal';

describe('page state', () => {
  it('captures one injected calendar date and owns the contact modal', () => {
    let reads = 0;
    const page = createPageController({
      readDate: () => {
        reads += 1;
        return { year: 2026, month: 1, day: 2 };
      },
    });
    expect(page.year).toBe(2026);
    expect(page.downloadFilename).toBe('PHRMOY_RESUME_rev20260102.pdf');
    expect(reads).toBe(1);
    expect(page.modalState).toBe(ModalState.Closed);
    page.openContact();
    expect(page.modalState).toBe(ModalState.Open);
    page.closeContact();
    expect(page.modalState).toBe(ModalState.Closed);
  });

  it('formats every date part without padding larger values', () => {
    expect(resumeDownloadFilename({ year: 2026, month: 11, day: 12 })).toBe(
      'PHRMOY_RESUME_rev20261112.pdf'
    );
  });
});
