/**
 * Server JSDoc markers templates
 * Contains constants for JSDoc markers used in templates to inject code
 */

import { Markers } from "../../types/strings/index.js";

export const MARKERS = Object.freeze({
  DATABASE_IMPORT: "// Database imports",
  DATABASE_INIT: "// Initialize database",
  SERVER_INIT: "// Server initialization",
  VIEW_ENGINE_CONFIG_MARKER: "// VIEW_ENGINE_CONFIG",
  AUTH_IMPORT: "// Auth imports",
  WEBSOCKET_IMPORT: "// Websocket imports",
  SERVER: {
    IMPORTS: "// Imports",
    DATABASE_CONNECTION: " Database connection methods",
    ROUTES: "// Configure routes",
    MIDDLEWARE: "// Configure middleware",
  },
  ENV: {
    DATABASE: "# Database Configuration",
    AUTH: "# Authentication",
    APP: "# App Configuration",
  },
} as const) satisfies Markers;
