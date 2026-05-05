# Full App Functionality Plan
#plan

## Objective
Execute a bounded implementation pass that moves GlowGlobe from a manuscript-first scaffold with placeholder side surfaces into a usable local-first writing application where all primary v1 surfaces support real create, edit, delete, and linking workflows.

## Scope
- Add functional CRUD workflows for the major story-bible and planning surfaces exposed by the product scope.
- Extend the project domain and persistence flow to support usable cross-surface entities and scene linking.
- Replace read-only overview surfaces with interactive list-and-editor workspaces.
- Make linked inspector items actionable and allow scene-level link management.
- Keep the current manuscript editor, project creation, and local persistence behaviors working.
- Update architecture, changelog, and learning artifacts for the completed work.

## Out of Scope
- Collaboration, auth, or cloud sync.
- Export workflows.
- Drag-and-drop ordering for all entities.
- Deep visual graphing, maps, or analytics.
- Full advanced writing-product features such as comments, track changes, or revision compare.

## Current Reality
- Manuscript CRUD is working for projects, chapters, scenes, scene metadata, and scene body editing.
- Most adjacent surfaces are still read-only overview cards.
- Technology and plot structure are in the documented product scope but are not fully implemented as real working surfaces.
- Linked scene context is display-oriented rather than a full cross-surface authoring workflow.

## Assumptions
- A coherent v1 can use form-first CRUD workflows instead of highly visual boards or graphs.
- Plot and structure can be implemented in a simplified but usable structured form within this cycle.
- Project-aggregate persistence remains acceptable for this slice.
- Local-first IndexedDB persistence remains the correct storage strategy for this implementation pass.

## Tasks
1. Extend the core domain types and mutation helpers for working story-bible and planning entities.
2. Add a generic reusable CRUD workspace pattern for non-manuscript surfaces.
3. Replace placeholder adjacent surfaces with functional editors for characters, world, technology, lore, timeline, corkboard, and plot/structure.
4. Add scene-level link management and actionable linked-item navigation in the inspector.
5. Validate end-to-end persistence and build quality.
6. Update architecture, changelog, and learning artifacts.

## Verification
- The app supports create/edit/delete workflows for the main adjacent surfaces.
- A user can link and unlink scene context from the inspector.
- All major entity changes persist across reloads through IndexedDB.
- Non-manuscript surfaces are no longer read-only placeholders.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- No blockers at planning time.

## Completion Notes
- Extended the project domain model and mutation helpers to support working story-bible and planning entities plus richer scene links.
- Replaced overview-only adjacent surfaces with reusable list-and-form CRUD workspaces.
- Added first-class Technology and Structure surfaces to the workspace navigation.
- Added scene-level link and unlink controls in the inspector for the major manuscript-adjacent entity types.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Handoff Context
If this cycle succeeds, the next likely improvement areas are richer ordering interactions, inline manuscript mentions, and more visual planning views.

## Related Changelog
[[changelog/2026-04-19]]
