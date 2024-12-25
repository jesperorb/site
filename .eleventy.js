import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
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
import { getMarkdownPlugin, minify } from "./utils/plugins.js";

export default function (
  /** @type {import('@11ty/eleventy').UserConfig} */
  eleventyConfig
) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);

  eleventyConfig.setLibrary("md", getMarkdownPlugin(eleventyConfig));

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");

  eleventyConfig.addFilter("cssmin", minify);
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

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: false,
  };
}
