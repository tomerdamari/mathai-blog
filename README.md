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

Three plain `node` scripts, no framework.

```bash
node solver.test.mjs   # expression parser, quadratic, factorisation, Euclid
node search.test.mjs   # ranking, snippets, and the generated index if _site/ exists
node contact.test.mjs  # form validation, and the built page if _site/ exists
```

`search.test.mjs` asserts against `_site/search-index.json` when it is present, so run
`npm run build` first to get the full check.

## Before deploying

`src/_data/site.json` holds the site origin, currently the GitHub Pages URL. Change it
with no trailing slash if the site moves, and set `PATH_PREFIX` in the workflow to match
(`/` for a bare domain). Four things read the origin:

| File | Uses it for |
| --- | --- |
| `src/_includes/base.njk` | `<link rel="canonical">` |
| `src/feed.xml` | Atom entry ids and self link |
| `src/sitemap.xml` | `<loc>` values, which must be absolute |
| `src/robots.njk` | the `Sitemap:` line |

The contact form posts to FormSubmit, which requires a one-time activation: the first
submission triggers a confirmation email to tommycoupe@gmail.com, and nothing is
forwarded until that link is clicked. FormSubmit can also issue a random alias so the
address is not sitting in the page source; swap it into the form action once activated.

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
