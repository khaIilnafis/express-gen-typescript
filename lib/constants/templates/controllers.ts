/**
 * Template controller constants
 * Contains constants for controller template file paths
 */

/**
 * Type definition for example controller templates
 */
export interface ExampleControllerTemplates {
  INDEX: string;
  CONTROLLER: string;
}

/**
 * Type definition for template controllers
 */
export interface TemplateControllers {
  EXAMPLE: ExampleControllerTemplates;
}

/**
 * Template controller constants
 * Defines file paths for controller templates
 */
export const CONTROLLERS = Object.freeze({
  EXAMPLE: {
    INDEX: "controllers/example/index.ts",
    CONTROLLER: "controllers/example/exampleController.ts",
  },
} as const) satisfies TemplateControllers; 