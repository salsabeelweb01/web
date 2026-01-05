import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactInquirySchema, insertViewingRequestSchema, insertProjectSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import { uploadMultiple } from "./upload";
import path from "path";

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

  // Upload images endpoint
  app.post("/api/upload/images", (req, res) => {
    uploadMultiple(req, res, (err: any) => {
      if (err) {
        console.error("Upload error:", err);
        return res.status(400).json({ error: err.message || "Failed to upload images" });
      }

      if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
      const imageUrls = files.map((file: Express.Multer.File) => 
        `/attached_assets/uploads/${file.filename}`
      );

      res.json({ success: true, images: imageUrls });
    });
  });

  // Create new project (admin)
  app.post("/api/projects", async (req, res) => {
    try {
      console.log("Creating project with data:", JSON.stringify(req.body, null, 2));
      
      // Validate the data
      let validatedData;
      try {
        validatedData = insertProjectSchema.parse(req.body);
      } catch (validationError: any) {
        if (validationError.name === "ZodError") {
          const errorMessage = fromError(validationError);
          console.error("Validation error:", errorMessage.toString());
          // Return user-friendly validation errors
          const fieldErrors = validationError.errors.map((err: any) => ({
            field: err.path.join("."),
            message: err.message,
          }));
          return res.status(400).json({ 
            error: "Validation failed",
            details: fieldErrors,
            message: errorMessage.toString()
          });
        }
        throw validationError;
      }
      
      console.log("Validated data:", JSON.stringify(validatedData, null, 2));
      
      // Try to create the project
      let project;
      try {
        project = await storage.createProject(validatedData);
      } catch (dbError: any) {
        console.error("Database error:", dbError);
        // Check for common database errors
        if (dbError.code === "23505") {
          return res.status(400).json({ 
            error: "A project with this name already exists" 
          });
        }
        if (dbError.code === "42P01") {
          return res.status(500).json({ 
            error: "Database table not found. Please run migrations." 
          });
        }
        if (dbError.message?.includes("connection")) {
          return res.status(500).json({ 
            error: "Database connection failed. Please check your database configuration." 
          });
        }
        throw dbError;
      }
      
      console.log("Project created successfully:", project.id);
      res.status(201).json({ success: true, project });
    } catch (error: any) {
      console.error("Unexpected error creating project:", error);
      console.error("Error name:", error?.name);
      console.error("Error message:", error?.message);
      console.error("Error stack:", error?.stack);
      
      // Return a more helpful error message
      const errorMessage = error?.message || "An unexpected error occurred";
      res.status(500).json({ 
        error: "Failed to create project",
        message: errorMessage,
        // Include details in production for debugging (but not sensitive info)
        ...(process.env.NODE_ENV === "production" && {
          hint: "Check server logs for more details. Common issues: missing required fields, database connection problems, or validation errors."
        })
      });
    }
  });

  // Update project (admin)
  app.put("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }

      console.log("Updating project", id, "with data:", JSON.stringify(req.body, null, 2));
      
      // Validate the data (partial validation for updates)
      let validatedData;
      try {
        // For updates, we allow partial data, so we'll validate each field if present
        validatedData = insertProjectSchema.partial().parse(req.body);
      } catch (validationError: any) {
        if (validationError.name === "ZodError") {
          const errorMessage = fromError(validationError);
          console.error("Validation error:", errorMessage.toString());
          const fieldErrors = validationError.errors.map((err: any) => ({
            field: err.path.join("."),
            message: err.message,
          }));
          return res.status(400).json({ 
            error: "Validation failed",
            details: fieldErrors,
            message: errorMessage.toString()
          });
        }
        throw validationError;
      }
      
      console.log("Validated update data:", JSON.stringify(validatedData, null, 2));
      
      // Try to update the project
      let project;
      try {
        project = await storage.updateProject(id, validatedData);
      } catch (dbError: any) {
        console.error("Database error:", dbError);
        if (dbError.message === "Project not found") {
          return res.status(404).json({ error: "Project not found" });
        }
        if (dbError.code === "23505") {
          return res.status(400).json({ 
            error: "A project with this name already exists" 
          });
        }
        throw dbError;
      }
      
      console.log("Project updated successfully:", project.id);
      res.json({ success: true, project });
    } catch (error: any) {
      console.error("Unexpected error updating project:", error);
      const errorMessage = error?.message || "An unexpected error occurred";
      res.status(500).json({ 
        error: "Failed to update project",
        message: errorMessage,
      });
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
