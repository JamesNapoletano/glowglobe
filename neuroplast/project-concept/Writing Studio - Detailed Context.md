# Writing Studio - Detailed Context
#project-concept

## Linked Orientation
[[Writing Studio - Orientation]]

## Purpose
Define the primary writing experience for novel drafting and document authoring, including formatting, structure, and narrative flow support.

## Important State and Dependencies
- Core entities: `Book`, `Document`, `Chapter`, `Scene`, `Revision Snapshot`
- Structured editor content model required
- Depends on project-level organization and local persistence
- Must interoperate with cross-linked story-bible entities

## Process or Interaction Model
The author opens a manuscript, navigates to a chapter or scene, writes and revises in rich text, then references or updates linked story entities without losing drafting context. The editor should support both focused scene writing and broader manuscript navigation.

## Decisions and Rationale
- Writing is the product’s primary workflow, so planning and reference tools should orbit the editor rather than compete with it.
- Structured rich content is preferred over plain text-only storage to preserve formatting and future export fidelity.
- Cross-linking should support continuity and recall without forcing the author out of the writing flow.

## Risks and Failure Modes
- An overcomplicated editor could harm drafting speed.
- Weak content structure could limit export and sync later.
- Poor navigation between scenes and reference material could break creative flow.

## Verification or Evidence
- The author can create chapters and scenes and reorder them.
- Rich formatting persists accurately across saves.
- Links from manuscript content to reference entities resolve correctly.
- Focus-mode writing remains fast and readable.
- The constrained writing rail keeps chapter and scene navigation readable even while the inspector remains visible.
- Scene metadata and link updates should not cause unnecessary editor document resets or make the draft canvas feel blocked by local persistence work.

## Relationship to Other Areas
`Writing Studio` consumes and produces context for `Characters`, `Technology`, `Environment and Planet`, `Lore and Glossary`, and planning surfaces such as `Corkboard and Timeline` and `Plot and Structure`.

## Open Questions
- Whether comments, annotations, or footnotes are in v1 scope
- How revision snapshots should be exposed in the initial interface

## Link to Canonical Architecture
[[ARCHITECTURE]]
