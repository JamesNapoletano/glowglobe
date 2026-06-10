# Implementation Strategy - Detailed Context
#project-concept

## Linked Orientation
[[Implementation Strategy - Orientation]]

## Purpose
Capture the recommended v1 implementation decisions so the first coding phase can start with stable technical boundaries.

## Important State and Dependencies
- Depends on `Project` as the root domain object.
- Depends on a structured editor content model.
- Depends on local persistence with stable IDs and timestamps.
- Must interoperate with all major concept surfaces already defined.

## Process or Interaction Model
The initial application should load into a project-aware workspace shell, allow the user to navigate between manuscript and reference areas, edit structured content through a rich editor engine, and persist data locally through a repository-style adapter layer.

## Decisions and Rationale
- Next.js with TypeScript is the recommended app framework because it supports a long-lived web product path while keeping the first implementation straightforward.
- React-based composition matches the multi-panel workspace and editor-adjacent interaction model.
- Material UI is recommended for building the product shell and shared interface primitives when the product needs a cleaner, more consistent application feel.
- Tiptap/ProseMirror is recommended for the manuscript editor because the product needs structured rich text rather than plain text-only editing.
- IndexedDB-backed local persistence is recommended for v1 because the app is local-first and needs structured client-side storage that can later sync to a hosted backend.
- Repository and service boundaries should be introduced from the start so UI code does not own storage concerns directly.

## Risks and Failure Modes
- Choosing an editor with weak document modeling could constrain manuscript formatting and export later.
- Mixing domain logic into UI state too early would make future sync harder.
- Under-planning the app shell could produce a fragmented experience across writing and story-bible surfaces.

## Verification or Evidence
- The implementation plan names a framework, editor approach, persistence strategy, and app shell structure.
- Domain entities remain independent from storage implementation details.
- Planned storage supports stable IDs, timestamps, and serializable document content.
- The scaffold includes an app shell, domain types, repository contracts, and a React Hook Form powered project-creation interaction.
- The current implementation persists projects in IndexedDB and restores them across reloads.
- The current implementation also persists chapter and scene creation plus manuscript selection behaviors.
- The current implementation persists active scene metadata updates through the same repository boundary.
- The current implementation persists active scene rich-text document updates through Tiptap.
- The current implementation now applies project-aggregate mutations optimistically and persists them through a short debounced IndexedDB background-save path so the local-first UI remains more responsive.

## Relationship to Other Areas
This area operationalizes `Projects Workspace`, `Writing Studio`, `Characters`, `Sociums`, `Technology`, `Environment and Planet`, `Corkboard and Timeline`, `Plot and Structure`, and `Lore and Glossary` by defining how they will first be implemented.

## Open Questions
- Whether offline export is required in the earliest build slice
- Whether revision snapshots are automatic, manual, or hybrid in the first implementation
- When project-level persistence should be decomposed into more granular entity repositories
- Whether scene summary/excerpt editing should ship before full rich-text editor integration
- How much of the current scene preview should convert directly into the future editor surface
- Whether editor saves should remain blur-based or move to a debounced autosave strategy next
- When broad project-aggregate state should be split into narrower memoized subtrees if optimistic persistence alone is no longer enough for responsiveness

## Link to Canonical Architecture
[[ARCHITECTURE]]
