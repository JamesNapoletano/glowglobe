"use client";

import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { CreateProjectInput } from "@/lib/domain/project-factory";

type ProjectQuickCreateFormProps = {
  isLoading?: boolean;
  onCreateProject: (input: CreateProjectInput) => Promise<{ title: string }>;
};

export function ProjectQuickCreateForm({
  isLoading = false,
  onCreateProject,
}: ProjectQuickCreateFormProps) {
  const [preview, setPreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectInput>({
    defaultValues: {
      title: "",
      genre: "Speculative Fiction",
      description: "",
    },
  });

  const onSubmit = async (values: CreateProjectInput) => {
    const project = await onCreateProject(values);
    setPreview(`Created and selected "${project.title}".`);
    reset({
      title: "",
      genre: values.genre,
      description: values.description ?? "",
    });
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="overline" color="text.secondary">
          Quick create
        </Typography>
        <Typography variant="h3" sx={{ overflowWrap: "anywhere" }}>New project scaffold</Typography>
        <Typography color="text.secondary" sx={{ overflowWrap: "anywhere" }}>
          Create a real project in the local workspace and switch into it immediately.
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

        <TextField
          fullWidth
          label="Description"
          minRows={4}
          multiline
          placeholder="A brief summary of the story or document intent"
          {...register("description")}
        />

        <Button disabled={isSubmitting || isLoading} size="large" sx={{ alignSelf: "flex-start" }} type="submit" variant="contained">
          {isSubmitting ? "Creating..." : "Create project"}
        </Button>
      </Stack>

      {preview ? <Alert severity="success" variant="outlined" sx={{ overflowWrap: "anywhere" }}>{preview}</Alert> : null}
    </Stack>
  );
}
