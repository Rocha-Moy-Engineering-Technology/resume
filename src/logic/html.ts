const HTML_TEXT_ESCAPES: Readonly<Record<string, string>> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
};

/** Encodes plain text for an HTML text node, such as the document title. */
export function escapeHtmlText(text: string): string {
  return text.replace(/[&<>]/g, (char) => HTML_TEXT_ESCAPES[char]);
}

/**
 * Replaces every occurrence of each token with its value. Split and join keep
 * values verbatim, where String.replace would expand patterns such as `$&`.
 */
export function fillPlaceholders(
  html: string,
  placeholders: ReadonlyArray<readonly [token: string, value: string]>
): string {
  return placeholders.reduce(
    (current, [token, value]) => current.split(token).join(value),
    html
  );
}
