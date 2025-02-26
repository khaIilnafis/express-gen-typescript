/**
 * Project directory structure constants
 * Defines the directory structure for the generated project
 */

/**
 * Type definitions for project directories structure
 */
export interface ProjectDirectories {
  ROOT: {
    SRC: string;
    BIN: string;
  };
  SRC: {
    CONTROLLERS: string;
    MODELS: string;
    ROUTES: string;
    SERVICES: string;
    SOCKETS: string;
    UTILS: string;
    TYPES: string;
    CONFIG: string;
    MIDDLEWARE: string;
    MIGRATIONS: string;
    PUBLIC: string;
    VIEWS: string;
    DATABASE: string;
  };
  PUBLIC: {
    CSS: string;
    JS: string;
    IMAGES: string;
  };
  VIEWS: {
    LAYOUTS: string;
    PARTIALS: string;
  };
}

/**
 * Project directory structure constants
 * Defines all directories used in the project structure
 */
export const DIRECTORIES = Object.freeze({
  // Core directories (top level)
  ROOT: {
    SRC: "src",
    BIN: "bin",
  },

  // Source subdirectories
  SRC: {
    CONTROLLERS: "controllers",
    MODELS: "models",
    ROUTES: "routes",
    SERVICES: "services",
    SOCKETS: "sockets",
    UTILS: "utils",
    TYPES: "types",
    CONFIG: "config",
    MIDDLEWARE: "middleware",
    MIGRATIONS: "migrations",
    PUBLIC: "public",
    VIEWS: "views",
    DATABASE: "database",
  },

  // Public subdirectories
  PUBLIC: {
    CSS: "css",
    JS: "js",
    IMAGES: "images",
  },

  // Views subdirectories
  VIEWS: {
    LAYOUTS: "layouts",
    PARTIALS: "partials",
  },
} as const) satisfies ProjectDirectories; 