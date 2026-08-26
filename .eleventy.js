import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  // Rewrites root-relative URLs in the output HTML to sit under pathPrefix.
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addFilter("readableDate", (value) =>
    new Date(value).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  );

  eleventyConfig.addFilter("isoDate", (value) =>
    new Date(value).toISOString().slice(0, 10)
  );

  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  eleventyConfig.addFilter("pad", (n) => String(n).padStart(2, "0"));

  eleventyConfig.addFilter("rfc3339", (value) => new Date(value).toISOString());

  eleventyConfig.addFilter("getDate", (item) => (item ? item.date : new Date()));

  // striptags leaves entities behind; searching for "don't" should match "don&#8217;t".
  const NAMED = {
    amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
    middot: "·", radic: "√", laquo: "«", raquo: "»",
    hellip: "…", mdash: "—", ndash: "–",
  };

  eleventyConfig.addFilter("collapse", (text) =>
    String(text)
      .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
      .replace(/&([a-z]+);/gi, (m, name) => NAMED[name.toLowerCase()] ?? m)
      .replace(/\s+/g, " ")
      .trim()
  );

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date)
  );

  return {
    // GitHub Pages serves a project site from /<repo>/. Override for a bare domain.
    pathPrefix: process.env.PATH_PREFIX || "/",
    dir: { input: "src", includes: "_includes", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
