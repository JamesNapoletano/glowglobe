"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import DeleteForeverRounded from "@mui/icons-material/DeleteForeverRounded";
import FileDownloadRounded from "@mui/icons-material/FileDownloadRounded";
import FileUploadRounded from "@mui/icons-material/FileUploadRounded";
import FolderZipRounded from "@mui/icons-material/FolderZipRounded";
import RestoreFromTrashRounded from "@mui/icons-material/RestoreFromTrashRounded";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import Link from "next/link";
import { GlowGlobeLogo } from "@/components/glowglobe-logo";
import type { Project } from "@/lib/domain/types";
import { brandTokens } from "@/theme/brand-tokens";

import PaletteRounded from "@mui/icons-material/PaletteRounded";
import { useThemeMode } from "@/theme/theme-context";
import { TierBanner } from "@/components/tier/TierBanner";
import type { SubscriptionTier } from "@/lib/domain/user";

type ProjectSelectionScreenProps = {
  projects: Project[];
  storageMessage: string;
  userTier?: SubscriptionTier;
  onSelectProject: (projectId: string) => void;
  onOpenCreateProject: () => void;
  onOpenImportProject: () => void;
  onExportProject: (projectId: string) => void;
  onArchiveProject: (projectId: string) => Promise<void>;
  onMoveProjectToTrash: (projectId: string) => Promise<void>;
  onRestoreProject: (projectId: string) => Promise<void>;
  onPermanentlyDeleteTrashedProjects: (projectIds: string[]) => Promise<void>;
  onOpenQuotaModal?: () => void;
  onSelectTierUpgrade?: (newTier: SubscriptionTier) => void;
};

