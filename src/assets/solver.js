// Step solver: a small exact-ish maths engine that shows its working.
// Pure functions below are exported so they can be tested outside the browser.

const FUNCS = {
  sqrt: Math.sqrt, abs: Math.abs, ln: Math.log, log: Math.log10,
  sin: Math.sin, cos: Math.cos, tan: Math.tan,
  asin: Math.asin, acos: Math.acos, atan: Math.atan,
  exp: Math.exp, floor: Math.floor, ceil: Math.ceil, round: Math.round,
};

const CONSTS = { pi: Math.PI, e: Math.E, tau: Math.PI * 2 };

const OPS = {
  '+': { prec: 1, assoc: 'l', fn: (a, b) => a + b },
  '-': { prec: 1, assoc: 'l', fn: (a, b) => a - b },
  '*': { prec: 2, assoc: 'l', fn: (a, b) => a * b },
  '/': { prec: 2, assoc: 'l', fn: (a, b) => a / b },
  '%': { prec: 2, assoc: 'l', fn: (a, b) => a % b },
  '^': { prec: 4, assoc: 'r', fn: (a, b) => Math.pow(a, b) },
  'u-': { prec: 3, assoc: 'r', unary: true, fn: (a) => -a },
};

export function tokenize(input) {
  const src = String(input).replace(/\s+/g, '');
  const out = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (/[0-9.]/.test(ch)) {
      let j = i;
      while (j < src.length && /[0-9.]/.test(src[j])) j++;
      const text = src.slice(i, j);
      if ((text.match(/\./g) || []).length > 1) throw new Error('Malformed number: ' + text);
      out.push({ type: 'num', value: Number(text) });
      i = j;
      continue;
    }
    if (/[a-z]/i.test(ch)) {
      let j = i;
      while (j < src.length && /[a-z0-9]/i.test(src[j])) j++;
      const name = src.slice(i, j).toLowerCase();
      if (name in CONSTS) out.push({ type: 'num', value: CONSTS[name], label: name });
      else if (name in FUNCS) out.push({ type: 'func', name });
      else throw new Error('Unknown name: ' + name);
      i = j;
      continue;
    }
    if (ch === '(' || ch === ')') { out.push({ type: ch }); i++; continue; }
    if (ch === ',') { out.push({ type: 'sep' }); i++; continue; }
    if (ch in OPS) {
      const prev = out[out.length - 1];
      const unary = ch === '-' && (!prev || prev.type === 'op' || prev.type === '(' || prev.type === 'sep');
      out.push({ type: 'op', op: unary ? 'u-' : ch });
      i++;
      continue;
    }
    throw new Error('Unexpected character: ' + ch);
  }
  return out;
}

// Shunting-yard: infix tokens to reverse Polish notation.
export function toRpn(tokens) {
  const output = [];
  const stack = [];
  for (const t of tokens) {
    if (t.type === 'num') output.push(t);
    else if (t.type === 'func') stack.push(t);
    else if (t.type === 'op') {
      const o1 = OPS[t.op];
      while (stack.length) {
        const top = stack[stack.length - 1];
        if (top.type === 'func') { output.push(stack.pop()); continue; }
        if (top.type !== 'op') break;
        const o2 = OPS[top.op];
        const shouldPop = o1.assoc === 'l' ? o2.prec >= o1.prec : o2.prec > o1.prec;
        if (!shouldPop) break;
        output.push(stack.pop());
      }
      stack.push(t);
    } else if (t.type === '(') stack.push(t);
    else if (t.type === ')') {
      let found = false;
      while (stack.length) {
        const top = stack.pop();
        if (top.type === '(') { found = true; break; }
        output.push(top);
      }
      if (!found) throw new Error('Unbalanced parentheses');
      if (stack.length && stack[stack.length - 1].type === 'func') output.push(stack.pop());
    }
  }
  while (stack.length) {
    const top = stack.pop();
    if (top.type === '(') throw new Error('Unbalanced parentheses');
    output.push(top);
  }
  return output;
}

const fmt = (n) => {
  if (!Number.isFinite(n)) return String(n);
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return String(n);
  const rounded = Number(n.toPrecision(12));
  return String(rounded);
};

