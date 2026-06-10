# Controlled form defaults prevent React input mode flips
#learning

## Context
Metadata forms that reset with partial objects can surface React warnings when an input initially renders without a defined value and later receives one.

## Learning
- Keep reusable form fields controlled across their full lifetime by explicitly supplying stable `value` fallbacks.
- When using React Hook Form with dynamic item selection, prefer `Controller` in reusable field renderers where value coercion and null/undefined handling matter.
- Number inputs need explicit parse handling to preserve controlled behavior without leaking string/number mismatch into domain saves.

## Reuse Guidance
- For dynamic editor panes, verify both initial render and post-reset states for each input type (`text`, `textarea`, `number`, `select`).
- Treat “no uncontrolled-to-controlled warning in browser console” as part of metadata-form acceptance criteria.

## Related Notes
- [[trash-first-project-lifecycle-controls-reduce-accidental-loss]]
