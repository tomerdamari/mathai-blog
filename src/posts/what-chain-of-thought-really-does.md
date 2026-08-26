---
title: "What Chain of Thought Really Does"
description: "Asking a model to think step by step improves mathematical accuracy substantially. The reason is computational rather than psychological, and the distinction has consequences."
category: Explainers
author: Yonatan Peled
date: 2026-06-27
readingTime: "9 min read"
---

In 2022 a paper from Jason Wei and colleagues at Google showed that prompting a large language model to produce intermediate reasoning steps before its final answer raised accuracy on grade-school word problems from around 18 percent to around 57 percent. The technique was called chain-of-thought prompting. A follow-up found that appending the phrase "let us think step by step" achieved much of the same effect with no examples at all.

This got read as evidence that models can reason when encouraged to. That reading is roughly backwards, and the accurate version is more useful.

## The depth constraint

A transformer processes its input through a fixed number of layers. GPT-scale models have somewhere between 50 and 150. Each layer performs a fixed amount of computation: attention over the sequence, then a feedforward transformation.

When the model generates a token, that is one pass through all the layers. Then the token is appended to the context and the next pass begins.

The consequence: the amount of computation available before emitting any single token is bounded, and the bound does not depend on how hard the question is. Asking for the answer to two plus two and asking for the answer to a twelve-step algebra problem allocate the same computational budget to the first output token.

This is a genuine, provable limitation. Transformers with fixed depth belong to a restricted circuit complexity class. There are problems, including composing a permutation many times and evaluating deeply nested boolean formulas, that cannot be solved in constant depth regardless of network width.

Some computations require a number of sequential steps that grows with input size, where each step needs the previous step's result. No amount of parallel work substitutes. Long multiplication is one. Iterating a function is another. Following a chain of dependencies through a graph is another.

## What generating tokens buys

Every generated token is another full pass through the network, and the model can read everything it has already written.

So if the model writes an intermediate result, that result now exists in the context, and subsequent passes can use it as an input rather than recomputing it. The sequence of generated tokens becomes a working memory, and the number of sequential computational steps available becomes proportional to the number of tokens generated rather than to the depth of the network.

Theoretical work has made this precise. Transformers with chain of thought of polynomial length can simulate polynomial-time computation, which places them in a substantially larger complexity class than the same models answering directly. The scratchpad is not a metaphor. It is a tape.

That is what chain of thought does. It converts a depth-bounded computation into a length-bounded one, and length is much cheaper to buy.

## Why the psychological framing misleads

If you believe chain of thought works because the model is thinking more carefully, several wrong predictions follow.

You would expect the written reasoning to describe what the model actually did. It often does not. Studies on faithfulness have shown that models produce reasoning chains that do not reflect the factors driving their answers. In one line of work, inserting a bias into the prompt, such as always marking option A as correct in the examples, changed the model's answers while the stated reasoning never mentioned the pattern and instead constructed a justification for the biased answer.

You would expect encouraging phrases to help through some motivational channel. They help through a distributional channel: the phrase shifts the model toward text that resembles worked solutions, and worked solutions contain intermediate steps.

You would expect that more elaborate reasoning always helps. It does not. On simple tasks, forced step-by-step reasoning sometimes reduces accuracy, apparently by introducing opportunities for error into a computation that fit in one pass anyway. There is also a documented effect where reasoning about tasks that humans perform better intuitively, such as certain visual or grammatical judgements, degrades model performance in a way that parallels the psychology literature on verbal overshadowing.

## The reasoning models

Since 2024, a class of models has been trained specifically to produce long internal reasoning traces before answering, using reinforcement learning against verifiable outcomes. Mathematics and code are the natural training domains because correctness is checkable automatically.

These systems generate thousands of tokens of internal work on a hard problem, including backtracking, checking their own steps and trying alternative approaches. Performance on competition mathematics improved dramatically.

The mechanism is the same one. More tokens, more sequential computation. What changed is that the model was trained to use those tokens productively rather than prompted into it, and that the training signal came from whether the final answer was right rather than from imitating human-written solutions.

An important consequence: performance now scales with inference-time compute. Letting the model think longer produces better answers, up to a point, which is a different scaling axis from making the model larger. This has become a central design consideration.

The faithfulness problem did not go away. The visible trace is still not guaranteed to be the computation. Providers differ in whether they show it, and some show a summary rather than the raw trace.

## Practical consequences

If you want a hard mathematical question answered well, give the model room. Do not ask for the answer only. Do not impose a length limit that forces compression. The tokens are the computation.

If you want to know whether an answer is right, do not read the reasoning as evidence. A well-formed chain of thought is not a proof that the process was sound. Check the answer directly by the methods that apply to any claimed result.

If you are checking a specific step, extract it and ask about it in isolation. A step embedded in a long chain gets carried by the surrounding fluency. The same step alone gets evaluated.

If the task genuinely requires exact computation, give the model a tool. Chain of thought makes arithmetic better. An interpreter makes it correct.

## The honest summary

Chain of thought is a real and important technique whose effect size on mathematical tasks is large. The mechanism is that generating tokens buys sequential computation that the architecture otherwise cannot provide.

It is not introspection. The trace is output, and output is generated the same way all output is generated, by predicting likely continuations. Sometimes those continuations happen to be a faithful record of the computation. There is no mechanism guaranteeing it and there is evidence that it frequently is not.

Both things are true at once, and holding both is the whole of understanding what these systems do when they appear to reason.
