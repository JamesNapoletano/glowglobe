# Hydration Stabilization Plan
#plan

## Objective
Eliminate the current Next.js hydration mismatch by making the initial app shell and manuscript editor render from a stable client-ready state instead of server-rendering interactive content that immediately diverges after IndexedDB hydration.

## Scope
- Add a stable pre-hydration loading path for the workspace root.
- Prevent the manuscript editor from rendering interactive TipTap DOM before the client is ready.
- Keep project fallback behavior for IndexedDB failures without using the fallback project as SSR-visible app content.
- Verify the repository still passes typecheck, lint, and production build.

## Out of Scope
- Larger visual redesign work beyond small practical loading-state cleanup needed for stability.
- Broader accessibility work beyond what is directly touched by this hydration fix.
- Data-model or repository redesign.

## Current Reality
- The app currently server-renders the workspace using fallback sample data before client storage finishes loading.
- The client then rehydrates into IndexedDB-backed state, which risks mismatched HTML attributes and interactive DOM.
- The TipTap editor is the most likely mismatch source because it creates browser-managed editor markup during hydration.

## Assumptions
- A boring, stable loading shell is preferable to a visually complete but hydration-unsafe first render.
- TipTap should only mount once the component is client-ready and the editor instance exists.

## Tasks
1. Add client-ready workspace loading behavior in the root workspace component.
2. Gate editor rendering until the client and editor instance are ready.
3. Ensure writing surface selection does not rely on fake SSR-active content.
4. Run verification commands and fix any issues.
5. Update architecture, changelog, and learning records.

## Verification
- The reported hydration mismatch no longer appears.
- The workspace renders a stable loading shell before IndexedDB initialization completes.
- The manuscript editor mounts only after client readiness.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- No blockers at plan creation time.

## Completion Notes
- Completed a stable workspace loading shell so the app no longer server-renders interactive manuscript content before client readiness.
- Completed client-ready gating for the TipTap editor so editor DOM only mounts after the client and editor instance are available.
- Completed manuscript selection tightening so the writing surface does not depend on fake SSR fallback selection during the hydration-sensitive phase.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Handoff Context
If this slice succeeds, the next practical UX step should be a restrained Writing Studio polish pass that simplifies the header, reduces secondary chrome, and increases the editor’s dominance without changing persistence or layout architecture.

## Related Changelog
- [[..\project-concept\changelog\2026-04-19]]
