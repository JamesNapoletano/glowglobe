import type { Project } from "@/lib/domain/types";
import type { ProjectRepository } from "@/lib/repositories/interfaces";

export class InMemoryProjectRepository implements ProjectRepository {
  constructor(private readonly projects: Project[] = []) {}

  async list(): Promise<Project[]> {
    return this.projects;
  }

  async getById(id: string): Promise<Project | undefined> {
    return this.projects.find((project) => project.id === id);
  }

  async save(entity: Project): Promise<void> {
    const existingIndex = this.projects.findIndex((project) => project.id === entity.id);

    if (existingIndex >= 0) {
      this.projects.splice(existingIndex, 1, entity);
      return;
    }

    this.projects.push(entity);
  }

  async remove(id: string): Promise<void> {
    const existingIndex = this.projects.findIndex((project) => project.id === id);

    if (existingIndex >= 0) {
      this.projects.splice(existingIndex, 1);
    }
  }
}
