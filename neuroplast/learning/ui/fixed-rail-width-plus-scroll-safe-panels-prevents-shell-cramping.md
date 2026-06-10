# Fixed Rail Width plus Scroll-Safe Panels Prevents Shell Cramping
#learning

## Context
UI shell regressions appeared as a combination of issues rather than a single bug: collapsed side navigation still consumed too much width, some forms felt smashed, and long sidebar/inspector content became awkward to access.

## Lesson
When a desktop sidebar has a collapsed mode, proportional grid sizing alone is often not enough. A compact fixed-ish rail allocation plus `minHeight: 0` and explicit internal `overflowY` behavior on nested panels produces much more reliable UX under real content load.

## Reusable Practice
- Use a truly compact desktop column for collapsed rails so the main workspace reclaims meaningful width.
- Add `minHeight: 0` to grid/flex ancestors whenever child panes need to scroll.
- Put `overflowY: auto` on long-content panel internals (sidebar/inspector/list panes), not only on page root containers.
- Default shared CRUD and metadata `TextField` controls to `fullWidth` to avoid narrow, smashed inputs in dense card layouts.
- For long dynamic labels in compact action controls (chips/buttons/menu items), set explicit wrapping behavior (`whiteSpace: normal`, `overflowWrap: anywhere`) instead of relying on defaults.

## Related Notes
- [[persisted-collapsible-shell-rails]]
- [[wrap-safe-shared-workspace-primitives]]
