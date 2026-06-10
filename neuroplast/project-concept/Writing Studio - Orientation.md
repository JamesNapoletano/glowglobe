# Writing Studio - Orientation
#project-concept

## Purpose
Provide the primary manuscript-first workspace for drafting, revising, and organizing rich long-form writing.

## Current Reality
The writing studio is now implemented as the primary active workspace with a richer center-stage draft canvas, a slimmer and denser manuscript navigator built around a single hierarchical chapter-and-scene list, a contextual right-side inspector for scene metadata and linked continuity context, sharper lower-friction panel framing that preserves more usable room for actual drafting, safer text handling in shared writing-adjacent panels when titles and summaries run long, a warmer editorial brand direction with manuscript-forward typography and paper-like surfaces, a temporary placeholder GlowGlobe logo that can be replaced once official brand assets are available, a cleaner screenshot-aligned three-pane layout that reduces banner chrome in favor of a more dominant center drafting area, an Aurora-derived branding sheet and shared MUI theme token layer that keep the app aligned to the current visual reference, reliable add-scene navigation that stays on the newly created scene even when the route remounts before debounced persistence completes, guarded chapter and scene deletion that only appears when another chapter/scene will remain and now asks for confirmation before removal, and a viewport-bounded inspector column that scrolls independently instead of extending the full page.

## Desired Outcome
The author can write chapters, scenes, and long-form documents in a distraction-light environment with elegant formatting and quick access to supporting context.

The current UX direction also separates UI chrome from manuscript typography so the editor feels more editorial while the surrounding application feels more modern and professional.

## Important Actors or Stakeholders
- Primary author
- Future synced single user across devices

## Key Artifacts or Interfaces
- Manuscript editor — rich drafting surface
- Chapter and scene navigator — manuscript structure browser
- Focus mode — low-distraction writing mode
- Inline links — connections to characters, places, technology, and lore

## Constraints
- Must support rich formatting rather than plain text only
- Must stay manuscript-first in the overall product hierarchy
- Must preserve data in a format suitable for future sync and export

## Open Questions
- Which exact editor feature set is mandatory for v1 versus later?
- What export formats should shape early document modeling?

## Link to Detailed Context
[[Writing Studio - Detailed Context]]
