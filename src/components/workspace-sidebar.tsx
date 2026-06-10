"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import CategoryRounded from "@mui/icons-material/CategoryRounded";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import HubRounded from "@mui/icons-material/HubRounded";
import LibraryBooksRounded from "@mui/icons-material/LibraryBooksRounded";
import MapRounded from "@mui/icons-material/MapRounded";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import SwapHorizRounded from "@mui/icons-material/SwapHorizRounded";
import SchemaRounded from "@mui/icons-material/SchemaRounded";
import ScienceRounded from "@mui/icons-material/ScienceRounded";
import TimelineRounded from "@mui/icons-material/TimelineRounded";
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControlLabel,
  Card,
  CardContent,
  Switch,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { type MouseEvent, useState } from "react";
import {
  contrastGuardClassNames,
  getSoftSelectedListItemSx,
  getStrongSelectedListItemSx,
} from "@/components/selected-state-guardrails";
import { GlowGlobeLogo } from "@/components/glowglobe-logo";
import { getWorkspaceSurfaceLabel, type WorkspaceSurface } from "@/components/workspace-surfaces";
import type { Project } from "@/lib/domain/types";
import { brandTokens } from "@/theme/brand-tokens";

type WorkspaceSidebarProps = {
  projects: Project[];
  activeProjectId: string;
  activeSurface: WorkspaceSurface;
  activeProjectTitle?: string | null;
  variant?: "default" | "writing";
  canCollapse: boolean;
  isCollapsed: boolean;
  onSelectProject: (projectId: string) => void;
  onSelectSurface: (surface: WorkspaceSurface) => void;
  onOpenCreateProject: () => void;
  onArchiveProject: (projectId: string) => Promise<void>;
  onMoveProjectToTrash: (projectId: string) => Promise<void>;
  onRestoreProject: (projectId: string) => Promise<void>;
  onPermanentlyDeleteTrashedProjects: (projectIds: string[]) => Promise<void>;
  onToggleCollapsed: () => void;
};

const surfaceIcons: Record<WorkspaceSurface, React.ReactNode> = {
  writing: <AutoStoriesRounded fontSize="small" />,
  characters: <GroupsRounded fontSize="small" />,
  sociums: <HubRounded fontSize="small" />,
  world: <MapRounded fontSize="small" />,
  technology: <ScienceRounded fontSize="small" />,
  timeline: <TimelineRounded fontSize="small" />,
  corkboard: <CategoryRounded fontSize="small" />,
  lore: <LibraryBooksRounded fontSize="small" />,
  structure: <SchemaRounded fontSize="small" />,
};

const surfaceDescriptions: Record<WorkspaceSurface, string> = {
  writing: "Focused manuscript drafting and scene work.",
  characters: "Profiles, arcs, and relationship context.",
  sociums: "Factions, guilds, religions, kingdoms, and rival groups.",
  world: "Locations, regions, planets, and settings.",
  technology: "Rules, inventions, and system logic.",
  timeline: "Chronology and sequence management.",
  corkboard: "Scene cards and planning notes.",
  lore: "Canon terms, lore notes, and research.",
  structure: "Acts, beats, subplots, and POV planning.",
};

