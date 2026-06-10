# Aurora Branding Sheet and MUI Theme Plan
#plan

## Objective
Translate the final Aurora Stitch workspace screen into a reusable branding sheet and a refined shared MUI theme that can be applied directly across the GlowGlobe app shell.

## Scope
- `docs/aurora-branding-sheet.md`
- `src/theme/brand-tokens.ts`
- `src/theme.ts`
- `src/components/glowglobe-logo.tsx`
- `src/components/app-shell.tsx`
- `src/components/workspace-sidebar.tsx`
- `src/components/context-panel.tsx`
- `src/components/manuscript-viewport.tsx`
- `README.md`
- `ARCHITECTURE.md`
- `neuroplast/project-concept/Writing Studio - Orientation.md`
- `neuroplast/project-concept/changelog/2026-05-21.md`
- `neuroplast/learning/ui/editorial-brand-tokens-make-visual-direction-easier-to-evolve.md`
- `neuroplast/plans/.active-plan`

## Out of Scope
- Creating or editing Stitch screens.
- Replacing the temporary logo with final brand artwork.
- Reworking workspace behavior, routing, or persistence.

## Assumptions
- Aurora screen `52c579cff70d4a5580e69fe71a3d28ca` is the current visual source of truth.
- The desired direction is calmer, flatter, warmer, and more document-like than the existing editorial pass.
- A human-readable branding sheet plus executable theme tokens is the right durable output for future app polish work.

## Tasks
1. Persist this bounded plan and mark it active.
2. Extract Aurora-style palette, typography, surfaces, and component patterns into a branding sheet.
3. Refine shared brand tokens and MUI theme defaults to match the new sheet.
4. Apply the updated tokens to the highest-visibility shell, navigator, draft, and inspector surfaces.
5. Verify with `npm run typecheck`, `npm run lint`, and `npm run build`.
6. Update changelog, architecture, concept, README, and learning artifacts.

## Verification
- `docs/aurora-branding-sheet.md` exists and maps visual decisions to MUI theme structure.
- Shared theme values come from `src/theme/brand-tokens.ts` and `src/theme.ts` rather than scattered literals alone.
- The writing shell reads closer to the Aurora reference through warmer paper surfaces, quieter accents, and flatter component styling.
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.

## Blockers
- None.

## Related Changelog
- [[..\project-concept\changelog\2026-05-21]]

## Restart Point
- Resume in `docs/aurora-branding-sheet.md`, then `src/theme/brand-tokens.ts`, before polishing shell surface literals.
