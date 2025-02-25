/**
 * Project directory structure constants
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
});
