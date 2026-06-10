# UI Layout Defect Sweep Plan
#plan

## Objective
Fix high-impact layout and readability defects across the workspace shell, including smashed form fields, collapsed-sidebar width behavior, and overflow/scroll issues that reduce usability.

## Scope
- `src/components/app-shell.tsx`
- `src/components/workspace-sidebar.tsx`
- `src/components/manuscript-viewport.tsx`
- `src/components/context-panel.tsx`
- `src/components/entity-workspace.tsx`
- `src/components/scene-metadata-form.tsx`
- `src/components/project-quick-create-form.tsx`

## Out of Scope
- Domain model and persistence logic changes.
- New product features.
- Broad visual redesign outside targeted layout fixes.

## Current Reality
- Desktop collapsed sidebar mode is visually compact but still consumes too much horizontal space.
- Some form fields render too narrowly in dense card layouts.
- The inspector and expanded sidebar can become vertically cramped without robust internal scrolling.
- The manuscript navigator uses fragile fixed height math that can clip content when headers wrap.

## Assumptions
- Highest-value outcome is layout stability and readability rather than style changes.
- Existing MUI theme/system remains the baseline.
- Verification should include typecheck, lint, build, plus manual responsive checks.

## Tasks
1. Tighten collapsed-sidebar desktop column sizing in `app-shell.tsx` so the main workspace reclaims meaningful width.
2. Harden shell/grid min-height behavior so child cards can scroll correctly.
3. Add full-width text inputs in shared and inspector forms.
4. Refactor sidebar internals so expanded and collapsed modes remain usable with vertical overflow.
5. Replace fragile manuscript navigator fixed-height calculation with flex-based scrolling.
6. Add targeted wrap/overflow safeguards for link-management controls and dense text rows.
7. Verify with `npm run typecheck`, `npm run lint`, and `npm run build`.
8. Update architecture, changelog, and learning artifacts.

## Verification
- Collapsed sidebar on desktop leaves visibly more room for the active surface.
- Form controls remain full-width and readable in metadata and CRUD editors.
- Sidebar and inspector content remain accessible via internal scrolling when content grows.
- Chapter/scene navigator no longer relies on brittle fixed-height math.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- None at plan start.

## Completion Notes
- Updated `app-shell.tsx` collapsed desktop grid sizing so the sidebar rail compresses further and the center canvas expands more in collapsed mode.
- Added `minHeight: 0` and flex-wrapper protections across shell grid panes to preserve nested scroll behavior.
- Refined `workspace-sidebar.tsx` and `context-panel.tsx` with explicit internal overflow scrolling for long navigation and inspector content.
- Replaced manuscript navigator fixed-height calculation with flex-driven list scrolling in `manuscript-viewport.tsx`.
- Added `fullWidth` inputs in `entity-workspace.tsx`, `scene-metadata-form.tsx`, and `project-quick-create-form.tsx` to prevent narrow or smashed text boxes.
- Ran a second micro-polish pass to improve long-text handling in the inspector link-management buttons, project-switcher menu entries, and draft header chips.
- Extended micro-polish to scene-body and quick-create/metadata headings plus success alerts with wrap-safe typography defaults.
- Verification passed with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Handoff Context
If residual visual defects remain, the next pass should use screenshot-backed QA at common breakpoints and seeded long-content examples.

## Related Changelog
- [[..\project-concept\changelog\2026-05-04]]
