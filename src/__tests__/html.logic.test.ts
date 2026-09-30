import { describe, expect, it } from 'vitest';
import { escapeHtmlText, fillPlaceholders } from '../logic/html';

describe('escapeHtmlText', () => {
  it('escapes the characters that open markup or an entity', () => {
    expect(escapeHtmlText('Data & Software <Engineering>')).toBe(
      'Data &amp; Software &lt;Engineering&gt;'
    );
  });

  it('escapes each character once, whatever the order', () => {
    expect(escapeHtmlText('<&>')).toBe('&lt;&amp;&gt;');
  });

  it('treats an existing entity as plain text', () => {
    expect(escapeHtmlText('&amp;')).toBe('&amp;amp;');
  });

  it('leaves text without markup characters unchanged', () => {
    expect(escapeHtmlText('It\'s a "quoted" line - 2026')).toBe(
      'It\'s a "quoted" line - 2026'
    );
    expect(escapeHtmlText('')).toBe('');
  });
});

describe('fillPlaceholders', () => {
  it('replaces every occurrence of each token', () => {
    expect(
      fillPlaceholders('<a __ATTR__="x" __ATTR__="y">__TEXT__</a>', [
        ['__ATTR__', 'data-theme'],
        ['__TEXT__', 'Hello'],
      ])
    ).toBe('<a data-theme="x" data-theme="y">Hello</a>');
  });

  it('inserts values verbatim, including replacement patterns', () => {
    expect(
      fillPlaceholders('<p>__VALUE__</p>', [['__VALUE__', '$& and $1 and $$']])
    ).toBe('<p>$& and $1 and $$</p>');
  });

  it('ignores tokens the html does not contain', () => {
    expect(
      fillPlaceholders('<title>Resume</title>', [['__MISSING__', 'x']])
    ).toBe('<title>Resume</title>');
  });

  it('returns the html unchanged when there are no placeholders', () => {
    expect(fillPlaceholders('<title>__NAME__</title>', [])).toBe(
      '<title>__NAME__</title>'
    );
  });
});
