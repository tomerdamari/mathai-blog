---
title: "Machines That Generate Conjectures"
description: "Finding a proof is one problem. Deciding what to try to prove is a different one, and it is where automated mathematics has been quietly interesting for thirty years."
category: Systems
author: Miriam Adler
date: 2026-07-01
readingTime: "9 min read"
---

Most discussion of AI in mathematics concerns proof: given a statement, find an argument. That framing skips the part working mathematicians spend most of their time on, which is deciding what statement to consider in the first place.

A conjecture is a bet. It has to be plausible enough to be worth effort, hard enough to be worth stating, and connected to something that matters. Producing true statements is easy; a computer can produce them forever. Producing true statements that anyone should care about is the whole difficulty.

Several systems have tried, with results that are genuinely mixed in an instructive way.

## Graffiti

Siemion Fajtlowicz began writing Graffiti in the 1980s. It looks at graph invariants, quantities like the independence number, the chromatic number, the average distance between vertices, and proposes inequalities between them. It tests each candidate against a database of graphs and discards anything with a counterexample.

Then it applies filters designed to discard uninteresting survivors. If a proposed inequality follows immediately from one already proposed, drop it. If it is weaker than something already on the list, drop it. Fajtlowicz called these the Dalmatian heuristic and spent considerable effort on them, because without them the output is unusable.

Graffiti's conjectures produced published papers. Several dozen, by mathematicians including Fan Chung, Ronald Graham and Paul Erdős. A number were proven, a number refuted, and the refutations were often as interesting as the proofs because they exhibited graphs nobody had thought to construct.

The lesson from Graffiti is that the generation step was never the hard part. Fajtlowicz's real contribution was the filtering, which encoded a great deal of human taste about what makes a graph inequality worth stating.

## The Ramanujan Machine

A group at the Technion launched the Ramanujan Machine in 2019, aimed at a specific target: continued fraction expressions for mathematical constants.

Ramanujan produced formulas like continued fractions converging to expressions involving pi and e, often without proof, and often with no indication of how he found them. The project asked whether a search could find comparable formulas.

The method is numerical. Generate candidate continued fractions with polynomial coefficient patterns. Evaluate them to high precision. Compare against a table of constants and their simple algebraic combinations. When a match appears to many digits, you have a conjecture.

It found several previously unknown formulas, including expressions for the Catalan constant and for combinations involving pi and e. Some were subsequently proven, a few by the group and a few by outside mathematicians who read the output.

The honest assessment is that these are attractive identities rather than important ones. They do not unlock anything. But the project made a clean methodological point: high-precision numerical search over a structured space finds relationships that nobody would find by hand, and integer relation algorithms like PSLQ make the matching step reliable.

That technique predates the project. David Bailey, Peter Borwein and Simon Plouffe used it in 1995 to find the BBP formula for pi, which allows computing the nth hexadecimal digit without computing the preceding ones. That formula was found by numerical search and proven afterward, and it changed what people believed was possible about digit extraction.

## Deep learning as a microscope

A different approach appeared in a 2021 *Nature* paper from DeepMind working with Geordie Williamson and with András Juhász and Marc Lackenby.

Here the model does not propose the conjecture. It is used to detect whether a relationship exists at all.

The procedure: take two collections of mathematical objects you suspect are connected. Train a network to predict one from the other. If the network cannot learn the mapping, that is weak evidence against a relationship. If it can, use attribution methods to identify which input features carry the signal. Then a human looks at those features and tries to formulate a precise statement.

Applied to knot theory, this produced a relationship between hyperbolic and algebraic invariants of knots, specifically involving the signature and geometric quantities, which Lackenby and Juhász then proved. Applied to representation theory, it produced progress on the combinatorial invariance conjecture for Kazhdan-Lusztig polynomials, with Williamson identifying structure in the network's attention that suggested a new construction.

The framing that stuck was that the network functions as a microscope. It does not do the mathematics. It points at where the mathematics is.

This seems more durable than conjecture generation as such, because it keeps the human in the role humans are still best at, deciding what is meaningful, while using the machine for the part humans are bad at, detecting weak signal in high-dimensional data.

## The pattern-matching problem

There is a persistent failure mode across all of these systems, and it is worth naming.

An automated conjecture generator will produce enormous numbers of true statements that are true for uninteresting reasons. Coincidences of small numbers. Consequences of a definition that nobody bothered to state. Special cases of known results, dressed differently enough that the system does not recognise them.

Filtering these out requires knowing the field, which means the system is only as good as the taste encoded in its filters, which means someone had to encode taste. Graffiti's success came from Fajtlowicz spending years on that encoding. Systems that skipped it produced output nobody read.

Large language models change this somewhat, because they have absorbed a great deal of implicit taste from mathematical writing. Ask a model whether a given identity is interesting and it will give an answer that correlates with what a mathematician would say, not because it has judgement but because it has read a lot of mathematicians expressing theirs.

Whether that constitutes taste or a good imitation of taste is not a question anyone can currently answer, and for practical purposes it may not matter.

## What would count as a breakthrough

Not a system that produces conjectures. Several exist and they work.

A system that produces a conjecture which reframes a field. The kind of statement that makes people realise they were asking the wrong question. The Langlands programme, Weil's conjectures, the Taniyama-Shimura conjecture that turned out to imply Fermat.

Those conjectures were not found by noticing a pattern in data. They were found by someone seeing that two apparently unrelated areas had the same shape. No current system has produced anything in that category, and it is not obvious what training signal would produce one, because the whole point is that the connection was not visible in the existing corpus.

That is the frontier, and the honest position is that nobody knows whether it is reachable from here. In the meantime the microscope framing is doing real work, and there is a growing list of theorems whose discovery involved a neural network pointing at something a person had not looked at.
