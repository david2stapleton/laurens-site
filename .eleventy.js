const markdownIt = require('markdown-it');

module.exports = function (eleventyConfig) {
  const md = markdownIt({ html: true });

  // Markdown filter for rendering content in templates
  eleventyConfig.addFilter('markdown', value => {
    if (!value) return '';
    return md.render(value);
  });

  // Extract YouTube video ID from various URL formats
  eleventyConfig.addFilter('youtubeId', value => {
    if (!value) return '';
    const patterns = [
      /youtu\.be\/([^?&#]+)/,
      /youtube\.com\/watch\?v=([^&#]+)/,
      /youtube\.com\/embed\/([^?&#]+)/
    ];
    for (const pattern of patterns) {
      const match = value.match(pattern);
      if (match) return match[1];
    }
    return value;
  });

  // Ensure URLs have a protocol
  eleventyConfig.addFilter('ensureUrl', value => {
    if (!value) return '';
    if (value.startsWith('http://') || value.startsWith('https://')) return value;
    return 'https://' + value;
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
