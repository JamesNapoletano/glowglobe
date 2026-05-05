# Premium MUI Product Polish Plan
#plan

## Objective
Refine the current Material UI shell into a more premium modern product experience by improving theme depth, hierarchy, spacing, density, and surface contrast without changing the underlying workflows.

## Scope
- Strengthen the MUI theme with better elevation, typography rhythm, and component treatment.
- Polish the global shell, sidebar, manuscript workspace, entity workspaces, and inspector.
- Improve perceived quality through spacing, card layering, emphasis, and visual consistency.
- Preserve the existing local-first product behavior and current surface structure.
- Update architecture, changelog, and learning artifacts to reflect the refined UI direction.

## Out of Scope
- New product features or workflow changes.
- Domain-model or persistence changes.
- Route restructuring.

## Current Reality
- The app already uses Material UI across the core shell and shared surfaces.
- The UI is cleaner than before, but it still feels close to a direct component migration rather than a fully intentional premium product interface.
- The best leverage is in the shared theme plus a small number of highly visible shell surfaces.

## Assumptions
- The desired direction remains clean product / modern SaaS rather than editorial or playful.
- Stronger hierarchy and more deliberate density will improve perceived quality more than adding ornament.
- Editor-specific CSS should remain lightweight and stable.

## Tasks
1. Refine the shared theme for better depth, typography, and component defaults.
2. Polish the shell header, cards, and navigation hierarchy.
3. Polish the manuscript workspace framing and supporting panels.
4. Polish entity workspace and inspector presentation for stronger product consistency.
5. Verify the UI pass and update architecture, changelog, and learning artifacts.

## Verification
- The app retains all current workflows while presenting a more premium and intentional product UI.
- Shell hierarchy, sidebar navigation, and manuscript framing feel more deliberate than the initial MUI migration.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- No blockers at plan creation time.

## Completion Notes
- Refined the shared MUI theme for stronger hierarchy, spacing, border radii, and surface depth.
- Polished the shell header, sidebar, manuscript framing, CRUD workspaces, and inspector with more intentional contrast and layering.
- Preserved all existing workflows while improving perceived product quality.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Handoff Context
If this pass lands well, the next design iteration should focus on interaction polish such as keyboard-forward navigation, denser power-user modes, and stronger empty-state/product-onboarding patterns.

## Related Changelog
- [[..\project-concept\changelog\2026-04-19]]
