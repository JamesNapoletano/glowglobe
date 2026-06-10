import type { WorkspaceSurface } from "@/components/workspace-surfaces";
import type { Project } from "@/lib/domain/types";

export type WorkspaceRouteState = {
  projectId?: string | null;
  surface?: WorkspaceSurface | null;
  chapterId?: string | null;
  sceneId?: string | null;
};

export type ResolvedWorkspaceRoute = {
  project: Project | null;
  surface: WorkspaceSurface;
  chapterId: string | null;
  sceneId: string | null;
  canonicalPath: string | null;
};

type WritingSelection = {
  chapterId?: string | null;
  sceneId?: string | null;
};

export function getProjectSurfacePath(projectId: string, surface: Exclude<WorkspaceSurface, "writing">): string {
  return `/projects/${projectId}/${surface}`;
}

export function getProjectWritingPath(projectId: string): string {
  return `/projects/${projectId}/writing`;
}

export function getProjectWritingScenePath(projectId: string, chapterId: string, sceneId: string): string {
  return `${getProjectWritingPath(projectId)}/${chapterId}/${sceneId}`;
}

export function getFirstProjectSceneSelection(project: Project): { chapterId: string; sceneId: string } | null {
  const firstChapter = project.books[0]?.chapters[0];
  const firstScene = firstChapter?.scenes[0];

  if (!firstChapter || !firstScene) {
    return null;
  }

  return {
    chapterId: firstChapter.id,
    sceneId: firstScene.id,
  };
}

export function resolveProjectWritingSelection(project: Project, selection?: WritingSelection): { chapterId: string; sceneId: string } | null {
  const chapters = project.books[0]?.chapters ?? [];

  if (selection?.chapterId && selection.sceneId) {
    const requestedChapter = chapters.find((chapter) => chapter.id === selection.chapterId);
    const requestedScene = requestedChapter?.scenes.find((scene) => scene.id === selection.sceneId);

    if (requestedChapter && requestedScene) {
      return {
        chapterId: requestedChapter.id,
        sceneId: requestedScene.id,
      };
    }
  }

  if (selection?.chapterId) {
    const requestedChapter = chapters.find((chapter) => chapter.id === selection.chapterId);
    const firstScene = requestedChapter?.scenes[0];

    if (requestedChapter && firstScene) {
      return {
        chapterId: requestedChapter.id,
        sceneId: firstScene.id,
      };
    }
  }

  return getFirstProjectSceneSelection(project);
}

export function getProjectNavigationPath(
  project: Project,
  surface: WorkspaceSurface,
  selection?: WritingSelection,
): string {
  if (surface !== "writing") {
    return getProjectSurfacePath(project.id, surface);
  }

  const writingSelection = resolveProjectWritingSelection(project, selection);

  if (!writingSelection) {
    return getProjectWritingPath(project.id);
  }

  return getProjectWritingScenePath(project.id, writingSelection.chapterId, writingSelection.sceneId);
}

export function resolveWorkspaceRoute(projects: Project[], routeState: WorkspaceRouteState): ResolvedWorkspaceRoute {
  const activeProjects = projects.filter((project) => project.lifecycleState === "active");
  const hasExplicitProjectSelection = Boolean(routeState.projectId);
  const requestedProject = activeProjects.find((project) => project.id === routeState.projectId) ?? null;
  const project = hasExplicitProjectSelection ? requestedProject : null;
  const surface = routeState.surface ?? "writing";

  if (!project) {
    return {
      project: null,
      surface,
      chapterId: null,
      sceneId: null,
      canonicalPath: hasExplicitProjectSelection ? "/" : null,
    };
  }

  if (surface !== "writing") {
    return {
      project,
      surface,
      chapterId: null,
      sceneId: null,
      canonicalPath: getProjectSurfacePath(project.id, surface),
    };
  }

  const writingSelection = resolveProjectWritingSelection(project, {
    chapterId: routeState.chapterId,
    sceneId: routeState.sceneId,
  });

  return {
    project,
    surface,
    chapterId: writingSelection?.chapterId ?? null,
    sceneId: writingSelection?.sceneId ?? null,
    canonicalPath: writingSelection ? getProjectNavigationPath(project, "writing", writingSelection) : getProjectWritingPath(project.id),
  };
}
