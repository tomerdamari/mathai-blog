---
title: "Hunting Primes with a Distributed Machine"
description: "The largest known prime has over 41 million digits. Finding it required a test from 1878, a transform from 1965, and thirty years of volunteers running software in the background."
category: History
author: Miriam Adler
date: 2026-06-11
readingTime: "9 min read"
---

In October 2024 a former Nvidia employee named Luke Durant found a prime number with 41,024,320 digits. Written out at normal type size it would fill roughly fifteen thousand pages.

The number is 2 raised to the power of 136,279,841, minus one. It is the 52nd known Mersenne prime, and it was found by the Great Internet Mersenne Prime Search, a volunteer computing project that has been running since 1996.

The story of how you check whether a number that large is prime is a good illustration of how mathematical insight and raw computation combine, and it has almost nothing to do with machine learning, which is part of why it is worth telling.

## Why Mersenne numbers

A Mersenne number is one less than a power of two. Written in binary it is a string of ones.

They matter for primality searching for one reason: there is a primality test for Mersenne numbers that is far faster than anything available for general numbers.

The Lucas-Lehmer test, developed by Édouard Lucas in 1878 and refined by Derrick Lehmer in the 1930s, works like this. To test whether 2 to the power p minus 1 is prime, for odd prime p, start with s equal to 4. Repeat p minus 2 times: replace s with s squared minus 2, reduced modulo the Mersenne number. If the final value is zero, the number is prime. Otherwise it is composite.

That is the whole test. It is deterministic, not probabilistic. It gives a definite answer.

The cost is p minus 2 squarings of a number with p bits. For the record prime that is about 136 million squarings of a 136-million-bit number, which is why this is a supercomputing problem despite being a simple loop.

## The transform that makes it feasible

Multiplying two numbers with 136 million bits by the schoolbook method takes on the order of the square of that, which is unworkable.

The Schönhage-Strassen algorithm, and in practice the irrational base discrete weighted transform developed by Richard Crandall and Barry Fagin, reduce large-number squaring to a fast Fourier transform. Represent the number as a sequence of digits in some base, take an FFT, multiply pointwise, take an inverse FFT, propagate carries.

This brings the cost per squaring down to roughly n log n. It is what makes the search possible at all, and it is a genuinely deep piece of algorithmic mathematics sitting under what looks like brute force.

The floating-point FFT introduces a hazard. Round-off error can corrupt a result silently, and a single bad bit invalidates everything downstream. GIMPS clients monitor the maximum round-off error each iteration and abort if it approaches the danger threshold. Results are also verified by an independent run on different hardware with a different FFT size, and since 2020 by a much cheaper probabilistic verification scheme based on Robert Gerbicz's error-checking method, which catches errors during the computation rather than after.

## The project

George Woltman released the software in 1996 and the project has run continuously since. At its core it is a work distribution server, a highly optimised client, and a lot of volunteers.

Seventeen primes have been found by GIMPS participants. The Electronic Frontier Foundation offered prizes for primes crossing digit thresholds, and GIMPS claimed the awards for the first ten-million-digit prime in 2008. Two further prizes, for one hundred million and one billion digits, remain unclaimed.

For most of the project's history the work ran on ordinary desktop CPUs. The 2024 find was different: Durant assembled a distributed GPU cluster across cloud providers in multiple countries, and the discovery was made on an Nvidia A100 in Dublin, confirmed on an H100 in Texas. It was the first Mersenne prime found on a GPU rather than a CPU, and it marks a shift in what the project's hardware base looks like.

## What is not known

Whether there are infinitely many Mersenne primes is open. The Lenstra-Pomerance-Wagstaff conjecture predicts, from heuristic arguments about the density of primes, that there are infinitely many and gives an expected distribution of the exponents. The observed data fits the prediction reasonably well, which is evidence of the softest kind.

Whether there are any odd perfect numbers is also open, and it is connected. Euclid showed that if 2 to the p minus 1 is prime then 2 to the p minus 1 times that is perfect, and Euler showed every even perfect number has this form. So each Mersenne prime gives an even perfect number and there are exactly 52 known. Nobody has found an odd one, and it is known that any odd perfect number must exceed 10 to the power of 1500 and satisfy a long list of restrictive conditions.

## Where a learning system could help, and does not

The obvious question is whether machine learning could speed the search.

For the primality test itself, no. The Lucas-Lehmer test is exact, deterministic and already optimal in structure. There is nothing to approximate.

For candidate selection there is a little room. Before running the expensive test, GIMPS trial-divides candidates by small factors and runs P-1 and elliptic curve factorisation attempts to find factors cheaply. Roughly two-thirds of candidates are eliminated this way, saving the full test. Deciding how much effort to spend on factoring before committing to the Lucas-Lehmer test is an optimisation problem with real structure, and the project's parameter choices are hand-tuned. A learned policy could plausibly do better. The gains would be measured in single-digit percentages.

That is the honest ceiling. This is a domain where the mathematics is exact, the algorithms are near-optimal, and the remaining work is engineering. There is no gap for a pattern-matching system to fill.

## Why that matters

There is a tendency to assume that every computational problem has an AI angle. A great deal of computational mathematics does not.

The problems where learning helps are the ones with large search spaces, weak signals about which direction is promising, and cheap verification. Proof search has that shape. Conjecture generation has that shape. Matrix multiplication algorithm discovery has that shape.

Primality testing of Mersenne numbers has none of it. The search space is a list of exponents to try in order. The signal is a deterministic test. There is nothing to guess.

GIMPS has been running for thirty years on the strength of a nineteenth-century theorem, a twentieth-century transform, and volunteers who leave a program running. Occasionally the most sophisticated available approach is the one that was already there.
