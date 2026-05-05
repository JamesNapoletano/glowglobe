# Polished Manuscript Workspace Plan
#plan

## Objective
Implement a more polished manuscript-first workspace that reduces layout crowding, gives the editor stronger visual priority, and makes linked scene context usable through a right-side inspector workflow.

## Scope
- Redesign the main application shell to create clearer navigation, manuscript, and inspector roles.
- Move project creation out of the always-visible sidebar into a lighter modal flow.
- Refocus the manuscript view around structure navigation and the active editor.
- Replace passive linked-context cards with a scene-driven inspector that resolves actual linked entities.
- Add real workspace-surface navigation with read-only browsing for adjacent domains where helpful.
- Update architecture and execution artifacts to match the implemented UX direction.

## Out of Scope
- Inline entity mentions inside the editor.
- CRUD workflows for characters, locations, timeline events, lore, or planning entities.
- Reordering chapters or scenes.
- Mobile-specific advanced interaction patterns beyond responsive layout adjustments.

## Current Reality
- The current shell renders three dense columns with nested cards that compete with the editor.
- Work-surface navigation is mostly decorative.
- The context panel shows the first project entities rather than the active scene's actual links.
- Scene metadata editing lives in the central manuscript column, which reduces focus on drafting.

## Assumptions
- Desktop and laptop use are the primary v1 targets.
- A right-side inspector is the preferred first interaction model for linked items.
- Read-only browsing for adjacent surfaces is sufficient for this bounded iteration.
- Existing project aggregate persistence remains the correct write boundary for this slice.

## Tasks
1. Redesign the shell layout and navigation hierarchy.
2. Move project creation into a modal-triggered flow.
3. Refactor the manuscript viewport so the editor becomes the dominant center pane.
4. Build a real inspector that resolves linked scene entities and hosts scene metadata editing.
5. Add lightweight surface browsing for non-manuscript areas.
6. Verify typecheck, lint, and build.
7. Update architecture, changelog, and learning artifacts.

## Verification
- The center pane gives noticeably more space to drafting than the prior layout.
- Work-surface navigation is interactive rather than decorative.
- The inspector shows linked entities based on the active scene's IDs.
- Scene metadata editing remains functional from the inspector.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- No blockers at planning time.

## Completion Notes
- Completed shell redesign with a clearer left-rail / center-stage / right-inspector hierarchy.
- Completed modal-based project creation flow.
- Completed manuscript viewport refactor with metadata moved to the inspector.
- Completed scene-driven inspector resolution for linked characters, locations, and timeline events.
- Completed lightweight overview states for adjacent non-manuscript surfaces.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Handoff Context
If this slice succeeds, the next recommended UX iteration is scene-level link management (link existing, unlink, create linked entity) plus inline mention support inside the editor.

## Related Changelog
[[changelog/2026-04-19]]
