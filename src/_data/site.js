const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

module.exports = function () {
  const contentDir = path.join(__dirname, '../_content');
  const data = {};

  // Load single content files
  const pages = ['hero', 'about', 'contact'];
  pages.forEach(name => {
    const filePath = path.join(contentDir, `${name}.md`);
    if (fs.existsSync(filePath)) {
      const file = matter(fs.readFileSync(filePath, 'utf-8'));
      data[name] = { ...file.data, body: file.content.trim() };
    }
  });

  return data;
};
