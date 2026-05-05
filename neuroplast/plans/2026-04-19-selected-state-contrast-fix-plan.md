# Selected State Contrast Fix Plan
#plan

## Objective
Fix low-contrast and missing-looking text in dark selected UI states so active navigation, selected entries, and selected chips remain clearly readable and visually intentional.

## Scope
- Audit selected and active dark UI states introduced by the current shell refresh.
- Replace low-contrast nested text colors inside dark surfaces with accessible inverted text styling.
- Align focus and selection accents with the current blue design system.
- Verify the repository still passes typecheck, lint, and production build.

## Out of Scope
- Full accessibility audit beyond the identified selected-state contrast issues.
- New component features or broader visual redesign.
- Introducing automated accessibility tooling in this bounded pass.

## Current Reality
- Some dark selected cards and buttons still use nested dark-gray text, which creates poor contrast or makes labels appear absent.
- The current visual system mixes updated blue accents with older brown focus and text-selection colors.
- Selected-state patterns are repeated across navigation, manuscript structure, and inspector link management.

## Assumptions
- The simplest and most reliable v1 fix is to standardize selected dark states around a shared light/inverted text treatment.
- The current dark selected background token can remain in use if nested copy stops overriding to darker tones.

## Tasks
1. Normalize selected dark-state text treatment across shared UI components.
2. Remove low-contrast nested text overrides from active/selected states.
3. Align global focus and text-selection colors with the current accent palette.
4. Run verification commands and fix any issues.
5. Update changelog and learning artifacts.

## Verification
- Active navigation items show both title and supporting text clearly.
- Selected entity cards and scene items keep readable primary and secondary text.
- Selected chips in the inspector remain legible.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- No blockers at plan creation time.

## Completion Notes
- Completed a selected-state contrast pass across navigation, manuscript selection, entity workspaces, inspector chips, and dark primary action buttons.
- Replaced low-contrast nested dark-state copy with shared inverted text treatment.
- Aligned global focus and text selection highlights with the blue accent palette.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Handoff Context
If this pass succeeds, the next accessibility improvement should be a broader semantic token pass for hover, focus, disabled, and destructive states so future visual updates stay contrast-safe by default.

## Related Changelog
- [[..\project-concept\changelog\2026-04-19]]
