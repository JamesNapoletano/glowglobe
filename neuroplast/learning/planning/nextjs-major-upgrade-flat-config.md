# Next.js Major Upgrade Flat Config
#learning

## Insight
When upgrading to a newer major Next.js release, framework-adjacent tooling such as ESLint config loading may need to move from compatibility wrappers to the framework's current exported flat-config entrypoints.

## Why It Matters
The package upgrade itself can succeed while linting fails later because older configuration patterns still technically load but are no longer safe for the updated framework package shape. Verifying lint and build after the upgrade catches these mismatches early.

## Reusable Practice
- Upgrade `next` and `eslint-config-next` together on major-version changes.
- Check the framework package exports and consume the current flat-config entrypoints directly when available.
- Re-run typecheck, lint, and production build after the dependency upgrade before treating the migration as complete.
- Expect App Router builds to require explicit runtime boundaries such as `not-found` files when the newer framework becomes stricter.

## Related Areas
- [[ARCHITECTURE]]
- [[..\ui\form-first-full-surface-v1]]
