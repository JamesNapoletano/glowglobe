# Example Project Details Editing Plan
#plan

## Objective
Make the seeded example project behave like a normal editable project so authors can rename it and update key project metadata directly from the app shell.

## Scope
- `src/lib/domain/project-factory.ts`
- `src/components/workspace-root.tsx`
- `src/components/app-shell.tsx`
- `src/components/project-details-form.tsx`
- `ARCHITECTURE.md`
- `README.md`

## Out of Scope
- Project archive/delete workflows.
- Multi-user permissions or role-based controls.
- Broad shell redesign outside metadata editing access.

## Current Reality
- The workspace seeds a starter project when local storage is empty.
- Project creation is supported, but there was no project-details editing workflow for existing projects.
- Users reported that some details on the example project could not be changed.

## Assumptions
- The seeded project should be editable once persisted, not treated as a locked template.
- Metadata edits should update immediately in active UI state and persist through repository saves.
- Verification should include typecheck, lint, and build.

## Tasks
1. Add a project-level metadata update function in the domain layer.
2. Wire a project-details update handler into workspace state and persistence.
3. Add a project-details editing dialog/form in the shell (including rename).
4. Ensure edits propagate to project title/metadata displays and persist.
5. Verify with `npm run typecheck`, `npm run lint`, and `npm run build`.
6. Update architecture, changelog, learning, and README artifacts.

## Verification
- Renaming the seeded example project updates shell title/sidebar/switcher labels.
- Editing genre, description, and status persists after reload.
- If the first book title matched the old project title, it updates with the rename to preserve default naming consistency.
- `npm run typecheck`, `npm run lint`, and `npm run build` all pass.

## Blockers
- None at plan start.

## Completion Notes
- Added `updateProjectDetails` in `project-factory` to update title/genre/description/status with timestamp refresh.
- Added a guarded primary-book title sync when the primary book still mirrored the previous project title.
- Wired `handleUpdateProjectDetails` in `workspace-root` so existing projects (including seeded ones) persist metadata edits through the same save pipeline.
- Added `ProjectDetailsForm` and an “Edit project details” shell action/dialog for rename and metadata editing.
- Updated architecture and README references to reflect editable project metadata support.
- Verification completed with typecheck, lint, and build.

## Handoff Context
The next control-surface pass can extend this same pattern to archive/restore, project deletion safeguards, and explicit project-level settings from both header and sidebar entry points.

## Related Changelog
- [[..\project-concept\changelog\2026-05-05]]
