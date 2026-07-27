"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import CategoryRounded from "@mui/icons-material/CategoryRounded";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import FileDownloadRounded from "@mui/icons-material/FileDownloadRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import HubRounded from "@mui/icons-material/HubRounded";
import LibraryBooksRounded from "@mui/icons-material/LibraryBooksRounded";
import MapRounded from "@mui/icons-material/MapRounded";
import SwapHorizRounded from "@mui/icons-material/SwapHorizRounded";
import SchemaRounded from "@mui/icons-material/SchemaRounded";
import ScienceRounded from "@mui/icons-material/ScienceRounded";
import TimelineRounded from "@mui/icons-material/TimelineRounded";
import PaletteRounded from "@mui/icons-material/PaletteRounded";
import LockRounded from "@mui/icons-material/LockRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  contrastGuardClassNames,
  getStrongSelectedListItemSx,
} from "@/components/selected-state-guardrails";
import { GlowGlobeLogo } from "@/components/glowglobe-logo";
import { getWorkspaceSurfaceLabel, type WorkspaceSurface } from "@/components/workspace-surfaces";
import type { Project } from "@/lib/domain/types";
import { checkProjectCreationQuota } from "@/lib/services/tier-service";
import type { SubscriptionTier } from "@/lib/domain/user";
import { useThemeMode } from "@/theme/theme-context";

type WorkspaceSidebarProps = {
  projects: Project[];
  activeProjectId: string;
  activeSurface: WorkspaceSurface;
  activeProjectTitle?: string | null;
  canCollapse: boolean;
  isCollapsed: boolean;
  onSelectSurface: (surface: WorkspaceSurface) => void;
  onOpenCreateProject: () => void;
  onSwitchProject: () => void;
  onExportProject?: (projectId: string) => void;
  onToggleCollapsed: () => void;
  userTier?: SubscriptionTier;
};

import TuneRounded from "@mui/icons-material/TuneRounded";

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
  settings: <TuneRounded fontSize="small" />,
};

