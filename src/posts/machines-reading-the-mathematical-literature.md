---
title: "Machines Reading the Mathematical Literature"
description: "Turning a century of PDFs into something a computer can reason over is the unglamorous bottleneck under every claim about AI doing mathematics at scale."
category: Analysis
author: Dana Reisman
date: 2026-08-20
readingTime: "10 min read"
---

Every ambitious claim about artificial intelligence and mathematics rests on a quiet assumption: that the mathematical literature is available to the machine. Millions of papers, a couple of centuries of results, sitting there as training data or as a corpus to search.

It is available in the sense that the files exist. It is available in the sense a library is available to someone who cannot read the shelf labels. The corpus is overwhelmingly PDF, PDF records how a page looked rather than what it said, and the gap between those two things is where a surprising amount of the actual work in this field happens.

## The scale of what is there

arXiv holds well over two million preprints and takes more than twenty thousand a month. For submissions since 1991 the LaTeX source is usually available, which makes it the single most valuable mathematical corpus in existence, because the mathematics arrives as markup rather than as marks on a page.

Everything else is harder. zbMATH Open and MathSciNet index millions of items with reviews and metadata, but the reviews are prose about papers rather than the papers. Journal back catalogues digitised in the 1990s and 2000s are page images. Books are mostly scans. Theses vary by institution and are frequently the worst-formed documents in the whole ecosystem.

A reasonable estimate is that the fraction of the mathematical literature available in a form where the formulas are machine-readable, without recognition, is well under half, and heavily skewed toward physics-adjacent fields that adopted arXiv early and toward the last thirty years.

## What extraction pipelines do

A modern pipeline has four stages, and each loses something.

Layout analysis decides what is on the page: body text, headings, figures, captions, tables, display equations, footnotes, page furniture. This is object detection on a rendered page image, and it is largely solved for standard journal layouts and reliably wrong on two-column pages with figures spanning columns, on marginal notes, and on anything from before typesetting standardised.

Reading order reconstructs the sequence. Column detection carries most of it. Failures here produce text that is individually correct and globally scrambled, which is worse than it sounds because the scrambling is invisible in the output.

Text and formula recognition converts regions to characters and markup. Inline mathematics is the difficult case, because a symbol embedded in a sentence has to be recognised as mathematics before it can be parsed as mathematics, and the visual cue is often just an italic font.

Semantic recovery, where anyone attempts it, turns markup into meaning. LaTeX says how something is printed, not what it denotes. The same rendered expression can be a product, a function application, or a group action, and the source usually does not distinguish them.

## The evaluation problem

Reporting accuracy on formula recognition is harder than it looks, and the reported numbers are softer than they appear.

Exact string match against reference LaTeX punishes correct output that differs cosmetically. Writing `\frac{1}{2}` where the reference has `\dfrac{1}{2}`, or omitting braces that were not needed, counts as a miss while rendering identically.

Rendered-image comparison fixes that by compiling both and comparing pixels, which is the metric most current work uses. It has its own hole: two expressions that render identically can carry different meaning, and an expression that renders slightly differently may be mathematically identical.

Neither metric captures the failure that matters most in practice. A model trained to emit LaTeX emits syntactically valid LaTeX essentially always. When it is wrong, it is wrong in a way that compiles and renders and looks like mathematics. A dropped subscript, a sign that flipped, an exponent that migrated. Nothing downstream flags it.

That asymmetry is the reason extraction at scale needs verification from something that is not the extractor. Rendering the output and comparing images against the source crop is the cheap version and it catches most of it.

## Where this bites

Three consequences follow, and they are more concrete than the general worry.

Training data quality. A model trained on the mathematical literature is trained on whatever came out of somebody's extraction pipeline. Where the pipeline mangled formulas, the model learned mangled formulas. This is one plausible contributor to a pattern people notice: models are markedly better at mathematics phrased in prose and in common notation than at anything requiring unusual symbols, and the corpus is cleaner in exactly the same places.

Literature search. Searching for a theorem by its statement rather than by keywords requires the statements to be machine-readable. This is the capability mathematicians most consistently say they want, and it is blocked mainly by extraction rather than by search. Formula search exists in zbMATH and in specialised systems, and its coverage tracks the availability of clean markup.

Autoformalisation. Translating a paper into Lean requires reading the paper. If the pipeline delivers a corrupted statement, the formalisation is a faithful rendering of the wrong theorem, and the proof assistant will happily verify a proof of it. The type checker guarantees the proof matches the statement. Nothing guarantees the statement matches the paper.

That last point deserves emphasis because it inverts the usual comfort. Formal verification removes doubt about the proof and relocates all the remaining risk into the statement, and the statement came through the part of the pipeline with the weakest guarantees.

## What has improved

The last few years produced real gains, and they are worth stating precisely rather than dismissively.

End-to-end document models that take a page image and emit structured markup, Nougat being the widely used example, handle full pages including inline mathematics rather than requiring formula regions to be cropped first. On clean printed pages from the last two decades they are good enough to use as a first pass.

Vision-language models handle unusual layouts considerably better than rule-based systems, because they were not built around assumptions about column geometry. They also hallucinate more inventively, which is the tradeoff.

Handwriting recognition for mathematics has improved to the point where it is practical for lecture notes, which was not true five years ago.

None of this touches the fundamental issue. A recognised formula is a hypothesis about what was printed. Confidence in that hypothesis has gone from low to fairly high, and it has not become certainty, and the pipelines mostly do not report calibrated confidence at all.

## What would actually fix it

Two things, one boring and one already happening.

Publish the source. Where an author has LaTeX, making it available alongside the PDF eliminates the entire problem for that paper. arXiv has done this since the beginning. Most journals do not. This costs nothing technically and is a policy question.

Tag the output. PDF has carried a structural layer since 2001, and embedding MathML in it makes a document carry meaning alongside appearance. Recent LaTeX releases have made tagged output a priority and accessibility regulation is pushing publishers toward it. New documents will increasingly be fine.

Neither helps the existing corpus, which is the whole point. A century of mathematics was published in formats that record appearance, and no policy change reaches backwards. Whatever we recover from it, we recover by recognition, with the error rates that implies.

The framing that holds up: the bottleneck under machine mathematics at scale is not reasoning and is not compute. It is that the input is a picture of a page, and turning a picture into a statement is a guess, dressed in markup that renders perfectly whether or not the guess was right.
