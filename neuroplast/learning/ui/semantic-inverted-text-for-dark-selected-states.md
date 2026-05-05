# Semantic Inverted Text for Dark Selected States
#learning

## Insight
When a UI uses dark selected or active surfaces, nested labels and helper text should rely on semantic inverted text tokens instead of one-off dark gray utility colors.

## Why It Matters
Dark selected surfaces often start readable at the container level, then break when nested secondary text keeps an older dark color. That makes active items look low-contrast or even empty after a theme refresh.

## Reusable Practice
- Define explicit inverse text tokens such as primary and muted variants for dark selected states.
- Use those tokens consistently across active navigation, selected cards, chips, and primary dark buttons.
- Avoid hardcoded utility shades inside selected states when the container background is theme-driven.
- Revisit focus and text-selection highlights when the accent palette changes so accessibility fixes stay visually coherent.

## Related Areas
- [[contextual-side-panels-for-surface-specific-workspaces]]
- [[manuscript-first-inspector-layout]]
- [[ARCHITECTURE]]
