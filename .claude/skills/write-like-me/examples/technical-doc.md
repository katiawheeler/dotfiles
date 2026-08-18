# Decision-doc voice — technical writing excerpts

Short representative passages. Read for structure and stance, not content.

> This definition tries to reuse as many of the existing types and queries as possible, but in cases where our needs for the Store breaks existing types, we will introduce new ones.

Option framing — the core move:

> **Option 1: Client handles default layout (Recommended)** — We feel that the best solution is to allow the client to define a default layout, per section, that is applied if the client receives a new type of layout it does not understand.

> **Option 2: Maintain a version list (Rejected)** — Maintaining a list on the server of which client version contains which sections and layouts is possible, but we feel this might grow to be quite complicated.

Honest tradeoffs, including against the recommended pick:

> "YAGNI" alert: If eventually we won't create too many rules and/or lightly experiment with them, this could definitely be considered as over-engineering and redundant.

> There could be a performance concern with querying all of the Store sections at once, but we feel with the limited number of sections we're querying, this is not currently a concern.

**What to copy:** "we"-led throughout; Recommended/Rejected labels on numbered options; Pros/Cons per option; deliberate hedges ("we feel", "not currently a concern"); conclusion stated first, reasoning after; honest self-critique against your own pick, stated plainly and without flourish.
