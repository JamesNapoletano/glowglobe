"use client";

import CloseRounded from "@mui/icons-material/CloseRounded";
import EditRounded from "@mui/icons-material/EditRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import FileDownloadRounded from "@mui/icons-material/FileDownloadRounded";
import TuneRounded from "@mui/icons-material/TuneRounded";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { ContextPanel } from "@/components/context-panel";
import { ManuscriptViewport } from "@/components/manuscript-viewport";
import { ProjectDetailsForm } from "@/components/project-details-form";
import { ProjectImportDialog } from "@/components/project-import-dialog";
import { ProjectQuickCreateForm } from "@/components/project-quick-create-form";
import { ProjectSelectionScreen } from "@/components/project-selection-screen";
import { WorkspaceSurfaceContent, type SurfaceSelectionKey, type SurfaceSelections } from "@/components/workspace-surface-content";
import { WorkspaceSidebar } from "@/components/workspace-sidebar";
import { getWorkspaceSurfaceLabel, type WorkspaceSurface } from "@/components/workspace-surfaces";
import { QuotaExceededModal } from "@/components/tier/QuotaExceededModal";
import { checkProjectCreationQuota } from "@/lib/services/tier-service";
import type { SubscriptionTier } from "@/lib/domain/user";
import type { Project, RichTextDocument } from "@/lib/domain/types";
import type { CreateProjectInput, SceneLinkPayload, UpdateProjectDetailsInput } from "@/lib/domain/project-factory";

