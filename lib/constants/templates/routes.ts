/**
 * Template routes constants
 * Contains constants for route template file paths
 */

/**
 * Type definition for routes templates
 */
export interface RoutesTemplates {
  INDEX: string;
//   INDEX_AST: string;
  EXAMPLE: string;
//   EXAMPLE_AST: string;
}

/**
 * Template routes constants
 * Defines file paths for route templates
 */
export const ROUTES = Object.freeze({
  INDEX: "routes/index.ast.ts",
//   INDEX_AST: "routes/index.ast.ts",
  EXAMPLE: "routes/example.ast.ts",
//   EXAMPLE_AST: "routes/example.ast.ts",
} as const) satisfies RoutesTemplates; 