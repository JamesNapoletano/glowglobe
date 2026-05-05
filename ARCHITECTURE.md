# Neuroplast Architecture

## Scope
This architecture defines the initial product and repository structure for GlowGlobe, a manuscript-first writing application for novels and long-form documents. It covers the v1 product surfaces, the durable project-mind artifacts under `/neuroplast/`, and the core domain boundaries needed to support a local-first product that can evolve into an online single-author sync service later.

## Project Structure
- `neuroplast/project-concept/` stores durable concept artifacts for each major work surface.
- `neuroplast/plans/` stores active bounded execution plans.
- `neuroplast/project-concept/changelog/` stores dated execution history.
- `neuroplast/learning/` stores reusable process and architecture learnings.
- `src/app/` stores the Next.js app-router entrypoints and global styles.
- `src/components/` stores the initial manuscript-first shell components.
- `src/lib/domain/` stores core TypeScript domain types.
- `src/lib/repositories/` stores repository interfaces and early adapter scaffolding.
- `src/lib/mock-data/` stores temporary sample data used to validate the initial shell.
- `src/lib/domain/project-factory.ts` stores project creation helpers and initialization rules.

Primary product domains:
- `Projects Workspace` — multi-project shell for books, documents, and series.
- `Writing Studio` — rich manuscript editor and document workspace.
- `Characters` — structured character profiles and relationships.
- `Technology` — systems, inventions, tools, and rule sets.
- `Environment and Planet` — worldbuilding for places, planets, regions, and cultures.
- `Corkboard and Timeline` — planning boards, chronology, beat cards, and plot flow.
- `Plot and Structure` — acts, beats, arcs, POV allocation, and scene planning.
- `Lore and Glossary` — canon terms, factions, history, language, and recurring references.

## Core Workflows
1. Create or select a project from the `Projects Workspace`.
2. Draft or revise manuscript content in the `Writing Studio`.
3. Link manuscript content to structured reference entities such as characters, locations, and technology entries.
4. Use the `Corkboard and Timeline` plus `Plot and Structure` surfaces to organize scenes, chronology, and pacing.
5. Consult and update `Lore and Glossary` plus worldbuilding surfaces to maintain continuity.
6. Persist work locally first, while preserving identifiers and data boundaries that allow future sync to a hosted service.

## Tools and Interfaces
- Rich text manuscript editor with novel-friendly formatting behaviors.
- Structured story-bible interfaces for domain entities.
- Cross-linking between manuscript sections and reference entities.
- Local persistence as the initial storage mode.
- Future-ready service boundaries for auth, sync, backups, and remote storage.

Recommended implementation stack for v1 planning:
- Next.js with TypeScript for the application shell and route structure.
- React for workspace composition and editor-adjacent interfaces.
- Material UI for the application shell, form controls, cards, dialogs, and shared product-facing interface primitives.
- A structured rich-text editor framework such as Tiptap/ProseMirror for manuscript editing.
- Local-first persistence using IndexedDB via an app data layer, with repository boundaries that can later support a remote API.
- React Hook Form for project-creation and metadata-oriented forms.

## State and Knowledge Model
The canonical product root is `Project`.

Each project may contain linked entities such as:
- `Book`
- `Document`
- `Chapter`
- `Scene`
- `Character`
- `Relationship`
- `Technology Entry`
- `Location`
- `Region`
- `Planet`
- `Timeline Event`
- `Corkboard Card`
- `Plot Thread`
- `Glossary Entry`
- `Research Note`
- `Revision Snapshot`

Modeling rules:
- Every major entity should use stable IDs from the start.
- Every major entity should support created/updated timestamps.
- Editor content should be stored as structured document data rather than plain text-only content.
- Storage concerns should remain separate from domain modeling so local persistence can later be augmented by a sync service.
- The initial user model assumes a single author, but domain boundaries should not block future per-user cloud workspaces.

## Constraints and Boundaries
- V1 is single-author only; collaboration is explicitly deferred.
- V1 should be manuscript-first, with planning and story-bible tools tightly integrated around the writing flow.
- The app should work offline first, even though the architecture must remain ready for eventual online sync.
- Rich formatting is a requirement for novels and long-form documents.
- The current implementation is an initial scaffold, not a feature-complete product.
- Neuroplast artifact rules apply to all planning, changelog, and learning files.

## Verification Strategy
Planning-stage verification should confirm that:
- All required Neuroplast concept, plan, changelog, and learning artifacts exist.
- The architecture reflects the decided product direction: manuscript-first, local-first, sync-ready, single-author.
- The major work surfaces are documented consistently across concept artifacts.

Implementation-stage verification should confirm that:
- A user can create and switch between multiple projects.
- Rich manuscript content can be authored and preserved reliably.
- Characters, worldbuilding, technology, and lore entries can be created and linked to manuscript content.
- Corkboard cards and timeline events can represent scene order and chronology.
- Local persistence preserves all major entities and relationships.
- Future sync boundaries remain clean enough to support a hosted backend later.

