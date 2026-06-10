# Artifact consistency sweeps catch context drift
#learning

## Context
After several rapid implementation passes, plan/changelog/architecture artifacts can drift from actual repository state even when core code is correct.

## Learning
- Run short consistency sweeps after multi-pass execution bursts to catch stale environment assumptions and missing cycle summaries.
- Update changelog summaries when adjacent work lands after the first entry draft, especially for safety-related controls.
- Keep architecture operational notes grounded in observable repository reality to avoid future routing/planning misreads.

## Reuse Guidance
- Treat artifact consistency checks as a bounded post-pass task, not an ad hoc cleanup.
- Verify with standard quality commands after artifact edits, even when no runtime code changed.

## Related Notes
- [[scaffold-with-domain-boundaries-first]]
