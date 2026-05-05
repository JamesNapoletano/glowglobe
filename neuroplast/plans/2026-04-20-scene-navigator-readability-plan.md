# Scene Navigator Readability Plan
#plan

## Objective
Make the writing workspace scene navigator easier to scan and read while keeping the right-side inspector visible in writing mode.

## Scope
- Redesign the manuscript navigator in `src/components/manuscript-viewport.tsx` into a cleaner single hierarchical structure.
- Reduce nested navigator chrome that makes the current rail feel cramped.
- Improve chapter and scene title handling so narrow-width readability improves without hiding the inspector.
- Keep chapter and scene creation actions contextual and visible.
- Verify with `npm run typecheck`, `npm run lint`, and `npm run build`.
- Update architecture, concept, changelog, and learning artifacts after implementation.

## Out of Scope
- Collapsing or removing the writing inspector.
- Data-model or persistence changes.
- Broad shell-layout changes outside minor consistency adjustments.

## Current Reality
- The writing workspace already uses a compact navigator, but it still feels smooshed because the rail contains multiple nested framed sections inside a narrow column.
- Chapter browsing and active chapter scene browsing are visually split into separate blocks, which adds chrome and reduces scan efficiency.
- Long chapter and scene titles currently favor wrap-anywhere behavior that preserves visibility but can hurt readability in the constrained navigator width.

## Assumptions
- A single hierarchical navigator will read better than separate chapter and active-chapter panels when the inspector remains visible.
- The highest-value improvement comes from reducing internal chrome and clarifying hierarchy rather than changing the outer shell layout.
- Narrow writing rails benefit from intentional multi-line clamping more than unrestricted mid-word wrapping.

## Tasks
1. Redesign `src/components/manuscript-viewport.tsx` so chapter and scene browsing live in one clearer hierarchical navigator.
2. Remove the separate active-chapter framed block and move scene creation into the active chapter section inline.
3. Improve row spacing, selected-state hierarchy, and title readability for narrow-width scanning.
4. Run `npm run typecheck`, `npm run lint`, and `npm run build`.
5. Update architecture, concept, changelog, and learning artifacts.

## Verification
- The inspector remains visible in writing mode.
- The navigator reads as one coherent structure instead of two competing stacked sections.
- Chapter and scene titles are easier to scan at common laptop widths.
- Long navigator titles no longer look broken or heavily squeezed.
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed.

## Blockers
- No blockers at plan creation time.

## Completion Notes
- Reworked the manuscript navigator into one hierarchical chapter-and-scene structure while keeping the inspector visible in writing mode.
- Removed the separate active-chapter block so the navigator spends more of its narrow rail on actual navigation content instead of nested chrome.
- Switched chapter and scene titles to clamped multi-line presentation so longer names stay readable without the previous smooshed wrap behavior.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Handoff Context
If the navigator is still constrained after this pass, the next iteration should consider a dedicated laptop-width writing layout that preserves the inspector but uses a stronger minimum-width strategy for the scene rail.

## Related Changelog
- [[..\project-concept\changelog\2026-04-20]]
