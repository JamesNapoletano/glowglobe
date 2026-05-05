# Tight Persisted Sidebar Plan
#plan

## Objective
Refine the left workspace sidebar into a tighter, sharper navigation rail with stronger text contrast and a persisted expand/collapse control that gives more space back to the main canvas.

## Scope
- Tighten the sidebar visual density, spacing, borders, and corner treatment.
- Improve selected and unselected text contrast in sidebar navigation states.
- Add a full-sidebar expand/collapse control for desktop layouts.
- Persist the sidebar preference in local storage across reloads.
- Reflow the shell layout so the main workspace expands when the sidebar is collapsed.
- Update architecture, changelog, and learning artifacts after implementation.

## Out of Scope
- Changes to project data persistence or domain modeling.
- New navigation surfaces or workflow restructuring.
- Mobile-specific drawer behavior beyond preserving the current expanded stacked layout.

## Current Reality
- The current left rail is visually polished but still relatively soft and roomy.
- The sidebar always renders at full width, even when the user wants more manuscript or surface space.
- Sidebar text contrast was improved in previous selected-state work, but this pass still needs stronger explicit contrast handling while tightening the UI.

## Assumptions
- The best v1 behavior is to apply the collapsed rail only on large desktop layouts while preserving the user preference across reloads.
- Local storage is the right persistence layer because sidebar collapse is a shell preference, not project content.
- Compact icon-first navigation remains usable if tooltips and a clear re-expand affordance stay present.

## Tasks
1. Add a persisted sidebar collapsed preference using an SSR-safe client pattern.
2. Refactor the shell layout so the center workspace expands when the sidebar is collapsed.
3. Tighten the sidebar visual treatment with sharper radii, firmer borders, and denser spacing.
4. Add an expand/collapse control and compact collapsed-mode affordances for projects and surfaces.
5. Verify with `npm run typecheck`, `npm run lint`, and `npm run build`.
6. Update architecture, changelog, and learning artifacts.

## Verification
- On large screens, the entire sidebar can collapse into a compact rail and expand again.
- Reloading preserves the user’s sidebar preference.
- Project switching and workspace surface switching remain available in both expanded and collapsed modes.
- Sidebar titles and supporting text remain readable in active and inactive states.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- No blockers at plan creation time.

## Completion Notes
- Added a persisted desktop sidebar collapse preference stored in local storage with SSR-safe client hydration.
- Tightened the sidebar with sharper list radii, denser spacing, firmer borders, and explicit selected-state contrast treatment.
- Added a collapsed icon rail with project switching, new-project access, active-surface status, and tooltips.
- Rebalanced the shell grid so the main workspace expands when the sidebar is collapsed.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Handoff Context
If this pass works well, a future shell iteration could add keyboard shortcuts, hover-expand behavior experiments, or a denser power-user navigation mode.

## Related Changelog
- [[..\project-concept\changelog\2026-04-20]]
