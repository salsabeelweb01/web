import { db } from "./db";
import { sql } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";

/**
 * Check if database tables exist and create them if needed
 * This creates tables directly using Drizzle's push functionality
 */
export async function ensureMigrations() {
  try {
    // Check if projects table exists
    const result = await db.execute(
      sql`SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'projects'
      )`
    );

    const tableExists = result.rows[0]?.exists === true;

    if (!tableExists) {
      console.log("⚠️  Database tables not found. Creating tables...");
      
      try {
        // Import drizzle-kit push functionality
        const { push } = await import("drizzle-kit");
        const drizzleConfig = await import("../../drizzle.config.ts");
        
        console.log("📝 Pushing schema to database...");
        await push({
          schema: schema,
          db: db,
        });
        
        console.log("✅ Database tables created successfully!");
      } catch (error: any) {
        // If drizzle-kit import fails, try creating tables manually
        console.log("⚠️  drizzle-kit not available, creating tables manually...");
        
        try {
          await createTablesManually();
          console.log("✅ Database tables created manually!");
        } catch (manualError) {
          console.error("❌ Failed to create tables automatically.");
          console.error("💡 Please run 'npm run db:push' manually in the Render Shell.");
          console.error("   Error:", error instanceof Error ? error.message : String(error));
        }
      }
    } else {
      console.log("✅ Database tables found. Migrations up to date.");
    }
  } catch (error) {
    console.error("⚠️  Could not check database status:", error instanceof Error ? error.message : String(error));
    console.error("💡 If you see 'table not found' errors, run 'npm run db:push' in Render Shell.");
  }
}

/**
 * Create tables manually using raw SQL
 * This is a fallback if drizzle-kit is not available
 */
async function createTablesManually() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      status TEXT NOT NULL,
      type TEXT NOT NULL,
      starting_price TEXT NOT NULL,
      bedrooms TEXT NOT NULL,
      size_sqft TEXT NOT NULL,
      description TEXT NOT NULL,
      property_type TEXT NOT NULL,
      images TEXT[] NOT NULL,
      features TEXT[] NOT NULL
    )
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS contact_inquiries (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS viewing_requests (
      id SERIAL PRIMARY KEY,
      project_id INTEGER NOT NULL REFERENCES projects(id),
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      preferred_date TEXT NOT NULL,
      message TEXT,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `);
}

