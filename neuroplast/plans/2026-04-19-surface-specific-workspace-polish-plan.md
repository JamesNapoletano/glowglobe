# Surface-Specific Workspace Polish Plan
#plan

## Objective
Implement a more polished and professional workspace UI by reducing persistent chrome, giving the center canvas more usable space, and making each primary surface feel more page-specific.

## Scope
- Refine the global app shell into a lighter, more professional frame.
- Keep the right-side inspector visible for Writing Studio and reclaim that space for non-writing surfaces.
- Refactor the writing workspace so the editor has stronger visual priority and the manuscript outline can step back when needed.
- Make adjacent product surfaces feel more distinct through surface-specific headers, metrics, and layouts.
- Update architecture, concept, changelog, and learning artifacts to match the implemented direction.

## Out of Scope
- Route-level restructuring or multi-page URL changes.
- New backend, persistence, or domain model features.
- New advanced visual planning systems beyond layout and UX improvements.
- Mobile-specific redesign beyond responsive behavior of the updated shell.

## Current Reality
- The shell always reserves left and right rails even when the active surface does not benefit from an inspector.
- Writing Studio loses center space to a second fixed manuscript outline rail plus extra preview chrome.
- Adjacent surfaces largely reuse the same CRUD shell, so they feel functional but not page-specific.
- The visual system uses too many stacked cards, borders, and shadows for the amount of content on screen.

## Assumptions
- Writing Studio remains the product's center of gravity.
- Non-writing surfaces benefit more from a wider content canvas than from a persistent inspector.
- The current reusable CRUD foundation should remain intact, but it can be reframed with better surface-specific presentation.

## Tasks
1. Slim down and polish the global application shell.
2. Make the right inspector contextual to Writing Studio.
3. Refactor the manuscript workspace to favor the draft canvas and reduce competing chrome.
4. Add more surface-specific headers and presentation patterns for adjacent workspaces.
5. Run verification checks and fix issues.
6. Update architecture, concept, changelog, and learning artifacts.

## Verification
- Writing Studio uses noticeably more of the center canvas than before.
- Non-writing surfaces no longer reserve persistent inspector width.
- Adjacent surfaces present more page-specific framing than the prior generic split view alone.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- No blockers at plan creation time.

## Completion Notes
- Completed a lighter, more professional shell with slimmer chrome and a wider main canvas.
- Completed contextual inspector behavior so the right rail stays visible for Writing Studio and yields space back to adjacent surfaces.
- Completed a refocused writing workspace with a stronger draft canvas, lighter structure rail, and reduced competing preview chrome.
- Completed page-specific framing improvements for adjacent surfaces through tailored metrics, headers, and workspace presentation.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Handoff Context
If this slice succeeds, the next UX step should be adding deeper surface-native interactions such as richer timeline visualization, corkboard drag-and-arrange behavior, and character relationship views without sacrificing the improved manuscript-first shell.

## Related Changelog
- [[..\project-concept\changelog\2026-04-19]]
