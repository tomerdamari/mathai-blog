// Progressive enhancement for the contact form. Without this file the form
// still submits normally; this only keeps the reader on the page.

const ENDPOINT_AJAX = 'https://formsubmit.co/ajax/';

export function validate(fields) {
  const errors = {};
  if (!fields.name || !fields.name.trim()) errors.name = 'Tell us what to call you.';
  if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
    errors.email = 'That does not look like an email address we could reply to.';
  if (!fields.message || fields.message.trim().length < 20)
    errors.message = 'Say a little more, at least twenty characters, so we can act on it.';
  if (fields.message && fields.message.length > 8000)
    errors.message = 'That is over the 8,000 character limit. Send the short version and attach the rest by email.';
  if (fields._honey) errors._honey = 'spam';
  return errors;
}

function mountContact() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const button = form.querySelector('button[type="submit"]');
  const target = form.getAttribute('action').split('/').pop();

  function say(text, isError) {
    status.textContent = text;
    status.classList.toggle('error', Boolean(isError));
    status.classList.remove('hidden');
  }

  form.addEventListener('submit', async (event) => {
    const data = Object.fromEntries(new FormData(form).entries());
    const errors = validate(data);

    if (errors._honey) { event.preventDefault(); return; }

    const first = Object.keys(errors)[0];
    if (first) {
      event.preventDefault();
      say(errors[first], true);
      const field = form.elements[first];
      if (field) field.focus();
      return;
    }

    event.preventDefault();
    button.disabled = true;
    say('Sending...', false);

    try {
      const response = await fetch(ENDPOINT_AJAX + target, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const body = await response.json().catch(() => ({}));

      if (response.ok && String(body.success) === 'true') {
        form.reset();
        say('Sent. You will get a reply at the address you gave, usually within five working days.', false);
      } else {
        say('That did not go through. Nothing was sent, so your message is still in the form. Try again in a minute.', true);
      }
    } catch {
      say('The message could not be sent, most likely a network problem. Your text is still here, so try again once you are back online.', true);
    } finally {
      button.disabled = false;
    }
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountContact);
  else mountContact();
}
