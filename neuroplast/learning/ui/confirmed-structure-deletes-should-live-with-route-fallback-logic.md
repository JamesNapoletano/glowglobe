# Confirmed Structure Deletes Should Live With Route Fallback Logic
#learning

## Context
In route-backed writing workspaces, deleting an active structural item such as a chapter or scene also requires deciding where the user should land next.

## Lesson
Confirmation prompts are safest when they live beside the delete mutation handler, not only in the UI button, because the same handler also owns fallback navigation and invariant enforcement.

## Reusable Practice
- Keep destructive confirmations in the same layer that performs the mutation and reroute.
- Hide delete controls when the domain invariant forbids deletion, but still enforce the invariant again in the domain helper.
- Compute the surviving fallback route before committing the deletion so active-item removal stays stable.

## Related Notes
- [[domain-guarded-scene-deletion-needs-matching-ui-visibility]]
- [[remount-stable-route-guards-protect-local-first-creation]]
- [[optimistic-route-guards-prevent-stale-writing-canonicalization]]
