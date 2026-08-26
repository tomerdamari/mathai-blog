---
title: "The Busy Beaver and What Cannot Be Computed"
description: "A function that grows faster than anything a computer can calculate, and how an internet collaboration settled its fifth value after forty years."
category: Open Problems
author: Miriam Adler
date: 2026-07-09
readingTime: "9 min read"
---

Consider a Turing machine with n states, a two-symbol alphabet and a tape that starts blank. Some of these machines halt. Most run forever. Among the ones that halt, some run longer than others.

Define BB(n) as the maximum number of steps any halting n-state machine takes before stopping. This is the busy beaver function, introduced by Tibor Radó in 1962.

BB(1) is 1. BB(2) is 6. BB(3) is 21. BB(4) is 107.

BB(5) is 47,176,870.

BB(6) is greater than 10 raised to the power of 10 raised to the power of 10 raised to the power of 10 raised to the power of 7, and that is only a lower bound from a specific machine somebody found.

## Why the growth is not just fast

Any function you can write down with a computer program is eventually exceeded by the busy beaver function. Not eventually exceeded by a bit. Exceeded permanently and by an unbounded margin.

The proof is short. Suppose f is computable and f(n) is at least BB(n) for all n. Then you could decide the halting problem: to determine whether an n-state machine halts, compute f(n), run the machine for that many steps, and if it has not halted by then it never will. But the halting problem is undecidable, so no such f exists.

That is the whole argument, and it is worth sitting with. The busy beaver function is not hard to compute in the way that factoring is hard. It is uncomputable, in the strict sense that no algorithm produces it. The values are perfectly well defined. Each BB(n) is a specific finite integer. There is simply no procedure that finds them all.

## The connection to open problems

Because busy beaver values encode halting behaviour, they encode mathematics.

You can build a Turing machine that searches for a counterexample to Goldbach's conjecture and halts if it finds one. Whether that machine halts is equivalent to whether Goldbach is false. Someone has built such a machine with 27 states. So knowing BB(27) would settle Goldbach: run every 27-state machine for BB(27) steps, and if the Goldbach machine has not halted, no counterexample exists.

The same trick has been done for the Riemann hypothesis, with a machine in the low hundreds of states, later reduced considerably.

More dramatically, Yuri Matiyasevich, Stefan O'Rear and Scott Aaronson's collaborators constructed a machine of 748 states, later improved to 745, that halts if and only if Zermelo-Fraenkel set theory is inconsistent. Since ZFC cannot prove its own consistency, ZFC cannot determine whether that machine halts. Therefore ZFC cannot determine BB(745). The value exists; standard mathematics cannot reach it.

The threshold where busy beaver values become independent of ZFC is somewhere between 6 and 745, and narrowing it is an active pursuit.

## BB(5), settled in 2024

For forty years the fifth value was a conjecture. Heiner Marxen and Jürgen Buntrock found a five-state machine running 47,176,870 steps in 1989, and nobody found anything longer, but proving that no five-state machine runs longer requires eliminating every non-halting candidate.

There are roughly 17 trillion five-state machines before symmetry reduction, cut to about 180 million distinct cases. Most are dispatched quickly. The difficulty is the residue: machines whose non-halting is not obvious and requires a proof.

The bbchallenge project, an open online collaboration begun in 2022, worked through them. Contributors built deciders, programs that prove a class of machines never halts, each covering a different behavioural pattern. Cyclers, translated cyclers, machines whose tape configuration satisfies a closed-form invariant, machines analysable through a finite automaton reduction.

A handful of machines resisted every automated decider and needed individual analysis. The most famous is Antihydra, a machine implementing a Collatz-like iteration on integers, whose non-halting depends on a statement about the distribution of a particular sequence that nobody has proven. It was ultimately handled by a bespoke argument.

In July 2024 the project announced that BB(5) equals 47,176,870, with the entire proof formalised in the Coq proof assistant. The formalisation matters here more than usual. The proof is a collection of programs run over hundreds of millions of cases, exactly the situation where a subtle bug would be invisible. Formal verification converts a claim about software into a claim checked by a kernel.

## BB(6) is out of reach

The sixth value will not be determined. The current lower bound, established through analysis of a specific machine in 2025, involves a tower of exponentials.

The obstruction is not compute. It is that six-state machines can implement iterations whose behaviour depends on open number-theoretic questions. Several known six-state candidates run Collatz-like processes. Deciding whether they halt would require settling those processes, and nobody can.

This is the practical face of undecidability. Not an abstract limit at some distant horizon, but a wall that appears at six states and a two-symbol alphabet, which is about as small as a computational system can be.

## Why this belongs in a discussion about AI

Because it draws a boundary that no amount of scaling crosses.

There is a persistent framing in which AI capability is a matter of resources: more parameters, more data, more compute, more capability. Within the space of computable functions that framing is roughly right, and progress has been startling.

The busy beaver function is outside that space entirely. No system that runs as a computation can produce it, regardless of size or architecture. A language model asked for BB(7) can output a number. That number will be wrong, and no training procedure could make it right, because the mapping from n to BB(n) is not a computable function to approximate.

This is not a claim that AI is limited in some vague philosophical way. It is a specific mathematical fact with a two-line proof, and it applies equally to human mathematicians running as physical processes.

What it does mean is that the discourse about machines eventually solving all mathematical problems has a well-defined false component. There are true arithmetic statements not provable in any given consistent formal system, that is Gödel, and there are specific finite integers that no algorithm computes, that is Radó. Both were established before the first neural network was trained and neither has an escape hatch.

The busy beaver function is the cleanest illustration because it is so concrete. BB(745) is a particular integer. You could write it down if you knew it. Nothing that computes will ever tell you what it is.
