# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — dev server with live reload at localhost:8080
- `npm run build` — production build into `_site/`

## Architecture

Single-page scrolling Eleventy (v3) site with a CMS-powered page builder. Uses Decap CMS (GitHub OAuth backend) so the site owner can add, remove, and reorder content blocks through a web admin panel.

**Data flow:** `src/_content/design.md` and `src/_content/sections.md` are parsed by `src/_data/site.js` using gray-matter. Design config is exposed as `site.design` and `site.fonts`. The sections file contains a `blocks` array exposed as `site.sections` — each block has a `type` field (text, photo, photo_grid, links, contact) and type-specific fields. Content files are NOT rendered as pages — they're data sources only (excluded via `.eleventy.js` ignores).

**Block types:** text (heading + markdown + optional image), photo (single image + caption + size), photo_grid (multiple images in 2/3/4 columns), links (list of labeled buttons), contact (intro + email + form).

**Design tokens:** `src/_content/design.md` holds CMS-editable design config: colors (`accent_color`, `background_color`, `text_color`), font pairing, spacing (`section_padding`, `content_gap`, `container_width`), site identity (`site_name`, `site_tagline`), hero background settings, and social links. These are injected as CSS custom properties via an inline `<style>` block in `base.njk`.

**Template structure:** `src/index.njk` loops over `site.sections` and includes the matching partial from `src/_includes/blocks/` (text.njk, photo.njk, photo_grid.njk, links.njk, contact.njk). Wrapped by `src/_includes/base.njk` (layout with logo navbar, footer, fonts, meta). Markdown body content is rendered via a custom `markdown` Nunjucks filter defined in `.eleventy.js`.

**Static assets:** `styles.css`, `script.js`, `admin/`, and `images/` are passthrough-copied to `_site/`.

**CMS:** `src/admin/config.yml` defines a `sections` file entry using a `list` widget with `types` for the page builder. The CMS provides add-block dropdown and drag-to-reorder UI. CMS edits commit `.md` files to GitHub, triggering Netlify rebuild.

## Adding a New Block Type

1. Add its type definition (fields) to the `types` list in `src/admin/config.yml` under the `sections` file's `blocks` field
2. Create a partial template `src/_includes/blocks/yourtype.njk`
3. Add an `{% elif block.type == "yourtype" %}` branch in `src/index.njk`
4. Add any needed CSS to `src/styles.css`
