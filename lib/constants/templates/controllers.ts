/**
 * Template controllers constants
 * Contains constants for controller template file paths
 */

/**
 * Type definition for example controller templates
 */
export interface ExampleControllerTemplates {
  INDEX: string;
//   INDEX_AST: string;
  CONTROLLER: string;
//   CONTROLLER_AST: string;
}

/**
 * Type definition for controller templates
 */
export interface ControllerTemplates {
  INDEX: string;
//   INDEX_AST: string;
  EXAMPLE: ExampleControllerTemplates;
}

/**
 * Template controllers constants
 * Defines file paths for controller templates
 */
export const CONTROLLERS = Object.freeze({
  INDEX: "controllers/index.ast.ts",
//   INDEX_AST: "controllers/index.ast.ts",
  EXAMPLE: {
    INDEX: "controllers/example/index.ast.ts",
    // INDEX_AST: "controllers/example/index.ast.ts",
    CONTROLLER: "controllers/example/exampleController.ast.ts",
    // CONTROLLER_AST: "controllers/example/exampleController.ast.ts",
  },
} as const) satisfies ControllerTemplates; 