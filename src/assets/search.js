// Client-side search over a build-time JSON index. No server, no library.

const SNIPPET = 180;

export function tokens(query) {
  return String(query).toLowerCase().split(/[^a-z0-9]+/i).filter((t) => t.length > 1);
}

// Title matches outweigh description matches outweigh body matches.
export function score(doc, terms) {
  const title = doc.title.toLowerCase();
  const desc = doc.description.toLowerCase();
  const body = doc.text.toLowerCase();
  let total = 0;
  for (const t of terms) {
    let hit = 0;
    if (title.includes(t)) hit += 12;
    if (desc.includes(t)) hit += 5;
    const inBody = body.split(t).length - 1;
    if (inBody) hit += Math.min(6, 1 + Math.log2(inBody));
    if (!hit) return 0; // every term must appear somewhere
    total += hit;
  }
  return total;
}

export function snippet(text, terms) {
  const lower = text.toLowerCase();
  let at = -1;
  for (const t of terms) {
    const i = lower.indexOf(t);
    if (i !== -1 && (at === -1 || i < at)) at = i;
  }
  if (at === -1) return text.slice(0, SNIPPET) + (text.length > SNIPPET ? '...' : '');
  const start = Math.max(0, at - SNIPPET / 3);
  const end = Math.min(text.length, start + SNIPPET);
  return (start > 0 ? '...' : '') + text.slice(start, end).trim() + (end < text.length ? '...' : '');
}

export function search(index, query) {
  const terms = tokens(query);
  if (!terms.length) return [];
  return index
    .map((doc) => ({ doc, score: score(doc, terms) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title))
    .map((r) => ({ ...r.doc, snippet: snippet(r.doc.text, terms) }));
}

// ---------------------------------------------------------------- browser UI

function mark(container, text, terms) {
  const lower = text.toLowerCase();
  let i = 0;
  while (i < text.length) {
    let next = -1;
    let len = 0;
    for (const t of terms) {
      const j = lower.indexOf(t, i);
      if (j !== -1 && (next === -1 || j < next)) { next = j; len = t.length; }
    }
    if (next === -1) { container.append(text.slice(i)); break; }
    container.append(text.slice(i, next));
    const m = document.createElement('mark');
    m.textContent = text.slice(next, next + len);
    container.append(m);
    i = next + len;
  }
}

function mountSearch() {
  const root = document.getElementById('search');
  if (!root) return;

  const input = root.querySelector('#q');
  const list = root.querySelector('#results');
  const status = root.querySelector('#search-status');
  let index = null;

  const params = new URLSearchParams(location.search);
  if (params.get('q')) input.value = params.get('q');

  function run() {
    const query = input.value.trim();
    list.innerHTML = '';
    if (!index) { status.textContent = 'Loading the index...'; return; }
    if (!query) { status.textContent = `Ready. ${index.length} pages indexed.`; return; }

    const hits = search(index, query);
    status.textContent = hits.length
      ? `${hits.length} ${hits.length === 1 ? 'result' : 'results'} for "${query}".`
      : `Nothing matched "${query}". Every word has to appear somewhere on the page.`;

    const terms = tokens(query);
    for (const hit of hits) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = hit.url;

      const num = document.createElement('span');
      num.className = 'num';
      num.textContent = hit.category;

      const mid = document.createElement('span');
      const h = document.createElement('h3');
      mark(h, hit.title, terms);
      const p = document.createElement('p');
      mark(p, hit.snippet, terms);
      mid.append(h, p);

      const meta = document.createElement('span');
      meta.className = 'meta';
      meta.textContent = hit.date;

      a.append(num, mid, meta);
      li.append(a);
      list.append(li);
    }
  }

  input.addEventListener('input', run);

  // Relative, so the page works from a site root or from a /<repo>/ subpath.
  fetch(new URL('../search-index.json', document.baseURI))
    .then((r) => r.json())
    .then((data) => { index = data; run(); })
    .catch(() => { status.textContent = 'The search index failed to load. Browse the archive instead.'; });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountSearch);
  else mountSearch();
}
