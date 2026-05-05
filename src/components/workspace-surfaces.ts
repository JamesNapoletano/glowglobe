export const workspaceSurfaceOptions = [
  {
    id: "writing",
    label: "Writing Studio",
    description: "Draft scenes in a focused manuscript workspace.",
  },
  {
    id: "characters",
    label: "Characters",
    description: "Browse protagonists, relationships, and arc notes.",
  },
  {
    id: "world",
    label: "World",
    description: "Inspect locations, planets, and supporting systems.",
  },
  {
    id: "technology",
    label: "Technology",
    description: "Define systems, rules, limitations, and inventions.",
  },
  {
    id: "timeline",
    label: "Timeline",
    description: "Track chronology and scene-adjacent events.",
  },
  {
    id: "corkboard",
    label: "Corkboard",
    description: "Review scene cards and active plot threads.",
  },
  {
    id: "lore",
    label: "Lore",
    description: "Reference glossary, canon notes, and research.",
  },
  {
    id: "structure",
    label: "Structure",
    description: "Shape acts, beats, subplots, and POV movement.",
  },
] as const;

export type WorkspaceSurface = (typeof workspaceSurfaceOptions)[number]["id"];

export function getWorkspaceSurfaceLabel(surface: WorkspaceSurface): string {
  return workspaceSurfaceOptions.find((item) => item.id === surface)?.label ?? "Workspace";
}

export function getWorkspaceSurfaceDescription(surface: WorkspaceSurface): string {
  return workspaceSurfaceOptions.find((item) => item.id === surface)?.description ?? "";
}
