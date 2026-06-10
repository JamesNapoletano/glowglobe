# GlowGlobe

GlowGlobe is a manuscript-first writing workspace for novels and long-form documents. The project is being built as a local-first web app with a sync-ready architecture for a future hosted service.

## Current Stack

- Next.js 16
- React
- TypeScript
- Material UI
- react-hook-form

## Current Focus

- scaffold the app shell
- codify the core domain model
- define repository boundaries for local-first persistence

## Current Capabilities

- Create and switch between multiple projects in a local-first workspace.
- Recover safely to a landing page when a project URL points to a missing or unselected workspace, then choose or create a project from there.
- Create a new project and enter it immediately without flashing back to the previously active project.
- Navigate each active project through project-scoped routes such as `/projects/[projectId]/characters` and `/projects/[projectId]/writing/[chapterId]/[sceneId]`.
- Reload or share a writing URL and return to the same project, chapter, and scene.
- Edit active project details (title, genre, status, description), including the initial seeded example project.
- Archive projects, move projects to trash (soft delete), and restore archived/trashed projects.
- Permanently delete individual trashed projects directly from the trash view, or empty the full trash when needed.
- Use the main shell `Delete project` action to reach the same trash-first deletion flow for the current project.
- Keep archived and trashed projects hidden by default with sidebar toggles to reveal them when needed.
- Use vertically stacked non-writing workspaces with a title card, collapsible editor sections, and in-page table of contents links when a page has multiple sections.
- Build richer wiki-style character profiles with lightweight required fields, optional dossier sections, and typed relationship tracking.
- Manage reusable species records inside the World workspace and select them from character profiles instead of typing species freeform.
- Track factions, clans, guilds, kingdoms, corporations, religions, and similar groups in a dedicated `Sociums` surface with a required type dropdown plus richer ally/rival and continuity fields.
- Link Sociums directly from the Writing Studio inspector so scenes can track the organized groups shaping a moment in the manuscript.
- Experience the current Aurora-derived editorial brand pass with a warm manuscript-forward theme, a lighter paper drafting canvas, and a temporary placeholder GlowGlobe logo that can be replaced later.
- Writing mode now uses a cleaner three-pane editorial layout that more closely follows the current screenshot reference.
- The center Writing Studio column now scrolls as its own pane so the draft-adjacent cards below the editor remain reachable without breaking the bounded shell.
- Additional chapter and scene creation now keeps the writer on the newly created scene even across route remounts before local persistence finishes, and the right-side inspector scrolls independently instead of stretching the whole page.
- Scene deletion is now available from the Writing Studio scene list only when a chapter has more than one scene, so every chapter always retains at least one scene.
- Chapter deletion is now available from the Writing Studio structure list only when more than one chapter remains, and chapter/scene deletes require confirmation prompts before removal.

## Getting Started

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

Once the workspace loads, the root route acts as a project landing page. From there you can select an existing project or create a new one, and missing project URLs recover back to that landing state.

## Available Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run typecheck`

## Repository Notes

- Product architecture lives in `ARCHITECTURE.md`
- Neuroplast project-mind artifacts live in `neuroplast/`
- Aurora branding reference lives in `docs/aurora-branding-sheet.md`
- The current implementation scaffold is under `src/`
