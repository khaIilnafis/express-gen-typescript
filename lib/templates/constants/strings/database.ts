import { DatabasePrerequisites } from "../../types/strings/index.js";

/**
 * Constants for database prerequisites
 */
export const DATABASE_PREREQUISITES = Object.freeze({
  MONGODB: "- MongoDB",
  POSTGRES: "- PostgreSQL",
  MYSQL: "- MySQL/MariaDB",
} as const) satisfies DatabasePrerequisites;
