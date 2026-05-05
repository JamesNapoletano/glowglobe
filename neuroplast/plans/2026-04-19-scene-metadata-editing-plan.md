# Scene Metadata Editing Plan
#plan
## Objective
Implement persisted scene metadata editing for the active scene, covering title and summary updates through the current project aggregate flow.

## Scope
- Add domain mutation helpers for scene metadata updates.
- Add workspace actions for persisting scene metadata changes.
- Add a React Hook Form editing surface for the active scene.
- Keep selection and persistence behavior aligned with the existing manuscript CRUD slice.
- Verify the app still type-checks, lints, and builds.

## Out of Scope
- Rich text scene body editing
- Excerpt editing
- Chapter metadata editing
- Delete or reorder actions

## Current Reality
- Users can create and select chapters and scenes.
- The manuscript viewport only previews scene data and cannot edit it.
- Project aggregate persistence is already working through IndexedDB.

## Assumptions
- Editing title and summary first is the best bridge into richer manuscript editing.
- React Hook Form remains the right fit for metadata editing surfaces outside the future rich-text editor.
- Persisting the updated project aggregate is still acceptable for this slice.

## Tasks
1. Add a domain helper for updating active scene metadata.
2. Add a workspace action that persists updated scene metadata.
3. Add a scene metadata form to the manuscript viewport.
4. Verify the updated scene data persists and rehydrates after reload.
5. Update architecture, changelog, and learning artifacts.

## Verification
- Editing the active scene title updates the manuscript map and preview.
- Editing the active scene summary persists across reloads.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- No blockers at planning time.

## Handoff Context
The next recommended implementation slice is Tiptap-backed scene body editing using the same persisted active-scene workflow established here.

## Related Changelog
[[changelog/2026-04-19]]
