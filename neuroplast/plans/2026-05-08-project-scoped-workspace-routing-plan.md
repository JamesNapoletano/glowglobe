# Project-Scoped Workspace Routing Plan
#plan

## Objective
Convert the workspace from a single state-driven page into project-scoped URL routes so surfaces, chapters, and scenes are directly linkable and recover correctly on refresh.

## Scope
- `src/app/page.tsx`
- `src/app/projects/[projectId]/page.tsx`
- `src/app/projects/[projectId]/writing/page.tsx`
- `src/app/projects/[projectId]/writing/[chapterId]/[sceneId]/page.tsx`
- `src/app/projects/[projectId]/[surface]/page.tsx`
- `src/components/workspace-root.tsx`
- `src/components/app-shell.tsx`
- `src/components/workspace-sidebar.tsx`
- `src/components/manuscript-viewport.tsx`
- `src/components/workspace-surfaces.ts`
- `src/lib/workspace-route.ts`
- `ARCHITECTURE.md`
- `README.md`

## Out of Scope
- Dedicated nested URLs for non-writing surface entities.
- Server-backed persistence or auth changes.

## Tasks
1. Add project-scoped App Router entrypoints for surfaces and writing scene paths.
2. Resolve active project, surface, chapter, and scene from the URL with redirect-based canonical fallbacks.
3. Replace local surface/chapter/scene navigation state with router navigation while preserving local IndexedDB persistence flows.
4. Keep shell metadata and navigation labels stable during route-driven rendering.
5. Verify with typecheck, lint, and build.
6. Sync architecture, changelog, README, and learning artifacts.

## Verification
- Visiting `/projects/[projectId]/writing/[chapterId]/[sceneId]` restores the correct scene.
- Visiting `/projects/[projectId]/writing` redirects to a valid chapter/scene path.
- Visiting `/projects/[projectId]/[surface]` loads the requested non-writing surface.
- Invalid project/chapter/scene combinations redirect to a valid active-project route instead of breaking the UI.
- `npm run typecheck`, `npm run lint`, and `npm run build` pass.

## Blockers
- None.

## Completion Notes
- Added App Router entrypoints for project roots, non-writing surfaces, writing roots, and chapter/scene deep links.
- Added `src/lib/workspace-route.ts` to resolve canonical project, surface, chapter, and scene paths with redirect-friendly fallbacks.
- Reworked `workspace-root` so project, surface, chapter, and scene selection come from the URL while existing IndexedDB-backed project mutations remain client-side.
- Kept shell labels stable during route-driven rendering by threading active project and book labels through the shell/sidebar/header surfaces.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Related Changelog
- [[..\project-concept\changelog\2026-05-08]]
