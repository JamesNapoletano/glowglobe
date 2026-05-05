# MUI Theme-First Shell Migrations
#learning

## Insight
When a product UI already has stable workflows but the visual direction feels wrong, moving shared shell and CRUD layers to a centralized Material UI theme is a faster and more coherent correction than continuing to iterate utility-class styling file by file.

## Why It Matters
Large Tailwind-heavy shells can make visual refinements expensive because the design language is spread across many component-local class strings. A theme-first MUI migration recenters decisions around shared tokens, component variants, and consistent interaction patterns, which makes broad visual direction changes easier to sustain.

## Reusable Practice
- Migrate provider and theme setup first so all later visual work lands on a stable foundation.
- Replace shell, form, list, dialog, and card primitives before polishing edge surfaces.
- Keep global CSS limited to document-level behaviors and rich-editor specifics.
- Use the migration as a chance to simplify visual language, not only swap component APIs.

## Related Areas
- [[form-first-full-surface-v1]]
- [[manuscript-first-inspector-layout]]
- [[ARCHITECTURE]]
