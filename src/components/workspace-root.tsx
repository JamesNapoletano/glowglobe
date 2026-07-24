"use client";

import { Box, Card, CardContent, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore, type Dispatch, type SetStateAction } from "react";
import { AppShell } from "@/components/app-shell";
import { GlowGlobeLogo } from "@/components/glowglobe-logo";
import type { WorkspaceSurface } from "@/components/workspace-surfaces";
import type { SurfaceSelectionKey, SurfaceSelections } from "@/components/workspace-surface-content";
import { normalizeProject } from "@/lib/domain/project-normalizer";
import type { Project } from "@/lib/domain/types";
import type { SubscriptionTier } from "@/lib/domain/user";
import {
  getProjectNavigationPath,
  getProjectWritingScenePath,
  resolveWorkspaceRoute,
  type WorkspaceRouteState,
} from "@/lib/workspace-route";
import {
  removeAct,
  removeBeat,
  addChapterToProject,
  addSceneToChapter,
  type CharacterInput,
  createProjectFromInput,
  type CreateProjectInput,
  moveProjectToLifecycleState,
  removeChapterFromProject,
  removeSceneFromChapter,
  removeCharacter,
  removeCorkboardCard,
  removeGlossaryEntry,
  removeLocation,
  removeLoreNote,
  removePlanet,
  removePlotThread,
  removePovMarker,
  removeRegion,
  removeRelationship,
  removeResearchNote,
  removeSocium,
  removeSpecies,
  removeSubplot,
  removeTechnologyEntry,
  removeTimelineEvent,
  sortProjectsByUpdatedAt,
  updateSceneLinks,
  updateSceneDocument,
  updateProjectDetails,
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
  type RelationshipInput,
  upsertRelationship,
  upsertRegion,
  upsertResearchNote,
  upsertSocium,
  upsertSpecies,
  upsertSubplot,
  upsertTechnologyEntry,
  upsertTimelineEvent,
} from "@/lib/domain/project-factory";
import { downloadProjectAsJsonFile } from "@/lib/domain/project-serializer";
import { sampleProject } from "@/lib/mock-data/sample-project";
import { IndexedDbProjectRepository } from "@/lib/repositories/indexeddb-project-repository";

const PERSISTENCE_DEBOUNCE_MS = 250;

type PendingProjectPersistence = {
  project: Project;
};

type LatestPersistenceRequest = {
  requestId: number;
  successMessage: string;
  fallbackMessage: string;
};

let workspaceProjectsCache: Project[] = [];
let workspaceStorageMessageCache = "Preparing local workspace...";
let workspacePendingCanonicalPath: string | null = null;
let workspacePersistenceTimeout: ReturnType<typeof setTimeout> | null = null;
let workspacePersistenceRequestId = 0;
let workspaceLatestPersistenceRequest: LatestPersistenceRequest | null = null;
const workspacePendingPersistences = new Map<string, PendingProjectPersistence>();

type WorkspaceRootProps = {
  routeState: WorkspaceRouteState;
};

