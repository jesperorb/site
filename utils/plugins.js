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
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "post__direct-link",
      symbol: "#",
      level: [1, 2, 3, 4],
    }),
    slugify: eleventyConfig.getFilter("slug"),
  });

export const minify = (code) =>
  new CleanCSS({}).minify(code).styles;

