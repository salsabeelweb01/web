import { 
  type Project, 
  type InsertProject,
  type ContactInquiry,
  type InsertContactInquiry,
  type ViewingRequest,
  type InsertViewingRequest,
  projects,
  contactInquiries,
  viewingRequests
} from "@shared/schema";
import { db } from "./db";
import { eq, and, like } from "drizzle-orm";

export interface IStorage {
  // Projects
  getAllProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  getProjectsByFilters(filters: {
    location?: string;
    type?: string;
    status?: string;
  }): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  deleteProject(id: number): Promise<boolean>;

  // Contact Inquiries
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getAllContactInquiries(): Promise<ContactInquiry[]>;

  // Viewing Requests
  createViewingRequest(request: InsertViewingRequest): Promise<ViewingRequest>;
  getAllViewingRequests(): Promise<ViewingRequest[]>;
}

export class DatabaseStorage implements IStorage {
  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    const result = await db.select().from(projects).where(eq(projects.id, id));
    return result[0];
  }

  async getProjectsByFilters(filters: {
    location?: string;
    type?: string;
    status?: string;
  }): Promise<Project[]> {
    let query = db.select().from(projects);
    
    const conditions = [];
    if (filters.location) {
      conditions.push(like(projects.location, `%${filters.location}%`));
    }
    if (filters.type) {
      conditions.push(eq(projects.type, filters.type));
    }
    if (filters.status) {
      conditions.push(eq(projects.status, filters.status));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    return await query;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const result = await db.insert(projects).values(project).returning();
    return result[0];
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id)).returning();
    return result.length > 0;
  }

  async createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const result = await db.insert(contactInquiries).values(inquiry).returning();
    return result[0];
  }

  async getAllContactInquiries(): Promise<ContactInquiry[]> {
    return await db.select().from(contactInquiries);
  }

  async createViewingRequest(request: InsertViewingRequest): Promise<ViewingRequest> {
    const result = await db.insert(viewingRequests).values(request).returning();
    return result[0];
  }

  async getAllViewingRequests(): Promise<ViewingRequest[]> {
    return await db.select().from(viewingRequests);
  }
}

export const storage = new DatabaseStorage();
