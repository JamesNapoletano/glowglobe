import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { ReactNode } from "react";
import { SceneMetadataForm } from "@/components/scene-metadata-form";
import type { SceneLinkPayload } from "@/lib/domain/project-factory";
import type { Character, GlossaryEntry, Location, PlotThread, Project, Scene, Socium, TechnologyEntry, TimelineEvent } from "@/lib/domain/types";
import { brandTokens } from "@/theme/brand-tokens";

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
  const activeSociumIds = activeScene?.sociumIds ?? [];
  const activeLocationIds = activeScene?.locationIds ?? [];
  const activeTechnologyEntryIds = activeScene?.technologyEntryIds ?? [];
  const activeTimelineEventIds = activeScene?.timelineEventIds ?? [];
  const activePlotThreadIds = activeScene?.plotThreadIds ?? [];
  const activeGlossaryEntryIds = activeScene?.glossaryEntryIds ?? [];

  const linkedCharacters = (project.characters ?? []).filter((character) => activeCharacterIds.includes(character.id));
  const linkedSociums = (project.sociums ?? []).filter((socium) => activeSociumIds.includes(socium.id));
  const linkedLocations = (project.locations ?? []).filter((location) => activeLocationIds.includes(location.id));
  const linkedTechnologyEntries = (project.technologyEntries ?? []).filter((entry) => activeTechnologyEntryIds.includes(entry.id));
  const linkedTimelineEvents = (project.timelineEvents ?? []).filter((event) => activeTimelineEventIds.includes(event.id));
  const linkedPlotThreads = (project.plotThreads ?? []).filter((thread) => activePlotThreadIds.includes(thread.id));
  const linkedGlossaryEntries = (project.glossaryEntries ?? []).filter((entry) => activeGlossaryEntryIds.includes(entry.id));
  const totalLinks =
    linkedCharacters.length +
    linkedSociums.length +
    linkedLocations.length +
    linkedTechnologyEntries.length +
    linkedTimelineEvents.length +
    linkedPlotThreads.length +
    linkedGlossaryEntries.length;

  return (
    <Stack spacing={1.75} sx={{ height: "100%", minHeight: 0, overflowY: "auto", overflowX: "hidden", pr: 0.25 }}>
      <Box sx={{ pb: 1.15, borderBottom: "1px solid", borderColor: "divider" }}>
        <Typography variant="overline" color="text.secondary">
          Inspector
        </Typography>
        <Typography variant="h3" sx={{ mt: 0.55, overflowWrap: "anywhere" }}>
          {activeScene ? activeScene.title : "Select a scene"}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.85, lineHeight: 1.7, overflowWrap: "anywhere" }}>
          {activeScene
            ? "Keep the draft in view while linked characters, places, and chronology stay close at hand."
            : "Choose a scene from the manuscript structure to inspect metadata and linked context."}
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 0.85, mt: 1.25 }}>
          <InspectorMetric label="Links" value={String(totalLinks)} />
          <InspectorMetric label="Cast" value={String(linkedCharacters.length)} />
          <InspectorMetric label="Sociums" value={String(linkedSociums.length)} />
        </Box>
      </Box>

      <LinkedSection
        emptyMessage="No characters are linked to this scene yet. Add the relevant cast when this scene needs continuity support."
        eyebrow="Characters"
        items={linkedCharacters.map((character) => ({
          title: character.name,
          detail: [character.role, character.summary || character.arc, character.status].filter(Boolean).join(" · "),
        }))}
        summary={`${linkedCharacters.length} linked`}
        title="Scene cast"
      />

      <LinkedSection
        emptyMessage="No sociums are linked to this scene yet. Add factions, guilds, kingdoms, or other groups when power dynamics matter here."
        eyebrow="Sociums"
        items={linkedSociums.map((socium) => ({ title: socium.name, detail: `${formatSociumType(socium.type)} · ${socium.summary}` }))}
        summary={`${linkedSociums.length} linked`}
        title="Scene powers"
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

      <InspectorSection eyebrow="Action draft" title="Edit project details">
          <SceneMetadataForm
            onSave={(values) =>
              activeChapterId && activeScene ? onUpdateSceneMetadata(activeChapterId, activeScene.id, values) : Promise.resolve()
            }
            scene={activeScene}
          />
      </InspectorSection>
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
  const activeSociumIds = activeScene.sociumIds ?? [];
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
          sociumIds: activeSociumIds,
          locationIds: activeLocationIds,
          technologyEntryIds: activeTechnologyEntryIds,
          timelineEventIds: activeTimelineEventIds,
          plotThreadIds: activePlotThreadIds,
          glossaryEntryIds: activeGlossaryEntryIds,
        }),
    },
    {
      title: "Sociums",
      items: project.sociums,
      selectedIds: activeSociumIds,
      getLabel: (item) => (item as Socium).name,
      onToggle: (nextIds: string[]) =>
        onUpdateSceneLinks(activeChapterId, activeScene.id, {
          characterIds: activeCharacterIds,
          sociumIds: nextIds,
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
          sociumIds: activeSociumIds,
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
          sociumIds: activeSociumIds,
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
          sociumIds: activeSociumIds,
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
          sociumIds: activeSociumIds,
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
          sociumIds: activeSociumIds,
          locationIds: activeLocationIds,
          technologyEntryIds: activeTechnologyEntryIds,
          timelineEventIds: activeTimelineEventIds,
          plotThreadIds: activePlotThreadIds,
          glossaryEntryIds: nextIds,
        }),
    },
  ];

  return (
    <InspectorSection eyebrow="Linked items" title="Connect this scene">
      <Stack spacing={1.4} sx={{ mt: 0.2 }}>
        {sections.map((section) => (
          <Box key={section.title}>
            <Typography sx={{ fontWeight: 700, mb: 0.8 }}>{section.title}</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, minWidth: 0 }}>
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
                      sx={{ overflowWrap: "anywhere", minWidth: 0, maxWidth: "100%", whiteSpace: "normal", textAlign: "left", justifyContent: "flex-start" }}
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
    </InspectorSection>
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
    <InspectorSection eyebrow={eyebrow} summary={summary} title={title}>
      <Stack spacing={0.85}>
        {items.length > 0 ? (
          items.map((item) => (
            <Box key={`${eyebrow}-${item.title}`} sx={{ border: "1px solid", borderColor: "divider", bgcolor: alpha(brandTokens.palette.background.panel, 0.72), p: 1.15 }}>
              <Typography sx={{ fontWeight: 700, overflowWrap: "anywhere" }}>{item.title}</Typography>
              <Typography color="text.secondary" sx={{ mt: 0.45, lineHeight: 1.65, overflowWrap: "anywhere" }} variant="body2">
                {item.detail}
              </Typography>
            </Box>
          ))
        ) : (
          <Box sx={{ border: "1px dashed", borderColor: "divider", bgcolor: alpha(brandTokens.palette.background.panel, 0.72), p: 1.15 }}>
            <Typography color="text.secondary">{emptyMessage}</Typography>
          </Box>
        )}
      </Stack>
    </InspectorSection>
  );
}

