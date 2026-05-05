# MUI Clean Product UI Migration Plan
#plan

## Objective
Replace the current Tailwind-driven shell with a Material UI-based interface that feels like a clean modern product workspace while preserving the existing manuscript-first workflows.

## Scope
- Add Material UI with proper Next.js 16 App Router integration.
- Replace Tailwind-based layout and shared UI controls with MUI components and theming.
- Refresh the visual language toward a cleaner SaaS-style workspace.
- Remove Tailwind runtime styling dependencies once the UI migration is complete.
- Update architecture, concept, changelog, and learning artifacts to reflect the new UI stack and design direction.

## Out of Scope
- Changing core domain models or persistence behavior.
- Route restructuring or introducing a backend.
- Adding new product features beyond what is needed to support the new UI system.

## Current Reality
- The app shell and core workspaces are styled with Tailwind utility classes throughout the component tree.
- The current UI direction feels too decorative and custom for the desired cleaner product presentation.
- The existing CSS variable palette provides a good base for translating the visual system into an MUI theme.

## Assumptions
- Next.js remains the application framework for this migration.
- The desired visual direction is clean product / modern SaaS, not editorial or highly ornamental.
- A small amount of global CSS remains acceptable for document-level styles and TipTap/ProseMirror behavior.

## Tasks
1. Add MUI dependencies and Next App Router provider integration.
2. Create a shared MUI theme for the clean-product visual direction.
3. Migrate the application shell, sidebar, modal, loading shell, and not-found state to MUI.
4. Migrate shared CRUD and inspector components to MUI form and layout primitives.
5. Migrate the manuscript workspace and editor framing to MUI while keeping editor-specific CSS stable.
6. Remove Tailwind/PostCSS Tailwind setup and verify no Tailwind utility usage remains in app code.
7. Run verification and update architecture, concept, changelog, README, and learning artifacts.

## Verification
- The app renders using MUI providers and theme integration under Next.js 16 App Router.
- Core UI files under `src/app/` and `src/components/` no longer depend on Tailwind utility classes for layout and controls.
- `npm run lint`, `npm run typecheck`, and `npm run build` succeed.
- Documentation reflects MUI rather than Tailwind as the active UI stack.

## Blockers
- No blockers at plan creation time.

## Completion Notes
- Added Material UI, Emotion, and Next App Router cache-provider integration.
- Replaced the main shell, sidebar, dialog, loading shell, not-found page, shared CRUD workspace, inspector, quick-create form, metadata form, and manuscript framing with MUI components.
- Removed Tailwind from the active styling stack and simplified global CSS to editor- and document-level concerns.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Handoff Context
If this migration lands cleanly, the next design pass should focus on higher-order UX polish such as denser navigation behavior, better empty states, and more product-grade manuscript workflow affordances on top of the new theme system.

## Related Changelog
- [[..\project-concept\changelog\2026-04-19]]
