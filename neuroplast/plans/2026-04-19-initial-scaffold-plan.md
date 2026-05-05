# Initial Scaffold Plan
#plan

## Objective
Scaffold the initial GlowGlobe application using Next.js, React, TypeScript, Material UI, and react-hook-form, while codifying the app shell, core domain types, and repository interfaces.

## Scope
- Replace the minimal package scaffold with a buildable Next.js application setup.
- Create the initial app-router structure and global styles.
- Create a manuscript-first app shell UI.
- Add TypeScript domain types and repository interfaces.
- Add at least one react-hook-form powered UI surface.
- Update architecture, concept, changelog, learning, and README artifacts as needed.

## Out of Scope
- IndexedDB implementation
- Tiptap/ProseMirror editor implementation
- Authentication, sync, or backend services
- Automated tests beyond build verification

## Current Reality
- The repository has planning artifacts and no actual application scaffold.
- The desired stack is now explicitly Next.js, React, TypeScript, Material UI, and react-hook-form.
- The product remains manuscript-first, local-first, sync-ready, and single-author.

## Assumptions
- A lightweight initial shell is preferable to overbuilding the first coding pass.
- Placeholder data is acceptable for scaffolding if domain boundaries are clear.
- Build verification is the primary quality gate for this cycle.

## Tasks
1. Write the initial web-app configuration and scripts.
2. Create the app router entry files and global styles.
3. Build a static manuscript-first shell with navigation and context panels.
4. Define the core domain types and repository contracts.
5. Add a react-hook-form powered quick-create form.
6. Install dependencies and verify the scaffold builds.
7. Update architecture, concept, changelog, learning, and README artifacts.

## Verification
- `npm install` completes successfully.
- `npm run build` completes successfully.
- The app shell renders using the chosen stack.
- The repository includes core domain and repository files under `src/`.
- Updated Neuroplast and README artifacts reflect the scaffolded implementation state.

## Blockers
- No known blockers at planning time.

## Handoff Context
The next likely step after this scaffold is to implement repository adapters and start the first real manuscript/project flows using the defined domain model.

## Related Changelog
[[changelog/2026-04-19]]