function InspectorSection({
  eyebrow,
  title,
  summary,
  children,
}: {
  eyebrow: string;
  title: string;
  summary?: string;
  children: ReactNode;
}) {
  return (
    <Box sx={{ border: "1px solid", borderColor: "divider", bgcolor: alpha(brandTokens.palette.background.paper, 0.96), p: 1.35 }}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row", xl: "column" }, justifyContent: "space-between", gap: 1, alignItems: { xs: "flex-start", sm: "center", xl: "flex-start" }, mb: 1.1 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="overline" color="text.secondary">
              {eyebrow}
            </Typography>
            <Typography variant="h3" sx={{ mt: 0.75, overflowWrap: "anywhere" }}>
              {title}
            </Typography>
          </Box>
          {summary ? <Chip label={summary} variant="outlined" /> : null}
        </Box>
      {children}
    </Box>
  );
}

function InspectorMetric({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ minWidth: 0, border: "1px solid", borderColor: "divider", bgcolor: alpha(brandTokens.palette.background.panelMuted, 0.82), p: 1.05 }}>
        <Typography variant="overline" color="text.secondary" sx={{ overflowWrap: "anywhere" }}>
          {label}
        </Typography>
        <Typography variant="h3" sx={{ mt: 0.45, overflowWrap: "anywhere", fontSize: "1.05rem" }}>
          {value}
        </Typography>
    </Box>
  );
}

function formatSociumType(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
