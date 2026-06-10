# Missing Project Routes Should Recover to an Explicit Landing State
#learning

## Insight
When a local-first app supports deep project URLs, invalid or unavailable project IDs should recover to an explicit landing state instead of silently opening a different project.

## Why It Matters
Silent fallback can feel like data loss, broken routing, or unauthorized project switching. A visible recovery surface makes the app safer and easier to understand, especially when local data availability changes between sessions.

## Reusable Practice
- Treat the root route as a durable landing and recovery surface when project selection is missing.
- Redirect missing explicit project IDs to the landing route rather than auto-selecting a different project.
- Give the landing surface both create and select actions so stale links become recoverable instead of dead ends.

## Related Areas
- [[editorial-brand-tokens-make-visual-direction-easier-to-evolve]]
- [[ARCHITECTURE]]
