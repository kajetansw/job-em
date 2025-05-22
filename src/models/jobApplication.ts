import type { Database } from "./database";

export type JobApplication =
  Database["public"]["Tables"]["job_applications"]["Row"];