Current scaffold verification confirms that:
- The repository builds successfully with Next.js 16, React, TypeScript, Material UI, and React Hook Form.
- The app shell renders a manuscript-first layout with interactive workspace-surface navigation, a larger primary writing viewport, and a right-side inspector.
- Core domain types and repository contracts exist in `src/lib/`.
- Local project creation and project selection are wired through a client-side workspace state flow.
- IndexedDB-backed project persistence is implemented for the current project aggregate.
- Chapter and scene creation plus manuscript selection are implemented and persisted through the project aggregate.
- Scene metadata editing for title and summary is implemented through a React Hook Form surface and persisted through the same project aggregate.
- Tiptap-based scene body editing is implemented and persisted through the same active-scene workflow.
- The project-creation flow now opens in a dedicated modal instead of competing with the main writing layout.
- Adjacent story surfaces now provide actual create, edit, and delete workflows instead of decorative placeholders.
- The navigation now exposes Technology and Structure as first-class surfaces alongside manuscript, world, planning, and lore work.
- The inspector resolves and manages scene-linked characters, locations, technology entries, timeline events, plot threads, and glossary entries from the active scene's stored IDs.
- The shell now uses a lighter professional frame with a contextual inspector that remains visible for Writing Studio and yields space back to non-writing surfaces.
- The writing workspace now gives the draft canvas more center-stage space through a slimmer navigator, stronger editorial typography separation, and reduced preview competition.
- Adjacent surfaces now use surface-specific framing with summary metrics and clearer page identity instead of relying only on a generic repeated CRUD presentation.
- Dark selected states across navigation, manuscript selection, and inspector controls now use explicit inverted text treatment so active UI remains readable after visual theme changes.
- The workspace root now uses a stable pre-hydration loading shell so the server does not emit interactive fallback manuscript content that immediately diverges on the client.
- The TipTap manuscript editor now mounts only after client readiness and editor initialization, reducing SSR/client DOM mismatch risk.
- The application shell and shared workspace controls now use Material UI theming and components instead of Tailwind utility styling.
- The visual direction now emphasizes a cleaner modern product workspace with structured cards, lists, dialogs, and form primitives.
- The refined MUI pass now uses stronger visual hierarchy, softer layered surfaces, and more intentional spacing to move the product feel beyond a direct component-library migration.
- The left navigation rail now supports a persisted desktop collapse preference, tighter visual density, and compact icon-first affordances that return more space to the active workspace.
- The shared shell and workspace surfaces now use sharper radii, tighter nested spacing, and more vertically stacked dense panels so the product reads as a cleaner professional authoring tool at common laptop widths.
- Shared shell and workspace text containers now use safer wrap and overflow behavior so long project metadata, navigation labels, and entity details remain readable without destabilizing layout structure.
- The writing workspace now uses a denser overall shell and a compact two-stage manuscript navigator so structural browsing takes less room and the draft remains the visual priority.
- The compact writing navigator and draft-adjacent surfaces now use stronger styling hierarchy and calmer contrast tiers so the workspace reads as a more deliberate premium authoring environment.
- Shared selected-state guardrails now define readable foreground treatment for strong and soft list selections so navigation and adjacent workspace lists stay contrast-safe through future shell polish passes.
- The scene navigator now uses a single hierarchical chapter-and-scene structure with inline active-chapter scene browsing so the constrained writing rail stays more readable while the inspector remains visible.
- Project-aggregate workspace mutations now update the visible UI optimistically and persist through a short debounced IndexedDB background save path instead of blocking common interactions on each write.
- The main shell now avoids large blur filters on its always-visible panes, reducing paint-heavy compositing cost in the production workspace.
- The TipTap scene editor now only resynchronizes content when the active scene identity or editor document changes, reducing unnecessary resets from adjacent metadata or link edits.

## Environment and Operations
- Current environment supports file reading, file writing, terminal commands, long context, multi-step execution, agent memory, and parallel tasks.
- The repository is not yet a git repository.
- Current work is documentation- and planning-centered rather than runtime or deployment-centered.
- Eventual operations should assume a hosted online service for account-backed sync, but that is outside v1 execution scope.

Planned implementation shape:
- App shell should separate workspace navigation, manuscript navigation, and context side panels.
- Linked entities should first open through an adjacent inspector flow before expanding into full dedicated work surfaces.
- Domain modeling should be isolated from persistence adapters.
- Editor state should be serializable into a structured document format suitable for local persistence and later sync.
- Future backend concerns should enter through a sync/service boundary rather than directly through UI state management.

