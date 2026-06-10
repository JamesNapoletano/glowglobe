# Writing Studio Scene Creation and Inspector Scroll Plan
#plan

## Objective
Fix Writing Studio scene creation so additional scenes can be added reliably, and constrain the right inspector to an independently scrollable column so the full page no longer stretches vertically.

## Scope
- `src/components/workspace-root.tsx`
- `src/components/app-shell.tsx`
- `src/components/manuscript-viewport.tsx`
- `src/components/context-panel.tsx`
- `ARCHITECTURE.md`
- `README.md`
- `neuroplast/project-concept/Writing Studio - Orientation.md`
- `neuroplast/project-concept/Writing Studio - Detailed Context.md`
- `neuroplast/project-concept/changelog/2026-05-10.md`
- `neuroplast/learning/ui/*.md`
- `neuroplast/plans/.active-plan`

## Out of Scope
- Persistence schema changes.
- Reordering or deleting chapters/scenes.
- Non-writing workspace layout changes.

## Assumptions
- The scene-creation failure is caused by route canonicalization racing ahead of optimistic project state after a new scene is added.
- The inspector already has internal overflow styling, but the writing shell still uses viewport-unbounded height behavior that lets the entire page grow.
- A viewport-bounded shell with pane-level overflow containment is the desired desktop behavior for Writing Studio.

## Tasks
1. Persist this bounded execution plan and mark it active for the current cycle.
2. Stabilize optimistic writing-route navigation after scene and chapter creation so canonicalization does not bounce the user back to an older scene.
3. Constrain the writing shell to the viewport and keep pane wrappers overflow-safe.
4. Ensure the right inspector remains an independently scrollable column within the bounded writing shell.
5. Confirm the manuscript viewport remains scroll-safe inside the updated shell.
6. Verify with `npm run typecheck`, `npm run lint`, and `npm run build`.
7. Sync architecture, concept, changelog, README, and learning artifacts with the updated behavior.

## Verification
- Clicking `+ Add scene` creates additional scenes in the active chapter.
- After creation, the route remains on the newly created scene instead of canonicalizing back to an older scene.
- Chapter creation still lands on the newly created chapter's first scene.
- The right inspector scrolls internally while the Writing Studio shell stays viewport-bounded on desktop.
- `npm run typecheck`, `npm run lint`, and `npm run build` pass.

## Blockers
- None.

## Completion Notes
- Added a pending-canonical-path guard in `src/components/workspace-root.tsx` so optimistic chapter and scene creation can navigate to the newly created writing route without being immediately redirected back to an older canonical scene.
- Constrained the desktop Writing Studio shell to a viewport-bounded height in `src/components/app-shell.tsx` and added pane-level overflow containment so the inspector scrolls independently.
- Kept the manuscript center pane and inspector stack explicitly min-height-safe and overflow-safe in `src/components/manuscript-viewport.tsx` and `src/components/context-panel.tsx`.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Related Changelog
- [[..\project-concept\changelog\2026-05-10]]

## Restart Point
- Resume in `src/components/workspace-root.tsx` if route behavior is still unstable; otherwise continue with `src/components/app-shell.tsx` height and overflow containment.
