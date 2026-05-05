# Selected Contrast Guardrails Plan
#plan

## Objective
Fix the low-contrast selected navigation state and establish shared frontend guardrails so strong and soft selected surfaces keep readable text by default.

## Scope
- Centralize reusable selected-state contrast rules for the React/MUI shell.
- Fix the active workspace navigation item that currently uses weak supporting-text contrast.
- Apply the same guardrails to other selected list patterns that use the same visual system.
- Verify the repository still passes typecheck, lint, and production build.

## Out of Scope
- A full accessibility audit across every component and route.
- Reworking the overall palette or broader visual redesign.
- Adding automated accessibility testing tooling in this pass.

## Current Reality
- The full sidebar work-surface navigation uses a dark selected state with supporting text set to a translucent white override that is too weak against the current blue treatment.
- Selected-state styling is repeated across multiple list-driven surfaces instead of being defined through one shared rule set.
- Earlier contrast fixes improved several dark selections, but newer UI refinements reintroduced inconsistency in how nested selected text is colored.

## Assumptions
- The product should keep two selected-state tiers: a strong dark/accent treatment and a softer tinted treatment.
- Shared helper styles are the fastest way to prevent future contrast regressions without forcing theme augmentation work.

## Tasks
1. Add shared selected-state contrast guardrail helpers for strong and soft list-item selections.
2. Update workspace sidebar navigation to use the shared guardrails and readable nested text treatment.
3. Normalize manuscript and entity list selections that rely on similar selected-state patterns.
4. Run `npm run typecheck`, `npm run lint`, and `npm run build`.
5. Update architecture, changelog, and learning artifacts.

## Verification
- Active workspace navigation titles and descriptions remain clearly legible in selected state.
- Dark selected scene items and tinted selected list items keep consistent readable text.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- No blockers at plan creation time.

## Completion Notes
- Added shared selected-state guardrail helpers for strong dark/accent selections and softer tinted selections.
- Updated the workspace sidebar, manuscript navigator, and entity list patterns to use shared selected foreground rules instead of ad hoc nested color overrides.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Handoff Context
If this pass succeeds, the next accessibility-focused UI refinement should extend the same shared guardrail approach to hover, focus-visible, disabled, and destructive semantic states.

## Related Changelog
- [[..\project-concept\changelog\2026-04-20]]
