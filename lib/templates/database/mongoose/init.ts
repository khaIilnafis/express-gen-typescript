// @ts-nocheck - Template file, not meant to be validated directly
import { connectToDatabase, closeDatabaseConnection } from "./connection";

/**
 * Initialize the database connection
 */
export async function initializeDatabase(): Promise<void> {
  await connectToDatabase();

  // Register cleanup handlers
  process.on("SIGINT", handleShutdown);
  process.on("SIGTERM", handleShutdown);
}

/**
 * Handle application shutdown by closing database connections
 */
async function handleShutdown(): Promise<void> {
  console.log("Shutting down application...");
  await closeDatabaseConnection();
  process.exit(0);
}
