/**
 * Database dialects constants
 * Contains constants related to SQL and NoSQL database dialects
 */

/**
 * Type definition for database dialects
 */
export interface DatabaseDialects {
  POSTGRES: string;
  MYSQL: string;
  SQLITE: string;
  MARIADB: string;
  MSSQL: string;
  MONGODB: string;
}

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