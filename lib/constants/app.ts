/**
 * Application-level constants
 */

export const APP = Object.freeze({
  // Default application settings
  DEFAULTS: {
    PORT: 3000,
    ENV: "development",
    LOG_LEVEL: "debug",
  },

  // Environment variables
  ENV: {
    DEVELOPMENT: "development",
    PRODUCTION: "production",
    TEST: "test",
  },

  // Project structure
  STRUCTURE: {
    SRC: "src",
    DIST: "dist",
    CONFIG: "config",
  },

  // File and template extensions
  EXTENSIONS: {
    TYPESCRIPT: ".ts",
    JAVASCRIPT: ".js",
    JSON: ".json",
    ENV: ".env",
  },
});
