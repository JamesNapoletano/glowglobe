# Screenshot-Aligned Writing Layout Plan
#plan

## Objective
Refactor the writing workspace so its layout reads much closer to the provided screenshot: a calmer three-pane editorial workspace with less top-level chrome, cleaner pane hierarchy, and a more dominant center draft canvas.

## Scope
- `src/components/app-shell.tsx`
- `src/components/workspace-sidebar.tsx`
- `src/components/manuscript-viewport.tsx`
- `src/components/context-panel.tsx`
- `src/components/scene-body-editor.tsx`
- `ARCHITECTURE.md`
- `README.md`
- `neuroplast/project-concept/Writing Studio - Orientation.md`
- `neuroplast/project-concept/changelog/2026-05-08.md`
- `neuroplast/learning/ui/*.md`
- `neuroplast/plans/.active-plan`

## Out of Scope
- Persistence, routing, or domain-model changes.
- Official branding assets.
- Broad non-writing workspace redesign.
- New writing functionality beyond layout and presentation.

## Assumptions
- The screenshot is the primary layout reference for the writing route.
- The current branding token system can remain and support the new layout.
- The biggest cleanliness gap comes from structural hierarchy and nesting, not just color or typography.

## Tasks
1. Persist this plan and mark it active for the current cycle.
2. Remove or sharply reduce the oversized writing-mode summary chrome in `src/components/app-shell.tsx`.
3. Refactor the writing route into a cleaner three-pane layout with calmer left and right utility rails.
4. Simplify `src/components/manuscript-viewport.tsx` so the center column better matches the screenshot hierarchy.
5. Simplify `src/components/context-panel.tsx` so the inspector reads as stacked framed sections instead of repeated card-heavy blocks.
6. Align the draft canvas and supporting sections with the screenshot’s quieter editorial structure.
7. Verify with `npm run typecheck`, `npm run lint`, and `npm run build`.
8. Update architecture, changelog, concept, README, and learning artifacts.

## Verification
- Writing mode no longer reads like a dashboard with a large banner above the workspace.
- The layout reads as a coherent left rail / draft canvas / inspector composition.
- The center writing area is visually dominant.
- The inspector is cleaner and less card-fragmented.
- `npm run typecheck`, `npm run lint`, and `npm run build` pass.

## Blockers
- None.

## Completion Notes
- Reworked `src/components/app-shell.tsx` so writing mode uses a dedicated full-height three-pane layout instead of the oversized shared top banner.
- Simplified `src/components/manuscript-viewport.tsx` into a cleaner editorial center pane with compact project context, utility structure panels, and a more dominant draft area.
- Simplified `src/components/context-panel.tsx` into quieter inspector sections with less nested card framing.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Related Changelog
- [[..\project-concept\changelog\2026-05-08]]

## Restart Point
- If interrupted, resume from `src/components/app-shell.tsx`, then finish `manuscript-viewport.tsx` and `context-panel.tsx` before verification.
