/**
 * Database constants
 * Contains constants related to database types, connections, and configuration
 */

import { TYPES, DatabaseTypes } from "./types.js";
import { DIALECTS, DatabaseDialects } from "./dialects.js";
import { DEFAULTS, DatabaseDefaults } from "./defaults.js";
import { CONFIG, DatabaseConfig } from "./config.js";

/**
 * Type definition for database structure
 */
export interface DatabaseStructure {
  TYPES: DatabaseTypes;
  DIALECTS: DatabaseDialects;
  DEFAULTS: DatabaseDefaults;
  CONFIG: DatabaseConfig;
}

/**
 * Re-export individual database constants
 */
export {
  TYPES,
  DIALECTS,
  DEFAULTS,
  CONFIG,
};

export type {
  DatabaseTypes,
  DatabaseDialects,
  DatabaseDefaults,
  DatabaseConfig,
};

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