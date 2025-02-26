// @ts-nocheck - Template file, not meant to be validated directly
import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "{{databaseName}}",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  dialect: "{{dialect}}",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  define: {
    timestamps: true,
  },
});

/**
 * Initialize Sequelize connection
 * @returns Sequelize instance
 */
export async function initializeDatabase(): Promise<Sequelize> {
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

export default sequelize;
