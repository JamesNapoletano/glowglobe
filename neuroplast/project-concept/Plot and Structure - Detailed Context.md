# Plot and Structure - Detailed Context
#project-concept

## Linked Orientation
[[Plot and Structure - Orientation]]

## Purpose
Provide a structured planning layer for narrative shape so authors can reason about macro-level story flow alongside chapter and scene execution.

## Important State and Dependencies
- Core entities: `Plot Thread`, `Act`, `Beat`, `Subplot`, `POV Marker`
- Depends on scenes, timeline events, and character arcs
- May connect to lore, locations, and manuscript revisions

## Process or Interaction Model
The author outlines story structure, associates beats and arcs with scenes or events, and uses those relationships to revise pacing, progression, and thematic balance.

## Decisions and Rationale
- Plot structure deserves its own explicit modeling because novel planning often happens above the scene level.
- The model should not lock users into one storytelling framework.
- Scene and timeline relationships should remain first-class so structure is not abstracted away from actual manuscript execution.

## Risks and Failure Modes
- Too much structure can feel prescriptive.
- Too little structure can make the surface redundant.
- Weak linkage to manuscript content reduces practical value.

## Verification or Evidence
- Plot threads and beats can be attached to scenes or timeline events.
- The author can inspect high-level narrative balance.
- Structure views support revision decisions rather than static note-taking only.

## Relationship to Other Areas
`Plot and Structure` sits between `Writing Studio` and `Corkboard and Timeline`, while also drawing on `Characters`, `Lore and Glossary`, and setting/worldbuilding.

## Open Questions
- Whether template-based outlining is a v1 or v2 concern
- Whether POV balance needs dedicated visualization in v1

## Link to Canonical Architecture
[[ARCHITECTURE]]
