# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — dev server with live reload at localhost:8080
- `npm run build` — production build into `_site/`

## Architecture

Multi-page Eleventy (v3) site with a CMS-powered page builder. Uses Decap CMS (GitHub OAuth backend) so the site owner can add, remove, reorder content blocks, and create new pages through a web admin panel.

**Data flow:** Each page lives as a `.md` file in `src/pages/` with front matter containing `title`, `layout`, `permalink`, and a `blocks` array. Eleventy renders each file as its own page. Design config in `src/_content/design.md` is parsed by `src/_data/site.js` using gray-matter, exposed as `site.design` and `site.fonts`.

**Block types:** text (heading + markdown + optional image), photo (single image + caption + size), photo_grid (multiple images in 2/3/4 columns), links (list of labeled buttons), contact (intro + email + form).

**Navigation:** Defined in `src/_content/design.md` as a `nav` list (label + slug). Rendered in `base.njk` with active-page highlighting and a mobile hamburger menu.

**Design tokens:** `src/_content/design.md` holds CMS-editable design config: colors (`accent_color`, `background_color`, `text_color`), font pairing, spacing (`section_padding`, `content_gap`, `container_width`), site identity (`site_name`, `site_tagline`), hero background settings, social links, and navigation. These are injected as CSS custom properties via an inline `<style>` block in `base.njk`.

**Template structure:** `src/_includes/page.njk` is the layout for all pages — it extends `base.njk` and loops over the page's `blocks` array, including the matching partial from `src/_includes/blocks/`. `base.njk` provides the shell (navbar with nav links, footer, fonts, meta). Markdown body content is rendered via a custom `markdown` Nunjucks filter defined in `.eleventy.js`.

**Static assets:** `styles.css`, `script.js`, `admin/`, and `images/` are passthrough-copied to `_site/`.

**CMS:** `src/admin/config.yml` defines a `pages` folder collection (`src/pages/`, `create: true`) for dynamic page creation with block types, and a `settings` files collection for design config including navigation.

## Adding a New Block Type

1. Add its type definition (fields) to the `types` list in `src/admin/config.yml` under the `pages` collection's `blocks` field
2. Create a partial template `src/_includes/blocks/yourtype.njk`
3. Add an `{% elif block.type == "yourtype" %}` branch in `src/_includes/page.njk`
4. Add any needed CSS to `src/styles.css`

## Adding a New Page

Create a new `.md` file in `src/pages/` (or use the CMS admin panel) with:
```yaml
---
title: Page Title
layout: page.njk
permalink: /your-slug/
blocks:
  - type: text
    heading: ...
    body: ...
---
```
Then add a nav entry in `src/_content/design.md` under `nav:`.
