---
title: "Inside a Proof Assistant: What Lean Actually Checks"
description: "A proof assistant does not find proofs. It refuses bad ones. Here is what happens between typing a theorem and the machine agreeing that you proved it."
category: Formal Methods
author: Dana Reisman
date: 2026-08-10
readingTime: "10 min read"
---

There is a persistent confusion about proof assistants. People hear the name and imagine software that helps you find a proof, in the way a spellchecker helps you find a typo. That is not what these systems do. A proof assistant is a machine that reads a proof you already wrote and refuses to accept it if any step is unjustified. The assistance is in the refusing.

Lean, Coq, Isabelle, Agda and HOL Light differ in their logical foundations and their culture, but they share this. You state a theorem. You construct a term. The system checks the term against the statement. If the check passes, the theorem holds, subject to a small set of assumptions we will get to.

## Proofs as programs

The idea underneath most modern proof assistants is the Curry-Howard correspondence, and it is one of the genuinely beautiful facts in logic. Propositions correspond to types. Proofs correspond to programs that inhabit those types.

If A and B are propositions, then "A implies B" corresponds to the type of functions from A to B. A proof of the implication is a function that takes any proof of A and returns a proof of B. Conjunction corresponds to a pair type: a proof of "A and B" is a pair containing a proof of A and a proof of B. Universal quantification corresponds to a dependent function type. Existential quantification corresponds to a dependent pair.

Once you accept this dictionary, checking a proof becomes type checking, which is a mechanical, decidable procedure. There is no cleverness in the checker. It walks the term, applies typing rules, and either everything lines up or it does not.

This is why proof assistants are trustworthy in a way that is difficult to achieve otherwise. The interesting, complicated, potentially buggy parts of the system are the parts that help you *write* the term. The part that decides whether to believe you is small.

## The kernel

That small part is called the kernel. In HOL Light it is a few hundred lines. In Lean 4 it is a few thousand. Everything else in the system, the tactic language, the elaborator, the automation, the library, the editor integration, can be arbitrarily elaborate and buggy, because none of it is trusted. Whatever those layers produce is handed to the kernel, and the kernel checks it from scratch.

This design is called the de Bruijn criterion, after Nicolaas de Bruijn, who built the Automath system in the late 1960s. It means the trusted computing base of a formal proof is a piece of code that a determined person can read in an afternoon. Several projects have written independent checkers that verify Lean's output, precisely so that a bug in Lean's own kernel would be caught by a program that shares none of its code.

What you actually trust when you trust a Lean proof: the kernel implementation, the compiler that compiled it, the hardware it ran on, and the axioms the proof used. That is a short and inspectable list. Compare it to what you trust when a referee reads a ninety-page paper.

## Tactics: the part that feels like work

Nobody writes proof terms by hand. They are enormous. Instead you write tactics, which are commands that build the term for you.

A Lean proof of a small lemma might read:

```lean
theorem add_zero_right (n : Nat) : n + 0 = n := by
  induction n with
  | zero => rfl
  | succ k ih => simp [Nat.succ_add, ih]
```

`induction` splits the goal into the base case and the inductive step. `rfl` closes a goal where both sides are definitionally equal. `simp` rewrites using a database of simplification lemmas. Each tactic is a program that manipulates the proof state and ultimately emits a term.

The proof state is the thing you spend your time staring at. It shows your current hypotheses and the goal you still owe. Every tactic transforms it. Proving in Lean feels less like writing and more like playing a puzzle game where you are trying to reduce the goal to nothing.

The learning curve here is real and it is not about mathematics. It is about learning which of several thousand library lemmas is the one that closes your goal, and what it is called. Mathlib, Lean's mathematics library, now contains well over a million lines and something like two hundred thousand theorems. Finding the right one is the daily difficulty.

This is also, not coincidentally, the part where machine learning has been most useful. Premise selection, the problem of picking which lemmas are relevant to the current goal, is a search problem over a large corpus with weak signals, which is exactly what neural retrieval is good at. Tools that suggest tactics or complete proofs from the current state are now routine parts of the workflow.

## What formalisation costs, and what it buys

The classical estimate is the de Bruijn factor: the ratio between the size of a formal proof and the size of the informal one. For a long time it sat around four. For well-supported areas with mature libraries it is now often close to one or two. For areas where the library has nothing, it can be enormous, because you have to build the foundations before you can state the theorem.

The famous case studies show the range. Georges Gonthier's formalisation of the four colour theorem took several years. His formalisation of the odd order theorem, a 255-page paper by Feit and Thompson, took six years and produced 170,000 lines of Coq. The Flyspeck project, formalising Thomas Hales's proof of the Kepler conjecture, ran from 1998 to 2014.

Set against that: the Liquid Tensor Experiment. In 2020 Peter Scholze posted a challenge asking whether a particular theorem of his could be formalised, saying he wanted to be sure of it and found the proof difficult to fully check by hand. A community effort led by Johan Commelin completed the main result in about eighteen months. In the process they found that one lemma as originally stated was slightly wrong, in a way that did not break the proof but did need fixing.

That is the actual value proposition. Not certainty for its own sake, but a way to check work that has grown too large or too intricate for the referee system to handle honestly.

## Where the AI fits

Two roles, and they are worth keeping separate.

The first is proof search. Given a goal, produce a tactic or a sequence of tactics that closes it. This is what systems like AlphaProof do, in combination with reinforcement learning against the proof assistant itself as an environment. The proof assistant is an unusually good training signal because it gives a clean, non-negotiable reward: the proof checks or it does not. There is no reward hacking available when the referee is a type checker.

The second is autoformalisation. Given a theorem written in ordinary mathematical English, produce the formal statement. This is much harder to evaluate, because a wrong formalisation can be perfectly provable. If you formalise "every continuous function on a compact set is bounded" but get the definition of compact subtly wrong, you will prove something true and useless. There is no automated check for whether the formal statement means what the English meant. A human has to read it.

That asymmetry is the thing to remember. Once a statement is formalised, the machine can be trusted completely with the proof. Getting to the formal statement in the first place remains a human judgement, and no amount of proof automation removes it.

## Starting

If you want to try it, the standard entry point is the Natural Number Game, a browser-based tutorial that has you rebuild arithmetic from the Peano axioms using Lean tactics. It takes a few hours and it will tell you very quickly whether you find this kind of work satisfying or maddening. Both reactions are common and both are reasonable.
