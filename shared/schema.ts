import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  status: text("status").notNull(),
  type: text("type").notNull(),
  startingPrice: text("starting_price").notNull(),
  bedrooms: text("bedrooms").notNull(),
  sizeSqft: text("size_sqft").notNull(),
  description: text("description").notNull(),
  propertyType: text("property_type").notNull(),
  images: text("images").array().notNull(),
  features: text("features").array().notNull(),
});

export const contactInquiries = pgTable("contact_inquiries", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const viewingRequests = pgTable("viewing_requests", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  preferredDate: text("preferred_date").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const selectProjectSchema = createSelectSchema(projects);

export const insertContactInquirySchema = createInsertSchema(contactInquiries).omit({ 
  id: true, 
  createdAt: true 
});
export const selectContactInquirySchema = createSelectSchema(contactInquiries);

export const insertViewingRequestSchema = createInsertSchema(viewingRequests).omit({ 
  id: true, 
  createdAt: true 
});
export const selectViewingRequestSchema = createSelectSchema(viewingRequests);

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type ContactInquiry = typeof contactInquiries.$inferSelect;

export type InsertViewingRequest = z.infer<typeof insertViewingRequestSchema>;
export type ViewingRequest = typeof viewingRequests.$inferSelect;
