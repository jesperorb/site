import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import {
  readableDate,
  dateStringToShortMonth,
  dateToYYYYMMDD,
  head,
  filterTagList,
  getTagList,
  minValue,
} from "./utils/filters.js";
import { calloutShortCodeConverter } from "./utils/shortcodes.js";

export default function (
  /** @type {import('@11ty/eleventy').UserConfig} */
  eleventyConfig
) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");

  eleventyConfig.addFilter("readableDate", readableDate);
  eleventyConfig.addFilter("shortMonth", dateStringToShortMonth);
  eleventyConfig.addFilter("htmlDateString", dateToYYYYMMDD);
  eleventyConfig.addFilter("head", head);
  eleventyConfig.addFilter("min", minValue);
  eleventyConfig.addFilter("filterTagList", filterTagList);

  eleventyConfig.addPairedShortcode("callout", calloutShortCodeConverter);

  // Create an array of all tags
  eleventyConfig.addCollection("tagList", getTagList);

  // Copy the `img` and `css` folders to the output
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");

  // Customize Markdown library and settings:
  eleventyConfig.setLibrary(
    "md",
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
    })
  );

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: false,
  };
}
