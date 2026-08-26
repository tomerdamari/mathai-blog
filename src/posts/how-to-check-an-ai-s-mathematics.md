---
title: "How to Check an AI's Mathematics Without Being a Mathematician"
description: "A practical procedure for deciding whether a plausible-looking derivation is correct, built around the observation that verifying is much easier than deriving."
category: Practice
author: Dana Reisman
date: 2026-07-17
readingTime: "9 min read"
---

The central asymmetry in mathematics is that checking an answer is usually far easier than finding it. Factoring a large number is hard; multiplying the factors back is trivial. Finding an integral is hard; differentiating the result is mechanical. Constructing a proof is hard; following one is manageable.

That asymmetry is what makes AI-generated mathematics usable despite being unreliable. You do not need to be able to produce the derivation. You need a procedure for testing it. Here is one.

## Step one: check the units and the type

Before looking at any arithmetic, check that the answer is the right kind of object.

If the question asked for a probability and the answer is 1.4, stop. If it asked for a length and the answer carries units of area, stop. If it asked for an integer count and the answer is 6.5, stop. If it asked for a function and the answer is a number, stop.

This sounds too simple to be worth a step. In practice it catches a meaningful fraction of errors, because type violations are exactly the kind of mistake a system optimising for plausible-looking text makes. The output is shaped like a solution. Whether it is the right shape is a separate question that nothing in the generation process enforced.

Dimensional analysis is the physics version of the same idea and it is more powerful than it gets credit for. Any physical formula must be dimensionally consistent, and checking consistency requires no understanding of the derivation at all.

## Step two: test the boundaries

Take the answer and evaluate it at the extreme cases where you know what should happen.

If the answer is a formula in n, what does it give for n equal to 0, 1, or 2? You can usually work out those cases by hand, sometimes by direct enumeration. If a combinatorics formula gives 3 when the answer for n equal to 1 is obviously 1, the formula is wrong regardless of how elegant it looks.

If the answer is a formula involving a parameter, what happens as the parameter goes to zero or infinity? Does the behaviour match what the problem demands? A probability that goes to 2 as some parameter grows is a wrong probability.

If the answer involves a limit or an approximation, check the case where the approximation should be exact.

This step is close to free and it is the single most productive check available. Most incorrect closed-form expressions fail at n equal to 1.

## Step three: substitute back

For anything that is the solution to an equation, put it in the equation.

Solved for x? Substitute and check both sides agree. Found an integral? Differentiate it. Found an eigenvector? Multiply by the matrix. Found a root of a polynomial? Evaluate the polynomial there.

This is complete verification, not a heuristic. If the substitution works, the answer is correct for that equation, full stop. There is no need to look at the derivation at all.

The failure mode to watch is a model that presents the substitution check itself and reports that it worked when it did not. Do the substitution yourself, or better, have a tool do it.

## Step four: use a second system, not a second prompt

Asking the same model whether its answer is correct is nearly worthless. It will usually agree with itself, and when it disagrees the disagreement carries almost no information.

Asking a different system is better but not much better, since models trained on overlapping data share failure modes.

Asking a fundamentally different kind of system is what actually works. Put the expression into a computer algebra system. Write six lines of Python and check numerically. Run the combinatorial enumeration for small cases. These tools have no opinion about what looks plausible; they compute.

A worked example. Suppose a model tells you the sum of the first n cubes equals the square of the sum of the first n integers. That is true, but you should not take it on trust. Three lines of Python settles it for the first thousand values in under a second, and while that is not a proof, it converts an unverified claim into a claim you would bet on.

## Step five: check the reasoning only if the answer survives

This ordering is deliberate. Reading a derivation is slow and it is where you are most likely to be persuaded by fluency. Do it last, after the cheap checks have already had a chance to fail.

When you do read, look for specific things rather than reading for overall coherence.

Watch for a step where a general claim is applied to a case that does not satisfy its conditions. This is the most common substantive error: invoking a theorem correctly stated but wrongly applicable, dividing by something that could be zero, taking a square root and silently discarding the negative branch, swapping the order of two limits.

Watch for a step that asserts something without justification and where the assertion is doing real work. Phrases like "it is clear that", "one can show", and "by symmetry" are sometimes correct shorthand and sometimes a gap. Ask specifically about them.

Watch for an answer that changes between the working and the summary. Models produce a derivation and then a concluding line, and these occasionally do not match.

## The three sentences that matter

When you have a specific step you doubt, the useful prompts are narrow and adversarial.

"Justify the step from line four to line five in full detail, citing the specific theorem used and verifying its hypotheses hold here." This forces the model onto the specific claim rather than letting it restate the argument.

"Give a counterexample to the following claim, or prove no counterexample exists." Asking for a counterexample is a different search than asking for a proof and often surfaces the flaw.

"Verify this numerically with code and show the output." Any interface with code execution turns this into an actual check rather than another generated assertion.

## Where this procedure fails

It fails on existence proofs that produce no object. If the claim is that some structure exists, and the proof is non-constructive, there is nothing to substitute back.

It fails on asymptotic claims. A statement about behaviour as n goes to infinity cannot be tested at n equal to 5, and the small cases can actively mislead. The Pólya conjecture holds for every value below nine hundred million.

It fails on anything requiring the full strength of the argument, which is most of research mathematics. At that level there is no substitute for reading, and the reading requires expertise.

For the vast majority of practical mathematics, homework, engineering calculations, statistical reasoning, financial modelling, the procedure is adequate. The answer either survives boundary checks and substitution or it does not, and the derivation matters much less than people assume.

## The habit worth building

Treat every generated derivation as a conjecture with an attached argument, in that order. The conjecture is the part you test. The argument is context that helps you test it and occasionally teaches you something.

This is not a special posture for machines. It is what careful people already do with any result they did not derive themselves, including results from colleagues and from textbooks. The only thing that changed is the volume.
