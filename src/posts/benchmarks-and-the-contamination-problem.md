---
title: "The Benchmark Problem: Why Math Scores Keep Going Up and Meaning Less"
description: "GSM8K, MATH, MMLU, AIME. Every headline number rests on an assumption that the test questions were not in the training data, and that assumption is usually unverifiable."
category: Analysis
author: Yonatan Peled
date: 2026-07-25
readingTime: "10 min read"
---

In 2021 a language model that scored 55 percent on GSM8K was a research result. By 2024 the benchmark was effectively saturated, with frontier systems above 95 percent. The natural reading is that models got roughly twice as good at grade-school arithmetic word problems in three years.

The natural reading may be right. It is also not something anyone can verify, and the reasons why are worth understanding in detail, because they apply to every benchmark number you will ever read.

## The benchmarks

GSM8K is 8,500 grade-school word problems written by human contractors, released by OpenAI in 2021. Two to eight steps of elementary arithmetic each. It was designed to be easy for a person and hard for the models of the time.

MATH is 12,500 competition problems from AMC, AIME and similar sources, released by Dan Hendrycks and colleagues, graded by difficulty from one to five. Full worked solutions in LaTeX. Considerably harder.

MMLU includes mathematics subsets alongside 57 other subjects. AIME problems from recent years get used as a rolling benchmark because new ones appear annually. FrontierMath, released by Epoch AI in late 2024, consists of unpublished research-level problems specifically designed to resist the contamination problem. GPQA does something similar for graduate science.

## What contamination means

A benchmark measures generalisation only if the model has not seen the test items. Language models are trained on scraped web text. GSM8K is on GitHub, on Hugging Face, in dozens of papers, in blog posts explaining individual problems, in forum threads where people paste problems and discuss solutions.

There is no clean way to exclude all of that. Model developers run decontamination filters, typically looking for n-gram overlap between training documents and test items. These filters catch exact copies. They do not catch a paraphrase, a translation, a problem with the numbers changed, or a discussion that states the answer without quoting the question.

Nor do they catch the fact that a benchmark's *distribution* leaks even when its items do not. If a thousand blog posts explain how to solve GSM8K-style problems, a model trained on them learns the genre. That is arguably legitimate learning. It also means the benchmark no longer measures what it was designed to measure.

## The evidence that this is happening

Several studies have tried to separate genuine capability from memorisation, and the results are consistent enough to take seriously.

The GSM1K study from Scale AI in 2024 built a new benchmark matching GSM8K's distribution as closely as they could, with fresh problems written to the same specification. They then compared model performance on the two. Some model families performed nearly identically, which is the expected result if capability is real. Others dropped by up to thirteen percentage points. The drops correlated with how likely a model was to reproduce GSM8K items verbatim when prompted with their opening lines.

The GSM-Symbolic work from Apple researchers in 2024 took GSM8K problems and generated variants by changing names and numbers through templates. Performance dropped across every model tested. They also added a variant, GSM-NoOp, that inserted a clause which was topically relevant but logically irrelevant to the answer. Performance fell sharply, in some cases by more than half. A model that understood the problem would ignore an irrelevant clause. Many models incorporated it into the arithmetic.

Functional benchmarks, where each item is a template instantiated with fresh values at evaluation time, show similar gaps. The size of the gap is the closest thing we have to a contamination estimate.

## Why this is nobody's fault exactly

It would be easy to read this as developers gaming benchmarks. Mostly they are not. The structural problem is that a public benchmark is a public document, and any public document becomes training data for the next model. A benchmark begins to decay the moment it is published.

The obvious fix, a private held-out test set, has its own failure mode. If you cannot inspect the items, you cannot check that they are correctly labelled, that the problems are well-posed, or that the grading is fair. Several public benchmarks have known error rates in their answer keys, in the range of one to five percent, which puts a ceiling on meaningful scores that nobody accounts for when reporting 97 versus 98.

There is also a subtler pressure. Benchmark scores drive funding, hiring, publication and coverage. Nobody has to cheat for that pressure to distort what gets optimised. If a metric is the target, work flows toward the metric.

## How to read a benchmark claim

A few questions cut through most of the noise.

When was the benchmark released relative to the model's training cutoff? A model trained on data through 2025 evaluated on a benchmark published in 2021 tells you very little. The same model on a benchmark published after its cutoff tells you a great deal.

Was the evaluation run with the same prompting, tooling and sampling as the comparison points? Reported numbers often differ by ten points depending on whether tools were available, how many samples were taken, and whether the best of several attempts was scored. A pass-at-64 number and a pass-at-1 number are not comparable and are frequently presented side by side.

Is there a perturbed variant? If a paper reports performance on both the original benchmark and a symbolically perturbed version, and the gap is small, that is meaningful evidence. If the paper only reports the original, the number is an upper bound.

What is the human baseline, and was it measured the same way? Many benchmarks quote a human baseline collected under different conditions, sometimes from crowdworkers with a time limit, sometimes from experts with none.

## What is being done

FrontierMath took the approach of commissioning new, unpublished problems from research mathematicians and keeping most of them private. Early frontier model performance was in the low single digits, which was itself informative: the gap between competition mathematics and research mathematics is much wider than benchmark saturation suggested.

Live benchmarks that draw fresh items from ongoing competitions, such as AIME and Codeforces, get around contamination for as long as they stay ahead of training cutoffs. They have a natural sample-size limit, since a competition produces fifteen problems a year and the variance on fifteen items is large.

Formal verification benchmarks like miniF2F and the Lean-based evaluations sidestep the grading problem entirely, because a proof either type-checks or it does not. They do not sidestep contamination.

## The reasonable position

None of this means benchmark progress is fake. Models really did get much better at mathematics between 2021 and 2026, and anyone who has used them across that period can feel the difference without consulting a table.

It means the numbers are softer than they look, that differences of a few points between systems are usually noise, and that a jump from 92 to 96 on a saturated benchmark is not evidence of anything in particular. The useful signal now comes from problems that did not exist when the model was trained. Everything else is a measurement of how much of the internet ended up in the weights.
