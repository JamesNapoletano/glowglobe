# Rich Editor After Metadata
#learning
## Insight
Integrating a rich-text editor is smoother after metadata editing and selection flows are already stable.

## Why It Matters
The editor can then plug into an existing persistence boundary, active-entity model, and form-tested workspace flow instead of forcing architecture decisions and UI state conventions all at once.

## Reusable Practice
- Establish active selection and metadata persistence before adding the editor.
- Treat the editor document as just another persisted field on the current aggregate at first.
- Start with a minimal editor slice and simple save semantics before adding toolbar complexity.
- Derive lightweight preview text from the editor document until richer manuscript rendering is designed.

## Related Areas
- [[ARCHITECTURE]]
- [[..\project-concept\Implementation Strategy - Detailed Context]]
- [[metadata-before-rich-editor]]
