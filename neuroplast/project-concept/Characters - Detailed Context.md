# Characters - Detailed Context
#project-concept

## Linked Orientation
[[Characters - Orientation]]

## Purpose
Provide a structured character knowledge surface that improves recall, continuity, and narrative consistency during drafting and revision.

## Important State and Dependencies
- Core entities: `Character`, `Relationship`, `Character Arc`, `Alias`
- Depends on project scoping and manuscript cross-linking
- May connect to timeline events, factions, places, and plot threads

## Process or Interaction Model
The author creates a character profile with a lightweight required core (name, role, summary, arc, status), fills optional dossier fields only when useful, tracks typed relationships and arc progression, and references the profile while drafting or revising scenes.

## Decisions and Rationale
- Structured profiles are preferred over freeform notes only, because continuity and relationship tracking require predictable fields.
- Character data should remain linkable from manuscript scenes and planning surfaces.
- Arc and relationship data should be modeled explicitly because they influence plot and timeline views.
- Character profiles should use a lightweight required core plus optional dossier sections so the surface feels wiki-like without becoming burdensome for every minor character.
- Relationship tracking should stay typed and list-first in v1 so future filters, graph views, and continuity tooling can build on structured data.

## Risks and Failure Modes
- Overly rigid schemas could discourage use.
- Insufficient structure could make continuity checks ineffective.
- Relationship data could become fragmented if not linked consistently.
- Over-expanding character forms without a lightweight core could make authors avoid the surface for secondary characters.

## Verification or Evidence
- A character can be created and linked to scenes, events, and other characters.
- Profile fields remain readable and useful during drafting.
- Relationship and arc changes can be tracked over time.
- Required core fields remain quick to fill while optional dossier sections can stay blank without degrading the workspace.

## Relationship to Other Areas
Characters connect directly to `Writing Studio`, `Plot and Structure`, `Corkboard and Timeline`, `Environment and Planet`, and `Lore and Glossary`.

## Open Questions
- Whether visual relationship mapping is essential for v1
- Whether per-character scene appearances and appearance timelines should be auto-derived later

## Link to Canonical Architecture
[[ARCHITECTURE]]
