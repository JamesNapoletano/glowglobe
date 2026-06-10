# Current Item Destruction Needs a Visible Entrypoint
#learning

## Context
A product can technically support deletion through lifecycle or management views while still feeling like it has no delete path if the currently open item does not expose that action near its primary controls.

## Lesson
If users are working inside a current project, they expect deletion controls to be discoverable from that project's main control surface. Trash-first safety can stay intact, but the entrypoint still needs to be obvious where the current item is being managed.

## Reusable Practice
- Keep reversible trash-first semantics for safety.
- Expose the delete entrypoint near the current item's other top-level actions.
- If permanent deletion requires prior trashing, make that progression explicit in the action copy or confirmation flow.

## Related Notes
- [[trash-first-project-lifecycle-controls-reduce-accidental-loss]]
- [[matched-primary-action-pairs-read-better-than-loose-sibling-buttons]]
