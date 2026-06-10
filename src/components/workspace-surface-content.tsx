"use client";

import { EntityWorkspace, EntityWorkspaceSection, WorkspaceSurfaceLayout, type EntityFormField, type EntityWorkspaceMetric, type WorkspaceSurfaceSection } from "@/components/entity-workspace";
import { PlanningEntityWorkspace, PlanningEntityWorkspaceSection } from "@/components/planning-entity-workspace";
import type { WorkspaceSurface } from "@/components/workspace-surfaces";
import type { Project } from "@/lib/domain/types";
import type {
  ActInput,
  BeatInput,
  CharacterInput,
  CorkboardCardInput,
  GlossaryEntryInput,
  LocationInput,
  LoreNoteInput,
  PlanetInput,
  PlotThreadInput,
  PovMarkerInput,
  RelationshipInput,
  RegionInput,
  ResearchNoteInput,
  SociumInput,
  SpeciesInput,
  SubplotInput,
  TechnologyEntryInput,
  TimelineEventInput,
} from "@/lib/domain/project-factory";

export type SurfaceSelectionKey =
  | "characters"
  | "characters-relationships"
  | "sociums"
  | "world"
  | "world-regions"
  | "world-planets"
  | "world-species"
  | "technology"
  | "timeline"
  | "corkboard"
  | "lore"
  | "lore-notes"
  | "research"
  | "structure"
  | "structure-acts"
  | "structure-beats"
  | "structure-subplots"
  | "structure-pov";

export type SurfaceSelections = Partial<Record<SurfaceSelectionKey, string | null>>;

type SurfaceHandlers = {
  selections: SurfaceSelections;
  onSelectEntry: (surface: SurfaceSelectionKey, id: string) => void;
  onCreateEntry: (surface: SurfaceSelectionKey) => Promise<void>;
  onDeleteEntry: (surface: SurfaceSelectionKey, id: string) => Promise<void>;
  onSaveEntry: (surface: SurfaceSelectionKey, values: Record<string, string | number | undefined>) => Promise<void>;
};

type WorkspaceSurfaceContentProps = {
  project: Project;
  activeSurface: Exclude<WorkspaceSurface, "writing">;
  handlers: SurfaceHandlers;
};

