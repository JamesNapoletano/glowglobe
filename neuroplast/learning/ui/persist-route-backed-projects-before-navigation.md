# Persist Route-Backed Projects Before Navigation
#learning

## Context
In a local-first route-driven workspace, a newly created project can exist in optimistic UI state before it exists in durable storage.

## Lesson
If the app navigates to a new project route before that project is durably saved, reload-aware or fallback route resolution can briefly recover against the older persisted project set and bounce the user back to the previous workspace.

## Reusable Practice
- Persist newly created route-backed entities before navigating into their canonical URL when route recovery depends on durable storage.
- Keep optimistic UI updates, persistence, and navigation pointed at the same normalized entity instance.
- Use short-lived pending-route guards for optimistic navigation, but do not rely on them to hide persistence races that can be removed directly.

## Related Notes
- [[optimistic-route-guards-prevent-stale-writing-canonicalization]]
- [[project-scoped-routes-make-local-first-workspaces-resumable]]
