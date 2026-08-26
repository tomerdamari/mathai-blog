---
title: "Ten Math Riddles and How Machines Handle Them"
description: "Some puzzles a language model solves instantly. Some it solves by pattern-matching a famous answer that does not apply. The gap between the two is the interesting part."
category: Puzzles
author: Yonatan Peled
date: 2026-08-06
readingTime: "11 min read"
---

Riddles are a poor benchmark and an excellent diagnostic. Poor benchmark because the famous ones are all over the training data, complete with worked solutions, so a correct answer proves nothing about reasoning. Excellent diagnostic because you can take a famous riddle, change one detail so the standard answer becomes wrong, and watch what happens.

Here are ten, with the honest picture of how current models handle each. Try them yourself first.

## 1. The bat and the ball

A bat and a ball cost 1.10 together. The bat costs 1.00 more than the ball. How much is the ball?

The intuitive answer is 0.10, and it is wrong. If the ball were 0.10 the bat would be 1.10 and the total 1.20. Let the ball be x. Then x plus x plus 1 equals 1.10, so x is 0.05.

This is the most-cited item from Shane Frederick's Cognitive Reflection Test, and roughly half of tested undergraduates get it wrong. Modern language models get it right essentially always, which tells you nothing, because it appears thousands of times in training text.

Change the numbers. Bat and ball cost 5.40, bat costs 4.60 more. Ball is 0.40. Models still handle this reliably, which does suggest the structure was learned rather than the answer memorised.

## 2. The lily pads

A patch of lily pads doubles in size every day. It covers the lake on day 48. On what day did it cover half the lake?

Day 47. Reliable across models and worth keeping because it is the cleanest illustration of how badly human intuition handles exponentials, which is a habit worth carrying into any argument about growth curves.

## 3. Monty Hall

Three doors, a car behind one, goats behind two. You pick door one. The host, who knows where the car is, opens door three to reveal a goat and offers you the switch. Do you switch?

Yes. Switching wins two times in three. The intuition that trips people is that the host's choice is not random. He will never open the door with the car and never open your door, so his action carries information about doors two and three collectively.

Models answer this correctly and confidently. Now change it. Suppose the host does not know where the car is, opens door three at random, and it happens to contain a goat. Now switching gives no advantage; both remaining doors are at 1/2. This variant, sometimes called Monty Fall, is a good stress test. Models are noticeably less reliable here, and a common failure is reciting the standard 2/3 answer with the standard justification while the premise no longer supports it.

## 4. Two envelopes

You are given two envelopes. One contains twice as much money as the other. You open one and find 100. Should you switch?

The tempting argument: the other envelope holds either 50 or 200, each equally likely, so its expected value is 125, so switch. But by symmetry the same argument applies before you open anything, and after you switch it applies again, which would have you swapping forever.

The error is assuming a uniform prior over an unbounded range, which is not a probability distribution. Once you specify an actual prior over the amounts, the paradox dissolves and switching is sometimes right and sometimes wrong depending on what you found.

Models usually identify this as the two-envelope problem and produce a serviceable summary. Push them on which specific step of the naive expected-value calculation is invalid and the answers get vaguer.

## 5. The hundred prisoners and the boxes

A hundred prisoners are numbered. In a room are a hundred boxes, each containing one prisoner's number in random order. Each prisoner may open fifty boxes, looking for their own number. All must succeed or all are executed. No communication once it starts. What strategy gives the best odds?

Random opening gives each prisoner 1/2 and the group 2 to the power of minus 100, which is nothing. The good strategy: each prisoner opens the box with their own number, reads the number inside, opens that box, and follows the chain.

This succeeds for everyone exactly when the random permutation has no cycle longer than fifty. The probability of a long cycle is a harmonic sum, and the survival probability comes out around 31 percent. Not 31 percent per prisoner. Thirty-one percent for all hundred simultaneously.

The result feels impossible and it is correct. Models will produce it, with the cycle argument, because it is a well-known puzzle. Ask for the exact probability as a harmonic expression and the derivation is where errors creep in.

## 6. Blue eyes

An island has a hundred people with blue eyes and a hundred with brown. Nobody knows their own eye colour, no mirrors, no discussion of eyes. Anyone who deduces their own colour must leave at midnight. A visitor announces publicly that they can see at least one person with blue eyes.

Everyone already knew that. Yet on the hundredth midnight, all hundred blue-eyed people leave.

The induction: with one blue-eyed person, they see nobody else blue and leave immediately. With two, each sees one other, expects them to leave on night one, and when they do not, both deduce their own colour on night two. And so upward.

What the announcement adds is not the fact but the common knowledge of the fact. Everyone knew it; not everyone knew that everyone knew that everyone knew it, to the required depth. This distinction between mutual and common knowledge is the whole content of the puzzle, and it is a real concept with real consequences in distributed systems and game theory.

Models reproduce the induction competently. They are much weaker when asked to state precisely what changes in the knowledge structure at each level.

## 7. The surprise examination

A teacher announces an exam next week that will be a surprise: on the morning of the exam, students will not know it is that day. A student argues it cannot be Friday, since by Thursday evening only Friday remains and it would not be a surprise. Eliminating Friday, it cannot be Thursday by the same reasoning. And so on back through Monday. The exam cannot happen. On Wednesday it happens, and it is a surprise.

There is no consensus resolution. The literature runs to hundreds of papers, with treatments through epistemic logic, self-reference and the Knower paradox. This is a good item precisely because there is no answer to memorise. A model that presents a confident resolution is telling you more about its calibration than about the paradox.

## 8. The wine and water

Two glasses, one of wine and one of water, equal volumes. Take a spoonful of wine, stir it into the water. Take a spoonful of that mixture back into the wine. Is there more wine in the water glass or more water in the wine glass?

Exactly equal. Both glasses end at their original volume, so whatever volume of wine is missing from the wine glass has been replaced by exactly that volume of water. No calculation required, and the result is independent of how much you stirred, how many spoonfuls you moved, or whether the mixing was thorough.

The conservation argument is short and total. Models often reach the right answer through an algebraic slog with a specific spoon size instead, which works but misses the point.

## 9. Three hats

Three people in a line, each wearing a hat that is black or white, each able to see only the hats in front. Starting from the back, each says whether they know their own colour. Given a particular pattern of answers, deduce the arrangement.

These are cleanly solvable by case elimination and models handle them well. The failure mode appears when you change the visibility rules or let the participants answer out of order. Then the model frequently applies the standard solution's reasoning steps to a configuration where they no longer hold.

## 10. Ants on a pole

Twenty-five ants are placed on a metre-long pole at random positions, each facing left or right. All walk at one centimetre per second. When two meet, both reverse direction instantly. What is the longest time before the pole is clear?

One hundred seconds. Two ants colliding and reversing is indistinguishable from two ants walking through each other, if you stop tracking identities. So treat them as passing through. Each ant then walks in a straight line and the worst case is one ant at one end walking the full length.

This is the loveliest reframing in the list, and it is the sort of insight that pure search never finds. Models produce it, because the puzzle is well known. Change it to ants of different speeds and the pass-through trick fails, since identities now matter, and the answers degrade quickly.

## What the pattern suggests

Across all ten, the reliable answers cluster on famous problems with famous solutions. The unreliable answers cluster on variants where the famous solution is a trap.

That does not mean nothing is being learned. The bat-and-ball generalises to new numbers, which is genuine. But it does mean that a correct answer to a classic puzzle is close to worthless as evidence about reasoning, and that if you want to know what a system can actually do, you have to write a problem nobody has written before.