export function WorkspaceSurfaceContent({ project, activeSurface, handlers }: WorkspaceSurfaceContentProps) {
  const characters = project.characters ?? [];
  const sociums = project.sociums ?? [];
  const relationships = project.relationships ?? [];
  const locations = project.locations ?? [];
  const regions = project.regions ?? [];
  const planets = project.planets ?? [];
  const species = project.species ?? [];
  const technologyEntries = project.technologyEntries ?? [];
  const timelineEvents = project.timelineEvents ?? [];
  const corkboardCards = project.corkboardCards ?? [];
  const glossaryEntries = project.glossaryEntries ?? [];
  const loreNotes = project.loreNotes ?? [];
  const researchNotes = project.researchNotes ?? [];
  const plotThreads = project.plotThreads ?? [];
  const acts = project.acts ?? [];
  const beats = project.beats ?? [];
  const subplots = project.subplots ?? [];
  const povMarkers = project.povMarkers ?? [];

  switch (activeSurface) {
    case "characters":
      return (
        <WorkspaceSurfaceLayout
          description="Build lightweight core character profiles with optional wiki-style dossier fields, then track typed relationships in the same story-bible flow."
          eyebrow="Characters"
          metrics={[
            { label: "Profiles", value: String(characters.length) },
            { label: "Relationships", value: String(relationships.length) },
            { label: "Linked scenes", value: String(countSceneLinks(project, "characterIds")) },
          ]}
          sections={[
            createEntitySection<CharacterInput>({
              createLabel: "+ Character",
              description: "Capture required story-role essentials first, then fill optional dossier fields only when the story needs them.",
              emptyMessage: "No characters yet. Create the first narrative entity for this project.",
              eyebrow: "Characters · Profiles",
              fields: characterFields(sociums, species),
              id: "characters-profiles",
              items: characters.map((character) => ({
                id: character.id,
                title: character.name,
                detail: summarizeCharacterListItem(character, sociums),
              })),
              onCreate: () => void handlers.onCreateEntry("characters"),
              onDelete: (id) => void handlers.onDeleteEntry("characters", id),
              onSave: (values) => handlers.onSaveEntry("characters", values as Record<string, string | number | undefined>),
              onSelect: (id) => handlers.onSelectEntry("characters", id),
              selectedId: handlers.selections.characters ?? characters[0]?.id ?? null,
              selectedValues: getSelectedCharacterValues(project, handlers.selections.characters ?? characters[0]?.id ?? null),
              summary: "Identity, role, continuity, and optional wiki-style dossier notes live together here.",
              title: "Character profiles",
            }),
            createEntitySection<RelationshipInput>({
              createLabel: "+ Relationship",
              description: "Track typed character-to-character links so continuity work can stay queryable instead of drifting into freeform notes.",
              emptyMessage: "No character relationships yet. Add the first typed link between two people in the story.",
              eyebrow: "Characters · Relationships",
              fields: relationshipFields(characters),
              id: "characters-relationships",
              items: relationships.map((relationship) => ({
                id: relationship.id,
                title: formatRelationshipTitle(project, relationship.sourceCharacterId, relationship.targetCharacterId),
                detail: `${getRelationshipTypeLabel(relationship.type)} · ${relationship.notes || "No notes yet"}`,
              })),
              onCreate: () => void handlers.onCreateEntry("characters-relationships"),
              onDelete: (id) => void handlers.onDeleteEntry("characters-relationships", id),
              onSave: (values) => handlers.onSaveEntry("characters-relationships", values as Record<string, string | number | undefined>),
              onSelect: (id) => handlers.onSelectEntry("characters-relationships", id),
              selectedId: handlers.selections["characters-relationships"] ?? relationships[0]?.id ?? null,
              selectedValues: getSelectedRelationshipValues(project, handlers.selections["characters-relationships"] ?? relationships[0]?.id ?? null),
              summary: "Type each link, then keep situational nuance in notes instead of overloading the profile body.",
              title: "Relationship map",
            }),
          ]}
          title="Character workspace"
        />
      );
    case "sociums":
      return (
        <EntityWorkspace<SociumInput>
          createLabel="+ Socium"
          description="Track organized groups with a required type, strategic posture, allies, rivals, and continuity-friendly notes." 
          emptyMessage="No sociums yet. Add the first faction, guild, kingdom, religion, or other organized group."
          eyebrow="Sociums"
          fields={sociumFields}
          metrics={sociumMetrics(sociums)}
          items={sociums.map((socium) => ({
            id: socium.id,
            title: socium.name,
            detail: `${getSociumTypeLabel(socium.type)} · ${socium.leadership || socium.summary || "No leadership notes yet"}`,
          }))}
          onCreate={() => void handlers.onCreateEntry("sociums")}
          onDelete={(id) => void handlers.onDeleteEntry("sociums", id)}
          onSave={(values) => handlers.onSaveEntry("sociums", values as Record<string, string | number | undefined>)}
          onSelect={(id) => handlers.onSelectEntry("sociums", id)}
          selectedId={handlers.selections.sociums ?? sociums[0]?.id ?? null}
          selectedValues={getSelectedSociumValues(project, handlers.selections.sociums ?? sociums[0]?.id ?? null)}
          title="Sociums workspace"
        />
      );
    case "world":
      return (
        <WorkspaceSurfaceLayout
          description="Inspect locations, regions, planets, and species through a stacked worldbuilding workspace."
          eyebrow="World"
          metrics={worldMetrics(locations.length, regions.length, planets.length, species.length)}
          sections={[
            createEntitySection<LocationInput>({
              createLabel: "+ Location",
              description: "Track settings that scenes can reference directly.",
              emptyMessage: "No locations yet. Add the first setting.",
              eyebrow: "World · Locations",
              fields: locationFields,
              id: "world-locations",
              items: locations.map((location) => ({ id: location.id, title: location.name, detail: `${location.regionName} · ${location.summary}` })),
              onCreate: () => void handlers.onCreateEntry("world"),
              onDelete: (id) => void handlers.onDeleteEntry("world", id),
              onSave: (values) => handlers.onSaveEntry("world", values as Record<string, string | number | undefined>),
              onSelect: (id) => handlers.onSelectEntry("world", id),
              selectedId: handlers.selections.world ?? locations[0]?.id ?? null,
              selectedValues: getSelectedLocationValues(project, handlers.selections.world ?? locations[0]?.id ?? null),
              summary: "Browse and edit the concrete places scenes can reference.",
              title: "Locations",
            }),
            createEntitySection<RegionInput>({
              createLabel: "+ Region",
              description: "Capture broader geographies, cultures, or territories.",
              emptyMessage: "No regions yet.",
              eyebrow: "World · Regions",
              fields: regionFields,
              id: "world-regions",
              items: regions.map((region) => ({ id: region.id, title: region.name, detail: region.summary })),
              onCreate: () => void handlers.onCreateEntry("world-regions"),
              onDelete: (id) => void handlers.onDeleteEntry("world-regions", id),
              onSave: (values) => handlers.onSaveEntry("world-regions", values as Record<string, string | number | undefined>),
              onSelect: (id) => handlers.onSelectEntry("world-regions", id),
              selectedId: handlers.selections["world-regions"] ?? regions[0]?.id ?? null,
              selectedValues: getSelectedRegionValues(project, handlers.selections["world-regions"] ?? regions[0]?.id ?? null),
              summary: "Maintain broader regional context for locations and cultures.",
              title: "Regions",
            }),
            createEntitySection<PlanetInput>({
              createLabel: "+ Planet",
              description: "Describe larger world contexts such as planets or major worlds.",
              emptyMessage: "No planets yet.",
              eyebrow: "World · Planets",
              fields: planetFields,
              id: "world-planets",
              items: planets.map((planet) => ({ id: planet.id, title: planet.name, detail: planet.summary })),
              onCreate: () => void handlers.onCreateEntry("world-planets"),
              onDelete: (id) => void handlers.onDeleteEntry("world-planets", id),
              onSave: (values) => handlers.onSaveEntry("world-planets", values as Record<string, string | number | undefined>),
              onSelect: (id) => handlers.onSelectEntry("world-planets", id),
              selectedId: handlers.selections["world-planets"] ?? planets[0]?.id ?? null,
              selectedValues: getSelectedPlanetValues(project, handlers.selections["world-planets"] ?? planets[0]?.id ?? null),
              summary: "Keep higher-level world and planetary context in the same vertical flow.",
              title: "Planets",
            }),
            createEntitySection<SpeciesInput>({
              createLabel: "+ Species",
              description: "Capture shared species or people-group references that multiple characters can reuse.",
              emptyMessage: "No species yet.",
              eyebrow: "World · Species",
              fields: speciesFields,
              id: "world-species",
              items: species.map((entry) => ({ id: entry.id, title: entry.name, detail: entry.summary || entry.traits })),
              onCreate: () => void handlers.onCreateEntry("world-species"),
              onDelete: (id) => void handlers.onDeleteEntry("world-species", id),
              onSave: (values) => handlers.onSaveEntry("world-species", values as Record<string, string | number | undefined>),
              onSelect: (id) => handlers.onSelectEntry("world-species", id),
              selectedId: handlers.selections["world-species"] ?? species[0]?.id ?? null,
              selectedValues: getSelectedSpeciesValues(project, handlers.selections["world-species"] ?? species[0]?.id ?? null),
              summary: "Define reusable species references so character profiles can select them instead of repeating freeform text.",
              title: "Species",
            }),
          ]}
          title="World workspace"
        />
      );
    case "technology":
      return (
        <EntityWorkspace<TechnologyEntryInput>
          createLabel="+ Technology"
          description="Define systems, inventions, rules, and limitations that affect the story world."
          emptyMessage="No technology entries yet. Add the first system or invention."
          eyebrow="Technology"
          fields={technologyFields}
          metrics={[
            { label: "Systems", value: String(technologyEntries.length) },
            { label: "Rule sets", value: String(technologyEntries.filter((entry) => entry.ruleNotes.length > 0).length) },
            { label: "Linked scenes", value: String(countSceneLinks(project, "technologyEntryIds")) },
          ]}
          items={technologyEntries.map((entry) => ({
            id: entry.id,
            title: entry.name,
            detail: entry.summary,
          }))}
          onCreate={() => void handlers.onCreateEntry("technology")}
          onDelete={(id) => void handlers.onDeleteEntry("technology", id)}
          onSave={(values) => handlers.onSaveEntry("technology", values as Record<string, string | number | undefined>)}
          onSelect={(id) => handlers.onSelectEntry("technology", id)}
          selectedId={handlers.selections.technology ?? technologyEntries[0]?.id ?? null}
          selectedValues={getSelectedTechnologyValues(project, handlers.selections.technology ?? technologyEntries[0]?.id ?? null)}
          title="Technology workspace"
        />
      );
    case "timeline":
      return (
        <PlanningEntityWorkspace<TimelineEventInput>
          createLabel="+ Event"
          description="Track chronology in a structured, scene-linkable way."
          emptyMessage="No timeline events yet. Add the first event."
          eyebrow="Timeline"
          fields={timelineFields}
          metrics={[
            { label: "Events", value: String(timelineEvents.length) },
            { label: "Highest sequence", value: String(Math.max(0, ...timelineEvents.map((event) => event.sequence))) },
            { label: "Linked scenes", value: String(countSceneLinks(project, "timelineEventIds")) },
          ]}
          items={[...timelineEvents]
            .sort((left, right) => left.sequence - right.sequence)
            .map((event) => ({ id: event.id, title: `${event.sequence}. ${event.title}`, detail: event.summary }))}
          onCreate={() => void handlers.onCreateEntry("timeline")}
          onDelete={(id) => void handlers.onDeleteEntry("timeline", id)}
          onSave={(values) => handlers.onSaveEntry("timeline", values as Record<string, string | number | undefined>)}
          onSelect={(id) => handlers.onSelectEntry("timeline", id)}
          selectedId={handlers.selections.timeline ?? timelineEvents[0]?.id ?? null}
          selectedValues={getSelectedTimelineValues(project, handlers.selections.timeline ?? timelineEvents[0]?.id ?? null)}
          title="Timeline workspace"
        />
      );
    case "corkboard":
      return (
        <PlanningEntityWorkspace<CorkboardCardInput>
          createLabel="+ Card"
          description="Keep scene cards and planning notes close to the manuscript."
          emptyMessage="No corkboard cards yet. Add the first planning card."
          eyebrow="Corkboard"
          fields={corkboardFields}
          metrics={[
            { label: "Cards", value: String(corkboardCards.length) },
            { label: "Linked cards", value: String(corkboardCards.filter((card) => card.linkedSceneId).length) },
            { label: "Open planning", value: String(corkboardCards.filter((card) => !card.linkedSceneId).length) },
          ]}
          items={corkboardCards.map((card) => ({
            id: card.id,
            title: card.title,
            detail: card.summary,
          }))}
          onCreate={() => void handlers.onCreateEntry("corkboard")}
          onDelete={(id) => void handlers.onDeleteEntry("corkboard", id)}
          onSave={(values) => handlers.onSaveEntry("corkboard", values as Record<string, string | number | undefined>)}
          onSelect={(id) => handlers.onSelectEntry("corkboard", id)}
          selectedId={handlers.selections.corkboard ?? corkboardCards[0]?.id ?? null}
          selectedValues={getSelectedCorkboardValues(project, handlers.selections.corkboard ?? corkboardCards[0]?.id ?? null)}
          title="Corkboard workspace"
        />
      );
    case "lore":
      return (
        <WorkspaceSurfaceLayout
          description="Keep glossary, canon notes, and research in a single scrollable lore workspace."
          eyebrow="Lore"
          metrics={loreMetrics(glossaryEntries.length, loreNotes.length, researchNotes.length)}
          sections={[
            createEntitySection<GlossaryEntryInput>({
              createLabel: "+ Term",
              description: "Keep canon terms consistent and easy to reuse.",
              emptyMessage: "No glossary entries yet. Add the first term.",
              eyebrow: "Lore · Glossary",
              fields: glossaryFields,
              id: "lore-glossary",
              items: glossaryEntries.map((entry) => ({ id: entry.id, title: entry.term, detail: entry.definition })),
              onCreate: () => void handlers.onCreateEntry("lore"),
              onDelete: (id) => void handlers.onDeleteEntry("lore", id),
              onSave: (values) => handlers.onSaveEntry("lore", values as Record<string, string | number | undefined>),
              onSelect: (id) => handlers.onSelectEntry("lore", id),
              selectedId: handlers.selections.lore ?? glossaryEntries[0]?.id ?? null,
              selectedValues: getSelectedGlossaryValues(project, handlers.selections.lore ?? glossaryEntries[0]?.id ?? null),
              summary: "Manage reusable canon terminology and definitions.",
              title: "Glossary entries",
            }),
            createEntitySection<LoreNoteInput>({
              createLabel: "+ Lore note",
              description: "Maintain canon rules, history, and continuity notes.",
              emptyMessage: "No lore notes yet.",
              eyebrow: "Lore · Notes",
              fields: loreNoteFields,
              id: "lore-notes",
              items: loreNotes.map((note) => ({ id: note.id, title: note.title, detail: note.summary })),
              onCreate: () => void handlers.onCreateEntry("lore-notes"),
              onDelete: (id) => void handlers.onDeleteEntry("lore-notes", id),
              onSave: (values) => handlers.onSaveEntry("lore-notes", values as Record<string, string | number | undefined>),
              onSelect: (id) => handlers.onSelectEntry("lore-notes", id),
              selectedId: handlers.selections["lore-notes"] ?? loreNotes[0]?.id ?? null,
              selectedValues: getSelectedLoreNoteValues(project, handlers.selections["lore-notes"] ?? loreNotes[0]?.id ?? null),
              summary: "Capture continuity and canon details that should stay close at hand.",
              title: "Lore notes",
            }),
            createEntitySection<ResearchNoteInput>({
              createLabel: "+ Research note",
              description: "Track supporting references and research context.",
              emptyMessage: "No research notes yet.",
              eyebrow: "Lore · Research",
              fields: researchNoteFields,
              id: "lore-research",
              items: researchNotes.map((note) => ({ id: note.id, title: note.title, detail: note.summary })),
              onCreate: () => void handlers.onCreateEntry("research"),
              onDelete: (id) => void handlers.onDeleteEntry("research", id),
              onSave: (values) => handlers.onSaveEntry("research", values as Record<string, string | number | undefined>),
              onSelect: (id) => handlers.onSelectEntry("research", id),
              selectedId: handlers.selections.research ?? researchNotes[0]?.id ?? null,
              selectedValues: getSelectedResearchNoteValues(project, handlers.selections.research ?? researchNotes[0]?.id ?? null),
              summary: "Keep external references and supporting evidence searchable in the same flow.",
              title: "Research notes",
            }),
          ]}
          title="Lore workspace"
        />
      );
    case "structure":
      return (
        <WorkspaceSurfaceLayout
          description="Shape threads, acts, beats, subplots, and POV markers in a vertical planning flow."
          eyebrow="Structure"
          metrics={structureMetrics(plotThreads.length, acts.length, beats.length, subplots.length, povMarkers.length)}
          sections={[
            createPlanningSection<PlotThreadInput>({
              createLabel: "+ Thread",
              description: "Track major storylines and long-running threads.",
              emptyMessage: "No plot threads yet.",
              eyebrow: "Structure · Threads",
              fields: plotThreadFields,
              id: "structure-threads",
              items: plotThreads.map((thread) => ({ id: thread.id, title: thread.name, detail: thread.summary })),
              onCreate: () => void handlers.onCreateEntry("structure"),
              onDelete: (id) => void handlers.onDeleteEntry("structure", id),
              onSave: (values) => handlers.onSaveEntry("structure", values as Record<string, string | number | undefined>),
              onSelect: (id) => handlers.onSelectEntry("structure", id),
              selectedId: handlers.selections.structure ?? plotThreads[0]?.id ?? null,
              selectedValues: getSelectedPlotThreadValues(project, handlers.selections.structure ?? plotThreads[0]?.id ?? null),
              summary: "Track the primary narrative lines across the project.",
              title: "Plot threads",
            }),
            createPlanningSection<ActInput>({
              createLabel: "+ Act",
              description: "Organize broad narrative phases in a structured way.",
              emptyMessage: "No acts yet.",
              eyebrow: "Structure · Acts",
              fields: actFields,
              id: "structure-acts",
              items: [...acts].sort((left, right) => left.order - right.order).map((act) => ({ id: act.id, title: `${act.order}. ${act.name}`, detail: act.summary })),
              onCreate: () => void handlers.onCreateEntry("structure-acts"),
              onDelete: (id) => void handlers.onDeleteEntry("structure-acts", id),
              onSave: (values) => handlers.onSaveEntry("structure-acts", values as Record<string, string | number | undefined>),
              onSelect: (id) => handlers.onSelectEntry("structure-acts", id),
              selectedId: handlers.selections["structure-acts"] ?? acts[0]?.id ?? null,
              selectedValues: getSelectedActValues(project, handlers.selections["structure-acts"] ?? acts[0]?.id ?? null),
              summary: "Keep the major story phases ordered and editable.",
              title: "Acts",
            }),
            createPlanningSection<BeatInput>({
              createLabel: "+ Beat",
              description: "Capture turning points and structural movements.",
              emptyMessage: "No beats yet.",
              eyebrow: "Structure · Beats",
              fields: beatFields,
              id: "structure-beats",
              items: [...beats].sort((left, right) => left.order - right.order).map((beat) => ({ id: beat.id, title: `${beat.order}. ${beat.title}`, detail: beat.summary })),
              onCreate: () => void handlers.onCreateEntry("structure-beats"),
              onDelete: (id) => void handlers.onDeleteEntry("structure-beats", id),
              onSave: (values) => handlers.onSaveEntry("structure-beats", values as Record<string, string | number | undefined>),
              onSelect: (id) => handlers.onSelectEntry("structure-beats", id),
              selectedId: handlers.selections["structure-beats"] ?? beats[0]?.id ?? null,
              selectedValues: getSelectedBeatValues(project, handlers.selections["structure-beats"] ?? beats[0]?.id ?? null),
              summary: "Maintain the project’s turning points in sequence.",
              title: "Beats",
            }),
            createPlanningSection<SubplotInput>({
              createLabel: "+ Subplot",
              description: "Track secondary arcs and pressure systems.",
              emptyMessage: "No subplots yet.",
              eyebrow: "Structure · Subplots",
              fields: subplotFields,
              id: "structure-subplots",
              items: subplots.map((subplot) => ({ id: subplot.id, title: subplot.name, detail: subplot.summary })),
              onCreate: () => void handlers.onCreateEntry("structure-subplots"),
              onDelete: (id) => void handlers.onDeleteEntry("structure-subplots", id),
              onSave: (values) => handlers.onSaveEntry("structure-subplots", values as Record<string, string | number | undefined>),
              onSelect: (id) => handlers.onSelectEntry("structure-subplots", id),
              selectedId: handlers.selections["structure-subplots"] ?? subplots[0]?.id ?? null,
              selectedValues: getSelectedSubplotValues(project, handlers.selections["structure-subplots"] ?? subplots[0]?.id ?? null),
              summary: "Capture secondary narrative pressure in its own collapsible section.",
              title: "Subplots",
            }),
            createPlanningSection<PovMarkerInput>({
              createLabel: "+ POV",
              description: "Capture viewpoint distribution across scenes.",
              emptyMessage: "No POV markers yet.",
              eyebrow: "Structure · POV",
              fields: povMarkerFields,
              id: "structure-pov",
              items: povMarkers.map((marker) => ({ id: marker.id, title: marker.label, detail: marker.summary })),
              onCreate: () => void handlers.onCreateEntry("structure-pov"),
              onDelete: (id) => void handlers.onDeleteEntry("structure-pov", id),
              onSave: (values) => handlers.onSaveEntry("structure-pov", values as Record<string, string | number | undefined>),
              onSelect: (id) => handlers.onSelectEntry("structure-pov", id),
              selectedId: handlers.selections["structure-pov"] ?? povMarkers[0]?.id ?? null,
              selectedValues: getSelectedPovMarkerValues(project, handlers.selections["structure-pov"] ?? povMarkers[0]?.id ?? null),
              summary: "Track viewpoint distribution without forcing a grid layout.",
              title: "POV markers",
            }),
          ]}
          title="Structure workspace"
        />
      );
  }
}

