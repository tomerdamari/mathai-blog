---
title: "The Largest Proof Ever Produced Was 200 Terabytes Long"
description: "A SAT solver settled the Boolean Pythagorean triples problem in 2016. The proof is unreadable by design, and it is more trustworthy than most papers."
category: Formal Methods
author: Miriam Adler
date: 2026-06-23
readingTime: "9 min read"
---

The question is easy to state. Can you colour every positive integer red or blue so that no Pythagorean triple, no three numbers a, b, c with a squared plus b squared equal to c squared, ends up all one colour?

Erdős asked a version of this and offered 100 dollars for an answer. In 2016 Marijn Heule, Oliver Kullmann and Victor Marek settled it. The answer is no. You can colour the integers from 1 to 7,824 successfully. At 7,825 it becomes impossible.

The proof is 200 terabytes.

## How a colouring problem becomes a logic problem

Encode the question as a Boolean formula. Introduce one variable per integer, true for red and false for blue. For every Pythagorean triple within your range, add two clauses: not all three true, and not all three false.

Now the formula is satisfiable exactly when a valid colouring exists. Ask a SAT solver.

For 7,824 the solver finds a colouring. For 7,825 it proves no assignment satisfies the formula. That negative answer is the proof, and the size comes from what a proof of unsatisfiability has to contain.

## Why the proof is so large

A satisfiable answer is compact. Hand over the assignment and anyone can check every clause in linear time.

Unsatisfiability has no such certificate. To establish that no assignment works, the solver must in effect account for the entire search space. Modern solvers do this through conflict-driven clause learning: when a partial assignment leads to a contradiction, the solver analyses the conflict and derives a new clause capturing why that region fails, then continues. The learned clauses accumulate.

The proof is the log of every derived clause, in a format called DRAT, which stands for deletion resolution asymmetric tautology. Each line records a clause and the fact that it follows from earlier ones by a specific inference rule.

The search for 7,825 was distributed across 800 cores on the Stampede supercomputer at Texas Advanced Computing Center, using a technique called cube and conquer. Split the problem into roughly a million subproblems by fixing some variables, solve each independently, combine. Two days of wall clock time. The combined DRAT log came to 200 terabytes, later compressed to 68 gigabytes.

## The part that makes it trustworthy

A 200-terabyte log is not something a person can inspect, and neither is a 68-gigabyte one. The reason to believe it is that the log was checked by a separate, formally verified program.

The checker reads each line of the DRAT proof and verifies that the recorded clause genuinely follows from the clauses before it. This is a simple mechanical check. It knows nothing about Pythagorean triples, colourings or SAT solving. It knows resolution.

Crucially, the checker itself has been verified. Implementations exist whose correctness has been proven in Coq and in ACL2. So the trust chain is: the encoding is correct, which a human can check because it is a short piece of code; the checker is correct, which has been formally proven; the checker accepted the log, which is an empirical fact about a computation that anyone can repeat.

This is a stronger guarantee than a refereed paper offers. A referee reads a proof and forms a judgement. A verified checker reads a proof and applies a decision procedure. The 200 terabytes is not a weakness of the result. It is the cost of the guarantee.

## The complaint that remains

Understanding. Nobody knows why 7,825.

There is no argument for the number. It is not a nice number. It does not factor interestingly. Its appearance is not explained by any structural feature anyone has identified. The proof establishes that the property fails there without indicating what changes.

This is the same complaint that greeted the four colour theorem in 1976 and it is exactly as unanswered. A proof can certify a fact without illuminating it, and the mathematical community has never fully decided how it feels about that.

Heule has been direct about it, describing the goal as answering questions that humans cannot answer, and treating the lack of insight as a real cost rather than a rhetorical concession.

## Other results in this style

The Erdős discrepancy problem, at least in its low-discrepancy cases, was attacked the same way. Boris Konev and Alexei Lisitsa showed in 2014 that no infinite sequence of plus and minus ones has discrepancy at most two, with a SAT proof of about 13 gigabytes. The full conjecture was then proven by Terence Tao in 2015, with a human argument, partly motivated by the computational evidence.

That pairing is worth noting. The SAT result did not prove the theorem. It made people confident enough about the shape of the answer to invest in finding a real proof.

Schur number five was determined in 2017 by Heule, using two petabytes of proof and 14 CPU-years. The answer is 160.

Keller's conjecture in dimension seven was settled in 2020 by a group including Heule, again through SAT, again with a verified checker.

The pattern is now established. Take a combinatorial question with a finite search space at each size, encode it, throw a solver at it with enough symmetry breaking to make the space tractable, verify the log.

## Where the AI question sits

SAT solving is not machine learning and these results involved no neural networks. But the connection is direct and increasingly practical.

Solver performance depends on heuristics: which variable to branch on, when to restart, which learned clauses to keep. These are decision problems with abundant training data and a clear objective, and learned heuristics have produced real gains. The solver stays complete and its output stays verifiable; only the search order changes.

That is the same architecture as every other successful mathematical AI system. The neural component chooses where to look. The symbolic component decides what is true. The proof is produced by the part that cannot be wrong.

There is a reasonable prediction here about the next decade. The class of mathematical questions settled by machine will keep growing, and the growth will come from better encodings and better search guidance rather than from a system that reasons its way to answers. The proofs will get larger and less readable. The verification will get more rigorous. And the gap between knowing a thing is true and understanding why will keep widening, which is a genuine loss that nobody has proposed a fix for.
