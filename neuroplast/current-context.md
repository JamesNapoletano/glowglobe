# Current Context

This file is an optional compact briefing capsule for the repository's current state.

It is auto-refreshed by `neuroplast sync` when it still matches the managed baseline. Local edits are preserved.

## Boundary
- This file is advisory, not canonical.
- `plans/`, `project-concept/`, `project-concept/changelog/`, `learning/`, and `ARCHITECTURE.md` remain the durable source of truth.
- If you want to keep custom notes here, edit the file directly; future sync runs will preserve your version instead of overwriting it.

## Advisory Bootstrap Modes
- **lean** — load the mandatory startup contract, then `current-context.md`, the active plan, and the current step file.
- **standard** — use `lean`, then add `ARCHITECTURE.md` plus the most relevant concept note or recent changelog entry.
- **deep** — use `standard`, then add broader concept, learning, and adjacent plan context for reframing or higher-risk work.

## Current Snapshot
- **Active plan:** `neuroplast/plans/2026-04-20-production-ui-performance-stabilization-plan.md`
- **Active plan source:** latest_mtime
- **Objective:** Reduce broad UI choppiness in production with low-risk changes that preserve the current product architecture while making common interactions feel more immediate.
- **Next bounded step:** No explicit next bounded step recorded.
- **Blockers:** No blockers at plan creation time.
- **Verification:** Scene selection, link toggles, metadata saves, and adjacent-surface CRUD updates should update the UI immediately without waiting on IndexedDB. | TipTap should not reset content when only scene metadata or link data changes.

## Route-Aware Reading Hints
- **act** -> use `lean` context depth and emphasize objective, next bounded step, blockers, verification.
- **inspect-current-plan** -> use `standard` context depth and emphasize objective, next bounded step, blockers, related files.
- **conceptualize** -> use `deep` context depth and emphasize objective, scope assumptions, related files, recent context.

## Relevant Files
- `neuroplast/plans/2026-04-20-production-ui-performance-stabilization-plan.md`
- `neuroplast/project-concept/changelog/2026-04-20.md`
- `ARCHITECTURE.md`

## Refresh Sources
- The active plan pointer in `neuroplast/plans/.active-plan` is used when present; otherwise the newest plan in `neuroplast/plans/` is used.
- Related concept context is taken from the active plan when it links to a `project-concept/` note.
- The newest changelog entry under `neuroplast/project-concept/changelog/` provides recent completed-context continuity.
- `ARCHITECTURE.md` remains the canonical architecture anchor for any deeper context load.