Current scaffold shape:
- `src/app/page.tsx` renders the initial app shell.
- `src/app/not-found.tsx` provides the App Router not-found boundary required by the current Next.js runtime.
- `src/components/project-quick-create-form.tsx` validates the chosen form stack with React Hook Form.
- `src/components/workspace-surfaces.ts` defines the shared workspace navigation model for manuscript and adjacent story surfaces.
- `src/components/workspace-surface-content.tsx` provides functional CRUD workspaces for non-manuscript surfaces.
- `src/components/entity-workspace.tsx` provides the reusable list-and-form CRUD pattern for story-bible and planning entities.
- `src/components/app-shell.tsx` now conditionally widens non-writing surfaces by removing the persistent inspector rail outside Writing Studio.
- `src/components/app-shell.tsx` now persists a desktop sidebar-collapse preference in local storage and rebalances the grid so the main workspace expands when the nav rail is collapsed.
- `src/components/manuscript-viewport.tsx` now emphasizes the active draft with a lighter scene navigator and writing-specific session framing.
- `src/components/manuscript-viewport.tsx` now uses a flatter hierarchical navigator with inline scene lists and clamped structural titles to improve scanability in the constrained writing rail.
- `src/components/workspace-sidebar.tsx` now supports both a denser full sidebar and a collapsed icon rail with project switching, surface tooltips, and explicit selected-state contrast.
- `src/components/selected-state-guardrails.ts` now centralizes readable selected-state foreground rules for strong dark/accent and soft tinted list-item patterns.
- `src/lib/domain/types.ts` establishes the initial entity model.
- `src/lib/repositories/interfaces.ts` defines repository boundaries ahead of IndexedDB implementation.

Current persistence shape:
- `src/components/workspace-root.tsx` owns loading, seeding, selecting, and creating projects in the local workspace.
- `src/lib/repositories/indexeddb-project-repository.ts` persists project aggregates in IndexedDB.
- `src/lib/domain/project-normalizer.ts` hydrates older persisted project records into the current runtime shape before UI and mutations consume them.
- The sample project remains as a seed and fallback path when the repository is empty or IndexedDB is unavailable.

Current manuscript shape:
- `src/components/manuscript-viewport.tsx` renders chapter and scene lists with create/select controls.
- Chapter and scene mutations are created in `src/lib/domain/project-factory.ts` and persisted through the existing project repository.
- Workspace state owns the active project, chapter, and scene selection flow.
- `src/components/scene-metadata-form.tsx` edits the active scene title and summary inside the right-side inspector using React Hook Form.
- `src/components/scene-body-editor.tsx` provides a Tiptap editing surface for active scene body content.
- `src/components/context-panel.tsx` resolves linked scene context from scene-level entity IDs and keeps metadata editing adjacent to the editor.
- Non-manuscript surfaces now support local-first CRUD flows for characters, locations, regions, planets, technology entries, timeline events, corkboard cards, plot threads, acts, beats, subplots, POV markers, glossary entries, lore notes, and research notes.
- Scene link management now allows linking and unlinking reference and planning entities directly from the inspector.
- Legacy persisted projects are now normalized at read time so missing newer arrays and editor-adjacent fields do not crash the runtime UI.

## Architecture Decisions
- Manuscript-first product framing over equal-weight workspace framing, to keep drafting as the main center of gravity.
- Local-first execution with sync-ready domain boundaries, to avoid rewriting the data model later.
- Single-author scope in v1, to reduce conflict-resolution and permissions complexity.
- Rich structured editor content, to support manuscript formatting, export fidelity, and future cloud sync.
- `Project` as the root domain object, to unify books, reference data, planning tools, and revision history.
- Prefer a web application architecture that can later connect to hosted services without replacing the domain layer.
- Prefer IndexedDB-class local persistence over ad hoc file storage for structured client-side data in the first implementation.
- Use React Hook Form for structured input workflows in non-editor UI surfaces.
- Seed the initial workspace with a sample project only until the repository contains real user-created projects.
- Use project-aggregate persistence as the current write boundary until manuscript editing and entity-level operations justify finer-grained repositories.
- Use metadata-first editing slices to validate persistence and domain update paths before integrating the rich-text editor.
- Persist editor document updates through the same project boundary first, then optimize save strategy and decomposition later.
- Prefer a focus-first workspace shell that moves project creation and secondary controls out of the primary manuscript path.
- Prefer framework upgrades that keep lint configuration aligned with the framework's current flat-config exports instead of relying on legacy compatibility wrappers.
- Prefer read-time hydration for evolving local-first schemas so older persisted records remain usable across iterative product expansion.
- Prefer contextual side panels over permanently reserved layout rails when adjacent surfaces benefit more from a wider main canvas.
- Prefer a professional UI split between sans-serif application chrome and serif manuscript content so the writing surface feels editorial without making the whole app feel heavy.
- Prefer a component-system-led UI architecture with a centralized Material UI theme when the product needs faster visual consistency and a cleaner SaaS-like shell.
- Prefer theme-level refinement and shared surface treatments to raise perceived quality before pursuing isolated page-by-page micro-polish.
- Prefer persisted shell-layout preferences for high-frequency navigation controls when they reclaim meaningful writing space without touching project data.
- Prefer stacking nested editorial and CRUD workspaces vertically sooner rather than forcing side-by-side density inside already constrained shell columns.
- Prefer wrap-safe flex and grid text containers in shared UI primitives so long real-world content degrades gracefully without requiring per-screen rescue fixes.
- Prefer compact list-driven navigation for chapter and scene browsing over decorative carousel patterns in authoring workflows where scan speed matters more than motion.
- Prefer polishing selected-state emphasis, contrast tiers, and support-surface restraint before adding new visual complexity to writing-focused workspaces.
- Prefer optimistic local aggregate updates with short debounced background persistence before introducing broader state refactors when local-first UI responsiveness regresses.
