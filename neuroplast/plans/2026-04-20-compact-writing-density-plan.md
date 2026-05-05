# Compact Writing Density Plan
#plan

## Objective
Tighten overall UI density and redesign the writing navigator into a more space-efficient compact chapter list plus active scene list so the manuscript workspace feels more professional and gives the draft more room.

## Scope
- Reduce shell and manuscript chrome spacing where extra air is not helping readability.
- Redesign the scene navigator into a compact two-stage structure: chapter list plus active chapter scene list.
- Keep chapter creation visible and move scene creation into the active chapter context.
- Tighten supporting manuscript cards and editor-adjacent framing without making prose reading feel cramped.
- Verify with project quality checks.
- Update architecture, concept, changelog, and learning artifacts after implementation.

## Out of Scope
- New manuscript features, data-model changes, or persistence changes.
- Carousel-based navigation patterns.
- Major rework of the inspector beyond density alignment if needed for consistency.

## Current Reality
- The UI is cleaner than before, but shell spacing is still somewhat roomy for a productivity-oriented writing app.
- The current scene navigator spends too much space rendering every chapter as a full card with nested scene lists.
- The writing workspace would benefit from denser structural chrome so the draft remains the visual priority.

## Assumptions
- A compact chapter selector plus active scene list is more space-efficient and more professional than a carousel for authoring workflows.
- Reducing shell padding and inter-section spacing one step will improve focus without hurting readability.
- The prose editing area should stay relatively comfortable even while surrounding chrome becomes denser.

## Tasks
1. Redesign the manuscript navigator in `src/components/manuscript-viewport.tsx` to use a compact chapter list and active chapter scene list.
2. Tighten manuscript header, support cards, and adjacent chrome spacing.
3. Reduce shell and sidebar spacing slightly for a denser professional workspace feel.
4. Tighten editor-adjacent framing in `src/components/scene-body-editor.tsx` and related supporting surfaces if needed.
5. Verify with `npm run typecheck`, `npm run lint`, and `npm run build`.
6. Update architecture, concept, changelog, and learning artifacts.

## Verification
- The writing view shows more usable room without harming editor readability.
- The navigator no longer renders every chapter as a full nested card stack.
- Chapter and scene navigation remain clear and faster to scan.
- Shell and support-card spacing feel tighter but not cramped.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- No blockers at plan creation time.

## Completion Notes
- Replaced the nested chapter-card navigator with a compact two-stage structure: chapter list plus active chapter scene list.
- Tightened manuscript header, support-card, shell, sidebar, and editor-adjacent spacing to reduce excess chrome and return more room to the draft.
- Kept the prose surface comfortable while making surrounding workspace controls denser and faster to scan.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Handoff Context
If the writing workspace still feels too segmented after this pass, the next iteration should reduce support-card prominence below the editor and consider an optional low-distraction manuscript mode.

## Related Changelog
- [[..\project-concept\changelog\2026-04-20]]
