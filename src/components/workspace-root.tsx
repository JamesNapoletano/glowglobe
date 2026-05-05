"use client";

import { Box, Card, CardContent, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AppShell } from "@/components/app-shell";
import type { WorkspaceSurface } from "@/components/workspace-surfaces";
import type { SurfaceSelectionKey, SurfaceSelections } from "@/components/workspace-surface-content";
import { normalizeProject } from "@/lib/domain/project-normalizer";
import type { Project } from "@/lib/domain/types";
import {
  removeAct,
  removeBeat,
  addChapterToProject,
  addSceneToChapter,
  createProjectFromInput,
  type CreateProjectInput,
  removeCharacter,
  removeCorkboardCard,
  removeGlossaryEntry,
  removeLocation,
  removeLoreNote,
  removePlanet,
  removePlotThread,
  removePovMarker,
  removeRegion,
  removeResearchNote,
  removeSubplot,
  removeTechnologyEntry,
  removeTimelineEvent,
  sortProjectsByUpdatedAt,
  updateSceneLinks,
  updateSceneDocument,
  updateSceneMetadata,
  upsertAct,
  upsertBeat,
  upsertCharacter,
  upsertCorkboardCard,
  upsertGlossaryEntry,
  upsertLocation,
  upsertLoreNote,
  upsertPlanet,
  upsertPlotThread,
  upsertPovMarker,
  upsertRegion,
  upsertResearchNote,
  upsertSubplot,
  upsertTechnologyEntry,
  upsertTimelineEvent,
} from "@/lib/domain/project-factory";
import { sampleProject } from "@/lib/mock-data/sample-project";
import { IndexedDbProjectRepository } from "@/lib/repositories/indexeddb-project-repository";

const PERSISTENCE_DEBOUNCE_MS = 250;

