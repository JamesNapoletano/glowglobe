"use client";

import FileDownloadRounded from "@mui/icons-material/FileDownloadRounded";
import { Alert, Box, Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { Project } from "@/lib/domain/types";
import type { UpdateProjectDetailsInput } from "@/lib/domain/project-factory";
import { useThemeMode } from "@/theme/theme-context";

type ProjectDetailsFormProps = {
  project: Project;
  isLoading?: boolean;
  onSaveProjectDetails: (input: UpdateProjectDetailsInput) => Promise<void>;
  onExportProject?: () => void;
};

const PROJECT_STATUS_OPTIONS: Project["status"][] = ["idea", "planning", "drafting", "revising", "complete"];

export function ProjectDetailsForm({
  project,
  isLoading = false,
  onSaveProjectDetails,
  onExportProject,
}: ProjectDetailsFormProps) {
  const [preview, setPreview] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProjectDetailsInput>({
    defaultValues: {
      title: project.title ?? "",
      genre: project.genre ?? "",
      description: project.description ?? "",
      status: project.status ?? "planning",
    },
  });

  useEffect(() => {
    reset({
      title: project.title ?? "",
      genre: project.genre ?? "",
      description: project.description ?? "",
      status: project.status ?? "planning",
    });
  }, [project, reset]);

  const onSubmit = async (values: UpdateProjectDetailsInput) => {
    await onSaveProjectDetails(values);
    setPreview(`Saved project details for "${values.title.trim() || project.title}".`);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="overline" color="text.secondary">
          Project settings
        </Typography>
        <Typography variant="h3" sx={{ overflowWrap: "anywhere" }}>
          Manage project metadata
        </Typography>
        <Typography color="text.secondary" sx={{ overflowWrap: "anywhere" }}>
          Update your project title, genre, summary, and progress state, or export a local JSON backup.
        </Typography>
      </Stack>

      <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} spacing={2.25}>
        <TextField
          fullWidth
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
          label="Title"
          placeholder="Project title"
          {...register("title", { required: "A project title is required." })}
        />

        <TextField fullWidth label="Genre" placeholder="Genre" {...register("genre", { required: true })} />

        <Controller
          control={control}
          name="status"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField fullWidth label="Status" select {...field}>
              {PROJECT_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <TextField
          fullWidth
          label="Description"
          minRows={4}
          multiline
          placeholder="A brief summary of the story or document intent"
          {...register("description")}
        />

        <ThemeModeSelector />

        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
          <Button disabled={isSubmitting || isLoading} size="large" type="submit" variant="contained">
            {isSubmitting ? "Saving..." : "Save project details"}
          </Button>

          {onExportProject && (
            <Button
              size="large"
              variant="outlined"
              color="primary"
              onClick={onExportProject}
              startIcon={<FileDownloadRounded />}
            >
              Export Backup (.json)
            </Button>
          )}
        </Box>
      </Stack>

      {preview ? (
        <Alert severity="success" variant="outlined" sx={{ overflowWrap: "anywhere" }}>
          {preview}
        </Alert>
      ) : null}
    </Stack>
  );
}

function ThemeModeSelector() {
  const { themeMode, setThemeMode } = useThemeMode();

  return (
    <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, p: 2, bgcolor: "background.paper" }}>
      <Typography variant="overline" color="primary.main">
        Workspace Theme Preference
      </Typography>
      <Typography variant="h4" sx={{ mt: 0.3, mb: 1 }}>
        UI Aesthetic Mode
      </Typography>
      <TextField
        fullWidth
        label="Theme"
        select
        value={themeMode}
        onChange={(e) => setThemeMode(e.target.value as "earthy" | "glassmorphic")}
      >
        <MenuItem value="glassmorphic">
          🔮 Glassmorphic Obsidian (Midnight Dark Studio & Glowing Aura)
        </MenuItem>
        <MenuItem value="earthy">
          📜 Earthy Parchment (Warm Editorial Parchment & Classic Paper)
        </MenuItem>
      </TextField>
    </Box>
  );
}
