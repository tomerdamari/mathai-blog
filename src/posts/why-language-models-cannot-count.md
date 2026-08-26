---
title: "Why a Language Model Cannot Count the R's in Strawberry"
description: "The most famous failure of modern AI is not a reasoning failure. It is a data representation problem, and understanding it tells you exactly when to trust a model with numbers."
category: Explainers
author: Yonatan Peled
date: 2026-08-14
readingTime: "8 min read"
---

Ask a state-of-the-art language model how many times the letter R appears in the word strawberry, and for several years the answer was two. The correct answer is three. This became a running joke, then a benchmark, then a genre of screenshot. It is worth understanding properly, because the same mechanism explains a much more consequential failure: why models are shaky at arithmetic on numbers they have not effectively memorised.

## The model does not see letters

A language model does not receive text. It receives tokens, which are integer identifiers drawn from a fixed vocabulary of typically 50,000 to 200,000 entries. The text is chopped into these pieces by a tokeniser before the model sees anything, usually with an algorithm called byte pair encoding.

Byte pair encoding builds its vocabulary greedily. Start with individual bytes, then repeatedly find the most frequent adjacent pair in the training corpus and merge it into a new single token. Do this a hundred thousand times and you end up with a vocabulary where common words are single tokens, common word fragments are single tokens, and rare sequences fall back to smaller pieces.

Under a typical vocabulary, strawberry becomes something like `str` `aw` `berry`. Three integers. The model never receives a sequence of eight characters. It receives three opaque symbols whose internal spelling is not part of the input at all.

So when you ask how many R's it contains, the model has to answer a question about information that was destroyed before the first layer of the network ran. It can only answer from statistical association: what it has read *about* the spelling of words, in text that discusses spelling. That is a much weaker signal than looking, and it is why the failure was so stubborn.

Think of it as asking someone to count the letters in a word they have only ever heard spoken in a language whose spelling is irregular. They can often guess correctly. They are guessing.

## The same problem, with digits

Now consider a number like 4,817,293. How does a tokeniser split that?

It depends entirely on the tokeniser. Some split digits into groups of three from the left, which is not how place value works. Some produce chunks of one, two or three digits based on frequency in the training corpus, so `481` might be a single token because it appeared often, while `7293` becomes `72` and `93`. Some tokenisers used to split inconsistently depending on whether a comma or a space preceded the number.

The consequence is that the model's internal representation of a number is not positional in any clean way. To add two numbers correctly, an algorithm needs to align digits by place value and propagate carries. A model working from irregular chunks has to reconstruct place value from context before it can do anything else.

The best current models handle this considerably better than earlier ones, mostly through two fixes. Several vocabularies now force digits to tokenise one at a time or in fixed groups, which restores a consistent positional structure. And models are explicitly trained on large quantities of synthetic arithmetic with worked intermediate steps.

But the underlying situation has not changed. Arithmetic in a language model is a learned approximation of an algorithm, not the algorithm. It degrades as numbers get longer, exactly where a real algorithm would not.

## Why chain of thought helps

If you ask a model for the product of two four-digit numbers and demand only the answer, accuracy is poor. If you ask it to work through the multiplication in the way a schoolchild would, writing partial products and adding them, accuracy improves a great deal.

The reason is not that the model is thinking harder. A transformer performs a fixed amount of computation per token generated. There is a hard ceiling on how much work can happen between reading your question and emitting the first token of the answer. It is a fixed-depth circuit, and long multiplication requires a number of sequential steps that grows with the length of the numbers.

Writing intermediate steps moves that computation into the output sequence, where it is no longer bounded by network depth. Each partial product is a small enough operation to fit in one forward pass. The model then reads its own written work as context for the next step. Chain of thought converts a depth problem into a length problem, and length is cheap.

This is a genuinely useful mental model. When a task needs a number of sequential dependent operations, either the model writes those operations out, or it does not perform them.

## The correct fix

Neither better tokenisation nor longer chains of thought is the real answer for arithmetic. The real answer is that the model should not be doing arithmetic at all.

Calculators exist. They are exact, they are older than the transistor, and they cost nothing to run. Any serious deployment gives the model a tool: a sandboxed interpreter, a calculator function, a computer algebra system. The model's job becomes translating the problem into a form the tool can evaluate, reading the result, and interpreting it. That is the part language models are genuinely good at.

This pattern generalises far past arithmetic. The model is a translator between informal human framing and formal machinery. The formal machinery is what you trust. When someone shows you an impressive mathematical output from an AI system, the useful question is always which component produced the guarantee.

## What this means for you

Three practical rules follow.

First, treat any unverified number in a model's output as a rough estimate, including numbers that look precise. Precision in the rendering tells you nothing about precision in the derivation. A model will write 0.03847 with the same confidence it writes 0.04.

Second, when you need arithmetic, make the tool call explicit. Ask for code, run the code. If the interface offers a code execution tool, turn it on. The difference in reliability is not marginal.

Third, remember that the failure is silent. A model that cannot count letters does not tell you it cannot count letters. It answers two, in a fluent sentence, with no hedge. This is the general shape of the problem: the confidence of the output is roughly uncorrelated with its correctness on tasks the architecture cannot support.

## A footnote on the strawberry

Newer models mostly answer three now, and it would be easy to read that as the problem being solved. It is worth being careful there. Some of the improvement is better tokenisation. Some is that models now often spell the word out character by character before counting, which is the chain of thought fix. And some is simply that the strawberry question appeared in so much training text, complete with its answer, that the response is now close to memorised.

Test it yourself on a word nobody has written a viral post about. Pick something long with a repeated letter buried in the middle. The failure mode is often still there, just less famous.
