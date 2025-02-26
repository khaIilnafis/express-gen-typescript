/**
 * Project file structure constants
 * Defines the file paths and markers for the generated project
 */
import { DIRECTORIES } from "./directories.js";

/**
 * Type definitions for file paths
 */
export interface ProjectFiles {
	BIN: {
		SERVER: string;
	};
  DATABASE: {
    DIRECTORY: string;
    FILES: {
      CONNECTION: string;
    };
  };
  MODELS: {
    DIRECTORY: string;
    FILES: {
      EXAMPLE: string;
      INDEX: string;
    };
  };
  SOCKETS: {
	INDEX:string;
  };
  SERVER: {
    FILE: string;
	TYPES: string;
  };
  COMMON: {
    MARKERS: {
      DATABASE_IMPORT: string;
      DATABASE_INIT: string;
      SERVER_INIT: string;
	  VIEW_ENGINE_CONFIG_MARKER: string;
    };
	NAMES: {
		EXAMPLE: string;
		CONNECTION: string;
	};
	README: string;
	PCKGMGR: string;
  };
  GLOBAL: {
	TYPES: string;
  }
}

/**
 * File paths constants
 * Defines all file paths and file markers used in the project structure
 */
export const FILES = Object.freeze({
	BIN: {
		SERVER: 'www.ts'
	},
  // Database related paths
  DATABASE: {
    // Main database directory (src/database)
    DIRECTORY: DIRECTORIES.SRC.DATABASE,

    // Files in database directory
    FILES: {
      CONNECTION: "index.ts",
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
  // Route related paths
  ROUTES: {
	EXAMPLE: "example.ts",
	INDEX: "index.ts",
  },
  // Controller related paths
  CONTROLLERS: {
	EXAMPLE: "exampleController.ts",
	INDEX: "index.ts",
  },
  SOCKETS:{
	INDEX: "index.ts"
  },
  // Server related paths
  SERVER: {
    FILE: "server.ts",
	TYPES: "server.d.ts"
  },
  GLOBAL: {
	TYPES: "types.d.ts"
  },
  // Common paths used across the codebase
  COMMON: {
    // Shared file markers for inserting content
    MARKERS: {
      DATABASE_IMPORT: "// Database imports",
      DATABASE_INIT: "// Initialize database",
      SERVER_INIT: "// Server initialization",
	  VIEW_ENGINE_CONFIG_MARKER: "// VIEW_ENGINE_CONFIG",
    },
	NAMES: {
		EXAMPLE: "Example",
		CONNECTION: "index",
	},
	README: 'readme.md',
	PCKGMGR: 'package.json'
  },
} as const) satisfies ProjectFiles; 