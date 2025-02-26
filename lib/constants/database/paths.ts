/**
 * Database paths constants
 * Contains file path patterns for database-related files
 */

/**
 * Type definition for database model paths
 */
export interface DatabaseModelPaths {
  TYPEORM: string;
  SEQUELIZE: string;
}

/**
 * Type definition for database paths
 */
export interface DatabasePaths {
  MODELS: DatabaseModelPaths;
}

/**
 * Database path constants
 * Defines file paths for database-related files
 */
export const PATHS = Object.freeze({
  MODELS: {
    TYPEORM: "dist/models/**/*.js",
    SEQUELIZE: "models",
  },
} as const) satisfies DatabasePaths; 