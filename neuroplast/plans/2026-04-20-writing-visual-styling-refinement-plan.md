# Writing Visual Styling Refinement Plan
#plan

## Objective
Refine the visual styling of the compact writing workspace so the navigator, draft chrome, and adjacent support surfaces feel more cohesive, intentional, and premium without adding new features.

## Scope
- Improve the visual hierarchy and material treatment of the compact chapter and scene navigator.
- Refine styling of writing-adjacent surfaces such as the draft header, editor shell, and support cards.
- Use contrast, borders, tinting, spacing, and subtle emphasis to make the writing layout feel more polished.
- Verify with project quality checks.
- Update architecture, concept, changelog, and learning artifacts after implementation.

## Out of Scope
- New navigation behaviors or data-model changes.
- Inspector redesign beyond minor consistency alignment if needed.
- Broad theme restyling outside the current writing workspace focus.

## Current Reality
- The writing workspace is now denser and more space-efficient, but the new compact navigator still reads more as a functional list than a fully polished authored experience.
- Support cards and draft-adjacent chrome are structurally improved but can still benefit from stronger visual hierarchy.
- The next highest-value step is styling refinement rather than further layout compression.

## Assumptions
- A premium feel here comes from stronger hierarchy, calmer contrast, and better use of selected-state emphasis rather than more ornament.
- The compact navigator should look intentionally designed, not merely compressed.
- The writing canvas should still remain visually dominant over the navigation and support surfaces.

## Tasks
1. Refine the compact navigator styling in `src/components/manuscript-viewport.tsx`.
2. Improve the visual hierarchy of the draft header and support cards in the writing workspace.
3. Tighten editor-adjacent styling in `src/components/scene-body-editor.tsx` and related surfaces if needed.
4. Apply any small writing-specific theme or shared-style refinements that support the polish pass.
5. Verify with `npm run typecheck`, `npm run lint`, and `npm run build`.
6. Update architecture, concept, changelog, and learning artifacts.

## Verification
- The compact navigator reads as a deliberate premium UI instead of a plain compressed list.
- Active chapter and scene states are easier to scan and visually distinguish.
- The draft canvas remains the main visual focus.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- No blockers at plan creation time.

## Completion Notes
- Refined the compact writing navigator with stronger selected-state styling, calmer panel contrast, and a more deliberate active-chapter section treatment.
- Improved draft-adjacent surfaces with better card hierarchy, softer material contrast, and subtler premium depth cues that keep the writing canvas visually dominant.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Handoff Context
If the writing workspace still needs a stronger editorial identity after this pass, the next step should explore a more explicit distinction between manuscript chrome and authoring support surfaces through contrast tiers and typography treatment.

## Related Changelog
- [[..\project-concept\changelog\2026-04-20]]
