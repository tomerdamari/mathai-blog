---
title: "Mathlib: The Library That Is Slowly Eating Mathematics"
description: "A single formal library now contains most of an undergraduate degree and a growing share of graduate mathematics, built by volunteers, and it is becoming the substrate everything else runs on."
category: Formal Methods
author: Dana Reisman
date: 2026-06-07
readingTime: "9 min read"
---

If you want to formalise a theorem, the hard part is rarely the theorem. It is everything underneath it.

To state that a continuous function on a compact set attains its maximum, you need continuity, compactness, topological spaces, order relations on the reals, the construction of the reals, and enough set theory to hold it together. If none of that exists in your system, you build it first, and you are six months in before you write the statement you cared about.

Mathlib exists so that nobody has to do that again.

## What it is

Mathlib is the mathematical library for the Lean theorem prover. It began around 2017 and now contains well over a million lines of code and something in the range of two hundred thousand theorems, contributed by several hundred people.

The coverage is unusual for a formal library. Undergraduate mathematics is essentially complete: real and complex analysis, linear algebra, group theory, ring theory, field theory, Galois theory, point-set topology, measure theory, basic number theory. Graduate material is extensive and growing: category theory, algebraic geometry through schemes, functional analysis, Lie theory, homological algebra, analytic number theory.

The Lean community maintains a list tracking which theorems from a standard undergraduate curriculum are formalised, and it has been essentially fully ticked off for several years. The current frontier is research-level material.

## Why one library rather than many

Earlier formalisation efforts fragmented. Different groups built their own developments of the same foundations, incompatible with each other, and results in one could not be used in another. Isabelle's Archive of Formal Proofs is a collection of independent entries. Coq's ecosystem has multiple competing libraries for the same structures.

Mathlib made the opposite bet: one library, one set of definitions, everything interoperating. If you prove something about topological groups, it composes with everything anyone else has proven about groups and about topological spaces, because there is only one definition of each.

The cost is coordination. A change to a foundational definition can break thousands of downstream proofs. Mathlib runs continuous integration over the whole library, and a proposed change that breaks anything must fix everything it broke. Large refactors take months and involve many people.

The benefit is compounding. Each contribution makes the next one cheaper. The de Bruijn factor for a new result in a well-covered area is now close to one: formalising takes about as much text as writing the informal proof.

## The typeclass machinery

The technical device that makes the unification work is typeclasses, borrowed from functional programming and used far more aggressively than in any programming language.

A structure like "commutative ring" is a typeclass. When you prove a theorem about commutative rings, it applies automatically to the integers, to polynomial rings, to any structure that has been registered as one. The system searches for instances during elaboration.

This produces deep hierarchies. A normed field is a field and a normed space and a metric space and a topological space and a uniform space, with the relationships declared once and inherited everywhere. Getting these hierarchies right is a genuine design problem, and Mathlib has been through several painful reorganisations of its algebraic and topological hierarchies.

When it works, the result is that a lemma proven at the right level of generality is immediately available in every specific case. When it does not, you get instance resolution failures that are among the least pleasant error messages in software.

## The projects built on top

Mathlib's value shows in what it enables.

The Liquid Tensor Experiment, formalising a theorem of Peter Scholze that he had asked the community to check, was completed in about eighteen months. That would have been impossible without the analysis and category theory already present.

The sphere eversion project formalised a version of Gromov's h-principle, a substantial piece of differential topology.

The polynomial Freiman-Ruzsa conjecture, proven by Tim Gowers, Ben Green, Freddie Manners and Terence Tao in November 2023, was formalised in Lean within three weeks of the paper appearing. Tao organised the effort and wrote about the experience, noting that the formalisation process surfaced places where the informal argument was imprecise.

The Fermat's Last Theorem project, led by Kevin Buzzard and funded by EPSRC, began in 2024 with the goal of formalising the Wiles-Taylor proof. It is expected to take many years and to require formalising large amounts of algebraic number theory and the theory of modular forms along the way. That infrastructure is arguably the real deliverable.

## The machine learning connection

Mathlib is also the training corpus.

Every proof search system for Lean trains on it. The library provides hundreds of thousands of examples of goals paired with the tactics that closed them, which is exactly the supervised signal a tactic-suggestion model needs. Tools like LeanCopilot and various premise selection systems are trained on it directly.

More significantly, Lean plus Mathlib is a reinforcement learning environment. A model can propose a proof, the kernel checks it, and the check is a perfect reward signal. There is no reward hacking available: either the term type-checks or it does not. AlphaProof was trained this way, with a large volume of self-generated problems formalised into Lean statements.

This creates an unusual dynamic. The library was built by humans for humans, and it is now the substrate for training systems that will contribute back to it. Some Mathlib contributions are already machine-assisted, with a model proposing a proof that a human reviews and submits.

The community has had to think about what that means for review standards. A proof that type-checks is correct. It may still be badly named, poorly placed in the hierarchy, stated at the wrong generality, or unmaintainable. Mathlib's review process cares about all of those, and a machine-generated proof gets no exemption.

## What it does not solve

The statement problem. Mathlib guarantees that a proof of a formal statement is correct. It cannot guarantee that the formal statement means what you intended.

This is where the remaining human judgement lives, and it is not a small residue. A subtly wrong formalisation is provable and useless. Reviewing a formal statement against its informal counterpart requires understanding both, and there is no automation for it.

Buzzard has made this point repeatedly in the context of the Fermat project: the difficulty is not proving things, it is stating them correctly, and stating them correctly requires knowing the mathematics.

## The trajectory

Mathlib grows at a rate that has been roughly steady for years. Extrapolation is unreliable, but the direction is clear enough. More of mathematics becomes formally available, which makes formalising the next thing cheaper, which increases the rate.

At some point, plausibly within a decade, the question changes from whether a result can be formalised to why it was not. Journals have begun accepting formalisation as supplementary material. A few have discussed requiring it for results whose proofs are computationally intensive.

That would be the largest change to mathematical practice since the introduction of the referee, and it will have arrived through a volunteer project that started with someone deciding to formalise the natural numbers properly.
