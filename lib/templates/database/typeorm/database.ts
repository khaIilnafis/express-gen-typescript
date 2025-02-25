// @ts-nocheck - Template file, not meant to be validated directly
import { DataSource } from "typeorm";
import "reflect-metadata";
import path from "path";

export const AppDataSource = new DataSource({
  type: "{{ dialect }}",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "{{ databaseName }}",
  synchronize: process.env.NODE_ENV !== "production",
  logging: process.env.NODE_ENV === "development",
  entities: [join(__dirname, "..", "entity/**/*.{ts,js}")],
  migrations: [join(__dirname, "..", "migration/**/*.{ts,js}")],
  subscribers: [join(__dirname, "..", "subscriber/**/*.{ts,js}")],
});

/**
 * Initialize TypeORM connection
 * @returns DataSource instance
 */
export async function initializeDatabase(): Promise<DataSource> {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    return AppDataSource;
  } catch (error) {
    console.error("Error initializing TypeORM connection", error);
    throw error;
  }
}
export default AppDataSource;
