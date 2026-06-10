# Hide Single-Entry Table Of Contents Plan
#plan

## Objective
Hide the shared non-writing workspace table of contents when a page has fewer than two sections.

## Scope
- `src/components/entity-workspace.tsx`
- `README.md`
- `ARCHITECTURE.md`
- `neuroplast/project-concept/changelog/2026-05-21.md`
- `neuroplast/learning/ui-layout-patterns.md`

## Out of Scope
- Changing section ordering or accordion defaults.
- Altering writing-surface layout behavior.
- Reworking non-writing workspace routing or persistence.

## Assumptions
- Table-of-contents visibility should be driven by the shared `sections` array passed into `WorkspaceSurfaceLayout`.
- Single-section surfaces should still render their title card and section content, just without the extra TOC card.
- Multi-section surfaces such as World, Lore, and Structure should keep the current TOC behavior.

## Tasks
1. Persist this bounded execution plan and mark it active.
2. Update the shared workspace layout so the TOC renders only when at least two sections exist.
3. Verify single-section and multi-section surfaces still use the shared layout correctly.
4. Run `npm run typecheck`, `npm run lint`, and `npm run build`.
5. Sync README, architecture, changelog, and learning artifacts if wording now needs refinement.

## Verification
- Pages with zero or one TOC entry do not render the table-of-contents card.
- Multi-section pages still render TOC links beneath the title card.
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.

## Blockers
- None.

## Completion Notes
- Updated `WorkspaceSurfaceLayout` so the table-of-contents card only renders when `sections.length >= 2`.
- Left single-section surfaces on the same shared scaffold while removing redundant TOC chrome from those pages.
- Synced README, architecture, changelog, and learning artifacts with the conditional TOC behavior.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Related Changelog
- [[..\project-concept\changelog\2026-05-21]]

## Restart Point
- Resume in `src/components/entity-workspace.tsx` around `WorkspaceSurfaceLayout` and then re-run the standard Next.js verification commands.
