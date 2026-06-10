# Character Wiki Profile Expansion Plan
#plan

## Objective
Expand the Characters surface into a wiki-style story-bible workspace with lightweight required profile fields, optional dossier sections, and typed character relationships.

## Scope
- `src/lib/domain/types.ts`
- `src/lib/domain/project-factory.ts`
- `src/lib/domain/project-normalizer.ts`
- `src/lib/mock-data/sample-project.ts`
- `src/components/workspace-surface-content.tsx`
- `src/components/workspace-root.tsx`
- `src/components/workspace-surfaces.ts`
- `src/components/context-panel.tsx`
- `README.md`
- `ARCHITECTURE.md`
- `neuroplast/project-concept/Characters - Orientation.md`
- `neuroplast/project-concept/Characters - Detailed Context.md`
- `neuroplast/project-concept/changelog/2026-05-21.md`
- `neuroplast/learning/ui/lightweight-core-plus-optional-dossier-fields-keep-character-wikis-usable.md`

## Out of Scope
- Visual relationship graphs.
- Auto-derived scene appearance timelines.
- Character-specific analytics beyond existing scene-link counts.

## Assumptions
- Character creation should remain fast enough for minor characters.
- Optional dossier sections can remain blank without hurting usability.
- Relationships should stay typed and list-first in v1.

## Tasks
1. Persist this bounded plan and mark it active.
2. Expand the character and relationship domain schema while preserving compatibility with older local data.
3. Update the Characters workspace to support profile dossiers plus typed relationship editing.
4. Refresh seeded sample data and inspector summaries so the richer model reads clearly.
5. Sync architecture, concept, changelog, README, and learning artifacts.
6. Run `npm run typecheck`, `npm run lint`, and `npm run build`.

## Verification
- Character profiles support required core fields plus optional dossier fields.
- Typed relationships can be created, edited, and deleted from the Characters surface.
- Older relationship `description` data hydrates into the new notes field.
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.

## Blockers
- None.

## Completion Notes
- Expanded the `Character` schema with lightweight core fields plus optional dossier sections and added typed `Relationship` records with notes.
- Reworked the Characters surface into stacked profile and relationship sections while preserving the shared non-writing workspace patterns.
- Synced sample data, inspector summaries, README, architecture, concept notes, changelog, and a reusable learning note with the new character wiki behavior.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Related Changelog
- [[..\project-concept\changelog\2026-05-21]]

## Restart Point
- Resume in `src/components/workspace-surface-content.tsx` and `src/components/workspace-root.tsx` if follow-up refinement is needed around Characters surface usability or relationship editing.
