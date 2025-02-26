/**
 * Template base path constants
 * Contains constants for base template directory paths
 */

/**
 * Type definition for template base paths
 */
export interface TemplateBase {
	AUTH: string;
  ROUTES: string;
  CONTROLLERS: string;
  VIEWS: string;
  PROJECT_STRUCTURE: string;
  WEBSOCKETS: string;
  DATABASE: string;
}

/**
 * Template base path constants
 * Defines base paths for template directories
 */
export const BASE = Object.freeze({
	AUTH: "auth",
  ROUTES: "routes",
  CONTROLLERS: "controllers",
  VIEWS: "views",
  PROJECT_STRUCTURE: "project-structure",
  WEBSOCKETS: "websockets",
  DATABASE: "database",
} as const) satisfies TemplateBase; 