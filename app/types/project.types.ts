export type ProjectType = "Commercial" | "Residential" | "Fit-Out";
export type ProjectCategory = "commercial" | "residential" | "fitout" | "all";
export type ProjectStatus = "completed" | "ongoing" | "planned";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  type: ProjectType;
  location: string;
  year: string;
  status: ProjectStatus;
  value: string;
  description: string;
  image: string;
  services: string[];
  highlights: string[];
}

export interface ProjectsFilterState {
  category: ProjectCategory;
  status?: ProjectStatus;
  searchQuery?: string;
}
