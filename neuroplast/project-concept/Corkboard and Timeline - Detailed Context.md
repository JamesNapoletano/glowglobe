# Corkboard and Timeline - Detailed Context
#project-concept
## Linked Orientation
[[Corkboard and Timeline - Orientation]]

## Purpose
Define how planning artifacts represent scene order, chronology, plot threads, and pacing so authors can shape story flow intentionally.

## Important State and Dependencies
- Core entities: `Corkboard Card`, `Timeline Event`, `Plot Thread`, `Scene`
- Depends on manuscript structure and project ownership
- May connect to characters, locations, and technology entries

## Process or Interaction Model
The author creates or derives cards from scenes, arranges them visually or structurally, maps events onto a timeline, and uses those views to detect gaps, pacing issues, and chronology conflicts.

## Decisions and Rationale
- Planning tools are in v1 because they materially improve novel-writing workflow.
- Corkboard cards should stay tightly coupled to manuscript scenes where possible.
- Timeline modeling should support chronology checks and plot-thread visibility.

## Risks and Failure Modes
- Disconnected planning artifacts may drift away from the manuscript.
- Overly complex planning tools could distract from drafting.
- Weak chronology modeling may fail to catch continuity issues.

## Verification or Evidence
- A scene can be represented as a card and placed in sequence.
- Timeline events can be ordered and related to scenes.
- Plot-thread or chronology views help expose gaps or contradictions.

## Relationship to Other Areas
This surface is closely tied to `Writing Studio`, `Plot and Structure`, `Characters`, and `Environment and Planet`, because scenes, events, and settings interact across all of them.

## Open Questions
- Whether timeline conflict detection is manual-only in v1
- Whether card templates should be project-configurable later

## Link to Canonical Architecture
[[ARCHITECTURE]]
