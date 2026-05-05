# Local-First Sync-Ready Writing Products
#learning
## Insight
When planning a writing application that is expected to become an online service later, choose the long-term data boundaries early even if the first release is entirely local.

## Why It Matters
Stable IDs, timestamped entities, and a storage-agnostic domain model reduce the risk of rewriting manuscript and story-bible data structures when sync, backups, or hosted accounts are introduced.

## Reusable Practice
- Pick the canonical root entity early.
- Separate domain entities from storage implementation.
- Preserve rich editor content in a structured model rather than a plain text-only model when formatting fidelity matters.
- Defer collaboration features explicitly instead of accidentally designing for them halfway.

## Related Areas
- [[ARCHITECTURE]]
- [[..\project-concept\Writing Studio - Detailed Context]]
- [[..\project-concept\Projects Workspace - Detailed Context]]
