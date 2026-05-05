# Manuscript Editor Architecture Notes
#learning

## Insight
For writing products, the editor should be treated as one subsystem inside a larger domain model rather than as the product’s only source of truth.

## Why It Matters
Chapters, scenes, projects, characters, timeline events, and continuity references all need identities and relationships that should not be trapped inside raw editor documents. A structured editor is necessary, but surrounding narrative entities should remain explicit domain objects.

## Reusable Practice
- Keep editor documents serializable and storage-friendly.
- Model manuscript structure and story entities outside the editor when those concepts need independent lifecycle or linking.
- Use repository or service boundaries so persistence can change without rewriting UI flows.
- Keep the writing surface central, but let planning and reference surfaces read from shared domain entities.

## Related Areas
- [[ARCHITECTURE]]
- [[..\project-concept\Implementation Strategy - Detailed Context]]
- [[local-first-sync-ready-writing-products]]
