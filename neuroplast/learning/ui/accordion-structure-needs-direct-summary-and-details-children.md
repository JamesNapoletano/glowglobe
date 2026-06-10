# Accordion Structure Needs Direct Summary And Details Children
#learning

## Insight
Material UI accordion expand/collapse behavior can break when `AccordionSummary` and `AccordionDetails` are wrapped inside an extra layout component instead of being direct children of `Accordion`.

## Why It Matters
- The UI can still look correct while the toggle control quietly stops working.
- Shared workspace primitives amplify this kind of bug across multiple surfaces at once.

## Reusable Practice
1. Keep `AccordionSummary` and `AccordionDetails` as direct children of `Accordion`.
2. Move card-like styling onto the accordion container itself when needed.
3. Treat broken shared interaction primitives as high-priority fixes because they affect multiple surfaces.

## Related Notes
- [[wrap-safe-shared-workspace-primitives]]
- [[form-first-full-surface-v1]]
