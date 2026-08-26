---
title: "AI Tutors and What Mathematics Teaching Actually Needs"
description: "A system that answers every question instantly may be solving the wrong problem. The evidence on learning outcomes is thinner and more interesting than the marketing."
category: Practice
author: Yonatan Peled
date: 2026-06-15
readingTime: "10 min read"
---

The pitch for AI tutoring is Bloom's two sigma problem. In 1984 Benjamin Bloom reported that students receiving one-to-one tutoring performed about two standard deviations better than students in conventional classrooms, which would move a median student to the 98th percentile. The obvious question was how to deliver tutoring at scale, and for forty years the answer was that you cannot afford to.

Language models make one-to-one interaction cheap. The inference is that they should deliver Bloom's effect.

The inference has problems, starting with the finding itself. The two sigma result came from small studies with specific conditions, including mastery learning where students could not advance until they demonstrated competence. Replications have generally found smaller effects, often around 0.4 standard deviations for human tutoring, which is a good effect size and not a transformative one. The two sigma number has taken on a life independent of its evidence base.

But the more useful objection is about what tutoring does.

## The bottleneck is not explanation

Mathematics teachers do not primarily fail because they cannot explain. Explanations are abundant. Every topic in the secondary curriculum has hundreds of good video explanations available free, and has for fifteen years.

What a good tutor provides is different. They notice which specific misconception a student holds, which is usually not the one the student describes. They decide when to let a student struggle and when to intervene. They calibrate difficulty so that work is hard enough to produce learning and not so hard as to produce despair. They notice when a student has stopped thinking and is pattern-matching. They maintain a model of what this particular student knows, over months.

Some of these a language model does well. Diagnosis from a worked attempt is genuinely strong; models are good at looking at a wrong solution and identifying the specific error. Generating a practice problem targeting a particular skill at a particular difficulty is also strong, and it is tedious work that teachers have limited time for.

Others it does badly by default, and the worst is the struggle question.

## The desirable difficulties problem

There is a substantial literature, associated with Robert and Elizabeth Bjork, on desirable difficulties. Conditions that make learning feel harder and slower often produce better long-term retention and transfer. Spacing practice out. Interleaving problem types instead of blocking them. Testing yourself instead of rereading. Attempting a problem before being shown the method, even when the attempt fails.

The last one has a specific name, productive failure, studied extensively by Manu Kapur. Students who attempt problems they cannot solve, before instruction, outperform students who receive instruction first, on measures of conceptual understanding and transfer. The failure is doing work.

A system optimised to be helpful undermines all of this. Ask a language model a maths question and the default behaviour is to answer it, clearly and completely. That is the trained behaviour, reinforced by human raters who preferred complete helpful answers. It is precisely the intervention that removes the difficulty.

The student experience is smooth. Every obstacle dissolves on contact. Nothing is retained, because nothing was effortful, and the fluency of the explanation produces a strong feeling of understanding that is not correlated with the ability to reproduce the reasoning later. This gap between felt understanding and actual competence is well documented and it predates AI. Watching someone solve a problem feels like learning to solve it.

## What the evidence says so far

The studies that exist are early and the results are not uniform.

A widely cited 2023 study of a Turkish high school found that students given unrestricted access to a chatbot for practice problems performed better on those practice problems and worse on a subsequent exam without access, compared to a control group. A version with a tutor-style system prompt that withheld direct answers did not show the same exam penalty.

Work on Khanmigo, Khan Academy's tutoring system built explicitly to withhold answers and ask questions instead, has reported more favourable results, though much of it comes from the organisation deploying it.

A 2024 randomised study at a large university using a tutoring system designed around research on learning found meaningful gains over an active control. The design mattered: the system used retrieval practice, spacing and prompted self-explanation.

The pattern across these is fairly consistent. Systems designed as answer engines produce worse learning than no system. Systems designed around learning science produce gains. The model is the same in both cases. The scaffolding is what differs.

## What a defensible design looks like

Withhold the answer. The single most important design decision. When a student asks how to solve a problem, respond with a question that isolates where they are stuck. This has to be enforced in the system prompt and it has to survive pressure, because students will push for the answer and a model trained to be agreeable will eventually give it.

Require an attempt first. Do not engage with a problem the student has not tried. The attempt is where the diagnostic information is, and it is also where the learning is.

Space and interleave. A student who has just learned a technique should encounter it again in three days mixed with other techniques, not twenty more instances of it immediately. This requires tracking state over time, which most chat interfaces do not do.

Ask for explanation. Having a student articulate why a step works produces more learning than having them execute the step. Models are good at evaluating explanations and at noticing when one is hollow.

Check arithmetic with a tool. A tutor that makes arithmetic errors is worse than no tutor, and this is a solved problem.

Be honest about uncertainty. When a student's approach is unusual but possibly valid, the correct response is to work through it rather than to steer back to the standard method.

## The teacher question

The realistic near-term effect is not replacement. It is a change in what teachers spend time on.

Generating differentiated practice sets, writing worked solutions, producing variants of a problem at three difficulty levels, drafting feedback on common errors: these consume large amounts of teacher time and are largely mechanical. Automating them returns hours per week.

The work that does not automate is the work that depends on knowing a specific child. Noticing that a student who was engaged in September has stopped. Deciding that this class needs to slow down. Knowing that a particular student's confusion about fractions traces to something from two years ago. None of that is in the transcript.

There is a version of this that goes badly, where the automated components are used as a reason to increase class sizes, and the relational work that was the actual value gets squeezed out. That is a policy choice rather than a technology outcome, and it is the one worth watching.

## What to tell a student

If you are using these tools to learn rather than to finish homework, three rules cover most of it.

Attempt first, always, and get far enough to be genuinely stuck at an identifiable point. Then ask about that point rather than the problem.

Ask for a hint, not a solution, and say so explicitly. The model will comply if asked.

After you get an explanation, close it and reproduce the argument from memory on paper. If you cannot, you did not learn it, whatever it felt like. This step is the whole difference and it is the one everybody skips.
