# Sociums Surface Plan
#plan

## Objective
Add a first-class `Sociums` workspace surface for tracking factions, clans, guilds, kingdoms, corporations, religions, and similar groups with a required type dropdown plus richer structured fields.

## Scope
- `src/lib/domain/types.ts`
- `src/lib/domain/project-factory.ts`
- `src/lib/domain/project-normalizer.ts`
- `src/lib/mock-data/sample-project.ts`
- `src/components/entity-workspace.tsx`
- `src/components/workspace-surfaces.ts`
- `src/components/workspace-sidebar.tsx`
- `src/components/workspace-surface-content.tsx`
- `src/components/workspace-root.tsx`
- `README.md`
- `ARCHITECTURE.md`
- `neuroplast/project-concept/*.md`
- `neuroplast/project-concept/changelog/2026-05-13.md`
- `neuroplast/learning/ui/*.md`

## Out of Scope
- Scene-link inspector integration for sociums.
- Character membership modeling.
- Graph or hierarchy visualization for allied, rival, or parent/child groups.
- Relational ID-based ally/rival links.

## Assumptions
- `Socium` is the singular entity name and `Sociums` is the top-level surface label.
- Allies and rivals should ship now as richer multiline text fields rather than cross-entity references.
- The type dropdown should use bounded predefined values: `faction`, `clan`, `guild`, `kingdom`, `corporation`, `religion`, `tribe`, `order`, `house`, and `other`.
- Richer socium fields should remain text-first in v1 to keep the surface consistent with the existing local-first CRUD pattern.

## Tasks
1. Persist this bounded execution plan and mark it as the active plan for the current cycle.
2. Add `Socium` domain types, project collection support, create/update/delete helpers, and hydration for older saved projects.
3. Extend the shared entity form system to support select/dropdown fields.
4. Add the `Sociums` workspace surface to navigation and sidebar surface metadata.
5. Implement the `Sociums` CRUD workspace with the required type dropdown and richer fields including allies and rivals.
6. Seed the sample project with an example socium entry so the new surface has realistic starter content.
7. Sync architecture, concept, changelog, README, and learning artifacts with the new first-class surface.
8. Verify with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Verification
- The sidebar shows `Sociums` as a first-class surface.
- The Sociums editor renders a required type dropdown instead of a plain text input.
- Rich fields including allies and rivals can be created, edited, saved, and reloaded.
- Older saved projects hydrate with `sociums: []` and continue loading without runtime errors.
- `npm run typecheck`, `npm run lint`, and `npm run build` pass.

## Blockers
- None.

## Completion Notes
- Added a first-class `Sociums` surface with sidebar navigation, project-scoped routing support, and a dedicated CRUD workspace built on the shared non-writing surface pattern.
- Extended the shared entity form system with a reusable select field so the socium `type` now uses a bounded dropdown instead of freeform text.
- Added `Socium` domain modeling, project-factory create/update/delete helpers, project normalization for older saved records, and seeded sample data for realistic surface validation.
- Synced `ARCHITECTURE.md`, project-concept notes, changelog, README, and a reusable learning note with the new surface behavior.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Related Changelog
- [[..\project-concept\changelog\2026-05-13]]

## Restart Point
- Resume in `src/lib/domain/project-factory.ts` and `src/components/workspace-surface-content.tsx` if execution pauses before the new surface wiring and artifact sync complete.
