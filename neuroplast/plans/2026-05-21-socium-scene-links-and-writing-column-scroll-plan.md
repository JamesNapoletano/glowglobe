# Socium Scene Links And Writing Column Scroll Plan
#plan

## Objective
Link Sociums directly from the Writing Studio inspector and make the center writing workspace column scrollable so all draft-adjacent content remains reachable within the bounded writing layout.

## Scope
- `src/lib/domain/types.ts`
- `src/lib/domain/project-factory.ts`
- `src/lib/domain/project-normalizer.ts`
- `src/lib/mock-data/sample-project.ts`
- `src/components/context-panel.tsx`
- `src/components/manuscript-viewport.tsx`
- `README.md`
- `ARCHITECTURE.md`
- `neuroplast/project-concept/Writing Studio - Detailed Context.md`
- `neuroplast/project-concept/Sociums - Detailed Context.md`
- `neuroplast/project-concept/changelog/2026-05-21.md`
- `neuroplast/learning/ui/*.md`

## Out of Scope
- Socium membership modeling for characters.
- Inline manuscript mentions or autocomplete for sociums.
- Graph-style alliance and rivalry visualization.
- Reworking the left navigator or right inspector layout beyond what is needed to keep the center column reachable.

## Assumptions
- Scene-level Socium links should behave like the existing character, location, technology, timeline, plot-thread, and glossary links.
- The existing inspector chip-toggle model is still sufficient for first-pass Socium scene linking.
- The center writing column should scroll as one bounded pane instead of forcing the full page taller.

## Tasks
1. Persist this bounded execution plan and mark it active.
2. Extend the scene link model with `sociumIds` and hydrate older saved scenes safely.
3. Update sample data so the seeded scene demonstrates a linked socium.
4. Add Sociums to the Writing Studio inspector summary, linked sections, and link-management controls.
5. Make the center writing column scrollable while preserving editor usability and reachability for the draft-adjacent cards below the editor.
6. Sync architecture, concept, changelog, README, and learning artifacts with the new behavior.
7. Verify with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Verification
- Scene data can persist `sociumIds` alongside the other scene link arrays.
- The inspector shows linked sociums and allows toggling sociums on the active scene.
- Older saved projects without `sociumIds` continue loading without runtime errors.
- The center writing column can scroll to reach the scene note and session cues without stretching the whole shell.
- `npm run typecheck`, `npm run lint`, and `npm run build` pass.

## Blockers
- None.

## Completion Notes
- Added `sociumIds` to the scene link model, scene creation defaults, persisted sample data, and hydration logic for older saved projects.
- Updated the Writing Studio inspector to show linked sociums and manage Socium scene links through the same toggle-based linking workflow used by other scene reference entities.
- Made the center writing column scrollable as its own pane so the draft-adjacent support cards remain reachable inside the bounded shell.
- Synced README, architecture, concept, changelog, and learning artifacts with the new behavior.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Related Changelog
- [[..\project-concept\changelog\2026-05-21]]

## Restart Point
- Resume in `src/components/context-panel.tsx` for inspector link wiring and `src/components/manuscript-viewport.tsx` for center-column overflow behavior if work pauses.
