---
title: "Base Rates, Bayes, and How to Read a Claim About AI"
description: "The mathematics of updating on evidence is a hundred lines of secondary-school algebra, and it dissolves most arguments about what machines can do."
category: Analysis
author: Yonatan Peled
date: 2026-06-03
readingTime: "9 min read"
---

A test for a disease is 99 percent accurate. One person in ten thousand has the disease. You test positive. What is the probability you have it?

The common answer is 99 percent. The correct answer is about one percent.

Out of a million people, a hundred have the disease and 999,900 do not. The test catches 99 of the hundred. It also produces false positives on one percent of the healthy population, which is 9,999 people. So among 10,098 positive results, 99 are genuine. Slightly under one in a hundred.

The test did not lie. It moved you from a one in ten thousand chance to a one in a hundred chance, which is a hundredfold update. It is just that a hundredfold update from a very small number is still a small number.

This is base rate neglect and it is the single most useful piece of applied mathematics for evaluating claims about anything, including claims about artificial intelligence.

## The formula

Bayes's theorem says the probability of a hypothesis given evidence equals the probability of the evidence given the hypothesis, times the prior probability of the hypothesis, divided by the total probability of the evidence.

The version worth memorising is in odds form, because it is easier to use in your head.

Posterior odds equal prior odds times the likelihood ratio.

The likelihood ratio is how much more likely this evidence is if the hypothesis is true than if it is false. Multiply your starting odds by it.

In the disease example: prior odds are 1 to 9,999. The likelihood ratio for a positive test is 0.99 divided by 0.01, which is 99. Multiply: 99 to 9,999, or about 1 to 101. Same answer, less arithmetic.

## Applying it to capability claims

Suppose you read that a system scored 90 percent on a mathematics benchmark. What should you conclude about whether it can do mathematics?

Set up the question properly. Hypothesis: the system has general mathematical capability of the kind the benchmark is meant to measure. Evidence: a 90 percent score.

The likelihood ratio requires asking how likely a 90 percent score is under the alternative hypothesis, which is that the system has narrow, contamination-assisted, benchmark-specific competence.

Under that alternative, a high score is also quite likely, because contamination produces high scores. So the likelihood ratio is close to one, and a close-to-one likelihood ratio means the evidence barely moves you.

This is why benchmark scores feel less informative than they should. The evidence is consistent with both hypotheses, so it does not discriminate between them.

Now suppose instead the evidence is a 90 percent score on problems written after the training cutoff, by people who did not publish them, in a format the system has not seen. Under the narrow-competence hypothesis that outcome is unlikely. The likelihood ratio is large and the evidence moves you a great deal.

The lesson is not that benchmarks are useless. It is that evidence is informative in proportion to how unlikely it would be if you were wrong.

## Where the priors come from

The honest difficulty with Bayesian reasoning outside textbook problems is that priors are not given.

Two disciplines help.

Reference classes. Instead of asking how likely this particular claim is, ask what happened to similar claims. Of the claimed proofs of the Riemann hypothesis posted in the last twenty years, how many held up? Of the AI capability announcements that specified a timeline, how many hit it? The reference class rate is your starting point, and it is usually more informative than any argument about the specific case.

Sensitivity checking. If you cannot settle on a prior, try several and see whether the conclusion changes. If a claim survives from prior 0.01 to prior 0.5, the prior is not doing the work and you can stop arguing about it. If the conclusion flips, you have identified where the actual disagreement lives, which is progress.

## The conjunction problem

A related failure. People systematically rate specific, detailed scenarios as more probable than the general categories containing them, because detail makes a story feel plausible.

Amos Tversky and Daniel Kahneman's original demonstration involved a character description followed by two options: that she is a bank teller, or that she is a bank teller active in the feminist movement. Most people chose the second, which is impossible, since every feminist bank teller is a bank teller.

This is directly relevant to forecasting. A detailed narrative about how AI systems will transform mathematics, specifying which techniques, in which order, with which consequences, is strictly less likely than the vague claim that AI will affect mathematics somehow. Each additional specific makes the conjunction less probable while making it feel more credible.

When you encounter a compelling detailed scenario, count the conjunctions. Five independent claims each at 80 percent gives you 33 percent for the whole story.

## What this looks like in practice

Three habits follow.

When someone reports a striking result, ask what would have been reported if the result had been unremarkable. If the answer is nothing, you are looking at a filtered sample and the base rate is unknown. Selection effects account for most of the difference between what a field looks like from outside and what it looks like from inside.

When someone reports a percentage, ask for the denominator and the absolute numbers. A doubling of risk means one thing at a base rate of 40 percent and something entirely different at a base rate of one in a million. Reporting relative change without the base is the most common way to be technically accurate and materially misleading.

When you find yourself confident after reading one source, ask what the likelihood ratio actually was. A single article, however well written, rarely justifies a large update, because articles that argue a position exist regardless of whether the position is correct.

## The connection back to machines

Language models are trained on text, and text is a filtered sample of the world. Interesting things get written about. Boring things do not. Successful projects publish. Failed ones often do not.

So a model's implicit priors are the priors of published text, which are systematically shifted toward the remarkable. Ask a model how likely a startup is to succeed and the answer reflects the distribution of startup stories that got told, not the distribution of startups.

This is not a flaw that better training fixes, because the filtering happened before the data existed. It is a reason to supply base rates yourself when you want a calibrated answer, and to treat any probability a model states without a stated reference class as an impression rather than an estimate.

The mathematics here is elementary. It fits on an index card. What makes it hard is that using it requires noticing that a question about probability is being asked, and most of the time nobody says so.
