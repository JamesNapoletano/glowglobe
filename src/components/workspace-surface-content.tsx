"use client";

import { Grid, Stack } from "@mui/material";
import { EntityWorkspace, type EntityFormField, type EntityWorkspaceMetric } from "@/components/entity-workspace";
import { PlanningEntityWorkspace } from "@/components/planning-entity-workspace";
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
  RegionInput,
  ResearchNoteInput,
  SubplotInput,
  TechnologyEntryInput,
  TimelineEventInput,
} from "@/lib/domain/project-factory";

export type SurfaceSelectionKey =
  | "characters"
  | "world"
  | "world-regions"
  | "world-planets"
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
  const locations = project.locations ?? [];
  const regions = project.regions ?? [];
  const planets = project.planets ?? [];
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
        <EntityWorkspace<CharacterInput>
          createLabel="+ Character"
          description="Create and maintain character profiles plus relationship context tied back to the manuscript."
          emptyMessage="No characters yet. Create the first narrative entity for this project."
          eyebrow="Characters"
          fields={characterFields}
          metrics={[
            { label: "Profiles", value: String(characters.length) },
            { label: "With roles", value: String(characters.filter((character) => character.role.trim().length > 0).length) },
            { label: "Linked scenes", value: String(countSceneLinks(project, "characterIds")) },
          ]}
          items={characters.map((character) => ({
            id: character.id,
            title: character.name,
            detail: `${character.role} · ${character.arc}`,
          }))}
          onCreate={() => void handlers.onCreateEntry("characters")}
          onDelete={(id) => void handlers.onDeleteEntry("characters", id)}
          onSave={(values) => handlers.onSaveEntry("characters", values as Record<string, string | number | undefined>)}
          onSelect={(id) => handlers.onSelectEntry("characters", id)}
          selectedId={handlers.selections.characters ?? characters[0]?.id ?? null}
          selectedValues={getSelectedCharacterValues(project, handlers.selections.characters ?? characters[0]?.id ?? null)}
          title="Character workspace"
        />
      );
    case "world":
      return (
        <Stack spacing={2.25} sx={{ height: "100%" }}>
          <EntityWorkspace<LocationInput>
          createLabel="+ Location"
          description="Track settings that scenes can reference directly."
          emptyMessage="No locations yet. Add the first setting."
          eyebrow="World · Locations"
          fields={locationFields}
          metrics={worldMetrics(locations.length, regions.length, planets.length)}
          items={locations.map((location) => ({
            id: location.id,
            title: location.name,
              detail: `${location.regionName} · ${location.summary}`,
            }))}
            onCreate={() => void handlers.onCreateEntry("world")}
            onDelete={(id) => void handlers.onDeleteEntry("world", id)}
            onSave={(values) => handlers.onSaveEntry("world", values as Record<string, string | number | undefined>)}
            onSelect={(id) => handlers.onSelectEntry("world", id)}
            selectedId={handlers.selections.world ?? locations[0]?.id ?? null}
            selectedValues={getSelectedLocationValues(project, handlers.selections.world ?? locations[0]?.id ?? null)}
            title="Locations"
          />

          <Grid container spacing={2.25}>
            <Grid size={{ xs: 12 }}>
            <EntityWorkspace<RegionInput>
              createLabel="+ Region"
              description="Capture broader geographies, cultures, or territories."
              emptyMessage="No regions yet."
              eyebrow="World · Regions"
              fields={regionFields}
              metrics={[{ label: "Regions", value: String(regions.length) }]}
              items={regions.map((region) => ({ id: region.id, title: region.name, detail: region.summary }))}
              onCreate={() => void handlers.onCreateEntry("world-regions")}
              onDelete={(id) => void handlers.onDeleteEntry("world-regions", id)}
              onSave={(values) => handlers.onSaveEntry("world-regions", values as Record<string, string | number | undefined>)}
              onSelect={(id) => handlers.onSelectEntry("world-regions", id)}
              selectedId={handlers.selections["world-regions"] ?? regions[0]?.id ?? null}
              selectedValues={getSelectedRegionValues(project, handlers.selections["world-regions"] ?? regions[0]?.id ?? null)}
              title="Regions"
            />
            </Grid>

            <Grid size={{ xs: 12 }}>
            <EntityWorkspace<PlanetInput>
              createLabel="+ Planet"
              description="Describe larger world contexts such as planets or major worlds."
              emptyMessage="No planets yet."
              eyebrow="World · Planets"
              fields={planetFields}
              metrics={[{ label: "Planets", value: String(planets.length) }]}
              items={planets.map((planet) => ({ id: planet.id, title: planet.name, detail: planet.summary }))}
              onCreate={() => void handlers.onCreateEntry("world-planets")}
              onDelete={(id) => void handlers.onDeleteEntry("world-planets", id)}
              onSave={(values) => handlers.onSaveEntry("world-planets", values as Record<string, string | number | undefined>)}
              onSelect={(id) => handlers.onSelectEntry("world-planets", id)}
              selectedId={handlers.selections["world-planets"] ?? planets[0]?.id ?? null}
              selectedValues={getSelectedPlanetValues(project, handlers.selections["world-planets"] ?? planets[0]?.id ?? null)}
              title="Planets"
            />
            </Grid>
          </Grid>
        </Stack>
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
        <Stack spacing={2.25} sx={{ height: "100%" }}>
          <EntityWorkspace<GlossaryEntryInput>
            createLabel="+ Term"
            description="Keep canon terms consistent and easy to reuse."
            emptyMessage="No glossary entries yet. Add the first term."
            eyebrow="Lore · Glossary"
            fields={glossaryFields}
            metrics={loreMetrics(glossaryEntries.length, loreNotes.length, researchNotes.length)}
            items={glossaryEntries.map((entry) => ({ id: entry.id, title: entry.term, detail: entry.definition }))}
            onCreate={() => void handlers.onCreateEntry("lore")}
            onDelete={(id) => void handlers.onDeleteEntry("lore", id)}
            onSave={(values) => handlers.onSaveEntry("lore", values as Record<string, string | number | undefined>)}
            onSelect={(id) => handlers.onSelectEntry("lore", id)}
            selectedId={handlers.selections.lore ?? glossaryEntries[0]?.id ?? null}
            selectedValues={getSelectedGlossaryValues(project, handlers.selections.lore ?? glossaryEntries[0]?.id ?? null)}
            title="Glossary entries"
          />

          <Grid container spacing={2.25}>
            <Grid size={{ xs: 12 }}>
            <EntityWorkspace<LoreNoteInput>
              createLabel="+ Lore note"
              description="Maintain canon rules, history, and continuity notes."
              emptyMessage="No lore notes yet."
              eyebrow="Lore · Notes"
              fields={loreNoteFields}
              metrics={[{ label: "Lore notes", value: String(loreNotes.length) }]}
              items={loreNotes.map((note) => ({ id: note.id, title: note.title, detail: note.summary }))}
              onCreate={() => void handlers.onCreateEntry("lore-notes")}
              onDelete={(id) => void handlers.onDeleteEntry("lore-notes", id)}
              onSave={(values) => handlers.onSaveEntry("lore-notes", values as Record<string, string | number | undefined>)}
              onSelect={(id) => handlers.onSelectEntry("lore-notes", id)}
              selectedId={handlers.selections["lore-notes"] ?? loreNotes[0]?.id ?? null}
              selectedValues={getSelectedLoreNoteValues(project, handlers.selections["lore-notes"] ?? loreNotes[0]?.id ?? null)}
              title="Lore notes"
            />
            </Grid>

            <Grid size={{ xs: 12 }}>
            <EntityWorkspace<ResearchNoteInput>
              createLabel="+ Research note"
              description="Track supporting references and research context."
              emptyMessage="No research notes yet."
              eyebrow="Lore · Research"
              fields={researchNoteFields}
              metrics={[{ label: "Research notes", value: String(researchNotes.length) }]}
              items={researchNotes.map((note) => ({ id: note.id, title: note.title, detail: note.summary }))}
              onCreate={() => void handlers.onCreateEntry("research")}
              onDelete={(id) => void handlers.onDeleteEntry("research", id)}
              onSave={(values) => handlers.onSaveEntry("research", values as Record<string, string | number | undefined>)}
              onSelect={(id) => handlers.onSelectEntry("research", id)}
              selectedId={handlers.selections.research ?? researchNotes[0]?.id ?? null}
              selectedValues={getSelectedResearchNoteValues(project, handlers.selections.research ?? researchNotes[0]?.id ?? null)}
              title="Research notes"
            />
            </Grid>
          </Grid>
        </Stack>
      );
    case "structure":
      return (
        <Stack spacing={2.25} sx={{ height: "100%" }}>
          <Grid container spacing={2.25}>
            <Grid size={{ xs: 12 }}>
            <PlanningEntityWorkspace<PlotThreadInput>
              createLabel="+ Thread"
              description="Track major storylines and long-running threads."
              emptyMessage="No plot threads yet."
              eyebrow="Structure · Threads"
              fields={plotThreadFields}
              metrics={structureMetrics(plotThreads.length, acts.length, beats.length, subplots.length, povMarkers.length)}
              items={plotThreads.map((thread) => ({ id: thread.id, title: thread.name, detail: thread.summary }))}
              onCreate={() => void handlers.onCreateEntry("structure")}
              onDelete={(id) => void handlers.onDeleteEntry("structure", id)}
              onSave={(values) => handlers.onSaveEntry("structure", values as Record<string, string | number | undefined>)}
              onSelect={(id) => handlers.onSelectEntry("structure", id)}
              selectedId={handlers.selections.structure ?? plotThreads[0]?.id ?? null}
              selectedValues={getSelectedPlotThreadValues(project, handlers.selections.structure ?? plotThreads[0]?.id ?? null)}
              title="Plot threads"
            />
            </Grid>

            <Grid size={{ xs: 12 }}>
            <PlanningEntityWorkspace<ActInput>
              createLabel="+ Act"
              description="Organize broad narrative phases in a structured way."
              emptyMessage="No acts yet."
              eyebrow="Structure · Acts"
              fields={actFields}
              metrics={[{ label: "Acts", value: String(acts.length) }]}
              items={[...acts]
                .sort((left, right) => left.order - right.order)
                .map((act) => ({ id: act.id, title: `${act.order}. ${act.name}`, detail: act.summary }))}
              onCreate={() => void handlers.onCreateEntry("structure-acts")}
              onDelete={(id) => void handlers.onDeleteEntry("structure-acts", id)}
              onSave={(values) => handlers.onSaveEntry("structure-acts", values as Record<string, string | number | undefined>)}
              onSelect={(id) => handlers.onSelectEntry("structure-acts", id)}
              selectedId={handlers.selections["structure-acts"] ?? acts[0]?.id ?? null}
              selectedValues={getSelectedActValues(project, handlers.selections["structure-acts"] ?? acts[0]?.id ?? null)}
              title="Acts"
            />
            </Grid>
          </Grid>

          <Grid container spacing={2.25}>
            <Grid size={{ xs: 12 }}>
            <PlanningEntityWorkspace<BeatInput>
              createLabel="+ Beat"
              description="Capture turning points and structural movements."
              emptyMessage="No beats yet."
              eyebrow="Structure · Beats"
              fields={beatFields}
              metrics={[{ label: "Beats", value: String(beats.length) }]}
              items={[...beats]
                .sort((left, right) => left.order - right.order)
                .map((beat) => ({ id: beat.id, title: `${beat.order}. ${beat.title}`, detail: beat.summary }))}
              onCreate={() => void handlers.onCreateEntry("structure-beats")}
              onDelete={(id) => void handlers.onDeleteEntry("structure-beats", id)}
              onSave={(values) => handlers.onSaveEntry("structure-beats", values as Record<string, string | number | undefined>)}
              onSelect={(id) => handlers.onSelectEntry("structure-beats", id)}
              selectedId={handlers.selections["structure-beats"] ?? beats[0]?.id ?? null}
              selectedValues={getSelectedBeatValues(project, handlers.selections["structure-beats"] ?? beats[0]?.id ?? null)}
              title="Beats"
            />
            </Grid>

            <Grid size={{ xs: 12 }}>
            <PlanningEntityWorkspace<SubplotInput>
              createLabel="+ Subplot"
              description="Track secondary arcs and pressure systems."
              emptyMessage="No subplots yet."
              eyebrow="Structure · Subplots"
              fields={subplotFields}
              metrics={[{ label: "Subplots", value: String(subplots.length) }]}
              items={subplots.map((subplot) => ({ id: subplot.id, title: subplot.name, detail: subplot.summary }))}
              onCreate={() => void handlers.onCreateEntry("structure-subplots")}
              onDelete={(id) => void handlers.onDeleteEntry("structure-subplots", id)}
              onSave={(values) => handlers.onSaveEntry("structure-subplots", values as Record<string, string | number | undefined>)}
              onSelect={(id) => handlers.onSelectEntry("structure-subplots", id)}
              selectedId={handlers.selections["structure-subplots"] ?? subplots[0]?.id ?? null}
              selectedValues={getSelectedSubplotValues(project, handlers.selections["structure-subplots"] ?? subplots[0]?.id ?? null)}
              title="Subplots"
            />
            </Grid>

            <Grid size={{ xs: 12 }}>
            <PlanningEntityWorkspace<PovMarkerInput>
              createLabel="+ POV"
              description="Capture viewpoint distribution across scenes."
              emptyMessage="No POV markers yet."
              eyebrow="Structure · POV"
              fields={povMarkerFields}
              metrics={[{ label: "POV markers", value: String(povMarkers.length) }]}
              items={povMarkers.map((marker) => ({ id: marker.id, title: marker.label, detail: marker.summary }))}
              onCreate={() => void handlers.onCreateEntry("structure-pov")}
              onDelete={(id) => void handlers.onDeleteEntry("structure-pov", id)}
              onSave={(values) => handlers.onSaveEntry("structure-pov", values as Record<string, string | number | undefined>)}
              onSelect={(id) => handlers.onSelectEntry("structure-pov", id)}
              selectedId={handlers.selections["structure-pov"] ?? povMarkers[0]?.id ?? null}
              selectedValues={getSelectedPovMarkerValues(project, handlers.selections["structure-pov"] ?? povMarkers[0]?.id ?? null)}
              title="POV markers"
            />
            </Grid>
          </Grid>
        </Stack>
      );
  }
}

