# IndexedDB-First Project Aggregate
#learning
## Insight
For a local-first writing app, persisting the full project aggregate first is a practical bridge between mock data and finer-grained repositories.

## Why It Matters
It enables real user-created data and reload-safe workflows quickly, while still preserving repository boundaries for later decomposition into more targeted entity stores.

## Reusable Practice
- Implement one real repository adapter early, even if it stores a broad aggregate.
- Keep seeding logic explicit so fallback sample data does not become hidden production state.
- Let the UI talk to repository abstractions rather than to browser storage directly.
- Use client workspace state as a temporary orchestration layer until domain actions grow more complex.

## Related Areas
- [[ARCHITECTURE]]
- [[..\project-concept\Implementation Strategy - Detailed Context]]
- [[scaffold-with-domain-boundaries-first]]
