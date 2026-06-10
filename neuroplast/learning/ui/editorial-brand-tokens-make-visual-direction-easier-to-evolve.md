# Editorial Brand Tokens Make Visual Direction Easier to Evolve
#learning

## Insight
When a product has a strong screenshot or moodboard target but not yet-final brand assets, the most durable move is to capture the direction in reusable tokens and a swappable placeholder logo component instead of scattering one-off color and typography overrides through the shell.

## Why It Matters
Temporary branding often becomes expensive when the official brand arrives because the visual direction was encoded directly inside many components. Centralizing palette, typography, and logo usage lowers the cost of both experimentation and later replacement.

## Reusable Practice
- Store screenshot-derived palette, typography, and surface decisions in a single token file before broad styling passes.
- Pair the token file with a short human-readable branding sheet so future humans and agents can review the visual contract without reverse-engineering code.
- Use a dedicated temporary logo component so official assets replace one abstraction instead of many text labels.
- Separate manuscript typography from UI chrome typography when the writing surface should feel editorial but the app shell should still feel like a product workspace.
- Apply the new direction first to the highest-visibility shared surfaces: shell header, sidebar, draft canvas, and fallback states.

## Related Areas
- [[premium-product-feel-through-theme-depth]]
- [[mui-theme-first-shell-migrations]]
- [[manuscript-first-inspector-layout]]
- [[ARCHITECTURE]]
