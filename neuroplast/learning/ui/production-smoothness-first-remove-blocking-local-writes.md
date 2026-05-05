# Production Smoothness First Remove Blocking Local Writes
#learning

## Insight
When a local-first interface feels broadly choppy in production, the first low-risk fix is often to stop blocking visible state updates on local persistence and reduce the heaviest always-visible paint effects.

## Why It Matters
This preserves the existing repository and domain shape while recovering perceived responsiveness quickly, which creates cleaner signals before larger rerender-boundary or state-management refactors.

## Reusable Practice
- Update visible React state immediately for local-first interactions, then persist in the background.
- Batch or debounce local writes when multiple small mutations can happen in quick succession.
- Keep editor synchronization keyed to actual document changes rather than broad entity-object identity when adjacent metadata updates are common.
- Remove large blur/compositing effects from always-visible panes before assuming the framework is the core performance problem.

## Related Areas
- [[ARCHITECTURE]]
- [[..\project-concept\Implementation Strategy - Detailed Context]]
- [[..\planning\project-aggregate-manuscript-crud]]