export function ProjectSelectionScreen({
  projects,
  storageMessage,
  userTier = "free",
  onSelectProject,
  onOpenCreateProject,
  onOpenImportProject,
  onExportProject,
  onArchiveProject,
  onMoveProjectToTrash,
  onRestoreProject,
  onPermanentlyDeleteTrashedProjects,
  onOpenQuotaModal,
  onSelectTierUpgrade,
}: ProjectSelectionScreenProps) {
  const theme = useTheme();
  const { themeMode, toggleThemeMode } = useThemeMode();
  const [showArchived, setShowArchived] = useState(false);
  const [showTrashed, setShowTrashed] = useState(false);
  const [trashConfirmationText, setTrashConfirmationText] = useState("");

  const activeProjects = useMemo(() => projects.filter((entry) => entry.lifecycleState === "active"), [projects]);
  const archivedProjects = useMemo(() => projects.filter((entry) => entry.lifecycleState === "archived"), [projects]);
  const trashedProjects = useMemo(() => projects.filter((entry) => entry.lifecycleState === "trashed"), [projects]);

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", py: { xs: 2, md: 3 }, px: { xs: 2, md: 3 } }}>
      <Stack spacing={3}>
        {/* Top Header Card */}
        <Card
          className="glass-panel"
          sx={{
            borderRadius: 3,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: themeMode === "glassmorphic" ? "0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.22)" : "0 10px 24px rgba(67, 52, 35, 0.06)",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              background: themeMode === "glassmorphic"
                ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, rgba(245, 158, 11, 0.08) 50%, transparent 80%)`
                : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.16)}, transparent 40%)`,
              pointerEvents: "none",
            },
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, gap: 2 }}>
              <Box>
                <GlowGlobeLogo subtitle="Manuscript & Story Workspace Hub" />
                <Typography variant="h1" sx={{ mt: 1.5, fontSize: { xs: 24, md: 32 }, fontWeight: 800 }}>
                  Select or create a manuscript workspace
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 0.75, maxWidth: 720, lineHeight: 1.65, fontSize: 15 }}>
                  Choose an existing manuscript project to launch your writing studio and story bible, start a new project, or import a JSON backup.
                </Typography>
              </Box>
              <Stack direction="row" spacing={1.25} sx={{ alignSelf: { xs: "stretch", md: "center" }, flexWrap: "wrap" }}>
                <Button
                  onClick={toggleThemeMode}
                  startIcon={<PaletteRounded />}
                  variant="outlined"
                  size="large"
                  sx={{ px: 2, py: 0.8, borderRadius: brandTokens.shape.pillRadius }}
                >
                  Theme: {themeMode === "glassmorphic" ? "Glass" : "Earthy"}
                </Button>
                <Button
                  component={Link}
                  href="/login"
                  variant="outlined"
                  size="large"
                  sx={{ px: 2, py: 0.8, borderRadius: brandTokens.shape.pillRadius }}
                >
                  Sign In
                </Button>
                <Button
                  onClick={onOpenImportProject}
                  startIcon={<FileUploadRounded />}
                  variant="outlined"
                  size="large"
                  sx={{ px: 2, py: 0.8, borderRadius: brandTokens.shape.pillRadius }}
                >
                  Import
                </Button>
                <Button
                  onClick={onOpenCreateProject}
                  startIcon={<AddRounded />}
                  variant="contained"
                  size="large"
                  sx={{ px: 2, py: 0.8, borderRadius: brandTokens.shape.pillRadius }}
                >
                  New Project
                </Button>
              </Stack>
            </Box>

            <Box sx={{ mt: 2.5 }}>
              <TierBanner
                tier={userTier}
                activeCount={activeProjects.length}
                onUpgradeClick={onOpenQuotaModal}
              />
            </Box>

            <Typography variant="caption" color="primary.light" sx={{ display: "block", mt: 2, fontWeight: 600 }}>
              {storageMessage}
            </Typography>
          </CardContent>
        </Card>

        {/* Active Projects Grid */}
        <Box sx={{ pt: "8px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.75 }}>
            <Typography variant="h2" sx={{ fontSize: 20, fontWeight: 700 }}>
              Active Projects ({activeProjects.length})
            </Typography>
          </Box>

          {activeProjects.length > 0 ? (
            <Grid container spacing={2} sx={{ pt: "12px", pb: "12px", px: "4px" }}>
              {activeProjects.map((project) => {
                const bookCount = project.books.length;
                const chapterCount = project.books.reduce((acc, book) => acc + book.chapters.length, 0);
                const sceneCount = project.books.reduce(
                  (acc, book) => acc + book.chapters.reduce((cAcc, chap) => cAcc + chap.scenes.length, 0),
                  0,
                );

                return (
                  <Grid key={project.id} size={{ xs: 12, md: 6, lg: 4 }}>
                    <Card
                      className="glass-card"
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 2.5,
                        bgcolor: "background.paper",
                        border: "1px solid",
                        borderColor: "divider",
                        transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      <CardContent sx={{ p: 2.5, display: "flex", flexDirection: "column", flex: 1 }}>
                        <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", alignItems: "center", mb: 1.25 }}>
                          {project.genre ? <Chip label={project.genre} size="small" variant="outlined" color="primary" /> : null}
                          <Chip label={project.status} size="small" variant="filled" sx={{ textTransform: "capitalize" }} />
                        </Box>

                        <Typography variant="h3" sx={{ fontSize: 19, fontWeight: 700, mb: 0.75, overflowWrap: "anywhere" }}>
                          {project.title}
                        </Typography>

                        <Typography
                          color="text.secondary"
                          sx={{
                            fontSize: 14,
                            lineHeight: 1.6,
                            mb: 2,
                            flex: 1,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {project.description || "No description provided."}
                        </Typography>

                        <Box sx={{ display: "flex", gap: 1.5, mb: 2, color: "text.secondary", fontSize: 13 }}>
                          <span>{bookCount} {bookCount === 1 ? "Book" : "Books"}</span>
                          <span>·</span>
                          <span>{chapterCount} {chapterCount === 1 ? "Chapter" : "Chapters"}</span>
                          <span>·</span>
                          <span>{sceneCount} {sceneCount === 1 ? "Scene" : "Scenes"}</span>
                        </Box>

                        <Divider sx={{ mb: 1.75 }} />

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                          <Button
                            onClick={() => onSelectProject(project.id)}
                            variant="contained"
                            size="small"
                            sx={{ px: 2, py: 0.6 }}
                          >
                            Open Workspace
                          </Button>
                          <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap" }}>
                            <Button
                              size="small"
                              color="primary"
                              onClick={() => onExportProject(project.id)}
                              startIcon={<FileDownloadRounded fontSize="small" />}
                              sx={{ fontSize: 12, px: 0.85, py: 0.4 }}
                            >
                              Export
                            </Button>
                            <Button
                              size="small"
                              color="inherit"
                              onClick={() => void onArchiveProject(project.id)}
                              startIcon={<FolderZipRounded fontSize="small" />}
                              sx={{ fontSize: 12, px: 0.85, py: 0.4 }}
                            >
                              Archive
                            </Button>
                            <Button
                              size="small"
                              color="error"
                              onClick={() => {
                                if (window.confirm(`Move "${project.title}" to trash?`)) {
                                  void onMoveProjectToTrash(project.id);
                                }
                              }}
                              startIcon={<DeleteForeverRounded fontSize="small" />}
                              sx={{ fontSize: 12, px: 0.85, py: 0.4 }}
                            >
                              Trash
                            </Button>
                          </Stack>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Alert severity="info" variant="outlined" sx={{ borderRadius: 2 }}>
              No active projects available. Click <strong>New Project</strong> above to create your first manuscript workspace or <strong>Import Project</strong> to restore a backup!
            </Alert>
          )}
        </Box>

        {/* Project Lifecycle Management Section */}
        <Card className="glass-panel" sx={{ borderRadius: 2.5, border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
              <Box>
                <Typography variant="h3" sx={{ fontSize: 16, fontWeight: 700 }}>
                  Project Lifecycle & Archive Management
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: 13, mt: 0.25 }}>
                  Manage archived projects or recover trashed workspaces.
                </Typography>
              </Box>

              <Stack direction="row" spacing={2}>
                <FormControlLabel
                  control={<Switch checked={showArchived} onChange={(e) => setShowArchived(e.target.checked)} size="small" />}
                  label={`Show archived (${archivedProjects.length})`}
                />
                <FormControlLabel
                  control={<Switch checked={showTrashed} onChange={(e) => setShowTrashed(e.target.checked)} size="small" />}
                  label={`Show trashed (${trashedProjects.length})`}
                />
              </Stack>
            </Box>

            {showArchived && (
              <Box sx={{ mt: 2 }}>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, display: "flex", alignItems: "center", gap: 0.75 }}>
                  <FolderZipRounded fontSize="small" /> Archived Projects ({archivedProjects.length})
                </Typography>
                {archivedProjects.length > 0 ? (
                  <Grid container spacing={1.5}>
                    {archivedProjects.map((project) => (
                      <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card variant="outlined" sx={{ borderRadius: 1.5, p: 1.5 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, overflowWrap: "anywhere" }}>
                            {project.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                            {project.genre || "No genre"} · Archived
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => onExportProject(project.id)}
                              startIcon={<FileDownloadRounded />}
                            >
                              Export
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<RestoreFromTrashRounded />}
                              onClick={() => void onRestoreProject(project.id)}
                            >
                              Restore
                            </Button>
                            <Button
                              size="small"
                              color="error"
                              variant="outlined"
                              onClick={() => {
                                if (window.confirm(`Move "${project.title}" to trash?`)) {
                                  void onMoveProjectToTrash(project.id);
                                }
                              }}
                            >
                              Trash
                            </Button>
                          </Stack>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No archived projects.
                  </Typography>
                )}
              </Box>
            )}

            {showTrashed && (
              <Box sx={{ mt: 2 }}>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle2" color="error" sx={{ mb: 1, display: "flex", alignItems: "center", gap: 0.75 }}>
                  <DeleteForeverRounded fontSize="small" /> Trashed Projects ({trashedProjects.length})
                </Typography>
                {trashedProjects.length > 0 ? (
                  <Stack spacing={1.5}>
                    <Grid container spacing={1.5}>
                      {trashedProjects.map((project) => (
                        <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
                          <Card variant="outlined" sx={{ borderRadius: 1.5, p: 1.5, borderColor: alpha(theme.palette.error.main, 0.4) }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, overflowWrap: "anywhere" }}>
                              {project.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                              In trash
                            </Typography>
                            <Stack direction="row" spacing={1}>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => onExportProject(project.id)}
                                startIcon={<FileDownloadRounded />}
                              >
                                Export
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<RestoreFromTrashRounded />}
                                onClick={() => void onRestoreProject(project.id)}
                              >
                                Restore
                              </Button>
                              <Button
                                size="small"
                                color="error"
                                variant="contained"
                                onClick={() => {
                                  if (window.confirm(`Permanently delete "${project.title}"? This cannot be undone.`)) {
                                    void onPermanentlyDeleteTrashedProjects([project.id]);
                                  }
                                }}
                              >
                                Delete permanently
                              </Button>
                            </Stack>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>

                    <Box sx={{ border: "1px dashed", borderColor: "error.main", borderRadius: 1.5, p: 1.5, bgcolor: alpha(theme.palette.error.main, 0.04) }}>
                      <Typography variant="caption" color="error" sx={{ fontWeight: 700, display: "block", mb: 0.5 }}>
                        EMPTY TRASH PERMANENTLY
                      </Typography>
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ alignItems: "center" }}>
                        <TextField
                          placeholder="Type DELETE"
                          size="small"
                          value={trashConfirmationText}
                          onChange={(e) => setTrashConfirmationText(e.target.value)}
                          sx={{ maxWidth: 200 }}
                        />
                        <Button
                          color="error"
                          variant="contained"
                          size="small"
                          disabled={trashConfirmationText.trim() !== "DELETE"}
                          onClick={() => {
                            void onPermanentlyDeleteTrashedProjects(trashedProjects.map((p) => p.id));
                            setTrashConfirmationText("");
                          }}
                        >
                          Empty Trash
                        </Button>
                      </Stack>
                    </Box>
                  </Stack>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Trash is empty.
                  </Typography>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
