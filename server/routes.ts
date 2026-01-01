import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactInquirySchema, insertViewingRequestSchema, insertProjectSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });
  
  // Get all projects or filtered projects
  app.get("/api/projects", async (req, res) => {
    try {
      const { location, type, status } = req.query;
      
      const projects = await storage.getProjectsByFilters({
        location: location as string | undefined,
        type: type as string | undefined,
        status: status as string | undefined,
      });

      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // Get project by ID
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }

      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  // Get unique locations
  app.get("/api/locations", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      const locations = Array.from(new Set(projects.map(p => p.location))).sort();
      res.json(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
      res.status(500).json({ error: "Failed to fetch locations" });
    }
  });

  // Submit contact inquiry
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);
      res.status(201).json({ success: true, inquiry });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ error: validationError.toString() });
      }
      console.error("Error creating contact inquiry:", error);
      res.status(500).json({ error: "Failed to submit contact inquiry" });
    }
  });

  // Submit viewing request
  app.post("/api/viewing-requests", async (req, res) => {
    try {
      const validatedData = insertViewingRequestSchema.parse(req.body);
      const request = await storage.createViewingRequest(validatedData);
      res.status(201).json({ success: true, request });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ error: validationError.toString() });
      }
      console.error("Error creating viewing request:", error);
      res.status(500).json({ error: "Failed to submit viewing request" });
    }
  });

  // Verify admin password
  app.post("/api/admin/verify", async (req, res) => {
    try {
      const { password } = req.body;
      
      if (!password || typeof password !== "string") {
        return res.status(400).json({ error: "Password is required" });
      }
      
      const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
      
      // Use timing-safe comparison to prevent timing attacks
      if (password.length !== adminPassword.length) {
        return res.status(401).json({ error: "Invalid password" });
      }
      
      let match = true;
      for (let i = 0; i < password.length; i++) {
        match = match && password[i] === adminPassword[i];
      }
      
      if (match) {
        res.json({ success: true });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      console.error("Error verifying admin password:", error);
      res.status(500).json({ error: "Failed to verify password" });
    }
  });

  // Create new project (admin)
  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json({ success: true, project });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ error: validationError.toString() });
      }
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  // Delete project (admin)
  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }

      const deleted = await storage.deleteProject(id);
      if (!deleted) {
        return res.status(404).json({ error: "Project not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  return httpServer;
}
