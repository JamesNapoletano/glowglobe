# Production UI Performance Stabilization Plan
#plan

## Objective
Reduce broad UI choppiness in production with low-risk changes that preserve the current product architecture while making common interactions feel more immediate.

## Scope
- Make local-first project updates optimistic in `src/components/workspace-root.tsx` so UI state updates immediately.
- Move IndexedDB persistence onto a short debounced background path instead of blocking interaction flows on every update.
- Prevent unnecessary TipTap content resets in `src/components/scene-body-editor.tsx` when scene metadata or links change without changing the editor document.
- Reduce paint-heavy shell blur on the main workspace panes in `src/components/app-shell.tsx`.
- Verify with `npm run typecheck`, `npm run lint`, and `npm run build`.
- Update architecture, concept, changelog, and learning artifacts after implementation.

## Out of Scope
- Major state-management refactors.
- Repository decomposition beyond the current project aggregate.
- Virtualization, route-level code splitting, or broader UI redesign work.
- Introducing new tests or changing deployment/runtime infrastructure.

## Current Reality
- Production interactions still feel choppy across the shell, not just inside one isolated widget.
- The workspace currently waits on normalized project persistence during common updates, which adds latency to user-visible interactions.
- The scene editor effect still keys off the full `scene` object, so non-document scene changes can trigger heavier editor work than necessary.
- The main shell panes use large `backdropFilter` blur treatments that increase paint/compositing cost.

## Assumptions
- The highest-value low-risk win is to decouple visible UI updates from IndexedDB round-trips.
- Keeping the current project-aggregate repository is acceptable for this pass if writes become optimistic and lightly batched.
- Removing blur from the largest always-visible panes will improve perceived smoothness without materially harming usability.

## Tasks
1. Add optimistic project-state updates and debounced background persistence in `src/components/workspace-root.tsx`.
2. Preserve create/update flows while making storage feedback reflect background persistence status.
3. Narrow the TipTap content-sync effect in `src/components/scene-body-editor.tsx` so it reacts only to scene identity or document changes.
4. Remove or reduce the heaviest blur treatments from the main shell panes in `src/components/app-shell.tsx`.
5. Run `npm run typecheck`, `npm run lint`, and `npm run build`.
6. Update architecture, concept, changelog, and learning artifacts.

## Verification
- Scene selection, link toggles, metadata saves, and adjacent-surface CRUD updates should update the UI immediately without waiting on IndexedDB.
- TipTap should not reset content when only scene metadata or link data changes.
- The main shell should no longer rely on large blur filters for its primary panes.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- No blockers at plan creation time.

## Completion Notes
- Moved project aggregate writes in `src/components/workspace-root.tsx` to an optimistic UI flow with short debounced background persistence so common interactions no longer wait on IndexedDB before updating visible state.
- Batched pending background saves per project during the debounce window while keeping storage-status messaging aligned to the latest persistence request.
- Narrowed the TipTap content-sync effect in `src/components/scene-body-editor.tsx` so metadata and link changes do not trigger unnecessary document resets.
- Removed the heaviest blur usage from the main shell panes in `src/components/app-shell.tsx` to reduce paint/compositing cost on always-visible layout surfaces.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Handoff Context
If production smoothness remains poor after this pass, the next step should profile rerender scope across `WorkspaceRoot`, `AppShell`, `ContextPanel`, and `WorkspaceSurfaceContent`, then introduce narrower state boundaries and subtree memoization.

## Related Changelog
- [[..\project-concept\changelog\2026-04-20]]