export function evaluate(input) {
  const rpn = toRpn(tokenize(input));
  const stack = [];
  const steps = [];
  for (const t of rpn) {
    if (t.type === 'num') { stack.push(t.value); continue; }
    if (t.type === 'func') {
      if (!stack.length) throw new Error('Missing argument for ' + t.name);
      const a = stack.pop();
      const v = FUNCS[t.name](a);
      steps.push(`${t.name}(${fmt(a)}) = ${fmt(v)}`);
      stack.push(v);
      continue;
    }
    const o = OPS[t.op];
    if (o.unary) {
      if (!stack.length) throw new Error('Missing operand');
      const a = stack.pop();
      const v = o.fn(a);
      steps.push(`negate ${fmt(a)} = ${fmt(v)}`);
      stack.push(v);
      continue;
    }
    if (stack.length < 2) throw new Error('Missing operand for ' + t.op);
    const b = stack.pop();
    const a = stack.pop();
    if (t.op === '/' && b === 0) throw new Error('Division by zero');
    const v = o.fn(a, b);
    steps.push(`${fmt(a)} ${t.op} ${fmt(b)} = ${fmt(v)}`);
    stack.push(v);
  }
  if (stack.length !== 1) throw new Error('Malformed expression');
  return { value: stack[0], display: fmt(stack[0]), steps };
}

export function solveQuadratic(a, b, c) {
  if (a === 0) {
    if (b === 0) throw new Error('Not an equation: a and b are both zero');
    const x = -c / b;
    return {
      display: `x = ${fmt(x)}`,
      steps: [
        'a = 0, so this is linear, not quadratic',
        `${fmt(b)}x + ${fmt(c)} = 0`,
        `x = -(${fmt(c)}) / ${fmt(b)} = ${fmt(x)}`,
      ],
    };
  }
  const d = b * b - 4 * a * c;
  const steps = [
    `discriminant = b^2 - 4ac`,
    `= (${fmt(b)})^2 - 4(${fmt(a)})(${fmt(c)})`,
    `= ${fmt(b * b)} - ${fmt(4 * a * c)} = ${fmt(d)}`,
  ];
  const vertex = -b / (2 * a);
  if (d > 0) {
    const r = Math.sqrt(d);
    const x1 = (-b + r) / (2 * a);
    const x2 = (-b - r) / (2 * a);
    steps.push('discriminant is positive: two distinct real roots');
    steps.push(`sqrt(${fmt(d)}) = ${fmt(r)}`);
    steps.push(`x = (${fmt(-b)} +/- ${fmt(r)}) / ${fmt(2 * a)}`);
    steps.push(`vertex at x = ${fmt(vertex)}`);
    return { display: `x = ${fmt(x1)}  or  x = ${fmt(x2)}`, steps, roots: [x1, x2] };
  }
  if (d === 0) {
    steps.push('discriminant is zero: one repeated real root');
    steps.push(`x = ${fmt(-b)} / ${fmt(2 * a)}`);
    return { display: `x = ${fmt(vertex)} (double root)`, steps, roots: [vertex] };
  }
  const im = Math.sqrt(-d) / (2 * a);
  steps.push('discriminant is negative: two complex conjugate roots');
  steps.push(`sqrt(${fmt(d)}) = ${fmt(Math.sqrt(-d))}i`);
  steps.push(`real part = ${fmt(vertex)}, imaginary part = +/- ${fmt(Math.abs(im))}`);
  return {
    display: `x = ${fmt(vertex)} + ${fmt(Math.abs(im))}i  or  x = ${fmt(vertex)} - ${fmt(Math.abs(im))}i`,
    steps,
    roots: [],
  };
}

