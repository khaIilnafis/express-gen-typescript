/**
 * Constants for file paths and structure
 */
import { DIRECTORIES } from "./directories.js";

export const FILE_PATHS = Object.freeze({
  // Database related paths
  DATABASE: {
    // Main database directory (src/database)
    DIRECTORY: "database",

    // Files in database directory
    FILES: {
      INIT: "init.ts",
      CONNECTION: "connection.ts",
      SEQUELIZE: "sequelize.ts",
      DATA_SOURCE: "data-source.ts",
      CLIENT: "client.ts",
      SCHEMA: "schema.prisma",
    },
  },

  // Model related paths
  MODELS: {
    // Default model filenames
    FILES: {
      EXAMPLE: "Example.ts",
      USER: "User.ts",
      INDEX: "index.ts",
    },
  },

  // Server related paths
  SERVER: {
    FILE: "server.ts",
  },

  // Common paths used across the codebase
  COMMON: {
    // Shared file markers for inserting content
    MARKERS: {
      DATABASE_IMPORT: "// Database imports",
      DATABASE_INIT: "// Initialize database",
      SERVER_INIT: "// Server initialization",
    },
  },
});
