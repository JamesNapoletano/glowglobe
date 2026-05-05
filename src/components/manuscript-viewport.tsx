"use client";

import AddRounded from "@mui/icons-material/AddRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  contrastGuardClassNames,
  getSoftSelectedListItemSx,
  getStrongSelectedListItemSx,
} from "@/components/selected-state-guardrails";
import { SceneBodyEditor } from "@/components/scene-body-editor";
import type { Project, RichTextDocument } from "@/lib/domain/types";

type ManuscriptViewportProps = {
  project: Project;
  activeChapterId: string | null;
  activeSceneId: string | null;
  onSelectChapter: (chapterId: string) => void;
  onSelectScene: (chapterId: string, sceneId: string) => void;
  onCreateChapter: () => Promise<void>;
  onCreateScene: (chapterId: string) => Promise<void>;
  onUpdateSceneDocument: (chapterId: string, sceneId: string, document: RichTextDocument) => Promise<void>;
};

export function ManuscriptViewport({
  project,
  activeChapterId,
  activeSceneId,
  onSelectChapter,
  onSelectScene,
  onCreateChapter,
  onCreateScene,
  onUpdateSceneDocument,
}: ManuscriptViewportProps) {
  const activeBook = project.books[0];
  const chapters = activeBook?.chapters ?? [];
  const activeChapter = activeChapterId ? chapters.find((chapter) => chapter.id === activeChapterId) ?? null : null;
  const scenes = activeChapter?.scenes ?? [];
  const activeScene = activeSceneId ? scenes.find((scene) => scene.id === activeSceneId) ?? null : null;
  const sceneCount = chapters.reduce((count, chapter) => count + chapter.scenes.length, 0);

  return (
    <Stack spacing={2} sx={{ height: "100%" }}>
      <Card
        sx={{
          bgcolor: "rgba(255,255,255,0.98)",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 18px 38px rgba(20,32,51,0.06)",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(49,90,146,0.10), transparent 36%)",
            pointerEvents: "none",
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2.1, xl: 2.4 } }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", xl: "row" }, gap: { xs: 2, xl: 2.5 }, justifyContent: "space-between" }}>
            <Box sx={{ maxWidth: 920, minWidth: 0, flex: 1 }}>
              <Typography variant="overline" color="text.secondary">
                Writing Studio
              </Typography>
              <Typography variant="h2" sx={{ mt: 0.75, overflowWrap: "anywhere" }}>
                {activeScene?.title ?? "Untitled scene"}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.72, fontSize: 15, overflowWrap: "anywhere" }}>
                {activeScene?.summary ?? "Select or create a scene to begin drafting in the manuscript workspace."}
              </Typography>
            </Box>

            <Grid container spacing={1} sx={{ minWidth: 0, width: "100%", maxWidth: 500 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <MetricCard label="Book" value={activeBook?.title ?? "—"} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <MetricCard label="Active chapter" value={activeChapter?.title ?? "—"} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <MetricCard label="Chapters" value={String(chapters.length)} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <MetricCard label="Scenes" value={String(sceneCount)} />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={2} sx={{ flex: 1 }}>
        <Grid size={{ xs: 12, xl: 3 }}>
          <Card
            sx={{
              height: "100%",
              bgcolor: "rgba(249,252,255,0.96)",
              boxShadow: "0 16px 34px rgba(20,32,51,0.05)",
              border: "1px solid rgba(79, 98, 126, 0.12)",
            }}
          >
            <CardContent sx={{ p: 1.55, height: "100%" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1.25, alignItems: { xs: "flex-start", sm: "center" }, flexDirection: { xs: "column", sm: "row" } }}>
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
                  startIcon={<AddRounded />}
                  sx={{ bgcolor: "rgba(255,255,255,0.82)", borderColor: "rgba(79, 98, 126, 0.18)" }}
                  variant="outlined"
                >
                  Chapter
                </Button>
              </Box>

              <Box
                sx={{
                  mt: 1.5,
                  minHeight: 0,
                  height: "calc(100% - 56px)",
                  overflowY: "auto",
                  pr: 0.35,
                }}
              >
                <Typography variant="overline" color="text.secondary">
                  Chapters and scenes
                </Typography>
                <List disablePadding sx={{ mt: 0.85, display: "grid", gap: 0.8 }}>
                  {chapters.map((chapter) => {
                    const isActiveChapter = chapter.id === activeChapter?.id;

                    return (
                      <Box
                        key={chapter.id}
                        sx={{
                          minWidth: 0,
                          borderRadius: 2,
                          p: 0.55,
                          bgcolor: isActiveChapter ? "rgba(49,90,146,0.08)" : "rgba(255,255,255,0.42)",
                          border: isActiveChapter ? "1px solid rgba(49,90,146,0.18)" : "1px solid rgba(79, 98, 126, 0.08)",
                        }}
                      >
                        <ListItemButton
                          onClick={() => onSelectChapter(chapter.id)}
                          selected={isActiveChapter}
                          sx={(theme) => ({
                            ...getSoftSelectedListItemSx(theme, isActiveChapter),
                            px: 1.05,
                            py: 0.9,
                            alignItems: "flex-start",
                            borderRadius: 1.5,
                            position: "relative",
                            bgcolor: isActiveChapter ? undefined : "rgba(255,255,255,0.86)",
                            "&::before": isActiveChapter
                              ? {
                                  content: '""',
                                  position: "absolute",
                                  left: 0,
                                  top: 8,
                                  bottom: 8,
                                  width: 3,
                                  borderRadius: 999,
                                  backgroundColor: "primary.main",
                                }
                              : undefined,
                          })}
                        >
                          <Box sx={{ minWidth: 0, width: "100%", pl: isActiveChapter ? 0.45 : 0 }}>
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

                        {isActiveChapter ? (
                          <Stack spacing={0.7} sx={{ mt: 0.7, px: 0.35, pb: 0.2 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 0.8, minWidth: 0 }}>
                              <Typography variant="overline" color="text.secondary">
                                Scene list
                              </Typography>
                              <Button
                                onClick={() => void onCreateScene(chapter.id)}
                                size="small"
                                sx={{ minWidth: 0, px: 1, bgcolor: "rgba(49,90,146,0.08)" }}
                                variant="text"
                              >
                                + Add scene
                              </Button>
                            </Box>

                            {chapter.scenes.length ? (
                              <List disablePadding sx={{ display: "grid", gap: 0.45 }}>
                                {chapter.scenes.map((scene) => {
                                  const isActiveScene = scene.id === activeScene?.id;

                                  return (
                                    <ListItemButton
                                      key={scene.id}
                                      onClick={() => onSelectScene(chapter.id, scene.id)}
                                      selected={isActiveScene}
                                      sx={(theme) => ({
                                        ...getStrongSelectedListItemSx(theme, isActiveScene),
                                        px: 1,
                                        py: 0.8,
                                        ml: 0.2,
                                        borderRadius: 1.4,
                                        bgcolor: isActiveScene ? undefined : "rgba(255,255,255,0.9)",
                                      })}
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
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, xl: 9 }}>
          <Card sx={{ height: "100%", bgcolor: "rgba(255,255,255,0.95)", boxShadow: "0 18px 38px rgba(20,32,51,0.05)" }}>
            <CardContent sx={{ p: { xs: 2, xl: 2.2 } }}>
              <Stack spacing={2}>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent: "space-between", gap: 1.5, alignItems: { xs: "flex-start", lg: "center" } }}>
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Draft
                    </Typography>
                    <Typography variant="h2" sx={{ mt: 0.55 }}>
                      Focused writing canvas
                    </Typography>
                  </Box>
                  <Chip label="Autosave on blur" size="small" sx={{ bgcolor: "rgba(248,251,255,0.92)" }} variant="outlined" />
                </Box>

                <SceneBodyEditor
                  onSave={(document) =>
                    activeChapter && activeScene ? onUpdateSceneDocument(activeChapter.id, activeScene.id, document) : Promise.resolve()
                  }
                  scene={activeScene ?? undefined}
                />

                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12, xl: 8 }}>
                    <Card sx={{ bgcolor: "rgba(248,251,255,0.90)", border: "1px solid rgba(79, 98, 126, 0.10)" }}>
                      <CardContent sx={{ p: 1.8 }}>
                        <Typography variant="overline" color="text.secondary">
                          Scene note
                        </Typography>
                        <Typography color="text.secondary" sx={{ mt: 0.9, lineHeight: 1.7, fontSize: 14 }}>
                          {((activeScene?.excerpt ?? []).length
                            ? activeScene?.excerpt?.[0]
                            : "This scene is ready for local-first drafting. Shape the prose in the center and use the inspector when continuity details matter.") ?? ""}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid size={{ xs: 12, xl: 4 }}>
                    <Card sx={{ bgcolor: "rgba(248,251,255,0.90)", border: "1px solid rgba(79, 98, 126, 0.10)" }}>
                      <CardContent sx={{ p: 1.8 }}>
                        <Typography variant="overline" color="text.secondary">
                          Session cues
                        </Typography>
                        <Stack component="ul" spacing={0.55} sx={{ mt: 0.9, pl: 2.05, color: "text.secondary" }}>
                          <Typography component="li" variant="body2">Stay in the draft for sentence-level work.</Typography>
                          <Typography component="li" variant="body2">Use the left navigator to change structural position.</Typography>
                          <Typography component="li" variant="body2">Use the inspector to manage continuity and links.</Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card sx={{ bgcolor: "rgba(247,250,255,0.9)", border: "1px solid rgba(79, 98, 126, 0.10)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }}>
      <CardContent sx={{ p: 1.45 }}>
        <Typography variant="overline" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h3" sx={{ mt: 0.7, overflowWrap: "anywhere" }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
