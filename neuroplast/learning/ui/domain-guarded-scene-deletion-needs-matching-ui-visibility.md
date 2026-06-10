# Domain-Guarded Scene Deletion Needs Matching UI Visibility
#learning

## Context
Writing workflows may require a minimum structural unit, such as keeping at least one scene in every chapter.

## Lesson
When a destructive action violates a domain invariant, the safest pattern is to hide the control in the UI where the action is impossible and enforce the same invariant again in the domain helper.

## Reusable Practice
- Hide delete affordances when the user cannot legally complete the action.
- Re-check the invariant in the domain layer so route handlers and future UI variants cannot bypass it.
- When deleting the active item, compute the fallback surviving item before committing navigation changes.

## Related Notes
- [[remount-stable-route-guards-protect-local-first-creation]]
- [[optimistic-route-guards-prevent-stale-writing-canonicalization]]
- [[compact-authoring-navigation-beats-carousel-flair]]
