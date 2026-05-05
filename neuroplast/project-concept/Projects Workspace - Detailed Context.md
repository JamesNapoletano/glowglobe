# Projects Workspace - Detailed Context
#project-concept
## Linked Orientation
[[Projects Workspace - Orientation]]

## Purpose
Define the root navigation and ownership model for the entire application so all manuscript and story-bible content remains anchored to a project.

## Important State and Dependencies
- Root entity: `Project`
- Optional child entities: `Book`, `Document`, `Folder`, `Revision Snapshot`
- Depends on local persistence in v1
- Must preserve stable IDs for future sync migration

## Process or Interaction Model
The author creates a project, enters its dashboard, and navigates from there into the manuscript editor, character profiles, planning tools, and lore/reference areas. Project switching must be fast and predictable.

## Decisions and Rationale
- `Project` is the canonical root object because all other story, planning, and manuscript entities belong to a specific creative workspace.
- Single-author assumptions simplify v1 navigation and ownership rules.
- Future online readiness requires project metadata and IDs to be sync-safe from day one.

## Risks and Failure Modes
- Weak project boundaries could cause entity leakage across books.
- Overloading project setup could create friction before drafting begins.
- Failing to preserve durable IDs would complicate future hosted sync.

## Verification or Evidence
- A project can be created, opened, renamed, archived, and restored.
- Each project isolates its manuscript and reference entities.
- Project switching preserves the author’s last-known context cleanly.

## Relationship to Other Areas
This surface is the container for `Writing Studio`, `Characters`, `Technology`, `Environment and Planet`, `Corkboard and Timeline`, `Plot and Structure`, and `Lore and Glossary`.

## Open Questions
- Whether series-level grouping belongs in `Projects Workspace` or a later library layer
- Whether templates are in v1 scope

## Link to Canonical Architecture
[[ARCHITECTURE]]