type SectionConfig<T extends Record<string, string | number | undefined>> = {
  id: string;
  title: string;
  summary: string;
  createLabel: string;
  description: string;
  emptyMessage: string;
  eyebrow: string;
  fields: EntityFormField[];
  items: Array<{ id: string; title: string; detail?: string }>;
  selectedId: string | null;
  selectedValues: T;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  onSave: (values: T) => Promise<void>;
};

function createEntitySection<T extends Record<string, string | number | undefined>>(config: SectionConfig<T>): WorkspaceSurfaceSection {
  const { id, summary, ...sectionProps } = config;
  return {
    id,
    title: sectionProps.title,
    summary,
    content: <EntityWorkspaceSection {...sectionProps} />,
  };
}

function createPlanningSection<T extends Record<string, string | number | undefined>>(config: SectionConfig<T>): WorkspaceSurfaceSection {
  const { id, summary, ...sectionProps } = config;
  return {
    id,
    title: sectionProps.title,
    summary,
    content: <PlanningEntityWorkspaceSection {...sectionProps} />,
  };
}

function worldMetrics(locations: number, regions: number, planets: number, species: number): EntityWorkspaceMetric[] {
  return [
    { label: "Locations", value: String(locations) },
    { label: "Regions", value: String(regions) },
    { label: "Planets", value: String(planets) },
    { label: "Species", value: String(species) },
  ];
}