function worldMetrics(locations: number, regions: number, planets: number): EntityWorkspaceMetric[] {
  return [
    { label: "Locations", value: String(locations) },
    { label: "Regions", value: String(regions) },
    { label: "Planets", value: String(planets) },
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

const characterFields: EntityFormField[] = [
  { name: "name", label: "Name", required: true },
  { name: "role", label: "Role" },
  { name: "arc", label: "Arc", type: "textarea" },
];

const locationFields: EntityFormField[] = [
  { name: "name", label: "Location name", required: true },
  { name: "regionName", label: "Region" },
  { name: "summary", label: "Summary", type: "textarea" },
];

const regionFields: EntityFormField[] = [
  { name: "name", label: "Region name", required: true },
  { name: "summary", label: "Summary", type: "textarea" },
];

const planetFields: EntityFormField[] = [
  { name: "name", label: "Planet name", required: true },
  { name: "summary", label: "Summary", type: "textarea" },
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
  return { name: selected?.name ?? "", role: selected?.role ?? "", arc: selected?.arc ?? "" };
}

function getSelectedLocationValues(project: Project, selectedId: string | null): LocationInput {
  const selected = (project.locations ?? []).find((item) => item.id === selectedId);
  return { name: selected?.name ?? "", summary: selected?.summary ?? "", regionName: selected?.regionName ?? "" };
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
