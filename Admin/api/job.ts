// @/api/job.ts

import { authFetch, API_ENDPOINTS } from "@/lib/api";
import { Job } from "@/types/job.types";

export async function getJobs(): Promise<Job[]> {
  return authFetch(API_ENDPOINTS.jobs)
}

export async function getJobById(id: string): Promise<Job> {
  return authFetch(`${API_ENDPOINTS.jobs}/${id}`)
}

export async function createJob(jobData: Omit<Job, "id">): Promise<Job> {
  return authFetch(API_ENDPOINTS.jobs, {
    method: "POST",
    body: JSON.stringify(jobData),
  })
}

export async function updateJob(id: string, jobData: Partial<Job>): Promise<Job> {
  return authFetch(`${API_ENDPOINTS.jobs}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(jobData),
  })
}

export async function deleteJob(id: string): Promise<void> {
  return authFetch(`${API_ENDPOINTS.jobs}/${id}`, {
    method: "DELETE",
  })
}