export function factorise(n) {
  if (!Number.isInteger(n) || n < 2) throw new Error('Enter a whole number of 2 or more');
  if (n > 1e15) throw new Error('Number too large for exact trial division');
  const steps = [];
  const factors = [];
  let m = n;
  let d = 2;
  while (d * d <= m) {
    while (m % d === 0) {
      factors.push(d);
      steps.push(`${m} / ${d} = ${m / d}`);
      m = m / d;
    }
    d += d === 2 ? 1 : 2;
  }
  if (m > 1) {
    factors.push(m);
    if (factors.length > 1) steps.push(`${m} has no factor below its square root, so it is prime`);
  }
  const grouped = [];
  for (const f of factors) {
    const last = grouped[grouped.length - 1];
    if (last && last.p === f) last.k++;
    else grouped.push({ p: f, k: 1 });
  }
  const display = grouped.map((g) => (g.k === 1 ? String(g.p) : `${g.p}^${g.k}`)).join(' x ');
  const divisorCount = grouped.reduce((acc, g) => acc * (g.k + 1), 1);
  if (factors.length === 1) steps.unshift(`${n} is prime`);
  steps.push(`number of divisors = ${grouped.map((g) => g.k + 1).join(' x ')} = ${divisorCount}`);
  return { display: `${n} = ${display}`, steps, factors, isPrime: factors.length === 1, divisorCount };
}

export function gcdSteps(a, b) {
  a = Math.abs(Math.trunc(a));
  b = Math.abs(Math.trunc(b));
  if (a === 0 && b === 0) throw new Error('gcd(0, 0) is undefined');
  const steps = [];
  let [x, y] = a >= b ? [a, b] : [b, a];
  const original = [x, y];
  while (y !== 0) {
    const q = Math.floor(x / y);
    const r = x % y;
    steps.push(`${x} = ${q} x ${y} + ${r}`);
    [x, y] = [y, r];
  }
  const g = x;
  const lcm = original[1] === 0 ? 0 : (original[0] / g) * original[1];
  steps.push(`last non-zero remainder is ${g}`);
  if (lcm) steps.push(`lcm = (${original[0]} / ${g}) x ${original[1]} = ${lcm}`);
  return { display: `gcd = ${g}${lcm ? `,  lcm = ${lcm}` : ''}`, steps, gcd: g, lcm };
}

// ---------------------------------------------------------------- browser UI

function mountUi() {
  const root = document.getElementById('solver');
  if (!root) return;

  const tabs = root.querySelectorAll('.tabs button');
  const panels = root.querySelectorAll('[data-panel]');
  const resultBox = root.querySelector('#result');
  const stepsBox = root.querySelector('#steps');
  const stepsWrap = root.querySelector('#steps-wrap');

  function show(name) {
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === name)));
    panels.forEach((p) => p.classList.toggle('hidden', p.dataset.panel !== name));
    render({ display: 'Ready.', steps: [] });
  }

  function render(res) {
    resultBox.textContent = res.display;
    resultBox.classList.toggle('error', Boolean(res.isError));
    stepsBox.innerHTML = '';
    res.steps.forEach((s, i) => {
      const li = document.createElement('li');
      const n = document.createElement('span');
      n.textContent = String(i + 1);
      const body = document.createElement('span');
      body.textContent = s;
      li.append(n, body);
      stepsBox.append(li);
    });
    stepsWrap.classList.toggle('hidden', res.steps.length === 0);
  }

  function guard(fn) {
    try { render(fn()); }
    catch (err) { render({ display: err.message, steps: [], isError: true }); }
  }

  tabs.forEach((t) => t.addEventListener('click', () => show(t.dataset.tab)));

  const exprInput = root.querySelector('#expr');
  root.querySelector('#expr-go').addEventListener('click', () => guard(() => evaluate(exprInput.value)));
  exprInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') guard(() => evaluate(exprInput.value)); });
  root.querySelectorAll('#expr-examples button').forEach((b) => {
    b.addEventListener('click', () => { exprInput.value = b.textContent; guard(() => evaluate(exprInput.value)); });
  });

  root.querySelector('#quad-go').addEventListener('click', () => guard(() => solveQuadratic(
    Number(root.querySelector('#qa').value),
    Number(root.querySelector('#qb').value),
    Number(root.querySelector('#qc').value)
  )));

  root.querySelector('#fact-go').addEventListener('click', () =>
    guard(() => factorise(Number(root.querySelector('#fact-n').value))));

  root.querySelector('#gcd-go').addEventListener('click', () => guard(() => gcdSteps(
    Number(root.querySelector('#gcd-a').value),
    Number(root.querySelector('#gcd-b').value)
  )));

  show('expr');
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountUi);
  else mountUi();
}
