# Chapter Deletion And Delete Confirmation Plan
#plan

## Objective
Add chapter deletion to the Writing Studio and require confirmation checks for chapter and scene deletes while preserving the minimum-one-chapter and minimum-one-scene invariants.

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
- Reordering chapters or scenes.
- Persistence schema changes.
- Broader delete UX redesign outside the Writing Studio structure navigator.

## Assumptions
- The primary manuscript book must retain at least one chapter.
- Each chapter must retain at least one scene.
- Confirmation can use `window.confirm` for now to match existing destructive project actions.
- Delete controls should be hidden when the related entity cannot legally be deleted.

## Tasks
1. Persist this bounded execution plan for the current cycle.
2. Add a project-factory helper that removes a chapter only when more than one chapter remains and returns fallback chapter/scene IDs.
3. Add confirmation checks to scene deletion in `src/components/workspace-root.tsx`.
4. Add a confirmed chapter deletion flow in `src/components/workspace-root.tsx` that preserves valid writing-route navigation after removal.
5. Wire a chapter delete handler through `src/components/app-shell.tsx` into `src/components/manuscript-viewport.tsx`.
6. Render chapter delete controls only when the book has more than one chapter, and keep scene delete controls only when the chapter has more than one scene.
7. Verify guarded deletion behavior plus `npm run typecheck`, `npm run lint`, and `npm run build`.
8. Sync architecture, concept, changelog, README, and learning artifacts with the new behavior.

## Verification
- A book with more than one chapter shows chapter delete controls.
- A book with exactly one chapter shows no chapter delete controls.
- Scene deletion asks for confirmation and respects the minimum-one-scene rule.
- Chapter deletion asks for confirmation and respects the minimum-one-chapter rule.
- Deleting the active chapter routes to a surviving chapter's scene.
- Deleting the active scene routes to a surviving scene in the same chapter.
- `npm run typecheck`, `npm run lint`, and `npm run build` pass.

## Blockers
- None.

## Completion Notes
- Added `removeChapterFromProject` in `src/lib/domain/project-factory.ts`, which refuses to delete the last remaining chapter and returns fallback chapter/scene IDs when deletion succeeds.
- Added confirmation prompts for both chapter and scene deletes in `src/components/workspace-root.tsx`, keeping delete decisions centralized with the mutation flow.
- Updated `src/components/app-shell.tsx` and `src/components/manuscript-viewport.tsx` so chapter delete controls appear only when more than one chapter exists, scene delete controls still require more than one scene, and delete clicks stay isolated from selection clicks.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Related Changelog
- [[..\project-concept\changelog\2026-05-13]]

## Restart Point
- Resume in `src/lib/domain/project-factory.ts` at the chapter/scene structure helpers, then wire confirmed delete handlers through `src/components/workspace-root.tsx` and `src/components/manuscript-viewport.tsx`.
