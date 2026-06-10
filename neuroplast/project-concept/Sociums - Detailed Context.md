# Sociums - Detailed Context
#project-concept

## Linked Orientation
[[Sociums - Orientation]]

## Purpose
Define the structured group-tracking layer for organized powers that influence the manuscript, world, and planning surfaces.

## Important State and Dependencies
- Core entity: `Socium`
- Depends on `Project` ownership, stable IDs, and local-first persistence
- May later connect to characters, locations, lore, and plot threads through stronger relational links

## Process or Interaction Model
The author opens the Sociums surface, creates a group record with a required type, fills in leadership and strategic details, then revisits the same entry while drafting to keep alliances, rivalries, beliefs, and institutional goals consistent.

## Decisions and Rationale
- Sociums became their own first-class surface because factions and institutions were too important to remain buried inside general lore notes.
- A single generalized entity with a required type dropdown keeps the implementation bounded while still covering kingdoms, guilds, religions, corporations, and similar groups.
- Rich text-first string fields for allies, rivals, and internal dynamics provide useful structure now without forcing a more complex relationship graph yet.

## Risks and Failure Modes
- Freeform ally and rival fields can drift into duplication until explicit relational modeling exists.
- Too many optional fields could make lightweight group entries feel heavy if defaults are not kept simple.
- If Sociums diverge from lore and manuscript references, continuity details could still become fragmented.

## Verification or Evidence
- Sociums can be created, edited, deleted, and reloaded through the dedicated surface.
- The editor enforces a required group-type dropdown instead of an unrestricted type text field.
- Rich continuity fields including allies and rivals persist with the rest of the project aggregate.
- Sociums can now be linked directly to scenes from the Writing Studio inspector through the same local-first scene-link model used by other reference entities.

## Relationship to Other Areas
This area connects strongly with `Writing Studio`, `Characters`, `Environment and Planet`, `Plot and Structure`, and `Lore and Glossary` whenever organized groups shape conflict, culture, or canon. The Writing Studio inspector now exposes first-pass scene-level Socium linking.

## Open Questions
- When to promote allies and rivals into relational multi-select links
- Whether character membership, offices, and subgroups should live here or in a later expansion

## Link to Canonical Architecture
[[ARCHITECTURE]]
