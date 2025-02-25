// @ts-nocheck - Template file, not meant to be validated directly
import { DataSource } from "typeorm";
import "reflect-metadata";
import { config } from "dotenv";
import path from "path";

// Load environment variables
config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "{{databaseName}}",
  synchronize: process.env.NODE_ENV !== "production",
  logging: process.env.NODE_ENV === "development",
  entities: [path.join(__dirname, "../models/**/*.{ts,js}")],
  migrations: [path.join(__dirname, "../migrations/**/*.{ts,js}")],
});

export default AppDataSource;
