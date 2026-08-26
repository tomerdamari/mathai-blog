---
title: "The Four Colour Theorem and the First Proof Nobody Could Read"
description: "In 1976 a computer checked 1,936 cases and settled a problem open for 124 years. Mathematicians have been arguing about what that means ever since."
category: History
author: Miriam Adler
date: 2026-07-29
readingTime: "9 min read"
---

In October 1852, a student named Francis Guthrie was colouring a map of the counties of England and noticed he never needed more than four colours to keep adjacent counties distinct. He mentioned it to his brother, who mentioned it to Augustus De Morgan, who wrote to William Rowan Hamilton about it the same day. Hamilton was unimpressed and did not reply for a fortnight.

The question sat open for 124 years. It has a claim to being the first major theorem whose proof a human cannot check.

## What the statement actually says

Any map drawn in the plane, divided into contiguous regions, can be coloured with four colours so that no two regions sharing a border segment get the same colour. Regions touching at a single point do not count as adjacent. Regions must be connected, which rules out awkward cases like a country with an overseas territory.

Translated to graph theory: every planar graph has chromatic number at most four. Place a vertex in each region, connect vertices whose regions share a border, and the resulting graph can be drawn in the plane without crossings. The claim is that four colours suffice for any such graph.

Three colours are not enough, as any map with four mutually adjacent regions shows. Five colours were proven sufficient by Percy Heawood in 1890, with an argument short enough to fit in an undergraduate lecture. The gap between five and four took another 86 years.

## Kempe's wrong proof, and why it mattered

In 1879 Alfred Kempe published a proof. It was accepted, celebrated, and got him elected to the Royal Society. In 1890 Heawood found the error.

Kempe's method is still the foundation of everything that came after, which is why the failure was productive rather than merely embarrassing. His idea was reducibility. Suppose a counterexample exists. Take the smallest one, by number of regions. Every planar graph contains a vertex of degree five or less, a consequence of Euler's formula. So the minimal counterexample contains such a vertex. Remove it, colour the smaller map by minimality, then put the vertex back and try to find a colour for it.

For a vertex of degree three or four, this works directly. Degree five is where it gets difficult, and Kempe's argument for that case involved chains of alternating colours that could be swapped to free up a colour. Heawood produced a configuration where the chain-swapping argument breaks: two swaps interfere with each other.

The framework survived. What was needed was a much larger collection of configurations, each proven reducible, such that every planar graph must contain at least one of them. Such a collection is called an unavoidable set.

## Appel and Haken

Kenneth Appel and Wolfgang Haken at the University of Illinois spent years, building on work by Heinrich Heesch, developing a discharging procedure that would generate an unavoidable set, and a computational test for reducibility. In June 1976 they announced a proof.

The unavoidable set had 1,936 configurations. Each had to be checked for reducibility by computer. The computation took roughly 1,200 hours on an IBM 370. The paper ran to 741 pages including microfiche supplements.

The University of Illinois mathematics department started stamping its outgoing mail with "FOUR COLORS SUFFICE".

The reception was mixed in a way that had nothing to do with whether people believed the result. It was about whether the object produced was a proof. A proof, in the traditional understanding, is an argument that a competent reader can follow and be convinced by. No human has ever verified 1,936 reducibility checks by hand, and no human ever will.

The philosopher Thomas Tymoczko argued in 1979 that the proof introduced empirical elements into mathematics: to accept it you have to accept that a particular machine ran a particular program correctly, which is a claim about the physical world rather than about logic. Others countered that a 741-page hand proof would also be beyond any single reader's ability to verify with confidence, and that the machine is more reliable than the reader.

## The errors were real

The critics had a concrete point, not just a philosophical one. The original proof contained errors. Appel and Haken published corrections. Further errors were found in 1986 and addressed. In 1989 they published a book-length version with a full corrected discussion.

In 1996, Neil Robertson, Daniel Sanders, Paul Seymour and Robin Thomas produced a new proof with a smaller unavoidable set of 633 configurations and a cleaner discharging argument. They wrote that they had been unable to verify the Appel-Haken proof themselves, which was part of their motivation. Their version was still computer-dependent, but the computation was far more tractable and the human-readable part far shorter.

## Gonthier closes it

In 2005, Georges Gonthier at Microsoft Research Cambridge completed a fully formal proof in the Coq proof assistant, in collaboration with Benjamin Werner. Every step, including the case checks, was verified by Coq's kernel.

This changed the epistemic situation substantially. The question is no longer whether a program that nobody has audited computed correctly. It is whether Coq's kernel, a small and heavily scrutinised piece of code, is correct, and whether the formal statement in Coq says what the English statement says. Both are checkable by a person in a reasonable amount of time.

Gonthier's work is also where the modern connection to AI-assisted mathematics starts. The techniques he developed for managing a formalisation of that size, particularly the small-scale reflection approach that became the SSReflect library, fed directly into Mathlib and the current generation of formalisation projects.

## What this predicted

The four colour theorem was the first case of a pattern that is now common. A result is established by a computation too large for human inspection. The mathematical community accepts it provisionally, argues about its status, and eventually a formal verification settles the question of correctness while leaving the question of understanding open.

The Kepler conjecture followed the same arc. Thomas Hales proved it in 1998 using extensive computation. The referees at the *Annals of Mathematics* spent four years and reported they were 99 percent certain but could not fully verify the computational parts. Hales then spent over a decade leading the Flyspeck project to formalise it, completing in 2014.

The Boolean Pythagorean triples problem produced a 200-terabyte SAT solver proof in 2016, which was subsequently checked by a verified checker.

In every case the argument recurs: we now know it is true, and we still do not know why. Nobody can look at the four colour theorem's proof and extract an idea about planarity that explains the number four. The proof establishes the fact without illuminating it.

That is the real complaint, and it has never been answered. It is also the exact complaint people are now making about proofs produced by machine learning systems, which suggests the argument has another few decades to run.
