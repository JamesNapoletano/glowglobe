# Local Persistence Plan
#plan

## Objective
Implement IndexedDB-backed local project persistence and wire the project creation form into a real persisted workspace flow.

## Scope
- Add an IndexedDB project repository.
- Add project factory helpers for real project creation.
- Replace static shell wiring with client-managed workspace state.
- Persist and display multiple projects in the workspace sidebar.
- Verify the app still builds, lints, and type-checks.

## Out of Scope
- Tiptap editor integration
- Persistence for every domain entity beyond project-level storage
- Sync service implementation
- Authentication or collaboration features

## Current Reality
- The app shell currently renders from a static sample project.
- The quick-create form is only a scaffold interaction and does not persist anything.
- Repository interfaces exist, but no IndexedDB adapter has been implemented yet.

## Assumptions
- Persisting the full `Project` aggregate is acceptable for the current implementation slice.
- Sample data can seed the workspace the first time the repository is empty.
- Client-side repository access is the right first implementation boundary for local-first behavior.

## Tasks
1. Add project creation helpers and ID/timestamp utilities.
2. Add an IndexedDB-backed `ProjectRepository` implementation.
3. Add a client workspace state flow that loads, seeds, selects, and creates projects.
4. Update the shell and sidebar to work with persisted projects.
5. Convert the quick-create form into a real project creation surface.
6. Run validation and update architecture/changelog/learning artifacts.

## Verification
- Newly created projects persist across reloads in IndexedDB.
- The sidebar displays available projects and allows selection.
- The project creation form creates a real project and updates the active workspace.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- No blockers at planning time.

## Handoff Context
The next step after this slice is to break project persistence into more targeted entity repositories and start wiring chapter/scene CRUD onto the persisted project model.

## Related Changelog
[[changelog/2026-04-19]]
