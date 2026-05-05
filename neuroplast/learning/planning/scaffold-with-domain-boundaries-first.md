# Scaffold With Domain Boundaries First
#learning
## Insight
For domain-heavy products, the first scaffold should establish domain types and repository interfaces at the same time as the UI shell instead of treating them as later cleanup work.

## Why It Matters
If the shell is built without domain and persistence boundaries, UI placeholders quickly become accidental architecture. Adding those boundaries in the initial scaffold keeps later editor, persistence, and sync work cleaner.

## Reusable Practice
- Scaffold the app shell and domain model together.
- Add repository contracts before the real persistence adapter.
- Validate one real form flow early to confirm form-library fit.
- Use sample data only as a temporary adapter layer, not as an invisible long-term store.

## Related Areas
- [[ARCHITECTURE]]
- [[..\project-concept\Implementation Strategy - Detailed Context]]
- [[manuscript-editor-architecture-notes]]
