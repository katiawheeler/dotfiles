# Decision-doc voice — technical writing excerpts

Short representative passages. Read for structure and stance, not content.

> This definition reuses as many of the existing types and queries as possible, but introduces new ones where Store requirements break existing types.

Option framing — the core move:

> **Option 1: Client handles default layout (Recommended)** — The best solution is to allow the client to define a default layout, per section, that applies if the client receives a new layout type it does not understand.

> **Option 2: Maintain a version list (Rejected)** — Maintaining a server-side list of which client versions contain which sections and layouts is possible, but this might grow quite complicated.

Honest tradeoffs, including against the recommended pick:

> "YAGNI" alert: If the number of rules stays limited or the rules remain light experiments, this could be over-engineering and redundant.

> Querying all Store sections at once could create a performance concern, but the limited number of sections means this is not currently a concern.

**What to copy:** neutral, evidence-led narration; Recommended/Rejected labels on numbered options; Pros/Cons per option; deliberate hedges ("the evidence indicates", "not currently a concern"); conclusion stated first, reasoning after; honest self-critique against the recommendation, stated plainly and without flourish.
