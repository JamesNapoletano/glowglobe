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
- **Active plan:** `neuroplast/plans/2026-05-13-chapter-deletion-and-delete-confirmation-plan.md`
- **Active plan source:** active conversation execution handoff
- **Objective:** Add chapter deletion and confirmation checks for chapter/scene deletes while preserving the minimum-one-chapter and minimum-one-scene rules.
- **Next bounded step:** Add a chapter-removal helper in `src/lib/domain/project-factory.ts` and wire confirmed delete handlers through `src/components/workspace-root.tsx` into the Writing Studio navigator.
- **Blockers:** No blockers at plan creation time.
- **Verification:** Multiple chapters should show chapter delete controls. | Single remaining chapter/scene cases should hide delete controls. | Chapter and scene deletes should require confirmation. | Active deletions should route to surviving content. | `npm run typecheck`, `npm run lint`, and `npm run build` should pass.

## Route-Aware Reading Hints
- **act** -> use `lean` context depth and emphasize objective, next bounded step, blockers, verification.
- **inspect-current-plan** -> use `standard` context depth and emphasize objective, next bounded step, blockers, related files.
- **conceptualize** -> use `deep` context depth and emphasize objective, scope assumptions, related files, recent context.

## Relevant Files
- `neuroplast/plans/2026-05-13-chapter-deletion-and-delete-confirmation-plan.md`
- `src/lib/domain/project-factory.ts`
- `src/components/workspace-root.tsx`
- `src/components/manuscript-viewport.tsx`
- `ARCHITECTURE.md`

## Refresh Sources
- The active plan pointer in `neuroplast/plans/.active-plan` is used when present; otherwise the newest plan in `neuroplast/plans/` is used.
- Related concept context is taken from the active plan when it links to a `project-concept/` note.
- The newest changelog entry under `neuroplast/project-concept/changelog/` provides recent completed-context continuity.
- `ARCHITECTURE.md` remains the canonical architecture anchor for any deeper context load.