function sociumMetrics(sociums: Project["sociums"]): EntityWorkspaceMetric[] {
  return [
    { label: "Groups", value: String(sociums.length) },
    { label: "Types used", value: String(new Set(sociums.map((socium) => socium.type)).size) },
    { label: "With allies / rivals", value: String(sociums.filter((socium) => socium.allies || socium.rivals).length) },
  ];
}

function loreMetrics(glossary: number, notes: number, research: number): EntityWorkspaceMetric[] {
  return [
    { label: "Glossary", value: String(glossary) },
    { label: "Lore notes", value: String(notes) },
    { label: "Research", value: String(research) },
  ];
}

function structureMetrics(threads: number, acts: number, beats: number, subplots: number, pov: number): EntityWorkspaceMetric[] {
  return [
    { label: "Threads", value: String(threads) },
    { label: "Acts / Beats", value: `${acts}/${beats}` },
    { label: "Subplots / POV", value: `${subplots}/${pov}` },
  ];
}

function countSceneLinks(
  project: Project,
  key: "characterIds" | "locationIds" | "technologyEntryIds" | "timelineEventIds",
): number {
  return (project.books ?? []).reduce((totalBooks, book) => {
    return (
      totalBooks +
      (book.chapters ?? []).reduce((totalChapters, chapter) => {
        return totalChapters + (chapter.scenes ?? []).filter((scene) => (scene[key] ?? []).length > 0).length;
      }, 0)
    );
  }, 0);
}

