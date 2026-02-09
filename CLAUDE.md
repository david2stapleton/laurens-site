# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — dev server with live reload at localhost:8080
- `npm run build` — production build into `_site/`

## Architecture

Single-page Eleventy (v3) site with tabbed navigation (About, Contact). Uses Decap CMS (git-gateway backend) so the site owner can edit content through a web admin panel.

**Data flow:** Markdown files in `src/_content/` (hero.md, about.md, contact.md) are parsed by `src/_data/site.js` using gray-matter. This exposes front matter + body as `site.hero`, `site.about`, `site.contact` in templates. Content files are NOT rendered as pages — they're data sources only (excluded via `.eleventy.js` ignores).

**Template structure:** `src/index.njk` is the single page, wrapped by `src/_includes/base.njk` (layout with nav, footer, fonts, meta). Markdown body content is rendered via a custom `markdown` Nunjucks filter defined in `.eleventy.js`.

**Static assets:** `styles.css`, `script.js`, `admin/`, and `images/` are passthrough-copied to `_site/`.

**CMS:** `src/admin/config.yml` defines editable fields. CMS edits commit `.md` files to GitHub, triggering Netlify rebuild.

## Adding a New Section

1. Create `src/_content/newsection.md` with front matter
2. Add the section name to the `pages` array in `src/_data/site.js`
3. Add the HTML section in `src/index.njk`
4. Add a nav link in `src/_includes/base.njk`
5. Add CMS fields in `src/admin/config.yml`
