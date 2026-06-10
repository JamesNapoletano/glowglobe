# Project Creation and Switching Stability Plan
#plan

## Objective
Ensure newly created projects open reliably, make switching between projects more explicit in the workspace UI, and improve deletion clarity plus action-button consistency.

## Scope
- `src/components/workspace-root.tsx`
- `src/components/workspace-sidebar.tsx`
- `src/components/app-shell.tsx`
- `ARCHITECTURE.md`
- `README.md`

## Out of Scope
- Server-backed persistence or sync changes.
- Deep route model changes for non-writing entities.

## Assumptions
- The visible flash/revert occurs because create-project navigation happens before the new project is durably available through IndexedDB-backed route recovery.
- Project switching should be obvious in both expanded and collapsed writing layouts.

## Tasks
1. Persist the newly created project before navigating into its canonical writing route.
2. Keep optimistic in-memory project state aligned with the persisted project used for navigation.
3. Add a clearer project-switch control alongside the existing project list/menu patterns.
4. Add a clearer per-project permanent delete action within the trashed-project lifecycle view.
5. Standardize project action button sizing and layout across shell and sidebar controls.
6. Tighten the bounded scope to the sidebar `Switch project` and `New project` pair when the broader action-control pass still leaves that exact pair visually uneven.
7. Add a clear delete path for the current project from the main shell so deletion does not depend on discovering the trash lifecycle view first.
8. Verify project creation, project switching, deletion affordances, and build-quality checks.
9. Sync architecture, changelog, and learning artifacts.

## Verification
- Creating a project lands on the new project instead of reverting to the previous one.
- Switching between at least two active projects is obvious and works from the shell controls.
- Trashed projects expose both restore and permanent delete actions without relying only on bulk empty-trash behavior.
- Project action buttons read as a consistent control set across the shell and sidebar.
- The sidebar `Switch project` and `New project` pair render with matching width, height, icon spacing, and alignment.
- The sidebar `Switch project` and `New project` pair remains stacked in a column while each button spans the available sidebar width.
- The active project can be deleted through a clear path from the main shell, not only through the sidebar trash-management view.
- Refreshing a project-scoped route keeps the same project.
- `npm run typecheck`, `npm run lint`, and `npm run build` pass.

## Blockers
- None.

## Completion Notes
- Project creation now updates in-memory state and persists directly to IndexedDB before navigating into the new project's canonical writing route.
- The shell/sidebar now exposes a clearer explicit project switcher action while preserving the existing visible project list and collapsed writing-rail menu.
- Trashed projects now expose a direct per-project permanent delete action in addition to the bulk empty-trash flow.
- Project action buttons now share a more uniform size and layout across the shell and sidebar lifecycle controls.
- Follow-up execution narrows success to the sidebar `Switch project` / `New project` pair specifically, since that exact control group still needed visible alignment cleanup.
- The sidebar `Switch project` / `New project` pair now shares matched flex sizing and breakpoint behavior in the same control group.
- Final acceptance clarified that the pair should remain vertically stacked; the implementation now keeps the column layout and lets each button fill the available width.
- Follow-up execution expands deletion clarity so the current project exposes an obvious path into permanent deletion from the main shell flow.
- The main shell now exposes `Delete project`, which moves active projects through the trash-first path and permanently deletes already-trashed projects directly.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Related Changelog
- [[..\project-concept\changelog\2026-05-11]]