const sociumTypeOptions = [
  { label: "Faction", value: "faction" },
  { label: "Clan", value: "clan" },
  { label: "Guild", value: "guild" },
  { label: "Kingdom", value: "kingdom" },
  { label: "Corporation", value: "corporation" },
  { label: "Religion", value: "religion" },
  { label: "Tribe", value: "tribe" },
  { label: "Order", value: "order" },
  { label: "House", value: "house" },
  { label: "Other", value: "other" },
] as const;

const characterStatusOptions = [
  { label: "Alive", value: "alive" },
  { label: "Dead", value: "dead" },
  { label: "Missing", value: "missing" },
  { label: "Unknown", value: "unknown" },
] as const;

const relationshipTypeOptions = [
  { label: "Family", value: "family" },
  { label: "Friend", value: "friend" },
  { label: "Ally", value: "ally" },
  { label: "Rival", value: "rival" },
  { label: "Enemy", value: "enemy" },
  { label: "Mentor", value: "mentor" },
  { label: "Student", value: "student" },
  { label: "Romantic", value: "romantic" },
  { label: "Subordinate", value: "subordinate" },
  { label: "Leader", value: "leader" },
] as const;

function characterFields(sociums: Project["sociums"], species: Project["species"]): EntityFormField[] {
  return [
    { name: "name", label: "Full name", required: true },
    { name: "role", label: "Narrative role", required: true },
    { name: "summary", label: "Short summary", type: "textarea", required: true },
    { name: "arc", label: "Current arc", type: "textarea", required: true },
    { name: "status", label: "Status", type: "select", required: true, options: characterStatusOptions },
    { name: "aliases", label: "Aliases / titles" },
    { name: "pronouns", label: "Pronouns" },
    { name: "age", label: "Age" },
    { name: "birthDate", label: "Birth date" },
    { name: "gender", label: "Gender" },
    {
      name: "speciesId",
      label: "Species / type",
      type: "select",
      options: [{ label: "Unassigned", value: "" }, ...species.map((entry) => ({ label: entry.name, value: entry.id }))],
    },
    { name: "occupation", label: "Occupation" },
    {
      name: "sociumId",
      label: "Faction / socium",
      type: "select",
      options: [{ label: "Unassigned", value: "" }, ...sociums.map((socium) => ({ label: socium.name, value: socium.id }))],
    },
    { name: "residence", label: "Residence" },
    { name: "origin", label: "Origin" },
    { name: "firstAppearance", label: "First appearance" },
    { name: "appearance", label: "Appearance", type: "textarea" },
    { name: "distinguishingFeatures", label: "Distinguishing features", type: "textarea" },
    { name: "skills", label: "Skills / abilities", type: "textarea" },
    { name: "goals", label: "Goals", type: "textarea" },
    { name: "fears", label: "Fears", type: "textarea" },
    { name: "internalConflict", label: "Internal conflict", type: "textarea" },
    { name: "externalConflict", label: "External conflict", type: "textarea" },
    { name: "background", label: "Background / history", type: "textarea" },
    { name: "personality", label: "Personality", type: "textarea" },
    { name: "voice", label: "Voice / speech patterns", type: "textarea" },
    { name: "mannerisms", label: "Mannerisms", type: "textarea" },
    { name: "beliefs", label: "Beliefs / ideology", type: "textarea" },
    { name: "secrets", label: "Secrets", type: "textarea" },
    { name: "unresolvedThreads", label: "Unresolved threads", type: "textarea" },
    { name: "quote", label: "Quote / sample voice", type: "textarea" },
    { name: "notes", label: "Notes", type: "textarea" },
  ];
}

