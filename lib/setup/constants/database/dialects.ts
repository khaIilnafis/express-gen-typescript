/**
 * Database dialects constants
 * Contains constants related to SQL and NoSQL database dialects
 */

import { DatabaseDialects } from "../../types/database/index.js";

/**
 * Database dialect constants
 * Defines all supported database dialects
 */
export const DIALECTS = Object.freeze({
  POSTGRES: "postgres",
  MYSQL: "mysql",
  SQLITE: "sqlite",
  MARIADB: "mariadb",
  MSSQL: "mssql",
  MONGODB: "mongodb",
} as const) satisfies DatabaseDialects;
