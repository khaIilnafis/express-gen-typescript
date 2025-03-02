/**
 * Project directory structure constants
 * Defines the directory structure for the generated project
 */

import { ProjectDirectories } from "../../types/paths/index.js";

/**
 * Project directory structure constants
 * Defines all directories used in the project structure
 */
export const DIRECTORIES: ProjectDirectories = Object.freeze({
  // Core directories (top level)
  ROOT: {
    SRC: "src",
    BIN: "bin",
    STRUCTURE: "project-structure",
  },
  // Source subdirectories
  SRC: {
    AUTH: "auth",
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
  // Sockets subdirectories
  CONTROLLERS: {
    example: "example",
  },
  // Sockets subdirectories
  SOCKETS: {
    HANDLERS: "handlers",
  },
  // Services subdirectories
  SERVICES: {
    EXAMPLE: "example",
  },
  // Views subdirectories
  VIEWS: {
    EJS: "ejs",
    PUG: "pug",
    HANDLEBARS: "handlebars",
    LAYOUTS: "layouts",
    PARTIALS: "partials",
    PAGES: "pages",
  },
} as const) satisfies ProjectDirectories;
