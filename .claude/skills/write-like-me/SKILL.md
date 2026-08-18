---
name: write-like-me
description: Write or edit prose in Katia's voice. Invoke by name when you want drafting, rewriting, or polishing to sound like her.
disable-model-invocation: true
---

Write in Katia's voice. Her style splits into two **registers** — pick the one the genre calls for, then apply its rules. When unsure which, ask.

| Genre | Register |
|---|---|
| Blog post, talk/CFP proposal, bio, personal-brand copy, tweet | **teacher voice** |
| Design doc, RFC, technical proposal, architecture writeup | **decision-doc voice** |
| Resume, CV bullets | **decision-doc voice** (terse variant — see below) |

Before writing, read the matching excerpt file so the rhythm is in front of you:
- teacher voice → `examples/blog.md` (blog) or `examples/bio.md` (bio/CFP)
- decision-doc voice → `examples/technical-doc.md`

Before you finish: reread the draft against the register's rules below. Every rule for that register should be visible in the draft, or you have a reason it isn't.

## Teacher voice

The reader is a friend you're walking through something at your shoulder.

**Voice & tone**
- Talk straight to them as "you"; switch to "we" when walking through a thing together.
- State opinions flat, no hedging. If something's a mistake, name it: the signature punchline is a blunt *"you might be doing it wrong."*
- Reassure when they might feel stuck ("This is okay and it will happen").
- Humor through self-deprecation and parenthetical asides ("(seriously, ungodly amounts of coffee)", "(Skynet)"), exaggeration, the odd pop-culture jab.
- Close by handing control back to them — "It is up to you to decide", "move things around until they feel right." Never dictate the last word.

**Sentence craft**
- Vary the rhythm hard: a couple of clause-y medium sentences, then drop a one-line paragraph for the hit — *"That's it."*, *"There is no right solution."*
- Scaffold with "Let's say…" hypotheticals and rhetorical questions used as transitions ("So how do we avoid this?").
- Inline `backticks` for code terms; italics/bold for emphasis, sparingly.
- Open with a hook — a command or a question. Close by looping back: cross-link to related writing, or repeat a short refrain two or three times for rhythm.

## Decision-doc voice

The team reasoning out loud toward a call, showing its work.

**Voice & tone**
- First-person plural "we" throughout.
- Measured and deliberate — hedge on purpose where certainty isn't earned: "we feel", "this is not currently a concern", "could be considered".
- Frame every real choice as weighed options: lay out alternatives, mark **Recommended** / **Rejected**, give **Pros** / **Cons**.
- Name tradeoffs plainly, including against your own pick, and let the tradeoff itself carry the weight. Keep the register measured and even-handed throughout.

**Sentence craft**
- Longer, declarative, clause-stacked sentences: state the decision, then the reasoning.
- Conclusion first, justification after — same at section level (lead with the call, then defend it).
- Structural scaffolding does the navigating: TL;DR, In scope / Out of scope, numbered Options, Pros/Cons.
- Restrained punctuation — commas and colons over em dashes.

**Resume variant:** verb-led bullet fragments ("Led", "Built", "Served"), parallel structure across entries, stacked clauses joined by commas/semicolons, zero hedging, zero humor.

## Shared signature (both registers)

- Confident ownership — say what you did or recommend plainly, no throat-clearing preamble.
- Strong verbs lead the sentence.
- The reader always knows where they are; you structure their path through the piece.
