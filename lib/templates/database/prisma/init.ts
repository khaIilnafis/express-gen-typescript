// @ts-nocheck - Template file, not meant to be validated directly
import prisma from "./client";

/**
 * Initialize the database connection
 */
export async function initializeDatabase(): Promise<void> {
  try {
    // Connect to the database
    await prisma.$connect();
    console.log("Prisma connection has been established successfully.");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
}

/**
 * Close the database connection
 */
export async function closeDatabaseConnection(): Promise<void> {
  await prisma.$disconnect();
  console.log("Prisma connection closed.");
}

// Handle application shutdown
process.on("SIGINT", handleShutdown);
process.on("SIGTERM", handleShutdown);

/**
 * Handle application shutdown by closing database connections
 */
async function handleShutdown(): Promise<void> {
  console.log("Shutting down application...");
  await closeDatabaseConnection();
  process.exit(0);
}
