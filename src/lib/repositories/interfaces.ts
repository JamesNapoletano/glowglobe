import type {
  Character,
  EntityId,
  Location,
  Project,
  Species,
  TimelineEvent,
} from "@/lib/domain/types";

export interface Repository<T> {
  list(): Promise<T[]>;
  getById(id: EntityId): Promise<T | undefined>;
  save(entity: T): Promise<void>;
  remove(id: EntityId): Promise<void>;
}

export type ProjectRepository = Repository<Project>;

export interface CharacterRepository extends Repository<Character> {
  listByProject(projectId: EntityId): Promise<Character[]>;
}

export interface LocationRepository extends Repository<Location> {
  listByProject(projectId: EntityId): Promise<Location[]>;
}

export interface SpeciesRepository extends Repository<Species> {
  listByProject(projectId: EntityId): Promise<Species[]>;
}

export interface TimelineRepository extends Repository<TimelineEvent> {
  listByProject(projectId: EntityId): Promise<TimelineEvent[]>;
}
