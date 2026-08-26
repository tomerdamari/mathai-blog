// node contact.test.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validate } from './src/assets/contact.js';

const ok = { name: 'Ada', email: 'ada@example.com', message: 'x'.repeat(25) };

const EMAIL = /[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,}/i;
assert.match('someone@example.com', EMAIL, 'the address detector must actually detect one');
assert.doesNotMatch('no address here at all', EMAIL);

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
  // the address must survive only in the form action, never in readable text
  const visible = html.replace(/<[^>]*>/g, ' ');
  assert.doesNotMatch(visible, EMAIL, 'an email address is shown on the contact page');
  assert.doesNotMatch(html, /mailto:/, 'a mailto link is still present');
  console.log('built contact page checked');
}

// no page may still claim there is no contact form
for (const page of ['privacy', 'about', 'search', 'accessibility', 'terms']) {
  const p = `_site/${page}/index.html`;
  if (!fs.existsSync(p)) continue;
  const html = fs.readFileSync(p, 'utf8');
  assert.doesNotMatch(html, /no contact form/i, `${page} still says there is no contact form`);
}

// and nowhere else on the site either
for (const p of ['privacy', 'about', 'search', 'accessibility', 'terms', 'articles']) {
  const file = `_site/${p}/index.html`;
  if (!fs.existsSync(file)) continue;
  const visible = fs.readFileSync(file, 'utf8').replace(/<[^>]*>/g, ' ');
  assert.doesNotMatch(visible, EMAIL, `${p} shows an email address`);
}

// the script must not name an address in any user-facing string
const js = fs.readFileSync('src/assets/contact.js', 'utf8');
assert.doesNotMatch(js, EMAIL, 'contact.js still names an address');

console.log('all contact checks passed');
