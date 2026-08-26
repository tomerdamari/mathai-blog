---
title: "Maple at Forty: The Algebra System Built to Fit in a Shared Terminal"
description: "Maple started in 1980 because a Waterloo research group could not afford enough memory to run the computer algebra system they wanted. The constraint shaped everything that followed."
category: History
author: Miriam Adler
date: 2026-08-25
readingTime: "10 min read"
---

In November 1980, a group at the University of Waterloo had a problem that sounds quaint now and was not quaint then. They wanted to teach and do research with a computer algebra system. The systems available, chiefly MACSYMA and Reduce, needed more memory than the department could give to more than a handful of simultaneous users. MACSYMA in particular ran on a PDP-10 under a Lisp environment that assumed it owned the machine.

Waterloo had a shared VAX and a lot of students. Keith Geddes and Gaston Gonnet decided the way out was to write a system small enough that many people could run it at once.

The result was Maple. The name is a nod to Canada, and the design is a direct consequence of that memory constraint, in ways that are still visible in the product forty-five years later.

## Small kernel, large library

The decision that defined Maple was splitting the system in two.

A small kernel, written in C, handles the things that must be fast and must always be resident: the data structures for expressions, arithmetic on integers and rationals of arbitrary size, memory management, the simplifier, and the interpreter for Maple's own programming language.

Everything else lives in a library written in that language, loaded on demand. Integration, differential equations, linear algebra, number theory, statistics, plotting. If you never call the differential equation solver, its code never enters memory.

The kernel started at something like a hundred kilobytes. The library was and is enormous, and it grows with every release, but you only pay for the parts you touch.

This looks obvious in retrospect. It was not the prevailing design. MACSYMA was a Lisp image, largely monolithic, and its footprint was its footprint. Writing the mathematical library in an interpreted language layered over a compiled core traded some speed for a great deal of flexibility, and it meant the library could be written by mathematicians rather than by systems programmers.

It also meant the library was readable. For most of Maple's history you could type the name of a library procedure with the right settings and see its source. Students learned the algorithms by reading the implementation. That property has eroded somewhat as parts of the system moved into the kernel or into compiled modules, and it remains truer of Maple than of most commercial mathematical software.

## The company, and the split

Maple was commercialised through Waterloo Maple Software, founded in 1988, later Maplesoft. The University of Waterloo and the founders held the rights, and the system was sold into universities and engineering firms.

The most consequential business event in Maple's history is one that happened to a competitor. In 1988 Stephen Wolfram released Mathematica, with a notebook interface, aggressive marketing, and a pitch aimed as much at scientists generally as at symbolic mathematics specialists. The two systems have been paired in comparisons ever since, usually to Maple's disadvantage in visibility and to nobody's clear advantage in capability.

There is a footnote worth recording. In the early 1990s the Maple kernel was licensed to a company building a competing product, which is how MathCad got its symbolic engine. For a period, part of Maple was inside a product that competed with Maple.

Maplesoft was acquired by Cybernet Systems, a Japanese company, in 2009. Development continues, with annual releases, and the current emphasis is as much on Maple Flow and MapleSim, which target engineering documentation and physical modelling, as on the symbolic core.

## What the language is like

Maple's programming language is a genuine language, not a command syntax, and it is idiosyncratic in ways that reward a little patience.

Everything is an expression, and expressions are represented internally as a directed acyclic graph with structure sharing. Identical subexpressions are stored once. This is invisible until you work with something large, at which point it is the reason a computation that should have exhausted memory did not.

Assignment uses `:=`, which is Pascal's convention and predates the systems most people learn first. A statement ending in a semicolon prints its result; one ending in a colon does not. That distinction catches every new user exactly once, usually when a computation prints a screenful of output they did not want.

Procedures are first class. The language has lexical scoping, remember tables that cache results automatically when you ask for them, and a type system rich enough to dispatch on structural properties of expressions. `type(x, 'polynom(rational, y)')` asks whether x is a polynomial in y with rational coefficients, and the answer is a real structural check rather than a guess.

The unevaluated quote is the piece that confuses people coming from other languages. Single quotes delay evaluation by one level, which matters because Maple evaluates aggressively. You use it to pass a name rather than a value, most commonly when a procedure needs somewhere to put a result.

## Assumptions, and why they matter

The feature Maple users cite most, and the one that most repays understanding, is the assumption system.

Symbolic mathematics is full of statements that are true under conditions and false without them. The square root of x squared is x when x is non-negative and the absolute value of x otherwise. The logarithm of a product is the sum of the logarithms on a branch. An integral converges for some parameter ranges.

A system that does not track conditions has two options, both bad. It can simplify aggressively and be wrong sometimes, or it can refuse to simplify and be useless often.

Maple's answer is `assume`, which attaches properties to a name, and `assuming`, which applies them to a single expression. Tell it that x is real and positive and the square root simplifies. Tell it a parameter exceeds one and an integral evaluates. The properties live in a lattice, so declaring that something is a positive integer implies that it is an integer, rational, real and non-zero, and every relevant simplification unlocks at once.

The system announces its awareness of the constraint by decorating the variable with a tilde in output. This annoys people. It is the system telling you that the result you are looking at is conditional, which is exactly the thing a symbolic answer needs to communicate.

The general lesson transfers to any symbolic tool. When a computer algebra system refuses to simplify something you know is simplifiable, the usual cause is a condition you know and it does not.

## Where Maple sits now

The honest picture of the current landscape has four kinds of tool, and Maple's position in it has narrowed without becoming marginal.

Mathematica has more visibility, a larger curated data layer, and a language that people either love or find impenetrable. SymPy is free, embedded in the Python ecosystem, and good enough for a large fraction of what students and engineers need. Sage bundles many open-source engines behind a single interface. Maple retains particular strengths in differential equations, where its solver is widely regarded as the best available, and in exact arithmetic performance on certain classes of problem.

Its other position is institutional. Maple is embedded in engineering curricula and in the workflows of firms that adopted it decades ago, along with Maple T.A. and its successors for automated assessment. That kind of adoption is slow to build and slow to leave.

## The connection to everything else on this site

Maple belongs in a publication about artificial intelligence and mathematics for a reason that has nothing to do with Maple having AI features, though recent releases do.

It is the clearest available example of the component that supplies certainty. When a language model produces an integral, the integral is a guess shaped like an answer. When Maple produces one, it ran the Risch algorithm or a decision procedure derived from it, and the result is correct or the system tells you it could not find one in closed form.

The failure modes are opposite in the most useful way. Maple fails loudly, returning an unevaluated expression, and it fails on input it cannot parse or conditions it has not been told. A language model fails silently, in fluent prose, and it fails most often on exactly the long exact computations Maple was built for.

Every reliable workflow described elsewhere on this site is some arrangement of those two halves. The forty-five-year-old system is the half that cannot be wrong, and the reason it cannot be wrong is that a group in Waterloo could not afford the memory to run anything bigger.
