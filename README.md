# Proof & Machine

A static blog about artificial intelligence and mathematics. Twenty essays on theorem
provers, olympiad solvers, computer-assisted proofs and the puzzles that still break both,
plus a client-side step solver and client-side search.

Built with [Eleventy](https://www.11ty.dev/). Output is plain HTML and one stylesheet.
No client-side framework, no third-party scripts, no analytics, no cookies, no web fonts.

## Running it

```bash
npm install
npm start      # dev server on http://localhost:8080
npm run build  # writes _site/
```

## Tests

Two plain `node` scripts, no framework.

```bash
node solver.test.mjs   # expression parser, quadratic, factorisation, Euclid
node search.test.mjs   # ranking, snippets, and the generated index if _site/ exists
```

`search.test.mjs` asserts against `_site/search-index.json` when it is present, so run
`npm run build` first to get the full check.

## Before deploying

`src/_data/site.json` has an empty `url`. Set it to the site's origin, with no trailing
slash, e.g. `https://example.com`. Four things read it:

| File | Uses it for |
| --- | --- |
| `src/_includes/base.njk` | `<link rel="canonical">` |
| `src/feed.xml` | Atom entry ids and self link |
| `src/sitemap.xml` | `<loc>` values, which must be absolute |
| `src/robots.njk` | the `Sitemap:` line |

Until it is set, canonicals and feed ids are relative. That is harmless locally and wrong
in production, so set it before the first deploy.

The contact addresses in `src/contact.njk` are placeholders using the `.example` TLD.
Replace them with real ones or remove the page.

## Layout

```
src/
  posts/            20 articles, one Markdown file each
  _includes/        base.njk (chrome), post.njk (article layout)
  _data/site.json   name, url, description
  assets/
    style.css       whole design, monochrome, light and dark
    solver.js       the step solver, exports pure functions for testing
    search.js       client-side search, exports pure functions for testing
  index.njk         home
  articles.njk      archive listing
  tool.njk          step solver page
  search.njk        search page
  about|contact|terms|privacy|accessibility.njk
  feed.njk sitemap.njk robots.njk search-index.njk
```

Articles carry `title`, `description`, `category`, `author`, `date` and `readingTime` in
front matter. Layout and permalink come from `src/posts/posts.json`, so a new article is
just a new Markdown file.

## Design notes

Monochrome by design: near-black on white, three greys, no accent colour. The palette
inverts under `prefers-color-scheme: dark`. Layout uses CSS logical properties throughout.
Animation is minimal and disabled under `prefers-reduced-motion`.

Every page works without JavaScript except the solver, which is a calculator, and search,
which filters in the browser. The known gaps are documented on `/accessibility/` rather
than hidden.

## Licence

Article text: quote freely with attribution. Ask before republishing in full.
Code in `src/assets/`: reuse freely, no warranty.
