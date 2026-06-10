# Seeded workspace data should follow normal edit paths
#learning

## Context
Users expect the initial seeded workspace project to be editable like any other project. If seed data lacks an edit path, it feels locked even when persistence is available.

## Learning
- Treat seeded entities as first-class domain entities once loaded.
- Reuse the same update function and persistence pipeline for seeded and user-created data.
- Expose at least one obvious shell-level project metadata edit entrypoint (rename/details) so control is discoverable.

## Reuse Guidance
- When introducing seed/fallback data, verify full CRUD parity against normal entities.
- Prefer fixing missing edit workflows over creating special-case seed migration logic.

## Related Notes
- [[production-smoothness-first-remove-blocking-local-writes]]
- [[form-first-full-surface-v1]]
