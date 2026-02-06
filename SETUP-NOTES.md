# Lauren's Site — Setup Notes

## Current State
- Site converted from plain HTML to Eleventy (static site generator)
- Decap CMS admin panel added (currently in demo/test mode)
- Tabbed navigation implemented (About, Teaching, Photos, Contact)
- Everything builds and runs locally with `npm start`

## Project Structure
```
src/
  _content/          <- content Lauren will edit via CMS
    hero.md
    about.md
    teaching.md
    contact.md
    photos/          <- individual photo entries
  _includes/
    base.njk         <- HTML layout (nav, footer, head)
  _data/
    site.js          <- reads content files for templates
  index.njk          <- assembles all sections into one page
  styles.css
  script.js
  admin/
    index.html       <- CMS entry point
    config.yml       <- CMS field definitions
_site/               <- auto-generated build output (don't edit)
.eleventy.js         <- Eleventy config
package.json
```

## Commands
- `npm start` — dev server with live reload at localhost:8080
- `npm run build` — builds site into `_site/`

## What Still Needs to Happen (Netlify + CMS Wiring)

### 1. Push to GitHub
- Create a new GitHub repo
- `git init && git add . && git commit -m "initial commit" && git push`

### 2. Connect to Netlify
- Log into netlify.com
- "Add new site" > "Import an existing project" > select the GitHub repo
- Build command: `npm run build`
- Publish directory: `_site`

### 3. Enable Netlify Identity (handles Lauren's login)
- Netlify dashboard > Site settings > Identity > Enable Identity
- Invite Lauren's email as a user
- Under Identity > Services > Git Gateway > Enable Git Gateway

### 4. Update CMS config (one line change)
- In `src/admin/config.yml`, change:
  ```
  backend:
    name: test-repo
  ```
  to:
  ```
  backend:
    name: git-gateway
  ```

### 5. Done
- Lauren goes to `yoursite.netlify.app/admin/`
- Logs in with her email
- Edits content, hits Publish
- Site auto-rebuilds and goes live

## How It All Connects
```
Lauren edits in admin panel
  -> CMS commits changes to GitHub (.md files)
    -> Netlify detects the commit
      -> Netlify runs "npm run build" (Eleventy)
        -> Updated site goes live
```

## Cleanup
Old root-level files can be deleted once satisfied:
- `index.html` (replaced by src/index.njk + src/_includes/base.njk)
- `styles.css` (moved to src/styles.css)
- `script.js` (moved to src/script.js)
- `admin/` (moved to src/admin/)
