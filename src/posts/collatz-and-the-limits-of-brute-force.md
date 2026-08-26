---
title: "The Collatz Conjecture and the Limits of Brute Force"
description: "We have checked every starting number below 2 to the 68. That is not a proof, it is not close to a proof, and the reason why is the most useful lesson in computational mathematics."
category: Open Problems
author: Miriam Adler
date: 2026-07-21
readingTime: "9 min read"
---

Take any positive integer. If it is even, halve it. If it is odd, triple it and add one. Repeat. The conjecture is that you always reach 1.

Start at 27 and the sequence climbs to 9,232 before descending, taking 111 steps. Start at 97 and it takes 118. Start at anything anyone has ever tried and it reaches 1.

Paul Erdős said mathematics is not yet ready for such problems, and offered 500 dollars for a solution. Jeffrey Lagarias, who has written the standard surveys, has advised people not to work on it. The problem is genuinely, unusually hard, and it is hard in a way that illustrates something important about what computation can and cannot settle.

## What has been verified

Distributed computing projects have verified the conjecture for every starting value up to roughly 2 to the power of 68, which is about 295 quintillion. The verification uses clever optimisations: you only need to check that a number's trajectory drops below its starting value, since everything smaller has already been confirmed, and large classes of residues can be eliminated by modular arguments before any iteration happens.

That is an extraordinary amount of checking. It also establishes nothing about the conjecture.

The reason is simple and worth stating plainly. There are infinitely many positive integers. Any finite verification, no matter how large, covers a proportion of them equal to zero. The set of unchecked cases after verifying 2 to the 68 values is exactly as infinite as the set was before anyone started.

## When brute force does work

This is not an argument that computation is useless in number theory. It is an argument about the logical structure of a claim.

Computation settles a universal claim when the search space is finite, or can be reduced to a finite one. The four colour theorem was settled by computation because the discharging argument reduced infinitely many planar graphs to 1,936 configurations. That reduction is the mathematics; the computation is bookkeeping.

Computation also settles an existential claim, by producing an example. Euler conjectured that no fourth power is the sum of three fourth powers. Noam Elkies found a counterexample in 1988, and Roger Frye then found the smallest one by direct search. One example, and a 200-year-old conjecture is dead.

The Pólya conjecture, that most numbers below any bound have an odd number of prime factors, held for every value anyone checked for decades and fails first at 906,150,257. The Mertens conjecture was disproven in 1985 without anyone producing an explicit counterexample; the smallest one is believed to be beyond 10 to the power of 30 and possibly far beyond.

Those cases are the reason "verified up to a large bound" carries so little weight. Counterexamples to plausible conjectures are known to hide at scales no search will reach.

## What we do know about Collatz

The problem is not untouched. There are real partial results, and they show what progress looks like when a full proof is out of reach.

Terence Tao proved in 2019 that almost all Collatz orbits reach a value smaller than any prescribed function that goes to infinity, however slowly. Informally, almost every starting number eventually gets small. The technique routes through a probabilistic model of the iteration and a transfer to the actual deterministic sequence.

This is genuinely close, and the gap is instructive. "Almost all" here means with logarithmic density one, which permits an exceptional set. A single starting value with a divergent orbit, or a single cycle other than the trivial one, would falsify the conjecture while being invisible to a density argument.

Other constraints are known. Any non-trivial cycle must have length in the hundreds of millions at minimum, from bounds derived through continued fraction approximations to the logarithm of 3 over the logarithm of 2. The count of starting values below a bound that reach 1 grows at least as fast as a specific power of that bound.

## Why it resists

The generalised problem is undecidable. John Conway showed in 1972 that a natural generalisation, where the multiplier and offset vary by residue class modulo some fixed number, produces a system that can simulate arbitrary computation. There is no algorithm that decides, for an arbitrary such system, whether all orbits reach 1.

Collatz itself is one specific instance, so undecidability of the general family does not imply that Collatz is undecidable. But it explains the difficulty. The iteration mixes two structures that do not interact cleanly: division by two is transparent in base two, multiplication by three plus one is transparent in base three, and there is no representation in which both are simple. The sequence behaves like a pseudorandom process while being entirely deterministic, and there is no known handle on it.

## What AI has and has not done here

Several groups have applied machine learning to Collatz-adjacent questions, mostly in the mode of searching for structure rather than searching for proofs. Neural networks have been trained to predict stopping times from binary representations, with moderate success, which is unsurprising since the first several steps are determined by the low-order bits.

More interestingly, automated conjecture-generation systems have produced candidate lemmas about the iteration, some of which turned out to be provable and none of which turned out to be useful. That distinction matters. A system that produces true statements is not the same as a system that produces progress. Mathematics is full of true statements nobody needs.

The formalisation angle has been more productive. Parts of the known partial results have been formalised in Lean, which does not advance the problem but does make the existing literature checkable. There is an active project to formalise Tao's almost-all result.

## The lesson to carry

When you see a claim that something has been verified computationally, ask what logical form the claim has.

If it is existential, a computation can settle it outright and one example is a proof.

If it is universal over a finite domain, a computation can settle it, and the interesting work was the argument that reduced the domain to something finite.

If it is universal over an infinite domain, a computation can only refute it, never confirm it. Verification up to any bound is evidence about where to look, not evidence about whether the statement is true. It is entirely reasonable to find such evidence persuasive, since a conjecture that survives 2 to the 68 tests is more likely true than one that does not. It is not reasonable to call it settled.

Erdős was probably right that we are not ready. The useful part is understanding precisely which readiness is missing, and it is not compute.
