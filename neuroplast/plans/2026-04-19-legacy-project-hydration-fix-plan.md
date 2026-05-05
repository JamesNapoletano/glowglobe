# Legacy Project Hydration Fix Plan
#plan

## Objective
Fix the runtime crash caused by older persisted project data missing newly introduced fields by hydrating legacy IndexedDB records into the current project shape before UI rendering and mutation logic consume them.

## Scope
- Add a safe normalization layer for persisted project records returned from IndexedDB.
- Ensure missing scene link arrays and adjacent entity collections default to valid values.
- Guard runtime UI code that currently assumes fully current project shapes.
- Keep the existing local-first persistence model and Next.js 16 upgrade intact.
- Update architecture, changelog, and learning artifacts to reflect the fix.

## Out of Scope
- Broad refactors of the project aggregate boundary.
- New product features.
- Deep IndexedDB schema migrations or versioned data transforms beyond the hydration needed to stop runtime crashes.

## Current Reality
- Users with older persisted projects can load records that predate the newly added story-bible and scene-link fields.
- The inspector currently calls `.includes()` on possibly undefined link arrays, causing an immediate runtime crash.
- Several adjacent surfaces also assume new arrays and fields exist, which risks additional runtime failures even after the first crash is fixed.

## Assumptions
- Read-time normalization is sufficient for the current bounded fix.
- Writing normalized projects back through the existing repository is acceptable when users edit data after load.
- A defensive UI layer is still valuable even after repository hydration is added.

## Tasks
1. Add a project normalization layer for IndexedDB-loaded data.
2. Ensure legacy scenes and entity collections receive current default fields.
3. Add defensive guards in runtime UI surfaces that currently assume new fields always exist.
4. Verify typecheck, lint, and production build after the fix.
5. Update architecture, changelog, and learning artifacts.

## Verification
- Older persisted projects no longer crash the inspector on load.
- Missing scene link arrays hydrate to empty arrays safely.
- Missing adjacent collections and entity fields no longer break CRUD surfaces.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- No blockers at planning time.

## Completion Notes
- Added a project normalization layer for IndexedDB-loaded records.
- Normalized missing scene link arrays, adjacent entity collections, and editor-related fields to current-safe defaults.
- Hardened inspector and adjacent workspace components against undefined legacy fields.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Handoff Context
If this fix succeeds, the next persistence-hardening step should be explicit versioned migration support so future schema evolution is easier to reason about than ad hoc hydration.

## Related Changelog
[[changelog/2026-04-19]]
