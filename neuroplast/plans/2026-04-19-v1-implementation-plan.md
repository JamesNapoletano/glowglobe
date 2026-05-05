# V1 Implementation Plan
#plan
## Objective
Define the execution-ready implementation plan for GlowGlobe’s first buildable version, covering stack selection, domain schema, app shell, editor approach, and local persistence strategy.

## Scope
- Choose the recommended v1 application stack.
- Define the initial domain schema boundaries and core entities.
- Define the first app shell and navigation model.
- Define the manuscript editor approach.
- Define the local persistence strategy and sync-ready boundaries.
- Update architecture, changelog, and learning artifacts where the planning outcome materially changes project state.

## Out of Scope
- Writing production UI code
- Implementing persistence adapters
- Implementing backend, auth, or sync
- Implementing tests or deployment setup

## Current Reality
- The repository currently contains Neuroplast planning artifacts and a minimal package scaffold.
- The product is already defined as manuscript-first, local-first, sync-ready, and single-author.
- No actual implementation stack has been codified yet.

## Assumptions
- The initial product should ship as a web application.
- Future online-service support matters more than short-term experimentation.
- Rich editor requirements justify a structured editor framework.
- Local persistence should behave like an application data layer, not scattered browser state.

## Recommended Decisions
### Application Stack
- Next.js
- TypeScript
- React
- Material UI

### Editor Strategy
- Use Tiptap/ProseMirror for structured rich manuscript editing.
- Treat editor content as serializable structured document data.
- Keep manuscript semantics such as chapter and scene boundaries outside raw editor state when useful.

### Local Persistence Strategy
- Use IndexedDB-backed repositories for client-side persistence.
- Create repository interfaces per aggregate or major domain area.
- Keep a future sync/service adapter boundary separate from local repositories.

### Core Domain Schema
- Root aggregate: `Project`
- Core content entities: `Book`, `Document`, `Chapter`, `Scene`
- Reference entities: `Character`, `Relationship`, `Technology Entry`, `Location`, `Region`, `Planet`, `Glossary Entry`, `Lore Note`
- Planning entities: `Corkboard Card`, `Timeline Event`, `Plot Thread`, `Act`, `Beat`, `Subplot`, `POV Marker`
- Support entities: `Research Note`, `Revision Snapshot`

### App Shell
- Left rail: project navigation and major work surfaces
- Primary center pane: manuscript or selected workspace content
- Secondary side panel: contextual inspector, linked entities, and quick-reference details
- Top context bar: current project, current book/document, and mode controls

## Execution Slices
1. Initialize app shell and project navigation foundation.
2. Implement the root domain types and repository contracts.
3. Add local IndexedDB persistence adapter.
4. Build the manuscript editor surface with chapter/scene navigation.
5. Add story-bible entities beginning with characters and locations.
6. Add corkboard and timeline planning views.

## Verification
- The plan names one primary stack and editor approach.
- The domain model is rooted in `Project` and covers the major v1 surfaces.
- Persistence is explicitly local-first and sync-ready.
- The app shell supports manuscript-first flow while leaving room for adjacent planning/reference tools.
- Updated artifacts include required folder tags and consistent terminology.

## Blockers
- No technical blockers for planning.
- Implementation work still needs a chosen codebase scaffold and file structure.

## Handoff Context
This plan should be the immediate input to the next act cycle: scaffold the application, define the initial folder structure, and codify the TypeScript domain schema plus repository interfaces before building UI features.

## Related Changelog
[[changelog/2026-04-19]]
