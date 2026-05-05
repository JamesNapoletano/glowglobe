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
import SchemaRounded from "@mui/icons-material/SchemaRounded";
import ScienceRounded from "@mui/icons-material/ScienceRounded";
import TimelineRounded from "@mui/icons-material/TimelineRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { type MouseEvent, useState } from "react";
import {
  contrastGuardClassNames,
  getSoftSelectedListItemSx,
  getStrongSelectedListItemSx,
} from "@/components/selected-state-guardrails";
import { getWorkspaceSurfaceLabel, type WorkspaceSurface } from "@/components/workspace-surfaces";
import type { Project } from "@/lib/domain/types";

type WorkspaceSidebarProps = {
  project: Project;
  projects: Project[];
  activeProjectId: string;
  activeSurface: WorkspaceSurface;
  canCollapse: boolean;
  isCollapsed: boolean;
  onSelectProject: (projectId: string) => void;
  onSelectSurface: (surface: WorkspaceSurface) => void;
  onOpenCreateProject: () => void;
  onToggleCollapsed: () => void;
};

const surfaceIcons: Record<WorkspaceSurface, React.ReactNode> = {
  writing: <AutoStoriesRounded fontSize="small" />,
  characters: <GroupsRounded fontSize="small" />,
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
  world: "Locations, regions, planets, and settings.",
  technology: "Rules, inventions, and system logic.",
  timeline: "Chronology and sequence management.",
  corkboard: "Scene cards and planning notes.",
  lore: "Canon terms, lore notes, and research.",
  structure: "Acts, beats, subplots, and POV planning.",
};

