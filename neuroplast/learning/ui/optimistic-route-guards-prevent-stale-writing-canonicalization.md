# Optimistic Route Guards Prevent Stale Writing Canonicalization
#learning

## Context
URL-driven local-first writing workspaces can optimistically navigate to a newly created chapter or scene before the canonical route resolver has recomputed against the updated project aggregate.

## Lesson
If canonical redirect logic runs against stale pre-mutation state, it can bounce the user back to the old scene even though creation succeeded. A short-lived pending-route guard keeps the intended create-and-navigate transition stable until route resolution catches up.

## Reusable Practice
- When optimistic creation immediately pushes a new deep link, persist the intended canonical path locally until resolved route state matches it.
- Let canonical redirect logic stand down while the app is already traveling to that pending path.
- Clear the pending guard as soon as resolved canonical state reaches the intended route.
- Use this pattern only around short-lived optimistic navigation, not as a replacement for normal route canonicalization.

## Related Notes
- [[project-scoped-routes-make-local-first-workspaces-resumable]]
- [[stable-pre-hydration-shells-for-client-persistence]]
- [[manuscript-first-inspector-layout]]
