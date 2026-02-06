const markdownIt = require('markdown-it');

module.exports = function (eleventyConfig) {
  const md = markdownIt({ html: true });

  // Markdown filter for rendering content in templates
  eleventyConfig.addFilter('markdown', value => {
    if (!value) return '';
    return md.render(value);
  });

  // Don't process content files as pages (they're data sources only)
  eleventyConfig.ignores.add('src/_content/**');

  // Copy static assets to output
  eleventyConfig.addPassthroughCopy('src/styles.css');
  eleventyConfig.addPassthroughCopy('src/script.js');
  eleventyConfig.addPassthroughCopy('src/admin');
  eleventyConfig.addPassthroughCopy('src/images');

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data',
    },
  };
};
