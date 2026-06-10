export type EntityId = string;

export type ProjectStatus = "idea" | "planning" | "drafting" | "revising" | "complete";
export type ProjectLifecycleState = "active" | "archived" | "trashed";
export type CharacterStatus = "alive" | "dead" | "missing" | "unknown";
export type RelationshipType =
  | "family"
  | "friend"
  | "ally"
  | "rival"
  | "enemy"
  | "mentor"
  | "student"
  | "romantic"
  | "subordinate"
  | "leader";

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
  sociumIds: EntityId[];
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
  summary: string;
  arc: string;
  status: CharacterStatus;
  aliases: string;
  pronouns: string;
  age: string;
  birthDate: string;
  gender: string;
  speciesId?: EntityId;
  occupation: string;
  sociumId?: EntityId;
  residence: string;
  origin: string;
  firstAppearance: string;
  appearance: string;
  distinguishingFeatures: string;
  skills: string;
  goals: string;
  fears: string;
  internalConflict: string;
  externalConflict: string;
  background: string;
  personality: string;
  voice: string;
  mannerisms: string;
  beliefs: string;
  secrets: string;
  unresolvedThreads: string;
  notes: string;
  quote: string;
  relationshipIds: EntityId[];
}

export interface Relationship extends BaseEntity {
  sourceCharacterId: EntityId;
  targetCharacterId: EntityId;
  type: RelationshipType;
  notes: string;
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

export interface Species extends BaseEntity {
  name: string;
  summary: string;
  traits: string;
  lifespan: string;
  cultureNotes: string;
  originWorld: string;
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

export type SociumType =
  | "faction"
  | "clan"
  | "guild"
  | "kingdom"
  | "corporation"
  | "religion"
  | "tribe"
  | "order"
  | "house"
  | "other";

export interface Socium extends BaseEntity {
  name: string;
  type: SociumType;
  summary: string;
  leadership: string;
  headquarters: string;
  territory: string;
  scope: string;
  goals: string;
  beliefs: string;
  resources: string;
  methods: string;
  allies: string;
  rivals: string;
  publicReputation: string;
  internalConflicts: string;
  notes: string;
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
  lifecycleState: ProjectLifecycleState;
  books: Book[];
  documents: StoryDocument[];
  characters: Character[];
  relationships: Relationship[];
  sociums: Socium[];
  technologyEntries: TechnologyEntry[];
  locations: Location[];
  regions: Region[];
  planets: Planet[];
  species: Species[];
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
