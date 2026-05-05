export type EntityId = string;

export type ProjectStatus = "idea" | "planning" | "drafting" | "revising" | "complete";

export type RichTextNode = {
  type: string;
  text?: string;
  attrs?: Record<string, string | number | boolean>;
  content?: RichTextNode[];
};

export type RichTextDocument = {
  type: "doc";
  version: 1;
  content: RichTextNode[];
};

export interface BaseEntity {
  id: EntityId;
  createdAt: string;
  updatedAt: string;
}

export interface Scene extends BaseEntity {
  title: string;
  summary: string;
  excerpt: string[];
  editorDocument: RichTextDocument;
  characterIds: EntityId[];
  locationIds: EntityId[];
  technologyEntryIds: EntityId[];
  timelineEventIds: EntityId[];
  plotThreadIds: EntityId[];
  glossaryEntryIds: EntityId[];
}

export interface Chapter extends BaseEntity {
  title: string;
  summary: string;
  scenes: Scene[];
}

export interface Book extends BaseEntity {
  title: string;
  summary: string;
  chapters: Chapter[];
}

export interface StoryDocument extends BaseEntity {
  title: string;
  kind: "manuscript" | "note" | "research";
  content: RichTextDocument;
}

export interface Character extends BaseEntity {
  name: string;
  role: string;
  arc: string;
  relationshipIds: EntityId[];
}

export interface Relationship extends BaseEntity {
  sourceCharacterId: EntityId;
  targetCharacterId: EntityId;
  description: string;
}

export interface TechnologyEntry extends BaseEntity {
  name: string;
  summary: string;
  ruleNotes: string[];
}

export interface Location extends BaseEntity {
  name: string;
  summary: string;
  regionName: string;
}

export interface Region extends BaseEntity {
  name: string;
  summary: string;
}

export interface Planet extends BaseEntity {
  name: string;
  summary: string;
}

export interface TimelineEvent extends BaseEntity {
  title: string;
  summary: string;
  sequence: number;
}

export interface CorkboardCard extends BaseEntity {
  title: string;
  summary: string;
  linkedSceneId?: EntityId;
}

export interface PlotThread extends BaseEntity {
  name: string;
  summary: string;
}

export interface Act extends BaseEntity {
  name: string;
  summary: string;
  order: number;
}

export interface Beat extends BaseEntity {
  title: string;
  summary: string;
  order: number;
  actId?: EntityId;
  sceneId?: EntityId;
}

export interface Subplot extends BaseEntity {
  name: string;
  summary: string;
}

export interface PovMarker extends BaseEntity {
  label: string;
  summary: string;
  characterId?: EntityId;
  sceneId?: EntityId;
}

export interface GlossaryEntry extends BaseEntity {
  term: string;
  definition: string;
}

export interface LoreNote extends BaseEntity {
  title: string;
  summary: string;
}

export interface ResearchNote extends BaseEntity {
  title: string;
  summary: string;
  source?: string;
}

export interface RevisionSnapshot extends BaseEntity {
  label: string;
  summary: string;
}

export interface Project extends BaseEntity {
  title: string;
  genre: string;
  description: string;
  status: ProjectStatus;
  books: Book[];
  documents: StoryDocument[];
  characters: Character[];
  relationships: Relationship[];
  technologyEntries: TechnologyEntry[];
  locations: Location[];
  regions: Region[];
  planets: Planet[];
  timelineEvents: TimelineEvent[];
  corkboardCards: CorkboardCard[];
  plotThreads: PlotThread[];
  acts: Act[];
  beats: Beat[];
  subplots: Subplot[];
  povMarkers: PovMarker[];
  glossaryEntries: GlossaryEntry[];
  loreNotes: LoreNote[];
  researchNotes: ResearchNote[];
  revisionSnapshots: RevisionSnapshot[];
}
