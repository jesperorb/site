import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import CleanCSS from "clean-css";

export const getMarkdownPlugin = (
  /** @type {import('@11ty/eleventy').UserConfig} */
  eleventyConfig
) =>
  markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.linkAfterHeader({
      style: 'visually-hidden',
      assistiveText: title => `Permalink to “${title}”`,
      visuallyHiddenClass: 'visually-hidden',
      wrapper: ['<div class="title-wrapper">', '</div>']
    }),
    slugify: eleventyConfig.getFilter("slug"),
  });

export const minify = (code) =>
  new CleanCSS({}).minify(code).styles;

