export interface JobMetadata {
  name: string;
  description: string;
}

// This is runtime metadata attached to job classes via SetMetadata. It's TypeScript-only (compiled away) — used internally by the service to describe what a job is.
