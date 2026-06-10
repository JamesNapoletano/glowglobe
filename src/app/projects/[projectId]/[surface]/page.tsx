import { notFound } from "next/navigation";
import { WorkspaceRoot } from "@/components/workspace-root";
import { isNonWritingWorkspaceSurface } from "@/components/workspace-surfaces";

export default async function ProjectSurfacePage({
  params,
}: {
  params: Promise<{ projectId: string; surface: string }>;
}) {
  const { projectId, surface } = await params;

  if (!isNonWritingWorkspaceSurface(surface)) {
    notFound();
  }

  return <WorkspaceRoot routeState={{ projectId, surface }} />;
}
