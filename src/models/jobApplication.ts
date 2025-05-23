import type { Database } from "./database";

export type JobApplication =
  Database["public"]["Tables"]["job_applications"]["Row"];

export const ACTIVE_APPLICATION_STATUSES = [
  "SENT",
  "ONGOING",
] satisfies JobApplication["status"][];

export const INACTIVE_APPLICATION_STATUSES = [
  "REJECTED",
  "REJECTED_BY_ME",
  "CANCELLED",
] satisfies JobApplication["status"][];
