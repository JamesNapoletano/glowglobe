"use client";

import CloseRounded from "@mui/icons-material/CloseRounded";
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
import { useTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { ContextPanel } from "@/components/context-panel";
import { ManuscriptViewport } from "@/components/manuscript-viewport";
import { ProjectQuickCreateForm } from "@/components/project-quick-create-form";
import { WorkspaceSurfaceContent, type SurfaceSelectionKey, type SurfaceSelections } from "@/components/workspace-surface-content";
import { WorkspaceSidebar } from "@/components/workspace-sidebar";
import { getWorkspaceSurfaceLabel, type WorkspaceSurface } from "@/components/workspace-surfaces";
import type { Project, RichTextDocument } from "@/lib/domain/types";
import type { CreateProjectInput, SceneLinkPayload } from "@/lib/domain/project-factory";

const SIDEBAR_COLLAPSED_STORAGE_KEY = "glowglobe.sidebarCollapsed";

type AppShellProps = {
  project: Project;
  projects: Project[];
  activeProjectId: string;
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
  onSelectChapter: (chapterId: string) => void;
  onSelectScene: (chapterId: string, sceneId: string) => void;
  onCreateChapter: () => Promise<void>;
  onCreateScene: (chapterId: string) => Promise<void>;
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
  onSelectChapter,
  onSelectScene,
  onCreateChapter,
  onCreateScene,
  onCreateSurfaceEntry,
  onDeleteSurfaceEntry,
  onSaveSurfaceEntry,
  onUpdateSceneLinks,
  onUpdateSceneMetadata,
  onUpdateSceneDocument,
}: AppShellProps) {
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [hasLoadedSidebarPreference, setHasLoadedSidebarPreference] = useState(false);
  const theme = useTheme();
  const isDesktopSidebarLayout = useMediaQuery(theme.breakpoints.up("xl"));
  const showInspector = activeSurface === "writing";
  const shouldCollapseSidebar = isDesktopSidebarLayout && isSidebarCollapsed;

  const activeBook = project.books[0];
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
      <Box component="main" sx={{ minHeight: "100vh", p: { xs: 1.5, xl: 2.25 } }}>
        <Stack spacing={{ xs: 1.5, xl: 2 }} sx={{ maxWidth: 1780, minHeight: "calc(100vh - 24px)", mx: "auto" }}>
            <Card
              sx={{
                borderRadius: 3,
                bgcolor: "rgba(255,255,255,0.82)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, rgba(49,90,146,0.10), transparent 32%)",
                pointerEvents: "none",
              },
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 2.5, xl: 2.8 } }}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", xl: "row" }, gap: { xs: 1.75, xl: 2.2 }, justifyContent: "space-between" }}>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Box sx={{ display: "flex", gap: 1.2, alignItems: "center", flexWrap: "wrap" }}>
                    <Typography variant="overline" color="text.secondary">
                      GlowGlobe
                    </Typography>
                    <Box sx={{ borderRadius: 999, bgcolor: "rgba(49,90,146,0.12)", color: "primary.main", px: 1.35, py: 0.5, fontSize: 12, fontWeight: 700, textTransform: "capitalize", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45)" }}>
                      {project.status}
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, alignItems: { xs: "flex-start", lg: "center" }, flexDirection: { xs: "column", lg: "row" }, mt: 0.9, minWidth: 0 }}>
                    <Typography variant="h1" sx={{ minWidth: 0, overflowWrap: "anywhere" }}>{project.title}</Typography>
                    <InfoPill label="Surface" value={getWorkspaceSurfaceLabel(activeSurface)} />
                  </Box>
                  <Typography color="text.secondary" sx={{ mt: 0.95, maxWidth: 860, lineHeight: 1.72, fontSize: 15, overflowWrap: "anywhere" }}>
                    {project.description}
                  </Typography>
                </Box>

                <Stack spacing={0.9} sx={{ alignItems: { xs: "flex-start", xl: "flex-end" }, maxWidth: { xl: 520 }, minWidth: 0, width: "100%" }}>
                  <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", justifyContent: { xs: "flex-start", xl: "flex-end" }, minWidth: 0, width: "100%" }}>
                    <InfoPill label="Current book" value={project.books[0]?.title ?? "Untitled"} />
                    <InfoPill label="Genre" value={project.genre} />
                    <InfoPill label="Mode" value={showInspector ? "Writing + inspector" : "Expanded surface"} />
                  </Box>
                  <Typography variant="body2" color="success.main" sx={{ minWidth: 0, overflowWrap: "anywhere", textAlign: { xs: "left", xl: "right" } }}>
                    {storageMessage}
                  </Typography>
                </Stack>
              </Box>
            </CardContent>
          </Card>

          <Grid container spacing={1.5} sx={{ flex: 1 }}>
            <Grid size={{ xs: 12, xl: shouldCollapseSidebar ? 2 : 3 }}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.78)",
                  transition: "all 180ms ease",
                }}
              >
                <CardContent sx={{ p: shouldCollapseSidebar ? 1.1 : 1.7, height: "100%" }}>
                  <WorkspaceSidebar
                    activeProjectId={activeProjectId}
                    activeSurface={activeSurface}
                    canCollapse={isDesktopSidebarLayout}
                    isCollapsed={shouldCollapseSidebar}
                    onOpenCreateProject={() => setIsCreateProjectOpen(true)}
                    onSelectProject={onSelectProject}
                    onSelectSurface={onSelectSurface}
                    onToggleCollapsed={() => setIsSidebarCollapsed((current) => !current)}
                    project={project}
                    projects={projects}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, xl: showInspector ? (shouldCollapseSidebar ? 7 : 6) : shouldCollapseSidebar ? 10 : 9 }}>
              <Card sx={{ height: "100%", borderRadius: 3, bgcolor: "rgba(255,255,255,0.92)" }}>
                <CardContent sx={{ p: { xs: 1.7, xl: 1.9 }, height: "100%" }}>
                  {activeSurface === "writing" ? (
                    <ManuscriptViewport
                      activeChapterId={activeChapterId}
                      activeSceneId={activeSceneId}
                      onCreateChapter={onCreateChapter}
                      onCreateScene={onCreateScene}
                      onSelectChapter={onSelectChapter}
                      onSelectScene={onSelectScene}
                      onUpdateSceneDocument={onUpdateSceneDocument}
                      project={project}
                    />
                  ) : (
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
                  )}
                </CardContent>
              </Card>
            </Grid>

            {showInspector ? (
              <Grid size={{ xs: 12, xl: 3 }}>
                <Card sx={{ height: "100%", borderRadius: 3, bgcolor: "rgba(255,255,255,0.9)" }}>
                  <CardContent sx={{ p: { xs: 1.7, xl: 1.9 }, height: "100%" }}>
                    <ContextPanel
                      activeChapterId={activeChapterId}
                      activeScene={activeScene}
                      onUpdateSceneLinks={onUpdateSceneLinks}
                      onUpdateSceneMetadata={onUpdateSceneMetadata}
                      project={project}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ) : null}
          </Grid>
        </Stack>
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
    </>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "rgba(250, 252, 255, 0.96)",
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
