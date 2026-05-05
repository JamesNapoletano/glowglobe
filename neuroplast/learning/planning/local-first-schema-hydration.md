# Local-First Schema Hydration
#learning

## Insight
When a local-first application evolves its domain model over time, read-time hydration is a practical safety layer that prevents older persisted records from crashing newly expanded UI surfaces.

## Why It Matters
Type-safe source code and successful builds do not protect against stale client-side data already stored in IndexedDB. If new arrays or nested fields are introduced, runtime components can still fail on older records unless those records are normalized before use.

## Reusable Practice
- Normalize persisted aggregate records at the repository boundary before the UI consumes them.
- Default newly introduced arrays and nested editor fields to safe values.
- Add defensive UI fallbacks even when repository hydration exists.
- Treat schema evolution as a runtime concern, not only a TypeScript concern.

## Related Areas
- [[ARCHITECTURE]]
- [[indexeddb-first-project-aggregate]]
- [[nextjs-major-upgrade-flat-config]]
