import { WorkspaceRoot } from "@/components/workspace-root";

export default async function ProjectWritingScenePage({
  params,
}: {
  params: Promise<{ projectId: string; chapterId: string; sceneId: string }>;
}) {
  const { projectId, chapterId, sceneId } = await params;

  return <WorkspaceRoot routeState={{ projectId, surface: "writing", chapterId, sceneId }} />;
}