export function WorkspaceRoot() {
  const repository = useMemo(() => new IndexedDbProjectRepository(), []);
  const persistenceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const persistenceRequestRef = useRef(0);
  const latestPersistenceRequestRef = useRef<{ requestId: number; successMessage: string; fallbackMessage: string } | null>(null);
  const pendingPersistenceRef = useRef<
    Map<
      string,
      {
        project: Project;
      }
    >
  >(new Map());
  const hasMounted = useClientReady();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [activeSceneId, setActiveSceneId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [storageMessage, setStorageMessage] = useState<string>("Preparing local workspace...");
  const [activeSurface, setActiveSurface] = useState<WorkspaceSurface>("writing");
  const [surfaceSelections, setSurfaceSelections] = useState<SurfaceSelections>({});

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        const existingProjects = await repository.list();
        const seededProjects =
          existingProjects.length > 0
            ? sortProjectsByUpdatedAt(existingProjects)
            : await seedInitialProject(repository);

        if (!isMounted) {
          return;
        }

        setProjects(seededProjects);
        setActiveProjectId((current) => current ?? seededProjects[0]?.id ?? null);
        setActiveChapterId((current) => current ?? seededProjects[0]?.books[0]?.chapters[0]?.id ?? null);
        setActiveSceneId((current) => current ?? seededProjects[0]?.books[0]?.chapters[0]?.scenes[0]?.id ?? null);
        setStorageMessage("IndexedDB workspace ready");
      } catch {
        if (!isMounted) {
          return;
        }

        setProjects([sampleProject]);
        setActiveProjectId(sampleProject.id);
        setActiveChapterId(sampleProject.books[0]?.chapters[0]?.id ?? null);
        setActiveSceneId(sampleProject.books[0]?.chapters[0]?.scenes[0]?.id ?? null);
        setStorageMessage("IndexedDB unavailable. Showing temporary in-memory project preview.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadProjects();

    return () => {
      isMounted = false;
    };
  }, [repository]);

  useEffect(() => {
    return () => {
      if (persistenceTimeoutRef.current) {
        clearTimeout(persistenceTimeoutRef.current);
      }
    };
  }, []);

  const activeProject = projects.find((project) => project.id === activeProjectId) ?? projects[0] ?? sampleProject;

  if (!hasMounted || isLoading) {
    return <WorkspaceLoadingShell message={storageMessage} />;
  }

  const handleCreateProject = async (input: CreateProjectInput) => {
    const project = createProjectFromInput(input);

    commitProject(project, "Saving project locally...", "Project saved to IndexedDB", "Project created in temporary memory because IndexedDB was unavailable.");
    setActiveProjectId(project.id);
    setActiveChapterId(project.books[0]?.chapters[0]?.id ?? null);
    setActiveSceneId(project.books[0]?.chapters[0]?.scenes[0]?.id ?? null);
    return project;
  };

  const handleSelectProject = (projectId: string) => {
    const nextProject = projects.find((project) => project.id === projectId);

    setActiveProjectId(projectId);
    setActiveChapterId(nextProject?.books[0]?.chapters[0]?.id ?? null);
    setActiveSceneId(nextProject?.books[0]?.chapters[0]?.scenes[0]?.id ?? null);
    setSurfaceSelections({});
  };

  const handleSelectChapter = (chapterId: string) => {
    setActiveChapterId(chapterId);
    const nextChapter = activeProject.books[0]?.chapters.find((chapter) => chapter.id === chapterId);
    setActiveSceneId(nextChapter?.scenes[0]?.id ?? null);
  };

  const handleSelectScene = (chapterId: string, sceneId: string) => {
    setActiveChapterId(chapterId);
    setActiveSceneId(sceneId);
  };

  const handleCreateChapter = async () => {
    const result = addChapterToProject(activeProject, {
      title: `Chapter ${String((activeProject.books[0]?.chapters.length ?? 0) + 1).padStart(2, "0")}`,
    });

    commitProject(result.project, "Saving chapter locally...", "Chapter saved to IndexedDB", "Chapter created in temporary memory.");
    setActiveChapterId(result.chapterId);
    setActiveSceneId(result.sceneId);
  };

  const handleCreateScene = async (chapterId: string) => {
    const targetChapter = activeProject.books[0]?.chapters.find((chapter) => chapter.id === chapterId);
    const result = addSceneToChapter(activeProject, chapterId, {
      title: `Scene ${String((targetChapter?.scenes.length ?? 0) + 1).padStart(2, "0")}`,
    });

    commitProject(result.project, "Saving scene locally...", "Scene saved to IndexedDB", "Scene created in temporary memory.");
    setActiveChapterId(chapterId);
    setActiveSceneId(result.sceneId);
  };

  const handleUpdateSceneMetadata = async (
    chapterId: string,
    sceneId: string,
    input: { title: string; summary: string },
  ) => {
    const nextProject = updateSceneMetadata(activeProject, chapterId, sceneId, input);
    commitProject(
      nextProject,
      "Saving scene details locally...",
      "Scene details saved to IndexedDB",
      "Scene details saved in temporary memory.",
    );
  };

  const handleUpdateSceneDocument = async (chapterId: string, sceneId: string, document: Project["books"][number]["chapters"][number]["scenes"][number]["editorDocument"]) => {
    const nextProject = updateSceneDocument(activeProject, chapterId, sceneId, document);
    commitProject(
      nextProject,
      "Saving scene body locally...",
      "Scene body saved to IndexedDB",
      "Scene body saved in temporary memory.",
    );
  };

  const handleUpdateSceneLinks = async (
    chapterId: string,
    sceneId: string,
    links: {
      characterIds: string[];
      locationIds: string[];
      technologyEntryIds: string[];
      timelineEventIds: string[];
      plotThreadIds: string[];
      glossaryEntryIds: string[];
    },
  ) => {
    const nextProject = updateSceneLinks(activeProject, chapterId, sceneId, links);
    commitProject(
      nextProject,
      "Saving scene links locally...",
      "Scene links saved to IndexedDB",
      "Scene links saved in temporary memory.",
    );
  };

  const handleSelectSurfaceEntry = (surface: SurfaceSelectionKey, id: string) => {
    setSurfaceSelections((current) => ({ ...current, [surface]: id }));
  };

  const handleCreateSurfaceEntry = async (surface: SurfaceSelectionKey) => {
    const nextProject = createSurfaceEntry(activeProject, surface);
    const selectedId = getLatestSelectionId(nextProject, surface);
    commitProject(nextProject, "Saving entry locally...", "Entry saved to IndexedDB", "Entry saved in temporary memory.");
    if (selectedId) {
      setSurfaceSelections((current) => ({ ...current, [surface]: selectedId }));
    }
  };

  const handleDeleteSurfaceEntry = async (surface: SurfaceSelectionKey, id: string) => {
    const nextProject = deleteSurfaceEntry(activeProject, surface, id);
    commitProject(nextProject, "Removing entry locally...", "Entry removed from IndexedDB", "Entry removed in temporary memory.");
    setSurfaceSelections((current) => ({ ...current, [surface]: null }));
  };

  const handleSaveSurfaceEntry = async (surface: SurfaceSelectionKey, values: Record<string, string | number | undefined>) => {
    const selectedId = surfaceSelections[surface] ?? getLatestSelectionId(activeProject, surface);
    const nextProject = saveSurfaceEntry(activeProject, surface, values, selectedId ?? undefined);
    const persistedId = getLatestSelectionId(nextProject, surface);
    commitProject(nextProject, "Saving entry locally...", "Entry saved to IndexedDB", "Entry saved in temporary memory.");
    if (persistedId) {
      setSurfaceSelections((current) => ({ ...current, [surface]: persistedId }));
    }
  };

  function commitProject(project: Project, savingMessage: string, successMessage: string, fallbackMessage: string) {
    const normalizedProject = normalizeProject(project);

    setProjects((currentProjects) => sortProjectsByUpdatedAt(upsertProject(currentProjects, normalizedProject)));
    scheduleProjectPersistence(normalizedProject, savingMessage, successMessage, fallbackMessage);
  }

  function scheduleProjectPersistence(
    project: Project,
    savingMessage: string,
    successMessage: string,
    fallbackMessage: string,
  ) {
    persistenceRequestRef.current += 1;
    const requestId = persistenceRequestRef.current;
    pendingPersistenceRef.current.set(project.id, { project });
    latestPersistenceRequestRef.current = {
      requestId,
      successMessage,
      fallbackMessage,
    };

    setStorageMessage(savingMessage);

    if (persistenceTimeoutRef.current) {
      clearTimeout(persistenceTimeoutRef.current);
    }

    persistenceTimeoutRef.current = setTimeout(() => {
      const pendingPersistences = [...pendingPersistenceRef.current.values()];
      const latestPersistence = latestPersistenceRequestRef.current;

      if (!pendingPersistences.length || !latestPersistence) {
        return;
      }

      pendingPersistenceRef.current.clear();

      void (async () => {
        try {
          await Promise.all(pendingPersistences.map((pendingPersistence) => repository.save(pendingPersistence.project)));

          if (latestPersistenceRequestRef.current?.requestId === requestId) {
            setStorageMessage(latestPersistence.successMessage);
          }
        } catch {
          if (latestPersistenceRequestRef.current?.requestId === requestId) {
            setStorageMessage(latestPersistence.fallbackMessage);
          }
        }
      })();
    }, PERSISTENCE_DEBOUNCE_MS);
  }

  return (
    <AppShell
      activeProjectId={activeProject.id}
      activeChapterId={activeChapterId}
      activeSceneId={activeSceneId}
      activeSurface={activeSurface}
      isLoading={isLoading}
      onCreateChapter={handleCreateChapter}
      onCreateProject={handleCreateProject}
      onCreateScene={handleCreateScene}
      onSelectSurface={setActiveSurface}
      onSelectSurfaceEntry={handleSelectSurfaceEntry}
      onSelectChapter={handleSelectChapter}
      onSelectProject={handleSelectProject}
      onSelectScene={handleSelectScene}
      onCreateSurfaceEntry={handleCreateSurfaceEntry}
      onDeleteSurfaceEntry={handleDeleteSurfaceEntry}
      onUpdateSceneDocument={handleUpdateSceneDocument}
      onUpdateSceneLinks={handleUpdateSceneLinks}
      onUpdateSceneMetadata={handleUpdateSceneMetadata}
      onSaveSurfaceEntry={handleSaveSurfaceEntry}
      project={activeProject}
      projects={projects}
      surfaceSelections={surfaceSelections}
      storageMessage={storageMessage}
    />
  );
}

