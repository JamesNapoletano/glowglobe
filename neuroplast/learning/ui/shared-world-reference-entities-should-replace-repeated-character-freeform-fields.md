# Shared World Reference Entities Should Replace Repeated Character Freeform Fields
#learning

## Insight
When many character profiles repeat the same taxonomy or origin field, that data usually belongs in a shared worldbuilding entity instead of freeform per-character text.

## Why It Matters
- Shared reference entities reduce spelling drift and duplicate maintenance.
- Select-backed character fields make continuity safer and future filtering easier.
- Worldbuilding concepts like species often carry broader setting implications than any single character profile.

## Reusable Practice
1. Promote repeated character metadata into a world-level entity once multiple profiles reuse it.
2. Replace freeform character text with a reference ID plus a select input.
3. On deletion, clear the reference safely rather than cascading destructive character changes.

## Related Notes
- [[lightweight-core-plus-optional-dossier-fields-keep-character-wikis-usable]]
- [[structured-select-fields-help-new-reference-surfaces-stay-bounded]]