const SIDEBAR_COLLAPSED_STORAGE_KEY = "glowglobe.sidebarCollapsed";

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
  onSwitchProject: () => void;
  onSelectSurface: (surface: WorkspaceSurface) => void;
  onSelectSurfaceEntry: (surface: SurfaceSelectionKey, id: string) => void;
  onCreateProject: (input: CreateProjectInput) => Promise<Project>;
  onExportProject?: (projectId: string) => void;
  onImportProject?: (project: Project) => Promise<void>;
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
  userTier?: SubscriptionTier;
  onSelectTierUpgrade?: (newTier: SubscriptionTier) => void;
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
  onSwitchProject,
  onSelectSurface,
  onSelectSurfaceEntry,
  onCreateProject,
  onExportProject,
  onImportProject,
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
  userTier,
  onSelectTierUpgrade,
}: AppShellProps) {
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [isImportProjectOpen, setIsImportProjectOpen] = useState(false);
  const [isQuotaModalOpen, setIsQuotaModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [hasLoadedSidebarPreference, setHasLoadedSidebarPreference] = useState(false);
  const theme = useTheme();
  const isDesktopSidebarLayout = useMediaQuery(theme.breakpoints.up("xl"));
  const shouldCollapseSidebar = isDesktopSidebarLayout && isSidebarCollapsed;

  const currentTier = userTier ?? "free";

  const handleOpenCreateProject = () => {
    const quota = checkProjectCreationQuota(currentTier, projects, "active");
    if (!quota.allowed) {
      setIsQuotaModalOpen(true);
    } else {
      setIsCreateProjectOpen(true);
    }
  };

  const handleOpenImportProject = () => {
    const quota = checkProjectCreationQuota(currentTier, projects, "active");
    if (!quota.allowed) {
      setIsQuotaModalOpen(true);
    } else {
      setIsImportProjectOpen(true);
    }
  };

  const activeBook = project?.books[0];
  const activeChapter = useMemo(
    () => activeBook?.chapters.find((chapter) => chapter.id === activeChapterId) ?? activeBook?.chapters[0],
    [activeBook, activeChapterId],
  );
  const activeScene = useMemo(
    () => activeChapter?.scenes.find((scene) => scene.id === activeSceneId) ?? activeChapter?.scenes[0],
    [activeChapter, activeSceneId],
  );

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
      <Box component="main" sx={{ height: { xl: "100dvh" }, minHeight: { xs: "100svh", xl: 0 }, overflow: { xl: "hidden" }, p: project ? { xs: 1.5, xl: 2.25 } : 0 }}>
        {!project ? (
          /* Dedicated Project Selection Screen (NO SIDENAV) */
          <ProjectSelectionScreen
            projects={projects}
            storageMessage={storageMessage}
            userTier={currentTier}
            onSelectProject={onSelectProject}
            onOpenCreateProject={handleOpenCreateProject}
            onOpenImportProject={handleOpenImportProject}
            onExportProject={(projectId) => onExportProject?.(projectId)}
            onArchiveProject={onArchiveProject}
            onMoveProjectToTrash={onMoveProjectToTrash}
            onRestoreProject={onRestoreProject}
            onPermanentlyDeleteTrashedProjects={onPermanentlyDeleteTrashedProjects}
            onOpenQuotaModal={() => setIsQuotaModalOpen(true)}
            onSelectTierUpgrade={onSelectTierUpgrade}
          />
        ) : (
          /* Unified Project Workspace Shell (WITH SINGLE UNIFIED SIDENAV) */
          <Card
            className="glass-panel"
            sx={{
              maxWidth: 1800,
              mx: "auto",
              borderRadius: 3,
              bgcolor: "background.paper",
              overflow: "hidden",
              minHeight: { xs: "calc(100vh - 24px)", xl: 0 },
              height: { xs: "auto", xl: "calc(100dvh - 36px)" },
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Grid container sx={{ minHeight: { xs: "calc(100vh - 24px)", xl: 0 }, height: { xs: "auto", xl: "100%" } }}>
              {/* Unified Sidenav Column */}
              <Grid
                size={{ xs: 12, xl: shouldCollapseSidebar ? "auto" : 2 }}
                sx={{
                  minHeight: 0,
                  height: { xl: "100%" },
                  borderRight: { xl: "1px solid" },
                  borderBottom: { xs: "1px solid", xl: "none" },
                  borderColor: "divider",
                  width: { xl: shouldCollapseSidebar ? "68px" : undefined },
                  flex: { xl: shouldCollapseSidebar ? "0 0 68px" : undefined },
                  maxWidth: { xl: shouldCollapseSidebar ? "68px" : undefined },
                  bgcolor: "background.rail",
                }}
              >
                <Box sx={{ p: shouldCollapseSidebar ? 0.75 : 1.35, height: "100%", minHeight: 0 }}>
                  <WorkspaceSidebar
                    activeProjectId={activeProjectId}
                    activeProjectTitle={activeProjectTitle ?? project.title}
                    activeSurface={activeSurface}
                    canCollapse={isDesktopSidebarLayout}
                    isCollapsed={shouldCollapseSidebar}
                    onOpenCreateProject={handleOpenCreateProject}
                    onSwitchProject={onSwitchProject}
                    onExportProject={(projectId) => onExportProject?.(projectId)}
                    onSelectSurface={onSelectSurface}
                    onToggleCollapsed={() => setIsSidebarCollapsed((current) => !current)}
                    projects={projects}
                    userTier={currentTier}
                  />
                </Box>
              </Grid>

              {/* Main Workspace Surface Content */}
              {activeSurface === "writing" ? (
                <>
                  {/* Manuscript Editor Column */}
                  <Grid
                    size={{ xs: 12, xl: shouldCollapseSidebar ? "auto" : 7 }}
                    sx={{
                      minHeight: 0,
                      height: { xl: "100%" },
                      borderRight: { xl: "1px solid" },
                      borderBottom: { xs: "1px solid", xl: "none" },
                      borderColor: "divider",
                      width: { xl: shouldCollapseSidebar ? "calc(66.666% - 45.33px)" : undefined },
                      flex: { xl: shouldCollapseSidebar ? "1 1 calc(66.666% - 45.33px)" : undefined },
                      maxWidth: { xl: shouldCollapseSidebar ? "calc(66.666% - 45.33px)" : undefined },
                    }}
                  >
                    <Box sx={{ pt: { xs: 2.25, xl: 2.25 }, pb: { xs: 1.35, xl: 1.55 }, px: { xs: 1.35, xl: 1.55 }, height: "100%", minHeight: 0, overflowY: { xl: "auto" } }}>
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

                  {/* Context Inspector Column */}
                  <Grid
                    size={{ xs: 12, xl: 3 }}
                    sx={{
                      minHeight: 0,
                      height: { xl: "100%" },
                      display: "flex",
                      width: { xl: shouldCollapseSidebar ? "33.333%" : undefined },
                      flex: { xl: shouldCollapseSidebar ? "0 0 33.333%" : undefined },
                      maxWidth: { xl: shouldCollapseSidebar ? "33.333%" : undefined },
                      bgcolor: "background.panelMuted",
                    }}
                  >
                    <Box sx={{ p: { xs: 1.35, xl: 1.55 }, height: "100%", minHeight: 0, overflowY: { xl: "auto" }, flex: 1 }}>
                      <ContextPanel
                        activeChapterId={activeChapterId}
                        activeScene={activeScene}
                        onUpdateSceneLinks={onUpdateSceneLinks}
                        onUpdateSceneMetadata={onUpdateSceneMetadata}
                        project={project}
                      />
                    </Box>
                  </Grid>
                </>
              ) : (
                /* Non-writing Story Bible / Planning Surface Canvas */
                <Grid
                  size={{ xs: 12, xl: shouldCollapseSidebar ? "auto" : 10 }}
                  sx={{
                    minHeight: 0,
                    height: { xl: "100%" },
                    display: "flex",
                    flexDirection: "column",
                    width: { xl: shouldCollapseSidebar ? "calc(100% - 68px)" : undefined },
                    flex: { xl: shouldCollapseSidebar ? "1 1 calc(100% - 68px)" : undefined },
                    maxWidth: { xl: shouldCollapseSidebar ? "calc(100% - 68px)" : undefined },
                  }}
                >
                  {/* Context Surface Header Bar */}
                  <Box
                    className="glass-header"
                    sx={{
                      px: { xs: 2, md: 3 },
                      py: 1.75,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      bgcolor: "background.panel",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="overline" color="text.secondary" sx={{ display: "block" }}>
                        Story Bible & Planning
                      </Typography>
                      <Typography variant="h2" sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 800, overflowWrap: "anywhere" }}>
                        {getWorkspaceSurfaceLabel(activeSurface)} Workspace
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<TuneRounded fontSize="small" />}
                        onClick={() => onSelectSurface("settings")}
                        sx={{ px: 1.2, py: 0.4 }}
                      >
                        Project Settings
                      </Button>
                      {onExportProject && (
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          startIcon={<FileDownloadRounded fontSize="small" />}
                          onClick={() => onExportProject(project.id)}
                          sx={{ px: 1.2, py: 0.4 }}
                        >
                          Export
                        </Button>
                      )}
                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        startIcon={<DeleteRounded fontSize="small" />}
                        onClick={() => {
                          if (window.confirm(`Move "${project.title}" to trash?`)) {
                            void onMoveProjectToTrash(project.id);
                          }
                        }}
                        sx={{ px: 1.2, py: 0.4 }}
                      >
                        Trash
                      </Button>
                    </Stack>
                  </Box>

                  {/* Surface Component Content */}
                  <Box sx={{ p: { xs: 1.5, md: 2.25 }, flex: 1, minHeight: 0, overflowY: "auto" }}>
                    <WorkspaceSurfaceContent
                      activeSurface={activeSurface}
                      handlers={{
                        selections: surfaceSelections,
                        onCreateEntry: onCreateSurfaceEntry,
                        onDeleteEntry: onDeleteSurfaceEntry,
                        onSaveEntry: onSaveSurfaceEntry,
                        onSelectEntry: onSelectSurfaceEntry,
                        onUpdateProjectDetails: (input) => onUpdateProjectDetails(project.id, input),
                        onExportProject: () => onExportProject?.(project.id),
                        onArchiveProject: () => onArchiveProject(project.id),
                        onMoveProjectToTrash: () => onMoveProjectToTrash(project.id),
                      }}
                      project={project}
                    />
                  </Box>
                </Grid>
              )}
            </Grid>
          </Card>
        )}
      </Box>

      {/* Quick Create Project Dialog */}
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
                Start a fresh manuscript workspace without crowding your active project.
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
              const quota = checkProjectCreationQuota(currentTier, projects, "active");
              if (!quota.allowed) {
                setIsCreateProjectOpen(false);
                setIsQuotaModalOpen(true);
                throw new Error(quota.message || "Quota exceeded");
              }
              const project = await onCreateProject(input);
              setIsCreateProjectOpen(false);
              return project;
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Import Project Dialog */}
      <ProjectImportDialog
        existingProjectIds={projects.map((p) => p.id)}
        onClose={() => setIsImportProjectOpen(false)}
        onImportProject={async (importedProject) => {
          const quota = checkProjectCreationQuota(currentTier, projects, "active");
          if (!quota.allowed) {
            setIsImportProjectOpen(false);
            setIsQuotaModalOpen(true);
            throw new Error(quota.message || "Quota exceeded");
          }
          if (onImportProject) {
            await onImportProject(importedProject);
          }
          setIsImportProjectOpen(false);
        }}
        open={isImportProjectOpen}
      />

      {/* Subscription Tier Quota Exceeded Modal */}
      <QuotaExceededModal
        open={isQuotaModalOpen}
        currentTier={currentTier}
        currentActiveCount={projects.filter((p) => (p.lifecycleState ?? "active") === "active").length}
        onClose={() => setIsQuotaModalOpen(false)}
        onSelectTierUpgrade={(newTier) => {
          onSelectTierUpgrade?.(newTier);
        }}
      />

      {/* Edit Project Details Dialog */}
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
                Rename and adjust your project metadata.
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
              onExportProject={() => onExportProject?.(project.id)}
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
