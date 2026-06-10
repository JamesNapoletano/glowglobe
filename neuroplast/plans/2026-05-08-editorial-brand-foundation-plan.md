# Editorial Brand Foundation Plan
#plan

## Objective
Translate the provided writing-studio screenshot into a reusable editorial brand foundation for GlowGlobe, including shared design tokens and a temporary placeholder logo that can later be replaced with an official mark.

## Scope
- `src/theme/brand-tokens.ts`
- `src/theme.ts`
- `src/components/glowglobe-logo.tsx`
- `src/components/app-shell.tsx`
- `src/components/workspace-sidebar.tsx`
- `src/components/manuscript-viewport.tsx`
- `src/components/scene-body-editor.tsx`
- `src/components/workspace-root.tsx`
- `src/app/not-found.tsx`
- `src/app/globals.css`
- `ARCHITECTURE.md`
- `README.md`
- `neuroplast/project-concept/Writing Studio - Orientation.md`
- `neuroplast/project-concept/changelog/2026-05-08.md`
- `neuroplast/learning/ui/*.md`
- `neuroplast/plans/.active-plan`

## Out of Scope
- Official logo artwork.
- New workspace behaviors, routing, or persistence changes.
- Pixel-perfect reproduction of the reference screenshot.

## Assumptions
- The current MUI theme remains the shared styling entrypoint.
- The desired direction is warm, editorial, manuscript-forward, and calmer than the current blue product palette.
- A temporary geometric placeholder logo is acceptable until official brand assets arrive.

## Tasks
1. Persist this plan and mark it active for the current cycle.
2. Create screenshot-derived brand tokens for palette, typography, borders, and surface treatments.
3. Add a reusable placeholder logo component for the shell and fallback screens.
4. Apply the brand tokens to the shared theme and high-visibility shell surfaces.
5. Bring the writing canvas closer to the editorial screenshot direction while preserving current behavior.
6. Verify with `npm run typecheck`, `npm run lint`, and `npm run build`.
7. Update architecture, concept, changelog, README, and learning artifacts.

## Verification
- Shared theme values come from a dedicated branding token file instead of scattered literals.
- The shell reads as a warmer editorial workspace with calmer surfaces and restrained accents.
- A placeholder GlowGlobe logo appears in key shell entry points and can be swapped later.
- The manuscript editor uses a lighter paper-like presentation distinct from surrounding chrome.
- `npm run typecheck`, `npm run lint`, and `npm run build` pass.

## Blockers
- None.

## Completion Notes
- Added `src/theme/brand-tokens.ts` to centralize the screenshot-derived editorial palette, typography split, and surface treatments.
- Added `src/components/glowglobe-logo.tsx` as a temporary reusable placeholder mark and replaced bare text wordmarks in key shell and fallback entry points.
- Restyled the shared theme, shell, sidebar, inspector-adjacent cards, and manuscript editor toward a warmer paper-forward writing-studio feel.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Related Changelog
- [[..\project-concept\changelog\2026-05-08]]

## Restart Point
- If interrupted, resume from `src/theme/brand-tokens.ts`, then finish shell logo integration before running verification.
