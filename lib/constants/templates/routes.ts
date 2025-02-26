/**
 * Template route constants
 * Contains constants for route template file paths
 */

/**
 * Type definition for template routes
 */
export interface TemplateRoutes {
  INDEX: string;
  EXAMPLE: string;
}

/**
 * Template route constants
 * Defines file paths for route templates
 */
export const ROUTES = Object.freeze({
  INDEX: "routes/index.ts",
  EXAMPLE: "routes/example.routes.ts",
} as const) satisfies TemplateRoutes; 