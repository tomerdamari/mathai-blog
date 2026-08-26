---
title: "Getting a Straight Answer Out of Maple"
description: "The complaints about computer algebra systems are mostly about six behaviours. Each has a cause, and knowing the cause turns an argument with the software into a two-line fix."
category: Practice
author: Dana Reisman
date: 2026-08-24
readingTime: "10 min read"
---

People who give up on computer algebra systems usually give up for the same handful of reasons. The system refuses to simplify something obvious. It returns an answer in a form nobody wants. It hands back a result three pages long. It says nothing at all and sits there.

None of these are bugs. Each is the system behaving correctly under a constraint you have not seen. The examples below use Maple's syntax, and the causes apply to Mathematica, SymPy, Maxima and Sage with the names changed.

## It will not simplify the square root

You ask for the square root of x squared and get back the square root of x squared.

```
> simplify(sqrt(x^2));
                              csgn(x) x
```

The answer is not x, because x might be negative. It is not the absolute value of x either, because x might be complex, and Maple defaults to assuming a symbol could be any complex number. What comes back is x multiplied by a sign function that resolves once the system knows where x lives.

Tell it:

```
> simplify(sqrt(x^2)) assuming x::real, x >= 0;
                                  x
```

This is the single most common source of frustration with any symbolic system, and the fix is always the same. State the domain. A symbol with no declared properties is a complex number, and most of the identities you learned are real-valued identities.

The habit worth building is to declare properties at the point where you introduce a variable rather than at the point where a simplification fails. It costs one line and it prevents a category of confusion rather than resolving instances of it.

## It gives an answer, in the wrong shape

Symbolic results have many equivalent forms, and the system has no way of knowing which one you want. A partial fraction decomposition and a single rational expression are the same function. A product of factors and an expanded polynomial are the same polynomial.

Maple's approach is a set of transformation commands, each moving toward a specific normal form: `expand`, `factor`, `normal`, `combine`, `collect`, `convert`, `rationalize`, and `simplify` as a general-purpose heuristic.

`simplify` is the one to reach for last, not first. It applies a large collection of rules and tries to reduce some internal measure of complexity, and its notion of simpler does not always match yours. When you know the form you want, name it. `collect(expr, x)` gathers powers of x. `convert(expr, parfrac, x)` gives partial fractions. These are deterministic and they do what they say.

A useful diagnostic when two expressions ought to be equal and do not look it: subtract them and call `simplify`, or better, `normal` on the difference. Zero settles it. Comparing two complicated forms by eye settles nothing.

## The answer is three pages long

Expression swell is intrinsic to exact computation and it is not a sign that anything went wrong.

The mechanism is easy to see with a determinant. A symbolic matrix of modest size produces a determinant with a number of terms that grows factorially, and the intermediate expressions produced along the way can be much larger than the final result even when the final result is small. Gröbner basis computation is doubly exponential in the worst case and reaches that worst case on inputs that look unremarkable.

Three responses, in order of how often they help.

Substitute numbers earlier. If half your parameters are known constants in the end, putting them in before the expensive step rather than after can change the computation from impossible to instant.

Ask for less. `RootOf` is Maple's representation for a root of a polynomial that has no useful radical form, and leaving an answer in that representation is often better than forcing it into radicals, which for a quartic produces something nobody can read and nothing can use.

Work modulo something. Many structural questions about polynomials can be settled over a finite field far faster than over the rationals, and the answer transfers.

## It returns the integral unevaluated

This is Maple telling you something specific and true, and it is worth appreciating rather than resenting.

For elementary functions, the Risch algorithm decides whether an antiderivative exists in elementary terms. When Maple returns an integral unevaluated, the usual meaning is that no elementary antiderivative exists, or that the integrand falls outside the class the implemented algorithm decides completely.

The integral of e to the minus x squared has no elementary antiderivative. That is a theorem, not a limitation of the software. What you want in that case is the error function, and Maple will give you that if you ask for the definite integral or convert the result.

For definite integrals, an unevaluated result more often means the system could not establish convergence, which is a conditions problem again. Supplying assumptions on the parameters frequently unlocks it.

The general principle: a symbolic system that returns your input unchanged has told you it could not do the thing, which is more information than a confident wrong answer. Treat the unevaluated result as a message rather than a failure.

## It disagrees with the numerical answer

When a symbolic result and a numerical check disagree, three causes cover almost every case.

Branch cuts. Complex-valued functions like logarithm and fractional powers have discontinuities, and an identity that holds on one branch fails across it. Evaluating at a point on the wrong side of a cut produces a genuine disagreement between two correct expressions.

Assumptions you supplied that are false at the test point. If you told the system a parameter is positive and then evaluate at a negative value, the simplified form is not valid there.

Floating point in the numerical check. Maple's `evalf` takes a precision argument for a reason. If a computation is ill-conditioned, the default fifteen digits can be inadequate, and raising `Digits` to fifty and seeing the disagreement shrink identifies the cause immediately.

Test at several random points, not one, and prefer points well away from zero, one, and any singularity. Agreement at twenty random points to twenty digits is not a proof, and it is enough to act on.

## It is slow

The first question is whether you are computing symbolically when you need numbers.

Symbolic computation is expensive because it is exact. If the end product is a plot or a table of values, `evalf` early and use the numerical routines. Maple's `evalhf` evaluates in hardware floating point and is dramatically faster than software arbitrary precision when the extra precision is not needed.

The second question is whether you are recomputing. Maple procedures can carry a remember table, caching results by argument, and turning it on for a recursive function changes exponential work into linear work. This is memoisation with one option rather than a rewrite.

## Where a language model fits

The pattern that works is narrow and it is the same one that applies to every symbolic tool.

Use the model to produce the Maple, not the answer. Describing a problem in English and asking for the commands that express it plays to what a language model is genuinely good at, which is translating between informal statement and formal syntax. Then run the commands. What comes back is computed by an algorithm, not predicted.

Use the model to interpret a result you already trust. A page of output containing `RootOf` and hypergeometric functions is correct and unreadable, and asking for an explanation of what the expression represents is low-risk, because the expression is already known correct.

Do not use the model as the source of the answer and the tool as a rubber stamp. The failure mode there is that a wrong answer arrives with a plausible verification attached, and the whole value of the algorithm is that it does not care what anyone expected.

The division holds throughout. One half of the workflow guesses well and fails silently. The other half never guesses and says so when it cannot proceed. Keeping track of which half produced a given line is most of the skill.
