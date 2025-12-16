import { PROJECTS, Project } from "./mock-data";

export type { Project } from "./mock-data";

// Type definitions for filters
export interface ProjectFilters {
  status?: string;
  location?: string;
  type?: "rent" | "buy";
  minPrice?: number;
  maxPrice?: number;
}

// Mock API functions - Phase 2 Ready

export async function getProjects(filters?: ProjectFilters): Promise<Project[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredProjects = [...PROJECTS];

  if (filters) {
    if (filters.status && filters.status !== "All") {
      filteredProjects = filteredProjects.filter((p) => p.status === filters.status);
    }
    if (filters.location && filters.location !== "All") {
      filteredProjects = filteredProjects.filter((p) => p.location.includes(filters.location!));
    }
    if (filters.type) {
      filteredProjects = filteredProjects.filter((p) => p.type === filters.type);
    }
  }

  return filteredProjects;
}

export async function getProjectById(id: number): Promise<Project | undefined> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return PROJECTS.find((p) => p.id === id);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return PROJECTS.slice(0, 6);
}

export async function getLocations(): Promise<string[]> {
  const locations = new Set(PROJECTS.map((p) => p.location));
  return Array.from(locations).sort();
}

// TODO: Implement real API calls in Phase 2
// export const api = {
//   getProjects: (filters) => fetch('/api/projects', { params: filters }),
//   getProjectById: (id) => fetch(`/api/projects/${id}`),
// };
