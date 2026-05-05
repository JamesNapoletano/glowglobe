# Tiptap Scene Editor Plan
#plan

## Objective
Integrate a persisted Tiptap-based scene body editor for the active scene using the existing project aggregate persistence flow.

## Scope
- Add Tiptap dependencies.
- Add a domain helper for updating scene editor documents and preview excerpts.
- Add a client editor component for the active scene.
- Persist scene document updates through the workspace repository flow.
- Verify typecheck, lint, and build success.

## Out of Scope
- Advanced formatting menus
- Collaborative editing
- Editor-specific autosave telemetry
- Chapter-level rich-text editing

## Current Reality
- Scene title and summary editing already persist.
- Scene body rendering is currently a preview of stored excerpt paragraphs.
- The app already stores `editorDocument` on scenes, but there is no real editor UI yet.

## Assumptions
- A minimal Tiptap editor is sufficient for this first editor slice.
- The current project aggregate repository remains the persistence boundary.
- Deriving excerpt preview text from the editor document is acceptable for now.

## Tasks
1. Add Tiptap dependencies.
2. Add scene body update helpers in the domain layer.
3. Add a Tiptap editor component for the active scene.
4. Wire editor updates through workspace persistence.
5. Run validation and update architecture/changelog/learning artifacts.

## Verification
- Editing scene body content updates the active scene and persists after reload.
- The scene preview reflects the persisted editor content.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- No blockers at planning time.

## Handoff Context
The next likely editor slice is toolbar controls, richer formatting support, and more deliberate autosave/debouncing behavior.

## Related Changelog
[[changelog/2026-04-19]]
