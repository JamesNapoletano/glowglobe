import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { SceneMetadataForm } from "@/components/scene-metadata-form";
import type { SceneLinkPayload } from "@/lib/domain/project-factory";
import type { Character, GlossaryEntry, Location, PlotThread, Project, Scene, TechnologyEntry, TimelineEvent } from "@/lib/domain/types";

type ContextPanelProps = {
  project: Project;
  activeScene?: Scene;
  activeChapterId: string | null;
  onUpdateSceneLinks: (chapterId: string, sceneId: string, links: SceneLinkPayload) => Promise<void>;
  onUpdateSceneMetadata: (chapterId: string, sceneId: string, input: { title: string; summary: string }) => Promise<void>;
};

export function ContextPanel({
  project,
  activeScene,
  activeChapterId,
  onUpdateSceneLinks,
  onUpdateSceneMetadata,
}: ContextPanelProps) {
  const activeCharacterIds = activeScene?.characterIds ?? [];
  const activeLocationIds = activeScene?.locationIds ?? [];
  const activeTechnologyEntryIds = activeScene?.technologyEntryIds ?? [];
  const activeTimelineEventIds = activeScene?.timelineEventIds ?? [];
  const activePlotThreadIds = activeScene?.plotThreadIds ?? [];
  const activeGlossaryEntryIds = activeScene?.glossaryEntryIds ?? [];

  const linkedCharacters = (project.characters ?? []).filter((character) => activeCharacterIds.includes(character.id));
  const linkedLocations = (project.locations ?? []).filter((location) => activeLocationIds.includes(location.id));
  const linkedTechnologyEntries = (project.technologyEntries ?? []).filter((entry) => activeTechnologyEntryIds.includes(entry.id));
  const linkedTimelineEvents = (project.timelineEvents ?? []).filter((event) => activeTimelineEventIds.includes(event.id));
  const linkedPlotThreads = (project.plotThreads ?? []).filter((thread) => activePlotThreadIds.includes(thread.id));
  const linkedGlossaryEntries = (project.glossaryEntries ?? []).filter((entry) => activeGlossaryEntryIds.includes(entry.id));
  const totalLinks =
    linkedCharacters.length +
    linkedLocations.length +
    linkedTechnologyEntries.length +
    linkedTimelineEvents.length +
    linkedPlotThreads.length +
    linkedGlossaryEntries.length;

  return (
    <Stack spacing={1.75} sx={{ height: "100%" }}>
      <Card sx={{ bgcolor: "rgba(255,255,255,0.92)" }}>
        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="overline" color="text.secondary">
            Inspector
          </Typography>
          <Typography variant="h3" sx={{ mt: 0.75, overflowWrap: "anywhere" }}>
            {activeScene ? activeScene.title : "Select a scene"}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1.25, lineHeight: 1.72, overflowWrap: "anywhere" }}>
            {activeScene
              ? "Keep the draft in view while linked characters, places, and chronology stay close at hand."
              : "Choose a scene from the manuscript structure to inspect metadata and linked context."}
          </Typography>

          <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
            <InspectorMetric label="Linked items" value={String(totalLinks)} />
            <InspectorMetric label="Characters" value={String(linkedCharacters.length)} />
            <InspectorMetric label="Timeline" value={String(linkedTimelineEvents.length)} />
          </Stack>
        </CardContent>
      </Card>

      <LinkedSection
        emptyMessage="No characters are linked to this scene yet. Character linking is ready to be surfaced here next."
        eyebrow="Characters"
        items={linkedCharacters.map((character) => ({ title: character.name, detail: `${character.role} · ${character.arc}` }))}
        summary={`${linkedCharacters.length} linked`}
        title="Scene cast"
      />

      <LinkedSection
        emptyMessage="No locations are linked yet. The scene can still draft first and connect to world context after."
        eyebrow="Places"
        items={linkedLocations.map((location) => ({ title: location.name, detail: `${location.regionName} · ${location.summary}` }))}
        summary={`${linkedLocations.length} linked`}
        title="Scene setting"
      />

      <LinkedSection
        emptyMessage="No technology entries are linked yet. Add world systems when they matter to this scene."
        eyebrow="Technology"
        items={linkedTechnologyEntries.map((entry) => ({ title: entry.name, detail: entry.summary }))}
        summary={`${linkedTechnologyEntries.length} linked`}
        title="Scene systems"
      />

      <LinkedSection
        emptyMessage="No timeline events are linked yet. Chronology can be added once the scene beats settle."
        eyebrow="Chronology"
        items={linkedTimelineEvents.map((event) => ({ title: event.title, detail: event.summary }))}
        summary={`${linkedTimelineEvents.length} linked`}
        title="Scene events"
      />

      <LinkedSection
        emptyMessage="No plot threads are linked yet. Link major threads to track structure across the manuscript."
        eyebrow="Structure"
        items={linkedPlotThreads.map((thread) => ({ title: thread.name, detail: thread.summary }))}
        summary={`${linkedPlotThreads.length} linked`}
        title="Scene threads"
      />

      <LinkedSection
        emptyMessage="No glossary entries are linked yet. Add canon terms when they matter in the draft."
        eyebrow="Glossary"
        items={linkedGlossaryEntries.map((entry) => ({ title: entry.term, detail: entry.definition }))}
        summary={`${linkedGlossaryEntries.length} linked`}
        title="Scene canon"
      />

      <LinkManagementSection
        activeChapterId={activeChapterId}
        activeScene={activeScene}
        onUpdateSceneLinks={onUpdateSceneLinks}
        project={project}
      />

      <Card sx={{ bgcolor: "rgba(255,255,255,0.94)" }}>
        <CardContent sx={{ p: 2.5 }}>
          <SceneMetadataForm
            onSave={(values) =>
              activeChapterId && activeScene ? onUpdateSceneMetadata(activeChapterId, activeScene.id, values) : Promise.resolve()
            }
            scene={activeScene}
          />
        </CardContent>
      </Card>
    </Stack>
  );
}