export function WorkspaceRoot({ routeState }: WorkspaceRootProps) {
  const router = useRouter();
  const pathname = usePathname();
  const repository = useMemo(() => new IndexedDbProjectRepository(), []);
  const hasMounted = useClientReady();
  const [projects, setProjects] = useState<Project[]>(() => workspaceProjectsCache);
  const [isLoading, setIsLoading] = useState(() => workspaceProjectsCache.length === 0);
  const [storageMessage, setStorageMessage] = useState<string>(() => workspaceStorageMessageCache);
  const [surfaceSelections, setSurfaceSelections] = useState<SurfaceSelections>({});
  const [userTier, setUserTier] = useState<SubscriptionTier>(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("glowglobe.userTier");
      if (stored === "free" || stored === "hobby" || stored === "pro") {
        return stored;
      }
    }
    return "free";
  });

  const handleSelectTierUpgrade = (newTier: SubscriptionTier) => {
    setUserTier(newTier);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("glowglobe.userTier", newTier);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        const existingProjects = await repository.list();
        const seededProjects =
          existingProjects.length > 0
            ? sortProjectsByUpdatedAt(existingProjects)
            : await seedInitialProject(repository);
        const hydratedProjects = applyPendingProjectPersistences(seededProjects);

        if (!isMounted) {
          return;
        }

        updateProjectCache(setProjects, hydratedProjects);
        updateStorageMessage(setStorageMessage, "IndexedDB workspace ready");
      } catch {
        if (!isMounted) {
          return;
        }

        const fallbackProjects = workspaceProjectsCache.length > 0 ? workspaceProjectsCache : [sampleProject];

        updateProjectCache(setProjects, fallbackProjects);
        updateStorageMessage(
          setStorageMessage,
          workspaceProjectsCache.length > 0
            ? "IndexedDB unavailable. Restoring temporary in-memory workspace."
            : "IndexedDB unavailable. Showing temporary in-memory project preview.",
        );
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

  const resolvedRoute = useMemo(
    () =>
      resolveWorkspaceRoute(projects, {
        projectId: routeState.projectId,
        surface: routeState.surface,
        chapterId: routeState.chapterId,
        sceneId: routeState.sceneId,
      }),
    [projects, routeState.chapterId, routeState.projectId, routeState.sceneId, routeState.surface],
  );

  const activeProject = resolvedRoute.project;
  const activeProjectId = activeProject?.id ?? "";
  const activeChapterId = resolvedRoute.chapterId;
  const activeSceneId = resolvedRoute.sceneId;
  const activeSurface = resolvedRoute.surface;

  useEffect(() => {
    if (workspacePendingCanonicalPath && resolvedRoute.canonicalPath === workspacePendingCanonicalPath) {
      workspacePendingCanonicalPath = null;
    }
  }, [resolvedRoute.canonicalPath]);

  useEffect(() => {
    if (!hasMounted || isLoading || !resolvedRoute.canonicalPath) {
      return;
    }

    if (workspacePendingCanonicalPath && pathname === workspacePendingCanonicalPath) {
      return;
    }

    if (pathname !== resolvedRoute.canonicalPath) {
      router.replace(resolvedRoute.canonicalPath);
    }
  }, [hasMounted, isLoading, pathname, resolvedRoute.canonicalPath, router]);

  const resolvedSurfaceSelections = useMemo(
    () => sanitizeSurfaceSelections(activeProject, surfaceSelections),
    [activeProject, surfaceSelections],
  );

  if (!hasMounted || (isLoading && projects.length === 0)) {
    return <WorkspaceLoadingShell message={storageMessage} />;
  }

  const handleCreateProject = async (input: CreateProjectInput) => {
    const project = createProjectFromInput(input);
    const normalizedProject = normalizeProject(project);
    const path = getProjectNavigationPath(normalizedProject, "writing");

    updateProjectCache(setProjects, upsertProject(workspaceProjectsCache, normalizedProject));
    updateStorageMessage(setStorageMessage, "Saving project locally...");

    try {
      await repository.save(normalizedProject);
      updateStorageMessage(setStorageMessage, "Project saved to IndexedDB");
    } catch {
      workspacePendingPersistences.set(normalizedProject.id, { project: normalizedProject });
      updateStorageMessage(setStorageMessage, "Project created in temporary memory because IndexedDB was unavailable.");
    }

    navigateToPendingCanonicalPath(path);
    return normalizedProject;
  };

  const handleSelectProject = (projectId: string) => {
    const nextProject = projects.find((project) => project.id === projectId && project.lifecycleState === "active");

    if (!nextProject) {
      return;
    }

    router.push(getProjectNavigationPath(nextProject, activeSurface));
  };

  const handleSelectSurface = (surface: WorkspaceSurface) => {
    if (!activeProject) {
      return;
    }

    router.push(
      getProjectNavigationPath(activeProject, surface, {
        chapterId: activeChapterId,
        sceneId: activeSceneId,
      }),
    );
  };

  const handleSelectChapter = (chapterId: string) => {
    if (!activeProject) {
      return;
    }

    const nextChapter = activeProject.books[0]?.chapters.find((chapter) => chapter.id === chapterId);
    const nextScene = nextChapter?.scenes[0];

    if (!nextChapter || !nextScene) {
      return;
    }

    router.push(getProjectWritingScenePath(activeProject.id, nextChapter.id, nextScene.id));
  };

  const handleSelectScene = (chapterId: string, sceneId: string) => {
    if (!activeProject) {
      return;
    }

    router.push(getProjectWritingScenePath(activeProject.id, chapterId, sceneId));
  };

  const handleCreateChapter = async () => {
    if (!activeProject) {
      return;
    }

    const result = addChapterToProject(activeProject, {
      title: `Chapter ${String((activeProject.books[0]?.chapters.length ?? 0) + 1).padStart(2, "0")}`,
    });

    commitProject(result.project, "Saving chapter locally...", "Chapter saved to IndexedDB", "Chapter created in temporary memory.");

    if (result.sceneId) {
      navigateToPendingCanonicalPath(getProjectWritingScenePath(result.project.id, result.chapterId, result.sceneId));
    }
  };

  const handleCreateScene = async (chapterId: string) => {
    if (!activeProject) {
      return;
    }

    const targetChapter = activeProject.books[0]?.chapters.find((chapter) => chapter.id === chapterId);
    const result = addSceneToChapter(activeProject, chapterId, {
      title: `Scene ${String((targetChapter?.scenes.length ?? 0) + 1).padStart(2, "0")}`,
    });

    commitProject(result.project, "Saving scene locally...", "Scene saved to IndexedDB", "Scene created in temporary memory.");
    navigateToPendingCanonicalPath(getProjectWritingScenePath(result.project.id, chapterId, result.sceneId));
  };

  const handleDeleteChapter = async (chapterId: string) => {
    if (!activeProject) {
      return;
    }

    const targetChapter = activeProject.books[0]?.chapters.find((chapter) => chapter.id === chapterId);

    if (!targetChapter || !window.confirm(`Delete chapter "${targetChapter.title}"?`)) {
      return;
    }

    const result = removeChapterFromProject(activeProject, chapterId);

    if (!result.deleted) {
      return;
    }

    commitProject(result.project, "Removing chapter locally...", "Chapter removed from IndexedDB", "Chapter removed in temporary memory.");

    if (activeChapterId === chapterId && result.fallbackChapterId && result.fallbackSceneId) {
      navigateToPendingCanonicalPath(getProjectWritingScenePath(result.project.id, result.fallbackChapterId, result.fallbackSceneId));
    }
  };

  const handleDeleteScene = async (chapterId: string, sceneId: string) => {
    if (!activeProject) {
      return;
    }

    const targetScene = activeProject.books[0]?.chapters
      .find((chapter) => chapter.id === chapterId)
      ?.scenes.find((scene) => scene.id === sceneId);

    if (!targetScene || !window.confirm(`Delete scene "${targetScene.title}"?`)) {
      return;
    }

    const result = removeSceneFromChapter(activeProject, chapterId, sceneId);

    if (!result.deleted) {
      return;
    }

    commitProject(result.project, "Removing scene locally...", "Scene removed from IndexedDB", "Scene removed in temporary memory.");

    if (activeSceneId === sceneId && result.fallbackSceneId) {
      navigateToPendingCanonicalPath(getProjectWritingScenePath(result.project.id, chapterId, result.fallbackSceneId));
    }
  };

  const handleUpdateSceneMetadata = async (
    chapterId: string,
    sceneId: string,
    input: { title: string; summary: string },
  ) => {
    if (!activeProject) {
      return;
    }

    const nextProject = updateSceneMetadata(activeProject, chapterId, sceneId, input);
    commitProject(
      nextProject,
      "Saving scene details locally...",
      "Scene details saved to IndexedDB",
      "Scene details saved in temporary memory.",
    );
  };

  const handleUpdateSceneDocument = async (chapterId: string, sceneId: string, document: Project["books"][number]["chapters"][number]["scenes"][number]["editorDocument"]) => {
    if (!activeProject) {
      return;
    }

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
        sociumIds: string[];
        locationIds: string[];
        technologyEntryIds: string[];
        timelineEventIds: string[];
      plotThreadIds: string[];
      glossaryEntryIds: string[];
    },
  ) => {
    if (!activeProject) {
      return;
    }

    const nextProject = updateSceneLinks(activeProject, chapterId, sceneId, links);
    commitProject(
      nextProject,
      "Saving scene links locally...",
      "Scene links saved to IndexedDB",
      "Scene links saved in temporary memory.",
    );
  };

  const handleUpdateProjectDetails = async (
    projectId: string,
    input: {
      title: string;
      genre: string;
      description: string;
      status: Project["status"];
    },
  ) => {
    const targetProject = projects.find((project) => project.id === projectId);

    if (!targetProject) {
      return;
    }

    const nextProject = updateProjectDetails(targetProject, input);
    commitProject(
      nextProject,
      "Saving project details locally...",
      "Project details saved to IndexedDB",
      "Project details saved in temporary memory.",
    );
  };

  const handleSelectSurfaceEntry = (surface: SurfaceSelectionKey, id: string) => {
    setSurfaceSelections((current) => ({ ...current, [surface]: id }));
  };

  const handleCreateSurfaceEntry = async (surface: SurfaceSelectionKey) => {
    if (!activeProject) {
      return;
    }

    const nextProject = createSurfaceEntry(activeProject, surface);
    const selectedId = getLatestSelectionId(nextProject, surface);
    commitProject(nextProject, "Saving entry locally...", "Entry saved to IndexedDB", "Entry saved in temporary memory.");
    if (selectedId) {
      setSurfaceSelections((current) => ({ ...current, [surface]: selectedId }));
    }
  };

  const handleDeleteSurfaceEntry = async (surface: SurfaceSelectionKey, id: string) => {
    if (!activeProject) {
      return;
    }

    const nextProject = deleteSurfaceEntry(activeProject, surface, id);
    commitProject(nextProject, "Removing entry locally...", "Entry removed from IndexedDB", "Entry removed in temporary memory.");
    setSurfaceSelections((current) => ({ ...current, [surface]: null }));
  };

  const handleSaveSurfaceEntry = async (surface: SurfaceSelectionKey, values: Record<string, string | number | undefined>) => {
    if (!activeProject) {
      return;
    }

    const selectedId = resolvedSurfaceSelections[surface] ?? getLatestSelectionId(activeProject, surface);
    const nextProject = saveSurfaceEntry(activeProject, surface, values, selectedId ?? undefined);
    const persistedId = getLatestSelectionId(nextProject, surface);
    commitProject(nextProject, "Saving entry locally...", "Entry saved to IndexedDB", "Entry saved in temporary memory.");
    if (persistedId) {
      setSurfaceSelections((current) => ({ ...current, [surface]: persistedId }));
    }
  };

  function commitProject(project: Project, savingMessage: string, successMessage: string, fallbackMessage: string) {
    const normalizedProject = normalizeProject(project);

    updateProjectCache(setProjects, upsertProject(workspaceProjectsCache, normalizedProject));
    scheduleProjectPersistence(normalizedProject, savingMessage, successMessage, fallbackMessage);
  }

  function navigateToPendingCanonicalPath(path: string) {
    workspacePendingCanonicalPath = path;
    router.push(path);
  }

  const handleArchiveProject = async (projectId: string) => {
    const targetProject = projects.find((project) => project.id === projectId);

    if (!targetProject) {
      return;
    }

    const nextProject = moveProjectToLifecycleState(targetProject, "archived");
    commitProject(nextProject, "Archiving project locally...", "Project archived", "Project archive saved in temporary memory.");

    if (activeProjectId === projectId) {
      const nextProjects = sortProjectsByUpdatedAt(upsertProject(projects, nextProject));
      const fallbackProject = nextProjects.find((project) => project.lifecycleState === "active") ?? null;
      router.push(fallbackProject ? getProjectNavigationPath(fallbackProject, "writing") : "/");
    }
  };

  const handleMoveProjectToTrash = async (projectId: string) => {
    const targetProject = projects.find((project) => project.id === projectId);

    if (!targetProject) {
      return;
    }

    const nextProject = moveProjectToLifecycleState(targetProject, "trashed");
    commitProject(nextProject, "Moving project to trash...", "Project moved to trash", "Project moved to trash in temporary memory.");

    if (activeProjectId === projectId) {
      const nextProjects = sortProjectsByUpdatedAt(upsertProject(projects, nextProject));
      const fallbackProject = nextProjects.find((project) => project.lifecycleState === "active") ?? null;
      router.push(fallbackProject ? getProjectNavigationPath(fallbackProject, "writing") : "/");
    }
  };

  const handleRestoreProject = async (projectId: string) => {
    const targetProject = projects.find((project) => project.id === projectId);

    if (!targetProject) {
      return;
    }

    const nextProject = moveProjectToLifecycleState(targetProject, "active");
    commitProject(nextProject, "Restoring project locally...", "Project restored", "Project restored in temporary memory.");
    router.push(getProjectNavigationPath(nextProject, "writing"));
  };

  const handlePermanentlyDeleteTrashedProjects = async (projectIds: string[]) => {
    if (!projectIds.length) {
      return;
    }

    const remainingProjects = projects.filter((project) => !projectIds.includes(project.id));
    const fallbackProject = remainingProjects.find((project) => project.lifecycleState === "active") ?? null;

    projectIds.forEach((projectId) => {
      workspacePendingPersistences.delete(projectId);
    });

    updateProjectCache(setProjects, remainingProjects);
    updateStorageMessage(setStorageMessage, "Permanently deleting trashed projects...");

    if (activeProjectId && projectIds.includes(activeProjectId)) {
      router.push(fallbackProject ? getProjectNavigationPath(fallbackProject, "writing") : "/");
    }

    try {
      await Promise.all(projectIds.map((projectId) => repository.remove(projectId)));
      updateStorageMessage(setStorageMessage, "Trashed projects permanently deleted");
    } catch {
      updateStorageMessage(setStorageMessage, "Some trashed projects could not be permanently deleted.");
    }
  };

  function scheduleProjectPersistence(
    project: Project,
    savingMessage: string,
    successMessage: string,
    fallbackMessage: string,
  ) {
    workspacePersistenceRequestId += 1;
    const requestId = workspacePersistenceRequestId;
    workspacePendingPersistences.set(project.id, { project });
    workspaceLatestPersistenceRequest = {
      requestId,
      successMessage,
      fallbackMessage,
    };

    updateStorageMessage(setStorageMessage, savingMessage);

    if (workspacePersistenceTimeout) {
      clearTimeout(workspacePersistenceTimeout);
    }

    workspacePersistenceTimeout = setTimeout(() => {
      const pendingPersistences = [...workspacePendingPersistences.values()];
      const latestPersistence = workspaceLatestPersistenceRequest;

      if (!pendingPersistences.length || !latestPersistence) {
        return;
      }

      workspacePendingPersistences.clear();

      void (async () => {
        try {
          await Promise.all(pendingPersistences.map((pendingPersistence) => repository.save(pendingPersistence.project)));

          if (workspaceLatestPersistenceRequest?.requestId === requestId) {
            updateStorageMessage(setStorageMessage, latestPersistence.successMessage);
          }
        } catch {
          pendingPersistences.forEach((pendingPersistence) => {
            workspacePendingPersistences.set(pendingPersistence.project.id, pendingPersistence);
          });

          if (workspaceLatestPersistenceRequest?.requestId === requestId) {
            updateStorageMessage(setStorageMessage, latestPersistence.fallbackMessage);
          }
        }
      })();
    }, PERSISTENCE_DEBOUNCE_MS);
  }

  const handleSwitchProject = () => {
    router.push("/");
  };

  const handleExportProject = (projectId: string) => {
    const targetProject = projects.find((project) => project.id === projectId);
    if (targetProject) {
      downloadProjectAsJsonFile(targetProject);
    }
  };

  const handleImportProject = async (importedProject: Project) => {
    const normalizedProject = normalizeProject(importedProject);
    const path = getProjectNavigationPath(normalizedProject, "writing");

    updateProjectCache(setProjects, upsertProject(workspaceProjectsCache, normalizedProject));
    updateStorageMessage(setStorageMessage, "Saving imported project locally...");

    try {
      await repository.save(normalizedProject);
      updateStorageMessage(setStorageMessage, "Imported project saved to IndexedDB");
    } catch {
      workspacePendingPersistences.set(normalizedProject.id, { project: normalizedProject });
      updateStorageMessage(setStorageMessage, "Imported project saved in temporary memory because IndexedDB was unavailable.");
    }

    navigateToPendingCanonicalPath(path);
  };

  return (
    <AppShell
      activeProjectId={activeProject?.id ?? ""}
      activeProjectTitle={activeProject?.title ?? null}
      activeBookTitle={activeProject?.books[0]?.title ?? null}
      activeChapterId={activeChapterId}
      activeSceneId={activeSceneId}
      activeSurface={activeSurface}
      isLoading={isLoading}
      onCreateChapter={handleCreateChapter}
      onCreateProject={handleCreateProject}
      onCreateScene={handleCreateScene}
      onDeleteChapter={handleDeleteChapter}
      onDeleteScene={handleDeleteScene}
      onExportProject={handleExportProject}
      onImportProject={handleImportProject}
      onSelectSurface={handleSelectSurface}
      onSelectSurfaceEntry={handleSelectSurfaceEntry}
      onUpdateProjectDetails={handleUpdateProjectDetails}
      onArchiveProject={handleArchiveProject}
      onMoveProjectToTrash={handleMoveProjectToTrash}
      onRestoreProject={handleRestoreProject}
      onPermanentlyDeleteTrashedProjects={handlePermanentlyDeleteTrashedProjects}
      onSelectChapter={handleSelectChapter}
      onSelectProject={handleSelectProject}
      onSwitchProject={handleSwitchProject}
      onSelectScene={handleSelectScene}
      onCreateSurfaceEntry={handleCreateSurfaceEntry}
      onDeleteSurfaceEntry={handleDeleteSurfaceEntry}
      onUpdateSceneDocument={handleUpdateSceneDocument}
      onUpdateSceneLinks={handleUpdateSceneLinks}
      onUpdateSceneMetadata={handleUpdateSceneMetadata}
      onSaveSurfaceEntry={handleSaveSurfaceEntry}
      project={activeProject}
      projects={projects}
      storageMessage={storageMessage}
      surfaceSelections={resolvedSurfaceSelections}
      userTier={userTier}
      onSelectTierUpgrade={handleSelectTierUpgrade}
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
        <Card sx={{ borderRadius: 2, bgcolor: "background.paper" }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <GlowGlobeLogo subtitle="Local-first writing studio" />
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
              <Card sx={{ borderRadius: 0 }}>
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
    <Card sx={{ borderRadius: 0 }}>
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

function updateProjectCache(setProjects: Dispatch<SetStateAction<Project[]>>, nextProjects: Project[]) {
  const sortedProjects = sortProjectsByUpdatedAt(nextProjects);
  workspaceProjectsCache = sortedProjects;
  setProjects(sortedProjects);
}

function updateStorageMessage(setStorageMessage: Dispatch<SetStateAction<string>>, message: string) {
  workspaceStorageMessageCache = message;
  setStorageMessage(message);
}

function applyPendingProjectPersistences(projects: Project[]) {
  if (!workspacePendingPersistences.size) {
    return sortProjectsByUpdatedAt(projects);
  }

  let nextProjects = [...projects];

  workspacePendingPersistences.forEach(({ project }) => {
    nextProjects = upsertProject(nextProjects, project);
  });

  return sortProjectsByUpdatedAt(nextProjects);
}

function createSurfaceEntry(project: Project, surface: SurfaceSelectionKey): Project {
  switch (surface) {
    case "characters":
      return upsertCharacter(project, {
        name: "New Character",
        role: "",
        summary: "",
        arc: "",
        status: "alive",
        aliases: "",
        pronouns: "",
        age: "",
        birthDate: "",
        gender: "",
        speciesId: "",
        occupation: "",
        sociumId: "",
        residence: "",
        origin: "",
        firstAppearance: "",
        appearance: "",
        distinguishingFeatures: "",
        skills: "",
        goals: "",
        fears: "",
        internalConflict: "",
        externalConflict: "",
        background: "",
        personality: "",
        voice: "",
        mannerisms: "",
        beliefs: "",
        secrets: "",
        unresolvedThreads: "",
        notes: "",
        quote: "",
      });
    case "characters-relationships": {
      const sourceCharacterId = project.characters[0]?.id ?? "";
      const targetCharacterId = project.characters[1]?.id ?? project.characters[0]?.id ?? "";
      return upsertRelationship(project, {
        sourceCharacterId,
        targetCharacterId,
        type: "ally",
        notes: "",
      });
    }
    case "sociums":
      return upsertSocium(project, {
        name: "New Socium",
        type: "faction",
        summary: "",
        leadership: "",
        headquarters: "",
        territory: "",
        scope: "",
        goals: "",
        beliefs: "",
        resources: "",
        methods: "",
        allies: "",
        rivals: "",
        publicReputation: "",
        internalConflicts: "",
        notes: "",
      });
    case "world":
      return upsertLocation(project, { name: "New Location", summary: "", regionName: "" });
    case "world-regions":
      return upsertRegion(project, { name: "New Region", summary: "" });
    case "world-planets":
      return upsertPlanet(project, { name: "New Planet", summary: "" });
    case "world-species":
      return upsertSpecies(project, { name: "New Species", summary: "", traits: "", lifespan: "", cultureNotes: "", originWorld: "" });
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
    case "characters-relationships":
      return removeRelationship(project, id);
    case "sociums":
      return removeSocium(project, id);
    case "world":
      return removeLocation(project, id);
    case "world-regions":
      return removeRegion(project, id);
    case "world-planets":
      return removePlanet(project, id);
    case "world-species":
      return removeSpecies(project, id);
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
      return upsertCharacter(
        project,
        {
          name: String(values.name ?? ""),
          role: String(values.role ?? ""),
          summary: String(values.summary ?? ""),
          arc: String(values.arc ?? ""),
          status: String(values.status ?? "alive") as CharacterInput["status"],
          aliases: String(values.aliases ?? ""),
          pronouns: String(values.pronouns ?? ""),
          age: String(values.age ?? ""),
          birthDate: String(values.birthDate ?? ""),
          gender: String(values.gender ?? ""),
          speciesId: String(values.speciesId ?? "") || undefined,
          occupation: String(values.occupation ?? ""),
          sociumId: String(values.sociumId ?? "") || undefined,
          residence: String(values.residence ?? ""),
          origin: String(values.origin ?? ""),
          firstAppearance: String(values.firstAppearance ?? ""),
          appearance: String(values.appearance ?? ""),
          distinguishingFeatures: String(values.distinguishingFeatures ?? ""),
          skills: String(values.skills ?? ""),
          goals: String(values.goals ?? ""),
          fears: String(values.fears ?? ""),
          internalConflict: String(values.internalConflict ?? ""),
          externalConflict: String(values.externalConflict ?? ""),
          background: String(values.background ?? ""),
          personality: String(values.personality ?? ""),
          voice: String(values.voice ?? ""),
          mannerisms: String(values.mannerisms ?? ""),
          beliefs: String(values.beliefs ?? ""),
          secrets: String(values.secrets ?? ""),
          unresolvedThreads: String(values.unresolvedThreads ?? ""),
          notes: String(values.notes ?? ""),
          quote: String(values.quote ?? ""),
        },
        selectedId,
      );
    case "characters-relationships":
      return upsertRelationship(
        project,
        {
          sourceCharacterId: String(values.sourceCharacterId ?? ""),
          targetCharacterId: String(values.targetCharacterId ?? ""),
          type: String(values.type ?? "ally") as RelationshipInput["type"],
          notes: String(values.notes ?? ""),
        },
        selectedId,
      );
    case "sociums":
      return upsertSocium(
        project,
        {
          name: String(values.name ?? ""),
          type: String(values.type ?? "faction"),
          summary: String(values.summary ?? ""),
          leadership: String(values.leadership ?? ""),
          headquarters: String(values.headquarters ?? ""),
          territory: String(values.territory ?? ""),
          scope: String(values.scope ?? ""),
          goals: String(values.goals ?? ""),
          beliefs: String(values.beliefs ?? ""),
          resources: String(values.resources ?? ""),
          methods: String(values.methods ?? ""),
          allies: String(values.allies ?? ""),
          rivals: String(values.rivals ?? ""),
          publicReputation: String(values.publicReputation ?? ""),
          internalConflicts: String(values.internalConflicts ?? ""),
          notes: String(values.notes ?? ""),
        },
        selectedId,
      );
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
    case "world-species":
      return upsertSpecies(
        project,
        {
          name: String(values.name ?? ""),
          summary: String(values.summary ?? ""),
          traits: String(values.traits ?? ""),
          lifespan: String(values.lifespan ?? ""),
          cultureNotes: String(values.cultureNotes ?? ""),
          originWorld: String(values.originWorld ?? ""),
        },
        selectedId,
      );
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
    case "characters-relationships":
      return project.relationships.at(-1)?.id ?? null;
    case "sociums":
      return project.sociums.at(-1)?.id ?? null;
    case "world":
      return project.locations.at(-1)?.id ?? null;
    case "world-regions":
      return project.regions.at(-1)?.id ?? null;
    case "world-planets":
      return project.planets.at(-1)?.id ?? null;
    case "world-species":
      return project.species.at(-1)?.id ?? null;
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

function sanitizeSurfaceSelections(project: Project | null, selections: SurfaceSelections): SurfaceSelections {
  if (!project) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(selections).filter(([surface, id]) => {
      if (!id) {
        return false;
      }

      return hasSurfaceSelection(project, surface as SurfaceSelectionKey, id);
    }),
  ) as SurfaceSelections;
}

function hasSurfaceSelection(project: Project, surface: SurfaceSelectionKey, id: string): boolean {
  switch (surface) {
    case "characters":
      return project.characters.some((item) => item.id === id);
    case "characters-relationships":
      return project.relationships.some((item) => item.id === id);
    case "sociums":
      return project.sociums.some((item) => item.id === id);
    case "world":
      return project.locations.some((item) => item.id === id);
    case "world-regions":
      return project.regions.some((item) => item.id === id);
    case "world-planets":
      return project.planets.some((item) => item.id === id);
    case "world-species":
      return project.species.some((item) => item.id === id);
    case "technology":
      return project.technologyEntries.some((item) => item.id === id);
    case "timeline":
      return project.timelineEvents.some((item) => item.id === id);
    case "corkboard":
      return project.corkboardCards.some((item) => item.id === id);
    case "lore":
      return project.glossaryEntries.some((item) => item.id === id);
    case "lore-notes":
      return project.loreNotes.some((item) => item.id === id);
    case "research":
      return project.researchNotes.some((item) => item.id === id);
    case "structure":
      return project.plotThreads.some((item) => item.id === id);
    case "structure-acts":
      return project.acts.some((item) => item.id === id);
    case "structure-beats":
      return project.beats.some((item) => item.id === id);
    case "structure-subplots":
      return project.subplots.some((item) => item.id === id);
    case "structure-pov":
      return project.povMarkers.some((item) => item.id === id);
  }
}

function upsertProject(projects: Project[], project: Project): Project[] {
  const existingProjectIndex = projects.findIndex((entry) => entry.id === project.id);

  if (existingProjectIndex === -1) {
    return [...projects, project];
  }

  return projects.map((entry) => (entry.id === project.id ? project : entry));
}
