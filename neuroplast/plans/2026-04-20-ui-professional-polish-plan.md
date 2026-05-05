# UI Professional Polish Plan
#plan

## Objective
Make the application shell and workspace surfaces feel more professional by tightening spacing, sharpening border radiuses, reducing cramped nested layouts, and stacking dense sections more vertically where that improves readability.

## Scope
- Refine the shared MUI theme radius, shadow, and control treatment.
- Tighten editor surface framing and manuscript canvas spacing.
- Rebalance the main shell header, sidebar, writing viewport, inspector, and reusable entity workspaces.
- Stack dense worldbuilding and structure sub-surfaces more vertically to avoid cramped nested grids.
- Verify the pass with project quality checks.
- Update architecture, changelog, and learning artifacts after implementation.

## Out of Scope
- New product features or domain-model changes.
- Changes to persistence, repository behavior, or scene/link data flows.
- Mobile drawer redesign beyond responsive stacking and spacing improvements.

## Current Reality
- The UI already has a cleaner product direction, but many surfaces still use very soft corner treatment and generous nested padding.
- Several areas rely on viewport-based multi-column layouts that become cramped when a workspace is already inside a constrained shell column.
- The writing canvas, inspector, and CRUD surfaces all lose usable room because multiple framed layers compete for the same space.

## Assumptions
- A sharper professional feel should come mostly from theme-level radius and spacing adjustments rather than adding ornament.
- Vertically stacked workspace sections are preferable to squeezed side-by-side CRUD panels when density increases.
- The best result preserves the current information architecture while making shell chrome calmer and content areas roomier.

## Tasks
1. Tighten the theme radius, control styling, and shared surface treatment.
2. Reduce editor-shell framing and rebalance manuscript spacing.
3. Refine the main shell header, cards, and dialog layout for cleaner responsive behavior.
4. Tighten the sidebar and writing viewport visual density while preserving clarity.
5. Make inspector and entity workspaces breathe better and stack dense subsections more vertically.
6. Verify with `npm run typecheck`, `npm run lint`, and `npm run build`.
7. Update architecture, changelog, and learning artifacts.

## Verification
- Shared controls and cards use visibly sharper radiuses.
- Dense UI sections no longer feel squeezed at common laptop and desktop widths.
- World, lore, and structure surfaces avoid cramped nested side-by-side CRUD layouts.
- Manuscript, sidebar, and inspector content preserve clear hierarchy with improved usable room.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- No blockers at plan creation time.

## Completion Notes
- Tightened the shared MUI radius and control system so cards, inputs, buttons, and dialogs read as sharper workspace UI instead of soft marketing surfaces.
- Reduced editor framing and nested panel padding to return more usable room to manuscript and form-heavy surfaces.
- Rebalanced the shell header, dialog header, sidebar, manuscript viewport, inspector, and reusable entity workspaces for cleaner spacing and earlier stacking.
- Simplified dense world, lore, and structure layouts into more vertical flows so nested workspaces no longer feel cramped inside the wider shell.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Handoff Context
If this pass still leaves areas feeling busy, the next iteration should reduce duplicate framing patterns further by introducing a clearer distinction between primary panels, secondary panels, and inline supporting sections.

## Related Changelog
- [[..\project-concept\changelog\2026-04-20]]