function LinkManagementSection({
  project,
  activeScene,
  activeChapterId,
  onUpdateSceneLinks,
}: {
  project: Project;
  activeScene?: Scene;
  activeChapterId: string | null;
  onUpdateSceneLinks: (chapterId: string, sceneId: string, links: SceneLinkPayload) => Promise<void>;
}) {
  if (!activeScene || !activeChapterId) {
    return null;
  }

  const activeCharacterIds = activeScene.characterIds ?? [];
  const activeLocationIds = activeScene.locationIds ?? [];
  const activeTechnologyEntryIds = activeScene.technologyEntryIds ?? [];
  const activeTimelineEventIds = activeScene.timelineEventIds ?? [];
  const activePlotThreadIds = activeScene.plotThreadIds ?? [];
  const activeGlossaryEntryIds = activeScene.glossaryEntryIds ?? [];

  const sections: Array<{
    title: string;
    items: Array<{ id: string }>;
    selectedIds: string[];
    getLabel: (item: { id: string }) => string;
    onToggle: (nextIds: string[]) => Promise<void>;
  }> = [
    {
      title: "Characters",
      items: project.characters,
      selectedIds: activeCharacterIds,
      getLabel: (item) => (item as Character).name,
      onToggle: (nextIds: string[]) =>
        onUpdateSceneLinks(activeChapterId, activeScene.id, {
          characterIds: nextIds,
          locationIds: activeLocationIds,
          technologyEntryIds: activeTechnologyEntryIds,
          timelineEventIds: activeTimelineEventIds,
          plotThreadIds: activePlotThreadIds,
          glossaryEntryIds: activeGlossaryEntryIds,
        }),
    },
    {
      title: "Locations",
      items: project.locations,
      selectedIds: activeLocationIds,
      getLabel: (item) => (item as Location).name,
      onToggle: (nextIds: string[]) =>
        onUpdateSceneLinks(activeChapterId, activeScene.id, {
          characterIds: activeCharacterIds,
          locationIds: nextIds,
          technologyEntryIds: activeTechnologyEntryIds,
          timelineEventIds: activeTimelineEventIds,
          plotThreadIds: activePlotThreadIds,
          glossaryEntryIds: activeGlossaryEntryIds,
        }),
    },
    {
      title: "Technology",
      items: project.technologyEntries,
      selectedIds: activeTechnologyEntryIds,
      getLabel: (item) => (item as TechnologyEntry).name,
      onToggle: (nextIds: string[]) =>
        onUpdateSceneLinks(activeChapterId, activeScene.id, {
          characterIds: activeCharacterIds,
          locationIds: activeLocationIds,
          technologyEntryIds: nextIds,
          timelineEventIds: activeTimelineEventIds,
          plotThreadIds: activePlotThreadIds,
          glossaryEntryIds: activeGlossaryEntryIds,
        }),
    },
    {
      title: "Timeline",
      items: project.timelineEvents,
      selectedIds: activeTimelineEventIds,
      getLabel: (item) => (item as TimelineEvent).title,
      onToggle: (nextIds: string[]) =>
        onUpdateSceneLinks(activeChapterId, activeScene.id, {
          characterIds: activeCharacterIds,
          locationIds: activeLocationIds,
          technologyEntryIds: activeTechnologyEntryIds,
          timelineEventIds: nextIds,
          plotThreadIds: activePlotThreadIds,
          glossaryEntryIds: activeGlossaryEntryIds,
        }),
    },
    {
      title: "Plot threads",
      items: project.plotThreads,
      selectedIds: activePlotThreadIds,
      getLabel: (item) => (item as PlotThread).name,
      onToggle: (nextIds: string[]) =>
        onUpdateSceneLinks(activeChapterId, activeScene.id, {
          characterIds: activeCharacterIds,
          locationIds: activeLocationIds,
          technologyEntryIds: activeTechnologyEntryIds,
          timelineEventIds: activeTimelineEventIds,
          plotThreadIds: nextIds,
          glossaryEntryIds: activeGlossaryEntryIds,
        }),
    },
    {
      title: "Glossary",
      items: project.glossaryEntries,
      selectedIds: activeGlossaryEntryIds,
      getLabel: (item) => (item as GlossaryEntry).term,
      onToggle: (nextIds: string[]) =>
        onUpdateSceneLinks(activeChapterId, activeScene.id, {
          characterIds: activeCharacterIds,
          locationIds: activeLocationIds,
          technologyEntryIds: activeTechnologyEntryIds,
          timelineEventIds: activeTimelineEventIds,
          plotThreadIds: activePlotThreadIds,
          glossaryEntryIds: nextIds,
        }),
    },
  ];

  return (
      <Card sx={{ bgcolor: "rgba(255,255,255,0.94)" }}>
        <CardContent sx={{ p: 2.5 }}>
        <Typography variant="overline" color="text.secondary">
          Link management
        </Typography>
        <Typography variant="h3" sx={{ mt: 0.75 }}>
          Connect this scene to the rest of the project
        </Typography>

        <Stack spacing={2} sx={{ mt: 2 }}>
          {sections.map((section) => (
            <Box key={section.title}>
              <Typography sx={{ fontWeight: 700, mb: 1 }}>{section.title}</Typography>
               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                 {section.items.length > 0 ? (
                  section.items.map((item) => {
                    const isSelected = section.selectedIds.includes(item.id);
                    return (
                      <Button
                        key={`${section.title}-${item.id}`}
                        onClick={() => {
                          const nextIds = isSelected
                            ? section.selectedIds.filter((id) => id !== item.id)
                            : [...section.selectedIds, item.id];
                          void section.onToggle(nextIds);
                        }}
                        size="small"
                        sx={{ overflowWrap: "anywhere" }}
                        variant={isSelected ? "contained" : "outlined"}
                      >
                        {section.getLabel(item)}
                      </Button>
                    );
                  })
                ) : (
                  <Typography color="text.secondary" variant="body2">
                    No entries available yet.
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function LinkedSection({
  eyebrow,
  title,
  summary,
  items,
  emptyMessage,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  items: Array<{ title: string; detail: string }>;
  emptyMessage: string;
}) {
  return (
    <Card>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row", xl: "column" }, justifyContent: "space-between", gap: 1.25, alignItems: { xs: "flex-start", sm: "center", xl: "flex-start" } }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="overline" color="text.secondary">
              {eyebrow}
            </Typography>
            <Typography variant="h3" sx={{ mt: 0.75, overflowWrap: "anywhere" }}>
              {title}
            </Typography>
          </Box>
          <Chip label={summary} variant="outlined" />
        </Box>

        <Stack spacing={1} sx={{ mt: 2 }}>
          {items.length > 0 ? (
            items.map((item) => (
              <Card key={`${eyebrow}-${item.title}`} sx={{ bgcolor: "rgba(248,251,255,0.86)" }} variant="outlined">
                <CardContent sx={{ p: 1.8 }}>
                  <Typography sx={{ fontWeight: 700, overflowWrap: "anywhere" }}>{item.title}</Typography>
                  <Typography color="text.secondary" sx={{ mt: 0.6, lineHeight: 1.65, overflowWrap: "anywhere" }} variant="body2">
                    {item.detail}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card variant="outlined" sx={{ borderStyle: "dashed", bgcolor: "rgba(248,251,255,0.84)" }}>
              <CardContent>
                <Typography color="text.secondary">{emptyMessage}</Typography>
              </CardContent>
            </Card>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

function InspectorMetric({ label, value }: { label: string; value: string }) {
  return (
    <Card sx={{ flex: 1, minWidth: 0, bgcolor: "rgba(248,251,255,0.88)" }}>
      <CardContent sx={{ p: 1.8 }}>
        <Typography variant="overline" color="text.secondary" sx={{ overflowWrap: "anywhere" }}>
          {label}
        </Typography>
        <Typography variant="h3" sx={{ mt: 1, overflowWrap: "anywhere" }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
