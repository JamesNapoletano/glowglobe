# Remount-Stable Route Guards Protect Local-First Creation
#learning

## Context
In App Router client workspaces, a create-and-navigate flow can trigger a route remount before debounced local persistence finishes.

## Lesson
If the optimistic navigation guard lives only inside a component instance, the remount can erase it and let canonical route recovery fall back to older persisted state. Short-lived route guards for local-first creation need storage that survives the remount window.

## Reusable Practice
- Keep pending canonical paths in remount-stable state when a route transition can recreate the workspace component before durable writes finish.
- Reapply still-pending optimistic project writes on load before canonical route resolution runs.
- Preserve debounced persistence, but keep enough temporary in-memory state to bridge the gap between optimistic UI and durable storage.

## Related Notes
- [[optimistic-route-guards-prevent-stale-writing-canonicalization]]
- [[persist-route-backed-projects-before-navigation]]
- [[project-scoped-routes-make-local-first-workspaces-resumable]]
