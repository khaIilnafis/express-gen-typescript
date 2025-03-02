/**
 * Database configuration constants
 * Contains general configuration settings for databases
 */

import { DatabaseConfig } from "../../types/database/index.js";

/**
 * Database configuration constants
 * Defines general database configuration settings
 */
export const CONFIG = Object.freeze({
  DEFAULT_TYPE: "postgres",
  SYNCHRONIZE: {
    DEV: true,
    PROD: false,
  },
} as const) satisfies DatabaseConfig;
