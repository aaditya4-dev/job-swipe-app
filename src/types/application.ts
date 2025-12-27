import type { Job } from "./job";

export type Application = {
  job: Job; 

  status: "Submitted" | "Reviewed" | "Rejected";
  appliedAt: string;
  
};
