# Persisted Collapsible Shell Rails
#learning

## Insight
When a writing product has a dense always-visible navigation rail, a persisted collapse preference can improve focus and perceived speed more effectively than another round of passive spacing tweaks.

## Why It Matters
Authors often return to the same shell configuration every session. If a tighter collapsed rail gives meaningful canvas space back to drafting or page-level work, forcing them to re-collapse it on every reload adds friction and weakens the benefit.

## Reusable Practice
- Persist shell-only layout preferences in local storage instead of mixing them into project data.
- Use an SSR-safe client hydration pattern so stored UI preferences do not create avoidable render mismatches.
- In collapsed mode, preserve essential actions with icon rails, tooltips, and a clear recovery path back to expanded navigation.
- Rebalance the surrounding layout when rails collapse so the preference produces a real workspace gain, not only a cosmetic change.

## Related Areas
- [[semantic-inverted-text-for-dark-selected-states]]
- [[premium-product-feel-through-theme-depth]]
- [[ARCHITECTURE]]
