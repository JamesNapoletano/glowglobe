# UI Wrap and Overflow Cleanup Plan
#plan

## Objective
Clean up text breaking, overflow, and remaining spacing issues in the application shell and reusable workspace surfaces so long labels, titles, descriptions, and metadata remain readable without distorting the layout.

## Scope
- Improve wrapping and overflow behavior in the shell header, info pills, and supporting metadata.
- Improve sidebar text handling for project entries, section headers, and surface descriptions.
- Improve reusable entity workspace behavior for long titles, metrics, list details, and editor header actions.
- Apply targeted follow-up fixes in adjacent writing and inspector surfaces if needed.
- Verify with project quality checks.
- Update architecture, changelog, and learning artifacts after implementation.

## Out of Scope
- New feature work or workflow restructuring.
- Changes to persistence, domain modeling, or data flow.
- Another broad visual restyle beyond the targeted readability and spacing cleanup.

## Current Reality
- The prior polish pass improved sharpness and density, but some flexible rows still allow awkward text breaks and squeezed wrapping.
- Long project metadata and supporting labels can still crowd pill groups and sidebar entries.
- Reusable workspaces still need safer text-container rules in headers, metrics, and item detail blocks.

## Assumptions
- The highest-value fixes come from better flex and grid text constraints rather than more surface redesign.
- Adding `minWidth: 0`, safer wrapping rules, and earlier stacking will solve most remaining breakage.
- Long strings should remain readable by wrapping cleanly rather than being aggressively truncated.

## Tasks
1. Fix shell header wrapping and overflow behavior in `src/components/app-shell.tsx`.
2. Fix project/sidebar list text handling and section spacing in `src/components/workspace-sidebar.tsx`.
3. Fix reusable entity workspace headers, metrics, and item detail wrapping in `src/components/entity-workspace.tsx`.
4. Apply any necessary follow-up fixes to manuscript and inspector components affected by the same pattern.
5. Verify with `npm run typecheck`, `npm run lint`, and `npm run build`.
6. Update architecture, changelog, and learning artifacts.

## Verification
- Long project titles, genres, book names, and mode labels no longer break awkwardly in the shell header.
- Sidebar project entries and surface descriptions wrap cleanly without cramped collisions.
- Entity workspace metric cards, directory items, and editor headers remain readable with long content.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- No blockers at plan creation time.

## Completion Notes
- Added safer text-container behavior in shell, sidebar, manuscript, inspector, and reusable entity workspace components using `minWidth: 0` and explicit wrap handling.
- Improved pill, metadata, project-entry, surface-description, and list-detail behavior so long values wrap cleanly instead of colliding with adjacent controls.
- Relaxed metric and header width assumptions in reusable workspace components to reduce squeezed layouts.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Handoff Context
If specific visual defects remain after this pass, the next iteration should use browser screenshots or an automated visual review workflow so any final outliers can be corrected with evidence instead of only code inference.

## Related Changelog
- [[..\project-concept\changelog\2026-04-20]]
