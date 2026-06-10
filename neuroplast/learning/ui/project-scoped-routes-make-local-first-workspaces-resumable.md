# Project-Scoped Routes Make Local-First Workspaces Resumable
#learning

## Insight
Local-first authoring apps feel more trustworthy when high-level workspace state lives in the URL, not only in transient client component state.

## Why It Matters
If project, surface, chapter, and scene selection are encoded in the path, refreshes, browser history, and copied links all preserve the user's working context without requiring a server session model.

## Reusable Practice
- Put major workspace surfaces behind stable project-scoped routes.
- Use canonical redirect helpers to normalize incomplete or invalid deep links instead of leaving the UI in partial state.
- Keep persistence concerns local when possible; route state and storage state can cooperate without collapsing into one system.
- Thread active labels needed by the shell from the resolved route state so headers stay stable during client-side hydration and redirects.

## Related Areas
- [[persisted-collapsible-shell-rails]]
- [[stable-pre-hydration-shells-for-client-persistence]]
- [[ARCHITECTURE]]
