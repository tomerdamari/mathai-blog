// node solver.test.mjs
import assert from 'node:assert/strict';
import { evaluate, solveQuadratic, factorise, gcdSteps } from './src/assets/solver.js';

const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} != ${b}`);

// precedence and associativity
assert.equal(evaluate('2+3*4').value, 14);
assert.equal(evaluate('(2+3)*4').value, 20);
assert.equal(evaluate('2^3^2').value, 512); // right associative
assert.equal(evaluate('-3^2').value, -9);   // unary minus binds looser than ^
assert.equal(evaluate('10-4-3').value, 3);  // left associative
near(evaluate('sqrt(16)+ln(e)').value, 5);
near(evaluate('2*pi').value, Math.PI * 2);

// errors are thrown, not silently wrong
assert.throws(() => evaluate('1/0'), /Division by zero/);
assert.throws(() => evaluate('(1+2'), /Unbalanced/);
assert.throws(() => evaluate('2+'), /Missing operand/);
assert.throws(() => evaluate('foo(2)'), /Unknown name/);

// quadratic: all three discriminant branches
assert.deepEqual(solveQuadratic(1, -3, 2).roots, [2, 1]);
assert.deepEqual(solveQuadratic(1, 2, 1).roots, [-1]);
assert.deepEqual(solveQuadratic(1, 0, 1).roots, []);
assert.match(solveQuadratic(0, 2, -4).display, /x = 2/);

// factorisation
assert.equal(factorise(360).display, '360 = 2^3 x 3^2 x 5');
assert.equal(factorise(360).divisorCount, 24);
assert.equal(factorise(97).isPrime, true);
assert.equal(factorise(9999991).isPrime, true);
assert.throws(() => factorise(1), /2 or more/);

// euclid
assert.equal(gcdSteps(1071, 462).gcd, 21);
assert.equal(gcdSteps(1071, 462).lcm, 23562);
assert.equal(gcdSteps(17, 5).gcd, 1);

console.log('all solver checks passed');
