import { execSync } from "child_process";
import { db } from "./db";
import { sql } from "drizzle-orm/node-postgres";

/**
 * Check if database tables exist and run migrations if needed
 * This is a safety check - migrations should ideally be run manually
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
      console.log("⚠️  Database tables not found. Attempting to run migrations...");
      console.log("📝 Running: npm run db:push");
      
      try {
        execSync("npm run db:push", {
          stdio: "inherit",
          env: process.env,
        });
        console.log("✅ Migrations completed successfully!");
      } catch (error) {
        console.error("❌ Failed to run migrations automatically.");
        console.error("💡 Please run 'npm run db:push' manually in the Render Shell.");
        console.error("   Error:", error instanceof Error ? error.message : String(error));
        // Don't throw - let the app start and show a helpful error message
      }
    } else {
      console.log("✅ Database tables found. Migrations up to date.");
    }
  } catch (error) {
    console.error("⚠️  Could not check database status:", error instanceof Error ? error.message : String(error));
    console.error("💡 If you see 'table not found' errors, run 'npm run db:push' in Render Shell.");
  }
}