function relationshipFields(characters: Project["characters"]): EntityFormField[] {
  const characterOptions = [{ label: "Select character", value: "" }, ...characters.map((character) => ({ label: character.name, value: character.id }))];

  return [
    { name: "sourceCharacterId", label: "Source character", type: "select", required: true, options: characterOptions },
    { name: "targetCharacterId", label: "Target character", type: "select", required: true, options: characterOptions },
    { name: "type", label: "Relationship type", type: "select", required: true, options: relationshipTypeOptions },
    { name: "notes", label: "Relationship notes", type: "textarea" },
  ];
}

const locationFields: EntityFormField[] = [
  { name: "name", label: "Location name", required: true },
  { name: "regionName", label: "Region" },
  { name: "summary", label: "Summary", type: "textarea" },
];

const sociumFields: EntityFormField[] = [
  { name: "name", label: "Name", required: true },
  { name: "type", label: "Type", type: "select", required: true, options: sociumTypeOptions },
  { name: "summary", label: "Summary", type: "textarea" },
  { name: "leadership", label: "Leadership" },
  { name: "headquarters", label: "Headquarters" },
  { name: "territory", label: "Territory", type: "textarea" },
  { name: "scope", label: "Scope" },
  { name: "goals", label: "Goals", type: "textarea" },
  { name: "beliefs", label: "Beliefs", type: "textarea" },
  { name: "resources", label: "Resources", type: "textarea" },
  { name: "methods", label: "Methods", type: "textarea" },
  { name: "allies", label: "Allies", type: "textarea" },
  { name: "rivals", label: "Rivals", type: "textarea" },
  { name: "publicReputation", label: "Public reputation", type: "textarea" },
  { name: "internalConflicts", label: "Internal conflicts", type: "textarea" },
  { name: "notes", label: "Notes", type: "textarea" },
];

const regionFields: EntityFormField[] = [
  { name: "name", label: "Region name", required: true },
  { name: "summary", label: "Summary", type: "textarea" },
];

const planetFields: EntityFormField[] = [
  { name: "name", label: "Planet name", required: true },
  { name: "summary", label: "Summary", type: "textarea" },
];

const speciesFields: EntityFormField[] = [
  { name: "name", label: "Species name", required: true },
  { name: "summary", label: "Summary", type: "textarea" },
  { name: "traits", label: "Traits", type: "textarea" },
  { name: "lifespan", label: "Lifespan" },
  { name: "cultureNotes", label: "Culture notes", type: "textarea" },
  { name: "originWorld", label: "Origin world / homeland" },
];

