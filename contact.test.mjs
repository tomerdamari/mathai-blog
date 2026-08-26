// node contact.test.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validate } from './src/assets/contact.js';

const ok = { name: 'Ada', email: 'ada@example.com', message: 'x'.repeat(25) };

assert.deepEqual(validate(ok), {}, 'a complete message should pass');

assert.ok(validate({ ...ok, name: '   ' }).name, 'blank name rejected');
assert.ok(validate({ ...ok, email: 'ada@' }).email, 'malformed address rejected');
assert.ok(validate({ ...ok, email: 'ada at example.com' }).email, 'address without @ rejected');
assert.ok(validate({ ...ok, message: 'too short' }).message, 'short message rejected');
assert.ok(validate({ ...ok, message: 'x'.repeat(8001) }).message, 'over-long message rejected');
assert.equal(validate({ ...ok, _honey: 'bot' })._honey, 'spam', 'honeypot trips');

// missing fields entirely, not just empty ones
assert.ok(validate({}).name);
assert.ok(validate({ name: 'Ada' }).email);

// the built page must carry the delivery address and the anti-spam field
if (fs.existsSync('_site/contact/index.html')) {
  const html = fs.readFileSync('_site/contact/index.html', 'utf8');
  assert.match(html, /action="https:\/\/formsubmit\.co\/tommycoupe@gmail\.com"/, 'form posts to the inbox');
  assert.match(html, /method="POST"/i, 'works without JavaScript');
  assert.match(html, /name="_honey"/, 'honeypot present');
  assert.match(html, /<label for="message">/, 'message field is labelled');
  assert.match(html, /id="form-status"[^>]*role="status"/, 'status region is announced');
  console.log('built contact page checked');
}

// no page may still claim there is no contact form
for (const page of ['privacy', 'about', 'search', 'accessibility', 'terms']) {
  const p = `_site/${page}/index.html`;
  if (!fs.existsSync(p)) continue;
  const html = fs.readFileSync(p, 'utf8');
  assert.doesNotMatch(html, /no contact form/i, `${page} still says there is no contact form`);
}

console.log('all contact checks passed');