export function WorkspaceSidebar({
  project,
  projects,
  activeProjectId,
  activeSurface,
  canCollapse,
  isCollapsed,
  onSelectProject,
  onSelectSurface,
  onOpenCreateProject,
  onToggleCollapsed,
}: WorkspaceSidebarProps) {
  const [projectMenuAnchor, setProjectMenuAnchor] = useState<null | HTMLElement>(null);
  const activeProject = projects.find((entry) => entry.id === activeProjectId) ?? project;

  const openProjectMenu = (event: MouseEvent<HTMLElement>) => {
    setProjectMenuAnchor(event.currentTarget);
  };

  const closeProjectMenu = () => {
    setProjectMenuAnchor(null);
  };

  const collapsedRailButtonSx = {
    minWidth: 0,
    width: 44,
    height: 44,
    px: 0,
    py: 0,
    borderRadius: 1.25,
    border: "1px solid",
    borderColor: "rgba(79, 98, 126, 0.18)",
    bgcolor: "rgba(250,252,255,0.92)",
    color: "text.primary",
    justifyContent: "center",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
    "&:hover": {
      bgcolor: "rgba(49,90,146,0.08)",
      borderColor: "rgba(49,90,146,0.28)",
    },
  } as const;

  return (
    <>
      <Stack sx={{ height: "100%" }} spacing={isCollapsed ? 0.9 : 1.45}>
        <Box sx={{ display: "flex", alignItems: isCollapsed ? "center" : "flex-start", justifyContent: isCollapsed ? "center" : "space-between", gap: 1, minWidth: 0 }}>
          {isCollapsed ? null : (
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="overline" color="text.secondary">
                Navigation
              </Typography>
              <Typography sx={{ mt: 0.5, fontSize: 13, color: "text.secondary", overflowWrap: "anywhere" }}>
                Project and surface controls
              </Typography>
            </Box>
          )}

          {canCollapse ? (
            <Tooltip title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"} placement="right">
              <IconButton
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                onClick={onToggleCollapsed}
                sx={{
                  borderRadius: 1.25,
                  border: "1px solid",
                  borderColor: "rgba(79, 98, 126, 0.18)",
                  bgcolor: "rgba(250,252,255,0.9)",
                  color: "text.primary",
                }}
              >
                {isCollapsed ? <ChevronRightRounded fontSize="small" /> : <ChevronLeftRounded fontSize="small" />}
              </IconButton>
            </Tooltip>
          ) : null}
        </Box>

        {isCollapsed ? (
            <Stack spacing={1} sx={{ alignItems: "center" }}>
            <Tooltip title={`Project: ${activeProject.title}`} placement="right">
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
                          width: 44,
                          height: 44,
                          px: 0,
                          py: 0,
                          justifyContent: "center",
                          borderRadius: 1.25,
                          bgcolor: selected ? undefined : "rgba(250,252,255,0.9)",
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
               <Card sx={{ width: 44, bgcolor: "rgba(248,251,255,0.96)", borderRadius: 1.75 }}>
                <CardContent sx={{ p: 1, display: "flex", justifyContent: "center" }}>
                  <HubRounded color="primary" fontSize="small" />
                </CardContent>
              </Card>
            </Tooltip>
          </Stack>
        ) : (
          <>
            <Box>
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "stretch", gap: 1, minWidth: 0 }}>
                <Typography variant="overline" color="text.secondary">
                  Projects
                </Typography>
                <Button
                  onClick={onOpenCreateProject}
                  size="small"
                  startIcon={<AddRounded />}
                  variant="outlined"
                  sx={{ borderRadius: 1.25, px: 1.35, py: 0.7, alignSelf: { xs: "flex-start", sm: "auto", xl: "flex-start" } }}
                >
                  New project
                </Button>
              </Box>

              <List disablePadding sx={{ mt: 0.9, display: "grid", gap: 0.5 }}>
                {projects.map((entry) => (
                  <ListItemButton
                    key={entry.id}
                    onClick={() => onSelectProject(entry.id)}
                    selected={entry.id === activeProjectId}
                    sx={(theme) => ({
                      ...getSoftSelectedListItemSx(theme, entry.id === activeProjectId),
                        alignItems: "flex-start",
                        px: 1.25,
                        py: 1,
                        borderRadius: 1.25,
                        bgcolor: entry.id === activeProjectId ? undefined : "rgba(250,252,255,0.9)",
                      })}
                  >
                    <Box sx={{ minWidth: 0, width: "100%" }}>
                      <Typography className={contrastGuardClassNames.primary} sx={{ fontWeight: 700, fontSize: 14, overflowWrap: "anywhere" }}>
                        {entry.title}
                      </Typography>
                      <Typography className={contrastGuardClassNames.secondary} sx={{ mt: 0.35, fontSize: 12.5, overflowWrap: "anywhere" }}>
                        {entry.genre} · {entry.status}
                      </Typography>
                    </Box>
                  </ListItemButton>
                ))}
              </List>
            </Box>

            <Card sx={{ bgcolor: "rgba(255,255,255,0.88)", borderRadius: 1.75 }}>
              <CardContent sx={{ p: 1.75 }}>
                <Typography variant="overline" color="text.secondary">
                  Workspace
                </Typography>
                <Typography variant="h3" sx={{ mt: 0.75, overflowWrap: "anywhere" }}>
                  {project.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.65, overflowWrap: "anywhere" }}>
                  A clean manuscript-first workspace with adjacent reference and planning surfaces.
                </Typography>
              </CardContent>
            </Card>

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
                          borderRadius: 1.25,
                        })}
                    >
                       <ListItemIcon sx={{ minWidth: 32, color: "inherit", pt: 0.1 }}>{surfaceIcons[surface]}</ListItemIcon>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography className={contrastGuardClassNames.primary} sx={{ fontWeight: 700, fontSize: 14, overflowWrap: "anywhere" }}>
                          {getWorkspaceSurfaceLabel(surface)}
                        </Typography>
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
                      </Box>
                    </ListItemButton>
                  );
                })}
              </List>
            </Box>

            <Card sx={{ mt: "auto", bgcolor: "rgba(248,251,255,0.92)", borderRadius: 1.75 }}>
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
          </>
        )}
      </Stack>

      <Menu anchorEl={projectMenuAnchor} open={Boolean(projectMenuAnchor)} onClose={closeProjectMenu} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "left" }}>
        {projects.map((entry) => (
          <MenuItem
            key={entry.id}
            onClick={() => {
              onSelectProject(entry.id);
              closeProjectMenu();
            }}
            selected={entry.id === activeProjectId}
          >
            {entry.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
