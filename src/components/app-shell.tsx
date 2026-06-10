"use client";

import CloseRounded from "@mui/icons-material/CloseRounded";
import SwapHorizRounded from "@mui/icons-material/SwapHorizRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { ContextPanel } from "@/components/context-panel";
import { GlowGlobeLogo } from "@/components/glowglobe-logo";
import { ManuscriptViewport } from "@/components/manuscript-viewport";
import { ProjectDetailsForm } from "@/components/project-details-form";
import { ProjectQuickCreateForm } from "@/components/project-quick-create-form";
import { WorkspaceSurfaceContent, type SurfaceSelectionKey, type SurfaceSelections } from "@/components/workspace-surface-content";
import { WorkspaceSidebar } from "@/components/workspace-sidebar";
import { getWorkspaceSurfaceLabel, type WorkspaceSurface } from "@/components/workspace-surfaces";
import type { Project, RichTextDocument } from "@/lib/domain/types";
import type { CreateProjectInput, SceneLinkPayload, UpdateProjectDetailsInput } from "@/lib/domain/project-factory";
import { brandTokens } from "@/theme/brand-tokens";

const SIDEBAR_COLLAPSED_STORAGE_KEY = "glowglobe.sidebarCollapsed";
const PROJECT_ACTION_BUTTON_SX = {
  minWidth: 148,
  justifyContent: "center",
  px: 1.35,
  py: 0.7,
} as const;

type AppShellProps = {
  project: Project | null;
  projects: Project[];
  activeProjectId: string;
  activeProjectTitle?: string | null;
  activeBookTitle?: string | null;
  activeChapterId: string | null;
  activeSceneId: string | null;
  activeSurface: WorkspaceSurface;
  surfaceSelections: SurfaceSelections;
  isLoading: boolean;
  storageMessage: string;
  onSelectProject: (projectId: string) => void;
  onSelectSurface: (surface: WorkspaceSurface) => void;
  onSelectSurfaceEntry: (surface: SurfaceSelectionKey, id: string) => void;
  onCreateProject: (input: CreateProjectInput) => Promise<Project>;
  onUpdateProjectDetails: (projectId: string, input: UpdateProjectDetailsInput) => Promise<void>;
  onArchiveProject: (projectId: string) => Promise<void>;
  onMoveProjectToTrash: (projectId: string) => Promise<void>;
  onRestoreProject: (projectId: string) => Promise<void>;
  onPermanentlyDeleteTrashedProjects: (projectIds: string[]) => Promise<void>;
  onSelectChapter: (chapterId: string) => void;
  onSelectScene: (chapterId: string, sceneId: string) => void;
  onCreateChapter: () => Promise<void>;
  onCreateScene: (chapterId: string) => Promise<void>;
  onDeleteChapter: (chapterId: string) => Promise<void>;
  onDeleteScene: (chapterId: string, sceneId: string) => Promise<void>;
  onCreateSurfaceEntry: (surface: SurfaceSelectionKey) => Promise<void>;
  onDeleteSurfaceEntry: (surface: SurfaceSelectionKey, id: string) => Promise<void>;
  onSaveSurfaceEntry: (surface: SurfaceSelectionKey, values: Record<string, string | number | undefined>) => Promise<void>;
  onUpdateSceneLinks: (chapterId: string, sceneId: string, links: SceneLinkPayload) => Promise<void>;
  onUpdateSceneMetadata: (chapterId: string, sceneId: string, input: { title: string; summary: string }) => Promise<void>;
  onUpdateSceneDocument: (chapterId: string, sceneId: string, document: RichTextDocument) => Promise<void>;
};

