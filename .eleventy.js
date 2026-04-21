const markdownIt = require('markdown-it');

module.exports = function (eleventyConfig) {
  const md = markdownIt({ html: true });

  // Markdown filter for rendering content in templates
  eleventyConfig.addFilter('markdown', value => {
    if (!value) return '';
    return md.render(value);
  });

  // Inline markdown — no wrapping <p>, safe for headings and titles
  // Also converts <u>...</u> (CMS italic artifact) to <em>
  eleventyConfig.addFilter('markdownInline', value => {
    if (!value) return '';
    return md.renderInline(value).replace(/<u>(.*?)<\/u>/gi, '<em>$1</em>');
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

  // Rewrite a site-relative image URL through Cloudflare Image Transformations.
  // In dev (eleventy --serve), emit an absolute URL to the live origin so transforms
  // actually work — any image already on production renders as its optimized version.
  // Override the live origin with the CF_IMAGE_ORIGIN env var if needed.
  const CF_DEV_ORIGIN = process.env.CF_IMAGE_ORIGIN || 'https://laurensutherlandsoprano.com';
  eleventyConfig.addFilter('cfImage', (url, width) => {
    if (!url || typeof url !== 'string') return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    const normalized = url.replace(/^\//, '');
    const encoded = normalized.split('/').map(encodeURIComponent).join('/');
    const opts = [`width=${width || 1200}`, 'fit=scale-down', 'format=auto'];
    const path = `/cdn-cgi/image/${opts.join(',')}/${encoded}`;
    return process.env.ELEVENTY_RUN_MODE === 'serve' ? `${CF_DEV_ORIGIN}${path}` : path;
  });

  // Collect image URLs from every page in the collection EXCEPT the current one.
  // Used to emit <link rel="prefetch" as="image"> hints so browsing feels snappy.
  eleventyConfig.addFilter('collectOtherPageImages', (collection, currentUrl) => {
    const urls = new Set();
    const addFromBlock = block => {
      if (block.image) urls.add(block.image);
      if (Array.isArray(block.images)) {
        for (const img of block.images) {
          if (typeof img === 'string') urls.add(img);
          else if (img && img.image) urls.add(img.image);
        }
      }
      if (Array.isArray(block.events)) {
        for (const ev of block.events) {
          if (ev.image) urls.add(ev.image);
        }
      }
    };
    for (const item of collection) {
      if (!item.data || item.url === currentUrl) continue;
      if (!Array.isArray(item.data.blocks)) continue;
      for (const block of item.data.blocks) addFromBlock(block);
    }
    return [...urls];
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
