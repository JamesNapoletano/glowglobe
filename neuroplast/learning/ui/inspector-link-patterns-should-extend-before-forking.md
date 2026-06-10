# Inspector Link Patterns Should Extend Before Forking
#learning

## Insight
When a new reference entity needs to connect to manuscript scenes, extending the existing inspector link-toggle pattern is usually safer than inventing a separate scene-linking UI just for that entity.

## Why It Matters
- It keeps the author's linking workflow predictable across entity types.
- It reduces duplicate persistence code and lowers the chance that one entity family drifts out of sync with the others.
- It makes new domains like Sociums feel first-class without requiring a larger writing-flow redesign.

## Reusable Practice
1. Extend the shared scene link payload and scene normalization first.
2. Add the new entity to both the linked-summary display and the toggle-management section in the inspector.
3. Reuse the same optimistic local aggregate persistence flow instead of adding a second save path.

## Related Notes
- [[form-first-full-surface-v1]]
- [[manuscript-first-inspector-layout]]
