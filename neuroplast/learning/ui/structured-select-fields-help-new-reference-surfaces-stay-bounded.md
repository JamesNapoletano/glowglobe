# Structured Select Fields Help New Reference Surfaces Stay Bounded
#learning

## Insight
When a new reference surface needs controlled categorical data, extending the shared form system with a generic select field is usually cheaper and more durable than inventing a one-off custom editor for that surface.

## Why It Matters
- It keeps the CRUD experience consistent across non-writing surfaces.
- It allows richer domain structure such as typed groups without forcing bespoke UI wiring for each new entity family.
- It reduces the temptation to leave important classification data as freeform text that later needs cleanup.

## Reusable Practice
1. Add the categorical field to the shared entity-field config instead of hardcoding a custom component for one page.
2. Keep options bounded and explicit in the domain-facing UI layer.
3. Normalize invalid persisted values back to a safe default so older local data keeps loading.

## Related Notes
- [[form-first-full-surface-v1]]
- [[controlled-form-defaults-prevent-react-input-mode-flips]]
