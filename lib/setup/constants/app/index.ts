/**
 * App domain constants index
 * Re-exports all app-related constants
 */

import { AppStructure } from "../../types/app/index.js";

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
}) satisfies AppStructure;