export function WorkspaceSidebar({
  projects,
  activeProjectId,
  activeSurface,
  activeProjectTitle,
  canCollapse,
  isCollapsed,
  onSelectSurface,
  onOpenCreateProject,
  onSwitchProject,
  onExportProject,
  onToggleCollapsed,
  userTier,
}: WorkspaceSidebarProps) {
  const { themeMode, toggleThemeMode } = useThemeMode();
  const activeProject = projects.find((entry) => entry.id === activeProjectId) ?? null;
  const projectTitle = activeProjectTitle ?? activeProject?.title ?? "Active Project";

  const quota = checkProjectCreationQuota(userTier ?? "free", projects, "active");
  const isQuotaExceeded = !quota.allowed;

  const collapsedRailButtonSx = (theme: any) => ({
    minWidth: 0,
    width: 42,
    height: 42,
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
      bgcolor: alpha(theme.palette.primary.main, 0.08),
      borderColor: alpha(theme.palette.primary.main, 0.28),
    },
  });

  const projectActionButtonSx = {
    width: "100%",
    minWidth: 0,
    flex: "1 1 0",
    justifyContent: "center",
    px: 0.75,
    py: 0.5,
    fontSize: 11.5,
    "& .MuiButton-startIcon": {
      mr: 0.4,
      ml: -0.2,
    },
  } as const;

  return (
    <Stack sx={{ height: "100%", minHeight: 0 }} spacing={isCollapsed ? 0.9 : 1.25}>
      {/* Sidebar Header & Collapse Toggle */}
      <Box sx={{ display: "flex", alignItems: isCollapsed ? "center" : "flex-start", justifyContent: isCollapsed ? "center" : "space-between", gap: 1, minWidth: 0 }}>
        {isCollapsed ? (
          <GlowGlobeLogo compact showWordmark={false} />
        ) : (
          <Box sx={{ minWidth: 0 }}>
            <GlowGlobeLogo subtitle="Manuscript Workspace" />
          </Box>
        )}

        {canCollapse ? (
          <Tooltip title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"} placement="right">
            <IconButton
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={onToggleCollapsed}
              sx={{
                width: 34,
                height: 34,
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

      {/* Collapsed Rail vs Expanded View */}
      {isCollapsed ? (
        <Stack spacing={1} sx={{ alignItems: "center", flex: 1, minHeight: 0, overflowY: "auto", pr: 0 }}>
          <Tooltip title={`Switch theme (Current: ${themeMode === "sunset" ? "Sunset Glow" : themeMode === "earthy" ? "Earthy Parchment" : "Glass Obsidian"})`} placement="right">
            <IconButton aria-label="Switch theme" onClick={toggleThemeMode} sx={collapsedRailButtonSx}>
              <PaletteRounded fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title={`Switch project (Current: ${projectTitle})`} placement="right">
            <IconButton aria-label="Switch project" onClick={onSwitchProject} sx={collapsedRailButtonSx}>
              <SwapHorizRounded fontSize="small" />
            </IconButton>
          </Tooltip>

          {onExportProject && activeProjectId && (
            <Tooltip title="Export project JSON backup" placement="right">
              <IconButton
                aria-label="Export project"
                onClick={() => onExportProject(activeProjectId)}
                sx={collapsedRailButtonSx}
              >
                <FileDownloadRounded fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title={isQuotaExceeded ? `Project limit reached (${quota.currentCount}/${quota.maxAllowed}). Click to upgrade.` : "New project"} placement="right">
            <IconButton aria-label="New project" onClick={onOpenCreateProject} sx={collapsedRailButtonSx}>
              {isQuotaExceeded ? <LockRounded fontSize="small" color="warning" /> : <AddRounded fontSize="small" />}
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
                      width: 42,
                      height: 42,
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
        </Stack>
      ) : (
        <Stack spacing={1.25} sx={{ flex: 1, minHeight: 0, overflowY: "auto", pt: "6px", pb: "6px", px: "4px", pr: 0.35 }}>
          {/* Active Project Header Card */}
          <Card className="glass-card" sx={{ bgcolor: "background.paper", borderRadius: 2.5, border: "1px solid", borderColor: "divider" }}>
            <CardContent sx={{ p: 1.5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 0.5, mb: 0.35 }}>
                <Typography variant="overline" color="primary.main">
                  Active Project
                </Typography>
                <Tooltip title={`Current Theme: ${themeMode === "sunset" ? "Sunset Glow" : themeMode === "earthy" ? "Earthy Parchment" : "Glass Obsidian"}`}>
                  <Chip
                    icon={<PaletteRounded style={{ fontSize: 13 }} />}
                    label={themeMode === "sunset" ? "Sunset" : themeMode === "earthy" ? "Earthy" : "Glass"}
                    onClick={toggleThemeMode}
                    size="small"
                    variant="outlined"
                    sx={{ cursor: "pointer", fontSize: 11, height: 22 }}
                  />
                </Tooltip>
              </Box>
              <Typography variant="h3" sx={{ fontSize: 16, fontWeight: 700, overflowWrap: "anywhere" }}>
                {projectTitle}
              </Typography>
              {activeProject?.genre || activeProject?.status ? (
                <Typography color="text.secondary" sx={{ mt: 0.25, fontSize: 12, overflowWrap: "anywhere" }}>
                  {[activeProject.genre, activeProject.status].filter(Boolean).join(" · ")}
                </Typography>
              ) : null}

              <Stack direction="row" spacing={0.5} sx={{ mt: 1.2 }}>
                <Button
                  onClick={onSwitchProject}
                  size="small"
                  startIcon={<SwapHorizRounded fontSize="small" />}
                  variant="outlined"
                  sx={projectActionButtonSx}
                >
                  Switch
                </Button>

                {onExportProject && activeProjectId && (
                  <Button
                    onClick={() => onExportProject(activeProjectId)}
                    size="small"
                    startIcon={<FileDownloadRounded fontSize="small" />}
                    variant="outlined"
                    sx={projectActionButtonSx}
                  >
                    Export
                  </Button>
                )}

                <Tooltip title={isQuotaExceeded ? `Project limit reached (${quota.currentCount}/${quota.maxAllowed}). Click to upgrade.` : "New project"}>
                  <Button
                    onClick={onOpenCreateProject}
                    size="small"
                    startIcon={isQuotaExceeded ? <LockRounded fontSize="small" color="warning" /> : <AddRounded fontSize="small" />}
                    variant="outlined"
                    sx={projectActionButtonSx}
                  >
                    New
                  </Button>
                </Tooltip>
              </Stack>
            </CardContent>
          </Card>

          {/* Work Surfaces Navigation */}
          <Box>
            <Typography variant="overline" color="text.secondary" sx={{ px: 0.5 }}>
              Work Surfaces
            </Typography>
            <List disablePadding sx={{ mt: 0.75, display: "grid", gap: 0.45 }}>
              {(Object.keys(surfaceIcons) as WorkspaceSurface[]).map((surface) => {
                const selected = surface === activeSurface;
                return (
                  <ListItemButton
                    key={surface}
                    onClick={() => onSelectSurface(surface)}
                    selected={selected}
                    sx={(theme) => ({
                      ...getStrongSelectedListItemSx(theme, selected),
                      px: 1.25,
                      py: 0.75,
                      alignItems: "center",
                      borderRadius: 2,
                    })}
                  >
                    <ListItemIcon sx={{ minWidth: 30, color: "inherit" }}>
                      {surfaceIcons[surface]}
                    </ListItemIcon>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography className={contrastGuardClassNames.primary} sx={{ fontWeight: selected ? 700 : 500, fontSize: 14, overflowWrap: "anywhere" }}>
                        {getWorkspaceSurfaceLabel(surface)}
                      </Typography>
                    </Box>
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        </Stack>
      )}
    </Stack>
  );
}
