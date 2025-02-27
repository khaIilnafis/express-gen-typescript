/**
 * Template string constants
 * Provides centralized string templates used across the generator
 */

/**
 * Type definition for database prerequisites
 */
export interface DatabasePrerequisites {
  MONGODB: string;
  POSTGRES: string;
  MYSQL: string;
}

/**
 * Type definition for directory descriptions
 */
export interface DirectoryDescriptions {
  WEBSOCKETS: string;
  VIEWS: string;
}

/**
 * Type definition for environment file constants
 */
export interface EnvironmentFileConstants {
  EXAMPLE_FILENAME: string;
  JWT_PLACEHOLDER: string;
  JWT_SECRET_KEY: string;
  JWT_ENV_TEMPLATE: string;
  JWT_EXPIRES_IN: string;
}
/**
 * Type definition for example file constants
 */
export interface ExampleFileConstants {
  FILENAME: string;
}

/**
 * Constants for database prerequisites
 */
export const DATABASE_PREREQUISITES = Object.freeze({
  MONGODB: "- MongoDB",
  POSTGRES: "- PostgreSQL",
  MYSQL: "- MySQL/MariaDB",
} as const) satisfies DatabasePrerequisites;

/**
 * Constants for directory descriptions in README
 */
export const DIRECTORY_DESCRIPTIONS = Object.freeze({
  WEBSOCKETS: "# WebSocket handlers",
  VIEWS: "# View templates",
} as const) satisfies DirectoryDescriptions;

/**
 * Constants for environment file configuration
 */
export const ENV_FILE = Object.freeze({
  EXAMPLE_FILENAME: ".env.example",
  JWT_PLACEHOLDER: "your-secret-key-here",
  JWT_SECRET_KEY: "your-jwt-secret-key-change-in-production",
  JWT_ENV_TEMPLATE: "JWT_SECRET=your-secret-key",
  JWT_EXPIRES_IN: "JWT_EXPIRES_IN=15"
} as const) satisfies EnvironmentFileConstants;
/**
 * Constants for example file configuration
 */
export const EXAMPLE_FILE = Object.freeze({
  FILENAME: "example",
} as const) satisfies ExampleFileConstants;

/**
 * Type definition for template strings
 */
export interface TemplateStrings {
  DATABASE_PREREQUISITES: DatabasePrerequisites;
  DIRECTORY_DESCRIPTIONS: DirectoryDescriptions;
  ENV_FILE: EnvironmentFileConstants;
  EXAMPLE_FILE: ExampleFileConstants
}

/**
 * Main template strings export
 */
export const TEMPLATE_STRINGS = Object.freeze({
  DATABASE_PREREQUISITES,
  DIRECTORY_DESCRIPTIONS,
  ENV_FILE,
  EXAMPLE_FILE,
} as const) satisfies TemplateStrings; 