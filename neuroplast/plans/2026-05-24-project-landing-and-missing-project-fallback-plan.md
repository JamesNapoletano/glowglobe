# Project Landing and Missing Project Fallback Plan
#plan

## Objective
Add a real landing experience for unselected or missing projects so invalid project URLs and first-load states guide the user toward selecting or creating a workspace instead of leaving them on a dead-end route.

## Scope
- `src/lib/workspace-route.ts`
- `src/components/workspace-root.tsx`
- `src/components/app-shell.tsx`
- `README.md`
- `ARCHITECTURE.md`
- `neuroplast/project-concept/Writing Studio - Orientation.md`
- `neuroplast/project-concept/changelog/2026-05-24.md`
- `neuroplast/learning/ui/*.md`
- `neuroplast/plans/.active-plan`

## Out of Scope
- Changing IndexedDB storage format.
- Editing Stitch artifacts.
- Reworking the broader project lifecycle model.

## Assumptions
- Invalid or missing project selection should land on `/` and let the user recover by selecting or creating a project.
- The root route should remain a valid landing surface even when projects already exist.
- Existing project-scoped routes should still work when the requested project, chapter, and scene exist.

## Tasks
1. Persist this plan and mark it active.
2. Update route resolution so missing project IDs no longer silently fall back to another project.
3. Add a dedicated landing-state UI for selecting an existing project or creating a new one.
4. Verify route behavior with typecheck, lint, and build.
5. Update changelog, architecture, concept, and learning artifacts.

## Verification
- `/` loads a landing experience instead of forcing selection of another project.
- Missing project URLs recover safely to `/`.
- Existing valid writing URLs continue to resolve.
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.

## Blockers
- None.

## Related Changelog
- [[..\project-concept\changelog\2026-05-24]]

## Restart Point
- Resume in `src/lib/workspace-route.ts`, then finish the landing-state UI in `src/components/app-shell.tsx`.
