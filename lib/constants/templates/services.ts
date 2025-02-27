/**
 * Template services constants
 * Contains constants for service template file paths
 */

/**
 * Type definition for example service templates
 */
export interface ExampleServiceTemplates {
  INDEX: string;
//   INDEX_AST: string;
}

/**
 * Type definition for service templates
 */
export interface ServiceTemplates {
  EXAMPLE: ExampleServiceTemplates;
}

/**
 * Template services constants
 * Defines file paths for service templates
 */
export const SERVICES = Object.freeze({
  EXAMPLE: {
    INDEX: "services/example/index.ast.ts",
    // INDEX_AST: "services/example/index.ast.ts",
  },
} as const) satisfies ServiceTemplates; 