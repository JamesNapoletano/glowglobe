"use client";

import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Scene } from "@/lib/domain/types";

type SceneMetadataFormValues = {
  title: string;
  summary: string;
};

type SceneMetadataFormProps = {
  scene?: Scene;
  onSave: (values: SceneMetadataFormValues) => Promise<void>;
};

export function SceneMetadataForm({ scene, onSave }: SceneMetadataFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SceneMetadataFormValues>({
    defaultValues: {
      title: scene?.title ?? "",
      summary: scene?.summary ?? "",
    },
  });

  useEffect(() => {
    reset({
      title: scene?.title ?? "",
      summary: scene?.summary ?? "",
    });
  }, [reset, scene?.id, scene?.summary, scene?.title]);

  if (!scene) {
    return (
      <Alert severity="info" variant="outlined">
        <Typography variant="body2">Select a scene to edit its metadata.</Typography>
      </Alert>
    );
  }

  return (
    <Stack spacing={2.5}>
      <Stack spacing={1}>
        <Typography variant="overline" color="text.secondary">
          Scene details
        </Typography>
        <Typography variant="h3">Edit active scene</Typography>
        <Typography color="text.secondary">
          Keep the title and summary aligned with the current draft without leaving the writing flow.
        </Typography>
      </Stack>

      <Stack component="form" onSubmit={handleSubmit(onSave)} spacing={2.25}>
        <TextField label="Scene title" {...register("title", { required: true })} />
        <TextField label="Scene summary" minRows={5} multiline {...register("summary", { required: true })} />
        <Button disabled={isSubmitting} sx={{ alignSelf: "flex-start" }} type="submit" variant="contained">
          {isSubmitting ? "Saving..." : "Save scene details"}
        </Button>
      </Stack>
    </Stack>
  );
}
