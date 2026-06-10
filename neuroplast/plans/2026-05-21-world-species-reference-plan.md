# World Species Reference Plan
#plan

## Objective
Add reusable species records to the World workspace and convert character species/type into a select-backed shared reference.

## Scope
- `src/lib/domain/types.ts`
- `src/lib/domain/project-factory.ts`
- `src/lib/domain/project-normalizer.ts`
- `src/lib/mock-data/sample-project.ts`
- `src/components/workspace-surface-content.tsx`
- `src/components/workspace-root.tsx`
- `src/lib/repositories/interfaces.ts`
- `README.md`
- `ARCHITECTURE.md`
- `neuroplast/project-concept/Environment and Planet - Orientation.md`
- `neuroplast/project-concept/Environment and Planet - Detailed Context.md`
- `neuroplast/project-concept/changelog/2026-05-21.md`
- `neuroplast/learning/ui/shared-world-reference-entities-should-replace-repeated-character-freeform-fields.md`

## Out of Scope
- Promoting Species into its own top-level surface.
- Adding species-to-scene linking.
- Visual taxonomy or ancestry graphs.

## Assumptions
- Species is a shared worldbuilding entity, not character-only metadata.
- Character profiles should use a bounded select instead of repeating freeform species labels.
- Removing a species should safely clear character references without deleting characters.

## Tasks
1. Persist this bounded plan and mark it active.
2. Add the Species entity to the shared project domain and normalization flow.
3. Add a Species section under World and convert character species to a select-backed `speciesId` field.
4. Refresh seed data and supporting repository interfaces.
5. Sync architecture, concept, changelog, README, and learning artifacts.
6. Run `npm run typecheck`, `npm run lint`, and `npm run build`.

## Verification
- The World workspace supports create, edit, and delete flows for species.
- Character profiles select a species from a dropdown instead of free text.
- Deleting a species clears any affected `speciesId` values without breaking characters.
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.

## Blockers
- None.

## Completion Notes
- Added a reusable `Species` entity and a World workspace section for species management.
- Replaced freeform character species text with `speciesId` selection.
- Synced sample data, docs, concept notes, changelog, and learning artifacts with the new reference pattern.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Related Changelog
- [[..\project-concept\changelog\2026-05-21]]

## Restart Point
- Resume in `src/components/workspace-surface-content.tsx` if the World workspace later needs deeper species-specific summaries or promotion into a standalone surface.
