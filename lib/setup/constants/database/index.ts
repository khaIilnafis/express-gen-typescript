/**
 * Database constants
 * Contains constants related to database types, connections, and configuration
 */

import { TYPES } from "./types.js";
import { DIALECTS } from "./dialects.js";
import { DEFAULTS } from "./defaults.js";
import { CONFIG } from "./config.js";
import { DatabaseStructure } from "../../types/database/index.js";

/**
 * Main database constants
 * Combines all database-related constants into a unified structure
 */
export const DATABASE = Object.freeze({
  TYPES,
  DIALECTS,
  DEFAULTS,
  CONFIG,
} as const) satisfies DatabaseStructure;
