# Trash-first project lifecycle controls reduce accidental loss
#learning

## Context
Project deletion and visibility controls were expanded beyond simple rename/edit actions. Users needed safer control over archive and delete behavior.

## Learning
- Treat project lifecycle (`active`, `archived`, `trashed`) as explicit domain state instead of trying to overload editing status semantics.
- Default-hidden archived/trashed views keep everyday navigation focused, while explicit toggles preserve recoverability and control.
- Trash-first soft deletion lowers risk and pairs naturally with explicit restore actions.
- Active selection fallback must be handled during lifecycle transitions to avoid null-state confusion in the main workspace.

## Reuse Guidance
- For user-owned content, prefer reversible lifecycle transitions before permanent removal.
- Keep lifecycle controls close to project navigation so users can both hide clutter and recover work quickly.
- Once content is already in trash, offer a clear per-item permanent delete path in addition to bulk empty-trash actions so cleanup remains intentional without feeling hidden.

## Related Notes
- [[persist-route-backed-projects-before-navigation]]

## Related Notes
- [[seeded-workspace-data-should-follow-normal-edit-paths]]
