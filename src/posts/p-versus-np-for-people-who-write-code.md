---
title: "P versus NP for People Who Write Code"
description: "The million-dollar question, stated without hand-waving, and why the practical situation is stranger than the headline version suggests."
category: Explainers
author: Yonatan Peled
date: 2026-07-13
readingTime: "10 min read"
---

The usual popular framing is that P versus NP asks whether problems that are easy to check are also easy to solve. That is accurate and it is not enough to work with. Here is the version that survives contact with actual programming.

## The setup

A decision problem is a question with a yes or no answer, parameterised by an input. Does this graph have a Hamiltonian cycle? Is this Boolean formula satisfiable? Does this set of integers contain a subset summing to zero?

P is the class of decision problems solvable by an algorithm whose running time is bounded by a polynomial in the input size. Sorting is in P. Shortest path is in P. Primality testing is in P, proven in 2002 by Agrawal, Kayal and Saxena, which was a surprise at the time.

NP is the class of decision problems where a yes answer has a certificate that can be checked in polynomial time. If a graph has a Hamiltonian cycle, the cycle itself is a certificate, and checking it is a linear scan. If a formula is satisfiable, the satisfying assignment is the certificate.

Note what NP does not mean. It is not "non-polynomial". It stands for nondeterministic polynomial time, and the definition is about the existence of a checkable certificate, not about hardness. Everything in P is in NP, since you can ignore the certificate and just solve the problem.

The question is whether the inclusion is strict. Is there a problem with an efficiently checkable certificate but no efficient algorithm?

## Why anyone cares

Because of completeness. Stephen Cook in 1971 and Leonid Levin independently showed that Boolean satisfiability is NP-complete: every problem in NP reduces to it in polynomial time. Richard Karp then produced 21 more NP-complete problems in 1972, and the list now runs into the thousands.

Complete means maximally hard within the class. If any one NP-complete problem has a polynomial algorithm, they all do, and P equals NP. If any one of them provably does not, none of them do.

So the thousands of NP-complete problems, which span scheduling, routing, packing, circuit design, protein folding models, game solving and puzzle generation, all stand or fall together. That is why the question is worth a million dollars and why it is one of the seven Clay Millennium Problems.

## What the answer would mean

If P equals NP, with a practical algorithm, most modern cryptography breaks. Public key systems rely on the gap between finding a factorisation and checking one. So does much of the security infrastructure of the internet. On the other side, optimisation problems that are currently approximated would become exactly solvable, which would reshape logistics, chip design, and drug discovery. Scott Aaronson has argued that it would also mean mathematics itself becomes largely automatable, since finding a proof of bounded length is an NP search.

Almost nobody expects this. Informal polls of theoretical computer scientists put the fraction expecting P not equal to NP somewhere above 80 percent, and rising over time.

If P does not equal NP, which is the expected answer, nothing about daily practice changes. We would have a proof of something everybody already assumed.

## Why it is so hard to settle

Three barriers are known, and each one killed a promising line of attack.

Relativisation, from Baker, Gill and Solovay in 1975. There exist oracles relative to which P equals NP, and other oracles relative to which it does not. Any proof technique that works the same way when the machines have access to an oracle cannot settle the question, because it would have to prove both. That rules out the diagonalisation arguments that had settled earlier separation questions.

Natural proofs, from Razborov and Rudich in 1994. Most circuit lower bound techniques share two properties: they apply to a large fraction of all functions, and the property they use can be checked efficiently. Razborov and Rudich showed that any proof technique with both properties would also break the pseudorandom generators that are widely believed to exist. So either those generators do not exist, which would itself be a shock, or this whole family of techniques cannot work.

Algebrization, from Aaronson and Wigderson in 2008, extended the relativisation barrier to cover algebraic techniques that had been developed specifically to get around it.

Each barrier does not say the question is unanswerable. It says a particular kind of argument cannot answer it. What remains is techniques that are non-relativising, non-naturalising and non-algebrising, and nobody has much idea what those look like.

## The practical situation, which is stranger

Here is what a working programmer should actually take from this.

NP-hardness is a worst-case statement. It says no algorithm is fast on every instance. It says nothing about the instances you have.

Modern SAT solvers routinely handle industrial instances with millions of variables. Chip verification, dependency resolution in package managers, hardware model checking, and automated planning all run on SAT and SMT solvers in production. The problem is NP-complete and the solvers work anyway, because real instances have structure that the solvers exploit through conflict-driven clause learning, restarts and good heuristics.

Integer programming is NP-hard and commercial solvers handle enormous scheduling and routing problems daily. The travelling salesman problem is NP-hard and the Concorde solver has found provably optimal tours through tens of thousands of cities.

So the correct reading of "your problem is NP-hard" is not "give up". It is "there is no algorithm guaranteed fast on all inputs, so find out whether your inputs are adversarial or merely large". Usually they are merely large.

The genuinely hard instances tend to be constructed rather than encountered. Random instances near the satisfiability threshold are hard. Cryptographic instances are hard by design. Instances arising from a logistics problem at a real company are usually not.

## Where machine learning enters

Two connections, both active.

The first is heuristic learning. SAT solver performance depends heavily on branching heuristics, which decide which variable to assign next. This is a decision problem with a clear objective and enormous amounts of available training data, and learned heuristics have produced measurable gains. The solver remains complete and its answers remain exact; only the search order is learned. This is the same architecture as AlphaGeometry: neural guidance, symbolic guarantee.

The second is the reverse direction. NP-hardness results are used to characterise what neural networks can and cannot do. Training a small network to optimality is NP-hard. Verifying that a network satisfies a robustness property is NP-hard. These results shape what verification tooling is realistic.

## The claims to distrust

Every year brings several claimed proofs. Gerhard Woeginger maintained a list that reached over a hundred entries before he stopped updating it, split roughly evenly between claims in each direction, including several people who claimed both at different times.

The base rate on these is not encouraging, and the reason is the barriers. A proof that does not explain how it evades relativisation and natural proofs is almost certainly wrong, and the author usually has not addressed either. Language models, asked about the problem, will occasionally produce confident-sounding arguments in one direction or the other. Those arguments are worth exactly what any other unrefereed claimed proof of a Millennium Problem is worth.

If you want a single sentence to carry away: the question is open, the expected answer changes nothing practical, the barriers explain why fifty years of effort has not settled it, and NP-hardness in your own work is a statement about the worst case that your actual inputs probably do not achieve.
