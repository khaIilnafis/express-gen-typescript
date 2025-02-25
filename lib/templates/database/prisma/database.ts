// @ts-nocheck - Template file, not meant to be validated directly
import { PrismaClient } from "@prisma/client";

// Create a singleton PrismaClient instance
const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

/**
 * Initialize Prisma client connection
 * @returns PrismaClient instance
 */
export async function initializeDatabase(): Promise<PrismaClient> {
  try {
    await prisma.$connect();

    // Register cleanup handler
    process.on("SIGINT", async () => {
      await prisma.$disconnect();
      process.exit(0);
    });

    return prisma;
  } catch (error) {
    console.error("Error connecting to database with Prisma:", error);
    await prisma.$disconnect();
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
export default prisma;
