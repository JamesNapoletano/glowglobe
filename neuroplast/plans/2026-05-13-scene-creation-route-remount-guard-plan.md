# Scene Creation Route Remount Guard Plan
#plan

## Objective
Fix Writing Studio scene creation so a newly created scene remains selected even when the route transition remounts the workspace before debounced persistence has finished.

## Scope
- `src/components/workspace-root.tsx`
- `ARCHITECTURE.md`
- `README.md`
- `neuroplast/project-concept/Writing Studio - Orientation.md`
- `neuroplast/project-concept/Writing Studio - Detailed Context.md`
- `neuroplast/project-concept/changelog/2026-05-13.md`
- `neuroplast/learning/ui/*.md`

## Out of Scope
- Persistence schema changes.
- Non-writing workspace behavior.
- Scene/chapter reordering or deletion.

## Assumptions
- The current pending canonical-path guard is stored in component-local memory and is lost during route remounts.
- Scene creation currently relies on optimistic state plus debounced IndexedDB persistence.
- Route canonicalization should defer stale fallback redirects while a just-created writing route is still pending durable availability.

## Tasks
1. Persist this bounded execution plan for the current cycle.
2. Replace or extend the pending writing-route guard so it survives route remounts during create-and-navigate flows.
3. Keep canonicalization from bouncing a newly created scene back to the previous scene while the updated project is still flushing to IndexedDB.
4. Ensure chapter creation continues to use the same stabilized writing-route behavior.
5. Verify with manual route-guard reasoning plus `npm run typecheck`, `npm run lint`, and `npm run build`.
6. Sync architecture, concept, changelog, README, and learning artifacts with the updated behavior.

## Verification
- Clicking `+ Add scene` keeps the route on the newly created scene instead of flashing back to the previous one.
- The guard survives the route transition long enough to prevent stale canonical redirects before persistence finishes.
- Chapter creation still lands on the newly created chapter's first scene.
- `npm run typecheck`, `npm run lint`, and `npm run build` pass.

## Blockers
- None.

## Completion Notes
- Moved the short-lived writing-route guard and optimistic project cache out of component-local state in `src/components/workspace-root.tsx` so route remounts no longer drop pending scene/chapter navigation context.
- Rehydrate loaded IndexedDB project data with any still-pending in-memory project writes before canonical route resolution runs, preventing stale fallback redirects back to the previous scene.
- Kept debounced persistence behavior intact while making failed persistence attempts retain the pending in-memory project state for the next load cycle.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Related Changelog
- [[..\project-concept\changelog\2026-05-13]]

## Restart Point
- Resume in `src/components/workspace-root.tsx` at the writing-route canonicalization guard and create-scene/create-chapter navigation path.
