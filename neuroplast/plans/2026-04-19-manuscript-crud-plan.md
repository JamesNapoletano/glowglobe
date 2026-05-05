# Manuscript CRUD Plan
#plan
## Objective
Implement persisted chapter and scene creation and selection on top of the existing local project repository.

## Scope
- Add project mutation helpers for chapter and scene creation.
- Add workspace state actions for updating and persisting active projects.
- Add chapter and scene selection state in the manuscript workspace.
- Add manuscript UI controls for creating chapters and scenes.
- Verify the app still type-checks, lints, and builds.

## Out of Scope
- Rich text editor implementation
- Scene body editing
- Reordering chapters or scenes
- Deletion flows

## Current Reality
- Projects persist locally in IndexedDB.
- The manuscript viewport always shows the first chapter and first scene only.
- There is no real CRUD interaction yet for manuscript structure.

## Assumptions
- Mutating and persisting the entire project aggregate remains acceptable for this slice.
- First-write manuscript workflows are more important than advanced editing controls right now.
- Selection state can live in the client workspace layer until editor interactions grow more complex.

## Tasks
1. Add project helpers for chapter and scene creation.
2. Add active chapter and scene selection state to the workspace root.
3. Add persisted project update actions for chapter and scene creation.
4. Update the manuscript viewport with chapter and scene lists plus create actions.
5. Run validation and update architecture/changelog/learning artifacts.

## Verification
- A user can create a chapter and see it persist after reload.
- A user can create a scene in the selected chapter and see it persist after reload.
- A user can select different chapters and scenes in the manuscript view.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- No blockers at planning time.

## Handoff Context
The next implementation slice after this should introduce scene metadata editing or Tiptap-backed scene body editing using the persisted manuscript structure created here.

## Related Changelog
[[changelog/2026-04-19]]
