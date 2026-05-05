# Shared Selected-State Guardrails Beat One-Off Overrides
#learning

## Insight
Selected-state accessibility holds up better when foreground rules are centralized by treatment type instead of being recreated inside each list or card.

## Why It Matters
Ad hoc selected colors tend to drift during polish passes, especially when titles, descriptions, icons, and helper text are styled separately. A shared strong-selection rule and a shared soft-selection rule make contrast regressions much harder to reintroduce.

## Reusable Practice
- Define a small set of selected-state treatments such as strong dark/accent and soft tinted.
- Let nested primary and secondary text opt into semantic class hooks or tokens rather than hardcoded per-component overrides.
- Reuse the same treatment across navigation, manuscript structure lists, and CRUD side lists when they belong to one design system.
- Treat any translucent white helper text inside selected dark states as suspicious unless it comes from the shared guardrail rule.

## Related Areas
- [[semantic-inverted-text-for-dark-selected-states]]
- [[premium-writing-ui-comes-from-contrast-discipline]]
- [[ARCHITECTURE]]