export function AppShell({
  project,
  projects,
  activeProjectId,
  activeProjectTitle,
  activeBookTitle,
  activeChapterId,
  activeSceneId,
  activeSurface,
  surfaceSelections,
  isLoading,
  storageMessage,
  onSelectProject,
  onSelectSurface,
  onSelectSurfaceEntry,
  onCreateProject,
  onUpdateProjectDetails,
  onArchiveProject,
  onMoveProjectToTrash,
  onRestoreProject,
  onPermanentlyDeleteTrashedProjects,
  onSelectChapter,
  onSelectScene,
  onCreateChapter,
  onCreateScene,
  onDeleteChapter,
  onDeleteScene,
  onCreateSurfaceEntry,
  onDeleteSurfaceEntry,
  onSaveSurfaceEntry,
  onUpdateSceneLinks,
  onUpdateSceneMetadata,
  onUpdateSceneDocument,
}: AppShellProps) {
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [hasLoadedSidebarPreference, setHasLoadedSidebarPreference] = useState(false);
  const theme = useTheme();
  const isDesktopSidebarLayout = useMediaQuery(theme.breakpoints.up("xl"));
  const showInspector = activeSurface === "writing";
  const isWritingLayout = showInspector && Boolean(project);
  const shouldCollapseSidebar = isDesktopSidebarLayout && isSidebarCollapsed;

  const activeBook = project?.books[0];
  const activeChapter = useMemo(
    () => activeBook?.chapters.find((chapter) => chapter.id === activeChapterId) ?? activeBook?.chapters[0],
    [activeBook, activeChapterId],
  );
  const activeScene = useMemo(
    () => activeChapter?.scenes.find((scene) => scene.id === activeSceneId) ?? activeChapter?.scenes[0],
    [activeChapter, activeSceneId],
  );
  const activeProjects = useMemo(() => projects.filter((entry) => entry.lifecycleState === "active"), [projects]);
  const archivedProjectCount = useMemo(() => projects.filter((entry) => entry.lifecycleState === "archived").length, [projects]);
  const trashedProjectCount = useMemo(() => projects.filter((entry) => entry.lifecycleState === "trashed").length, [projects]);

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY);
      if (storedValue !== null) {
        setIsSidebarCollapsed(storedValue === "true");
      }
    } finally {
      setHasLoadedSidebarPreference(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedSidebarPreference) {
      return;
    }

    window.localStorage.setItem(SIDEBAR_COLLAPSED_STORAGE_KEY, String(isSidebarCollapsed));
  }, [hasLoadedSidebarPreference, isSidebarCollapsed]);

  return (
    <>
      <Box component="main" sx={{ minHeight: "100vh", p: { xs: 1.5, xl: 2.25 } }}>
        {isWritingLayout && project ? (
          <Card
            sx={{
              maxWidth: 1780,
              mx: "auto",
              borderRadius: 2,
              bgcolor: "background.paper",
              overflow: "hidden",
              minHeight: { xs: "calc(100vh - 24px)", xl: 0 },
              height: { xs: "auto", xl: "calc(100dvh - 36px)" },
            }}
          >
            <Grid container sx={{ minHeight: { xs: "calc(100vh - 24px)", xl: 0 }, height: { xs: "auto", xl: "100%" } }}>
              <Grid
                size={{ xs: 12, xl: shouldCollapseSidebar ? 1 : 2 }}
                sx={{
                  minHeight: 0,
                  height: { xl: "100%" },
                  borderRight: { xl: "1px solid" },
                  borderBottom: { xs: "1px solid", xl: "none" },
                  borderColor: "divider",
                }}
              >
                <Box sx={{ p: shouldCollapseSidebar ? 1 : 1.35, height: "100%", minHeight: 0 }}>
                  <WorkspaceSidebar
                    activeProjectId={activeProjectId}
                    activeProjectTitle={activeProjectTitle ?? project.title}
                    activeSurface={activeSurface}
                    canCollapse={isDesktopSidebarLayout}
                    isCollapsed={shouldCollapseSidebar}
                    onOpenCreateProject={() => setIsCreateProjectOpen(true)}
                    onArchiveProject={onArchiveProject}
                    onMoveProjectToTrash={onMoveProjectToTrash}
                    onPermanentlyDeleteTrashedProjects={onPermanentlyDeleteTrashedProjects}
                    onRestoreProject={onRestoreProject}
                    onSelectProject={onSelectProject}
                    onSelectSurface={onSelectSurface}
                    onToggleCollapsed={() => setIsSidebarCollapsed((current) => !current)}
                    projects={projects}
                    variant="writing"
                  />
                </Box>
              </Grid>

              <Grid
                size={{ xs: 12, xl: shouldCollapseSidebar ? 8 : 7 }}
                sx={{
                  minHeight: 0,
                  height: { xl: "100%" },
                  borderRight: { xl: "1px solid" },
                  borderBottom: { xs: "1px solid", xl: "none" },
                  borderColor: "divider",
                }}
              >
                <Box sx={{ p: { xs: 1.35, xl: 1.55 }, height: "100%", minHeight: 0, overflow: "hidden" }}>
                  <ManuscriptViewport
                    activeBookTitle={activeBookTitle ?? activeBook?.title ?? null}
                    activeChapterId={activeChapterId}
                    activeSceneId={activeSceneId}
                    onCreateChapter={onCreateChapter}
                    onCreateScene={onCreateScene}
                    onDeleteChapter={onDeleteChapter}
                    onDeleteScene={onDeleteScene}
                    onSelectChapter={onSelectChapter}
                    onSelectScene={onSelectScene}
                    onUpdateSceneDocument={onUpdateSceneDocument}
                    project={project}
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, xl: 3 }} sx={{ minHeight: 0, height: { xl: "100%" }, display: "flex" }}>
                <Box sx={{ p: { xs: 1.35, xl: 1.55 }, height: "100%", minHeight: 0, overflow: "hidden", flex: 1 }}>
                  <ContextPanel
                    activeChapterId={activeChapterId}
                    activeScene={activeScene}
                    onUpdateSceneLinks={onUpdateSceneLinks}
                    onUpdateSceneMetadata={onUpdateSceneMetadata}
                    project={project}
                  />
                </Box>
              </Grid>
            </Grid>
          </Card>
        ) : (
          <Stack spacing={{ xs: 1.5, xl: 2 }} sx={{ maxWidth: 1780, minHeight: "calc(100vh - 24px)", mx: "auto" }}>
            <Card
              sx={(theme) => ({
                borderRadius: 2,
                bgcolor: "background.paper",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.14)}, transparent 36%)`,
                  pointerEvents: "none",
                },
              })}
            >
              <CardContent sx={{ p: { xs: 2, md: 2.5, xl: 2.8 } }}>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", xl: "row" }, gap: { xs: 1.75, xl: 2.2 }, justifyContent: "space-between" }}>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Box sx={{ display: "flex", gap: 1.2, alignItems: "center", flexWrap: "wrap" }}>
                      <GlowGlobeLogo subtitle="Editorial manuscript workspace" />
                      <Box sx={{ borderRadius: brandTokens.shape.pillRadius, bgcolor: alpha(theme.palette.primary.main, 0.9), color: "primary.contrastText", px: 1.35, py: 0.5, fontSize: 12, fontWeight: 700, textTransform: "capitalize", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22)" }}>
                        {project?.status ?? (activeProjects.length ? "select a project" : "create your first project")}
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, alignItems: { xs: "flex-start", lg: "center" }, flexDirection: { xs: "column", lg: "row" }, mt: 0.9, minWidth: 0 }}>
                      <Typography variant="h1" sx={{ minWidth: 0, overflowWrap: "anywhere", lineHeight: 1.2 }}>{project?.title ?? "Choose a project"}</Typography>
                      <InfoPill label="Surface" value={project ? getWorkspaceSurfaceLabel(activeSurface) : "Project landing"} />
                    </Box>
                    <Typography color="text.secondary" sx={{ mt: 0.95, maxWidth: 860, lineHeight: 1.72, fontSize: 15, overflowWrap: "anywhere", whiteSpace: "pre-wrap" }}>
                      {project?.description ?? "Select an existing manuscript workspace, create a new project, or restore one from archived and trashed lists in the sidebar."}
                    </Typography>
                  </Box>

                  <Stack spacing={0.9} sx={{ alignItems: { xs: "flex-start", xl: "flex-end" }, maxWidth: { xl: 720 }, minWidth: 0, width: "100%" }}>
                    <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", justifyContent: { xs: "flex-start", xl: "flex-end" }, minWidth: 0, width: "100%" }}>
                      <InfoPill label="Projects" value={String(activeProjects.length)} />
                      <InfoPill label="Archived" value={String(archivedProjectCount)} />
                      <InfoPill label="In trash" value={String(trashedProjectCount)} />
                    </Box>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                      <Button disabled={!activeProjects.length} onClick={() => setIsSidebarCollapsed(false)} size="small" startIcon={<SwapHorizRounded />} sx={PROJECT_ACTION_BUTTON_SX} variant="outlined">
                        Switch project
                      </Button>
                      <Button onClick={() => setIsCreateProjectOpen(true)} size="small" sx={PROJECT_ACTION_BUTTON_SX} variant="contained">
                        New project
                      </Button>
                      <Button disabled={!project} onClick={() => setIsEditProjectOpen(true)} size="small" sx={PROJECT_ACTION_BUTTON_SX} variant="outlined">
                        Edit project details
                      </Button>
                      <Button
                        color="warning"
                        disabled={!project || project.lifecycleState !== "active"}
                        onClick={() => {
                          if (project) {
                            void onArchiveProject(project.id);
                          }
                        }}
                        size="small"
                        sx={PROJECT_ACTION_BUTTON_SX}
                        variant="outlined"
                      >
                        Archive
                      </Button>
                      <Button
                        color="error"
                        disabled={!project}
                        onClick={() => {
                          if (project && window.confirm(`Move "${project.title}" to trash?`)) {
                            void onMoveProjectToTrash(project.id);
                          }
                        }}
                        size="small"
                        sx={PROJECT_ACTION_BUTTON_SX}
                        variant="outlined"
                      >
                        Move to trash
                      </Button>
                    </Stack>
                    <Typography variant="body2" color="success.main" sx={{ minWidth: 0, overflowWrap: "anywhere", textAlign: { xs: "left", xl: "right" } }}>
                      {storageMessage}
                    </Typography>
                  </Stack>
                </Box>
              </CardContent>
            </Card>

            <Grid container spacing={1.5} sx={{ flex: 1, minHeight: 0 }}>
              <Grid size={{ xs: 12, xl: shouldCollapseSidebar ? 1 : 3 }} sx={{ minHeight: 0, display: "flex" }}>
                <Card sx={{ flex: 1, borderRadius: 2, bgcolor: "background.paper", transition: "all 180ms ease" }}>
                  <CardContent sx={{ p: shouldCollapseSidebar ? 1.1 : 1.7, height: "100%", minHeight: 0 }}>
                    <WorkspaceSidebar
                      activeProjectId={activeProjectId}
                      activeProjectTitle={activeProjectTitle ?? project?.title ?? null}
                      activeSurface={activeSurface}
                      canCollapse={isDesktopSidebarLayout}
                      isCollapsed={shouldCollapseSidebar}
                      onOpenCreateProject={() => setIsCreateProjectOpen(true)}
                      onArchiveProject={onArchiveProject}
                      onMoveProjectToTrash={onMoveProjectToTrash}
                      onPermanentlyDeleteTrashedProjects={onPermanentlyDeleteTrashedProjects}
                      onRestoreProject={onRestoreProject}
                      onSelectProject={onSelectProject}
                      onSelectSurface={onSelectSurface}
                      onToggleCollapsed={() => setIsSidebarCollapsed((current) => !current)}
                      projects={projects}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, xl: 9 }} sx={{ minHeight: 0, display: "flex" }}>
                <Card sx={{ flex: 1, borderRadius: 2, bgcolor: "background.paper" }}>
                  <CardContent sx={{ p: { xs: 1.7, xl: 1.9 }, height: "100%", minHeight: 0 }}>
                    {!project ? (
                      <ProjectLandingPanel
                        activeProjects={activeProjects}
                        onCreateProject={() => setIsCreateProjectOpen(true)}
                        onSelectProject={onSelectProject}
                      />
                    ) : activeSurface !== "writing" ? (
                      <WorkspaceSurfaceContent
                        activeSurface={activeSurface}
                        handlers={{
                          selections: surfaceSelections,
                          onCreateEntry: onCreateSurfaceEntry,
                          onDeleteEntry: onDeleteSurfaceEntry,
                          onSaveEntry: onSaveSurfaceEntry,
                          onSelectEntry: onSelectSurfaceEntry,
                        }}
                        project={project}
                      />
                    ) : null
                    }
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        )}
      </Box>

      <Dialog fullWidth maxWidth="md" onClose={() => setIsCreateProjectOpen(false)} open={isCreateProjectOpen}>
        <DialogTitle sx={{ px: 3, pt: 3, pb: 1 }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", gap: 2, alignItems: { xs: "stretch", sm: "flex-start" } }}>
            <Box>
              <Typography variant="overline" color="text.secondary">
                Projects Workspace
              </Typography>
              <Typography variant="h2" sx={{ mt: 0.5 }}>
                Create a new project
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Start a fresh manuscript workspace without crowding the main writing shell.
              </Typography>
            </Box>
            <Button color="inherit" onClick={() => setIsCreateProjectOpen(false)} startIcon={<CloseRounded />} sx={{ alignSelf: { xs: "flex-start", sm: "auto" } }} variant="text">
              Close
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ px: 3, pb: 3 }}>
          <Divider sx={{ mb: 3 }} />
          <ProjectQuickCreateForm
            isLoading={isLoading}
            onCreateProject={async (input) => {
              const project = await onCreateProject(input);
              setIsCreateProjectOpen(false);
              return project;
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog fullWidth maxWidth="md" onClose={() => setIsEditProjectOpen(false)} open={isEditProjectOpen && Boolean(project)}>
        <DialogTitle sx={{ px: 3, pt: 3, pb: 1 }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", gap: 2, alignItems: { xs: "stretch", sm: "flex-start" } }}>
            <Box>
              <Typography variant="overline" color="text.secondary">
                Projects Workspace
              </Typography>
              <Typography variant="h2" sx={{ mt: 0.5 }}>
                Edit project details
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Rename and adjust your project metadata without creating a new workspace.
              </Typography>
            </Box>
            <Button color="inherit" onClick={() => setIsEditProjectOpen(false)} startIcon={<CloseRounded />} sx={{ alignSelf: { xs: "flex-start", sm: "auto" } }} variant="text">
              Close
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ px: 3, pb: 3 }}>
          <Divider sx={{ mb: 3 }} />
          {project ? (
            <ProjectDetailsForm
              isLoading={isLoading}
              onSaveProjectDetails={async (input) => {
                await onUpdateProjectDetails(project.id, input);
                setIsEditProjectOpen(false);
              }}
              project={project}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

function ProjectLandingPanel({
  activeProjects,
  onCreateProject,
  onSelectProject,
}: {
  activeProjects: Project[];
  onCreateProject: () => void;
  onSelectProject: (projectId: string) => void;
}) {
  return (
    <Stack spacing={2} sx={{ p: { xs: 0.35, md: 0.75 }, minHeight: "100%" }}>
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          bgcolor: alpha(brandTokens.palette.background.panel, 0.78),
          p: { xs: 2, md: 2.4 },
        }}
      >
        <Typography variant="overline" color="text.secondary">
          Project landing
        </Typography>
        <Typography variant="h2" sx={{ mt: 0.55 }}>
          Select a workspace or start a new manuscript
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 760, lineHeight: 1.72 }}>
          Direct project URLs can go stale when a project has not been selected yet, has been removed, or is no longer available. Use this landing page to safely recover by opening an existing project or creating a new one.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mt: 1.6 }}>
          <Button onClick={onCreateProject} variant="contained">
            Create new project
          </Button>
          <Button variant="outlined" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}>
            Browse projects below
          </Button>
        </Stack>
      </Box>

      {activeProjects.length ? (
        <Box>
          <Typography variant="overline" color="text.secondary">
            Active projects
          </Typography>
          <Grid container spacing={1.25} sx={{ mt: 0.1 }}>
            {activeProjects.map((entry) => (
              <Grid key={entry.id} size={{ xs: 12, md: 6 }}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    bgcolor: alpha(brandTokens.palette.background.manuscript, 0.92),
                  }}
                >
                  <CardContent sx={{ p: 1.7 }}>
                    <Stack spacing={1.1} sx={{ height: "100%" }}>
                      <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", alignItems: "center" }}>
                        <InfoPill label="Genre" value={entry.genre || "—"} />
                        <InfoPill label="Status" value={entry.status} />
                      </Box>
                      <Typography variant="h3" sx={{ overflowWrap: "anywhere" }}>
                        {entry.title}
                      </Typography>
                      <Typography color="text.secondary" sx={{ lineHeight: 1.65, overflowWrap: "anywhere", flex: 1 }}>
                        {entry.description || "Open this project to return to its manuscript and adjacent story surfaces."}
                      </Typography>
                      <Button onClick={() => onSelectProject(entry.id)} variant="outlined" sx={{ alignSelf: "flex-start" }}>
                        Open project
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: alpha(brandTokens.palette.background.panelMuted, 0.74),
            p: 2,
          }}
        >
          <Typography variant="h3">No active projects yet</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.85, lineHeight: 1.68, maxWidth: 720 }}>
            Create your first project to enter the Writing Studio. If you expected an existing project, check the sidebar for archived or trashed items and restore it from there.
          </Typography>
        </Box>
      )}
    </Stack>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        bgcolor: alpha(brandTokens.palette.background.manuscript, 0.92),
        borderRadius: 999,
        px: 1.45,
        py: 0.75,
        fontSize: 13,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
        maxWidth: "100%",
        minWidth: 0,
        overflowWrap: "anywhere",
      }}
    >
      <Box component="span" sx={{ color: "text.secondary", whiteSpace: "nowrap" }}>
        {label}:
      </Box>
      <Box component="span" sx={{ color: "text.primary", fontWeight: 600, overflowWrap: "anywhere" }}>
        {value}
      </Box>
    </Box>
  );
}
