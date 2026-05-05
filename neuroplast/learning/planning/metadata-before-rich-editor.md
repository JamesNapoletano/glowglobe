# Metadata Before Rich Editor
#learning

## Insight
For writing products, lightweight metadata editing is a useful proving ground before integrating the rich-text editor.

## Why It Matters
It validates the persistence path, form behavior, selection model, and domain mutation flow using simpler data before introducing the complexity of structured editor state.

## Reusable Practice
- Add title and summary editing before rich-body editing.
- Reuse the same repository and active-selection flow that the future editor will depend on.
- Keep metadata forms explicit and isolated from the future editor subsystem.
- Treat successful metadata persistence as a checkpoint before integrating richer document editing.

## Related Areas
- [[ARCHITECTURE]]
- [[..\project-concept\Implementation Strategy - Detailed Context]]
- [[project-aggregate-manuscript-crud]]
