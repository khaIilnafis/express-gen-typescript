// @ts-nocheck - Template file, not meant to be validated directly
import sequelize from "./sequelize";
import "../models/Example"; // import all models here

/**
 * Initialize database connection and sync models
 */
export async function initializeDatabase(): Promise<void> {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Sync all models
    // For production, use migrations instead of sync
    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true });
      console.log("Database models synchronized successfully.");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
}
