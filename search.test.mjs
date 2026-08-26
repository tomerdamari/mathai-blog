// node search.test.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { tokens, score, snippet, search } from './src/assets/search.js';

const docs = [
  { url: '/a/', title: 'Inside a Proof Assistant', description: 'What Lean checks', category: 'Formal', date: '2026-08-10', text: 'The kernel is small. Lean checks the term. Lean again. Lean again.' },
  { url: '/b/', title: 'Ten Riddles', description: 'Puzzles and machines', category: 'Puzzles', date: '2026-08-06', text: 'Monty Hall and the bat and ball. A proof is not required here.' },
  { url: '/c/', title: 'Collatz', description: 'Brute force limits', category: 'Open', date: '2026-07-21', text: 'Halve it, triple it, add one.' },
];

assert.deepEqual(tokens('Proof, Assistant!'), ['proof', 'assistant']);
assert.deepEqual(tokens('a I x'), [], 'single characters are dropped');

// title match must outrank a body-only match
const hits = search(docs, 'proof');
assert.equal(hits.length, 2);
assert.equal(hits[0].url, '/a/');

// every term must appear somewhere
assert.equal(search(docs, 'proof collatz').length, 0);
assert.equal(search(docs, 'lean kernel').length, 1);

// repeated body hits raise the score but stay capped
const many = score(docs[0], ['lean']);
const once = score(docs[1], ['proof']);
assert.ok(many > 0 && once > 0);
assert.ok(score(docs[0], ['lean']) <= 12 + 6 + 5);

// empty query returns nothing rather than everything
assert.deepEqual(search(docs, '   '), []);

// snippet centres on the match and marks truncation
const long = 'x'.repeat(400) + ' needle ' + 'y'.repeat(400);
const s = snippet(long, ['needle']);
assert.ok(s.includes('needle'));
assert.ok(s.startsWith('...') && s.endsWith('...'));
assert.ok(s.length < 220);
assert.equal(snippet('short text', ['missing']), 'short text');

// the generated index, if the site has been built
if (fs.existsSync('_site/search-index.json')) {
  const index = JSON.parse(fs.readFileSync('_site/search-index.json', 'utf8'));
  assert.ok(index.length > 20, 'index should cover every page');
  assert.ok(index.every((d) => d.url && d.title && typeof d.text === 'string'));
  assert.ok(!index.some((d) => /<[a-z]/i.test(d.text)), 'html tags leaked into the index');
  assert.ok(!index.some((d) => /&[a-z]+;|&#\d+;/i.test(d.text)), 'entities leaked into the index');
  assert.ok(search(index, 'collatz').length > 0, 'known term should be findable');
  console.log(`index checked: ${index.length} pages`);
}

console.log('all search checks passed');
