/**
 * Application message constants
 * Contains message strings used throughout the application
 */

/**
 * Type definition for setup messages
 */
export interface SetupMessages {
  PROJECT_STRUCTURE: string;
  DATABASE: (db: string) => string;
  WEBSOCKETS: (lib: string) => string;
  VIEW_ENGINE: (engine: string) => string;
  ENV_FILE: string;
}

/**
 * Type definition for success messages
 */
export interface SuccessMessages {
  README: string;
  PROJECT: string;
}

/**
 * Type definition for error messages
 */
export interface ErrorMessages {
  GENERAL: string;
}

/**
 * Type definition for application messages
 */
export interface ApplicationMessages {
  SETUP: SetupMessages;
  SUCCESS: SuccessMessages;
  ERROR: ErrorMessages;
}

/**
 * Application message constants
 */
export const MESSAGES = Object.freeze({
  SETUP: {
    PROJECT_STRUCTURE: "Setting up project structure...",
    DATABASE: (db: string) => `Setting up ${db} database configuration...`,
    WEBSOCKETS: (lib: string) => `Setting up ${lib} websockets...`,
    VIEW_ENGINE: (engine: string) => `Setting up ${engine} view engine...`,
    ENV_FILE: "Creating environment configuration files...",
  },

  SUCCESS: {
    README: "Created README.md file",
    PROJECT: "Express TypeScript project setup complete!",
  },

  ERROR: {
    GENERAL: "Error generating Express TypeScript application:",
  },
} as const) satisfies ApplicationMessages; 