# Next.js 16 Upgrade Plan
#plan

## Objective
Upgrade GlowGlobe from Next.js 15 to Next.js 16, align the matching lint configuration package, verify runtime compatibility with the existing React 19 app shell, and preserve current manuscript-first functionality.

## Scope
- Upgrade `next` and `eslint-config-next` to the current Next.js 16 release.
- Refresh the lockfile through a clean install.
- Run typecheck, lint, and production build after the upgrade.
- Update architecture, changelog, and learning artifacts to reflect the framework upgrade.

## Out of Scope
- Fixing unrelated runtime issues such as legacy IndexedDB data migration.
- Refactoring application logic unrelated to framework compatibility.
- Introducing new product features.

## Current Reality
- The repository currently uses `next` and `eslint-config-next` at `15.5.15`.
- React 19 and the current Node runtime already satisfy the published Next.js 16 peer and engine requirements.
- The codebase uses a simple Next config and App Router scaffold, so framework upgrade risk is moderate rather than high.

## Assumptions
- Next.js 16 remains compatible with the current React 19 versions in this repository.
- Existing scripts (`dev`, `build`, `start`, `lint`, `typecheck`) remain the correct verification interface after the upgrade.
- No additional package upgrades are required beyond dependency resolution unless install-time compatibility issues reveal otherwise.

## Tasks
1. Upgrade `next` and `eslint-config-next` to `16.2.4`.
2. Refresh the lockfile and installed dependency graph.
3. Run `npm run typecheck`, `npm run lint`, and `npm run build`.
4. Fix any framework-compatibility issues revealed by the upgrade.
5. Update architecture, changelog, and learning artifacts.

## Verification
- `package.json` and lockfile reflect Next.js 16.
- `npm run typecheck` succeeds.
- `npm run lint` succeeds.
- `npm run build` succeeds.

## Blockers
- No blockers at planning time.

## Completion Notes
- Upgraded `next` and `eslint-config-next` to `16.2.4`.
- Refreshed the installed dependency graph and lockfile.
- Replaced the legacy ESLint compatibility-wrapper setup with direct flat-config imports from `eslint-config-next`.
- Added `src/app/not-found.tsx` so Next.js 16 production builds complete successfully.
- Verified with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Handoff Context
If the upgrade succeeds, the next stability-focused cycle should address legacy persisted project hydration so older IndexedDB data cannot crash the app at runtime.

## Related Changelog
[[changelog/2026-04-19]]
