const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const FONT_PAIRINGS = {
  'droid-opensans': {
    heading: "'Droid Serif', Georgia, serif",
    body: "'Open Sans', Arial, sans-serif",
    url: 'https://fonts.googleapis.com/css2?family=Droid+Serif:ital,wght@0,400;0,700;1,400&family=Open+Sans:wght@300;400;600&display=swap'
  },
  'playfair-lato': {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Lato', Arial, sans-serif",
    url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&display=swap'
  },
  'cormorant-raleway': {
    heading: "'Cormorant Garamond', Georgia, serif",
    body: "'Raleway', Arial, sans-serif",
    url: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Raleway:wght@300;400;600&display=swap'
  },
  'baskerville-sourcesans': {
    heading: "'Libre Baskerville', Georgia, serif",
    body: "'Source Sans 3', Arial, sans-serif",
    url: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap'
  },
  'dmserif-dmsans': {
    heading: "'DM Serif Display', Georgia, serif",
    body: "'DM Sans', Arial, sans-serif",
    url: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;700&display=swap'
  }
};

module.exports = function () {
  const contentDir = path.join(__dirname, '../_content');
  const data = {};

  // Load design config
  const designPath = path.join(contentDir, 'design.md');
  if (fs.existsSync(designPath)) {
    const file = matter(fs.readFileSync(designPath, 'utf-8'));
    data.design = { ...file.data, body: file.content.trim() };
  }

  // Load sections (page builder blocks)
  const sectionsPath = path.join(contentDir, 'sections.md');
  if (fs.existsSync(sectionsPath)) {
    const file = matter(fs.readFileSync(sectionsPath, 'utf-8'));
    data.sections = file.data.blocks || [];
  } else {
    data.sections = [];
  }

  // Resolve font pairing
  const pairingKey = data.design && data.design.font_pairing;
  data.fonts = FONT_PAIRINGS[pairingKey] || FONT_PAIRINGS['droid-opensans'];

  return data;
};
