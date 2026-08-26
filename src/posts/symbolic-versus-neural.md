---
title: "Symbolic or Neural: Choosing the Right Machine for the Job"
description: "Computer algebra systems and language models fail in opposite directions. Knowing which failure you are exposed to is most of the skill in using either."
category: Practice
author: Dana Reisman
date: 2026-07-05
readingTime: "9 min read"
---

There are two kinds of mathematical software and they are almost perfect opposites.

A computer algebra system executes an algorithm. Ask Mathematica or SymPy or Maxima to factor a polynomial and it runs a factorisation algorithm whose correctness was proven before it was implemented. The answer is right. If the system cannot solve your problem, it says so, or it runs until you stop it.

A language model produces the most likely continuation of your text. Ask it to factor a polynomial and it produces something shaped like a factorisation. Usually correct for small cases. Sometimes confidently wrong. Never explicitly unable.

Both are useful. They are useful for different things, and the most common expensive mistake is using one where the other belongs.

## What symbolic systems are actually good at

Exact manipulation of well-specified expressions. Integration, differentiation, series expansion, polynomial arithmetic, linear algebra over exact fields, solving systems of equations, simplification, number theory, combinatorial enumeration.

These are areas with decision procedures. The Risch algorithm decides elementary integrability. Gröbner bases decide membership in a polynomial ideal. Cylindrical algebraic decomposition handles quantifier elimination over the reals. Each of these is a theorem-backed procedure that terminates with a correct answer or a correct declaration that no answer of the requested form exists.

The value is not just correctness. It is that failure is visible. If SymPy cannot integrate your function, it returns an unevaluated integral. You know you did not get an answer. That property is worth a great deal and it is exactly what the alternative lacks.

## Where symbolic systems fall down

The input has to be formal. Every symbol declared, every assumption stated, every domain specified. If you forget to tell the system that x is positive, it will refuse to simplify the square root of x squared to x, correctly, and you will spend twenty minutes wondering why.

Expression swell is the other chronic problem. Intermediate results in symbolic computation grow explosively even when the final answer is small. A determinant of a modest symbolic matrix can produce intermediate terms that exhaust memory. Gröbner basis computation is doubly exponential in the worst case and reaches that worst case on ordinary-looking inputs.

And they cannot read. A problem stated in English is not input. Translating a paragraph into a system of equations is exactly the step a computer algebra system does not perform.

## What language models are actually good at

Translation between informal and formal. That is the core competence and everything else follows from it.

Given a paragraph describing a physical situation, produce the equations. Given a table of data, propose which statistical test applies. Given a vague sense of what you want, produce the Mathematica syntax that expresses it. Given an error message, explain what the system was objecting to.

They are also good at recall across an enormous surface. Which theorem covers this case, what is this identity called, where did this technique come from, what is a standard approach to this genre of problem. This is retrieval with fuzzy matching, and it beats searching for the name of something you do not know the name of.

And they are good at explanation. Taking a correct derivation and rendering it at a chosen level of detail is genuinely useful and low-risk, because the derivation is already known correct.

## Where language models fall down

Long exact computation, for architectural reasons covered elsewhere. Consistency across a long derivation, where an error in step three propagates silently. Anything requiring the system to know it does not know.

That last one is the expensive failure. A computer algebra system that cannot do something returns an unevaluated expression. A language model that cannot do something returns a wrong answer in the same tone as a right one. The output distribution does not contain an "I cannot" for most mathematical questions, because the training text did not contain many people saying so.

## The pairing that works

Use the model to reach a formal statement. Use the symbolic system to evaluate it. Use the model again to interpret the result.

In practice this means asking for code rather than answers. Instead of asking for the eigenvalues of a matrix, ask for the three lines of SymPy that compute them, then run those lines. You have then used the model for the part where it is strong, translation, and the algorithm for the part where it is strong, computation.

This is not a workaround. It is the correct division of labour, and it is what every serious tool-using deployment does. When an assistant with code execution answers a numerical question, it is running this pattern internally.

## A decision table

| Task | Use |
| --- | --- |
| Exact integral, derivative, series | Computer algebra system |
| Arithmetic on numbers longer than a few digits | Calculator or interpreter |
| Turning a word problem into equations | Language model, then verify the equations |
| Solving those equations | Computer algebra system |
| Finding the name of a theorem you half-remember | Language model |
| Checking whether a claimed identity is true | Numerical evaluation at random points |
| Explaining a known-correct proof at a different level | Language model |
| Producing a proof you will rely on | Proof assistant, with either system suggesting steps |
| Enumerating small cases of a combinatorial structure | Write the loop, run it |
| Deciding whether an approach is worth trying | Language model, as a cheap prior |

The row that gets ignored most often is the third. People ask for the answer rather than the setup, and the setup is where the model adds value and where a human can still check the work.

## Numerical verification deserves its own note

For any claimed identity between expressions, evaluate both sides at several random points. If they disagree at one point, the identity is false and you are done. If they agree at twenty random points to fifteen decimal places, the identity is not proven, but the probability of coincidence is negligible for anything you would encounter in practice.

This takes about four lines of code and catches most errors from either kind of system. It is underused relative to how cheap it is.

Two cautions. Choose points away from singularities and branch cuts, since complex-valued functions with branch cuts will legitimately disagree in regions where the identity holds only on a principal branch. And use enough precision that floating point error does not masquerade as disagreement.

## The general shape

Every reliable mathematical workflow built on modern tooling has the same structure. Something creative and unreliable proposes. Something mechanical and reliable disposes.

AlphaGeometry does it with a language model and a deduction engine. Proof search in Lean does it with a neural tactic suggester and a type checker. A working engineer does it with a chatbot and a Jupyter notebook.

The pattern is identical at every scale, and the mistake is always the same: letting the proposing component's output through without passing it to the disposing component.
