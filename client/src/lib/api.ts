export interface Project {
  id: number;
  name: string;
  location: string;
  status: string;
  type: string;
  startingPrice: string;
  bedrooms: string;
  sizeSqft: string;
  description: string;
  propertyType: string;
  images: string[];
  features: string[];
}

export interface ProjectFilters {
  status?: string;
  location?: string;
  type?: "rent" | "buy";
}

export interface ContactInquiry {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export interface ViewingRequest {
  projectId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredDate: string;
  message?: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'An error occurred' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getProjects(filters?: ProjectFilters): Promise<Project[]> {
  const params = new URLSearchParams();
  
  if (filters) {
    if (filters.status && filters.status !== "All") {
      params.append('status', filters.status);
    }
    if (filters.location && filters.location !== "All") {
      params.append('location', filters.location);
    }
    if (filters.type) {
      params.append('type', filters.type);
    }
  }

  const url = `/api/projects${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await fetch(url);
  return handleResponse<Project[]>(response);
}

export async function getProjectById(id: number): Promise<Project | undefined> {
  const response = await fetch(`/api/projects/${id}`);
  if (response.status === 404) {
    return undefined;
  }
  return handleResponse<Project>(response);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.slice(0, 6);
}

export async function getLocations(): Promise<string[]> {
  const response = await fetch('/api/locations');
  return handleResponse<string[]>(response);
}

export async function submitContactInquiry(inquiry: ContactInquiry): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inquiry),
  });
  await handleResponse(response);
}

export async function submitViewingRequest(request: ViewingRequest): Promise<void> {
  const response = await fetch('/api/viewing-requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  await handleResponse(response);
}
