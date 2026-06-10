# Scene Deletion Guard Plan
#plan

## Objective
Add scene deletion to the Writing Studio while enforcing the rule that each chapter must always retain at least one scene.

## Scope
- `src/lib/domain/project-factory.ts`
- `src/components/workspace-root.tsx`
- `src/components/app-shell.tsx`
- `src/components/manuscript-viewport.tsx`
- `README.md`
- `ARCHITECTURE.md`
- `neuroplast/project-concept/Writing Studio - Orientation.md`
- `neuroplast/project-concept/Writing Studio - Detailed Context.md`
- `neuroplast/project-concept/changelog/2026-05-13.md`
- `neuroplast/learning/ui/*.md`

## Out of Scope
- Chapter deletion.
- Scene reordering.
- Persistence schema changes.

## Assumptions
- The mandatory-single-scene rule applies per chapter.
- Scene deletion should be available from the scene list row in Writing Studio.
- Delete controls should be hidden, not merely disabled, when a chapter has only one remaining scene.
- Deleting the active scene should navigate to another remaining scene in the same chapter.

## Tasks
1. Persist this bounded execution plan for the current cycle.
2. Add a project-factory helper that removes a scene only when the target chapter has more than one scene.
3. Add a workspace-root delete-scene flow that commits the update and preserves valid writing-route navigation after deletion.
4. Wire the delete-scene handler through the app shell into the manuscript viewport.
5. Render per-scene delete controls only when the active chapter has more than one scene and prevent the delete click from also selecting the row.
6. Verify guarded scene deletion behavior plus `npm run typecheck`, `npm run lint`, and `npm run build`.
7. Sync architecture, concept, changelog, README, and learning artifacts with the new behavior.

## Verification
- A chapter with more than one scene shows delete controls for its scene rows.
- A chapter with exactly one scene shows no delete controls.
- Deleting a non-active scene removes it without breaking the current selection.
- Deleting the active scene navigates to another remaining scene in the same chapter.
- The last remaining scene in a chapter cannot be deleted through the UI or domain helper.
- `npm run typecheck`, `npm run lint`, and `npm run build` pass.

## Blockers
- None.

## Completion Notes
- Added `removeSceneFromChapter` in `src/lib/domain/project-factory.ts`, which refuses to delete the last remaining scene in a chapter and returns a fallback surviving scene when deletion succeeds.
- Wired scene deletion through `src/components/workspace-root.tsx` so deleting the active scene navigates to another remaining scene in the same chapter using the existing writing-route guard path.
- Updated `src/components/app-shell.tsx` and `src/components/manuscript-viewport.tsx` to expose per-scene delete controls only when a chapter has more than one scene, with click handling isolated from row selection.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Related Changelog
- [[..\project-concept\changelog\2026-05-13]]

## Restart Point
- Resume in `src/lib/domain/project-factory.ts` at the scene helpers, then wire deletion through `src/components/workspace-root.tsx` and `src/components/manuscript-viewport.tsx`.
