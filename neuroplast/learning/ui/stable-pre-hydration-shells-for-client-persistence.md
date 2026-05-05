# Stable Pre-Hydration Shells for Client Persistence
#learning

## Insight
When an app depends on client-only persistence such as IndexedDB, the server render should prefer a stable loading shell over rendering interactive fallback content that will immediately diverge after hydration.

## Why It Matters
Using real-looking fallback project content during SSR can make the application feel fast, but it also increases the risk of hydration mismatches once client storage loads the real state. A simple pre-hydration shell is safer, clearer, and easier to reason about.

## Reusable Practice
- Render a boring but stable shell until client-only persistence is ready.
- Avoid SSR-selected interactive content when the true source of state only exists on the client.
- Gate rich editors and browser-managed interactive DOM until both client readiness and component readiness are confirmed.
- Keep fallback sample data as a client-side recovery path, not as server-rendered app content.

## Related Areas
- [[manuscript-first-inspector-layout]]
- [[semantic-inverted-text-for-dark-selected-states]]
- [[ARCHITECTURE]]
