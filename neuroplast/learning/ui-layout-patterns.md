# UI Layout Patterns
#learning

## Stacked reference workspaces over nested editor grids
- When a non-writing workspace contains multiple related editors, prefer a single surface-level title card followed by a table of contents and anchored collapsible sections.
- This keeps page identity stable while still letting operators jump directly to the correct editor block.
- Reuse one shared section scaffold across surfaces so single-editor and multi-editor workspaces feel like the same product system.
- Hide the table of contents when the shared surface exposes fewer than two sections so single-editor pages avoid redundant navigation chrome.
- Do not repeat the section title inside the expanded body card unless the body is introducing a distinct nested sub-area; otherwise the accordion header should carry the naming burden alone.
