/**
 * Database configuration constants
 * Contains general configuration settings for databases
 */

/**
 * Type definition for database synchronization settings
 */
export interface DatabaseSynchronizeConfig {
  DEV: boolean;
  PROD: boolean;
}

/**
 * Type definition for database configuration
 */
export interface DatabaseConfig {
  DEFAULT_TYPE: string;
  SYNCHRONIZE: DatabaseSynchronizeConfig;
}

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