const technologyFields: EntityFormField[] = [
  { name: "name", label: "Technology name", required: true },
  { name: "summary", label: "Summary", type: "textarea" },
  { name: "ruleNotesText", label: "Rule notes", type: "textarea", placeholder: "One rule or limitation per line" },
];

const timelineFields: EntityFormField[] = [
  { name: "title", label: "Event title", required: true },
  { name: "sequence", label: "Sequence", type: "number" },
  { name: "summary", label: "Summary", type: "textarea" },
];

const corkboardFields: EntityFormField[] = [
  { name: "title", label: "Card title", required: true },
  { name: "summary", label: "Summary", type: "textarea" },
  { name: "linkedSceneId", label: "Linked scene ID" },
];

const glossaryFields: EntityFormField[] = [
  { name: "term", label: "Term", required: true },
  { name: "definition", label: "Definition", type: "textarea" },
];

const loreNoteFields: EntityFormField[] = [
  { name: "title", label: "Lore title", required: true },
  { name: "summary", label: "Summary", type: "textarea" },
];

const researchNoteFields: EntityFormField[] = [
  { name: "title", label: "Research title", required: true },
  { name: "source", label: "Source" },
  { name: "summary", label: "Summary", type: "textarea" },
];

const plotThreadFields: EntityFormField[] = [
  { name: "name", label: "Thread name", required: true },
  { name: "summary", label: "Summary", type: "textarea" },
];

const actFields: EntityFormField[] = [
  { name: "name", label: "Act name", required: true },
  { name: "order", label: "Order", type: "number" },
  { name: "summary", label: "Summary", type: "textarea" },
];

const beatFields: EntityFormField[] = [
  { name: "title", label: "Beat title", required: true },
  { name: "order", label: "Order", type: "number" },
  { name: "actId", label: "Act ID" },
  { name: "sceneId", label: "Scene ID" },
  { name: "summary", label: "Summary", type: "textarea" },
];

const subplotFields: EntityFormField[] = [
  { name: "name", label: "Subplot name", required: true },
  { name: "summary", label: "Summary", type: "textarea" },
];

const povMarkerFields: EntityFormField[] = [
  { name: "label", label: "POV label", required: true },
  { name: "characterId", label: "Character ID" },
  { name: "sceneId", label: "Scene ID" },
  { name: "summary", label: "Summary", type: "textarea" },
];

function getSelectedCharacterValues(project: Project, selectedId: string | null): CharacterInput {
  const selected = (project.characters ?? []).find((item) => item.id === selectedId);
  return {
    name: selected?.name ?? "",
    role: selected?.role ?? "",
    summary: selected?.summary ?? "",
    arc: selected?.arc ?? "",
    status: selected?.status ?? "alive",
    aliases: selected?.aliases ?? "",
    pronouns: selected?.pronouns ?? "",
    age: selected?.age ?? "",
    birthDate: selected?.birthDate ?? "",
    gender: selected?.gender ?? "",
    speciesId: selected?.speciesId ?? "",
    occupation: selected?.occupation ?? "",
    sociumId: selected?.sociumId ?? "",
    residence: selected?.residence ?? "",
    origin: selected?.origin ?? "",
    firstAppearance: selected?.firstAppearance ?? "",
    appearance: selected?.appearance ?? "",
    distinguishingFeatures: selected?.distinguishingFeatures ?? "",
    skills: selected?.skills ?? "",
    goals: selected?.goals ?? "",
    fears: selected?.fears ?? "",
    internalConflict: selected?.internalConflict ?? "",
    externalConflict: selected?.externalConflict ?? "",
    background: selected?.background ?? "",
    personality: selected?.personality ?? "",
    voice: selected?.voice ?? "",
    mannerisms: selected?.mannerisms ?? "",
    beliefs: selected?.beliefs ?? "",
    secrets: selected?.secrets ?? "",
    unresolvedThreads: selected?.unresolvedThreads ?? "",
    notes: selected?.notes ?? "",
    quote: selected?.quote ?? "",
  };
}

function getSelectedSpeciesValues(project: Project, selectedId: string | null): SpeciesInput {
  const selected = (project.species ?? []).find((item) => item.id === selectedId);
  return {
    name: selected?.name ?? "",
    summary: selected?.summary ?? "",
    traits: selected?.traits ?? "",
    lifespan: selected?.lifespan ?? "",
    cultureNotes: selected?.cultureNotes ?? "",
    originWorld: selected?.originWorld ?? "",
  };
}

function getSelectedRelationshipValues(project: Project, selectedId: string | null): RelationshipInput {
  const selected = (project.relationships ?? []).find((item) => item.id === selectedId);
  return {
    sourceCharacterId: selected?.sourceCharacterId ?? "",
    targetCharacterId: selected?.targetCharacterId ?? "",
    type: selected?.type ?? "ally",
    notes: selected?.notes ?? "",
  };
}

function getSelectedLocationValues(project: Project, selectedId: string | null): LocationInput {
  const selected = (project.locations ?? []).find((item) => item.id === selectedId);
  return { name: selected?.name ?? "", summary: selected?.summary ?? "", regionName: selected?.regionName ?? "" };
}