function useClientReady() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
}

function WorkspaceLoadingShell({ message }: { message: string }) {
  return (
    <Box component="main" sx={{ minHeight: "100vh", p: { xs: 2, xl: 3 } }}>
      <Stack spacing={2} sx={{ maxWidth: 1780, minHeight: "calc(100vh - 32px)", mx: "auto" }}>
        <Card sx={{ borderRadius: 4, bgcolor: "rgba(255,255,255,0.86)" }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="overline" color="text.secondary">
              GlowGlobe
            </Typography>
            <Typography variant="h2" sx={{ mt: 1 }}>
              Preparing workspace
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1.5, maxWidth: 720, lineHeight: 1.8 }}>
              Loading the local-first writing workspace before interactive project content mounts.
            </Typography>
            <Typography color="success.main" sx={{ mt: 1.5 }} variant="body2">
              {message}
            </Typography>
          </CardContent>
        </Card>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, xl: 3 }}>
            <Stack spacing={2}>
              <LoadingCard lines={3} />
              <LoadingCard lines={5} />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, xl: 6 }}>
            <Stack spacing={2}>
              <LoadingCard lines={3} />
              <Card sx={{ borderRadius: 4 }}>
                <CardContent sx={{ p: 3 }}>
                  <Skeleton height={28} sx={{ width: 180 }} variant="rounded" />
                  <Skeleton height={520} sx={{ mt: 2 }} variant="rounded" />
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, xl: 3 }}>
            <Stack spacing={2}>
              <LoadingCard lines={2} />
              <LoadingCard lines={4} />
              <LoadingCard lines={4} />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

