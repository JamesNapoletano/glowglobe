# Accordion Collapse Fix Plan
#plan

## Objective
Restore working collapse and expand behavior for shared non-writing workspace section accordions.

## Scope
- `src/components/entity-workspace.tsx`
- `neuroplast/project-concept/changelog/2026-05-21.md`
- `neuroplast/plans/.active-plan`
- `neuroplast/learning/ui/accordion-structure-needs-direct-summary-and-details-children.md`

## Out of Scope
- Changing accordion styling beyond what is needed to preserve current appearance.
- Reworking section ordering, defaults, or table-of-contents behavior.

## Assumptions
- The failure is caused by the shared accordion structure rather than surface-specific data.
- Material UI accordion toggles require `AccordionSummary` and `AccordionDetails` to remain direct children of `Accordion`.

## Tasks
1. Persist this bounded plan and mark it active.
2. Fix the shared accordion markup so the collapse/expand control works again.
3. Update changelog and learning artifacts with the reusable lesson.
4. Run `npm run typecheck`, `npm run lint`, and `npm run build`.

## Verification
- Non-writing workspace section headers toggle open and closed again.
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.

## Blockers
- None.

## Completion Notes
- Removed the extra card wrapper inside the shared accordion so Material UI summary/details remain direct children and the toggle control works.
- Preserved the existing visual treatment by styling the accordion container directly.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Related Changelog
- [[..\project-concept\changelog\2026-05-21]]

## Restart Point
- Resume in `src/components/entity-workspace.tsx` if further accordion interaction polish is needed.