export function WorkspaceSidebar({
  projects,
  activeProjectId,
  activeSurface,
  activeProjectTitle,
  variant = "default",
  canCollapse,
  isCollapsed,
  onSelectProject,
  onSelectSurface,
  onOpenCreateProject,
  onArchiveProject,
  onMoveProjectToTrash,
  onRestoreProject,
  onPermanentlyDeleteTrashedProjects,
  onToggleCollapsed,
}: WorkspaceSidebarProps) {
  const [projectMenuAnchor, setProjectMenuAnchor] = useState<null | HTMLElement>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [showTrashed, setShowTrashed] = useState(false);
  const [trashConfirmationText, setTrashConfirmationText] = useState("");
  const activeProject = projects.find((entry) => entry.id === activeProjectId) ?? null;
  const isWritingVariant = variant === "writing";
  const activeProjects = projects.filter((entry) => entry.lifecycleState === "active");
  const archivedProjects = projects.filter((entry) => entry.lifecycleState === "archived");
  const trashedProjects = projects.filter((entry) => entry.lifecycleState === "trashed");
  const visibleProjects = [
    ...activeProjects,
    ...(showArchived ? archivedProjects : []),
    ...(showTrashed ? trashedProjects : []),
  ];

  const openProjectMenu = (event: MouseEvent<HTMLElement>) => {
    setProjectMenuAnchor(event.currentTarget);
  };

  const closeProjectMenu = () => {
    setProjectMenuAnchor(null);
  };

  const collapsedRailButtonSx = {
    minWidth: 0,
    width: 64,
    height: 44,
    px: 0,
    py: 0,
    borderRadius: 999,
    border: "1px solid",
    borderColor: "divider",
    bgcolor: "background.paper",
    color: "text.primary",
    justifyContent: "center",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
    "&:hover": {
      bgcolor: alpha(brandTokens.palette.primary.main, 0.08),
      borderColor: alpha(brandTokens.palette.primary.main, 0.28),
    },
  } as const;

  const projectActionButtonSx = {
    width: "100%",
    minWidth: 0,
    flex: "1 1 0",
    justifyContent: "center",
    px: 1.35,
    py: 0.7,
  } as const;

  const dangerActionButtonSx = {
    ...projectActionButtonSx,
  } as const;

  return (
    <>
      <Stack sx={{ height: "100%", minHeight: 0 }} spacing={isCollapsed ? 0.9 : isWritingVariant ? 1.15 : 1.45}>
        <Box sx={{ display: "flex", alignItems: isCollapsed ? "center" : "flex-start", justifyContent: isCollapsed ? "center" : "space-between", gap: 1, minWidth: 0 }}>
          {isCollapsed ? <GlowGlobeLogo compact showWordmark={false} /> : (
            <Box sx={{ minWidth: 0 }}>
              <GlowGlobeLogo subtitle={isWritingVariant ? "Writing workspace" : "Project and surface controls"} />
            </Box>
          )}

          {canCollapse ? (
            <Tooltip title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"} placement="right">
              <IconButton
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                onClick={onToggleCollapsed}
                sx={{
                  borderRadius: 999,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  color: "text.primary",
                }}
              >
                {isCollapsed ? <ChevronRightRounded fontSize="small" /> : <ChevronLeftRounded fontSize="small" />}
              </IconButton>
            </Tooltip>
          ) : null}
        </Box>

        {isCollapsed ? (
            <Stack spacing={1} sx={{ alignItems: "center", flex: 1, minHeight: 0, overflowY: "auto", pr: 0.25 }}>
            <Tooltip title={`Project: ${activeProjectTitle ?? activeProject?.title ?? "No active project"}`} placement="right">
              <IconButton aria-label="Open project switcher" onClick={openProjectMenu} sx={collapsedRailButtonSx}>
                <MoreHorizRounded fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="New project" placement="right">
              <IconButton aria-label="Create new project" onClick={onOpenCreateProject} sx={collapsedRailButtonSx}>
                <AddRounded fontSize="small" />
              </IconButton>
            </Tooltip>

            <List disablePadding sx={{ display: "grid", gap: 0.6 }}>
              {(Object.keys(surfaceIcons) as WorkspaceSurface[]).map((surface) => {
                const selected = surface === activeSurface;
                return (
                  <Tooltip key={surface} title={getWorkspaceSurfaceLabel(surface)} placement="right">
                    <ListItemButton
                      aria-label={getWorkspaceSurfaceLabel(surface)}
                      onClick={() => onSelectSurface(surface)}
                      selected={selected}
                      sx={(theme) => ({
                        ...getStrongSelectedListItemSx(theme, selected),
                          minWidth: 0,
                          width: 64,
                          height: 44,
                          px: 0,
                          py: 0,
                          justifyContent: "center",
                          borderRadius: 999,
                          bgcolor: selected ? undefined : "background.paper",
                        })}
                    >
                      <ListItemIcon sx={{ minWidth: 0, color: "inherit", justifyContent: "center" }}>
                        {surfaceIcons[surface]}
                      </ListItemIcon>
                    </ListItemButton>
                  </Tooltip>
                );
              })}
            </List>

            <Tooltip title={`Now editing: ${getWorkspaceSurfaceLabel(activeSurface)}`} placement="right">
               <Card sx={{ width: 64, bgcolor: "background.paper", borderRadius: 999 }}>
                <CardContent sx={{ p: 1, display: "flex", justifyContent: "center" }}>
                  <HubRounded color="primary" fontSize="small" />
                </CardContent>
              </Card>
            </Tooltip>
          </Stack>
        ) : (
          <>
            <Stack spacing={1.2} sx={{ flex: 1, minHeight: 0, overflowY: "auto", pr: 0.35 }}>
            <Box>
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "stretch", gap: 1, minWidth: 0 }}>
                <Typography variant="overline" color="text.secondary">
                  Projects
                </Typography>
                <Stack spacing={0.8} sx={{ alignItems: "stretch", width: "100%" }}>
                  <Button
                    onClick={openProjectMenu}
                    size="small"
                    startIcon={<SwapHorizRounded />}
                    variant="outlined"
                    sx={projectActionButtonSx}
                  >
                    Switch project
                  </Button>
                  <Button
                    onClick={onOpenCreateProject}
                    size="small"
                    startIcon={<AddRounded />}
                    variant="outlined"
                    sx={projectActionButtonSx}
                  >
                    New project
                  </Button>
                </Stack>
              </Box>

              <List disablePadding sx={{ mt: 0.9, display: "grid", gap: 0.5 }}>
                {visibleProjects.map((entry) => (
                  <ListItemButton
                    key={entry.id}
                    onClick={() => onSelectProject(entry.id)}
                    selected={entry.id === activeProjectId}
                    sx={(theme) => ({
                      ...getSoftSelectedListItemSx(theme, entry.id === activeProjectId),
                        alignItems: "flex-start",
                        px: 1.25,
                        py: 1,
                        borderRadius: 2,
                        bgcolor: entry.id === activeProjectId ? undefined : "background.paper",
                      })}
                  >
                    <Box sx={{ minWidth: 0, width: "100%" }}>
                      <Typography className={contrastGuardClassNames.primary} sx={{ fontWeight: 700, fontSize: 14, overflowWrap: "anywhere" }}>
                        {entry.title}
                      </Typography>
                      <Typography className={contrastGuardClassNames.secondary} sx={{ mt: 0.35, fontSize: 12.5, overflowWrap: "anywhere" }}>
                        {entry.genre} · {entry.status} · {entry.lifecycleState}
                      </Typography>
                    </Box>
                  </ListItemButton>
                ))}
              </List>

              {isWritingVariant ? null : (
                <Stack spacing={0.25} sx={{ mt: 0.8 }}>
                  <FormControlLabel
                    control={<Switch checked={showArchived} onChange={(event) => setShowArchived(event.target.checked)} size="small" />}
                    label="Show archived"
                  />
                  <FormControlLabel
                    control={<Switch checked={showTrashed} onChange={(event) => setShowTrashed(event.target.checked)} size="small" />}
                    label="Show trashed"
                  />
                </Stack>
              )}
              {!activeProjects.length ? (
                <Alert severity="info" sx={{ mt: 1 }} variant="outlined">
                  No active projects. Restore one or create a new project.
                </Alert>
              ) : null}
            </Box>

            {!isWritingVariant && (showArchived || showTrashed) && (archivedProjects.length || trashedProjects.length) ? (
               <Card sx={{ bgcolor: alpha(brandTokens.palette.background.panel, 0.92), borderRadius: 2 }}>
                <CardContent sx={{ p: 1.5 }}>
                  <Typography variant="overline" color="text.secondary">
                    Lifecycle controls
                  </Typography>
                  <Stack spacing={1} sx={{ mt: 0.8 }}>
                    {showArchived
                      ? archivedProjects.map((entry) => (
                          <Stack key={`archived-${entry.id}`} spacing={0.6} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, p: 1 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: 13, overflowWrap: "anywhere" }}>{entry.title}</Typography>
                            <Stack direction="row" spacing={0.7} sx={{ flexWrap: "wrap" }}>
                              <Button size="small" variant="outlined" sx={projectActionButtonSx} onClick={() => void onRestoreProject(entry.id)}>
                                Restore
                              </Button>
                              <Button
                                color="error"
                                size="small"
                                variant="outlined"
                                sx={projectActionButtonSx}
                                onClick={() => {
                                  if (window.confirm(`Move \"${entry.title}\" to trash?`)) {
                                    void onMoveProjectToTrash(entry.id);
                                  }
                                }}
                              >
                                Trash
                              </Button>
                            </Stack>
                          </Stack>
                        ))
                      : null}
                    {showTrashed
                      ? trashedProjects.map((entry) => (
                          <Stack key={`trashed-${entry.id}`} spacing={0.6} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, p: 1 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: 13, overflowWrap: "anywhere" }}>{entry.title}</Typography>
                            <Stack direction="row" spacing={0.7} sx={{ flexWrap: "wrap" }}>
                              <Button size="small" variant="outlined" sx={projectActionButtonSx} onClick={() => void onRestoreProject(entry.id)}>
                                Restore
                              </Button>
                              <Button
                                color="error"
                                size="small"
                                variant="contained"
                                sx={dangerActionButtonSx}
                                onClick={() => {
                                  if (window.confirm(`Permanently delete \"${entry.title}\"? This cannot be undone.`)) {
                                    void onPermanentlyDeleteTrashedProjects([entry.id]);
                                  }
                                }}
                              >
                                Delete permanently
                              </Button>
                            </Stack>
                          </Stack>
                        ))
                      : null}

                    {showTrashed && trashedProjects.length ? (
                      <Stack spacing={0.75} sx={{ mt: 0.5, p: 1, border: "1px dashed", borderColor: "divider", borderRadius: 2 }}>
                        <Typography variant="overline" color="text.secondary">
                          Permanent delete
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: 12.5, lineHeight: 1.45 }}>
                          Type <strong>DELETE</strong> to empty trash permanently.
                        </Typography>
                        <TextField
                          fullWidth
                          onChange={(event) => setTrashConfirmationText(event.target.value)}
                          placeholder="Type DELETE"
                          size="small"
                          value={trashConfirmationText}
                        />
                        <Button
                          color="error"
                          disabled={trashConfirmationText.trim() !== "DELETE"}
                          onClick={() => {
                            void onPermanentlyDeleteTrashedProjects(trashedProjects.map((project) => project.id));
                            setTrashConfirmationText("");
                          }}
                          size="small"
                          sx={dangerActionButtonSx}
                          variant="contained"
                        >
                          Empty trash permanently
                        </Button>
                      </Stack>
                    ) : null}
                  </Stack>
                </CardContent>
              </Card>
            ) : null}

            {isWritingVariant ? null : <Divider />}

            {!isWritingVariant && activeProject?.lifecycleState === "active" ? (
              <Stack direction="row" spacing={0.75} sx={{ flexWrap: "wrap" }}>
                <Button color="warning" size="small" variant="outlined" sx={projectActionButtonSx} onClick={() => void onArchiveProject(activeProject.id)}>
                  Archive current
                </Button>
                <Button
                  color="error"
                  size="small"
                  sx={projectActionButtonSx}
                  variant="outlined"
                  onClick={() => {
                    if (window.confirm(`Move \"${activeProject.title}\" to trash?`)) {
                      void onMoveProjectToTrash(activeProject.id);
                    }
                  }}
                >
                  Trash current
                </Button>
              </Stack>
            ) : null}

            {isWritingVariant ? null : (
              <Card sx={{ bgcolor: alpha(brandTokens.palette.background.panel, 0.92), borderRadius: 2 }}>
                <CardContent sx={{ p: 1.75 }}>
                  <Typography variant="overline" color="text.secondary">
                    Workspace
                  </Typography>
                  <Typography variant="h3" sx={{ mt: 0.75, overflowWrap: "anywhere" }}>
                    {activeProject?.title ?? "No active project"}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.65, overflowWrap: "anywhere" }}>
                    A clean manuscript-first workspace with adjacent reference and planning surfaces.
                  </Typography>
                </CardContent>
              </Card>
            )}

            <Box>
              <Typography variant="overline" color="text.secondary">
                Work surfaces
              </Typography>
              <List disablePadding sx={{ mt: 0.85, display: "grid", gap: 0.45 }}>
                {(Object.keys(surfaceIcons) as WorkspaceSurface[]).map((surface) => {
                  const selected = surface === activeSurface;
                  return (
                    <ListItemButton
                      key={surface}
                      onClick={() => onSelectSurface(surface)}
                      selected={selected}
                      sx={(theme) => ({
                        ...getStrongSelectedListItemSx(theme, selected),
                          px: 1.05,
                          py: 0.82,
                          alignItems: "flex-start",
                          borderRadius: 2,
                        })}
                    >
                       <ListItemIcon sx={{ minWidth: 32, color: "inherit", pt: 0.1 }}>{surfaceIcons[surface]}</ListItemIcon>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography className={contrastGuardClassNames.primary} sx={{ fontWeight: 700, fontSize: 14, overflowWrap: "anywhere" }}>
                          {getWorkspaceSurfaceLabel(surface)}
                        </Typography>
                        {isWritingVariant ? null : (
                          <Typography
                            className={contrastGuardClassNames.secondary}
                            sx={{
                              mt: 0.25,
                              fontSize: 12,
                              lineHeight: 1.45,
                              overflowWrap: "anywhere",
                            }}
                          >
                            {surfaceDescriptions[surface]}
                          </Typography>
                        )}
                      </Box>
                    </ListItemButton>
                  );
                })}
              </List>
            </Box>

            {isWritingVariant ? null : (
              <Card sx={{ mt: "auto", bgcolor: alpha(brandTokens.palette.background.panelMuted, 0.92), borderRadius: 2 }}>
                <CardContent sx={{ p: 1.75 }}>
                  <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                    <HubRounded color="primary" fontSize="small" sx={{ mt: 0.25 }} />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="overline" color="text.secondary">
                        Now editing
                      </Typography>
                      <Typography variant="h3" sx={{ mt: 0.5, overflowWrap: "anywhere" }}>
                        {getWorkspaceSurfaceLabel(activeSurface)}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mt: 0.9, lineHeight: 1.65, overflowWrap: "anywhere" }}>
                        Writing keeps the inspector open. Other surfaces expand the canvas for cleaner page-level work.
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            )}
            </Stack>
          </>
        )}
      </Stack>

      <Menu
        anchorEl={projectMenuAnchor}
        open={Boolean(projectMenuAnchor)}
        onClose={closeProjectMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{ paper: { sx: { maxWidth: 320 } } }}
      >
        {visibleProjects.map((entry) => (
          <MenuItem
            key={entry.id}
            onClick={() => {
              onSelectProject(entry.id);
              closeProjectMenu();
            }}
            selected={entry.id === activeProjectId}
            sx={{ whiteSpace: "normal", overflowWrap: "anywhere", lineHeight: 1.35, alignItems: "flex-start" }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 14, overflowWrap: "anywhere" }}>{entry.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25, overflowWrap: "anywhere" }}>
                {entry.genre} · {entry.status} · {entry.lifecycleState}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
