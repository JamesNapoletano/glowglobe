"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Grid,
  List,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  contrastGuardClassNames,
  getSoftSelectedListItemSx,
  getStrongSelectedListItemSx,
} from "@/components/selected-state-guardrails";
import { SceneBodyEditor } from "@/components/scene-body-editor";
import type { Project, RichTextDocument } from "@/lib/domain/types";

type ManuscriptViewportProps = {
  project: Project;
  activeBookTitle?: string | null;
  activeChapterId: string | null;
  activeSceneId: string | null;
  onSelectChapter: (chapterId: string) => void;
  onSelectScene: (chapterId: string, sceneId: string) => void;
  onCreateChapter: () => Promise<void>;
  onCreateScene: (chapterId: string) => Promise<void>;
  onDeleteChapter: (chapterId: string) => Promise<void>;
  onDeleteScene: (chapterId: string, sceneId: string) => Promise<void>;
  onUpdateSceneDocument: (chapterId: string, sceneId: string, document: RichTextDocument) => Promise<void>;
};

export function ManuscriptViewport({
  project,
  activeBookTitle,
  activeChapterId,
  activeSceneId,
  onSelectChapter,
  onSelectScene,
  onCreateChapter,
  onCreateScene,
  onDeleteChapter,
  onDeleteScene,
  onUpdateSceneDocument,
}: ManuscriptViewportProps) {
  const activeBook = project.books[0];
  const chapters = activeBook?.chapters ?? [];
  const activeChapter = activeChapterId ? chapters.find((chapter) => chapter.id === activeChapterId) ?? null : null;
  const scenes = activeChapter?.scenes ?? [];
  const activeScene = activeSceneId ? scenes.find((scene) => scene.id === activeSceneId) ?? null : null;
  const sceneCount = chapters.reduce((count, chapter) => count + chapter.scenes.length, 0);

  return (
    <Stack spacing={1.5} sx={{ height: "100%", minHeight: 0 }}>
      <Box sx={{ pb: 1.35, borderBottom: "1px solid", borderColor: "divider" }}>
        <Typography variant="overline" color="text.secondary">
          Writing Studio
        </Typography>
        <Typography variant="h2" sx={{ mt: 0.55, overflowWrap: "anywhere" }}>
          {project.title}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.35, fontSize: 15, overflowWrap: "anywhere" }}>
          Surface: {activeBookTitle ?? activeBook?.title ?? "Writing Studio"}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.9, maxWidth: 880, lineHeight: 1.72, fontSize: 15, overflowWrap: "anywhere", whiteSpace: "pre-wrap" }}>
          {project.description ?? "Select or create a scene to begin drafting in the manuscript workspace."}
        </Typography>
      </Box>

      <Grid container spacing={1.5} sx={{ flex: 1, minHeight: 0 }}>
        <Grid size={{ xs: 12, md: 4.5, lg: 4 }} sx={{ minHeight: 0, height: "100%", display: "flex" }}>
          <Box sx={{ flex: 1, minHeight: 0, height: "100%", maxHeight: { xs: "none", md: "calc(100vh - 200px)" }, display: "flex", flexDirection: "column", gap: 1.2, pt: "6px", pb: "6px", px: "4px" }}>
            <Box className="glass-card" sx={{ borderRadius: 2.5, border: "1px solid", borderColor: "divider", bgcolor: "background.panel", p: 1.5, flexShrink: 0 }}>
              <Typography variant="overline" color="primary.main">
                Writing studio
              </Typography>
              <Stack spacing={0.85} sx={{ mt: 1.1 }}>
                <MetricCard label="Book" value={activeBookTitle ?? activeBook?.title ?? "—"} />
                <MetricCard label="Active chapter" value={activeChapter?.title ?? "—"} />
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 0.85 }}>
                  <MetricCard label="Chapters" value={String(chapters.length)} />
                  <MetricCard label="Scenes" value={String(sceneCount)} />
                </Box>
              </Stack>
            </Box>

            <Box className="glass-card" sx={{ flex: 1, minHeight: 0, height: 0, border: "1px solid", borderColor: "divider", bgcolor: "background.panelMuted", borderRadius: 2.5, p: 1.5, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1.25, alignItems: { xs: "flex-start", sm: "center" }, flexDirection: { xs: "column", sm: "row" }, flexShrink: 0 }}>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="overline" color="text.secondary">
                    Structure
                  </Typography>
                  <Typography variant="h3" sx={{ mt: 0.5 }}>
                    Scene navigator
                  </Typography>
                </Box>
                <Button
                  onClick={() => void onCreateChapter()}
                  size="small"
                  startIcon={<AddRounded fontSize="small" />}
                  sx={{ bgcolor: "background.paper", borderColor: "divider", px: 1.2, py: 0.35 }}
                  variant="outlined"
                >
                  Chapter
                </Button>
              </Box>

              <Box
                sx={(theme) => ({
                  mt: 1.5,
                  minHeight: 0,
                  height: 0,
                  flex: 1,
                  overflowY: "auto",
                  overflowX: "hidden",
                  pt: "6px",
                  pb: "6px",
                  px: "4px",
                  "&::-webkit-scrollbar": {
                    width: 6,
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    borderRadius: 999,
                    backgroundColor: alpha(theme.palette.text.primary, 0.2),
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.5),
                    },
                  },
                })}
              >
                <List disablePadding sx={{ display: "grid", gap: 0.8, pt: "4px", pb: "6px", px: "2px" }}>
                  {chapters.map((chapter) => {
                    const isActiveChapter = chapter.id === activeChapter?.id;
                    const canDeleteChapter = chapters.length > 1;

                    return (
                      <Box
                        key={chapter.id}
                        sx={(theme) => ({
                          minWidth: 0,
                          borderRadius: 2,
                          p: 0.55,
                          bgcolor: isActiveChapter ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.background.paper, 0.62),
                          border: isActiveChapter ? `1px solid ${alpha(theme.palette.primary.main, 0.28)}` : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                        })}
                      >
                        <Box sx={{ display: "flex", alignItems: "stretch", gap: 0.35 }}>
                          <ListItemButton
                            onClick={() => onSelectChapter(chapter.id)}
                            selected={isActiveChapter}
                            sx={(theme) => ({
                              ...getSoftSelectedListItemSx(theme, isActiveChapter),
                              px: 1.05,
                              py: 0.9,
                              alignItems: "flex-start",
                              borderRadius: 2,
                              position: "relative",
                              bgcolor: isActiveChapter ? undefined : alpha(theme.palette.background.paper, 0.85),
                              flex: 1,
                              minWidth: 0,
                            })}
                          >
                            <Box sx={{ minWidth: 0, width: "100%" }}>
                              <Typography
                                className={contrastGuardClassNames.primary}
                                sx={{
                                  fontWeight: 700,
                                  fontSize: 13.5,
                                  lineHeight: 1.35,
                                  wordBreak: "break-word",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {chapter.title}
                              </Typography>
                              <Typography className={contrastGuardClassNames.secondary} sx={{ mt: 0.25, fontSize: 12, fontWeight: isActiveChapter ? 600 : 500 }}>
                                {chapter.scenes.length} scenes
                              </Typography>
                            </Box>
                          </ListItemButton>

                          {canDeleteChapter ? (
                            <IconButton
                              aria-label={`Delete ${chapter.title}`}
                              color="error"
                              onClick={(event) => {
                                event.stopPropagation();
                                void onDeleteChapter(chapter.id);
                              }}
                              size="small"
                              sx={{ alignSelf: "center" }}
                            >
                              <DeleteOutlineRounded fontSize="small" />
                            </IconButton>
                          ) : null}
                        </Box>

                        {isActiveChapter ? (
                          <Stack spacing={0.7} sx={{ mt: 0.7, px: 0.35, pb: 0.2 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 0.8, minWidth: 0 }}>
                              <Typography variant="overline" color="text.secondary">
                                Scene list
                              </Typography>
                              <Button
                                onClick={() => void onCreateScene(chapter.id)}
                                size="small"
                                startIcon={<AddRounded fontSize="small" />}
                                sx={(theme) => ({ minWidth: 0, px: 1, py: 0.25, fontSize: 12, bgcolor: alpha(theme.palette.primary.main, 0.1) })}
                                variant="text"
                              >
                                Add scene
                              </Button>
                            </Box>

                            {chapter.scenes.length ? (
                              <List
                                disablePadding
                                sx={(theme) => ({
                                  display: "grid",
                                  gap: 0.45,
                                  maxHeight: 280,
                                  overflowY: "auto",
                                  overflowX: "hidden",
                                  pt: "6px",
                                  pb: "6px",
                                  px: "4px",
                                  pr: 0.35,
                                  "&::-webkit-scrollbar": {
                                    width: 4,
                                  },
                                  "&::-webkit-scrollbar-thumb": {
                                    borderRadius: 999,
                                    backgroundColor: alpha(theme.palette.text.primary, 0.2),
                                  },
                                })}
                              >
                                {chapter.scenes.map((scene) => {
                                  const isActiveScene = scene.id === activeScene?.id;
                                  const canDeleteScene = chapter.scenes.length > 1;

                                  return (
                                    <Box
                                      key={scene.id}
                                      sx={(theme) => ({
                                        ...getStrongSelectedListItemSx(theme, isActiveScene),
                                        ml: 0.2,
                                        borderRadius: 999,
                                        bgcolor: isActiveScene ? undefined : alpha(theme.palette.background.paper, 0.88),
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.35,
                                      })}
                                    >
                                      <ListItemButton
                                        onClick={() => onSelectScene(chapter.id, scene.id)}
                                        selected={isActiveScene}
                                        sx={{
                                          px: 1,
                                          py: 0.8,
                                          borderRadius: 999,
                                          minWidth: 0,
                                          flex: 1,
                                        }}
                                      >
                                        <Typography
                                          className={contrastGuardClassNames.primary}
                                          sx={{
                                            fontSize: 13.25,
                                            lineHeight: 1.34,
                                            fontWeight: isActiveScene ? 700 : 500,
                                            wordBreak: "break-word",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                          }}
                                        >
                                          {scene.title}
                                        </Typography>
                                      </ListItemButton>

                                      {canDeleteScene ? (
                                        <IconButton
                                          aria-label={`Delete ${scene.title}`}
                                          color="error"
                                          onClick={(event) => {
                                            event.stopPropagation();
                                            void onDeleteScene(chapter.id, scene.id);
                                          }}
                                          size="small"
                                          sx={{ mr: 0.35 }}
                                        >
                                          <DeleteOutlineRounded fontSize="small" />
                                        </IconButton>
                                      ) : null}
                                    </Box>
                                  );
                                })}
                              </List>
                            ) : (
                              <Typography color="text.secondary" sx={{ fontSize: 13, lineHeight: 1.5, px: 0.2 }}>
                                No scenes yet. Add one to start drafting in this chapter.
                              </Typography>
                            )}
                          </Stack>
                        ) : null}
                      </Box>
                    );
                  })}
                </List>

                {!chapters.length ? (
                  <Typography color="text.secondary" sx={{ mt: 1.1, fontSize: 13.5 }}>
                    Create a chapter to start shaping the manuscript structure.
                  </Typography>
                ) : null}
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 7.5, lg: 8 }} sx={{ minHeight: 0, height: "100%", display: "flex" }}>
          <Box sx={{ flex: 1, minHeight: 0, height: "100%", display: "flex", flexDirection: "column" }}>
            <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden", pt: "6px", pb: "6px", px: "4px", pr: 0.5, display: "flex", flexDirection: "column", gap: 1.25 }}>
              <Box className="glass-card" sx={{ borderRadius: 2.5, border: "1px solid", borderColor: "divider", bgcolor: "background.paper", p: 2 }}>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", gap: 1.5, alignItems: { xs: "flex-start", lg: "center" } }}>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="overline" color="primary.main">
                      Draft Scene
                    </Typography>
                    <Typography variant="h2" sx={{ mt: 0.45, overflowWrap: "anywhere" }}>
                      {activeScene?.title ?? "Untitled scene"}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 0.75, lineHeight: 1.7, fontSize: 14.5, overflowWrap: "anywhere" }}>
                      {activeScene?.summary ?? "Select or create a scene to begin drafting in the manuscript workspace."}
                    </Typography>
                  </Box>
                  <Chip
                    label="Autosave on blur"
                    size="small"
                    sx={{ bgcolor: "background.panel", borderColor: "divider", maxWidth: "100%", ".MuiChip-label": { overflowWrap: "anywhere" } }}
                    variant="outlined"
                  />
                </Box>
              </Box>

              <Box className="glass-card" sx={{ borderRadius: 2.5, border: "1px solid", borderColor: "divider", bgcolor: "background.manuscript", p: { xs: 1.2, xl: 1.35 }, flexShrink: 0 }}>
                <SceneBodyEditor
                  onSave={(document) =>
                    activeChapter && activeScene ? onUpdateSceneDocument(activeChapter.id, activeScene.id, document) : Promise.resolve()
                  }
                  scene={activeScene ?? undefined}
                />
              </Box>

              <Grid container spacing={1.25}>
                <Grid size={{ xs: 12, xl: 8 }}>
                  <Box className="glass-card" sx={{ height: "100%", borderRadius: 2.5, border: "1px solid", borderColor: "divider", bgcolor: "background.panel", p: 1.6 }}>
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        Scene note
                      </Typography>
                      <Typography color="text.secondary" sx={{ mt: 0.8, lineHeight: 1.7, fontSize: 14 }}>
                        {((activeScene?.excerpt ?? []).length
                          ? activeScene?.excerpt?.[0]
                          : "This scene is ready for local-first drafting. Shape the prose in the center and use the inspector when continuity details matter.") ?? ""}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, xl: 4 }}>
                  <Box className="glass-card" sx={{ height: "100%", borderRadius: 2.5, border: "1px solid", borderColor: "divider", bgcolor: "background.panel", p: 1.6 }}>
                    <Typography variant="overline" color="text.secondary">
                      Session cues
                    </Typography>
                    <Stack component="ul" spacing={0.55} sx={{ mt: 0.85, pl: 2.05, color: "text.secondary", minWidth: 0 }}>
                      <Typography component="li" variant="body2">Stay in the draft for sentence-level work.</Typography>
                      <Typography component="li" variant="body2">Use the left navigator to change structural position.</Typography>
                      <Typography component="li" variant="body2">Use the inspector to manage continuity and links.</Typography>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ bgcolor: "background.manuscript", border: "1px solid", borderColor: "divider", borderRadius: 2, p: 1.15 }}>
        <Typography variant="overline" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h3" sx={{ mt: 0.45, overflowWrap: "anywhere", fontSize: "1.12rem", color: "text.primary" }}>
          {value}
        </Typography>
    </Box>
  );
}
