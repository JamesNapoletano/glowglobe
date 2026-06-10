# Aurora Branding Sheet

Source of truth: Stitch project `Aurora`, workspace screen `52c579cff70d4a5580e69fe71a3d28ca` (`Earthy Writing Studio Workspace`).

## Brand direction
- Calm editorial workspace
- Warm paper surfaces over cool app chrome
- Muted sage as the active accent
- Sand / amber as the supporting accent
- Flat, structured controls with light borders and minimal shadow

## Core palette

| Token | Hex | Use |
| --- | --- | --- |
| Ink | `#2c241c` | Primary text |
| Muted ink | `#6f6559` | Secondary text |
| Sage | `#95a284` | Active states, primary actions |
| Deep sage | `#748268` | Hover / stronger active emphasis |
| Sand | `#b28a62` | Secondary accent, structural warmth |
| Paper | `#f7f1e7` | Primary cards and shell surfaces |
| Warm canvas | `#ede6da` | App background |
| Soft panel | `#f3ebde` | Navigator and inspector sections |
| Muted panel | `#efe6d8` | Secondary grouped surfaces |
| Manuscript | `#fcf8f0` | Draft/editor background |
| Rule | `rgba(117,102,83,0.18)` | Borders and dividers |

## Typography
- **UI / labels / controls:** `Inter`
- **Display / workspace headings:** `Iowan Old Style`, fallback serif stack
- **Manuscript surface:** same serif stack as display for a document-first feel

## Type scale intent
- `h1`: project title / page identity
- `h2`: active draft title
- `h3`: section titles and compact cards
- `overline`: rail labels, captions, metadata headers
- `body1/body2`: editorial descriptions and helper copy

## Shape and spacing
- Shell radius: `8px`
- Card radius: `8px`
- Input / button radius: `6px`
- Chips and pills can stay fully rounded for compact metadata
- Prefer dense 8px spacing rhythm with restrained vertical padding

## Elevation
- Favor borders and paper-tone separation over heavy shadows
- Default card shadow should be very soft and low-contrast
- Selected emphasis should come more from tint + border than elevation

## Component patterns
- **Buttons:** flat, small, lightly bordered; primary actions use muted sage fill
- **Cards / panes:** warm paper backgrounds with subtle border and low shadow
- **Navigator rows:** soft tinted selected states, quiet unselected rows
- **Inspector cards:** slightly darker paper groupings than manuscript canvas
- **Editor surface:** brightest paper surface in the layout
- **Chips / badges:** quiet paper pills with muted text unless active

## MUI mapping
- `palette.primary` -> sage family
- `palette.secondary` -> sand family
- `palette.background.default` -> warm canvas
- `palette.background.paper` -> paper
- `palette.text.primary` -> ink
- `palette.text.secondary` -> muted ink
- `shape.borderRadius` -> card radius
- `typography.fontFamily` -> UI font
- `typography.h1/h2/h3` -> serif display stack
- `components.MuiButton` -> low-elevation, compact, quiet outlined defaults
- `components.MuiCard` / `MuiPaper` -> paper surfaces with soft rule
- `components.MuiOutlinedInput` -> manuscript/paper field fill with subtle focus ring

## Implementation notes
- Executable brand tokens live in `src/theme/brand-tokens.ts`.
- The shared app theme lives in `src/theme.ts`.
- High-visibility shell surfaces should prefer brand tokens over one-off rgba literals.
