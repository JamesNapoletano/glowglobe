# Project Aggregate Manuscript CRUD
#learning

## Insight
When local-first persistence is still centered on a broad project aggregate, chapter and scene CRUD can ship quickly if selection state and mutation helpers stay explicit.

## Why It Matters
This keeps manuscript structure usable before introducing a rich editor or finer-grained repositories, while reducing the chance that UI components start mutating nested data ad hoc.

## Reusable Practice
- Add mutation helpers in the domain layer before wiring UI actions.
- Keep selection state separate from persistence state.
- Persist the updated aggregate through one repository boundary instead of letting multiple components write storage directly.
- Use narrow CRUD slices first: create and select before reorder, delete, or advanced editing.
- When broad aggregate persistence starts hurting responsiveness, keep the same repository boundary but switch the UI to optimistic updates plus short debounced background saves before attempting a larger architecture rewrite.

## Related Areas
- [[ARCHITECTURE]]
- [[..\project-concept\Implementation Strategy - Detailed Context]]
- [[indexeddb-first-project-aggregate]]