function LoadingCard({ lines }: { lines: number }) {
  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Skeleton height={18} sx={{ width: 96 }} variant="rounded" />
        <Stack spacing={1.5} sx={{ mt: 2 }}>
        {Array.from({ length: lines }).map((_, index) => (
          <LoadingBlock isShort={index === lines - 1} key={`line-${lines}-${index}`} />
        ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function LoadingBlock({ isShort = false }: { isShort?: boolean }) {
  return <Skeleton height={14} sx={{ width: isShort ? "66%" : "100%" }} variant="rounded" />;
}

async function seedInitialProject(repository: IndexedDbProjectRepository): Promise<Project[]> {
  await repository.save(sampleProject);
  return [sampleProject];
}

function createSurfaceEntry(project: Project, surface: SurfaceSelectionKey): Project {
  switch (surface) {
    case "characters":
      return upsertCharacter(project, { name: "New Character", role: "", arc: "" });
    case "world":
      return upsertLocation(project, { name: "New Location", summary: "", regionName: "" });
    case "world-regions":
      return upsertRegion(project, { name: "New Region", summary: "" });
    case "world-planets":
      return upsertPlanet(project, { name: "New Planet", summary: "" });
    case "technology":
      return upsertTechnologyEntry(project, { name: "New Technology", summary: "", ruleNotesText: "" });
    case "timeline":
      return upsertTimelineEvent(project, {
        title: "New Timeline Event",
        summary: "",
        sequence: project.timelineEvents.length + 1,
      });
    case "corkboard":
      return upsertCorkboardCard(project, { title: "New Card", summary: "", linkedSceneId: undefined });
    case "lore":
      return upsertGlossaryEntry(project, { term: "New Term", definition: "" });
    case "lore-notes":
      return upsertLoreNote(project, { title: "New Lore Note", summary: "" });
    case "research":
      return upsertResearchNote(project, { title: "New Research Note", summary: "", source: "" });
    case "structure":
      return upsertPlotThread(project, { name: "New Plot Thread", summary: "" });
    case "structure-acts":
      return upsertAct(project, { name: "New Act", summary: "", order: project.acts.length + 1 });
    case "structure-beats":
      return upsertBeat(project, { title: "New Beat", summary: "", order: project.beats.length + 1, actId: "", sceneId: "" });
    case "structure-subplots":
      return upsertSubplot(project, { name: "New Subplot", summary: "" });
    case "structure-pov":
      return upsertPovMarker(project, { label: "New POV", summary: "", characterId: "", sceneId: "" });
  }
}

function deleteSurfaceEntry(project: Project, surface: SurfaceSelectionKey, id: string): Project {
  switch (surface) {
    case "characters":
      return removeCharacter(project, id);
    case "world":
      return removeLocation(project, id);
    case "world-regions":
      return removeRegion(project, id);
    case "world-planets":
      return removePlanet(project, id);
    case "technology":
      return removeTechnologyEntry(project, id);
    case "timeline":
      return removeTimelineEvent(project, id);
    case "corkboard":
      return removeCorkboardCard(project, id);
    case "lore":
      return removeGlossaryEntry(project, id);
    case "lore-notes":
      return removeLoreNote(project, id);
    case "research":
      return removeResearchNote(project, id);
    case "structure":
      return removePlotThread(project, id);
    case "structure-acts":
      return removeAct(project, id);
    case "structure-beats":
      return removeBeat(project, id);
    case "structure-subplots":
      return removeSubplot(project, id);
    case "structure-pov":
      return removePovMarker(project, id);
  }
}

function saveSurfaceEntry(
  project: Project,
  surface: SurfaceSelectionKey,
  values: Record<string, string | number | undefined>,
  selectedId?: string,
): Project {
  switch (surface) {
    case "characters":
      return upsertCharacter(project, { name: String(values.name ?? ""), role: String(values.role ?? ""), arc: String(values.arc ?? "") }, selectedId);
    case "world":
      return upsertLocation(
        project,
        { name: String(values.name ?? ""), summary: String(values.summary ?? ""), regionName: String(values.regionName ?? "") },
        selectedId,
      );
    case "world-regions":
      return upsertRegion(project, { name: String(values.name ?? ""), summary: String(values.summary ?? "") }, selectedId);
    case "world-planets":
      return upsertPlanet(project, { name: String(values.name ?? ""), summary: String(values.summary ?? "") }, selectedId);
    case "technology":
      return upsertTechnologyEntry(
        project,
        {
          name: String(values.name ?? ""),
          summary: String(values.summary ?? ""),
          ruleNotesText: String(values.ruleNotesText ?? ""),
        },
        selectedId,
      );
    case "timeline":
      return upsertTimelineEvent(
        project,
        {
          title: String(values.title ?? ""),
          summary: String(values.summary ?? ""),
          sequence: Number(values.sequence ?? 1),
        },
        selectedId,
      );
    case "corkboard":
      return upsertCorkboardCard(
        project,
        {
          title: String(values.title ?? ""),
          summary: String(values.summary ?? ""),
          linkedSceneId: String(values.linkedSceneId ?? "") || undefined,
        },
        selectedId,
      );
    case "lore":
      return upsertGlossaryEntry(project, { term: String(values.term ?? ""), definition: String(values.definition ?? "") }, selectedId);
    case "lore-notes":
      return upsertLoreNote(project, { title: String(values.title ?? ""), summary: String(values.summary ?? "") }, selectedId);
    case "research":
      return upsertResearchNote(
        project,
        {
          title: String(values.title ?? ""),
          summary: String(values.summary ?? ""),
          source: String(values.source ?? "") || undefined,
        },
        selectedId,
      );
    case "structure":
      return upsertPlotThread(project, { name: String(values.name ?? ""), summary: String(values.summary ?? "") }, selectedId);
    case "structure-acts":
      return upsertAct(project, { name: String(values.name ?? ""), summary: String(values.summary ?? ""), order: Number(values.order ?? 1) }, selectedId);
    case "structure-beats":
      return upsertBeat(
        project,
        {
          title: String(values.title ?? ""),
          summary: String(values.summary ?? ""),
          order: Number(values.order ?? 1),
          actId: String(values.actId ?? "") || undefined,
          sceneId: String(values.sceneId ?? "") || undefined,
        },
        selectedId,
      );
    case "structure-subplots":
      return upsertSubplot(project, { name: String(values.name ?? ""), summary: String(values.summary ?? "") }, selectedId);
    case "structure-pov":
      return upsertPovMarker(
        project,
        {
          label: String(values.label ?? ""),
          summary: String(values.summary ?? ""),
          characterId: String(values.characterId ?? "") || undefined,
          sceneId: String(values.sceneId ?? "") || undefined,
        },
        selectedId,
      );
  }
}

function getLatestSelectionId(project: Project, surface: SurfaceSelectionKey): string | null {
  switch (surface) {
    case "characters":
      return project.characters.at(-1)?.id ?? null;
    case "world":
      return project.locations.at(-1)?.id ?? null;
    case "world-regions":
      return project.regions.at(-1)?.id ?? null;
    case "world-planets":
      return project.planets.at(-1)?.id ?? null;
    case "technology":
      return project.technologyEntries.at(-1)?.id ?? null;
    case "timeline":
      return project.timelineEvents.at(-1)?.id ?? null;
    case "corkboard":
      return project.corkboardCards.at(-1)?.id ?? null;
    case "lore":
      return project.glossaryEntries.at(-1)?.id ?? null;
    case "lore-notes":
      return project.loreNotes.at(-1)?.id ?? null;
    case "research":
      return project.researchNotes.at(-1)?.id ?? null;
    case "structure":
      return project.plotThreads.at(-1)?.id ?? null;
    case "structure-acts":
      return project.acts.at(-1)?.id ?? null;
    case "structure-beats":
      return project.beats.at(-1)?.id ?? null;
    case "structure-subplots":
      return project.subplots.at(-1)?.id ?? null;
    case "structure-pov":
      return project.povMarkers.at(-1)?.id ?? null;
  }
}

function upsertProject(projects: Project[], project: Project): Project[] {
  const existingProjectIndex = projects.findIndex((entry) => entry.id === project.id);

  if (existingProjectIndex === -1) {
    return [...projects, project];
  }

  return projects.map((entry) => (entry.id === project.id ? project : entry));
}
