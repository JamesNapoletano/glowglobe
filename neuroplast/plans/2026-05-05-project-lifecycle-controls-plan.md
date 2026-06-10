# Project Lifecycle Controls Plan
#plan

## Objective
Implement project lifecycle controls with safe trash-first behavior and hidden-by-default archived/trashed visibility toggles.

## Scope
- `src/lib/domain/types.ts`
- `src/lib/domain/project-factory.ts`
- `src/lib/domain/project-normalizer.ts`
- `src/lib/mock-data/sample-project.ts`
- `src/components/workspace-root.tsx`
- `src/components/app-shell.tsx`
- `src/components/workspace-sidebar.tsx`
- `ARCHITECTURE.md`
- `README.md`

## Out of Scope
- Permanent hard delete from trash.
- Multi-user permissions.
- Bulk lifecycle actions across many projects.

## Decisions Locked
- Delete uses trash bin first (soft delete).
- Archived projects are hidden by default with a visibility toggle.

## Tasks
1. Add project lifecycle state to the domain model (`active`, `archived`, `trashed`).
2. Add lifecycle transition operations (archive, restore, move-to-trash, restore-from-trash).
3. Normalize legacy persisted projects to default lifecycle `active`.
4. Add shell controls for lifecycle actions with trash confirmation.
5. Add sidebar toggles to reveal archived and trashed projects (default hidden).
6. Add active-project fallback logic when the current project transitions out of active.
7. Verify with `npm run typecheck`, `npm run lint`, and `npm run build`.
8. Sync architecture/changelog/learning/README artifacts.

## Verification
- Archive hides project by default; it appears when “Show archived” is enabled.
- Move-to-trash hides project by default; it appears when “Show trashed” is enabled.
- Restore transitions projects back into the active list.
- Active-project fallback selects a valid active project after archive/trash actions.
- Reload preserves lifecycle transitions in IndexedDB.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- None at plan start.

## Completion Notes
- Added `lifecycleState` to the project domain model with values `active`, `archived`, and `trashed`.
- Added `moveProjectToLifecycleState` and legacy-safe lifecycle normalization to keep older persisted projects defaulting to `active`.
- Wired archive/trash/restore handlers in workspace state and persistence so lifecycle transitions persist through the same IndexedDB flow.
- Added active-project fallback behavior when the current project is archived or trashed.
- Updated shell and sidebar controls to support archive/trash actions plus hidden-by-default toggles for archived and trashed lists.
- Added restore actions for both archived and trashed projects.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Related Changelog
- [[..\project-concept\changelog\2026-05-05]]
