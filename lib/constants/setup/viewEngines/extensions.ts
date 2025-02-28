/**
 * View engine extensions constants
 * Contains file extension constants for different template engines
 */

/**
 * Type definition for view engine extensions
 */
export interface ViewEngineExtensions {
  PUG: string;
  EJS: string;
  HANDLEBARS: string;
}

/**
 * View engine extension constants
 * Defines file extensions for each supported template engine
 */
export const EXTENSIONS = Object.freeze({
  PUG: ".pug",
  EJS: ".ejs",
  HANDLEBARS: ".handlebars",
} as const) satisfies ViewEngineExtensions;
 