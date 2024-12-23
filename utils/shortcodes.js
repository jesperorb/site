/**
 * Generates a callout HTML string with the specified content, type, and optional title.
 *
 * @param {string} content - The content to be displayed inside the callout.
 * @param {string} type - The type of the callout (e.g., 'info', 'warning', 'error').
 * @param {string} [title] - An optional title to be displayed at the top of the callout.
 * @returns {string} The generated HTML string for the callout.
 */
export const calloutShortCodeConverter = (content, type, title) => {
  const heading = title ? `<p><strong>${title}</strong></p>` : "";
  return `<div class="callout callout--${type}">${heading} ${content}</div>`;
}
