# Wrap-Safe Shared Workspace Primitives
#learning

## Insight
When shared shell and workspace components use flex or grid layouts, long real-world content will eventually expose weak text-container defaults. Adding `minWidth: 0` and explicit wrap behavior to shared primitives is usually more effective than fixing each overflow case one screen at a time.

## Why It Matters
Project titles, metadata pills, entity names, scene titles, and inspector details are all content-driven. If the shared containers are not wrap-safe, a polished UI can still look broken as soon as real data gets longer than the sample content.

## Reusable Practice
- Add `minWidth: 0` to flexible children that contain text inside shared flex and grid layouts.
- Prefer `overflowWrap: "anywhere"` for content-driven labels and descriptions that must remain readable.
- Keep truncation rare and intentional; default to readable multi-line wrapping in authoring tools.
- Audit shared primitives like pill rows, list items, metric cards, and section headers first because they multiply layout bugs across the whole app.

## Related Areas
- [[sharper-workspace-shells-through-vertical-density-control]]
- [[premium-product-feel-through-theme-depth]]
- [[ARCHITECTURE]]
