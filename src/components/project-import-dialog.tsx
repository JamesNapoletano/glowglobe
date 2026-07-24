"use client";

import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import FileUploadRounded from "@mui/icons-material/FileUploadRounded";
import WarningAmberRounded from "@mui/icons-material/WarningAmberRounded";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useState } from "react";
import { parseAndValidateProjectImport, readJsonFile } from "@/lib/domain/project-serializer";
import { validateAndSanitizeProjectImport } from "@/lib/security/project-import-guard";
import type { Project } from "@/lib/domain/types";
import { brandTokens } from "@/theme/brand-tokens";

type ProjectImportDialogProps = {
  open: boolean;
  onClose: () => void;
  onImportProject: (project: Project) => Promise<void>;
  existingProjectIds: string[];
};

export function ProjectImportDialog({
  open,
  onClose,
  onImportProject,
  existingProjectIds,
}: ProjectImportDialogProps) {
  const theme = useTheme();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [validatedProject, setValidatedProject] = useState<Project | null>(null);

  const resetState = () => {
    setSelectedFile(null);
    setIsProcessing(false);
    setIsSubmitting(false);
    setError(null);
    setWarning(null);
    setValidatedProject(null);
  };

  const handleClose = () => {
    if (isSubmitting) return;
    resetState();
    onClose();
  };

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setIsProcessing(true);
    setError(null);
    setWarning(null);
    setValidatedProject(null);

    try {
      const content = await readJsonFile(file);
      const securityCheck = validateAndSanitizeProjectImport(content);
      if (!securityCheck.success) {
        setError(securityCheck.error);
        return;
      }

      const result = parseAndValidateProjectImport(content, existingProjectIds);

      if (result.success) {
        setValidatedProject(securityCheck.sanitizedProject);
        if (result.warning) {
          setWarning(result.warning);
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to process file.";
      setError(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmImport = async () => {
    if (!validatedProject) return;

    setIsSubmitting(true);
    try {
      await onImportProject(validatedProject);
      handleClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to import project into local storage.";
      setError(message);
      setIsSubmitting(false);
    }
  };

  const bookCount = validatedProject ? validatedProject.books.length : 0;
  const chapterCount = validatedProject
    ? validatedProject.books.reduce((acc, b) => acc + b.chapters.length, 0)
    : 0;
  const sceneCount = validatedProject
    ? validatedProject.books.reduce(
        (acc, b) => acc + b.chapters.reduce((cAcc, chap) => cAcc + chap.scenes.length, 0),
        0,
      )
    : 0;
  const characterCount = validatedProject ? validatedProject.characters.length : 0;
  const entityCount = validatedProject
    ? validatedProject.sociums.length +
      validatedProject.locations.length +
      validatedProject.technologyEntries.length +
      validatedProject.timelineEvents.length +
      validatedProject.glossaryEntries.length +
      validatedProject.species.length
    : 0;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>Import Manuscript Project</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2.5}>
          <Typography variant="body2" color="text.secondary">
            Select a GlowGlobe project backup JSON file (`.json`) to import into your workspace. All manuscript content, story bible entities, and continuity links will be restored.
          </Typography>

          {/* File Picker Zone */}
          <Box
            component="label"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justify: "center",
              p: 3,
              borderRadius: 2,
              border: "2px dashed",
              borderColor: validatedProject ? "success.main" : error ? "error.main" : "divider",
              bgcolor: validatedProject
                ? alpha(theme.palette.success.main, 0.04)
                : error
                ? alpha(theme.palette.error.main, 0.04)
                : alpha(theme.palette.action.hover, 0.4),
              cursor: "pointer",
              transition: "all 180ms ease-in-out",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: alpha(theme.palette.primary.main, 0.04),
              },
            }}
          >
            <input
              type="file"
              accept=".json,application/json"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  void handleFileSelect(file);
                }
              }}
            />
            <FileUploadRounded sx={{ fontSize: 36, color: "primary.main", mb: 1 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {selectedFile ? selectedFile.name : "Choose or drag a project JSON file"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Supports `.json` GlowGlobe backup files
            </Typography>
          </Box>

          {isProcessing && (
            <Stack direction="row" spacing={1.5} sx={{ py: 2, alignItems: "center", justifyContent: "center" }}>
              <CircularProgress size={20} />
              <Typography variant="body2" color="text.secondary">
                Validating project structure...
              </Typography>
            </Stack>
          )}

          {error && (
            <Alert severity="error" variant="outlined" sx={{ borderRadius: 1.5 }}>
              {error}
            </Alert>
          )}

          {warning && (
            <Alert severity="warning" variant="outlined" icon={<WarningAmberRounded />} sx={{ borderRadius: 1.5 }}>
              {warning}
            </Alert>
          )}

          {validatedProject && !isProcessing && (
            <Card variant="outlined" sx={{ borderRadius: 2, bgcolor: "background.paper", borderColor: "success.main" }}>
              <CardContent sx={{ p: 2 }}>
                <Stack spacing={1.5}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
                    <Box>
                      <Chip
                        icon={<CheckCircleOutlineRounded fontSize="small" />}
                        label="Valid Project Schema"
                        size="small"
                        color="success"
                        variant="filled"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="h3" sx={{ fontSize: 18, fontWeight: 700, overflowWrap: "anywhere" }}>
                        {validatedProject.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Genre: {validatedProject.genre || "Unspecified"} · Status: {validatedProject.status}
                      </Typography>
                    </Box>
                  </Box>

                  {validatedProject.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13, lineHeight: 1.5 }}>
                      {validatedProject.description}
                    </Typography>
                  )}

                  <Divider />

                  <Grid container spacing={1}>
                    <Grid size={4}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                        Manuscript
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {chapterCount} chapters ({sceneCount} scenes)
                      </Typography>
                    </Grid>
                    <Grid size={4}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                        Characters
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {characterCount} profiles
                      </Typography>
                    </Grid>
                    <Grid size={4}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                        World & Lore
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {entityCount} entries
                      </Typography>
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} disabled={isSubmitting} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={() => void handleConfirmImport()}
          disabled={!validatedProject || isSubmitting || isProcessing}
          variant="contained"
          sx={{ borderRadius: brandTokens.shape.pillRadius }}
        >
          {isSubmitting ? "Importing..." : "Import Project"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
