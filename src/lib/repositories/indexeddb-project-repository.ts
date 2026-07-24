import { normalizeProject } from "@/lib/domain/project-normalizer";
import { stringToUuid } from "@/lib/domain/project-factory";
import type { Project } from "@/lib/domain/types";
import type { ProjectRepository } from "@/lib/repositories/interfaces";

const DATABASE_NAME = "glowglobe";
const DATABASE_VERSION = 1;
const PROJECT_STORE = "projects";

export class IndexedDbProjectRepository implements ProjectRepository {
  private dbPromise?: Promise<IDBDatabase>;

  async list(): Promise<Project[]> {
    const database = await this.getDatabase();
    const transaction = database.transaction(PROJECT_STORE, "readonly");
    const store = transaction.objectStore(PROJECT_STORE);
    const request = store.getAll();
    const rawProjects = await requestToPromise<Project[]>(request);
    await transactionToPromise(transaction);

    const normalizedProjects = rawProjects.map(normalizeProject);

    // Auto-migrate legacy non-UUID keys stored in IndexedDB
    for (let i = 0; i < rawProjects.length; i++) {
      const raw = rawProjects[i];
      const normalized = normalizedProjects[i];
      if (raw && normalized && raw.id !== normalized.id) {
        try {
          await this.remove(raw.id);
          await this.save(normalized);
        } catch {
          // Silent migration fallback
        }
      }
    }

    return normalizedProjects;
  }

  async getById(id: string): Promise<Project | undefined> {
    const database = await this.getDatabase();
    const transaction = database.transaction(PROJECT_STORE, "readonly");
    const store = transaction.objectStore(PROJECT_STORE);
    const request = store.get(id);
    let project = await requestToPromise<Project | undefined>(request);
    if (!project) {
      const mappedId = stringToUuid(id);
      if (mappedId !== id) {
        const fallbackRequest = store.get(mappedId);
        project = await requestToPromise<Project | undefined>(fallbackRequest);
      }
    }
    await transactionToPromise(transaction);
    return project ? normalizeProject(project) : undefined;
  }

  async save(entity: Project): Promise<void> {
    const database = await this.getDatabase();
    const transaction = database.transaction(PROJECT_STORE, "readwrite");
    const store = transaction.objectStore(PROJECT_STORE);
    store.put(entity);
    await transactionToPromise(transaction);
  }

  async remove(id: string): Promise<void> {
    const database = await this.getDatabase();
    const transaction = database.transaction(PROJECT_STORE, "readwrite");
    const store = transaction.objectStore(PROJECT_STORE);
    store.delete(id);
    await transactionToPromise(transaction);
  }

  private async getDatabase(): Promise<IDBDatabase> {
    if (typeof indexedDB === "undefined") {
      throw new Error("IndexedDB is not available in the current environment.");
    }

    if (!this.dbPromise) {
      this.dbPromise = openDatabase();
    }

    return this.dbPromise;
  }
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.onerror = () => {
      reject(request.error ?? new Error("Failed to open IndexedDB database."));
    };

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(PROJECT_STORE)) {
        database.createObjectStore(PROJECT_STORE, { keyPath: "id" });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };
  });
}

function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onerror = () => {
      reject(request.error ?? new Error("IndexedDB request failed."));
    };

    request.onsuccess = () => {
      resolve(request.result);
    };
  });
}

function transactionToPromise(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error("IndexedDB transaction failed."));
    transaction.onabort = () => reject(transaction.error ?? new Error("IndexedDB transaction aborted."));
  });
}
