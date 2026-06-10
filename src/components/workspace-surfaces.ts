export const workspaceSurfaceOptions = [
  {
    id: "writing",
    label: "Writing Studio",
    description: "Draft scenes in a focused manuscript workspace.",
  },
  {
    id: "characters",
    label: "Characters",
    description: "Build wiki-style profiles, dossier notes, and typed relationships.",
  },
  {
    id: "sociums",
    label: "Sociums",
    description: "Track factions, clans, guilds, kingdoms, and rival groups.",
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

export const nonWritingWorkspaceSurfaceOptions = workspaceSurfaceOptions.filter((surface) => surface.id !== "writing");

export type NonWritingWorkspaceSurface = Exclude<WorkspaceSurface, "writing">;

export function isWorkspaceSurface(value: string): value is WorkspaceSurface {
  return workspaceSurfaceOptions.some((item) => item.id === value);
}

export function isNonWritingWorkspaceSurface(value: string): value is NonWritingWorkspaceSurface {
  return nonWritingWorkspaceSurfaceOptions.some((item) => item.id === value);
}

export function getWorkspaceSurfaceLabel(surface: WorkspaceSurface): string {
  return workspaceSurfaceOptions.find((item) => item.id === surface)?.label ?? "Workspace";
}

export function getWorkspaceSurfaceDescription(surface: WorkspaceSurface): string {
  return workspaceSurfaceOptions.find((item) => item.id === surface)?.description ?? "";
}
