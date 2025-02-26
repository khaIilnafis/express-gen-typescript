/**
 * Project file structure constants
 * Defines the file paths and markers for the generated project
 */
import { DIRECTORIES } from "./directories.js";

/**
 * Type definitions for file paths
 */
export interface ProjectFiles {
  DATABASE: {
    DIRECTORY: string;
    FILES: {
      CONNECTION: string;
      CONNECT: string;
    };
  };
  MODELS: {
    DIRECTORY: string;
    FILES: {
      EXAMPLE: string;
      INDEX: string;
    };
  };
  SERVER: {
    FILE: string;
  };
  COMMON: {
    MARKERS: {
      DATABASE_IMPORT: string;
      DATABASE_INIT: string;
      SERVER_INIT: string;
    };
  };
}

/**
 * File paths constants
 * Defines all file paths and file markers used in the project structure
 */
export const FILES = Object.freeze({
  // Database related paths
  DATABASE: {
    // Main database directory (src/database)
    DIRECTORY: DIRECTORIES.SRC.DATABASE,

    // Files in database directory
    FILES: {
      CONNECTION: "index.ts",
      CONNECT: "index",
    },
  },

  // Model related paths
  MODELS: {
    // Main models directory (src/models)
    DIRECTORY: DIRECTORIES.SRC.MODELS,
    
    // Default model filenames
    FILES: {
      EXAMPLE: "Example.ts",
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
} as const) satisfies ProjectFiles; 