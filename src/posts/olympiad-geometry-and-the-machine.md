---
title: "Olympiad Geometry and the Machine That Draws the Extra Line"
description: "AlphaGeometry solves competition problems at medallist level with a design that says something specific about where intuition sits in mathematical work."
category: Systems
author: Dana Reisman
date: 2026-08-02
readingTime: "9 min read"
---

Olympiad geometry is a strange corner of mathematics. The problems are elementary in the sense that they need no machinery past secondary school: circles, triangles, angles, similar figures. They are also brutally hard, because solving them depends almost entirely on seeing the one construction that makes everything collapse. Draw the right auxiliary line and the problem takes four steps. Miss it and you can work for hours.

That property makes olympiad geometry an unusually clean laboratory for asking what mathematical intuition is.

## Why brute force fails here

A geometry problem gives you a configuration and asks you to prove a relationship. In principle you could just derive consequences. Angle chasing is mechanical: this angle equals that one because of the inscribed angle theorem, therefore these triangles are similar, therefore these lengths are proportional. Software has done this well since the 1990s. Wu's method and Gröbner basis approaches can decide large classes of geometric statements algebraically, and they are complete in the sense that if the statement is true in the algebraic model, they will find that out.

The problem is that many olympiad problems are not provable from the given configuration alone. You have to add something. Extend a segment to meet a circle. Drop a perpendicular. Mark the midpoint of an arc nobody mentioned. Construct the reflection of a point over a line.

Once you allow additions, the search space explodes. There are infinitely many points you could add, and no way to score a candidate short of trying it and seeing whether the proof then goes through. This is where classical automated geometry stalls: not on deduction, on invention.

## The two-component design

AlphaGeometry, published by a DeepMind team in *Nature* in January 2024, attacks exactly this split. It has two parts that alternate.

The symbolic engine is a deduction system that takes the current configuration and derives every consequence it can, exhaustively, using a fixed rule set covering angles, ratios, similar triangles and a rule for handling algebraic consequences. It runs to saturation: it keeps deriving until nothing new appears. If the goal shows up in the derived set, the problem is solved and the proof is a trace through the derivation.

The language model is trained to propose auxiliary constructions. When the symbolic engine saturates without reaching the goal, the model looks at the configuration and suggests a new point or line. That gets added, and the symbolic engine runs again on the enlarged configuration.

Loop until solved or out of budget.

The result on a benchmark of thirty IMO geometry problems from 2000 to 2022: twenty-five solved. The average human gold medallist solves about twenty-six. The previous best automated system solved ten.

## The training data problem, and the trick

There is no corpus of a hundred million worked olympiad geometry proofs. There are a few thousand problems in total, which is far short of what training a useful model requires.

The team generated data synthetically, and the method is the clever part. Rather than trying to produce problems and then solve them, they ran the process backwards. Sample a random geometric configuration. Run the symbolic engine to saturation, producing a large set of true statements about it. Pick one of those statements as a goal, and trace back which premises the derivation actually used.

Now here is the step that matters. Some points used in the derivation do not appear in the statement of the goal. Those points are, by definition, auxiliary constructions. Strip them from the problem statement and you have a problem whose solution requires inventing exactly those points, together with a proof that does so.

They generated around a hundred million such synthetic proofs, of which roughly nine million involved at least one auxiliary construction. That is the training set: not human proofs, but machine-generated problems that were reverse-engineered to require the skill being taught.

## What the division of labour tells us

The architecture is a claim about mathematics, whether or not it was meant that way. It says that deduction is mechanical and can be trusted to a rule engine, and that the creative act is narrow and specific: knowing what to add.

That matches how strong competitors describe their own experience. They do not report agonising over whether an angle chase is valid. They report staring at a diagram until something suggests itself. The valid-step-checking is background; the seeing is the work.

It also means the system's output is trustworthy in a way that a language model's essay is not. The proof is produced by the symbolic engine, which only applies sound rules. The language model's contribution is a suggestion that gets checked. If it suggests a useless construction, nothing breaks; the deduction engine simply fails again and another suggestion comes.

This is the pattern worth extracting. Put the neural component where being wrong is cheap. Put the symbolic component where being wrong is expensive.

## The follow-up work

AlphaGeometry 2, reported in 2025, extended coverage to problems involving movement of objects and equations of linear angles, and pushed the solve rate on IMO geometry problems from 2000 onward to around 84 percent. Combined with AlphaProof, a Lean-based system for the non-geometry problems, the pair achieved a silver medal score at the 2024 IMO, one point below gold. In 2025 several systems, including general-purpose reasoning models running without a bespoke geometry engine, reached gold medal scores.

That last detail complicates the story. If a general reasoning model can score gold without any symbolic deduction engine, does the two-component argument still hold?

Partly. The general models are considerably slower, use vastly more computation, and produce proofs in natural language that need human checking. They are not producing machine-verified output. What they demonstrate is that enough scale and enough reinforcement learning on reasoning traces can approximate the same capability without an explicit architecture for it. Whether the approximation holds up outside competition mathematics is not yet established.

## What olympiad performance does not mean

Competition mathematics is a specific genre. Problems have known-length solutions, are guaranteed solvable, use a bounded set of techniques, and were written by humans intending them to be found. Research mathematics has none of those properties. You do not know whether the statement is true. You do not know whether the tools exist. You do not know whether the problem is worth the time.

Tim Gowers, who helped grade AlphaProof's 2024 output, made the point that the system's answers were correct but arrived through search rather than through the kind of structural understanding that generalises. A human solving these problems builds intuitions that transfer. Whether these systems do is an open empirical question and not one that a competition score answers.

The honest summary: machines now solve a category of hard, human-designed problems at the level of the strongest human competitors, using a method that separates guessing from checking. That is a real result. It is not the same as doing mathematics, and the people who built it are generally more careful about saying so than the coverage has been.