function getSelectedSociumValues(project: Project, selectedId: string | null): SociumInput {
  const selected = (project.sociums ?? []).find((item) => item.id === selectedId);

  return {
    name: selected?.name ?? "",
    type: selected?.type ?? "faction",
    summary: selected?.summary ?? "",
    leadership: selected?.leadership ?? "",
    headquarters: selected?.headquarters ?? "",
    territory: selected?.territory ?? "",
    scope: selected?.scope ?? "",
    goals: selected?.goals ?? "",
    beliefs: selected?.beliefs ?? "",
    resources: selected?.resources ?? "",
    methods: selected?.methods ?? "",
    allies: selected?.allies ?? "",
    rivals: selected?.rivals ?? "",
    publicReputation: selected?.publicReputation ?? "",
    internalConflicts: selected?.internalConflicts ?? "",
    notes: selected?.notes ?? "",
  };
}

function getSelectedRegionValues(project: Project, selectedId: string | null): RegionInput {
  const selected = (project.regions ?? []).find((item) => item.id === selectedId);
  return { name: selected?.name ?? "", summary: selected?.summary ?? "" };
}

function getSelectedPlanetValues(project: Project, selectedId: string | null): PlanetInput {
  const selected = (project.planets ?? []).find((item) => item.id === selectedId);
  return { name: selected?.name ?? "", summary: selected?.summary ?? "" };
}

function getSelectedTechnologyValues(project: Project, selectedId: string | null): TechnologyEntryInput {
  const selected = (project.technologyEntries ?? []).find((item) => item.id === selectedId);
  return {
    name: selected?.name ?? "",
    summary: selected?.summary ?? "",
    ruleNotesText: (selected?.ruleNotes ?? []).join("\n"),
  };
}

function getSelectedTimelineValues(project: Project, selectedId: string | null): TimelineEventInput {
  const timelineEvents = project.timelineEvents ?? [];
  const selected = timelineEvents.find((item) => item.id === selectedId);
  return { title: selected?.title ?? "", summary: selected?.summary ?? "", sequence: selected?.sequence ?? timelineEvents.length + 1 };
}

function getSelectedCorkboardValues(project: Project, selectedId: string | null): CorkboardCardInput {
  const selected = (project.corkboardCards ?? []).find((item) => item.id === selectedId);
  return { title: selected?.title ?? "", summary: selected?.summary ?? "", linkedSceneId: selected?.linkedSceneId };
}

function getSelectedGlossaryValues(project: Project, selectedId: string | null): GlossaryEntryInput {
  const selected = (project.glossaryEntries ?? []).find((item) => item.id === selectedId);
  return { term: selected?.term ?? "", definition: selected?.definition ?? "" };
}

function getSelectedLoreNoteValues(project: Project, selectedId: string | null): LoreNoteInput {
  const selected = (project.loreNotes ?? []).find((item) => item.id === selectedId);
  return { title: selected?.title ?? "", summary: selected?.summary ?? "" };
}

function getSelectedResearchNoteValues(project: Project, selectedId: string | null): ResearchNoteInput {
  const selected = (project.researchNotes ?? []).find((item) => item.id === selectedId);
  return { title: selected?.title ?? "", summary: selected?.summary ?? "", source: selected?.source ?? "" };
}

function getSelectedPlotThreadValues(project: Project, selectedId: string | null): PlotThreadInput {
  const selected = (project.plotThreads ?? []).find((item) => item.id === selectedId);
  return { name: selected?.name ?? "", summary: selected?.summary ?? "" };
}

function getSelectedActValues(project: Project, selectedId: string | null): ActInput {
  const acts = project.acts ?? [];
  const selected = acts.find((item) => item.id === selectedId);
  return { name: selected?.name ?? "", summary: selected?.summary ?? "", order: selected?.order ?? acts.length + 1 };
}

function getSelectedBeatValues(project: Project, selectedId: string | null): BeatInput {
  const beats = project.beats ?? [];
  const selected = beats.find((item) => item.id === selectedId);
  return {
    title: selected?.title ?? "",
    summary: selected?.summary ?? "",
    order: selected?.order ?? beats.length + 1,
    actId: selected?.actId ?? "",
    sceneId: selected?.sceneId ?? "",
  };
}

function getSelectedSubplotValues(project: Project, selectedId: string | null): SubplotInput {
  const selected = (project.subplots ?? []).find((item) => item.id === selectedId);
  return { name: selected?.name ?? "", summary: selected?.summary ?? "" };
}

function getSelectedPovMarkerValues(project: Project, selectedId: string | null): PovMarkerInput {
  const selected = (project.povMarkers ?? []).find((item) => item.id === selectedId);
  return {
    label: selected?.label ?? "",
    summary: selected?.summary ?? "",
    characterId: selected?.characterId ?? "",
    sceneId: selected?.sceneId ?? "",
  };
}

function getSociumTypeLabel(value: string): string {
  return sociumTypeOptions.find((option) => option.value === value)?.label ?? "Faction";
}

function getRelationshipTypeLabel(value: string): string {
  return relationshipTypeOptions.find((option) => option.value === value)?.label ?? "Ally";
}

function summarizeCharacterListItem(character: Project["characters"][number], sociums: Project["sociums"]): string {
  const sociumName = sociums.find((socium) => socium.id === character.sociumId)?.name;
  return [character.role, getRelationshipStatusLabel(character.status), sociumName, character.summary || character.arc]
    .filter((value) => typeof value === "string" && value.trim().length > 0)
    .join(" · ");
}

function getRelationshipStatusLabel(value: string): string {
  return characterStatusOptions.find((option) => option.value === value)?.label ?? "Alive";
}

function formatRelationshipTitle(project: Project, sourceCharacterId: string, targetCharacterId: string): string {
  const source = project.characters.find((character) => character.id === sourceCharacterId)?.name ?? "Unknown character";
  const target = project.characters.find((character) => character.id === targetCharacterId)?.name ?? "Unknown character";
  return `${source} → ${target}`;
}
