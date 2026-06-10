# Stacked Workspace Layout Plan
#plan

## Objective
Convert non-writing workspaces from grid-based editor layouts into a vertically stacked flow with a single title card, a table of contents with scroll links, and ordered collapsible editor sections.

## Scope
- `src/components/entity-workspace.tsx`
- `src/components/planning-entity-workspace.tsx`
- `src/components/workspace-surface-content.tsx`
- `ARCHITECTURE.md`
- `README.md`
- `neuroplast/project-concept/changelog/2026-05-08.md`
- `neuroplast/learning/*.md`

## Out of Scope
- Writing Studio manuscript layout.
- Sidebar or route architecture changes.
- Persistence, repository, or domain-model changes.

## Assumptions
- The requested “workspaces” are the non-writing surfaces rendered by `WorkspaceSurfaceContent`.
- The title card should appear once per surface, not once per nested editor block.
- The table of contents should jump to vertically ordered sections within the same page.
- Collapsible behavior should default to expanded so existing information remains immediately visible.

## Tasks
1. Persist this bounded execution plan and mark it active for the current cycle.
2. Refactor the shared non-writing workspace component so it can render a single surface-level title card and reusable ordered sections.
3. Replace the side-by-side directory/editor grid with vertically stacked collapsible sections that combine browsing and editing for each editor area.
4. Add a surface-level table of contents with in-page scroll links.
5. Update multi-editor surfaces (`world`, `lore`, `structure`) to use the new ordered stacked sections.
6. Verify with `npm run typecheck`, `npm run lint`, and `npm run build`.
7. Sync architecture, changelog, and learning artifacts with the new workspace behavior.

## Verification
- Each non-writing surface renders a single title card at the top.
- A table of contents appears beneath the title card and scrolls to the correct section anchors.
- Editor sections render in a stable vertical order beneath the TOC.
- Each section can be expanded and collapsed without breaking scrolling or overflow behavior.
- `npm run typecheck`, `npm run lint`, and `npm run build` pass.

## Blockers
- None.

## Completion Notes
- Refactored the shared non-writing workspace primitives so surfaces can render a single title card, shared metrics, a table of contents, and ordered collapsible sections.
- Replaced the older side-by-side nested grids for `world`, `lore`, and `structure` with stacked section flows that preserve editor ordering and in-page navigation.
- Updated single-surface editors to use the same stacked pattern so characters, technology, timeline, and corkboard remain visually consistent.
- Removed duplicated inner section titles so accordion headers remain the single source of section naming while the body cards focus on browsing and editing tasks.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Related Changelog
- [[..\project-concept\changelog\2026-05-08]]

## Restart Point
- If interrupted, resume in `src/components/entity-workspace.tsx`, then re-check `workspace-surface-content.tsx` section ordering before running verification.
