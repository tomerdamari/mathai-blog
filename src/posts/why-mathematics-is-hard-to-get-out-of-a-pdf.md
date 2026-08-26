---
title: "Why Mathematics Is So Hard to Get Out of a PDF"
description: "A PDF does not contain an equation. It contains instructions for putting marks at coordinates. Everything difficult about extracting mathematics follows from that one fact."
category: Explainers
author: Yonatan Peled
date: 2026-08-22
readingTime: "10 min read"
---

Copy a paragraph out of a research paper and paste it somewhere. The text arrives, more or less. Now copy an equation from the same page. What arrives is something like `f (x) = 1 2π e−x2/2`, with the fraction flattened, the exponent inline, and the square root gone entirely.

This is not a bug in your reader. It is what the file contains.

## What a PDF actually is

PDF is a page description language, descended from PostScript, and its job is to make a page look identical everywhere. It achieves that by describing the page as a sequence of drawing operations.

A text-showing operation says: using this font resource, at this position, with this transformation matrix, draw these glyph codes. That is the whole model. There are no paragraphs, no sentences, no words in any structural sense. There is not even a space character in many PDFs, because a typesetter that wants a gap simply moves the drawing position and starts the next run of glyphs somewhere else.

Reading text out of a PDF therefore means reconstructing structure that was never stored. An extractor collects the glyphs, sorts them by position, guesses where words end from the gaps, guesses where lines end from the vertical positions, and guesses reading order from the geometry. For ordinary prose in a single column, those guesses are reliable enough that the loss is invisible.

Mathematics breaks every one of them.

## Why formulas break the reconstruction

Consider a fraction. In the file it is three things: a run of glyphs at one vertical position, a run of glyphs lower down, and a thin filled rectangle between them. There is nothing marking the relationship. The rectangle is a rectangle, indistinguishable from a rule under a heading or a border on a table.

A superscript is a glyph drawn slightly higher and slightly smaller. Whether that means exponentiation, a footnote marker, or a transpose depends on context the file does not record.

An integral sign is a glyph. Its limits are two small glyph runs positioned above and below it. The relationship is spatial and nothing else.

A square root is a radical glyph plus a horizontal rule whose length happens to cover the expression underneath. The scope of the root is expressed entirely by how long somebody drew a line.

So an extractor faced with mathematics has to infer a tree from a two-dimensional arrangement of marks, using conventions that are typographic rather than semantic. Sorting by position, which works for prose, actively destroys the information: it flattens a two-dimensional layout into one dimension, and the layout was the meaning.

## The font problem on top

TeX, which typeset most of the mathematics published in the last forty years, made this worse in a specific way.

The Computer Modern math fonts were built with custom encodings. A glyph's code in the font is not its Unicode code point, and for many mathematical symbols there was no Unicode code point when the fonts were designed. A PDF produced by older TeX pipelines may contain glyph code 1 in a font named `cmmi10`, and what that means requires knowing that font's encoding table.

Well-behaved PDFs carry a `ToUnicode` map that translates glyph codes back to characters. Many older ones do not, or carry an incomplete one. When the map is missing, extraction produces plausible-looking garbage: Greek letters that come out as Latin ones, minus signs that come out as hyphens or as nothing.

Ligatures compound it. A single glyph may represent two characters, and without the map there is no way to know.

## The three kinds of PDF

Practically, documents fall into three groups, and which group you have determines what is possible.

A born-digital PDF from a modern LaTeX pipeline has correct fonts, a usable `ToUnicode` map, and sometimes tagging. Text extraction works; mathematics still requires layout analysis, but the raw glyph identities are trustworthy.

A born-digital PDF from an older pipeline has correct positioning and unreliable character identity. This is the frustrating case, because the file looks perfect and extracts into nonsense.

A scanned PDF contains images of pages and no text at all. Everything must come from optical character recognition, and now you have the layout problem and the recognition problem together.

Journals have been scanning back catalogues for decades, so a large share of the mathematical literature before roughly 1995 exists only in the third form.

## What tagging was supposed to fix

PDF has had a structural layer since 2001. Tagged PDF, standardised as PDF/UA, lets a document carry a logical structure tree alongside the drawing instructions: this run of glyphs is a heading, these are paragraphs, this is a table with these cells.

For mathematics, the intended mechanism is embedding MathML in the structure tree, so the file carries both the marks and the meaning.

Adoption is poor. Producing tagged PDF requires the generating tool to emit the structure, and most mathematical typesetting pipelines historically did not. This is improving: recent LaTeX releases have made tagged output a priority, and accessibility regulation in several jurisdictions now requires it for public sector documents. The effect on the existing corpus is nil, because the existing corpus is already written.

The accessibility consequence is the one that matters most and gets discussed least. A screen reader on an untagged mathematical PDF reads the flattened glyph sequence, which is meaningless. A blind mathematician reading a paper from 1998 has no route to the equations short of someone transcribing them.

## What actually works

Three approaches, with different failure modes.

Get the source. For anything on arXiv since 1991, the LaTeX source is usually available for download alongside the PDF, and the source contains the mathematics as markup. This solves the problem completely and it is consistently the first thing people forget to try.

Rule-based layout analysis. Tools like INFTY and various open-source successors treat formula recognition as a structured problem: identify symbols, build a spatial relationship graph, parse it into a tree using typesetting conventions. These work well on clean input and degrade on anything unusual.

Neural image-to-markup. Treat a cropped formula image as input and generate LaTeX as output, the same architecture as image captioning. This is where most current work sits, and models such as Nougat and the various formula recognition systems have pushed accuracy on clean printed mathematics to a level that is genuinely useful.

The last approach has a failure mode worth naming. The output is always syntactically valid LaTeX, because the model learned to produce LaTeX. Whether it is the right LaTeX is a separate question, and a wrong exponent or a dropped subscript renders perfectly and looks correct. Silent corruption of a formula is worse than a visible failure, and it means any pipeline that extracts mathematics at scale needs a verification step that does not come from the same model.

## The practical shape of it

If you need mathematics out of a document, work down this list.

Look for the source. arXiv, the author's page, the publisher's HTML version if one exists.

If the PDF is born-digital, check whether text extraction produces sane characters at all before investing in layout analysis. If Greek letters arrive as Latin, the font map is broken and no amount of layout work fixes it.

If you must recognise formulas from images, render what you extracted and compare it against the original visually. This is the only cheap check that catches silent corruption, and comparing two rendered images is much easier than comparing two strings of LaTeX.

For anything consequential, transcribe by hand. This sounds defeatist and it is the correct answer more often than people expect. A page of dense mathematics takes twenty minutes to type and the result is certainly right.

The underlying situation is unlikely to change for the existing literature. Millions of papers were published in a format that records how a page looked and not what it said, and that decision is now permanent for everything already printed.
