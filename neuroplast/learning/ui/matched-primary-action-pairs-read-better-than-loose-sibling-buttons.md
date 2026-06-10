# Matched Primary Action Pairs Read Better Than Loose Sibling Buttons
#learning

## Context
Two adjacent primary navigation actions can share the same component family and base tokens but still feel visually uneven if their container layout lets each button size itself independently.

## Lesson
When a UI presents a paired action set like `Switch project` and `New project`, matching width behavior inside the intended layout matters as much as matching padding or variant choices. Do not change a vertical control stack into a row unless that layout change was actually requested.

## Reusable Practice
- Treat adjacent sibling actions as a layout unit, not just two individually styled buttons.
- Use the same width behavior and alignment rules for both buttons when they are meant to read as a matched pair.
- Preserve the requested stack direction first; then make the buttons fill the available space within that layout.
- Verify the exact control group the user called out instead of assuming a broader style pass automatically satisfies that narrower acceptance bar.

## Related Notes
- [[trash-first-project-lifecycle-controls-reduce-accidental-loss]]
- [[persist-route-backed-projects-before-navigation]]
