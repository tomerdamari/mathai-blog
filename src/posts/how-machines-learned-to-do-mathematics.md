---
title: "How Machines Learned to Do Mathematics"
description: "Seventy years of trying to teach computers arithmetic, algebra and proof, and what changed when the machines stopped following rules and started guessing."
category: History
author: Dana Reisman
date: 2026-08-18
readingTime: "9 min read"
---

The first program that proved a mathematical theorem ran in 1956 on a machine with less memory than a modern doorbell. It was called Logic Theorist, written by Allen Newell, Herbert Simon and Cliff Shaw, and it worked its way through propositions from Whitehead and Russell's *Principia Mathematica*. It proved thirty-eight of the first fifty-two. For one of them it found a shorter argument than the one in the book. Simon wrote to Bertrand Russell about it. Russell replied that he was delighted to learn the propositions could be proved by machine, and added that if the work had been available earlier he and Whitehead might have saved themselves some years.

That exchange contains the whole argument that has run ever since. A machine did something that looked like mathematics. A mathematician conceded that it was useful. Nobody agreed on whether the machine understood anything.

## Rules first

The early decades belonged to symbol manipulation. If mathematics is a formal game with pieces and legal moves, then a computer that knows the moves should be able to play. That premise produced a genuinely impressive line of software, and it is still the software most working scientists actually depend on.

MACSYMA, begun at MIT in 1968, could integrate functions symbolically, factor polynomials and simplify expressions that would take a graduate student an afternoon. Its descendants are Maple, Mathematica, Maxima, SymPy and Sage. When you ask one of these systems for the indefinite integral of a rational function, it does not search or guess. It runs the Risch algorithm, a decision procedure published in 1969 that determines whether an elementary antiderivative exists and constructs it when it does. The answer is not a plausible answer. It is the answer, in the same sense that long division gives the answer.

Alongside computer algebra grew automated theorem proving. Resolution provers, tableau provers, model checkers, SAT and SMT solvers. These systems do not integrate functions; they decide whether a logical statement follows from a set of premises. Modern SAT solvers are one of the quiet triumphs of computer science. They routinely settle problems with millions of variables, and industry uses them for chip verification, scheduling and dependency resolution. The package manager that installs your software probably runs one.

The limitation was never correctness. It was reach. A rule-following system can only follow the rules it has. Ask a computer algebra system to prove something that requires an idea, a substitution nobody has seen before, a clever choice of auxiliary construction, and it has nothing to offer. The search space of possible proofs grows faster than any amount of hardware can absorb. Mathematics, it turned out, is mostly about knowing which branches not to explore, and rules do not encode taste.

## Statistics second

The alternative approach spent decades looking hopeless. Instead of encoding the rules of mathematics, train a statistical model on examples of mathematics and let it learn whatever regularities exist in the data. For most of the history of the field this produced systems that could not reliably add two three-digit numbers.

Two things changed. The transformer architecture arrived in 2017 and made it practical to train very large sequence models on very large corpora. And it became clear that a model trained to predict the next token across the internet, including textbooks, forums, homework solutions, arXiv papers and Stack Exchange threads, absorbs an enormous amount of mathematical pattern along the way.

By 2022, large language models could solve grade-school word problems at a rate that surprised the people who built them. By 2024, systems built on the same foundations were scoring at the level of national olympiad medallists on competition geometry and combinatorics. In July 2024, DeepMind's AlphaProof and AlphaGeometry 2 together solved four of the six problems at the International Mathematical Olympiad, a silver medal performance. In 2025, several systems reached gold medal scores on the same competition.

The interesting part is how they did it. AlphaGeometry pairs a language model with a symbolic deduction engine. The symbolic engine grinds out every consequence it can derive from the given configuration. When it gets stuck, the language model proposes an auxiliary construction, the extra point or line that unlocks the problem, which is exactly the step that pure search could never afford to guess at. Then the symbolic engine takes over again and checks everything. Neither half works alone. The neural component supplies intuition and the symbolic component supplies certainty.

## What the split means

This is the shape almost every serious mathematical AI system now has. A component that guesses well, and a component that verifies. The guessing component is fast, creative, and wrong a meaningful fraction of the time. The verification component is slow, unimaginative, and never wrong about the things it checks.

It matches, uncomfortably closely, how mathematicians describe their own practice. Nobody derives a theorem by exhaustive deduction from axioms. They see a shape, form a hunch, sketch an argument, and then spend most of their time checking whether the hunch survives contact with the details. Most hunches do not. The formal write-up is a record of the ones that did.

The difference is that a mathematician's verification step is a human referee with limited attention, and a machine's verification step can be a proof assistant that checks every inference down to the axioms. Lean, Coq, Isabelle and HOL Light will not accept a hand wave. When Peter Scholze wanted to be certain of a result whose proof he found exhausting to check, he put it to the Lean community as a challenge. The formalisation was completed. He described the outcome as removing a genuine doubt.

## What still does not work

It is worth being precise about the current failure modes, because the marketing is not.

Language models are unreliable at long arithmetic, for structural reasons involving how numbers are broken into tokens. They will produce a confident proof of a false statement if the false statement resembles a true one. They cannot tell you how confident they are in any calibrated way. They perform worse on problems phrased in unfamiliar notation even when the mathematics is identical. And a large share of headline benchmark performance is contested, because the benchmark problems and their solutions were plausibly in the training data.

None of these are fatal. All of them mean that an unverified model output is a conjecture, not a result.

## Where this is going

The near-term picture is not machines replacing mathematicians. It is a change in what counts as a routine step. Terence Tao has written about using these tools as a slightly unreliable but very fast collaborator, useful for generating candidate approaches, formalising tedious lemmas and searching literature. Formalisation projects that would have taken a decade are now taking a year or two.

The longer question is whether a system that guesses statistically can produce a genuinely new mathematical idea, as opposed to recombining ideas it has seen. Nobody knows. The honest position is that we have built something that is extremely good at the parts of mathematics that look like pattern recognition, which turns out to be a much larger share of the subject than the romantic story admits, and that the remaining part has not yet been touched.

Russell's reply to Simon is still the right note to end on. The machine did something useful. Whether it understood anything is a separate question, and seventy years later it is still open.
